import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Alert
} from '@mui/material';

import { useCompany } from '../../core/contexts/CompanyContext';
import { useDocument } from '../../core/contexts/DocumentContext';
import { useAuth } from '../../core/contexts/AuthContext';
import { validateForm } from '../../utils/validationUtils';

const DocumentCreate = () => {
  const { selectedCompany, selectCompany, companies } = useCompany();
  const {
    selectedDocType,
    selectDocumentType,
    documentTypes,
    documentData,
    updateDocumentData
  } = useDocument();

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formErrors, setFormErrors] = useState({});

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  /* ---------------- NAVIGATION STATE ---------------- */
  useEffect(() => {
    if (location.state) {
      const { companyId, documentType } = location.state;

      if (companyId && companies.length > 0) {
        selectCompany(companyId);
      }

      if (documentType && documentTypes.length > 0) {
        selectDocumentType(documentType);
      }
    }
  }, [location.state, companies.length, documentTypes.length]);

  /* ---------------- REDIRECT ---------------- */
  useEffect(() => {
    if (!selectedCompany || !selectedDocType) {
      if (!location.state) {
        navigate('/dashboard');
      }
    }
  }, [selectedCompany, selectedDocType, location.state, navigate]);

  /* ---------------- INPUT CHANGE ---------------- */
  const handleInputChange = (field, value) => {
    updateDocumentData(field, value);

    if (field === 'internshipType' && value === 'unpaid') {
      updateDocumentData('stipend', '');
    }

    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /* ---------------- FIELD VISIBILITY ---------------- */
  const shouldShowField = (field) => {
    if (!field.dependsOn) return true;

    return (
      documentData[field.dependsOn.field] === field.dependsOn.value
    );
  };

  /* ---------------- VALIDATION ---------------- */
  const validateDocumentForm = () => {
    if (!selectedDocType) return true;

    const rules = {};

    selectedDocType.fields.forEach(field => {
      if (!shouldShowField(field)) return;

      if (field.required) {
        rules[field.name] = {
          required: true,
          message: `${field.label} is required`
        };
      }

      if (field.type === 'email') rules[field.name].email = true;
      if (field.type === 'date') rules[field.name].date = true;
      if (field.type === 'number') rules[field.name].number = true;
    });

    const errors = validateForm(documentData, rules);
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateDocumentForm()) {
      navigate('/documents/preview');
    }
  };

  if (!selectedCompany || !selectedDocType) return null;

  /* ================= UI ================= */

  return (
    <div className="w-full flex justify-center px-3 sm:px-6 lg:px-10 py-6">
      
      {/* Responsive Wrapper */}
      <div className="w-full max-w-6xl">

        <Paper elevation={3} className="p-4 sm:p-6 lg:p-8">

          {/* Header */}
          <Typography
            variant="h4"
            className="!text-center sm:!text-left !mb-2"
          >
            Create {selectedDocType.name}
          </Typography>

          <Typography
            variant="subtitle1"
            className="!text-center sm:!text-left !mb-4"
          >
            Company: {selectedCompany.name}
          </Typography>

          {Object.keys(formErrors).length > 0 && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Please fill in all required fields
            </Alert>
          )}

          {/* FORM */}
          <Box component="form" onSubmit={handleSubmit}>

            <Grid container spacing={3}>
              {selectedDocType.fields.map((field) => {

                if (!shouldShowField(field)) return null;

                return (
                  <Grid
                    item
                    xs={12}
                    md={field.type === 'textarea' ? 12 : 6}
                    key={field.name}
                  >

                    {/* SELECT */}
                    {field.type === 'select' ? (
                      <FormControl fullWidth error={!!formErrors[field.name]}>
                        <InputLabel>{field.label}</InputLabel>

                        <Select
                          value={documentData[field.name] || ''}
                          label={field.label}
                          onChange={(e) =>
                            handleInputChange(field.name, e.target.value)
                          }
                          required={field.required}
                        >
                          {field.options.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>

                        {formErrors[field.name] && (
                          <Typography variant="caption" color="error">
                            {formErrors[field.name]}
                          </Typography>
                        )}
                      </FormControl>
                    ) : field.type === 'textarea' ? (

                      /* TEXTAREA */
                      <TextField
                        label={field.label}
                        multiline
                        rows={4}
                        fullWidth
                        value={documentData[field.name] || ''}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        required={field.required}
                        error={!!formErrors[field.name]}
                        helperText={formErrors[field.name]}
                      />

                    ) : (

                      /* INPUT */
                      <TextField
                        label={field.label}
                        type={field.type}
                        fullWidth
                        value={documentData[field.name] || ''}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        required={field.required}
                        error={!!formErrors[field.name]}
                        helperText={formErrors[field.name]}
                        InputLabelProps={
                          field.type === 'date' || field.type === 'month'
                            ? { shrink: true }
                            : undefined
                        }
                      />
                    )}
                  </Grid>
                );
              })}
            </Grid>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">

              <Button
                variant="outlined"
                onClick={() => navigate('/dashboard')}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-full sm:w-auto"
              >
                Preview Document
              </Button>

            </div>
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default DocumentCreate;