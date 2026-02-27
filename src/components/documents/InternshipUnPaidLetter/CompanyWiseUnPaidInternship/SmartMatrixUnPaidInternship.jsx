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
//   Paper,
// } from "@mui/material";
// import A4Layout from "../../../layout/A4Page";
// import {
//   generateAnnexureSalaryStructure,
//   formatCurrency,
// } from "../../../../utils/salaryCalculations";

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) => {
//   if (!date) return "";

//   const d = new Date(date); // 🔥 dynamic input (string / Date)
//   const day = String(d.getDate()).padStart(2, "0");
//   const month = String(d.getMonth() + 1).padStart(2, "0");
//   const year = d.getFullYear();

//   return `${day}/${month}/${year}`;
// };

// const SmartMatrixUnPaidInternship = ({ company, data }) => {
//   return (
//     <>
//       <A4Layout headerSrc={company.header} footerSrc={company.footer}>
//         {/* ================= DATE (BELOW HEADER IMAGE) ================= */}
//         <Box
//           sx={{
//             width: "100%",
//             textAlign: "right",
//             fontSize: "14px",
//             mt: "20mm", // ✅ pushes content below header image
//             mb: "10mm",
//             pr: "2mm", // right margin
//             fontFamily: "Cambria",
//           }}
//         >
//           <strong>Date: {formatDate(data.issueDate)}</strong>
//         </Box>

//         {/* ================= TITLE ================= */}
//         <Typography
//           align="center"
//           sx={{
//             fontSize: "16px",
//             fontWeight: "bold",
//             textDecoration: "underline",
//             mt: 2,
//             mb: "2mm",
//             fontFamily: "Cambria",
//           }}
//         >
//           Internship Offer Letter
//         </Typography>

//         {/* ================= CANDIDATE DETAILS ================= */}
//         <Box sx={{ mb: 2, fontFamily: "Book Antiqua" }}>
//           <Typography sx={{ mb: 1, fontFamily: "Cambria" }}>
//             <strong>Name :</strong> {data.mrms} {data.internName}
//           </Typography>

//           <Typography sx={{ fontFamily: "Book Antiqua", mb: 2 }}>
//             <strong>Subject :</strong> Letter of intent for the Internship of{" "}
//             {data.field}
//             <br />
//             Dear {data.internName},
//           </Typography>
//         </Box>

//         {/* ================= SALUTATION ================= */}
//         {/* <Typography sx={{ mb: 2, fontFamily: "Book Antiqua" }}></Typography> */}

//         {/* ================= BODY ================= */}
//         <Typography paragraph sx={{ fontFamily: "Book Antiqua" }}>
//           On behalf of <strong>{company.name}</strong> family, We are thrilled
//           to extend our warmest congratulations as we offer you the exciting
//           opportunity to join our esteemed team as our
//           <strong> {data.field} </strong>
//           from <strong>{formatDate(data.startDate)}</strong>{" "}
//         </Typography>

//         <Typography paragraph sx={{ fontFamily: "Book Antiqua" }}>
//           Your skills, passion, and competency stood out among a large pool of
//           candidates, making you a perfect fit for our organization.
//         </Typography>

//         <Typography paragraph sx={{ fontFamily: "Book Antiqua" }}>
//           During your internship tenure, you will work closely with our
//           experienced software professionals and gain hands-on exposure to
//           real-world projects and modern technologies.
//         </Typography>

//         {/* ================= RESPONSIBILITIES ================= */}
//         <Typography
//           sx={{ fontWeight: "bold", mt: 2, fontFamily: "Book Antiqua" }}
//         >
//           Your key responsibilities will include:
//         </Typography>

//         <Box
//           component="ul"
//           sx={{ pl: 4, mt: 1, fontFamily: "Book Antiqua", fontSize: "12pt" }}
//         >
//           <li>Assisting in software design, development, and testing</li>
//           <li>Participating in code reviews and feedback sessions</li>
//           <li>Contributing to feature development and enhancements</li>
//           <li>Collaborating with cross-functional teams</li>
//         </Box>

//         <Typography paragraph sx={{ mt: 2, fontFamily: "Book Antiqua" }}>
//           We wish you a rewarding learning journey with us and look forward to
//           your valuable contributions.
//         </Typography>

//         {/* ================= SIGNATURE ================= */}
//         <Box sx={{ mt: 2, fontFamily: "Cambria" }}>
//           <Typography>Authorized Signature,</Typography>

//           {/* ================= STAMP + SIGNATURE ROW ================= */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "flex-end",
//               mt: 2,
//             }}
//           >
//             {/* LEFT: COMPANY STAMP */}
//             <img
//               src={company.stamp}
//               alt="Company Stamp"
//               style={{
//                 width: "110px",
//               }}
//             />

//             {/* RIGHT: HR SIGNATURE */}
//             {company.signature && (
//               <img
//                 src={company.signature}
//                 alt="HR Signature"
//                 style={{
//                   height: "70px",
//                   marginRight: "96mm",
//                 }}
//               />
//             )}
//           </Box>

//           {/* ================= COMPANY NAME ================= */}
//           <Typography sx={{ mt: 2, fontWeight: "bold" }}>
//             For {company.name}
//           </Typography>
//         </Box>
//       </A4Layout>
//     </>
//   );
// };

// export default SmartMatrixUnPaidInternship;










import React from "react";
import { Box, Typography } from "@mui/material";
import A4Layout from "../../../layout/A4Page";

/* ================= DATE FORMAT ================= */
const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

const SmartMatrixUnPaidInternship = ({ company, data }) => {
  return (
    <A4Layout headerSrc={company.header} footerSrc={company.footer}>
      {/* ================= DATE ================= */}
      <Box
        sx={{
          width: "100%",
          textAlign: "right",
          fontSize: "14px",
          mt: "20mm",
          mb: "10mm",
          pr: "2mm",
          fontFamily: "Bahnschrift",
        }}
      >
        <strong>Date: {formatDate(data.issueDate)}</strong>
      </Box>

      {/* ================= TITLE ================= */}
      {/* <Typography
        align="center"
        sx={{
          fontSize: "16px",
          fontWeight: "bold",
          textDecoration: "underline",
          mb: "6mm",
          fontFamily: "Cambria",
        }}
      >
        Internship Offer Letter
      </Typography> */}

      {/* ================= CANDIDATE DETAILS ================= */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontFamily: "Bahnschrift" }}>
          <strong>Name :</strong> {data.mrms} {data.internName}
        </Typography>

        <Typography sx={{ fontFamily: "Bahnschrift" }}>
          <strong>Subject :</strong> Letter of intent for the Internship of
          position as <strong>{data.field}</strong>.
          <br />
          <br />
          Dear {data.internName},
        </Typography>
      </Box>

      {/* ================= BODY ================= */}
      <Typography paragraph sx={{ fontFamily: "Bahnschrift" }}>
        We are pleased to offer you the Internship of position as{" "}
        <strong>{data.field}</strong> with <strong>{company.name}</strong> with
        effective date <strong>{formatDate(data.startDate)}</strong> considering
        your performance and support towards the organization.
      </Typography>

      <Typography paragraph sx={{ fontFamily: "Bahnschrift" }}>
        If there is any change in the date of joining, changes can be taken
        under consideration.
      </Typography>

      <Typography paragraph sx={{ fontFamily: "Bahnschrift" }}>
        We welcome you to <strong>{company.name}</strong> Family and hope it
        would be the beginning of a long and mutually beneficial association.
      </Typography>

      <Typography paragraph sx={{ fontFamily: "Bahnschrift" }}>
        Kindly acknowledge the duplicate copy of this letter as an acceptance of
        this offer.
      </Typography>

      {/* ================= CLOSING ================= */}
      <Typography sx={{ mt: 4, fontFamily: "Bahnschrift" }}>
        Yours Sincerely,
      </Typography>

      {/* ================= SIGNATURE SECTION ================= */}
      <Box sx={{ mt: 5, fontFamily: "Verdana", fontWeight: "400" }}>
        <Typography>
          <strong>{company.name}</strong>
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mt: 2,
          }}
        >
          {/* COMPANY STAMP */}
          {company.stamp && (
            <img
              src={company.stamp}
              alt="Company Stamp"
              style={{ width: "110px" }}
            />
          )}

          {/* HR SIGNATURE */}
          {company.signature && (
            <img
              src={company.signature}
              alt="HR Signature"
              style={{
                height: "50px",
                marginRight: "87mm",
              }}
            />
          )}
        </Box>

        <Typography sx={{ mt: 2, fontWeight: "bold" }}></Typography>

        <Typography sx={{ fontWeight: "bold" }}>{company.hrName}</Typography>

        <Typography sx={{ mt: "", fontStyle: "Verdana" }}>
          {company.hrDesignation}
          <strong>HR Manager-HR Services</strong>
        </Typography>
      </Box>
    </A4Layout>
  );
};

export default SmartMatrixUnPaidInternship;

