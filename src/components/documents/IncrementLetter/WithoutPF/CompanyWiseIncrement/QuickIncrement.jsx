import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";

/* =========================================================
   DATE FORMAT
========================================================= */

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

/* =========================================================
   HELPERS
========================================================= */

// Safe number conversion
const toNumber = (value) => {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
};

// Round to 2 decimal places
const round2 = (num) => {
  return Math.round(toNumber(num) * 100) / 100;
};

/* =========================================================
   ANNUAL CTC
========================================================= */

/*
  data.newCTC is treated as ANNUAL CTC.

  Example:
  600000 = ₹6,00,000 per annum

  We do NOT auto-convert monthly to annual.
*/
const normalizeAnnualCTC = (ctc) => {
  return round2(ctc);
};

/* =========================================================
   NUMBER TO WORDS
========================================================= */

const numberToWords = (value) => {
  const num = Math.floor(toNumber(value));

  if (num === 0) {
    return "Zero";
  }

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const inWords = (n) => {
    if (n === 0) {
      return "";
    }

    if (n < 20) {
      return ones[n];
    }

    if (n < 100) {
      return (
        tens[Math.floor(n / 10)] +
        (n % 10 !== 0 ? " " + ones[n % 10] : "")
      );
    }

    if (n < 1000) {
      return (
        ones[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 !== 0 ? " " + inWords(n % 100) : "")
      );
    }

    if (n < 100000) {
      return (
        inWords(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 !== 0
          ? " " + inWords(n % 1000)
          : "")
      );
    }

    if (n < 10000000) {
      return (
        inWords(Math.floor(n / 100000)) +
        " Lakh" +
        (n % 100000 !== 0
          ? " " + inWords(n % 100000)
          : "")
      );
    }

    return (
      inWords(Math.floor(n / 10000000)) +
      " Crore" +
      (n % 10000000 !== 0
        ? " " + inWords(n % 10000000)
        : "")
    );
  };

  // Prevent undefined.trim() error
  return String(inWords(num) || "Zero").trim();
};

/* =========================================================
   SALARY BREAKUP
========================================================= */

const generateSalaryBreakup = (annualCTC) => {
  const yearlyCTC = round2(annualCTC);

  const PERCENT = {
    basic: 0.40,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
    facility: 0.08,
  };

  // Calculate annual values first
  // const basicAnnual = round2(yearlyCTC * PERCENT.basic);
  // const hraAnnual = round2(yearlyCTC * PERCENT.hra);
  // const daAnnual = round2(yearlyCTC * PERCENT.da);
  // const specialAnnual = round2(yearlyCTC * PERCENT.special);
  // const foodAnnual = round2(yearlyCTC * PERCENT.food);

  // // Facility is the balancing component
  // const facilityAnnual = round2(
  //   yearlyCTC -
  //     basicAnnual -
  //     hraAnnual -
  //     daAnnual -
  //     specialAnnual -
  //     foodAnnual
  // );

  const basicAnnual = Math.round(yearlyCTC * PERCENT.basic);
  const hraAnnual = Math.round(yearlyCTC * PERCENT.hra);
  const daAnnual = Math.round(yearlyCTC * PERCENT.da);
  const specialAnnual = Math.round(yearlyCTC * PERCENT.special);
  const foodAnnual = Math.round(yearlyCTC * PERCENT.food);

  // MISC Allowance balances the total exactly
  const facilityAnnual =
    Math.round(yearlyCTC) -
    basicAnnual -
    hraAnnual -
    daAnnual -
    specialAnnual -
    foodAnnual;

  // Calculate monthly values
  const basicMonthly = round2(basicAnnual / 12);
  const hraMonthly = round2(hraAnnual / 12);
  const daMonthly = round2(daAnnual / 12);
  const specialMonthly = round2(specialAnnual / 12);
  const foodMonthly = round2(foodAnnual / 12);
  const facilityMonthly = round2(facilityAnnual / 12);

  return [
    {
      name: "Basic Salary",
      monthly: basicMonthly,
      annual: basicAnnual,
    },
    {
      name: "House Rent Allowance",
      monthly: hraMonthly,
      annual: hraAnnual,
    },
    {
      name: "Dearness Allowance",
      monthly: daMonthly,
      annual: daAnnual,
    },
    {
      name: "Special Allowance",
      monthly: specialMonthly,
      annual: specialAnnual,
    },
    {
      name: "Food Allowance",
      monthly: foodMonthly,
      annual: foodAnnual,
    },
    {
      name: "MISC Allowance",
      monthly: facilityMonthly,
      annual: facilityAnnual,
    },
  ];
};

// const generateSalaryBreakup = (annualCTC) => {
//   const yearlyCTC = round2(annualCTC);

//   // Monthly Gross
//   const monthlyGross = round2(yearlyCTC / 12);

//   /* ================= PERCENTAGE STRUCTURE ================= */

//   const PERCENT = {
//     basic: 0.40,
//     hra: 0.18,
//     da: 0.12,
//     special: 0.16,
//     food: 0.06,
//     facility: 0.08,
//   };

//   /* ================= MONTHLY CALCULATION ================= */

//   const basicMonthly = round2(
//     monthlyGross * PERCENT.basic
//   );

//   const hraMonthly = round2(
//     monthlyGross * PERCENT.hra
//   );

//   const daMonthly = round2(
//     monthlyGross * PERCENT.da
//   );

//   const specialMonthly = round2(
//     monthlyGross * PERCENT.special
//   );

//   const foodMonthly = round2(
//     monthlyGross * PERCENT.food
//   );

//   /*
//     Facility Allowance is calculated as the balance.

//     This ensures the total monthly salary always
//     matches monthlyGross even if rounding occurs.
//   */

//   const facilityMonthly = round2(
//     monthlyGross -
//     (
//       basicMonthly +
//       hraMonthly +
//       daMonthly +
//       specialMonthly +
//       foodMonthly
//     )
//   );

//   /* ================= ANNUAL CALCULATION ================= */

//   const basicAnnual = round2(
//     basicMonthly * 12
//   );

//   const hraAnnual = round2(
//     hraMonthly * 12
//   );

//   const daAnnual = round2(
//     daMonthly * 12
//   );

//   const specialAnnual = round2(
//     specialMonthly * 12
//   );

//   const foodAnnual = round2(
//     foodMonthly * 12
//   );

//   const facilityAnnual = round2(
//     facilityMonthly * 12
//   );

//   /* ================= RETURN ROWS ================= */

//   return [
//     {
//       name: "Basic Salary",
//       monthly: basicMonthly,
//       annual: basicAnnual,
//     },

//     {
//       name: "House Rent Allowance",
//       monthly: hraMonthly,
//       annual: hraAnnual,
//     },

//     {
//       name: "Dearness Allowance",
//       monthly: daMonthly,
//       annual: daAnnual,
//     },

//     {
//       name: "Special Allowance",
//       monthly: specialMonthly,
//       annual: specialAnnual,
//     },

//     {
//       name: "MISC Allowance",
//       monthly: facilityMonthly,
//       annual: facilityAnnual,
//     },

//     {
//       name: "Food Allowance",
//       monthly: foodMonthly,
//       annual: foodAnnual,
//     },
//   ];
// };

/* =========================================================
   A4 PAGE
========================================================= */

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
      <img
        src={company.header}
        alt="header"
        style={{
          width: "100%",
        }}
      />
    )}

    {children}
  </Box>
);

/* =========================================================
   PAGE 1 - INCREMENT LETTER
========================================================= */

const IncrementLetterPage = ({
  company,
  data,
}) => {
  const {
    employeeName,
    effectiveDate,
    newCTC,
  } = data;

  const designation = data.currentDesignation ?? data.position;
  const issueDate = data.increment_letter?.issueDate ?? data.issueDate;

  return (
    <A4Page company={company}>
      <Box
        sx={{
          px: "28mm",
          pt: "20mm",
        }}
      >
        {/* TITLE */}

        <Typography
          align="center"
          fontSize={18}
          fontWeight="bold"
          mb={4}
          mt={-6}
        >
          Appraisal Letter
        </Typography>

        {/* DATE */}

        <Box
          textAlign="right"
          mb={7}
        >
          <Typography fontSize={14}>
            {formatDate(issueDate)}
          </Typography>
        </Box>

        {/* GREETING */}

        <Typography
          fontSize={13}
          mb={3}
        >
          Dear <b>{employeeName}</b>,
        </Typography>

        {/* PARAGRAPH 1 */}

        <Typography
          fontSize={13}
          lineHeight={1.8}
          mb={3}
          align="justify"
        >
          Congratulations on your promotion to the
          position of{" "}
          <b>{designation}</b>. Along with your new
          responsibilities, we are pleased to offer you
          a salary increment. Effective from{" "}
          <b>{formatDate(effectiveDate)}</b>, your revised
          annual Cost to Company (CTC) will be{" "}
          <b>
            ₹ {Number(newCTC || 0).toLocaleString("en-IN")}
          </b>.
        </Typography>

        {/* PARAGRAPH 2 */}

        <Typography
          fontSize={13}
          mb={4}
          align="justify"
        >
          Your promotion is a reflection of your
          exceptional performance and leadership abilities
          in your previous role. We are confident that you
          will continue to excel in your new position and
          we look forward to seeing you take on new
          challenges.
        </Typography>

        {/* PARAGRAPH 3 */}

        <Typography
          fontSize={13}
          mb={4}
          align="justify"
        >
          Thank you for your hard work and commitment to
          Quick Management Services Pvt Ltd. We are
          excited to see you grow further in your career
          with us.
        </Typography>

        {/* SIGN OFF */}

        <Typography
          fontSize={13}
          mb={2}
        >
          Yours Sincerely,
        </Typography>

        {/* SIGNATURE + STAMP */}

        <Box
          display="flex"
          alignItems="center"
          gap={3}
          mb={1}
        >
          {company?.satish_sign && (
            <img
              src={company.satish_sign}
              alt="Signature"
              style={{
                height: 55,
                objectFit: "contain",
              }}
            />
          )}

          {company?.stamp && (
            <img
              src={company.stamp}
              alt="Stamp"
              style={{
                height: 85,
                objectFit: "contain",
              }}
            />
          )}
        </Box>

        {/* CEO NAME */}

        <Typography
          fontSize={13}
          fontWeight="bold"
        >
          {company?.ceoName}
        </Typography>

        <Typography
          fontSize={13}
          fontWeight="bold"
        >
          CEO & Managing Director
        </Typography>
      </Box>
    </A4Page>
  );
};

/* =========================================================
   PAGE 2 - SALARY ANNEXURE
========================================================= */

const SalaryAnnexurePage = ({
  company,
  data,
}) => {
  const rows = Array.isArray(data.salaryComponents)
    ? data.salaryComponents
    : [];

  /*
    Since PF has been removed, simply calculate
    total from all salary components.
  */

  const monthlyGross = rows.reduce(
    (sum, row) =>
      sum + toNumber(row.monthly),
    0
  );

  // const annualCTC = rows.reduce(
  //   (sum, row) =>
  //     sum + toNumber(row.annual),
  //   0
  // );

  const annualCTC = round2(data.newCTC);

  return (
    <A4Page company={company}>
      <Box
        sx={{
          px: "28mm",
          pt: "30mm",
        }}
      >
        {/* TITLE */}

        <Typography
          align="center"
          fontSize={14}
          fontWeight="bold"
          mb={3}
        >
          Salary Annexure
        </Typography>

        {/* EMPLOYEE INFORMATION */}

        <Box
          sx={{
            mb: 4,
          }}
        >
          <Typography
            fontSize={12}
            mb={1}
          >
            <b>Employee Code:</b>{" "}
            {data.employeeId || ""}
          </Typography>

          <Typography
            fontSize={12}
            mb={1}
          >
            <b>Employee Name:</b>{" "}
            {data.candidateName ||
              data.employeeName ||
              ""}
          </Typography>

          <Typography
            fontSize={12}
          >
            <b>Effective Date:</b>{" "}
            {formatDate(data.effectiveDate)}
          </Typography>
        </Box>

        {/* SALARY TABLE */}

        <Table
          sx={{
            border: "1px solid #000",

            "& th, & td": {
              border: "1px solid #000",
              fontSize: 12,
              p: "0px 12px 12px 12px",
            },
          }}
        >
          {/* TABLE HEADER */}

          <TableHead
            sx={{
              backgroundColor: "#1fb5e9",
            }}
          >
            <TableRow>
              <TableCell align="center">
                <b>Salary Components</b>
              </TableCell>

              <TableCell align="center">
                <b>Per Month (Rs.)</b>
              </TableCell>

              <TableCell align="center">
                <b>Per Annum (Rs.)</b>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* TABLE BODY */}

          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {row.name}
                </TableCell>

                <TableCell align="center">
                  {Math.round(
                    toNumber(row.monthly)
                  ).toLocaleString("en-IN")}
                </TableCell>

                <TableCell align="center">
                  {Math.round(
                    toNumber(row.annual)
                  ).toLocaleString("en-IN")}
                </TableCell>
              </TableRow>
            ))}

            {/* TOTAL */}

            <TableRow
              sx={{
                backgroundColor: "#1fb5e9",
              }}
            >
              <TableCell align="center">
                <b>Total Monthly Gross Salary</b>
              </TableCell>

              <TableCell align="center">
                <b>
                  {Math.round(
                    monthlyGross
                  ).toLocaleString("en-IN")}
                </b>
              </TableCell>

              <TableCell align="center">
                <b>
                  {Math.round(
                    annualCTC
                  ).toLocaleString("en-IN")}
                </b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* AMOUNT IN WORDS */}

        <Box
          sx={{
            mt: 3,
          }}
        >
          <Typography
            fontSize={12}
            align="left"
          >
            <b>Annual CTC in Words:</b>{" "}
            {numberToWords(annualCTC)} Rupees Only
          </Typography>
        </Box>
      </Box>
    </A4Page>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const QuickIncrement = ({
  company,
  data,
}) => {
  /*
    Make sure data exists.
  */

  if (!data) {
    return null;
  }

  /*
    data.newCTC = annual CTC
  */

  const annualCTC = normalizeAnnualCTC(
    data.newCTC
  );

  /*
    Generate salary breakup
  */

  const salaryComponents =
    generateSalaryBreakup(
      annualCTC
    );

  /*
    Final data passed to both pages
  */

  const finalData = {
    ...data,

    newCTC: annualCTC,

    salaryComponents,
  };

  return (
    <>
      {/* PAGE 1 */}

      <IncrementLetterPage
        company={company}
        data={finalData}
      />

      {/* PAGE 2 */}

      <SalaryAnnexurePage
        company={company}
        data={finalData}
      />
    </>
  );
};

export default QuickIncrement;