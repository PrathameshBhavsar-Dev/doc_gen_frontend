import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar
} from '@mui/material';
import { useCompany } from '../../core/contexts/CompanyContext';
import { useDocument } from '../../core/contexts/DocumentContext';
import { useAuth } from '../../core/contexts/AuthContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ResponsiveContainer from '../common/ResponsiveContainer';
import { generatePDF } from '../../utils/pdfUtils'; // adjust path as needed
import ROUTES from "../../core/constants/routes.constant";
import { useLocation } from "react-router-dom";

// Templates
import ExperienceLetterTemplate from '../documents/ExperienceLetter/ExperienceLetterTemplate';
import RelievingLetterTemplate from '../documents/RelievingLetter/RelievingLetteTemplate';
import InternshipLetterTemplate from '../documents/InternshipLetter/InternshipLetterTemplate';
import CertificationLetterTemplate from '../documents/InternshipComplitionCertificate/CertificationLetterTemplate';
import SalarySlipLetterTemplate from "../documents/SalarySlip/SalarySlipTemplate";
import IncrementTemplate from "../documents/IncrementLetter/IncrementTemplate";
import OfferTemplate from "../documents/OfferLetter/OfferLetterTemplate";
import AppointmentLetterTemplate from "../documents/AppointmentLeter/AppointmentLetterTemplate";
import ConfirmationLetterTemplate from "../documents/ConfirmationLetter/ConfirmationLetterTemplate";
import FullandfinalLetterTemplate from "../documents/FullAndFinalLetter/FullandFinalLetterTemplate";

const DocumentPreview = () => {
  // const { selectedCompany } = useCompany();
  // const { selectedDocType, documentData } = useDocument();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const previewData = location.state?.documentData;
  const previewDocType = location.state?.selectedDocType;
  const previewCompany = location.state?.selectedCompany;

  const documentRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  /* ================= AUTH + STATE CHECK ================= */
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!previewCompany || !previewDocType || !previewData) {
      navigate(ROUTES.USER_DASHBOARD);
    }
  }, [user, previewCompany, previewDocType, previewData, navigate]);

  /* ================= TEMPLATE RENDER ================= */
  const renderDocumentTemplate = () => {
    switch (previewDocType?.template) {
      case 'salary_slip':
        return <SalarySlipLetterTemplate data={previewData} company={previewCompany} />;

      case 'internship_certificate':
        return (
          <InternshipLetterTemplate data={previewData} company={previewCompany} />
        );

      case 'offer_letter':
        return <OfferTemplate data={previewData} company={previewCompany} />;

      case 'completion_certificate':
        return <CertificationLetterTemplate data={previewData} company={previewCompany} />;

      case 'increment_letter':
        return <IncrementTemplate data={previewData} company={previewCompany} />;
      case 'appointment_letter':
        return <AppointmentLetterTemplate data={previewData} company={previewCompany} />;
      case 'experience_letter':
        return <ExperienceLetterTemplate data={previewData} company={previewCompany} />;
      case 'relieving_letter':
        return <RelievingLetterTemplate data={previewData} company={previewCompany} />;
      case 'fullandfinal_letter':
        return <FullandfinalLetterTemplate data={previewData} company={previewCompany} />;

      // case 'salary-transaction':
      // return <SalaryTransactionTemplate data={previewData} company={previewCompany} />;
      // case 'employment-verification':
      // return <EmploymentVerificationTemplate data={previewData} company={previewCompany} />;
      // case 'promotion-letter':
      // return <PromotionLetterTemplate data={previewData} company={previewCompany} />;
      // case 'warning-letter':
      // return <WarningLetterTemplate data={previewData} company={previewCompany} />;
      // case 'noc':
      // return <NOCTemplate data={previewData} company={previewCompany} />;
      // case 'termination-letter':
      // return <TerminationLetterTemplate data={previewData} company={previewCompany} />;
      // case 'transfer-letter':
      // return <TransferLetterTemplate data={previewData} company={previewCompany} />;
      // case 'fullandfinal-letter':
      //  return <FullAndFinalLetterTemplate data={previewData} company={previewCompany} />;
      case 'confirmation_letter':
        return <ConfirmationLetterTemplate data={previewData} company={previewCompany} />;
      default:
        return <Typography>Template not found</Typography>;
    }
  };

  /* ================= PDF GENERATION (FULL) ================= */
  const handleDownloadPDF = async () => {
    if (!documentRef.current) return;

    setLoading(true);
    setError('');

    try {
      setSnackbarMessage('Generating PDF...');
      setSnackbarOpen(true);

      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 300));

      await generatePDF(
        documentRef.current,
        `${previewDocType.name}-${new Date().toISOString().slice(0, 10)}`
      );

      setSnackbarMessage('PDF downloaded successfully');
      setSnackbarOpen(true);
    } catch (err) {
      console.error(err);
      setError('Failed to generate PDF');
    } finally {
      setLoading(false);
    }
  };

  /* ================= PDF (CONTENT ONLY / WORD STYLE) ================= */
  const handleDownloadPDFWord = async () => {
    if (!documentRef.current) return;

    setLoading(true);
    setError('');

    try {
      setSnackbarMessage('Generating Content Only PDF...');
      setSnackbarOpen(true);

      const content = documentRef.current.querySelector('.a4-content-only');
      if (!content) throw new Error('Missing .a4-content-only');

      const canvas = await html2canvas(content, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        ignoreElements: (el) =>
          el?.getAttribute?.('alt')?.toLowerCase()?.includes('signature') ||
          el?.getAttribute?.('alt')?.toLowerCase()?.includes('stamp'),
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = -(imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${previewDocType.name}-ContentOnly.pdf`);
      setSnackbarMessage('Content-only PDF downloaded');
      setSnackbarOpen(true);
    } catch (err) {
      console.error(err);
      setError('Failed to generate content-only PDF');
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  if (!previewCompany || !previewDocType || !previewData) return null;

  return (
    <ResponsiveContainer>
      {error && <Alert severity="error">{error}</Alert>}

      <Box mb={3} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Typography variant={isMobile ? 'h5' : 'h4'}>Document Preview</Typography>

        <Box display="flex" gap={2} flexWrap="wrap">
          <Button variant="outlined" onClick={() => navigate('/document/create')}>
            Edit
          </Button>
          <Button variant="contained" onClick={handleDownloadPDF} disabled={loading}>
            Download PDF
          </Button>
          <Button variant="contained" onClick={handleDownloadPDFWord} disabled={loading}>
            Download Word PDF
          </Button>
        </Box>
      </Box>

      <Paper
        ref={documentRef}
        elevation={3}
        sx={{
          width: '210mm',
          minHeight: '297mm',
          margin: '0 auto',
          backgroundColor: '#fff',
        }}
      >
        {renderDocumentTemplate()}
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </ResponsiveContainer>
  );
};

export default DocumentPreview;
