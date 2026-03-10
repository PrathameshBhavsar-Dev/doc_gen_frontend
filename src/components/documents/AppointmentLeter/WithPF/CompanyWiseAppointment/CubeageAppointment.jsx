import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import cubeage_stamp from "../../../../../assets/images/cubeagetechnology/cubeage_stamp.png";

/* ---------------- Helpers ---------------- */

const fmt = (n) =>
  Number(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const round0 = (n) => Math.round(n);

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return isNaN(d)
    ? date
    : d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
};

/* ---------------- Page Layout ---------------- */

const PageLayout = ({ children, company }) => (
  <Box
    sx={{
      width: "210mm",
      minHeight: "297mm",
      backgroundColor: "white",
      fontFamily: "'Calibri','Arial',sans-serif",
      marginBottom: "20px",
      "@media print": { marginBottom: 0, breakAfter: "page" },
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        px: 4,
        py: 2,
        borderBottom: "2px solid #000",
      }}
    >
      <Box>
        {company.logo && (
          <img src={company.logo} alt="logo" style={{ height: 70 }} />
        )}
      </Box>
      <Box>
        <Typography fontWeight="bold" fontSize="18px">
          {company.name}
        </Typography>
        <Typography fontSize="11px">{company.address}</Typography>
        <Typography fontSize="11px">
          Contact No: {company.phone}
        </Typography>
        <Typography fontSize="11px">
          Email: {company.email}
        </Typography>
      </Box>
    </Box>

    <Box sx={{ px: 7, py: 3 }}>{children}</Box>
  </Box>
);

const TC = (extra = {}) => ({
  border: "1px solid #000",
  padding: "6px 10px",
  fontSize: "12.5px",
  ...extra,
});

/* ============================================================ */

const CubeageOffer = ({ company = {}, data = {} }) => {
  const annualCTC = round0(Number(data.salary || 0));
  const monthlyCTC = round0(annualCTC / 12);

  const basic = round0(monthlyCTC * 0.48);
  const hra = round0(monthlyCTC * 0.18);
  const da = round0(monthlyCTC * 0.12);
  const allowance = round0(monthlyCTC * 0.16);
  // Special allowance as the balancing figure
  const special = monthlyCTC - (basic + hra + da + allowance);

  const rows = [
    ["Basic", basic],
    ["HRA", hra],
    ["DA", da],
    ["ALLOWANCE", allowance],
    ["SPECIAL ALLOWANCE", special],
  ];

  const candidateName = data.employeeName ? `${data.mrms || ""} ${data.employeeName}`.trim() : data.candidateName || "";
  const position = data.position || "";
  const location = data.workLocation || company.city || "";
  const joiningDate = data.joiningDate || "";
  const issueDate = data.issueDate || "";
  /* ---------------- PF Calculations ---------------- */

  // Fixed PF requirement
  const employeePF = 3750;

  const grossMonthly =
    basic + hra + da + allowance + special;

  const grossAnnual = grossMonthly * 12;

  const totalDeductionsMonthly = employeePF;

  const totalDeductionsAnnual = totalDeductionsMonthly * 12;

  /* CTC = Gross Only (No Employer PF) */
  const totalCTCMonthly = grossMonthly;
  const totalCTCAnnual = grossAnnual;
  return (

    <Box>

      {/* ================= PAGE 1 ================= */}
      <PageLayout company={company}>

        <Typography align="center" fontWeight="bold" fontSize="16px" mb={2}>
          Appointment Letter
        </Typography>

        <Typography align="right" mb={2}>
          {formatDate(issueDate)}
        </Typography>

        <Typography mb={2}>
          Employee Name: <strong>{candidateName}</strong>
        </Typography>

        <Typography mb={2}>
          Dear <strong>{candidateName}</strong>,
        </Typography>

        <Typography textAlign="justify" mb={2}>
          With reference to your application and the subsequent interview you had with us,
          we are pleased to offer you the position of <strong>{position}</strong> for <strong>{location} </strong> Location on the following terms and conditions:
        </Typography>

        <Typography fontWeight="bold">1. Date of Appointment</Typography>
        <Typography mb={2}>
          Your appointment is effective from <strong>{formatDate(joiningDate)}</strong>.
        </Typography>

        <Typography fontWeight="bold">2. Joining</Typography>
        <Typography mb={2}>
          Your Joining will be at “<strong>{company.name}</strong>”, “<strong>{location}</strong>”.
        </Typography>

        <Typography fontWeight="bold">3. Place of Employment</Typography>
        <Box sx={{ pl: 3 }}>
          <Typography textAlign="justify" mb={1}>
            3.1 You acknowledge and agree that you may be assigned, transferred or deputed
            to offices, departments or Units of Company and/or its affiliates and/or their
            contractors and clients, whether in India or abroad. In the event of any such
            assignment, transfer or deputation, you may be required to consent to and/or
            agree to certain other agreements, or policies applicable to such an assignment,
            deputation or transfer.
          </Typography>
          <Typography textAlign="justify" mb={2}>
            3.2 In the event of any assignment, transfer or deputation of your services,
            your salary and other benefits may be adjusted in accordance with the
            company’s policies with respect to such an assignment, transfer or deputation.
          </Typography>
        </Box>

        <Typography fontWeight="bold">4. Cost to Company</Typography>
        <Typography textAlign="justify" mb={2}>
          You will be paid an annual emolument of <strong>Rs. {fmt(annualCTC)}/-</strong>.
          For detailed Break-up kindly refer the Annexure I.
        </Typography>

        <Typography textAlign="justify" mb={2}>
          Your compensation may be reviewed on periodic basis and your salary may be adjusted,
          depending upon various factors, including your performance during the preceding period.
        </Typography>

        <Typography textAlign="justify">
          Notwithstanding the above, you acknowledge that it is Company’s policy to review
          the compensation payable to its employees for successive years and such compensation
          may be higher or lower than the compensation received for the previous year depending
          upon various factors, including the overall performance of the Company.
        </Typography>

      </PageLayout>
      {/* ================= PAGE 2 ================= */}
      <PageLayout company={company}>

        <Typography fontWeight="bold">5. Working hours</Typography>
        <Typography mb={2}>
          Normal hours are as determined by the company but your responsibility is to
          ensure that the assigned deliverables are completed within the allocated duration.
        </Typography>

        <Typography fontWeight="bold">6. Probation</Typography>
        <Box sx={{ pl: 3 }}>
          <Typography mb={1} sx={{ display: 'list-item', listStyleType: 'lower-alpha', ml: 2 }}>
            You will be on probation for a period of Three months.
          </Typography>
          <Typography mb={2} sx={{ display: 'list-item', listStyleType: 'lower-alpha', ml: 2 }}>
            The period of probation can be extended at the discretion of the Management
            and you will continue to be on probation till you are communicated otherwise.
          </Typography>
        </Box>

        <Typography fontWeight="bold">7. Non-competition</Typography>
        <Typography textAlign="justify" mb={2}>
          You agree with the Company that you will not, during the continuance of your employment
          with the Company, carry on or be engaged, directly or indirectly, either on your own
          behalf or on behalf of any person, or as manager, agent, consultant or employee of any
          person, firm or company, in any activity or business, in India or overseas, which shall
          directly or indirectly be in competition with the business of the Company or its
          subsidiaries or associated companies.
        </Typography>

        <Typography fontWeight="bold">8. Court Cases / Police Cases</Typography>
        <Typography textAlign="justify" mb={2}>
          You will submit a firm undertaking / confirmation in writing that there are no
          police cases / court cases pending in any court in India. If such undertaking
          submitted by you is found to be false, then this Offer-cum-Appointment letter
          shall stand terminated with immediate effect and you shall not be entitled to
          any compensation for any services you may have rendered.
        </Typography>

        <Typography fontWeight="bold">9. Confidentiality</Typography>
        <Box sx={{ pl: 3 }}>
          <Typography textAlign="justify" mb={1}>
            9.1 You agree that in the course of your employment you will have access to and
            be entrusted with information in respect of the business of the Company including
            intellectual property, processes and product specifications, etc. and relating to
            its dealings, transactions and affairs and likewise in relation to its subsidiaries,
            associated companies, customers or clients all of which information is or may be
            of a confidential nature.
          </Typography>

          <Typography textAlign="justify" mb={1}>
            9.2 You shall not, except in the proper course of performance of your duties during
            or at any time after the period of your employment or as may be required by law,
            divulge or disclose to any person whatsoever, any Confidential Information of the
            Company or any of its subsidiaries or associated companies or any of its or their
            suppliers, agents, distributors or customers.
          </Typography>

          <Typography textAlign="justify" mb={1}>
            9.3 All notes, memoranda, documents and Confidential Information concerning the
            business of the Company and its subsidiaries or associated companies or any of its
            or their suppliers, agents, distributors or customers which shall be acquired,
            received or made by you during the course of your employment shall be property of
            the Company and shall be surrendered by you to the Company upon the termination or
            at the request of the Company at any time during the course of your employment.
          </Typography>

          <Typography textAlign="justify">
            9.4 Confidential Information means information relating to the business, products,
            affairs and finances of the Company or any of its associated company or subsidiary
            for the time being confidential to it or to them and trade secrets (including without
            limitation, technical data and know-how) relating to the business of the Company or
            of any of its Associated Company/ies or of any of its or their suppliers, clients or customers.
          </Typography>
        </Box>

      </PageLayout>

      {/* ================= PAGE 3 ================= */}
      <PageLayout company={company}>

        {/* Clauses 10–12 */}

        <Typography fontWeight="bold">10. Travel</Typography>
        <Typography mb={2}>
          Any work related travel will be paid by the company as per the expenditure policies
          of the company. A copy of this policy will be provided to you by your HR coordinator.
        </Typography>

        <Typography fontWeight="bold">11. Joining Formalities</Typography>
        <Typography mb={2}>
          This offer is subject to your completing joining formalities as specified in Annexure II
          and your confidential report being found satisfactory from the references provided to us.
        </Typography>

        <Typography fontWeight="bold">12. Termination</Typography>
        <Typography textAlign="justify" mb={2}>
          Your services can be terminated by either party after giving one month’s notice.
          If your services are terminated at your initiative, the company reserves the right
          to insist on full compliance to the notice period and may initiate appropriate legal remedies.
        </Typography>

        <Typography textAlign="justify" mb={2}>
          Your employment is subject to positive Background Verification done by the Company.
          If any document/s or information submitted by you is/are found to be false,
          your offer shall stand terminated with immediate effect without any prior notice
          and you will not be entitled to any dues / claims.
        </Typography>

        <Typography textAlign="justify" mb={2}>
          Please note that you are expected to keep the salary package strictly confidential
          and you cannot discuss or divulge any details to any of your colleagues.
        </Typography>

        <Typography mt={3}>
          If the offer is acceptable to you, you are requested to get in touch with us
          on your joining day to complete your joining formalities.
        </Typography>

        <Typography mt={2}>
          You are requested to sign on the copy of this letter as your acceptance
          of the above terms and conditions and submit the same to us on your joining day.
        </Typography>

        <Typography mt={3}>
          We look forward to have you on our team.
        </Typography>

        {/* SIGNATURE BLOCK */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mt: 8,
          }}
        >

          {/* LEFT SIDE – Company Signature */}
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                my: 2,
              }}
            >
              {/* Stamp */}
              <img
                src={cubeage_stamp}
                alt="stamp"
                style={{
                  height: 100,
                }}
              />

              {/* Signature */}
              {company.signature && (
                <img
                  src={company.signature}
                  alt="signature"
                  style={{
                    height: 60,
                    display: "block",
                  }}
                />
              )}
            </Box>

            <Typography>Authorized Signature</Typography>
            <Typography fontWeight="bold">
              For {company.name}
            </Typography>
          </Box>

          {/* RIGHT SIDE – Employee Acceptance */}
          <Box>
            <Typography fontWeight="bold">Accepted By:</Typography>
            <Typography mt={6}>_________________________</Typography>
            <Typography>{candidateName}</Typography>
            <Typography>Date: __________________</Typography>
          </Box>

        </Box>
      </PageLayout>
      {/* ================= PAGE 4 – WITH PF ================= */}
      <PageLayout company={company}>

        <Typography
          align="center"
          fontWeight="bold"
          fontSize="16px"
          sx={{ textDecoration: "underline" }}
          mb={2}
        >
          Annexure I
        </Typography>

        <Typography align="center" fontWeight="bold" fontSize="15px" mb={3}>
          Compensation Structure
        </Typography>

        <Typography mb={1} fontSize="14px">
          <strong>Name:{candidateName}</strong>
        </Typography>

        <Typography mb={1} fontSize="14px">
          <strong>Designation:  {position} </strong>
        </Typography>

        <Typography mb={3} fontSize="14px">
          <strong>Location: {location}</strong>
        </Typography>

        <Table
          sx={{
            width: "100%",
            borderCollapse: "collapse",
            border: "2px solid #000",
          }}
        >
          <TableBody>

            {/* Header */}
            <TableRow sx={{ backgroundColor: "#e8e8e8" }}>
              <TableCell sx={TC({ fontWeight: "bold", textAlign: "center" })}>
                Components
              </TableCell>
              <TableCell sx={TC({ fontWeight: "bold", textAlign: "center" })}>
                Monthly (₹)
              </TableCell>
              <TableCell sx={TC({ fontWeight: "bold", textAlign: "center" })}>
                Annual (₹)
              </TableCell>
            </TableRow>

            {/* Earnings */}
            {rows.map(([label, value]) => (
              <TableRow key={label}>
                <TableCell sx={TC()}>{label}</TableCell>
                <TableCell sx={TC({ textAlign: "center" })}>
                  {fmt(value)}
                </TableCell>
                <TableCell sx={TC({ textAlign: "center" })}>
                  {fmt(value * 12)}
                </TableCell>
              </TableRow>
            ))}

            {/* PF */}
            <TableRow>
              <TableCell sx={TC()}>PROVIDENT FUND</TableCell>
              <TableCell sx={TC({ textAlign: "center" })}>
                {fmt(employeePF)}
              </TableCell>
              <TableCell sx={TC({ textAlign: "center" })}>
                {fmt(employeePF * 12)}
              </TableCell>
            </TableRow>

            {/* Final CTC */}
            <TableRow sx={{ backgroundColor: "#e8e8e8" }}>
              <TableCell sx={TC({ fontWeight: "bold", fontSize: "15px" })}>
                Total CTC
              </TableCell>
              <TableCell sx={TC({ fontWeight: "bold", textAlign: "center" })}>
                {fmt(totalCTCMonthly)}
              </TableCell>
              <TableCell sx={TC({ fontWeight: "bold", textAlign: "center" })}>
                {fmt(totalCTCAnnual)}
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>

      </PageLayout>
      {/* ================= PAGE 5 ================= */}
      <PageLayout company={company}>

        <Typography
          align="center"
          fontWeight="bold"
          fontSize="16px"
          sx={{ textDecoration: "underline" }}
          mb={3}
        >
          Annexure II
        </Typography>

        <Typography
          align="center"
          fontWeight="bold"
          fontSize="15px"
          mb={4}
        >
          Joining Formalities
        </Typography>

        <Box
          component="ol"
          sx={{
            pl: 4,
            fontSize: "14px",
          }}
        >
          {[
            "Photocopy of Birth Certificate / S.S.C. Certificate",
            "Photocopy of Final Year Mark Sheet",
            "Photocopy of Degree / Post Graduate Certificate",
            "Previous Employment Certificate",
            "Previous Employment Relieving Letter",
            "Certificate of Last Drawn Salary / Salary Slip",
            "Form 16 (if applicable)",
            "Photocopy of Aadhar Card",
            "Photocopy of PAN Card",
            "Three Passport Size Photographs",
            "Copy of Bank Account Proof",
          ].map((item, index) => (
            <li key={index} style={{ marginBottom: "14px" }}>
              {item}
            </li>
          ))}
        </Box>

        <Typography mt={4} fontSize="13px" fontStyle="italic">
          * All documents must be submitted at the time of joining for verification purposes.
        </Typography>

      </PageLayout>
    </Box>
  );
};

export default CubeageOffer;