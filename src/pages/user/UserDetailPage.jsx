import React from "react";
import {
  ArrowLeft,
  FileText,
  User,
  Building2,
  FileCheck,
  Download,
  Eye,
  CheckCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState, useEffect } from "react";
import { generatePDF } from "../../utils/pdfUtils"; // adjust path as needed

const UserDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);

  const docId = state?.id;
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    if (state?.autoDownload && doc) {
      setTimeout(() => {
        handleDownload();
      }, 300); // wait for render
    }
  }, [state, doc]);
  const mapDocTypeToRoute = (type) => {
    const map = {
      AppointmentLetter: "appointment_letter",
      OfferLetter: "offer_letter",
      ExperienceLetter: "experience_letter",
      CompletionCertificate: "completion_certificate",
      SalarySlip: "salaryslip_letter",
      RelievingLetter: "relieving_letter",
      IncrementLetter: "increment_letter",
      InternshipCertificate: "internshipcertificate_letter",
      ConfirmationLetter: "confirmation_letter",
      FullAndFinal: "fullandfinal_letter",
    };

    return map[type] || "";
  };

  const documentRef = useRef();
  /* ================= PDF GENERATION (FULL) ================= */
  const handleDownload = async () => {
    if (!documentRef.current) return;

    setLoading(true);
    setError("");

    try {
      const content = documentRef.current; // or specific class if needed

      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${doc?.documentType || "Document"}.pdf`);
      await api.downloadFile(
        `/api/v1/documents/${routeType}/download/${doc._id}`,
        `${doc.documentType}.pdf`,
      );
    } catch (err) {
      console.error(err);
      setError("Failed to generate PDF");
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    const routeType = mapDocTypeToRoute(doc.documentType);

    window.open(
      `http://localhost:5000/api/v1/documents/${routeType}/preview/${doc._id}`,
      "_blank",
    );
  };

  useEffect(() => {
    if (!doc && state?.id && state?.type) {
      const fetchDocument = async () => {
        try {
          const api = new ApiService();

          const routeType = mapDocTypeToRoute(state.type);
          const url = ServerUrl.getDocByUserId(routeType, state.id);

          const res = await api.apiget(url);
          setDoc(res.data);
        } catch (err) {
          console.error("Error fetching document:", err);
        }
      };

      fetchDocument();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100" ref={documentRef}>
      {/* ================= PAGE CONTENT ================= */}
      <div className="p-4 sm:p-6">
        {/* Back */}
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 mb-6 cursor-pointer text-sm"
        >
          {" "}
          <ArrowLeft size={18} />
          <span className="font-medium">Back to Document History</span>
        </div>

        {/* ================= HEADER ================= */}
        <div
          className="text-white rounded-2xl p-5 sm:p-6 shadow-md
          flex flex-col sm:flex-row sm:items-center gap-4"
          style={{
            background: "linear-gradient(to right, #0E145E, #B37BD6)",
          }}
        >
          <div className="bg-white/20 p-3 rounded-xl w-fit">
            <FileText size={28} />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">
              Document Details
            </h1>

            <div className="flex flex-wrap gap-3 mt-2 text-sm items-center">
              <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                <CheckCircle size={14} />
                Completed
              </span>

              <span>
                Generated on{" "}
                {doc?.createdAt
                  ? new Date(doc.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Employee */}
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: "#E7E9FF" }}
              >
                <User size={18} color="#0E145E" />
              </div>

              <h2 className="font-semibold text-lg">Employee Information</h2>
            </div>
            <p className="text-sm text-gray-500">Employee Name</p>
            <p className="font-medium mb-4">{doc?.employeeName}</p>
            <p className="text-sm text-gray-500">Employee ID</p>
            <p className="font-medium">{doc?.employeeId}</p>{" "}
          </div>

          {/* Company */}
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: "#F2E7FA" }}
              >
                <Building2 size={18} color="#B37BD6" />
              </div>

              <h2 className="font-semibold text-lg">Company Information</h2>
            </div>

            <p className="text-sm text-gray-500">Company Name</p>
            <p className="font-medium">{doc?.company}</p>
          </div>
        </div>

        {/* ================= DOCUMENT INFO ================= */}
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm mt-6">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: "#E8F7EE" }}
            >
              <FileCheck size={18} color="#16A34A" />
            </div>

            <h2 className="font-semibold text-lg">Document Information</h2>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Document Type</p>
              <p className="font-medium mt-2">{doc?.documentType}</p>
            </div>

            {/* <div>
              <p className="text-gray-500">File Size</p>
              <p className="font-medium mt-2">{doc?.size}</p>
            </div> */}

            <div>
              <p className="text-gray-500">Date</p>
              <p className="font-medium mt-2">
                {doc?.createdAt
                  ? new Date(doc.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Generated By</p>
              <p className="font-medium mt-2">{doc?.issuedBy}</p>
            </div>

            <div>
              <p className="text-gray-500 mb-2">Payment Status</p>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium ">
                {doc?.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="flex flex-col text-sm sm:flex-row gap-4 mt-8">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto flex justify-center items-center gap-2
            text-white px-6 py-3 rounded-xl shadow transition
            bg-gradient-to-r from-[#0E145E] to-[#B37BD6]
            hover:opacity-90"
          >
            <Download size={18} />
            Download PDF
          </button>

          <button
            onClick={handlePreview}
            className="w-full sm:w-auto flex justify-center items-center gap-2
            bg-gray-200 text-gray-700 px-6 py-3 rounded-xl
            hover:bg-gray-300 transition"
          >
            <Eye size={18} />
            Preview Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
