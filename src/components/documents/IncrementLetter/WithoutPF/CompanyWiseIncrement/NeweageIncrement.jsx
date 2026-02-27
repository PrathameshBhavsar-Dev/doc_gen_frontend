// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TableCell,
//   TableBody,
// } from "@mui/material";
// import A4Layout from "../../../layout/A4Page";
// import { calculateIncrement, formatCurrency, numberToWords } from "../../../../utils/salaryCalculations";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-US", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     })
//     : "";

// /* ================= STYLES ================= */
// const TEXT = {
//   fontFamily: "Times New Roman, serif",
//   fontSize: "14px",
//   lineHeight: 1.8,
// };

// const CELL = {
//   border: "1px solid #000",
//   padding: "5px",
//   fontSize: "13px",
// };

// /* ================= FIXED SALARY DATA ================= */
// const SALARY_COMPONENTS = [
//   { name: "Basic", monthly: 4000, annual: 48000 },
//   { name: "House Rent Allowance", monthly: 1800, annual: 21600 },
//   { name: "Dearness Allowance", monthly: 1200, annual: 14400 },
//   { name: "Special Allowance", monthly: 1600, annual: 19200 },
//   { name: "Food Allowance", monthly: 600, annual: 7200 },
//   { name: "Misc. Allowance", monthly: 800, annual: 9600 },
// ];

// /* ================= MAIN COMPONENT ================= */
// const NeweageIncrement = ({ company, data }) => {
//   if (company?.name === "Cubeage Technologies Services Pvt. Ltd.") {
//     return <CubeageIncrementLetter data={data} company={company} />;
//   }

//   const newCTC = parseFloat(data.newCTC); // annual salary


//   // === Annual components (percentages of totalSalaryAnually) ===
//   const basicAnnual = newCTC * 0.4013;
//   const hraAnnual = newCTC * 0.1798;
//   const conveyanceAnnual = newCTC * 0.1599;
//   const medicAnnual = newCTC * 0.1394;
//   const specialAnnual = newCTC * 0.1196;

//   // === Monthly components ===
//   const basicMonthly = Math.round(basicAnnual / 12);
//   const hraMonthly = Math.round(hraAnnual / 12);
//   const conveyanceMonthly = Math.round(conveyanceAnnual / 12);
//   const medicMonthly = Math.round(medicAnnual / 12);
//   const specialMonthly = Math.round(specialAnnual / 12);

//   // Calculate increment details
//   const incrementDetails = calculateIncrement(
//     data.currentCTC || 350000, // Default to 3.5 LPA
//     data.incrementPercentage || 10 // Default to 10% increment
//   );

//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'long',
//       year: 'numeric'
//     });
//   };

//   // Calculate previous year and issue year dynamically
//   const issueDate = data.issueDate ? new Date(data.issueDate) : new Date();
//   const issueYear = issueDate.getFullYear();
//   const prevYear = issueYear - 1;

//   const {
//     employeeName = "",
//     employeeId = "",
//     effectiveDate = "",
//   } = data;

import React from "react";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import { calculateIncrement, formatCurrency, numberToWords } from "../../../../utils/salaryCalculations";
import KritiSign from "../../../../assets/images/Newagecloud/Kirti Kumar.png";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    : "";

/* ================= STYLES ================= */
const TEXT = {
  fontFamily: "Times New Roman, serif",
  fontSize: "14px",
  lineHeight: 1.8,
};

const CELL = {
  border: "1px solid #000",
  padding: "5px",
  fontSize: "13px",
};

/* ================= FIXED SALARY DATA ================= */
const SALARY_COMPONENTS = [
  { name: "Basic", monthly: 4000, annual: 48000 },
  { name: "House Rent Allowance", monthly: 1800, annual: 21600 },
  { name: "Dearness Allowance", monthly: 1200, annual: 14400 },
  { name: "Special Allowance", monthly: 1600, annual: 19200 },
  { name: "Food Allowance", monthly: 600, annual: 7200 },
  { name: "Misc. Allowance", monthly: 800, annual: 9600 },
];

/* ================= MAIN COMPONENT ================= */
const NeweageIncrement = ({ company, data }) => {
  if (company?.name === "Cubeage Technologies Services Pvt. Ltd.") {
    return <CubeageIncrementLetter data={data} company={company} />;
  }

  const newCTC = parseFloat(data.newCTC); // annual salary


  // === Annual components (percentages of totalSalaryAnually) ===
  const basicAnnual = newCTC * 0.4013;
  const hraAnnual = newCTC * 0.1798;
  const conveyanceAnnual = newCTC * 0.1599;
  const medicAnnual = newCTC * 0.1394;
  const specialAnnual = newCTC * 0.1196;

  // === Monthly components ===
  const basicMonthly = Math.round(basicAnnual / 12);
  const hraMonthly = Math.round(hraAnnual / 12);
  const conveyanceMonthly = Math.round(conveyanceAnnual / 12);
  const medicMonthly = Math.round(medicAnnual / 12);
  const specialMonthly = Math.round(specialAnnual / 12);

  // Calculate increment details
  const incrementDetails = calculateIncrement(
    data.currentCTC || 350000, // Default to 3.5 LPA
    data.incrementPercentage || 10 // Default to 10% increment
  );

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Calculate previous year and issue year dynamically
  const issueDate = data.issueDate ? new Date(data.issueDate) : new Date();
  const issueYear = issueDate.getFullYear();
  const prevYear = issueYear - 1;

  const {
    employeeName = "",
    employeeId = "",
    effectiveDate = "",
  } = data;

  return (
    <>
      {/* =====================================================
          PAGE 1 : INCREMENT LETTER
      ====================================================== */}
      <A4Layout
        headerSrc={company.headerImage}
        footerSrc={company.footerImage}

      >
        {/* Date */}
        <Typography align="right" sx={{ ...TEXT, mb: 6 }}>
          {formatDate(issueDate)}
        </Typography>

        {/* Greeting */}
        <Typography sx={{ ...TEXT, mb: 4 }}>
          Dear {employeeName.split(" ")[0]},
        </Typography>

        <Typography sx={{ ...TEXT, mb: 3 }}>
          After careful evaluation of your contributions, achievements, and
          dedication to your role over the past year, I am pleased to inform you
          that you have demonstrated exceptional performance. Your hard work,
          commitment, and positive impact on our team have not gone unnoticed.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 3 }}>
          As a result of your outstanding performance, I am delighted to inform
          you that you will be receiving a salary increment. This increase is a
          reflection of your valuable contributions to our organisation and the
          high level of professionalism you consistently demonstrate.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 3 }}>
          Your new salary will be{" "}
          <b>₹{newCTC.toLocaleString("en-IN")}</b> per annum, effective{" "}
          <b>{formatDate(effectiveDate)}</b>. Please note that this adjustment
          will be reflected in your next pay check.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 3 }}>
          I want to take this opportunity to express my appreciation for your
          continued dedication and hard work. Your contributions are integral to
          our success, and we look forward to your ongoing contributions to our
          team.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 3 }}>
          If you have any questions or would like to discuss this further, please
          do not hesitate to reach out to me.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 4 }}>
          Once again, congratulations on this well-deserved recognition, and
          thank you for your continued commitment to excellence.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 6 }}>Best regards,</Typography>


        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 2, marginRight: "-20px" }}>
          <Box>

            <img src={KritiSign} alt="Signature" style={{ height: '50px' }} />
            <img src={company.stamp} alt="Stamp" style={{ height: '100px' }} />

            <Typography sx={{ ...TEXT, fontWeight: "bold" }}>
              CEO & Managing Director
            </Typography>

          </Box>
        </Box>
      </A4Layout>

      {/* =====================================================
          PAGE 2 : SALARY ANNEXURE
      ====================================================== */}
      <A4Layout
        headerSrc={company.headerImage}
        footerSrc={company.footerImage}

      >
        <Typography align="center" sx={{ ...TEXT, mb: 4, fontWeight: "bold" }}>
          Salary Annexure
        </Typography>

        {/* Employee Info */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={TEXT}>
            <b>Employee Code</b> : {employeeId}
          </Typography>
          <Typography sx={TEXT}>
            <b>Employee Name</b> : {employeeName}
          </Typography>
          <Typography sx={TEXT}>
            <b>Effective Date</b> : {formatDate(effectiveDate)}
          </Typography>
        </Box>

        {/* Salary Comparison Table */}
        <TableContainer
          component={Paper}
          sx={{
            border: "1px solid #000",
            borderRadius: 0,
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <Table
            size="small"
            sx={{
              borderCollapse: "collapse",
              tableLayout: "fixed",
              "& .MuiTableCell-root": {
                border: "1px solid #000",
                fontSize: "10pt",          // 🔽 smaller font
                padding: "3px 5px",        // 🔽 tight padding
                lineHeight: 1.3,           // 🔽 compact rows
                verticalAlign: "middle",
                backgroundColor: "transparent",
              },
            }}
          >
            {/* ================= HEADER ================= */}
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "rgba(3, 171, 197, 0.95)",
                  "& .MuiTableCell-root": {
                    padding: "4px 5px",     // 🔽 smaller header height
                    fontSize: "10pt",
                  },
                }}
              >
                <TableCell>Monthly Component</TableCell>
                <TableCell align="center">Amount (₹)</TableCell>
                <TableCell align="center">Yearly Component</TableCell>
                <TableCell align="center">Amount (₹)</TableCell>
              </TableRow>
            </TableHead>

            {/* ================= BODY ================= */}
            <TableBody>
              <TableRow>
                <TableCell>Basic</TableCell>
                <TableCell align="center">{formatCurrency(basicMonthly)}</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">{formatCurrency(basicAnnual)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>House Rent Allowance</TableCell>
                <TableCell align="center">{formatCurrency(hraMonthly)}</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">{formatCurrency(hraAnnual)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Dearness Allowance</TableCell>
                <TableCell align="center">{formatCurrency(hraMonthly)}</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">{formatCurrency(hraAnnual)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Special Allowance</TableCell>
                <TableCell align="center">{formatCurrency(conveyanceMonthly)}</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">{formatCurrency(conveyanceAnnual)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Food Allowance</TableCell>
                <TableCell align="center">{formatCurrency(medicMonthly)}</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">{formatCurrency(medicAnnual)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>MISC Allowance</TableCell>
                <TableCell align="center">{formatCurrency(specialMonthly)}</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">{formatCurrency(specialAnnual)}</TableCell>
              </TableRow>

              {/* ================= TOTALS ================= */}
              <TableRow
                sx={{
                  backgroundColor: "rgba(3, 171, 197, 0.95)",
                  "& .MuiTableCell-root": {
                    padding: "4px 5px",
                  },
                }}
              >
                <TableCell>Monthly Gross</TableCell>
                <TableCell align="center">
                  {formatCurrency(
                    basicMonthly +
                    hraMonthly +
                    conveyanceMonthly +
                    medicMonthly +
                    specialMonthly
                  )}
                </TableCell>
                <TableCell align="center" sx={{ textAlign: "center" }}>
                  Annual CTC
                </TableCell>

                <TableCell align="center" sx={{ textAlign: "center" }}>
                  {formatCurrency(newCTC)}
                </TableCell>

              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>



        <Typography sx={{ ...TEXT, mt: 4 }}>
          Please note that the details in this communication are confidential and
          you are requested not to share the same with others.
        </Typography>

      </A4Layout>
    </>
  );
};

export default NeweageIncrement;
