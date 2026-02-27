// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "@mui/material";
// import A4Page from "../../../../layout/A4Page";

// /* ================= SAFE FORMATTERS ================= */
// const formatDate = (date) => {
//   if (!date) return "";
//   return new Date(date).toLocaleDateString("en-US", {
//     month: "long",
//     day: "2-digit",
//     year: "numeric",
//   });
// };

// const formatAmount = (value) => {
//   const num = Number(value);
//   return isNaN(num) ? "0" : num.toLocaleString("en-IN");
// };

// /* ===================================================
//    MAIN COMPONENT — PAGE 1 + PAGE 2
// =================================================== */
// const PentaPaidInternshipLetter = ({ company, data }) => {
//   if (!company || !data) return null;

//   const firstName = data.candidateName?.split(" ")[0] || "";

//   const salaryStructure = Array.isArray(data.salaryStructure)
//     ? data.salaryStructure
//     : [];

//   const totalMonthly = salaryStructure.reduce(
//     (sum, item) => sum + Number(item?.monthly || 0),
//     0
//   );

//   return (
//     <>
//       {/* ================= PAGE 1 ================= */}
//       <A4Page headerSrc={company.header} footerSrc={company.footer}>
//         <Box
//           sx={{
//             px: "2mm",
//             pt: "2mm",
//             pb: "1mm",
//             fontFamily: `"Times New Roman", Times, serif`,
//             fontSize: "14px",
//             lineHeight: 1.6,
//           }}
//         >
//           {/* DATE */}
//           <Typography align="right" sx={{ mb: 3 }}>
//             {formatDate(data.issueDate)}
//           </Typography>

//           {/* NAME & ADDRESS */}
//           <Typography sx={{ mb: 0.5 }}>
//             <strong>Name :</strong> {data.mrms} {data.employeeName}
//           </Typography>

//           <Typography sx={{ mb: 1 }}>
//             <strong>Address :</strong> {data.address}
//           </Typography>

//           {/* SUBJECT */}
//           <Typography sx={{ mb: 2 }}>
//             <strong>Subject :</strong> Letter of intent for the position of
//             Internship as a <strong>{data.position}</strong>
//           </Typography>

//           {/* GREETING */}
//           <Typography sx={{ mb: 1 }}>
//             Dear {firstName},
//           </Typography>

//           {/* BODY */}
//           <Typography sx={{ mb: 1, textAlign: "justify" }}>
//             We are pleased to offer you the Internship of position of{" "}
//             <strong>{data.position}</strong>. As discussed by us you are requested
//             to join on <strong>{formatDate(data.joiningDate)}</strong>.
//           </Typography>

//           <Typography sx={{ mb: 1, textAlign: "justify" }}>
//             If there is any change in the date of joining changes can be taken
//             under consideration. Your total Gross salary will be Rs.{" "}
//             <strong>{formatAmount(data.stipend)}</strong> per year.
//           </Typography>

//           <Typography sx={{ mb: 1 }}>
//             Subject to various deductions as per companies and government policy.
//           </Typography>

//           <Typography sx={{ mb: 1, textAlign: "justify" }}>
//             The roles and responsibilities and other terms and conditions of your
//             employment will be specified in your letter of appointment.
//           </Typography>

//           <Typography sx={{ mb: 2, textAlign: "justify" }}>
//             We welcome you to <strong>{company.name}</strong> family and hope it
//             would be the beginning of a long and mutually beneficial association.
//           </Typography>

//           <Typography sx={{ mb: 3 }}>
//             Kindly acknowledge the duplicate copy of this letter as an acceptance
//             of this offer.
//           </Typography>

//           <Typography sx={{mt: 4}}>
//             Yours Sincerely,
//           </Typography>

//           <Typography sx={{mt: 3}}>
//             For <strong>PENTA SOFTWARE CONSULTANCY SERVICES PVT. LTD.</strong>
//           </Typography>
//        {/* ================= SIGNATURE SECTION ================= */}
// <Box
//   sx={{
//     mt: 4,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//   }}
// >
//   {/* -------- LEFT SIDE : HR -------- */}
//   <Box>
//     {/* HR Signature + Stamp */}
//     <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
//       {company.signature && (
//         <img src={company.signature} alt="HR Signature" height={40}  />
//       )}
//       {company.stamp && (
//         <img src={company.stamp} alt="Company Stamp" height={90} />
//       )}
//     </Box>

//     {/* HR Name */}
//     <Typography sx={{ fontWeight: 600 }}>
//       {company.hrName}
//     </Typography>
//     <Typography><strong>Group Leader – Shared HR Services</strong></Typography>
//   </Box>

//   {/* -------- RIGHT SIDE : CANDIDATE -------- */}
//   <Box sx={{ minWidth: "260px"}}>
//     {/* Candidate Signature */}
//     <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//       <Typography sx={{ mr: 1 }}>
//         Signature :
//       </Typography>
//       <Box
//         sx={{
//           flexGrow: 1,
//           borderBottom: "1px solid #000",
//           height: "14px",
//         }}
//       />
//     </Box>

//     {/* Candidate Name */}
//     <Typography>
//       Candidate Name : {data.candidateName}
//     </Typography>
//   </Box>
// </Box>



//           <Typography sx={{ mt: 7, textAlign: "center", fontWeight: 600 }}>
//             Enclosures: Annexure A – Salary Structure
//           </Typography>
//         </Box>
//       </A4Page>

//       {/* ================= PAGE 2 ================= */}
//       <A4Page headerSrc={company.header} footerSrc={company.footer}>
//         <Box
//           sx={{
//             px: "25mm",
//             pt: "40mm",
//             fontFamily: `"Times New Roman", Times, serif`,
//           }}
//         >
//           <Typography
//             align="center"
//             sx={{ fontWeight: 700, mb: 3, fontSize: "14px" }}
//           >
//             Annexure A – Salary Structure
//           </Typography>

//           <Table
//             size="small"
//             sx={{
//               border: "1px solid #000",
//               fontSize: "13px",
//               "& th, & td": {
//                 border: "1px solid #000",
//                 py: "4px",
//               },
//               "& th": {
//                 backgroundColor: "#e6f2f8",
//                 fontWeight: 700,
//               },
//             }}
//           >
//             <TableHead>
//               <TableRow>
//                 <TableCell>Salary Components</TableCell>
//                 <TableCell align="right">Per Month (Rs.)</TableCell>
//                 <TableCell align="right">Per Annum (Rs.)</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {salaryStructure.map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{row.label}</TableCell>
//                   <TableCell align="right">
//                     {formatAmount(row.monthly)}
//                   </TableCell>
//                   <TableCell align="right">
//                     {formatAmount(row.yearly)}
//                   </TableCell>
//                 </TableRow>
//               ))}

//               <TableRow>
//                 <TableCell sx={{ fontWeight: 700 }}>
//                   Total Monthly Gross Salary
//                 </TableCell>
//                 <TableCell align="right" sx={{ fontWeight: 700 }}>
//                   {formatAmount(totalMonthly)}
//                 </TableCell>
//                 <TableCell align="right" sx={{ fontWeight: 700 }}>
//                   {formatAmount(data.salary)}
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </Box>
//       </A4Page>
//     </>
//   );
// };

// export default PentaPaidInternshipLetter;


import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

/* ✅ USE PROJECT SALARY UTILITIES */
import {
  generateSalaryComponents,
  calculateSalaryBreakdown,
  formatCurrency,
} from "../../../../../utils/salaryCalculations"

/* ================= A4 PAGE LAYOUT ================= */
const A4Page = ({ children, headerSrc, footerSrc }) => (
  <Box
    sx={{
      width: "210mm",
      minHeight: "297mm",
      backgroundColor: "#fff",
      fontFamily: `"Times New Roman", Times, serif`,
      position: "relative",
      mx: "auto",
      pageBreakAfter: "always",
    }}
  >
    {headerSrc && <img src={headerSrc} alt="Header" style={{ width: "100%" }} />}
    {children}
    {footerSrc && (
      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <img src={footerSrc} alt="Footer" style={{ width: "100%" }} />
      </Box>
    )}
  </Box>
);

/* ================= FORMAT DATE ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
    : "";

/* =====================================================
   MAIN COMPONENT
===================================================== */
const PentaPaidInternshipLetter = ({ company, data }) => {
  if (!company || !data) return null;

  const firstName = data.employeeName?.split(" ")[0] || "";

  /* ✅ SALARY FROM PROJECT LOGIC */
  const salaryComponents = generateSalaryComponents(data.stipend);
  const breakdown = calculateSalaryBreakdown(data.stipend);

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box sx={{ px: "10mm", pt: "2mm", pb: "1mm", fontSize: "14px", lineHeight: 1.6 }}>
          <Typography align="right" sx={{ mb: 3 }}>
            {formatDate(data.issueDate)}
          </Typography>

          <Typography>
            <strong>Name :</strong> {data.mrms} {data.employeeName}
          </Typography>

          <Typography sx={{ mb: 2 }}>
            <strong>Address :</strong> {data.address}
          </Typography>

          <Typography sx={{ mb: 3 }}>
            <strong>Subject :</strong> Letter of intent for the position of
            Internship as a <strong>{data.designation}</strong>
          </Typography>

          <Typography sx={{ mb: 2 }}>Dear {data.employeeName},</Typography>

          <Typography sx={{ mb: 2, textAlign: "justify" }}>
           We are pleased to offer you the Internship of position of <strong>{data.designation}</strong>. As discussed by us you 
are requested to join on  <strong>{formatDate(data.startDate)}</strong>.
          </Typography>

          <Typography sx={{ mb: 2, textAlign: "justify" }}>
           If there is any change in the date of joining changes can be taken under consideration. Your total Gross 
salary will be 
 Rs.{" "}
            <strong>{formatCurrency(breakdown.annual.ctc)}</strong> per year.
          </Typography>

          <Typography sx={{ mb: 2 }}>
            Subject to various deductions as per companies and government policy.
          </Typography>

          <Typography sx={{ mb: 3, textAlign: "justify" }}>
            We welcome you to <strong>{company.name}</strong> family and hope it
            would be the beginning of a long and mutually beneficial association.
          </Typography>

          <Typography sx={{ mb: 4 }}>
            Kindly acknowledge the duplicate copy of this letter as an acceptance
            of this offer.
          </Typography>

          <Typography>Yours Sincerely,</Typography>
          <Typography sx={{ fontWeight: 700, mb: 3 }}>
            For {company.name}
          </Typography>

          {/* SIGNATURES */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                {company.signature && (
                  <img src={company.signature} alt="HR Sign" height={45} />
                )}
                {company.stamp && (
                  <img src={company.stamp} alt="Stamp" height={90} />
                )}
              </Box>
              <Typography sx={{ fontWeight: 600 }}>
                {company.hrName}
              </Typography>
              <Typography>Group Leader – Shared HR Services</Typography>
            </Box>

            <Box sx={{ minWidth: 260 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 , mt: 10}}>
                <Typography sx={{ mr: 1 }}>Signature :</Typography>
                <Box sx={{ flexGrow: 1, borderBottom: "1px solid #000" }} />
              </Box>
              <Typography>
                Candidate Name : {data.employeeName}
              </Typography>
            </Box>
          </Box>

          <Typography sx={{ mt: 6, textAlign: "center", fontWeight: 600 }}>
            Enclosures: Annexure A – Salary Structure
          </Typography>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box sx={{ px: "25mm", pt: "40mm", fontSize: "14px" }}>
          <Typography align="center" sx={{ fontWeight: 700, mb: 3 }}>
            Annexure A – Salary Structure
          </Typography>

          <Table
            size="small"
            sx={{
              border: "1px solid #000",
              "& th, & td": {
                border: "1px solid #000",
                py: "4px",
              },
              "& th": {
                backgroundColor: "#0cacd8ff",
                fontWeight: 700,
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Salary Components</TableCell>
                <TableCell align="right">Per Month (Rs.)</TableCell>
                <TableCell align="right">Per Annum (Rs.)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryComponents.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">
                    {formatCurrency(row.monthly)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>
                  Total Monthly Gross Salary
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  {formatCurrency(breakdown.monthly.totalEarnings)}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  {formatCurrency(breakdown.annual.totalEarnings)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {/* SIGNATURES */}
          <Box sx={{ display: "flex", justifyContent: "space-between"}}>
            <Box>
              <Box sx={{ display: "flex", gap: 2, mt: 10 }}>
                {company.signature && (
                  <img src={company.signature} alt="HR Sign" height={45} />
                )}
                {company.stamp && (
                  <img src={company.stamp} alt="Stamp" height={90} />
                )}
              </Box>
              <Typography sx={{ fontWeight: 600 }}>
                {company.hrName}
              </Typography>
              <Typography>Group Leader - Shared HR Services</Typography>
            </Box>

            <Box sx={{ minWidth: 260 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 , mt: 20 }}>
                <Typography sx={{ mr: 1 }}>Signature :</Typography>
                <Box sx={{ flexGrow: 1, borderBottom: "1px solid #000" }} />
              </Box>
              <Typography>
                Candidate Name : {data.employeeName}
              </Typography>
            </Box>
          </Box>
        </Box>
      </A4Page>
    </>
  );
};

export default PentaPaidInternshipLetter;
