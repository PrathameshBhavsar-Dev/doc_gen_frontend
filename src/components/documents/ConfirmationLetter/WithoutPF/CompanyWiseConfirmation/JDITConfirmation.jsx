// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "@mui/material";
// import A4Layout from "../../../../layout/A4Page";
// import {
//   formatCurrency,
//   numberToWords,
// } from "../../../../../utils/salaryCalculations";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-US", {
//       month: "long",
//       day: "2-digit",
//       year: "numeric",
//     })
//     : "";

// /* ================= COMMON STYLE ================= */
// const TEXT = {
//   fontFamily: "Times New Roman, serif",
//   fontSize: "14px",
//   lineHeight: 1.8,
// };

// const JDITConfirmation = ({ company, data }) => {
//   if (!company || !data) return null;

//   /* ================= SAFE DATA ================= */
//   const {
//     mrms = "",
//     candidateName = "",
//     employeeName = "",
//     address = "",
//     position = "",
//     effectiveDate = "",
//     // issueDate = "",
//     totalSalary = 0,
//   } = data;

//   const NAME = candidateName || employeeName;
//   const COMPANY_NAME = company.name?.toUpperCase() || "";

//   /* ================= SALARY BREAKUP ================= */
//   const totalAnnual = parseFloat(totalSalary || 0);

//   // Custom percentage breakup for JDIT
//   const basicAnnual = totalAnnual * 0.45;
//   const hraAnnual = totalAnnual * 0.20;
//   const conveyanceAnnual = totalAnnual * 0.10;
//   const specialAnnual = totalAnnual * 0.15;
//   const medicalAnnual = totalAnnual * 0.05;
//   const otherAnnual = totalAnnual * 0.05;

//   const salaryComponents = [
//     { name: "Basic Salary", annual: basicAnnual },
//     { name: "House Rent Allowance", annual: hraAnnual },
//     { name: "Conveyance Allowance", annual: conveyanceAnnual },
//     { name: "Special Allowance", annual: specialAnnual },
//     { name: "Medical Allowance", annual: medicalAnnual },
//     { name: "Other Allowance", annual: otherAnnual },
//   ].map((item) => ({
//     ...item,
//     annual: Math.round(item.annual),
//     monthly: Math.round(item.annual / 12),
//   }));

//   const totalMonthly = salaryComponents.reduce(
//     (sum, item) => sum + item.monthly,
//     0
//   );

//   const finalAnnual = salaryComponents.reduce(
//     (sum, item) => sum + item.annual,
//     0
//   );

//   return (
//     <>
//       {/* ================= PAGE 1 ================= */}
//       <A4Layout
//         headerSrc={company.headerImage}
//         footerSrc={company.footerImage}
//       >
//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           {/* {formatDate(issueDate)} */}
//         </Typography>

//         <Typography sx={TEXT}>
//           <b>Name</b> : {mrms} {NAME}
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           <b>Address</b> : {address}
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           Dear {NAME},
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           We are pleased to confirm your continued services at the position of{" "}
//           <b>{position}</b> with{" "}
//           <b>{COMPANY_NAME}</b> with effective date{" "}
//           <b>{formatDate(effectiveDate)}</b> considering your performance and
//           support towards the organization.
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           If there is any change in the date of joining, changes can be taken
//           under consideration.
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           Your total Gross salary will be Rs.{" "}
//           <b>{formatCurrency(totalAnnual)}</b> (
//           <b>{numberToWords(totalAnnual)}</b>) per year.
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           Subject to various deductions as per company and government policy.
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           The roles and responsibilities and other terms and conditions of your
//           employment will be specified in your letter of appointment.
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           We welcome you to <b>{COMPANY_NAME}</b> family and hope it would be the
//           beginning of a long and mutually beneficial association.
//         </Typography>

//         <Typography sx={{ ...TEXT, mb: 2 }}>
//           Kindly acknowledge the duplicate copy of this letter as an acceptance
//           of this offer.
//         </Typography>

//         <Typography sx={{ ...TEXT, mt: 4 }}>
//           Yours Sincerely,
//         </Typography>

//         <Typography sx={TEXT}>
//           For <b>{COMPANY_NAME}</b>
//         </Typography>

//         <Box sx={{ mt: 3 }}>
//           <img
//             src={company.signature}
//             alt="Signature"
//             style={{ height: "50px" }}
//           />
//            <img
//               src={company.stamp}
//               alt="Stamp"
//               style={{ height: "100px" }}
//             />
//           <Typography>{company.hrName}</Typography>
//           <Typography>HR Manager</Typography>
//         </Box>
//       </A4Layout>

//       {/* ================= PAGE 2 ================= */}
//       <A4Layout
//         headerSrc={company.headerImage}
//         footerSrc={company.footerImage}
//       >
//         <Typography align="center" sx={{ ...TEXT, mb: 3 }}>
//           <b>Annexure – Salary Structure</b>
//         </Typography>

//         <TableContainer>
//           <Table
//             size="small"
//             sx={{
//               border: "1px solid #333",
//               borderCollapse: "collapse",
//             }}
//           >
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#b13d1a" }}>
//                 <TableCell sx={{ border: "1px solid #333", color: "white" }}>
//                   <b>Salary Component</b>
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ border: "1px solid #333", color: "white" }}
//                 >
//                   <b>Per Month (Rs.)</b>
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ border: "1px solid #333", color: "white" }}
//                 >
//                   <b>Per Annum (Rs.)</b>
//                 </TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {salaryComponents.map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell sx={{ border: "1px solid #333" }}>
//                     {row.name}
//                   </TableCell>
//                   <TableCell align="center" sx={{ border: "1px solid #333" }}>
//                     {formatCurrency(row.monthly)}
//                   </TableCell>
//                   <TableCell align="center" sx={{ border: "1px solid #333" }}>
//                     {formatCurrency(row.annual)}
//                   </TableCell>
//                 </TableRow>
//               ))}

//               <TableRow sx={{ backgroundColor: "#b13d1a" }}>
//                 <TableCell sx={{ border: "1px solid #333", color: "white" }}>
//                   <b>Total Gross Salary</b>
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ border: "1px solid #333", color: "white" }}
//                 >
//                   <b>{formatCurrency(totalMonthly)}</b>
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ border: "1px solid #333", color: "white" }}
//                 >
//                   <b>{formatCurrency(finalAnnual)}</b>
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </A4Layout>
//     </>
//   );
// };

// export default JDITConfirmation;



import React from "react";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import {
  formatCurrency,
  numberToWords,
} from "../../../../../utils/salaryCalculations";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    })
    : "";

/* ================= COMMON STYLE ================= */
const TEXT = {
  fontFamily: "Times New Roman, serif",
  fontSize: "14px",
  lineHeight: 1.8,
};

const JDITConfirmation = ({ company, data }) => {
  if (!company || !data) return null;

  /* ================= SAFE DATA ================= */
  const {
    mrms = "",
    candidateName = "",
    employeeName = "",
    address = "",
    position = "",
    effectiveDate = "",
    // issueDate = "",
    totalSalary = 0,
  } = data;

  const NAME = candidateName || employeeName;
  const COMPANY_NAME = company.name?.toUpperCase() || "";

  /* ================= SALARY BREAKUP ================= */
  const round0 = (num) => Math.round(num);
  const monthlyCTC = parseFloat(totalSalary || 0);

  // Custom percentage breakup for JDIT (calculated on monthly CTC)
  const basicMonthly = round0(monthlyCTC * 0.4);
  const hraMonthly = round0(monthlyCTC * 0.18);
  const conveyanceMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const medicalMonthly = round0(monthlyCTC * 0.06);
  const otherMonthly = round0(monthlyCTC * 0.08);

  const salaryComponents = [
    { name: "Basic Salary", monthly: basicMonthly },
    { name: "House Rent Allowance", monthly: hraMonthly },
    { name: "Dearness Allowance", monthly: conveyanceMonthly },
    { name: "Special Allowance", monthly: specialMonthly },
    { name: "Food Allowance", monthly: medicalMonthly },
    { name: "Misc. Allowance", monthly: otherMonthly },
  ].map((item) => ({
    ...item,
    annual: round0(item.monthly * 12),
  }));

  const totalMonthly = salaryComponents.reduce(
    (sum, item) => sum + item.monthly,
    0
  );

  const finalAnnual = salaryComponents.reduce(
    (sum, item) => sum + item.annual,
    0
  );

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Layout
        headerSrc={company.headerImage}
        footerSrc={company.footerImage}
      >
        <Typography sx={{ ...TEXT, mb: 2 }}>
          {/* {formatDate(issueDate)} */}
        </Typography>

        <Typography sx={TEXT}>
          <b>Name</b> : {mrms} {NAME}
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          <b>Address</b> : {address}
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          Dear {NAME},
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          We are pleased to confirm your continued services at the position of{" "}
          <b>{position}</b> with{" "}
          <b>{COMPANY_NAME}</b> with effective date{" "}
          <b>{formatDate(effectiveDate)}</b> considering your performance and
          support towards the organization.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          If there is any change in the date of joining, changes can be taken
          under consideration.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          Your total Gross salary will be Rs.{" "}
          <b>{formatCurrency(finalAnnual)}</b> (
          <b>{numberToWords(finalAnnual)}</b>) per year.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          Subject to various deductions as per company and government policy.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          The roles and responsibilities and other terms and conditions of your
          employment will be specified in your letter of appointment.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          We welcome you to <b>{COMPANY_NAME}</b> family and hope it would be the
          beginning of a long and mutually beneficial association.
        </Typography>

        <Typography sx={{ ...TEXT, mb: 2 }}>
          Kindly acknowledge the duplicate copy of this letter as an acceptance
          of this offer.
        </Typography>

        <Typography sx={{ ...TEXT, mt: 4 }}>
          Yours Sincerely,
        </Typography>

        <Typography sx={TEXT}>
          For <b>{COMPANY_NAME}</b>
        </Typography>

        <Box sx={{ mt: 3 }}>
          <img
            src={company.signature}
            alt="Signature"
            style={{ height: "50px" }}
          />
          <img
            src={company.stamp}
            alt="Stamp"
            style={{ height: "100px" }}
          />
          <Typography>{company.hrName}</Typography>
          <Typography>HR Manager</Typography>
        </Box>
      </A4Layout>

      {/* ================= PAGE 2 ================= */}
      <A4Layout
        headerSrc={company.headerImage}
        footerSrc={company.footerImage}
      >
        <Typography align="center" sx={{ ...TEXT, mb: 3 }}>
          <b>Annexure – Salary Structure</b>
        </Typography>

        <TableContainer>
          <Table
            size="small"
            sx={{
              border: "1px solid #333",
              borderCollapse: "collapse",
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#b13d1a" }}>
                <TableCell sx={{ border: "1px solid #333", color: "white" }}>
                  <b>Salary Component</b>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ border: "1px solid #333", color: "white" }}
                >
                  <b>Per Month (Rs.)</b>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ border: "1px solid #333", color: "white" }}
                >
                  <b>Per Annum (Rs.)</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryComponents.map((row, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ border: "1px solid #333" }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #333" }}>
                    {formatCurrency(row.monthly)}
                  </TableCell>
                  <TableCell align="center" sx={{ border: "1px solid #333" }}>
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow sx={{ backgroundColor: "#b13d1a" }}>
                <TableCell sx={{ border: "1px solid #333", color: "white" }}>
                  <b>Total Gross Salary</b>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ border: "1px solid #333", color: "white" }}
                >
                  <b>{formatCurrency(totalMonthly)}</b>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ border: "1px solid #333", color: "white" }}
                >
                  <b>{formatCurrency(finalAnnual)}</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </A4Layout>
    </>
  );
};

export default JDITConfirmation;