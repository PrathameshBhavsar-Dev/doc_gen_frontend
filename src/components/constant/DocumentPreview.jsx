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
import { useCompany } from '../context/CompanyContext';
import { useDocument } from '../context/DocumentContext';
import { useAuth } from '../context/AuthContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ResponsiveContainer from '../components/common/ResponsiveContainer';
import { generatePDF } from '../utils/pdfUtils'; // adjust path as needed

// Templates
// import SalarySlipTemplate from '../components/documents/SalarySlip/SalarySlipTemplate';
//import IncrementLetterTemplate from '../components/documents/IncrementLetter/IncrementLetterTemplate';
import ExperienceLetterTemplate from '../components/documents/ExperienceLetter/ExperienceLetterTemplate';
import RelievingLetterTemplate from '../components/documents/RelievingLetter/RelievingLetteTemplate';
// import OfferLetterTemplate from '../components/documents/OfferLetter/WithoutPF/WithoutPFOfferLetterTemplate'
//import AppointmentLetterTemplate from '../components/documents/AppointmentLeter/WithoutPF/WithoutPFAppointmentLetterTemplate';
import InternshipLetterTemplate from '../components/documents/InternshipLetter/InternshipLetterTemplate';
import CertificationLetterTemplate from '../components/documents/InternshipComplitionCertificate/CertificationLetterTemplate';
//import FullandFinalLetterTemplate from '../components/documents/FullAndFinalLetter/FullAndFinalLetterTemplate';
import SalarySlipLetterTemplate from "../components/documents/SalarySlip/SalarySlipTemplate";
import IncrementTemplate from "../components/documents/IncrementLetter/IncrementTemplate";
import OfferTemplate from "../components/documents/OfferLetter/OfferLetterTemplate";
//import FullAndFinalLetterTemplate from "../components/documents/FullandFinalLetter/FullandFinalLetterTemplate";
import AppointmentLetterTemplate from "../components/documents/AppointmentLeter/AppointmentLetterTemplate";
import ConfirmationLetterTemplate from "../components/documents/ConfirmationLetter/ConfirmationLetterTemplate";
import FullandfinalLetterTemplate from "../components/documents/FullandfinalLetter/FullandfinalLetterTemplate";
//import FullAndFinalLetterTemplate from "../components/documents/FullAndFinalLetter/FullAndFinalLetterTemplate";





const DocumentPreview = () => {
  const { selectedCompany } = useCompany();
  const { selectedDocType, documentData } = useDocument();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Redirect if no company or document type selected
    if (
      !selectedCompany ||
      !selectedDocType ||
      Object.keys(documentData).length === 0
    ) {
      navigate("/dashboard");
    }
  }, [currentUser, selectedCompany, selectedDocType, documentData, navigate]);

  /* ================= TEMPLATE RENDER ================= */
  const renderDocumentTemplate = () => {
    switch (selectedDocType?.template) {
      case 'salary-slip':
        return <SalarySlipLetterTemplate data={documentData} company={selectedCompany} />;

       case 'internship-certificate':
      return (
        <InternshipLetterTemplate data={documentData} company={selectedCompany}/>
      );

       
      case 'offer-letter':
        return <OfferTemplate data={documentData} company={selectedCompany} />;
        
       case 'completion-certificate':
         return <CertificationLetterTemplate data={documentData} company={selectedCompany} />;

      case 'increment-letter':
        return <IncrementTemplate data={documentData} company={selectedCompany} />;
      case 'appointment-letter':
        return <AppointmentLetterTemplate data={documentData} company={selectedCompany} />;
      case 'experience-letter':
        return <ExperienceLetterTemplate data={documentData} company={selectedCompany} />;
      case 'relieving-letter':
        return <RelievingLetterTemplate data={documentData} company={selectedCompany} />;
       case 'fullandfinal-letter':
        return <FullandfinalLetterTemplate data={documentData} company={selectedCompany} />;

      // case 'salary-transaction':
      // return <SalaryTransactionTemplate data={documentData} company={selectedCompany} />;
      // case 'employment-verification':
      // return <EmploymentVerificationTemplate data={documentData} company={selectedCompany} />;
      // case 'promotion-letter':
      // return <PromotionLetterTemplate data={documentData} company={selectedCompany} />;
      // case 'warning-letter':
      // return <WarningLetterTemplate data={documentData} company={selectedCompany} />;
      // case 'noc':
      // return <NOCTemplate data={documentData} company={selectedCompany} />;
      // case 'termination-letter':
      // return <TerminationLetterTemplate data={documentData} company={selectedCompany} />;
      // case 'transfer-letter':
        // return <TransferLetterTemplate data={documentData} company={selectedCompany} />;
        // case 'fullandfinal-letter':
        //  return <FullAndFinalLetterTemplate data={documentData} company={selectedCompany} />;
         case 'confirmation-letter':
        return <ConfirmationLetterTemplate data={documentData} company={selectedCompany} />;
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

    await generatePDF(
      documentRef.current,
      `${selectedDocType.name}-${new Date().toISOString().slice(0, 10)}`
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
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${selectedDocType.name}-ContentOnly.pdf`);
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
  if (!selectedCompany || !selectedDocType) return null;

  return (
    <ResponsiveContainer>
      {error && <Alert severity="error">{error}</Alert>}

      <Box mb={3} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Typography variant={isMobile ? 'h5' : 'h4'}>Document Preview</Typography>

        <Box display="flex" gap={2} flexWrap="wrap">
          <Button variant="outlined" onClick={() => navigate('/documents/create')}>
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
