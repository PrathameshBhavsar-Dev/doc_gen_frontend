import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";

/* ================= UTILITIES ================= */

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
    : "—";

const formatCurrency = (num = 0) =>
  Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  });

const numberToWords = (num = 0) => {
  if (!num) return "Zero Only";

  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
    "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
    "Fourteen", "Fifteen", "Sixteen", "Seventeen",
    "Eighteen", "Nineteen",
  ];
  const b = [
    "", "", "Twenty", "Thirty", "Forty",
    "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
  ];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100)
      return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 ? " " + inWords(n % 100) : "")
      );
    if (n < 100000)
      return (
        inWords(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 ? " " + inWords(n % 1000) : "")
      );
    if (n < 10000000)
      return (
        inWords(Math.floor(n / 100000)) +
        " Lakh" +
        (n % 100000 ? " " + inWords(n % 100000) : "")
      );
    return (
      inWords(Math.floor(n / 10000000)) +
      " Crore" +
      (n % 10000000 ? " " + inWords(n % 10000000) : "")
    );
  };

  return `${inWords(num)} Only`;
};

const TEXT = {
  fontSize: "14px",
  lineHeight: 1.8,
};

const NeweagePaidInternshipLetter = ({
  company,
  data = {},
  employeeName = "—",
  internshipRole = "Intern",
  joiningDate,
  stipend = 0,
  letterDate,
  companyName = "NEWEAGE CLOUD SOFTWARE SERVICES PVT. LTD.",
}) => {
  const monthlyStipend = Number(data?.stipend ?? stipend) || 0;
  const annualStipend = monthlyStipend * 12;

  /* ================= SALARY STRUCTURE ================= */
  const salaryRows = [
            { name: "Basic", monthly: Math.round(monthlyStipend * 0.4) },
            { name: "House Rent Allowance", monthly: Math.round(monthlyStipend * 0.2) },
            { name: "Dearness Allowance", monthly: Math.round(monthlyStipend * 0.1) },
            { name: "Special Allowance", monthly: Math.round(monthlyStipend * 0.1) },
            { name: "Food Allowance", monthly: Math.round(monthlyStipend * 0.1) },
            { name: "Misc. Allowance", monthly: Math.round(monthlyStipend * 0.1) },
          ]

  const totalMonthly = salaryRows.reduce(
    (sum, row) => sum + row.monthly,
    0
  );
  const totalAnnual = totalMonthly * 12;

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company?.header} footerSrc={company?.footer}>
  <Box sx={{ p: 4 }}>

    <Typography sx={{ ...TEXT, mb: 3 }}>
      {formatDate(data?.issueDate || letterDate)}
    </Typography>

    <Typography sx={TEXT}>
      <b>Name</b> : {data?.employeeName || employeeName}
    </Typography>

    <Typography sx={{ ...TEXT, mt: 1 }}>
      <b>Address</b> : {data?.address || "—"}
    </Typography>

    <Typography sx={{ ...TEXT, mt: 3 }}>
      <b>
        Subject : Letter of intent for the Internship of position as{" "}
        {data?.designation || internshipRole}
      </b>
    </Typography>

    <Typography sx={{ ...TEXT, mt: 4 }}>
      Dear {data?.employeeName || employeeName},
    </Typography>

    <Typography sx={{ ...TEXT, mt: 2 }}>
      We are pleased to offer you the Internship of position as{" "}
      <b>{data?.designation || internshipRole}</b> with{" "}
      <b>{companyName}</b> Family with effective date{" "}
      <b>{formatDate(data?.startDate || joiningDate)}</b> considering your
      performance and support towards the organization.
    </Typography>

    <Typography sx={{ ...TEXT, mt: 2 }}>
      If there is any change in the date of joining, changes can be taken
      under consideration. Your total Gross salary will be Rs.{" "}
      <b>{formatCurrency(annualStipend)}</b>{" "}
      (<b>{numberToWords(annualStipend)}</b>) per year.
    </Typography>

    <Typography sx={{ ...TEXT, mt: 2 }}>
      Subject to various deductions as per companies and government policy.
    </Typography>

    <Typography sx={{ ...TEXT, mt: 2 }}>
      We welcome you to <b>{companyName}</b> Family and hope it would be
      the beginning of a long and mutually beneficial association.
    </Typography>

    <Typography sx={{ ...TEXT, mt: 2 }}>
      Kindly acknowledge the duplicate copy of this letter as an acceptance
      of this offer.
    </Typography>

    <Typography sx={{ ...TEXT, mt: 4 }}>
      Yours Sincerely,
    </Typography>

    <Typography sx={{ ...TEXT, mt: 3 }}>
      <b>For {companyName}</b>
    </Typography>

    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        mt: 6,
      }}
    >
      {/* LEFT SIDE (HR SIGN & STAMP) */}
      <Box>
        <Box sx={{ display: "flex", gap: "20px", mb: "6px" }}>
          {company?.signature && (
            <Box
              component="img"
              src={company.signature}
              sx={{ height: "60px" }}
            />
          )}
          {company?.stamp && (
            <Box
              component="img"
              src={company.stamp}
              sx={{ height: "100px" }}
            />
          )}
        </Box>

        <Typography sx={TEXT}>
          <b>HR Relations Lead</b>
        </Typography>
      </Box>

      {/* RIGHT SIDE */}
      <Box>
        <Typography sx={{ ...TEXT, mt: 4 }}>
          Signature :______________________
        </Typography>

        <Typography sx={{ ...TEXT, mt: 1 }}>
          Candidate Name : {data?.employeeName || employeeName}
        </Typography>
      </Box>
    </Box>

  </Box>
</A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company?.header} footerSrc={company?.footer}>
  <Box sx={{ p: 4 }}>

    <Typography
      sx={{ fontSize: "16px", fontWeight: 700, mb: 3 }}
      align="center"
    >
      Compensation Structure
    </Typography>

    <Table
      size="small"
      sx={{
        width: "100%",
        borderCollapse: "collapse",
        border: "1px solid black",
      }}
    >
      {/* ================= HEADER ROW ================= */}
      <TableHead>
        <TableRow sx={{ backgroundColor: "#26acba" }}>
          <TableCell
            sx={{
              border: "1px solid black",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Components
          </TableCell>

          <TableCell
            align="right"
            sx={{
              border: "1px solid black",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Amount / Month
          </TableCell>

          <TableCell
            align="right"
            sx={{
              border: "1px solid black",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Amount / Annum
          </TableCell>
        </TableRow>
      </TableHead>

      {/* ================= BODY ================= */}
      <TableBody>
        {salaryRows.map((row, index) => (
          <TableRow key={index}>
            <TableCell sx={{ border: "1px solid black" }}>
              {row.name}
            </TableCell>

            <TableCell
              align="right"
              sx={{ border: "1px solid black" }}
            >
              {formatCurrency(row.monthly)}
            </TableCell>

            <TableCell
              align="right"
              sx={{ border: "1px solid black" }}
            >
              {formatCurrency(row.monthly * 12)}
            </TableCell>
          </TableRow>
        ))}

        {/* ================= CTC ROW ================= */}
        <TableRow sx={{ backgroundColor: "#26acba" }}>
          <TableCell
            sx={{
              border: "1px solid black",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            CTC
          </TableCell>

          <TableCell
            align="right"
            sx={{
              border: "1px solid black",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {formatCurrency(totalMonthly)}
          </TableCell>

          <TableCell
            align="right"
            sx={{
              border: "1px solid black",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {formatCurrency(totalAnnual)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
 
  </Box>
</A4Page>
    </>
  );
};

export default NeweagePaidInternshipLetter;
