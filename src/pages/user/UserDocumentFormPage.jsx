import React from "react";
import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { companies } from "../../components/constant/publicData/mockData";

/* ========================= */
/* Clean Field Component */
/* ========================= */

const Field = ({ label, required, children }) => (
  <Box>
    <Typography
      sx={{
        fontSize: 13,
        fontWeight: 500,
        color: "#344054",
        mb: 1,
      }}
    >
      {label}
      {required && (
        <Box component="span" sx={{ color: "#DC2626" }}>
          {" "}
          *
        </Box>
      )}
    </Typography>
    {children}
  </Box>
);

const inputSX = {
  "& .MuiOutlinedInput-root": {
    height: 44,
    borderRadius: "12px",
    backgroundColor: "#F9FAFB",
    fontSize: "14px",
    "& fieldset": {
      borderColor: "#E5E7EB",
    },
    "&:hover fieldset": {
      borderColor: "#D1D5DB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6366F1",
    },
  },
};

/* ========================= */
/* Page */
/* ========================= */

const UserDocumentFormPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F3F4F6",
        minHeight: "100vh",
        py: 5,
      }}
    >
      {/* OUTER WRAPPER (controls alignment properly) */}
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: 4,
        }}
      >
        {/* HEADER */}
        <Box display="flex" alignItems="center" gap={1} mb={4}>
          <ArrowBackIcon sx={{ fontSize: 20, cursor: "pointer" }} />
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
              color: "#1F2937",
            }}
          >
            Offer Letter
          </Typography>
        </Box>

        {/* CARD */}
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 6 },
            boxShadow: "0px 8px 30px rgba(0,0,0,0.05)",
          }}
        >
          {/* 5 COLUMN GRID SYSTEM */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(5, 1fr)",
              },
              gap: 4,
            }}
          >
            {/* ROW 1 */}
            <Box sx={{ gridColumn: { md: "span 2" } }}>
              <Field label="Company" required>
                <TextField fullWidth select defaultValue="" sx={inputSX}>
                  <MenuItem value="">Select Company</MenuItem>

                  {companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Field>
            </Box>

            {/* EMPTY SPACING */}
            <Box sx={{ display: { xs: "none", md: "block" } }} />
            <Box sx={{ display: { xs: "none", md: "block" } }} />
            <Box sx={{ display: { xs: "none", md: "block" } }} />

            {/* ROW 2 */}
            <Field label="Identity" required>
              <TextField fullWidth select defaultValue="" sx={inputSX}>
                <MenuItem value="">Mr/Mrs</MenuItem>
              </TextField>
            </Field>

            <Field label="Employee name" required>
              <TextField fullWidth sx={inputSX} placeholder="Enter name" />
            </Field>

            <Box sx={{ gridColumn: { md: "span 2" } }}>
              <Field label="Address" required>
                <TextField
                  fullWidth
                  sx={inputSX}
                  placeholder="Enter address eg. XYZ road, RS colony, Pune"
                />
              </Field>
            </Box>

            <Field label="Reporting manager">
              <TextField fullWidth sx={inputSX} placeholder="Enter name" />
            </Field>

            {/* ROW 3 */}
            <Field label="Designation" required>
              <TextField fullWidth select defaultValue="" sx={inputSX}>
                <MenuItem value="">Select designation</MenuItem>
              </TextField>
            </Field>

            <Field label="Department" required>
              <TextField fullWidth select defaultValue="" sx={inputSX}>
                <MenuItem value="">Select department</MenuItem>
              </TextField>
            </Field>

            <Field label="Issue date" required>
              <TextField fullWidth placeholder="Select date" sx={inputSX} />
            </Field>

            <Field label="Joining date" required>
              <TextField fullWidth placeholder="Select date" sx={inputSX} />
            </Field>

            <Field label="Joining annual CTC" required>
              <TextField
                fullWidth
                sx={inputSX}
                placeholder="Enter annual CTC"
              />
            </Field>

            {/* ROW 4 */}
            <Field label="Work Location" required>
              <TextField fullWidth sx={inputSX} placeholder="Enter location" />
            </Field>

            <Field label="Offer valid till" required>
              <TextField fullWidth placeholder="Select date" sx={inputSX} />
            </Field>

            <Field label="Employment type" required>
              <TextField fullWidth select defaultValue="" sx={inputSX}>
                <MenuItem value="">Select type</MenuItem>
              </TextField>
            </Field>

            <Field label="Offer type" required>
              <TextField fullWidth select defaultValue="" sx={inputSX}>
                <MenuItem value="">Select with PF/ without PF</MenuItem>
              </TextField>
            </Field>

            <Field label="Probation period (in months)">
              <TextField fullWidth select defaultValue="" sx={inputSX}>
                <MenuItem value="">Select months</MenuItem>
              </TextField>
            </Field>
          </Box>

          {/* BUTTON */}
          <Box mt={7}>
            <Button
              startIcon={<VisibilityIcon />}
              sx={{
                backgroundColor: "#E5E7EB",
                color: "#344054",
                textTransform: "none",
                fontWeight: 500,
                borderRadius: "12px",
                px: 4,
                py: 1.2,
                "&:hover": {
                  backgroundColor: "#D1D5DB",
                },
              }}
            >
              Preview Document
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDocumentFormPage;
