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
  const monthlyCTC = round0(Number(data.salary || data.ctc || 0));

  // ================= UPDATED PERCENTAGES =================
  const basicMonthly = round0(monthlyCTC * 0.48); // 40% + 8%
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);

  // ================= STATIC PF =================
  const pfMonthly = 3750;

  // ================= ANNUAL VALUES =================
  const basicAnnual = basicMonthly * 12;
  const hraAnnual = hraMonthly * 12;
  const daAnnual = daMonthly * 12;
  const specialAnnual = specialMonthly * 12;
  const foodAnnual = foodMonthly * 12;
  const pfAnnual = pfMonthly * 12;

  // ================= SALARY TABLE =================
  const salaryRows = [
    ["Basic", basicMonthly, basicAnnual],
    ["Bouqet Of Benefits", hraMonthly, hraAnnual],
    ["HRA", daMonthly, daAnnual],
    ["City Allowance", specialMonthly, specialAnnual],
    ["Superannuation Fund", foodMonthly, foodAnnual],
    ["Provident Fund (PF)", pfMonthly, pfAnnual], // Separate
  ];

  // ================= TOTAL EARNINGS =================
  const totalMonthly =
    basicMonthly + hraMonthly + daMonthly + specialMonthly + foodMonthly;

  const totalAnnual = totalMonthly * 12;

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
        {/* =====================================================
    PAGE 1 – OFFER LETTER (FIXED LIKE INCREMENT)
===================================================== */}
        {/* =====================================================
    PAGE 1 – OFFER LETTER (FIXED LIKE INCREMENT)
===================================================== */}
        <Box>
          {/* CONTENT */}
          <Box>
            {/* DATE – RIGHT ALIGNED */}
            {/* <Typography sx={{ textAlign: "right", mb: 0 }}>
      {new Date(data.issueDate || new Date()).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })}
    </Typography> */}
            <Typography
              sx={{
                textAlign: "right",
                mb: "5mm",
                mt: "-12mm",
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
                textDecoration: "underline",
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
              <b>Rs.{formatCurrency(totalAnnual)}/-</b>
              as per Annexure A. This offer is made on the basis of your having
              furnished to the Company information and documents in support of
              your age, academic qualifications, previous work experience,
              relieving letter from your last employer and other particulars on
              or before your day of joining. The Company shall conduct a
              background and reference check as per Company policy and this
              appointment is conditional upon receiving positive feedback. If at
              any time it is found that you have furnished false information or
              withheld or suppressed any material fact or information, the
              Company shall be entitled to forthwith terminate your employment
              without notice. You are required to join the services of the
              Company at the earliest, but in any case, not later than{" "}
              <b>{formatDate(data.joiningDate)}.</b>
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
                  style={{ height: 42 }}
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
        </Box>
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
              mt: "-12mm",
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
          <SalaryStructureTable
            salaryRows={salaryRows}
            totalMonthly={totalMonthly}
            totalAnnual={totalAnnual}
            data={data}
            formatDate={formatDate}
          />
        </Box>
        {/* Signature Block */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 9 }}>
          <Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              {company?.signature && (
                <img
                  src={company.signature}
                  alt="Signature"
                  style={{ height: 45 }}
                />
              )}
              {company?.stamp && (
                <img src={company.stamp} alt="Stamp" style={{ height: 100 }} />
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


