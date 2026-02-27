// import React from "react";
// import { Box, Typography } from "@mui/material";
// import A4Page from "../../../../layout/A4Page";







// const RPInternshipCertificate = ({ company, data }) => {

//   const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "2-digit",
//         year: "numeric",
//       })
//     : "";

    


//   return (
//     <A4Page
//       headerSrc={company.header}
//       footerSrc={company.footer}
      
//     >
//       <Box
//         sx={{
//           mt: 2,
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           color: "#000",
//         }}
//       >
//         {/* ================= TITLE ================= */}
//         <Typography
//           align="center"
//           fontWeight={700}
//           fontSize={16}
//           sx={{
//             // textDecoration: "underline",
//             // textUnderlineOffset: "4px",
//             // textDecorationThickness: "1.5px",
//             mb: 6 ,
//           }}
//         >
//           LETTER OF INTERNSHIP
//         </Typography>

//         {/* ================= BODY ================= */}
//         <Typography fontSize={16} textAlign="justify" mb={2}>
//           This is to certify that{" "}
//           <b>
//             {data.mrms} {data.employeeName}
//           </b>{" "}
//           has done her internship at{" "}
//           <b>RP Business Solutions LLP.</b>
//         </Typography>

//         <Typography fontSize={16} mb={2}>
//           From <b>{formatDate(data.startDate)}</b> – <b>{formatDate(data.endDate)}</b>. She was designated
//           as <b>{data.designation}</b>.
//         </Typography>

//         <Typography fontSize={16} mb={6} textAlign="justify">
//           During the internship She has demonstrated she skills with self-motivation to learn new skills. She performance exceeded our expectations and She was able to complete the given tasks on time. We wish her all the best for her upcoming career.
//         </Typography>

//         {/* ================= SIGNATURE (BOTTOM) ================= */}
//         <Box sx={{ mt: "auto" }}>
//           <Typography fontSize={16} mb={2}>
//             For RP Business Solutions LLP.
//           </Typography>

//           <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
//             {company.signature && (
//               <img
//                 src={company.signature}
//                 alt="Signature"
//                 style={{ height: 50 }}
//               />
//             )}
//             {company.stamp && (
//               <img
//                 src={company.stamp}
//                 alt="Stamp"
//                 style={{ height: 80 }}
//               />
//             )}
//           </Box>

//           <Typography fontWeight={600} fontSize={16} mt={2}>
//             {company.hrName}
//           </Typography>
//           <Typography fontSize={16}>
//             Group Leader – HR Division Pune
//           </Typography>
//         </Box>
//       </Box>
//     </A4Page>
//   );
// };

// export default RPInternshipCertificate;


import React from "react";
import { Box, Typography } from "@mui/material";
import A4Page from "../../../../layout/A4Page";

const RPInternshipCertificate = ({ company, data }) => {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

  const title = (data?.mrms || "").toLowerCase().trim();

  const pronouns =
    title === "miss." || title === "mrs."
      ? { subject: "She", object: "her", possessive: "her" }
      : title === "mx."
      ? { subject: "They", object: "them", possessive: "their" }
      : { subject: "He", object: "him", possessive: "his" };

  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer}>
      <Box
        sx={{
          mt: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          color: "#000",
        }}
      >
        {/* ================= TITLE ================= */}
        <Typography
          align="center"
         fontWeight={700}
         fontSize={16}
         sx={{
            // textDecoration: "underline",
            // textUnderlineOffset: "4px",
            // textDecorationThickness: "1.5px",
            mb: 6 ,
         }}
       >
          LETTER OF INTERNSHIP
        </Typography>

        {/* ================= BODY ================= */}
        <Typography fontSize={16} textAlign="justify" mb={2}>
          This is to certify that{" "}
          <b>
            {data.mrms} {data.employeeName}
          </b>{" "}
          has done {pronouns.possessive} internship at{" "}
          <b>RP Business Solutions LLP.</b>
        </Typography>

        <Typography fontSize={16} mb={2}>
          From <b>{formatDate(data.startDate)}</b> –{" "}
          <b>{formatDate(data.endDate)}</b>. {pronouns.subject} was designated as{" "}
          <b>{data.designation}</b>.
        </Typography>

        <Typography fontSize={16} mb={6} textAlign="justify">
          During the internship {pronouns.subject} has demonstrated{" "}
          {pronouns.possessive} skills with self-motivation to learn new skills.{" "}
          {pronouns.subject} performance exceeded our expectations and{" "}
          {pronouns.subject.toLowerCase()} was able to complete the given tasks
          on time. We wish {pronouns.object} all the best for{" "}
          {pronouns.possessive} upcoming career.
        </Typography>

        {/* ================= SIGNATURE ================= */}
        <Box sx={{ mt: "auto" }}>
          <Typography fontSize={16} mb={2}>
            For RP Business Solutions LLP.
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {company.signature && (
              <img
                src={company.signature}
                alt="Signature"
                style={{ height: 50 }}
              />
            )}
            {company.stamp && (
              <img
                src={company.stamp}
                alt="Stamp"
                style={{ height: 80 }}
              />
            )}
          </Box>

          <Typography fontWeight={600} fontSize={16} mt={2}>
            {company.hrName}
          </Typography>
          <Typography fontSize={16}>
            Group Leader – HR Division Pune
          </Typography>
        </Box>
      </Box>
    </A4Page>
  );
};

export default RPInternshipCertificate;

