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
<<<<<<< HEAD
import { generatePDF } from '../../utils/pdfUtils'; // adjust path as needed
=======
import { generatePDF } from "../../utils/pdfUtils"; // adjust path as needed
>>>>>>> b9912123f20954d0cd4db3bbacd6f98649686ed9

const UserDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
<<<<<<< HEAD
  const [doc, setDoc] = useState(null);

  const docId = state?.id;
  const docType = state?.type;
=======
  const [doc, setDoc] = useState(state?.document || null);

>>>>>>> b9912123f20954d0cd4db3bbacd6f98649686ed9
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
    try {
      const api = new ApiService();

      const routeType = mapDocTypeToRoute(doc.documentType);

      await api.downloadFile(
        `/api/v1/documents/${routeType}/download/${doc._id}`,
<<<<<<< HEAD
        `${doc.documentType}.pdf`
=======
        `${doc.documentType}.pdf`,
>>>>>>> b9912123f20954d0cd4db3bbacd6f98649686ed9
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handlePreview = () => {
    const routeType = mapDocTypeToRoute(doc.documentType);

    window.open(
      `http://localhost:5000/api/v1/documents/${routeType}/preview/${doc._id}`,
<<<<<<< HEAD
      "_blank"
=======
      "_blank",
>>>>>>> b9912123f20954d0cd4db3bbacd6f98649686ed9
    );
  };

  useEffect(() => {
<<<<<<< HEAD
    if (!docId || !docType) return;

    const fetchDocument = async () => {
      try {
        const api = new ApiService();

        const routeType = mapDocTypeToRoute(docType);

        const url = ServerUrl.getDocByUserId(routeType, docId);

        console.log("Fetching:", url);

        const res = await api.apiget(url);

        setDoc(res.data);
      } catch (err) {
        console.error("Error fetching document:", err);
      }
    };

    fetchDocument();
  }, [docId, docType]);

  return (
    <div className="min-h-screen bg-gray-100" ref={documentRef}>

=======
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
>>>>>>> b9912123f20954d0cd4db3bbacd6f98649686ed9
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
<<<<<<< HEAD
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
=======
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
>>>>>>> b9912123f20954d0cd4db3bbacd6f98649686ed9
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
<<<<<<< HEAD

            <p className="text-sm text-gray-500">Employee ID</p>
            <p className="font-medium">{doc?.employeeId}</p>          </div>
=======
            <p className="text-sm text-gray-500">Employee ID</p>
            <p className="font-medium">{doc?.employeeId}</p>{" "}
          </div>
>>>>>>> b9912123f20954d0cd4db3bbacd6f98649686ed9

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
<<<<<<< HEAD
              <p className="font-medium">{doc?.documentType}</p>
=======
              <p className="font-medium mt-2">{doc?.documentType}</p>
>>>>>>> b9912123f20954d0cd4db3bbacd6f98649686ed9
            </div>

            {/* <div>
              <p className="text-gray-500">File Size</p>
              <p className="font-medium mt-2">{doc?.size}</p>
            </div> */}

            <div>
              <p className="text-gray-500">Date</p>
<<<<<<< HEAD
              <p className="font-medium">
                {doc?.createdAt
                  ? new Date(doc.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
=======
              <p className="font-medium mt-2">
                {doc?.createdAt
                  ? new Date(doc.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
>>>>>>> b9912123f20954d0cd4db3bbacd6f98649686ed9
                  : "—"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Generated By</p>
<<<<<<< HEAD
              <p className="font-medium">{doc?.issuedTo}</p>
            </div>

            <div>
              <p className="text-gray-500">Payment Status</p>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
=======
              <p className="font-medium mt-2">{doc?.issuedBy}</p>
            </div>

            <div>
              <p className="text-gray-500 mb-2">Payment Status</p>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium ">
>>>>>>> b9912123f20954d0cd4db3bbacd6f98649686ed9
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
