// import React, { useMemo } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import A4Page from "../../../../layout/A4Page";

// /* ================= SALARY UTILITIES ================= */
// import {
//   generateOfferLetterComponents,
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
//     : "—";

// const TEXT = {
//   fontSize: "14px",
//   lineHeight: 1.8,
// };

// const SmartSoftwarePaidInternshipLetter = ({
//   company,
//   data = {}, // default empty object
//   employeeName = "—",
//   candidateFullName = "",
//   stipend = 0,
//   address = "—",
//   internshipRole = "Intern",
//   joiningDate,
//   ctc,
//   letterDate,
//   tableBorder,
//   salaryRows = [], // default empty array
//   companyName = "SMART SOFTWARE SERVICES (I) Pvt. Ltd.",
// }) => {
//   /* ================= TITLE & PRONOUNS ================= */
//   const title = (data?.mrms || "").toLowerCase().trim();

//   const pronouns =
//     title === "miss." || title === "mrs."
//       ? {
//         subject: "She",
//         object: "her",
//         possessive: "her",
//         prefix: "Ms.",
//         verb: "is",
//       }
//       : title === "mx."
//         ? {
//           subject: "They",
//           object: "them",
//           possessive: "their",
//           prefix: "Mx.",
//           verb: "are",
//         }
//         : {
//           subject: "He",
//           object: "him",
//           possessive: "his",
//           prefix: "Mr.",
//           verb: "is",
//         };

//   const salaryComponents = [
//     { name: "Basic", monthly: basicMonthly, annual: basicAnnual },
//     { name: "House Rent Allowance", monthly: hraMonthly, annual: hraAnnual },
//     { name: "Dearness Allowance", monthly: daMonthly, annual: daAnnual },
//     { name: "Special Allowance", monthly: specialMonthly, annual: specialAnnual },
//     { name: "Food Allowance", monthly: foodMonthly, annual: foodAnnual },
//     { name: "Misc. Allowance", monthly: miscMonthly, annual: miscAnnual },
//   ];

//   /* ================= SALARY ================= */
//   const monthlyStipend = Number(data?.stipend ?? stipend) || 0;
//   const annualStipend = monthlyStipend * 12;

//   const computedSalaryRows = useMemo(
//     () => salaryRows.length > 0 ? salaryRows : generateOfferLetterComponents(annualStipend),
//     [annualStipend, salaryRows]
//   );

//   return (
//     <>
//       {/* ================= PAGE 1 ================= */}
//       <A4Page headerSrc={company?.header} footerSrc={company?.footer}>
//         <Box sx={{ p: 4 }}>
//           {/* DATE */}
//           <Typography sx={{ ...TEXT, mb: 3 }}>
//             {formatDate(data?.issueDate || letterDate)}
//           </Typography>

//           {/* NAME */}
//           <Typography sx={{ ...TEXT }}>
//             <b>Name</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
//             {` ${pronouns.prefix} ${data?.employeeName || employeeName}`}
//           </Typography>

//           {/* ADDRESS */}
//           <Typography sx={{ ...TEXT, mt: 1 }}>
//             <b>Address</b> &nbsp;&nbsp;: {data?.address || address}
//           </Typography>

//           {/* SUBJECT */}
//           <Typography sx={{ ...TEXT, mt: 3 }}>
//             <b>
//               Subject : Letter of Intent for the Internship Position of{" "}
//               {data?.designation || internshipRole}
//             </b>
//           </Typography>

//           {/* BODY */}
//           <Typography sx={{ ...TEXT, mt: 4 }}>
//             Dear {data?.employeeName || employeeName},
//           </Typography>

//           <Typography sx={{ ...TEXT, mt: 2 }}>
//             We are pleased to offer you the internship position of{" "}
//             <b>{data?.designation || internshipRole}</b>. As discussed,{" "}
//             {pronouns.subject} {pronouns.verb} requested to join on{" "}
//             <b>{formatDate(data?.startDate || joiningDate)}</b>. If there is any
//             change in the date of joining, the same may be considered.
//           </Typography>

//           <Typography sx={{ ...TEXT, mt: 2 }}>
//             {pronouns.possessive.charAt(0).toUpperCase() +
//               pronouns.possessive.slice(1)}{" "}
//             total gross salary will be Rs.{" "}
//             <b>{formatCurrency(annualStipend)}</b>{" "}
//             (<b>{numberToWords(annualStipend)}</b>) per year.
//           </Typography>

//           <Typography sx={{ ...TEXT, mt: 2 }}>
//             We welcome {pronouns.object} to the <b>{companyName}</b> family and
//             hope this association marks the beginning of a long and mutually
//             beneficial relationship.
//           </Typography>

//           <Typography sx={{ ...TEXT, mt: 2 }}>
//             Kindly acknowledge the duplicate copy of this letter as acceptance
//             of this offer.
//           </Typography>

//           {/* SIGNATURE */}
//           <Typography sx={{ ...TEXT, mt: 4 }}>Yours Sincerely,</Typography>

//           <Typography sx={{ ...TEXT, mt: 3 }}>
//             <b>For {companyName}</b>
//           </Typography>

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "flex-end",
//             }}
//           >
//             <Box>
//               <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
//                 {company?.signature && (
//                   <Box
//                     component="img"
//                     src={company.signature}
//                     sx={{ height: "80px" }}
//                   />
//                 )}
//                 {company?.stamp && (
//                   <Box
//                     component="img"
//                     src={company.stamp}
//                     sx={{ height: "100px" }}
//                   />
//                 )}
//               </Box>

//               <Box sx={{ mt: 4 }}>
//                 <Typography sx={{ ...TEXT }}>
//                   <b>Sandeep Patil</b>
//                 </Typography>
//                 <Typography sx={{ ...TEXT }}>HR Department, Pune</Typography>
//               </Box>
//             </Box>

//             <Box sx={{ mt: 3 }}>
//               <Typography sx={{ ...TEXT }}>Signature: _______________________</Typography>
//               <Typography sx={{ ...TEXT, mt: 1 }}>
//                 Candidate Name: {data?.employeeName || employeeName}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </A4Page>

//       {/* ================= PAGE 2 ================= */}
//       <A4Page headerSrc={company?.header} footerSrc={company?.footer}>
//         <Box sx={{ p: 4 }}>
//           <Typography
//             sx={{ fontSize: "16px", fontWeight: 700, mb: 3 }}
//             align="center"
//           >
//             ANNEXURE – A
//             <br />
//             SALARY STRUCTURE
//           </Typography>

//           <Table sx={{ borderCollapse: "collapse", width: "100%" }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={tableBorder}>
//                   <b>Salary Components</b>
//                 </TableCell>
//                 <TableCell align="right" sx={tableBorder}>
//                   <b>Per Month (Rs.)</b>
//                 </TableCell>
//                 <TableCell align="right" sx={tableBorder}>
//                   <b>Per Annum (Rs.)</b>
//                 </TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {[
//                 { label: "Basic", monthly: salaryComponents.basic },
//                 { label: "House Rent Allowance", monthly: salaryComponents.hra },
//                 { label: "Dearness Allowance", monthly: salaryComponents.da },
//                 { label: "Special Allowance", monthly: salaryComponents.specialAllowance },
//                 { label: "Food Allowance", monthly: salaryComponents.foodAllowance },
//                 { label: "Misc / Allowance", monthly: salaryComponents.miscAllowance },
//               ].map((row, index) => {
//                 const annual = row.monthly * 12;
//                 return (
//                   <TableRow key={index}>
//                     <TableCell sx={tableBorder}>{row.label}</TableCell>
//                     <TableCell align="right" sx={tableBorder}>
//                       {formatCurrency(row.monthly)}
//                     </TableCell>
//                     <TableCell align="right" sx={tableBorder}>
//                       {formatCurrency(annual)}
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}

//               {/* TOTAL ROW */}
//               <TableRow>
//                 <TableCell sx={tableBorder}>
//                   <b>Total Monthly Gross Salary</b>
//                 </TableCell>
//                 <TableCell align="right" sx={tableBorder}>
//                   <b>
//                     {formatCurrency(
//                       salaryComponents.basic +
//                       salaryComponents.hra +
//                       salaryComponents.da +
//                       salaryComponents.specialAllowance +
//                       salaryComponents.foodAllowance +
//                       salaryComponents.miscAllowance
//                     )}
//                   </b>
//                 </TableCell>
//                 <TableCell align="right" sx={tableBorder}>
//                   <b>
//                     {formatCurrency(
//                       (salaryComponents.basic +
//                         salaryComponents.hra +
//                         salaryComponents.da +
//                         salaryComponents.specialAllowance +
//                         salaryComponents.foodAllowance +
//                         salaryComponents.miscAllowance) *
//                       12
//                     )}
//                   </b>
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </Box>
//       </A4Page>

//     </>
//   );
// };

// export default SmartSoftwarePaidInternshipLetter;


import React, { useMemo } from "react";
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

/* ================= SALARY UTILITIES ================= */
import {
  generateOfferLetterComponents,
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
    : "—";

const TEXT = {
  fontSize: "14px",
  lineHeight: 1.8,
};

const SmartSoftwarePaidInternshipLetter = ({
  company,
  data = {},
  employeeName = "—",
  candidateFullName = "",
  stipend = 0,
  address = "—",
  internshipRole = "Intern",
  joiningDate,
  ctc,
  letterDate,
  tableBorder = { border: "1px solid black" }, // default border
  salaryRows = [],
  companyName = "SMART SOFTWARE SERVICES (I) Pvt. Ltd.",
}) => {
  /* ================= TITLE & PRONOUNS ================= */
  const title = (data?.mrms || "").toLowerCase().trim();

  const pronouns =
    title === "miss." || title === "mrs."
      ? { subject: "She", object: "her", possessive: "her", prefix: "Ms.", verb: "is" }
      : title === "mx."
      ? { subject: "They", object: "them", possessive: "their", prefix: "Mx.", verb: "are" }
      : { subject: "He", object: "him", possessive: "his", prefix: "Mr.", verb: "is" };

  /* ================= SALARY ================= */
  const monthlyStipend = Number(data?.stipend ?? stipend) || 0;
  const annualStipend = monthlyStipend * 12;

  const computedSalaryRows = useMemo(
    () =>
      salaryRows.length > 0
        ? salaryRows
        : [
            { name: "Basic", monthly: Math.round(monthlyStipend * 0.4) },
            { name: "House Rent Allowance", monthly: Math.round(monthlyStipend * 0.2) },
            { name: "Dearness Allowance", monthly: Math.round(monthlyStipend * 0.1) },
            { name: "Special Allowance", monthly: Math.round(monthlyStipend * 0.1) },
            { name: "Food Allowance", monthly: Math.round(monthlyStipend * 0.1) },
            { name: "Misc. Allowance", monthly: Math.round(monthlyStipend * 0.1) },
          ],
    [monthlyStipend, salaryRows]
  );

  const salaryComponents = computedSalaryRows.map((row) => ({
    ...row,
    annual: row.monthly * 12,
  }));

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company?.header} footerSrc={company?.footer}>
        <Box sx={{ p: 4 }}>
          {/* DATE */}
          <Typography sx={{ ...TEXT, mb: 3 }}>
            {formatDate(data?.issueDate || letterDate)}
          </Typography>

          {/* NAME */}
          <Typography sx={{ ...TEXT }}>
            <b>Name</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
            {` ${pronouns.prefix} ${data?.employeeName || employeeName}`}
          </Typography>

          {/* ADDRESS */}
          <Typography sx={{ ...TEXT, mt: 1 }}>
            <b>Address</b> &nbsp;&nbsp;: {data?.address || address}
          </Typography>

          {/* SUBJECT */}
          <Typography sx={{ ...TEXT, mt: 3 }}>
            <b>
              Subject : Letter of Intent for the Internship Position of{" "}
              {data?.designation || internshipRole}
            </b>
          </Typography>

          {/* BODY */}
          <Typography sx={{ ...TEXT, mt: 4 }}>
            Dear {data?.employeeName || employeeName},
          </Typography>

          <Typography sx={{ ...TEXT, mt: 2 }}>
            We are pleased to offer you the internship position of{" "}
            <b>{data?.designation || internshipRole}</b>. As discussed,{" "}
            {pronouns.subject} {pronouns.verb} requested to join on{" "}
            <b>{formatDate(data?.startDate || joiningDate)}</b>. If there is any
            change in the date of joining, the same may be considered.
          </Typography>

          <Typography sx={{ ...TEXT, mt: 2 }}>
            {pronouns.possessive.charAt(0).toUpperCase() +
              pronouns.possessive.slice(1)}{" "}
            total gross salary will be Rs.{" "}
            <b>{formatCurrency(annualStipend)}</b>{" "}
            (<b>{numberToWords(annualStipend)}</b>) per year.
          </Typography>

          <Typography sx={{ ...TEXT, mt: 2 }}>
            We welcome {pronouns.object} to the <b>{companyName}</b> family and
            hope this association marks the beginning of a long and mutually
            beneficial relationship.
          </Typography>

          <Typography sx={{ ...TEXT, mt: 2 }}>
            Kindly acknowledge the duplicate copy of this letter as acceptance
            of this offer.
          </Typography>

          {/* SIGNATURE */}
          <Typography sx={{ ...TEXT, mt: 4 }}>Yours Sincerely,</Typography>

          <Typography sx={{ ...TEXT, mt: 3 }}>
            <b>For {companyName}</b>
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Box>
              <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
                {company?.signature && (
                  <Box
                    component="img"
                    src={company.signature}
                    sx={{ height: "80px" }}
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

              <Box sx={{ mt: 4 }}>
                <Typography sx={{ ...TEXT }}>
                  <b>Sandeep Patil</b>
                </Typography>
                <Typography sx={{ ...TEXT }}>HR Department, Pune</Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography sx={{ ...TEXT }}>Signature: _______________________</Typography>
              <Typography sx={{ ...TEXT, mt: 1 }}>
                Candidate Name: {data?.employeeName || employeeName}
              </Typography>
            </Box>
          </Box>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
     <A4Page headerSrc={company?.header} footerSrc={company?.footer}>
  <Box sx={{ p: 4 }}>
    {/* ================= TITLE ================= */}
    <Typography
      sx={{ fontSize: "16px", fontWeight: 700, mb: 3 }}
      align="center"
    >
      ANNEXURE – A
      <br />
      SALARY STRUCTURE
    </Typography>

    {/* ================= TABLE ================= */}
<Table
  size="small"
  sx={{
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid black",
  }}
>
  {/* ================= TABLE HEADER ================= */}
  <TableHead>
    <TableRow
      sx={{
        height: "28px",
        backgroundColor: "#21a9cbff",
      }}
    >
      <TableCell
        sx={{
          border: "1px solid black",
          fontSize: "11.5px", // ⬆ increased
          py: 0.3,
          lineHeight: 1.3,
          fontWeight: 700,
        }}
      >
        Salary Components
      </TableCell>

      <TableCell
        align="right"
        sx={{
          border: "1px solid black",
          fontSize: "11.5px", // ⬆ increased
          py: 0.3,
          lineHeight: 1.3,
          fontWeight: 700,
        }}
      >
        Per Month (Rs.)
      </TableCell>

      <TableCell
        align="right"
        sx={{
          border: "1px solid black",
          fontSize: "11.5px", // ⬆ increased
          py: 0.3,
          lineHeight: 1.3,
          fontWeight: 700,
        }}
      >
        Per Annum (Rs.)
      </TableCell>
    </TableRow>
  </TableHead>

  {/* ================= TABLE BODY ================= */}
  <TableBody>
    {salaryComponents.map((row, index) => (
      <TableRow key={index} sx={{ height: "26px" }}>
        <TableCell
          sx={{
            border: "1px solid black",
            fontSize: "11px", // ⬆ increased
            py: 0.25,
            lineHeight: 1.25,
          }}
        >
          {row.name}
        </TableCell>

        <TableCell
          align="right"
          sx={{
            border: "1px solid black",
            fontSize: "11px", // ⬆ increased
            py: 0.25,
            lineHeight: 1.25,
          }}
        >
          {formatCurrency(row.monthly)}
        </TableCell>

        <TableCell
          align="right"
          sx={{
            border: "1px solid black",
            fontSize: "11px", // ⬆ increased
            py: 0.25,
            lineHeight: 1.25,
          }}
        >
          {formatCurrency(row.annual)}
        </TableCell>
      </TableRow>
    ))}

    {/* ================= TOTAL ROW ================= */}
    <TableRow sx={{ height: "28px" }}>
      <TableCell
        sx={{
          border: "1px solid black",
          fontSize: "11.5px", // ⬆ increased
          py: 0.3,
          lineHeight: 1.3,
          fontWeight: 700,
        }}
      >
        Total Monthly Gross Salary
      </TableCell>

      <TableCell
        align="right"
        sx={{
          border: "1px solid black",
          fontSize: "11.5px", // ⬆ increased
          py: 0.3,
          lineHeight: 1.3,
          fontWeight: 700,
        }}
      >
        {formatCurrency(
          salaryComponents.reduce((sum, row) => sum + row.monthly, 0)
        )}
      </TableCell>

      <TableCell
        align="right"
        sx={{
          border: "1px solid black",
          fontSize: "11.5px", // ⬆ increased
          py: 0.3,
          lineHeight: 1.3,
          fontWeight: 700,
        }}
      >
        {formatCurrency(
          salaryComponents.reduce((sum, row) => sum + row.annual, 0)
        )}
      </TableCell>
    </TableRow>
  </TableBody>
</Table>

    {/* ================= SIGNATURE SECTION ================= */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        mt: 6, // 👈 space from table
      }}
    >
      {/* LEFT SIDE (HR SIGN & STAMP) */}
      <Box>
        <Box sx={{ display: "flex", gap: "20px", mb: "8px" }}>
          {company?.signature && (
            <Box
              component="img"
              src={company.signature}
              sx={{ height: "80px" }}
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

        <Box sx={{ mt: 2 }}>
          <Typography sx={{ ...TEXT }}>
            <b>Sandeep Patil</b>
          </Typography>
          <Typography sx={{ ...TEXT }}>
            HR Department, Pune
          </Typography>
        </Box>
      </Box>

      {/* RIGHT SIDE (CANDIDATE) */}
      <Box>
        <Typography sx={{ ...TEXT }}>
          Signature: _______________________
        </Typography>
        <Typography sx={{ ...TEXT, mt: 1 }}>
          Candidate Name: {data?.employeeName || employeeName}
        </Typography>
      </Box>
    </Box>
  </Box>
</A4Page>
   
    </>
  );
};

export default SmartSoftwarePaidInternshipLetter;
