import React from "react";
import { Box, Typography } from "@mui/material";
import A4Layout from "../../../layout/A4Page";

/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];
    return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
};

/* ================= SHARED STYLES ================= */
const FONT = "'Calibri', 'Arial', sans-serif";
const PARA = {
    fontSize: "16px",
    fontFamily: FONT,
    lineHeight: 1.8,
    textAlign: "justify",
    mb: "6mm",
};

/* ================= COMPONENT ================= */
const CubeageCertification = ({ company, data }) => {
    return (
        <A4Layout headerSrc={company.header}>

            {/* DATE – top right */}
            <Box sx={{ textAlign: "right", fontFamily: FONT, fontWeight: "bold", fontSize: "13px", mt: "20mm", mr: "2mm" }}>
                Date: {formatDate(data.issueDate)}
            </Box>

            {/* TITLE */}
            <Typography
                sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "22px",
                    mt: "10mm",
                    mb: "10mm",
                    textDecoration: "underline",
                    fontFamily: FONT,
                    letterSpacing: "0.5px",
                }}
            >
                Internship Certificate
            </Typography>

            {/* CONTENT */}
            <Box sx={{ px: "5mm" }}>

                {/* Para 1 */}
                <Typography sx={PARA}>
                    We are pleased to certify that <strong>{data.employeeName}</strong>, has joined our
                    group to work on internship with organization name{" "}
                    <strong>Cubeage Technology Services Pvt. Ltd.</strong> The internship program held
                    on <strong>{formatDate(data.startDate)}</strong> to{" "}
                    <strong>{formatDate(data.completionDate)}</strong>.
                </Typography>

                {/* Para 2 */}
                <Typography sx={PARA}>
                    During the internship period, <strong>{data.employeeName}</strong> was actively
                    participated in project related tasks, shown their skills and abilities in{" "}
                    <strong>{data.role}</strong>.
                </Typography>

                {/* Para 3 */}
                <Typography sx={PARA}>
                    Through this internship experience, <strong>{data.employeeName}</strong> adopted
                    practical knowledge, best practices and exposure to real-world scenarios, which will
                    undoubtedly enhance their academic and professional development.
                </Typography>

                {/* Para 4 */}
                <Typography sx={{ ...PARA, mb: "10mm" }}>
                    Thank you for your successful completion &amp; cooperation and support in facilitating
                    this internship opportunity.
                </Typography>

                {/* SIGNATURE SECTION */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mt: 2 }}>
                    {/* Left: Signature + stamp + label */}
                    <Box>
                        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 3, mb: 1 }}>
                            {company.signature && (
                                <img src={company.signature} alt="HR Signature" style={{ height: "50px" }} />
                            )}
                            {company.stamp && (
                                <img src={company.stamp} alt="Company Stamp" style={{ width: "100px" }} />
                            )}
                        </Box>
                        <Typography sx={{ fontSize: "14px", fontFamily: FONT }}>
                            Authorized Signature
                        </Typography>
                        <Typography sx={{ fontSize: "14px", fontFamily: FONT, fontWeight: "bold" }}>
                            For Cubeage Technology Services Pvt. Ltd.
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </A4Layout>
    );
};

export default CubeageCertification;
