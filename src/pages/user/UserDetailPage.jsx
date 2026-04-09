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
import { useRef, useState, useEffect } from "react";
import { generatePDF } from "../../utils/pdfUtils"; // adjust path as needed
import { getTemplateComponent } from "../../utils/templateResolver.js";
import ApiService from "../../core/services/api.service.jsx";
import ServerUrl from "../../core/constants/serverURL.constant.jsx";
import {
  resolveCompany,
  resolveTypeField,
} from "../../utils/companyRegistry.js";
import ROUTES from "../../core/constants/routes.constant.jsx";

const UserDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(state?.document || null);
  const [downloadingId, setDownloadingId] = useState(null);

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
  const handleDownload = async (e, item) => {
    e?.stopPropagation?.();

    if (!item) {
      console.error("Invalid document item:", item);
      return;
    }

    /* ================= SAFE DOCUMENT TYPE ================= */
    const rawType =
      typeof item.documentType === "object"
        ? item.documentType?.name
        : item.documentType;

    if (!rawType) {
      console.error("Missing documentType:", item);
      return;
    }

    const normalizedType = rawType
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .replace(/[\s\-]+/g, "_")
      .toLowerCase();

    /* ================= TEMPLATE ================= */
    const TemplateComponent = getTemplateComponent(normalizedType);

    if (!TemplateComponent) {
      console.error("No template found for type:", normalizedType);
      return;
    }

    /* ================= COMPANY ================= */
    const companyObject = resolveCompany(item?.company);

    if (!companyObject) {
      console.error("Could not resolve company for:", item?.company);
      return;
    }

    /* ================= TYPE RESOLUTION ================= */
    const resolvedType = resolveTypeField(item);

    /* ================= ENRICH DATA ================= */
    const enrichedData = {
      ...item,

      // normalize all possible type keys
      offerType: resolvedType || item?.offerType,
      appointmentType: resolvedType || item?.appointmentType,
      incrementType: resolvedType || item?.incrementType,
      confirmationType: resolvedType || item?.confirmationType,
      salaryType: resolvedType || item?.salaryType,
      finalType: resolvedType || item?.finalType,
      internshipType: resolvedType || item?.internshipType,
    };

    console.log("✅ normalizedType:", normalizedType);
    console.log("✅ companyObject:", companyObject);
    console.log("✅ enrichedData:", enrichedData);

    /* ================= FILE NAME SAFE ================= */
    const safeType =
      typeof item.documentType === "object"
        ? item.documentType?.name
        : item.documentType;

    const safeEmployee = item.employeeName?.replace(/\s+/g, "_") || "Employee";

    const fileName = `${safeType || "document"}-${safeEmployee}`;

    /* ================= LOADING STATE ================= */
    const docId = item._id || item.id;
    setDownloadingId(docId);

    try {
      await generatePDF(
        TemplateComponent,
        { data: enrichedData, company: companyObject },
        fileName,
      );
    } catch (err) {
      console.error("❌ Download failed:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handlePreview = (doc) => {
    if (!doc || !doc.documentType) {
      console.error("Invalid doc for preview", doc);
      return;
    }

    // Get the raw document type
    const rawType =
      typeof doc.documentType === "object"
        ? doc.documentType?.name
        : doc.documentType;

    // Use mapDocTypeToRoute to get the correct normalized type
    const normalizedType = mapDocTypeToRoute(rawType);

    if (!normalizedType) {
      console.error("Could not map document type:", rawType);
      return;
    }

    // Resolve company like in handleDownload
    const companyObject = resolveCompany(doc?.company);

    if (!companyObject) {
      console.error("Could not resolve company for:", doc?.company);
      return;
    }

    navigate(ROUTES.DOCUMENT_PREVIEW, {
      state: {
        documentData: doc,
        selectedDocType: {
          template: normalizedType, // Use the mapped type
          name: rawType,
        },
        selectedCompany: companyObject,
      },
    });
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
              <p>{doc?.issuedBy?.name}</p>
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
            onClick={(e) => handleDownload(e, doc)}
            className="w-full sm:w-auto flex justify-center items-center gap-2
            text-white px-6 py-3 rounded-xl shadow transition
            bg-gradient-to-r from-[#0E145E] to-[#B37BD6]
            hover:opacity-90"
          >
            <Download size={18} />
            Download PDF
          </button>

          <button
            onClick={() => handlePreview(doc)}
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
