// import React from "react";

// /* ================= DATE FORMATTER ================= */
// const formatDate = (date) => {
//   if (!date) return "";
//   return new Date(date).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });
// };

// const CubeageIncrement = ({ company, data }) => {
//   if (!company || !data) return null;

//   return (
//     <div
//       className="a4-content-only"
//       style={{
//         width: "210mm",
//         minHeight: "297mm",
//         padding: "25mm 20mm",
//         fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
//         fontSize: "12pt",
//         lineHeight: "1.7",
//         color: "#000",
//         backgroundColor: "#fff",
//         position: "relative",
//       }}
//     >
//       {/* ================= HEADER ================= */}
//       {company.header && (
//         <img
//           src={company.header}
//           alt="Company Header"
//           style={{ width: "100%", marginBottom: "10mm" }}
//         />
//       )}

//       {/* ================= COMPANY INFO ================= */}
//       <div style={{ fontSize: "10.5pt", marginBottom: "8mm" }}>
//         <strong>Office:</strong> {company.address}
//         <br />
//         <strong>Contact No:</strong> {company.phone} | <strong>Email:</strong>{" "}
//         {company.email}
//       </div>

//       {/* ================= DATE ================= */}
//       <div style={{ marginBottom: "10mm" }}>
//         <strong>Date:</strong> {formatDate(data.issueDate)}
//       </div>

//       {/* ================= TITLE ================= */}
//       <h3
//         style={{
//           textAlign: "center",
//           marginBottom: "12mm",
//           textDecoration: "underline",
//           fontWeight: "600",
//         }}
//       >
//         Appraisal Letter
//       </h3>

//       {/* ================= EMPLOYEE NAME ================= */}
//       <p style={{ marginBottom: "6mm" }}>
//         <strong>
//           {data.mrms} {data.employeeName}
//         </strong>
//       </p>

//       {/* ================= BODY ================= */}
//       <p style={{ marginBottom: "6mm" }}>
//         <strong>Congratulation!</strong>
//       </p>

//       <p style={{ textAlign: "justify", marginBottom: "6mm" }}>
//         We are pleased to inform you that based on your performance and
//         contribution to the company, our management has revised your
//         compensation to <strong>Rs. {data.newCTC} /- LPA</strong> with effect
//         from <strong>{formatDate(data.effectiveDate)}</strong>.
//       </p>

//       <p style={{ textAlign: "justify", marginBottom: "6mm" }}>
//         We appreciate your initiative and expect you to take many more such
//         responsibilities in future assignments to ensure company’s growth.
//       </p>

//       <p style={{ marginBottom: "14mm" }}>Wishing you all Success.</p>

//       {/* ================= SIGNATURE ================= */}
//       <div style={{ marginBottom: "20mm" }}>
//         <p>
//           <strong>Authorized Signature,</strong>
//         </p>
//         <p>
//           <strong>For {company.name}</strong>
//         </p>

//         <div
//           style={{
//             display: "flex",
//             alignItems: "flex-start",
//             gap: "15mm",
//             marginTop: "6mm",
//           }}
//         >
//           {company.signature && (
//             <img
//               src={company.signature}
//               alt="HR Signature"
//               style={{ width: "40mm" }}
//             />
//           )}
//           {company.stamp && (
//             <img
//               src={company.stamp}
//               alt="Company Stamp"
//               style={{ width: "35mm" }}
//             />
//           )}
//         </div>
//       </div>

//       {/* ================= COMPENSATION STRUCTURE ================= */}
//       <h4 style={{ marginBottom: "6mm" }}>Compensation Structure</h4>

//       <div style={{ marginBottom: "6mm" }}>
//         <strong>Name:</strong> {data.mrms} {data.employeeName}
//         <br />
//         <strong>Designation:</strong> {data.designation}
//         <br />
//         <strong>Location:</strong> {company.city}
//       </div>

//       {/* ================= SALARY TABLE ================= */}
//       <TableContainer>
//                   <Table size="small" sx={{ border: "1px solid #000" }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: "gray" }}>
//                         <TableCell>Component</TableCell>
//                         <TableCell>Monthly</TableCell>
//                         <TableCell>Annual</TableCell>
//                       </TableRow>
//                     </TableHead>
      
//                     <TableBody>
//                       {salaryComponents.map((row, i) => (
//                         <TableRow key={i}>
//                           <TableCell>{row.name}</TableCell>
//                           <TableCell align="right">
//                             {formatCurrency(row.monthly)}
//                           </TableCell>
//                           <TableCell align="right">
//                             {formatCurrency(row.annual)}
//                           </TableCell>
//                         </TableRow>
//                       ))}
      
//                       <TableRow sx={{ bgcolor: "gray" }}>
//                         <TableCell>
//                           <strong>CTC</strong>
//                         </TableCell>
//                         <TableCell align="right">
//                           <strong>{formatCurrency(totalMonthly)}</strong>
//                         </TableCell>
//                         <TableCell align="right">
//                           <strong>{formatCurrency(totalAnnual)}</strong>
//                         </TableCell>
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>

//       {/* ================= FOOT NOTE ================= */}
//       <p style={{ fontSize: "10.5pt" }}>
//         * PVLP will be payable to you on yearly basis subject to performance
//         review.
//       </p>
//     </div>
//   );
// };

// export default CubeageIncrement;





// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";

// /* ================= DATE FORMATTER ================= */
// const formatDate = (date) => {
//   if (!date) return "";
//   return new Date(date).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });
// };

// /* ================= CURRENCY FORMAT ================= */
// const formatCurrency = (value) => {
//   if (!value) return "0";
//   return Number(value).toLocaleString("en-IN");
// };

// const CubeageIncrement = ({ company, data }) => {
//   if (!company || !data) return null;

//   /* ================= SALARY DATA ================= */
//   const salaryComponents = data.salaryComponents || [];

//   const totalMonthly = salaryComponents.reduce(
//     (sum, row) => sum + Number(row.monthly || 0),
//     0
//   );

//   const totalAnnual = salaryComponents.reduce(
//     (sum, row) => sum + Number(row.annual || 0),
//     0
//   );

//   return (
//     <div
//       className="a4-content-only"
//       style={{
//         width: "210mm",
//         minHeight: "297mm",
//         padding: "25mm 20mm",
//         fontFamily: '"Bahnschrift","Segoe UI",Arial,sans-serif',
//         fontSize: "12pt",
//         lineHeight: "1.7",
//         color: "#000",
//         backgroundColor: "#fff",
//         position: "relative",
//       }}
//     >
//       {/* ================= HEADER ================= */}
//       {company.header && (
//         <img
//           src={company.header}
//           alt="Company Header"
//           style={{ width: "100%", marginBottom: "10mm" }}
//         />
//       )}

//       {/* ================= COMPANY INFO ================= */}
      

//       {/* ================= DATE ================= */}
//       <div style={{ marginBottom: "10mm" }}>
//         <strong>Date:</strong> {formatDate(data.issueDate)}
//       </div>

//       {/* ================= TITLE ================= */}
//       <h3
//         style={{
//           textAlign: "center",
//           marginBottom: "12mm",
//           textDecoration: "underline",
//           fontWeight: "600",
//         }}
//       >
//         Appraisal Letter
//       </h3>

//       {/* ================= EMPLOYEE NAME ================= */}
//       <p style={{ marginBottom: "6mm" }}>
//         <strong>
//           {data.mrms} {data.employeeName}
//         </strong>
//       </p>

//       {/* ================= BODY ================= */}
//       <p style={{ marginBottom: "6mm" }}>
//         <strong>Congratulation!</strong>
//       </p>

//       <p style={{ textAlign: "justify", marginBottom: "6mm" }}>
//         We are pleased to inform you that based on your performance and
//         contribution to the company, our management has revised your
//         compensation to{" "}
//         <strong>Rs. {formatCurrency(data.newCTC)} /- LPA</strong> with effect
//         from <strong>{formatDate(data.effectiveDate)}</strong>.
//       </p>

//       <p style={{ textAlign: "justify", marginBottom: "6mm" }}>
//         We appreciate your initiative and expect you to take many more such
//         responsibilities in future assignments to ensure company’s growth.
//       </p>

//       <p style={{ marginBottom: "14mm" }}>Wishing you all Success.</p>

//       {/* ================= SIGNATURE ================= */}
//       <div style={{ marginBottom: "20mm" }}>
//         <p>
//           <strong>Authorized Signature,</strong>
//         </p>
//         <p>
//           <strong>For {company.name}</strong>
//         </p>

//         <div
//           style={{
//             display: "flex",
//             alignItems: "flex-start",
//             gap: "15mm",
//             marginTop: "6mm",
//           }}
//         >
//           {/* STAMP — LEFT */}
//           {company.stamp && (
//             <img
//               src={company.stamp}
//               alt="Company Stamp"
//               style={{ width: "35mm" }}
//             />
//           )}

//           {/* SIGNATURE — RIGHT */}
//           {company.signature && (
//             <img
//               src={company.signature}
//               alt="HR Signature"
//               style={{ width: "40mm" }}
//             />
//           )}
//         </div>
//       </div>

//       {/* ================= COMPENSATION STRUCTURE ================= */}
//       <h4 style={{ marginBottom: "6mm" }}>Compensation Structure</h4>

//       <div style={{ marginBottom: "6mm" }}>
//         <strong>Name:</strong> {data.mrms} {data.employeeName}
//         <br />
//         <strong>Designation:</strong> {data.designation}
//         <br />
//         <strong>Location:</strong> {company.city}
//       </div>

//       {/* ================= SALARY TABLE ================= */}
//       <TableContainer>
//         <Table
//           size="small"
//           sx={{
//             border: "1px solid #000",
//             "& th, & td": {
//               border: "1px solid #000",
//               fontSize: "11.5pt",
//             },
//           }}
//         >
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#d9d9d9" }}>
//               <TableCell>Component</TableCell>
//               <TableCell align="right">Monthly</TableCell>
//               <TableCell align="right">Annual</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {salaryComponents.map((row, i) => (
//               <TableRow key={i}>
//                 <TableCell>{row.name}</TableCell>
//                 <TableCell align="right">
//                   {formatCurrency(row.monthly)}
//                 </TableCell>
//                 <TableCell align="right">
//                   {formatCurrency(row.annual)}
//                 </TableCell>
//               </TableRow>
//             ))}

//             <TableRow sx={{ backgroundColor: "#d9d9d9" }}>
//               <TableCell>
//                 <strong>CTC</strong>
//               </TableCell>
//               <TableCell align="right">
//                 <strong>{formatCurrency(totalMonthly)}</strong>
//               </TableCell>
//               <TableCell align="right">
//                 <strong>{formatCurrency(totalAnnual)}</strong>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* ================= FOOT NOTE ================= */}
//       <p style={{ fontSize: "10.5pt" }}>
//         * PVLP will be payable to you on yearly basis subject to performance
//         review.
//       </p>
//     </div>
//   );
// };

// export default CubeageIncrement;






import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

/* ================= DATE FORMATTER ================= */
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/* ================= CURRENCY FORMAT ================= */
const formatCurrency = (value) => {
  if (value === undefined || value === null) return "0";
  return Number(value).toLocaleString("en-IN");
};

const CubeageIncrement = ({ company, data }) => {
  if (!company || !data) return null;

  /* =====================================================
     COMPENSATION STRUCTURE – INJECTED SALARY LOGIC
     (matches Word file structure)
     ===================================================== */

  const round0 = (n) => Math.round(n);

  // Source of truth (Annual CTC)
  const annualCTC = round0(Number(data.newCTC || 0));
  const monthlyCTC = round0(annualCTC / 12);

  // Component breakup (increment logic)
  const salaryComponents = [
    {
      name: "Basic",
      monthly: round0((annualCTC * 0.4) / 12),
      annual: round0(annualCTC * 0.4),
    },
    {
      name: "HRA",
      monthly: round0((annualCTC * 0.18) / 12),
      annual: round0(annualCTC * 0.18),
    },
    {
      name: "DA",
      monthly: round0((annualCTC * 0.12) / 12),
      annual: round0(annualCTC * 0.12),
    },
    {
      name: "LTA",
      monthly: round0((annualCTC * 0.1487) / 12),
      annual: round0(annualCTC * 0.1487),
    },
    {
      name: "ALLOWANCE (Shift+Skill)",
      monthly: round0((annualCTC * 0.05) / 12),
      annual: round0(annualCTC * 0.05),
    },
    {
      name: "SPECIAL ALLOWANCE",
      monthly:
        monthlyCTC -
        round0((annualCTC * (0.4 + 0.18 + 0.12 + 0.1487 + 0.05)) / 12),
      annual:
        annualCTC - round0(annualCTC * (0.4 + 0.18 + 0.12 + 0.1487 + 0.05)),
    },
  ];

  const totalMonthly = salaryComponents.reduce((sum, r) => sum + r.monthly, 0);

  const totalAnnual = salaryComponents.reduce((sum, r) => sum + r.annual, 0);

  return (
    <div
      className="a4-content-only"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "25mm 20mm",
        fontFamily: "Cambria",
        fontSize: "12pt",
        lineHeight: "1.7",
        color: "#000",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      {/* ================= HEADER ================= */}
      {company.header && (
        <img
          src={company.header}
          alt="Company Header"
          style={{ width: "100%", marginBottom: "10mm" }}
        />
      )}

      {/* ================= DATE ================= */}
      {/* ================= TITLE ================= */}
      <h3
        style={{
          textAlign: "center",
          marginBottom: "4mm", // tight gap between title & date
          textDecoration: "underline",
          fontWeight: 600,
        }}
      >
        Appraisal Letter
      </h3>

      <div
        style={{
          marginBottom: "12mm", // space before main content
          textAlign: "right",
        }}
      >
        <strong>Date:</strong> {formatDate(data.issueDate)}
      </div>

      {/* ================= EMPLOYEE NAME ================= */}
      <p style={{ marginBottom: "6mm" }}>
        <strong>
          {data.mrms} {data.employeeName}
        </strong>
      </p>

      {/* ================= BODY ================= */}
      <p style={{ marginBottom: "6mm" }}>
        <strong>Congratulation!</strong>
      </p>

      <p style={{ textAlign: "justify", marginBottom: "6mm" }}>
        We are pleased to inform you that based on your performance and
        contribution to the company, our management has revised your
        compensation to <strong>Rs. {formatCurrency(annualCTC)} /- LPA</strong>{" "}
        with effect from <strong>{formatDate(data.effectiveDate)}</strong>.
      </p>

      <p style={{ textAlign: "justify", marginBottom: "6mm" }}>
        We appreciate your initiative and expect you to take many more such
        responsibilities in future assignments to ensure company’s growth.
      </p>

      <p style={{ marginBottom: "14mm" }}>Wishing you all Success.</p>

      {/* ================= SIGNATURE ================= */}
      <div style={{ marginBottom: "20mm" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "15mm",
            marginTop: "6mm",
          }}
        >
          {company.signature && (
            <img
              src={company.signature}
              alt="HR Signature"
              style={{ width: "40mm", marginTop: "12mm", marginLeft: "-3mm" }}
            />
          )}
          {company.stamp && (
            <img
              src={company.stamp}
              alt="Company Stamp"
              style={{ width: "35mm", marginTop: "-5mm", marginLeft: "-15mm" }}
            />
          )}
        </div>
        <br />
        <p>
          <strong>Authorized Signature,</strong>
        </p>
        <br />
        <p>
          <strong>For {company.name}</strong>
        </p>
      </div>

      {/* ================= COMPENSATION STRUCTURE ================= */}
      <h4 style={{ marginBottom: "6mm", textAlign: "center" }}>
        Compensation Structure
      </h4>

      <div style={{ marginBottom: "6mm" }}>
        <strong>Name:</strong> {data.mrms} {data.employeeName}
        <br />
        <strong>Designation:</strong> {data.designation}
        <br />
        <strong>Location:</strong> {company.city}
      </div>

      {/* ================= SALARY TABLE ================= */}
      <TableContainer>
        <Table
          size="small"
          sx={{
            border: "1px solid #000",
            "& th, & td": {
              border: "1px solid #000",
              fontSize: "11.5pt",
            },
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#b3b3b3" }}>
              <TableCell sx={{ fontWeight: 600, border: "1px solid #000" }}>
                Components
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 600, border: "1px solid #000" }}
              >
                Amount/Month
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 600, border: "1px solid #000" }}
              >
                Amount/Annum
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {salaryComponents.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">
                  {formatCurrency(row.monthly)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(row.annual)}
                </TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: "#b3b3b3" }}>
              <TableCell sx={{ fontWeight: 600, border: "1px solid #000" }}>
                CTC
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 600, border: "1px solid #000" }}
              >
                {formatCurrency(totalMonthly)}
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 600, border: "1px solid #000" }}
              >
                {formatCurrency(totalAnnual)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      {/* ================= FOOT NOTE ================= */}
      <p style={{ fontSize: "10.5pt", fontFamily: "Verdana" }}>
        * PVLP will be payable to you on yearly basis subject to performance
        review.
      </p>
    </div>
  );
};

export default CubeageIncrement;
