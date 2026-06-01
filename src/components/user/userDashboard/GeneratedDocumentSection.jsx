import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, IconButton, Chip } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toCamelCase } from "../../../utils/textFormat.js";

import ROUTES from "../../../core/constants/routes.constant";
import ApiService from "../../../core/services/api.service";
import ServerUrl from "../../../core/constants/serverURL.constant";
import { generatePDF } from "../../../utils/pdfUtils.js";
import { getTemplateComponent } from "../../../utils/templateResolver.js";
import {
  resolveCompany,
  resolveTypeField,
} from "../../../utils/companyRegistry.js";

// ✅ Removed: useRef, hiddenDocRef, selectedDoc, TemplateComponent

function GeneratedDocumentSection() {
  const navigate = useNavigate();
  const api = new ApiService();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 10;
  const [totalCount, setTotalCount] = useState(0);
  const [downloadingId, setDownloadingId] = useState(null); // ✅ track loading per row

  const fetchDocuments = async (currentPage = 1) => {
    try {
      setLoading(true);
      const res = await api.apiget(
        `${ServerUrl.API_ALL_DOCUMENTS}?page=${currentPage}`,
      );
      const docs = res?.data || [];
      const totalPages = res?.pages || 1;
      const normalizedDocs = docs.map((item) => ({
        ...item,
        employeeName: toCamelCase(item.employeeName),
        company: toCamelCase(item.company),
        issuedTo: toCamelCase(item.issuedTo),
        issuedByName:
          typeof item.issuedBy === "object"
            ? item.issuedBy?.name
            : item.issuedBy,
      }));
      setTotalCount(res?.total || 0);
      setDocuments(normalizedDocs);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments(page);
  }, [page]);

  // ✅ New clean download handler
  const handleDownload = async (e, item) => {
    e.stopPropagation();

    const normalizedType = item.documentType
      ?.replace(/([a-z])([A-Z])/g, "$1_$2")
      ?.replace(/[\s\-]+/g, "_")
      ?.toLowerCase();

    const TemplateComponent = getTemplateComponent(normalizedType);

    if (!TemplateComponent) {
      console.error("No template found for type:", normalizedType);
      return;
    }

    // ✅ Resolve full company object from mockdata using name string
    const companyObject = resolveCompany(item?.company);

    if (!companyObject) {
      console.error("Could not resolve company for:", item?.company);
      return;
    }

    // ✅ Resolve the correct PF type field for this document type
    const resolvedType = resolveTypeField(item);

    const enrichedData = {
      ...item,
      // ✅ Normalize all type fields so every template finds what it needs
      offerType: resolvedType || item?.offerType,
      appointmentType: resolvedType || item?.appointmentType,
      incrementType: resolvedType || item?.incrementType,
      confirmationType: resolvedType || item?.confirmationType,
      salaryType: resolvedType || item?.salaryType,
      finalType: resolvedType || item?.finalType,
      internshipType: resolvedType || item?.internshipType,
    };

    console.log("✅ companyObject:", companyObject); // should show full object with header/footer
    console.log("✅ enrichedData:", enrichedData); // should show correct type fields
    console.log("🚀 TEMPLATE:", TemplateComponent);
    console.log("🚀 DATA:", freshData);
    console.log("🚀 COMPANY:", previewCompany);

    const docId = item._id || item.id;
    setDownloadingId(docId);

    try {
      await generatePDF(
        TemplateComponent,
        { data: enrichedData, company: companyObject },
        `${item.documentType}-${item.employeeName}`,
      );
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "hidden",
        mt: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 0 },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "16px", sm: "18px", md: "20px" },
          fontWeight: 600,
          color: "#1F2937",
          mb: { xs: 2, sm: 2.5, md: 3 },
          px: { xs: 1, sm: 2 },
        }}
      >
        Today's generated documents
      </Typography>

      <Paper
        sx={{
          borderRadius: { xs: "12px", sm: "14px", md: "16px" },
          boxShadow: "0px 20px 50px rgba(0,0,0,0.06)",
          overflow: "hidden",
          maxWidth: "100%",
        }}
      >
        {/* Desktop Table View */}
        <Box sx={{ display: { xs: "none", lg: "block" }, overflowX: "auto" }}>
          <Box sx={{ minWidth: 1100 }}>
            {/* Header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1.5fr 1.5fr 1.5fr 1fr 1fr 1fr",
                backgroundColor: "#ebecf9",
                px: 4,
                py: 2,
                fontSize: "13px",
                fontWeight: 500,
                color: "#6B7280",
              }}
            >
              <Box>Document Type</Box>
              <Box>Employee</Box>
              <Box>Company</Box>
              <Box sx={{ ml: 5 }}>Generated by</Box>
              <Box>Date</Box>
              <Box>Status</Box>
              <Box textAlign="center">Actions</Box>
            </Box>
          </Box>
        </Box>

        {/* Mobile Card View */}
        <Box
          sx={{
            display: { xs: "block", xl: "none" },
            px: { xs: 1.5, sm: 2 },
            py: { xs: 2, sm: 3 },
          }}
        >
          {loading && (
            <Box sx={{ p: 2, textAlign: "center", fontSize: "14px" }}>
              Loading documents...
            </Box>
          )}
          {!loading && totalCount === 0 && (
            <Box sx={{ p: 2, textAlign: "center", fontSize: "14px" }}>
              No documents found
            </Box>
          )}

          {!loading &&
            documents.map((item, index) => {
              const docId = item._id || item.id;
              const isDownloading = downloadingId === docId;

              return (
                <Box
                  key={index}
                  onClick={() =>
                    navigate(ROUTES.USERDOCUMENT_DETAIL, {
                      state: { document: item },
                    })
                  }
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #E5E7EB",
                    p: { xs: 2, sm: 2.5 },
                    mb: { xs: 2, sm: 2.5 },
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f9fafb",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  {/* Mobile Card Content */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                      },
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    {/* Document Type & Employee */}
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "#6B7280",
                          mb: 0.5,
                          fontWeight: 600,
                        }}
                      >
                        DOCUMENT TYPE
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          mb: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "10px",
                            background:
                              "linear-gradient(to bottom right, #393B8B, #AD78D2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            flexShrink: 0,
                          }}
                        >
                          <InsertDriveFileOutlinedIcon
                            sx={{ fontSize: "16px" }}
                          />
                        </Box>
                        <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                          {item.documentType || "Document"}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "#6B7280",
                          mb: 0.5,
                          fontWeight: 600,
                        }}
                      >
                        EMPLOYEE
                      </Typography>
                      <Typography
                        sx={{ fontSize: "13px", fontWeight: 500, mb: 0.5 }}
                      >
                        {item.employeeName || item.employee || "—"}
                      </Typography>
                      <Typography sx={{ fontSize: "11px", color: "#9CA3AF" }}>
                        {item.employeeId || item.id || "—"}
                      </Typography>
                    </Box>

                    {/* Company & Generated By */}
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "#6B7280",
                          mb: 0.5,
                          fontWeight: 600,
                        }}
                      >
                        COMPANY
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 500,
                          mb: 2,
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        {item.company || "—"}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "#6B7280",
                          mb: 0.5,
                          fontWeight: 600,
                        }}
                      >
                        GENERATED BY
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 500,
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        {item.issuedByName || "—"}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Date & Status */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                      },
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "#6B7280",
                          mb: 0.5,
                          fontWeight: 600,
                        }}
                      >
                        DATE
                      </Typography>
                      <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )
                          : item.date || "—"}
                      </Typography>
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "#6B7280",
                          mb: 0.5,
                          fontWeight: 600,
                        }}
                      >
                        STATUS
                      </Typography>

                      <Chip
                        icon={
                          <CheckCircleOutlineIcon
                            sx={{
                              fontSize: { xs: 13, sm: 14 },
                              color: "#15803D",
                            }}
                          />
                        }
                        label={item.paymentStatus || "Completed"}
                        sx={{
                          backgroundColor: "#DCFCE7",
                          color: "#15803D",

                          width: "fit-content",
                          maxWidth: "100%",

                          minHeight: { xs: 26, sm: 28 },
                          height: "auto",

                          fontWeight: 500,
                          fontSize: { xs: "10px", sm: "11px" },

                          borderRadius: "999px",

                          display: "flex",
                          alignItems: "center",

                          px: 0.5,

                          "& .MuiChip-icon": {
                            marginLeft: "6px",
                            marginRight: "-2px",
                            fontSize: { xs: 13, sm: 14 },
                            color: "#15803D",
                          },

                          "& .MuiChip-label": {
                            display: "block",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            lineHeight: 1.2,

                            paddingLeft: "4px",
                            paddingRight: "10px",

                            py: "4px",
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Actions */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: {
                        xs: "flex-start",
                        sm: "flex-end",
                      },
                      flexWrap: "wrap",
                      rowGap: 1,
                      gap: 0.75,
                    }}
                  >
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(ROUTES.EDIT_DOCUMENT, {
                          state: { document: item },
                        });
                      }}
                      sx={{
                        backgroundColor: "#FEF3C7",
                        borderRadius: "10px",
                        width: 32,
                        height: 32,
                        "&:hover": { backgroundColor: "#FDE68A" },
                      }}
                    >
                      <FiEdit size={14} color="#D97706" />
                    </IconButton>

                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(ROUTES.USERDOCUMENT_DETAIL, {
                          state: { document: item },
                        });
                      }}
                      sx={{
                        backgroundColor: "#E0E7FF",
                        borderRadius: "10px",
                        width: 32,
                        height: 32,
                        "&:hover": { backgroundColor: "#C7D2FE" },
                      }}
                    >
                      <VisibilityOutlinedIcon
                        sx={{ fontSize: 16, color: "#4F46E5" }}
                      />
                    </IconButton>

                    <IconButton
                      onClick={(e) => handleDownload(e, item)}
                      disabled={isDownloading}
                      sx={{
                        backgroundColor: isDownloading ? "#F3F4F6" : "#DCFCE7",
                        borderRadius: "10px",
                        width: 32,
                        height: 32,
                        "&:hover": {
                          backgroundColor: isDownloading
                            ? "#F3F4F6"
                            : "#BBF7D0",
                        },
                      }}
                    >
                      <DownloadOutlinedIcon
                        sx={{
                          fontSize: 16,
                          color: isDownloading ? "#9CA3AF" : "#16A34A",
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>
              );
            })}
        </Box>

        {/* Desktop Table Rows */}
        <Box sx={{ display: { xs: "none", xl: "block" } }}>
          <Box>
            {loading && (
              <Box sx={{ p: 4, textAlign: "center" }}>Loading documents...</Box>
            )}
            {!loading && totalCount === 0 && (
              <Box sx={{ p: 4, textAlign: "center" }}>No documents found</Box>
            )}

            {!loading &&
              documents.map((item, index) => {
                const docId = item._id || item.id;
                const isDownloading = downloadingId === docId;

                return (
                  <Box
                    key={index}
                    onClick={() =>
                      navigate(ROUTES.USERDOCUMENT_DETAIL, {
                        state: { document: item },
                      })
                    }
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1.5fr 1.5fr 1.5fr 1fr 1fr 1fr",
                      px: { md: 3, lg: 4 },
                      py: { md: 2.5, lg: 3 },
                      alignItems: "center",
                      borderTop: "1px solid #F1F1F4",
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f9fafb" },
                    }}
                  >
                    {/* Document Type */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: { md: 1.5, lg: 2 },
                      }}
                    >
                      <Box
                        sx={{
                          width: { md: 36, lg: 40 },
                          height: { md: 36, lg: 40 },
                          borderRadius: "12px",
                          background:
                            "linear-gradient(to bottom right, #393B8B, #AD78D2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          flexShrink: 0,
                        }}
                      >
                        <InsertDriveFileOutlinedIcon
                          sx={{ fontSize: { md: 18, lg: 20 } }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: { md: "13px", lg: "14px" },
                          fontWeight: 500,
                        }}
                      >
                        {item.documentType || "Document"}
                      </Typography>
                    </Box>

                    {/* Employee */}
                    <Box>
                      <Typography
                        sx={{
                          fontSize: { md: "13px", lg: "14px" },
                          fontWeight: 500,
                        }}
                      >
                        {item.employeeName || item.employee || "—"}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { md: "11px", lg: "12px" },
                          color: "#9CA3AF",
                        }}
                      >
                        {item.employeeId || item.id || "—"}
                      </Typography>
                    </Box>

                    {/* Company */}
                    <Typography
                      sx={{
                        fontSize: { md: "13px", lg: "14px" },
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.company || "—"}
                    </Typography>

                    {/* Generated By */}
                    <Typography
                      sx={{
                        fontSize: { md: "13px", lg: "14px" },
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        ml: { md: 3, lg: 5 },
                      }}
                    >
                      {item.issuedByName || "—"}
                    </Typography>

                    {/* Date */}
                    <Typography sx={{ fontSize: { md: "13px", lg: "14px" } }}>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                        : item.date || "—"}
                    </Typography>

                    {/* Status */}
                    <Box>
                      <Chip
                        icon={
                          <CheckCircleOutlineIcon
                            sx={{
                              backgroundColor: "#DCFCE7",
                              fontSize: { md: 16, lg: 18 },
                              color: "#15803D",
                            }}
                          />
                        }
                        label={item.paymentStatus || "Completed"}
                        sx={{
                          backgroundColor: "#DCFCE7",
                          color: "#15803D",
                          fontWeight: 500,
                          fontSize: { md: "12px", lg: "13px" },
                          px: { md: 0.5, lg: 1 },
                          py: 0.5,
                          height: { md: "32px", lg: "36px" },
                          "& .MuiChip-icon": {
                            marginLeft: { md: "4px", lg: "8px" },
                          },
                          "& .MuiChip-label": {
                            paddingRight: { md: "8px", lg: "12px" },
                          },
                        }}
                      />
                    </Box>

                    {/* Actions */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: { md: 0.5, lg: 1 },
                      }}
                    >
                      {/* Edit */}
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(ROUTES.EDIT_DOCUMENT, {
                            state: { document: item },
                          });
                        }}
                        sx={{
                          backgroundColor: "#FEF3C7",
                          borderRadius: "12px",
                          width: { md: 32, lg: 36 },
                          height: { md: 32, lg: 36 },
                          "&:hover": { backgroundColor: "#FDE68A" },
                        }}
                      >
                        <FiEdit size={14} color="#D97706" />
                      </IconButton>

                      {/* View */}
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(ROUTES.USERDOCUMENT_DETAIL, {
                            state: { document: item },
                          });
                        }}
                        sx={{
                          backgroundColor: "#E0E7FF",
                          borderRadius: "12px",
                          width: { md: 32, lg: 36 },
                          height: { md: 32, lg: 36 },
                          "&:hover": { backgroundColor: "#C7D2FE" },
                        }}
                      >
                        <VisibilityOutlinedIcon
                          sx={{
                            fontSize: { md: 16, lg: 18 },
                            color: "#4F46E5",
                          }}
                        />
                      </IconButton>

                      {/* Download */}
                      <IconButton
                        onClick={(e) => handleDownload(e, item)}
                        disabled={isDownloading}
                        sx={{
                          backgroundColor: isDownloading
                            ? "#F3F4F6"
                            : "#DCFCE7",
                          borderRadius: "12px",
                          width: { md: 32, lg: 36 },
                          height: { md: 32, lg: 36 },
                          "&:hover": {
                            backgroundColor: isDownloading
                              ? "#F3F4F6"
                              : "#BBF7D0",
                          },
                        }}
                      >
                        <DownloadOutlinedIcon
                          sx={{
                            fontSize: { md: 16, lg: 18 },
                            color: isDownloading ? "#9CA3AF" : "#16A34A",
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "center", sm: "space-between" },
            alignItems: { xs: "stretch", sm: "center" },
            gap: { xs: 2, sm: 3 },
            px: { xs: 1.5, sm: 2, lg: 4 },
            py: { xs: 2.5, sm: 3 },
            borderTop: "1px solid #F1F1F4",
            backgroundColor: "#fff",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "12px", sm: "13px" },
              color: "#6B7280",
              fontWeight: 500,
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Showing {(page - 1) * rowsPerPage + 1}–
            {Math.min(page * rowsPerPage, totalCount)} of {totalCount} results
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
              backgroundColor: "#F9FAFB",
              borderRadius: "12px",
              p: { xs: "3px", sm: "4px" },
              flexWrap: "wrap",
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <Box
              onClick={() => page > 1 && setPage(page - 1)}
              sx={{
                px: { xs: 1.5, sm: 2 },
                py: { xs: "5px", sm: "6px" },
                borderRadius: "8px",
                cursor: page === 1 ? "not-allowed" : "pointer",
                color: page === 1 ? "#9CA3AF" : "#374151",
                fontSize: { xs: "12px", sm: "13px" },
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: page === 1 ? "transparent" : "#E5E7EB",
                },
              }}
            >
              ← Prev
            </Box>

            {(() => {
              const pages = [];
              const delta = 2;
              for (
                let i = Math.max(2, page - delta);
                i <= Math.min(totalPages - 1, page + delta);
                i++
              )
                pages.push(i);
              if (page - delta > 2) pages.unshift("...");
              if (page + delta < totalPages - 1) pages.push("...");
              const allPages = [
                1,
                ...pages,
                ...(totalPages > 1 ? [totalPages] : []),
              ];
              return allPages.map((pageNum, idx) =>
                pageNum === "..." ? (
                  <Box
                    key={`dots-${idx}`}
                    sx={{
                      px: { xs: 0.5, sm: 1 },
                      color: "#9CA3AF",
                      fontSize: { xs: "12px", sm: "13px" },
                    }}
                  >
                    …
                  </Box>
                ) : (
                  <Box
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    sx={{
                      minWidth: { xs: 28, sm: 32 },
                      height: { xs: 28, sm: 32 },
                      px: { xs: 0.5, sm: 1 },
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: { xs: "12px", sm: "13px" },
                      fontWeight: 600,
                      background:
                        page === pageNum
                          ? "linear-gradient(to bottom right, #393B8B, #AD78D2)"
                          : "transparent",
                      color: page === pageNum ? "#fff" : "#374151",
                      "&:hover": {
                        background:
                          page === pageNum
                            ? "linear-gradient(to bottom right, #2f3175, #9f63c7)"
                            : "#E5E7EB",
                      },
                    }}
                  >
                    {pageNum}
                  </Box>
                ),
              );
            })()}

            <Box
              onClick={() => page < totalPages && setPage(page + 1)}
              sx={{
                px: { xs: 1.5, sm: 2 },
                py: { xs: "5px", sm: "6px" },
                borderRadius: "8px",
                cursor: page === totalPages ? "not-allowed" : "pointer",
                color: page === totalPages ? "#9CA3AF" : "#374151",
                fontSize: { xs: "12px", sm: "13px" },
                fontWeight: 500,
                "&:hover": {
                  backgroundColor:
                    page === totalPages ? "transparent" : "#E5E7EB",
                },
              }}
            >
              Next →
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default GeneratedDocumentSection;
