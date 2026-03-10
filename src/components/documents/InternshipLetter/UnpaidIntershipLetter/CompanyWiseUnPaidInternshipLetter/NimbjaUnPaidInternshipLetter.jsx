import React from "react";
import { Box, Typography } from "@mui/material";
import A4Page from "../../../../layout/A4Page";

const NimbjaUnPaidinternshipLetter = ({ company = {}, data = {} }) => {
  // ✅ Safe firstName extraction
  const firstName =
    data?.employeeName && typeof data.employeeName === "string"
      ? data.employeeName.split(" ")[0]
      : "";

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "";

  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        fontFamily: `"Bahnschrift", "Yu Gothic", "Segoe UI", Arial, sans-serif`,
        "& *": {
          fontFamily: `"Bahnschrift", "Yu Gothic", "Segoe UI", Arial, sans-serif`,
        },
      }}
    >
      {/* ================= HEADER ================= */}
      <A4Page
        headerSrc={company.header}
        footerSrc={company.footer}
        // watermarkSrc={company.watermark}
      >
        {/* ================= CONTENT ================= */}
        <Box>
          {/* DATE */}
          <Typography
            sx={{
              textAlign: "right",
              mb: 3,
              fontFamily: "Bahnschrift",
              mt: "-10mm",
            }}
          >
            {formatDate(data.issueDate)}
          </Typography>

          <Typography
                                          sx={{
                                            textAlign: "Center",
                                            marginTop: "-8mm",
                                            mb: "5mm",
                                            fontFamily: "Verdana",
                                            textDecoration: "underline",
                                            fontSize: "15px",
                                          }}
                                        >
                                          Internship Letter
                                        </Typography>

          {/* NAME */}
          <Typography sx={{ mb: 1, fontFamily: "Bahnschrift" }}>
            <strong>Name :</strong> {data.mrms} {data.employeeName}
          </Typography>

          {/* SUBJECT */}
          <Typography sx={{ mb: 2, fontFamily: "Bahnschrift" }}>
            <strong>Subject :</strong> Letter of intent for the Internship of
            position as a <strong>{data.designation}</strong>
          </Typography>

          {/* GREETING */}
          <Typography sx={{ mb: 1, fontFamily: "Bahnschrift" }}>
            Dear {firstName},
          </Typography>

          {/* BODY */}
          <Typography
            sx={{ mb: 1, textAlign: "justify", fontFamily: "Bahnschrift",  }}
          >
            We are pleased to offer you the internship on position as a{" "}
            <strong>{data.designation}</strong> with{" "}
            <strong>Nimbja Security Solutions Pvt. Ltd.</strong> with effective
            date <strong>{formatDate(data.startDate)}</strong> considering your
            performance and support towards the organization.
          </Typography>

          {/* <Typography
            sx={{ mb: 1, textAlign: "justify", fontFamily: "Bahnschrift" }}
          >
            This Offline Internship program will commence on{" "}
            <strong>
              {formatDate(data.startDate)} End on {formatDate(data.endDate)}
            </strong>
          </Typography> */}

          <Typography
            sx={{ mb: 1, textAlign: "justify", fontFamily: "Bahnschrift" }}
          >
            As an Intern you will have the opportunity to work closely with our
            highly skilled team of Software Development professionals. In the
            internship you will get the key responsibilities and learning
            objectives.
          </Typography>

          <Typography
            sx={{ mb: 4, textAlign: "justify", fontFamily: "Bahnschrift" }}
          >
            During the continuance of your internship with the Company or any
            extension there of and even after the cessation of your internship
            with the Company by any reason whatsoever: You shall protect and
            will not disclose all confidential information that may come in your
            possession or knowledge by virtue of your internship with the
            Company and shall use such information only as may be required
            normal course of internship.
          </Typography>

          {/* <Typography
            sx={{
              mb: 1,
              textAlign: "justify",
              fontFamily: "Bahnschrift",
              mt: "-5mm",
            }}
          >
            Subject to various deductions as per companies and government
            policy.
          </Typography> */}

          {/* SIGN OFF */}
          <Typography sx={{ mb: 2, fontFamily: "Bahnschrift", }}>
            We welcome you to Nimbja Security Solutions Pvt. Ltd. Family and
            hope it would be the beginning of a long and mutually beneficial
            association.
          </Typography>

          <Typography sx={{ mb: 2, fontFamily: "Bahnschrift" }}>
            Yours Sincerely,
          </Typography>

          <Typography
            sx={{ fontWeight: 700, mb: 2, fontFamily: "Bahnschrift" }}
          >
            For Nimbja Security Solutions Pvt. Ltd.
          </Typography>

          {/* SIGNATURE + STAMP */}
          {/* SIGNATURE SECTION – EXACT AS IMAGE */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              mt: 5,
            }}
          >
            {/* LEFT – COMPANY SIGNATURE */}
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
              >
                {company?.signature && (
                  <img
                    src={company.signature}
                    alt="Signature"
                    style={{ height: 40 }}
                  />
                )}
                {company?.stamp && (
                  <img src={company.stamp} alt="Stamp" style={{ height: 90 }} />
                )}
              </Box>

              <Typography sx={{ fontWeight: 600, fontFamily: "Bahnschrift" }}>
                <strong>{company.hrName}</strong>
              </Typography>
              <Typography sx={{ fontSize: "14px", fontFamily: "Bahnschrift",mt:"-2mm" }}>
                <strong>HR Relations Lead</strong>
              </Typography>
            </Box>

            {/* RIGHT – CANDIDATE */}
          </Box>
        </Box>

        {/* ================= FOOTER ================= */}
      </A4Page>
    </Box>
  );
};

export default NimbjaUnPaidinternshipLetter;
