import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { formatCurrency } from "../../../../../utils/salaryCalculations";
import A4Page from "../../../../layout/A4Page";
import SalaryStructureTable from "../../../../common/SalaryStructureTable";

const NimbjaOffer = ({ company, data }) => {
  if (!company || !data) return null;

  // ================= HELPERS =================
  const round0 = (num) => Math.round(num);

  // ================= CTC =================
 const annualCTC = Number(data.salary || data.ctc || 0);

  // ================= SALARY TABLE =================
  

  const firstName = data.candidateName?.trim().split(" ")[0];

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "";

  return (
    <>
      {/* ================================================================= */}
      {/* ================= PAGE 1 – OFFER LETTER ================= */}
      {/* ================================================================= */}

      <A4Page
        headerSrc={company.header}
        footerSrc={company.footer}
        // watermarkSrc={company.watermark}
      >
        <Box
          component="img"
          src={company.watermark}
          alt="watermark"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            opacity: 0.4,
            zIndex: -1,
            pointerEvents: "none",
          }}
        />

        {/* CONTENT */}
        <Box
          className="a4-content-only"
          sx={{
            position: "relative",
            zIndex: 1,
            fontFamily: "Bahnschrift",
          }}
        >
          {/* CONTENT */}
          {/* <Box> */}

          <Typography
            sx={{
              textAlign: "right",
              mb: "5mm",
              mt: "-8mm",
              fontSize: "11pt",
              fontFamily: "Bahnschrift",
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

              fontSize: "15px",
            }}
          >
            Offer Letter
          </Typography>
          {/* NAME */}
          <Typography sx={{ mb: 2, fontFamily: "Bahnschrift" }}>
            Name : {data.mrms} {data.candidateName}
          </Typography>

          <Typography sx={{ mb: 2, fontFamily: "Bahnschrift", mt: "-2mm" }}>
            Address : {data.address}
          </Typography>

          {/* SUBJECT */}
          <Typography sx={{ mb: 2, fontFamily: "Bahnschrift", mt: "-2mm" }}>
            Subject : Letter of intent for the position of {data.position}
          </Typography>

          <Typography sx={{ mb: 3, fontFamily: "Bahnschrift" }}>
            Dear {firstName},
          </Typography>

          <Typography
            sx={{ mb: 2, textAlign: "justify", fontFamily: "Bahnschrift" }}
          >
            Welcome to {company.name} Quality is not just a destination but a
            journey in which every employee contributes. We invite you to be
            part of this journey! This has reference to your application and
            subsequent interviews you had with us. We are pleased to offer you
            the role of <b>{data.position} </b>
            {/* {new Date(data.joiningDate).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })} */}
            .
          </Typography>

          <Typography
            sx={{ mb: 2, textAlign: "justify", fontFamily: "Bahnschrift" }}
          >
            On Joining, your all-inclusive Cost to the Company (CTC) will be{" "}
            <b>Rs.{formatCurrency(annualCTC)}/-</b>
            as per Annexure A. This offer is made on the basis of your having
            furnished to the Company information and documents in support of
            your age, academic qualifications, previous work experience,
            relieving letter from your last employer and other particulars on or
            before your day of joining. The Company shall conduct a background
            and reference check as per Company policy and this appointment is
            conditional upon receiving positive feedback. If at any time it is
            found that you have furnished false information or withheld or
            suppressed any material fact or information, the Company shall be
            entitled to forthwith terminate your employment without notice. You
            are required to join the services of the Company at the earliest,
            but in any case, not later than{" "}
            <b>{formatDate(data.offerValidTill)}.</b>
          </Typography>

          <Typography sx={{ mb: 2, fontFamily: "Bahnschrift" }}>
            Thanking you and looking forward to having you with us.
          </Typography>

          <Typography sx={{ mb: 2, fontFamily: "Bahnschrift" }}>
            For <b>{company.name} </b>
          </Typography>

          {/* SIGNATURE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {company?.signature && (
              <img
                src={company.signature}
                alt="Signature"
                style={{ height: 42, marginTop: "2mm" }}
              />
            )}
            {company?.stamp && (
              <img src={company.stamp} alt="Stamp" style={{ height: 90 }} />
            )}
          </Box>

          <Typography sx={{ fontWeight: 600, fontFamily: "Bahnschrift" }}>
            {company.hrName}
          </Typography>
          <Typography sx={{ fontWeight: 600, fontFamily: "Bahnschrift" }}>
            HR Manager
          </Typography>
        </Box>
        {/* </Box> */}
      </A4Page>

      {/* ================================================================= */}
      {/* ================= PAGE 2 – ANNEXURE A ================= */}
      {/* ================================================================= */}

      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box className="a4-content-only">
          <Typography
            sx={{
              textAlign: "right",
              mb: "5mm",
              mt: "-8mm",
              fontSize: "11pt",
              fontFamily: "Bahnschrift",
            }}
          >
            {formatDate(data.issueDate)}
          </Typography>

          {/* <Typography
            sx={{ mb: "6mm", fontSize: "11pt", fontFamily: "Bahnschrift" }}
          >
            <strong>
              Ref:NSS\VER1.1\PUN\PIMGUR\ADM-TEST\NSS0757 {data.employeeId}
            </strong>
          </Typography>

          {/* 🔥 ONLY THIS PART IS REPLACED */}
          <SalaryStructureTable ctc={annualCTC} />
        </Box>

        <Box
          component="img"
          src={company.watermark}
          alt="watermark"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            opacity: 0.4,
            zIndex: -1,
            pointerEvents: "none",
          }}
        />

        {/* CONTENT */}
        <Box
          className="a4-content-only"
          sx={{
            position: "relative",
            zIndex: 2,
          }}
        ></Box>
        {/* Signature Block */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 9 }}>
          <Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              {company?.signature && (
                <img
                  src={company.signature}
                  alt="Signature"
                  style={{ height: 45, marginTop: "7mm" }}
                />
              )}
              {company?.stamp && (
                <img
                  src={company.stamp}
                  alt="Stamp"
                  style={{ height: 100, marginLeft: "-2mm" }}
                />
              )}
            </Box>
            <Typography mt={1} sx={{ fontFamily: "Bahnschrift" }}>
              {company.hrName}
            </Typography>
            <Typography sx={{ fontFamily: "Bahnschrift" }}>
              HR Relations Lead
            </Typography>
          </Box>

          <Box minWidth="250px" sx={{ mt: 13, fontFamily: "Bahnschrift" }}>
            <Typography sx={{ fontFamily: "Bahnschrift" }}>
              Signature: __________________
            </Typography>
            <Typography mt={2} sx={{ mt: 1.5, fontFamily: "Bahnschrift" }}>
              Candidate Name: {data.candidateName}
            </Typography>
          </Box>
        </Box>
      </A4Page>
    </>
  );
};

export default NimbjaOffer;
