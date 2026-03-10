import React from "react";
import {  Box,  Typography,  Table,  TableBody,  TableCell,  TableHead,  TableRow,} from "@mui/material";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
    : "";

/* ================= HELPERS ================= */
const round2 = (num) => Number(num.toFixed(2));

// auto detect monthly / annual
const normalizeAnnualCTC = (ctc) => {
  const value = Number(ctc || 0);
  return value < 100000 ? value * 12 : value;
};

/* ================= INCREMENT CALC ================= */
const calculateIncrement = (currentCTC, incrementPercentage) => {
  const annualCTC = normalizeAnnualCTC(currentCTC);
  const incrementAmount = round2(
    (annualCTC * Number(incrementPercentage || 0)) / 100
  );
  const newCTC = round2(annualCTC + incrementAmount);
  return { newCTC };
};

/* ================= A4 PAGE ================= */
const A4Page = ({ children, company }) => (
  <Box
    sx={{
      width: "210mm",
      minHeight: "297mm",
      background: "#fff",
      fontFamily: "Verdana, Geneva, sans-serif",
      mx: "auto",
      pageBreakAfter: "always",
    }}
  >
    {company?.header && (
      <img src={company.header} alt="header" style={{ width: "100%" }} />
    )}
    {children}
  </Box>
);

/* ================= PAGE 1 – INCREMENT LETTER ================= */
const IncrementLetterPage = ({ company, data }) => {
  const { employeeName, designation, issueDate, effectiveDate, newCTC } = data;

  return (
    <A4Page company={company}>
      <Box sx={{ px: "28mm", pt: "20mm" }}>
        <Typography align="center" fontSize={18} fontWeight="bold" mb={4} mt={-6}>
          Appraisal Letter
        </Typography>

        <Box textAlign="right" mb={7}>
          <Typography fontSize={14}>{formatDate(issueDate)}</Typography>
        </Box>

        <Typography fontSize={13} mb={3}>
          Dear <b>{employeeName}</b>,
        </Typography>

        <Typography fontSize={13} lineHeight={1.8} mb={3}>
          Congratulations on your promotion to the position of{" "}
          <b>{designation}</b>.Along with your new 
     responsibilities, we are please to offer you a salary increment. 
     Effective from <b>{formatDate(effectiveDate)}</b>, your revised annual
          Cost to Company (CTC) will be{" "}
          <b>₹ {newCTC.toLocaleString("en-IN")}</b>.
        </Typography>

       

        <Typography fontSize={13} mb={4}>
                       Your promotion is a reflection of your exceptional performance and leadership abilities in your previous
      role. We are confident that you will continue to excel in your new position and we look forward to seeing you
      take on new challenges.
        </Typography>

        <Typography fontSize={13} mb={4}>
        Thank you for your hard work and commitment to Quick Management Services Pvt Ltd. We are excited 
       to see you grow further on your career with us.
        </Typography>

        <Typography fontSize={13} mb={2}>
          Yours Sincerely,
        </Typography>

        {/* ✅ SIGN + STAMP FIX */}
        <Box display="flex" alignItems="center" gap={3} mb={1}>
          {company?. satish_sign && (
            <img
              src={company. satish_sign}
              alt="Signature"
              style={{ height: 55, objectFit: "contain" }}
            />
          )}
          {company?.stamp && (
            <img
              src={company.stamp}
              alt="Stamp"
              style={{ height: 85, objectFit: "contain" }}
            />
          )}
        </Box>

        <Typography fontSize={13} fontWeight="bold">
          {company?. ceoName}
        </Typography>
        <Typography fontSize={13} fontWeight="bold">CEO & Managing Director</Typography>
      </Box>
    </A4Page>
  );
};

/* ================= PAGE 2 – SALARY ANNEXURE ================= */
const SalaryAnnexurePage = ({ company, data }) => {
  const rows = data.salaryComponents;

const monthlyGross = rows
.filter(r => r.name !== "Provident Fund (PF)")
  .reduce((sum, r) => sum + r.monthly, 0);

const annualCTC = rows
  .filter(r => r.name !== "Provident Fund (PF)")
  .reduce((sum, r) => sum + r.annual, 0);

  return (
    <A4Page company={company}>
      <Box sx={{ px: "28mm", pt: "30mm" }}>
        <Typography align="center" fontSize={14} fontWeight="bold" mb={3}>
          Salary Annexure
        </Typography>

        <Table sx={{ border: "1px solid #000","& th, & td": { border: "1px solid #000", fontSize: 12, p: "6px", }, }}
        >
          <TableHead sx={{ backgroundColor: "#1fb5e9" }}>
            <TableRow>
              <TableCell align="center"><b>Monthly Component</b></TableCell>
              <TableCell align="center"><b>Amount (Rs.)</b></TableCell>
              {/* <TableCell align="center"><b>Yearly Component</b></TableCell> */}
              <TableCell align="center"><b>Amount (Rs.)</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r.name}</TableCell>
                <TableCell align="right">
                  {r.monthly.toLocaleString("en-IN")}
                </TableCell>
                {/* <TableCell>{r.name}</TableCell> */}
                <TableCell align="right">
                  {r.annual.toLocaleString("en-IN")}
                </TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: "#1fb5e9" }}>
              <TableCell><b>Monthly Gross</b></TableCell>
              <TableCell align="right">
                <b>{monthlyGross.toLocaleString("en-IN")}</b>
              </TableCell>
              {/* <TableCell><b>Annual CTC</b></TableCell> */}
              <TableCell align="right">
                <b>{annualCTC.toLocaleString("en-IN")}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </A4Page>
  );
};

/* ================= MAIN ================= */

const QuickIncrement = ({ company, data }) => {

  /* 1️⃣ Calculate New CTC */
  const { newCTC } = calculateIncrement(
    data.currentCTC,
    data.incrementPercentage
  );

  // ✅ ALWAYS use calculated value
  const annualCTC = Number(newCTC);

  /* 2️⃣ Generate Salary Breakup */
const generateSalaryBreakup = (annualCTC) => {

  // ✅ Monthly CTC
  const monthlyCTC = annualCTC / 12;

  // ✅ Percentages total = 100%
  const percentages = {
    basic: 0.48,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06
  };

  // ✅ Monthly calculations (rounded)
  const basic = round2(monthlyCTC * percentages.basic);
  const hra = round2(monthlyCTC * percentages.hra);
  const da = round2(monthlyCTC * percentages.da);
  const special = round2(monthlyCTC * percentages.special);
  const food = round2(monthlyCTC * percentages.food);

  // ✅ Annual = Monthly × 12 (important)
  const basicAnnual = round2(basic * 12);
  const hraAnnual = round2(hra * 12);
  const daAnnual = round2(da * 12);
  const specialAnnual = round2(special * 12);
  const foodAnnual = round2(food * 12);

  // ✅ Static PF (optional in CTC)
  const pfMonthly = 3750;
  const pfAnnual = pfMonthly * 12;

  return [
    { name: "Basic Salary", monthly: basic, annual: basicAnnual },
    { name: "House Rent Allowance", monthly: hra, annual: hraAnnual },
    { name: "Dearness Allowance", monthly: da, annual: daAnnual },
    { name: "Special Allowance", monthly: special, annual: specialAnnual },
    { name: "Food Allowance", monthly: food, annual: foodAnnual },
    { name: "Provident Fund (PF)", monthly: pfMonthly, annual: pfAnnual }
  ];
};

  const salaryComponents = generateSalaryBreakup(annualCTC);

  const finalData = {
    ...data,
    newCTC: annualCTC,
    salaryComponents
  };

  return (
    <>
      <IncrementLetterPage company={company} data={finalData} />
      <SalaryAnnexurePage company={company} data={finalData} />
    </>
  );
};

export default QuickIncrement;
