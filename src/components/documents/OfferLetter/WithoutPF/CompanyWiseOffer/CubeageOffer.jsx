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
//   Grid,
// } from "@mui/material";
// import A4Layout from "../../../layout/A4Page";
// import {
//   generateOfferLetterComponents,
//   formatCurrency,
// } from "../../../../utils/salaryCalculations";

// /* ================= NUMBER TO WORDS ================= */
// const numberToWords = (num) => {
//   if (num === 0) return "Zero Rupees Only";

//   const a = [
//     "",
//     "One",
//     "Two",
//     "Three",
//     "Four",
//     "Five",
//     "Six",
//     "Seven",
//     "Eight",
//     "Nine",
//     "Ten",
//     "Eleven",
//     "Twelve",
//     "Thirteen",
//     "Fourteen",
//     "Fifteen",
//     "Sixteen",
//     "Seventeen",
//     "Eighteen",
//     "Nineteen",
//   ];
//   const b = [
//     "",
//     "",
//     "Twenty",
//     "Thirty",
//     "Forty",
//     "Fifty",
//     "Sixty",
//     "Seventy",
//     "Eighty",
//     "Ninety",
//   ];

//   const inWords = (n) => {
//     if (n < 20) return a[n];
//     if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
//     if (n < 1000)
//       return (
//         a[Math.floor(n / 100)] +
//         " Hundred" +
//         (n % 100 ? " " + inWords(n % 100) : "")
//       );
//     if (n < 100000)
//       return (
//         inWords(Math.floor(n / 1000)) +
//         " Thousand" +
//         (n % 1000 ? " " + inWords(n % 1000) : "")
//       );
//     if (n < 10000000)
//       return (
//         inWords(Math.floor(n / 100000)) +
//         " Lakh" +
//         (n % 100000 ? " " + inWords(n % 100000) : "")
//       );
//     if (n < 1000000000)
//       return (
//         inWords(Math.floor(n / 10000000)) +
//         " Crore" +
//         (n % 10000000 ? " " + inWords(n % 10000000) : "")
//       );
//     return "";
//   };

//   return inWords(num) + " Rupees Only";
// };

// /* ================= DATE FORMAT ================= */
// const formatDate = (date) =>
//   date
//     ? new Date(date).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "long",
//         year: "numeric",
//       })
//     : "";

// /* ================= MAIN COMPONENT ================= */
// const CubeageOffer = ({ company, data }) => {
//   if (!company || !data) return null;

//   const grossSalary = Number(data.salary || 0);
//   const salaryInWords = numberToWords(Math.round(grossSalary));

//   return (
//     <>
//       {/* ================= PAGE 1 ================= */}
//       <A4Layout headerSrc={company.header} footerSrc={null}>
//         <Box
//           sx={{
//             fontFamily: "Verdana, Arial, sans-serif",
//             fontSize: "10pt",
//             lineHeight: 1.55,
//             color: "#000",
//             padding: "20mm 25mm 25mm 25mm", // Word-like margins
//           }}
//         >
//           {/* TITLE */}
//           <Typography align="center" fontWeight="bold" mb="10mm">
//             Offer Cum Appointment Letter
//           </Typography>

//           {/* DATE */}
//           <Typography align="right" mb="6mm">
//             {formatDate(data.issueDate)}
//           </Typography>

//           {/* EMPLOYEE NAME */}
//           <Typography mb="5mm">
//             <strong>Employee Name:</strong> {data.mrms} {data.candidateName}
//           </Typography>

//           {/* GREETING */}
//           <Typography mb="5mm">
//             Dear {data.candidateName?.split(" ")[0]},
//           </Typography>

//           {/* INTRO */}
//           <Typography textAlign="justify" mb="6mm">
//             With reference to your application and the subsequent interview you
//             had with us, we are pleased to offer you the position of{" "}
//             <strong>{data.position}</strong> for{" "}
//             <strong>{data.location}</strong> Location on the following terms and
//             conditions:
//           </Typography>

//           {/* 1. DATE OF APPOINTMENT */}
//           <Typography fontWeight="bold" mb="2mm">
//             1.&nbsp;&nbsp;Date of Appointment
//           </Typography>
//           <Typography mb="5mm" ml="6mm">
//             Your appointment is effective from{" "}
//             <strong>{formatDate(data.joiningDate)}</strong>.
//           </Typography>

//           {/* 2. JOINING */}
//           <Typography fontWeight="bold" mb="2mm">
//             2.&nbsp;&nbsp;Joining
//           </Typography>
//           <Typography mb="5mm" ml="6mm">
//             Your Joining will be at “{company.name}”, “{company.city}”
//           </Typography>

//           {/* 3. PLACE OF EMPLOYMENT */}
//           <Typography fontWeight="bold" mb="2mm">
//             3.&nbsp;&nbsp;Place of Employment
//           </Typography>

//           <Typography textAlign="justify" mb="4mm" ml="12mm">
//             <strong>3.1</strong>&nbsp;&nbsp; You acknowledge and agree that you
//             may be assigned, transferred or deputed to offices, departments or
//             Units of Company and / or its affiliates and / or their contractors
//             and clients, whether in India or abroad. In the event of any such
//             assignment, transfer or deputation, you may be required to consent
//             to and / or agree to certain other agreements or policies applicable
//             to such assignment, deputation or transfer.
//           </Typography>

//           <Typography textAlign="justify" mb="5mm" ml="12mm">
//             <strong>3.2</strong>&nbsp;&nbsp; In the event of any assignment,
//             transfer or deputation of your services, your salary and other
//             benefits may be adjusted in accordance with the company’s policies
//             with respect to such assignment, transfer or deputation.
//           </Typography>

//           {/* 4. COST TO COMPANY */}
//           <Typography fontWeight="bold" mb="2mm">
//             4.&nbsp;&nbsp;Cost to Company
//           </Typography>

//           <Typography textAlign="justify" mb="4mm" ml="6mm">
//             You will be paid an annual emolument of{" "}
//             <strong>Rs. {Number(data.salary).toLocaleString("en-IN")}/-</strong>{" "}
//             ({numberToWords(Math.round(data.salary))}). For detailed Break-up
//             kindly refer the Annexure I.
//           </Typography>

//           <Typography textAlign="justify" mb="4mm" ml="6mm">
//             Your compensation may be reviewed on periodic basis and your salary
//             may be adjusted, depending upon various factors, including your
//             performance during the preceding period.
//           </Typography>

//           <Typography textAlign="justify" ml="6mm">
//             Notwithstanding the above, you acknowledge that it is company’s
//             policy to review the compensation payable to its employees for
//             successive years and such compensation may be higher or lower than
//             the compensation received for the previous year depending upon
//             various factors, including the overall performance of the company.
//           </Typography>
//         </Box>
//       </A4Layout>

//       {/* ================= PAGE 2 ================= */}
//       <A4Layout headerSrc={company.header} footerSrc={company.footer}>
//         <Box
//           sx={{
//             fontFamily: `"Times New Roman", serif`,
//             fontSize: "10pt",
//             lineHeight: 1.6,
//           }}
//         >
//           <Typography fontWeight="bold">5. Working Hours</Typography>
//           <Typography ml="6mm">
//             Normal hours are as determined by the company but your
//             responsibility is to ensure assigned deliverables are completed
//             within the allocated duration.
//           </Typography>

//           <Typography fontWeight="bold" mt="3mm">
//             6. Probation
//           </Typography>
//           <Typography ml="6mm">
//             a. You will be on probation for a period of Three months.
//           </Typography>
//           <Typography ml="6mm">
//             b. The probation may be extended at the discretion of Management.
//           </Typography>

//           <Typography fontWeight="bold" mt="3mm">
//             7. Non-Competition
//           </Typography>
//           <Typography ml="6mm" textAlign="justify">
//             You shall not engage in any competing business during employment.
//           </Typography>

//           <Typography fontWeight="bold" mt="3mm">
//             8. Court / Police Cases
//           </Typography>
//           <Typography ml="6mm" textAlign="justify">
//             You confirm that no police or court cases are pending against you.
//           </Typography>

//           <Typography fontWeight="bold" mt="3mm">
//             9. Confidentiality
//           </Typography>
//           <Typography ml="6mm" textAlign="justify">
//             All confidential information remains company property during and
//             after employment.
//           </Typography>
//         </Box>
//       </A4Layout>

//       {/* ================= PAGE 3 ================= */}
//       <A4Layout headerSrc={company.header} footerSrc={company.footer}>
//         <Box sx={{ fontFamily: `"Times New Roman", serif`, fontSize: "10pt" }}>
//           <Typography fontWeight="bold">10. Travel</Typography>
//           <Typography ml="6mm">
//             Any work-related travel will be paid as per company policy.
//           </Typography>

//           <Typography fontWeight="bold" mt="3mm">
//             11. Joining Formalities
//           </Typography>
//           <Typography ml="6mm">
//             This offer is subject to completion of joining formalities as per
//             Annexure II.
//           </Typography>

//           <Typography fontWeight="bold" mt="3mm">
//             12. Termination
//           </Typography>
//           <Typography ml="6mm" textAlign="justify">
//             Employment may be terminated by either party with one month’s
//             notice.
//           </Typography>

//           <Typography mt="6mm">Best Regards,</Typography>
//           <Typography fontWeight="bold">For {company.name}</Typography>

//           <Box mt="15mm" display="flex" gap="20mm">
//             {company.signature && (
//               <Box component="img" src={company.signature} height="45px" />
//             )}
//             {company.stamp && (
//               <Box component="img" src={company.stamp} height="70px" />
//             )}
//           </Box>
//         </Box>
//       </A4Layout>

//       {/* ================= PAGE 4 – ANNEXURE I ================= */}
//       <A4Layout headerSrc={company.header} footerSrc={company.footer}>
//         <Typography align="center" fontWeight="bold" mb="6mm">
//           Annexure I – Compensation Structure
//         </Typography>

//         <Grid container mb="4mm">
//           <Grid item xs={6}>
//             Name: {data.candidateName}
//           </Grid>
//           <Grid item xs={6}>
//             Designation: {data.position}
//           </Grid>
//         </Grid>

//         <TableContainer>
//           <Table size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Component</TableCell>
//                 <TableCell>Monthly</TableCell>
//                 <TableCell>Annual</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {generateOfferLetterComponents(grossSalary).map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell>{row.label}</TableCell>
//                   <TableCell>{formatCurrency(row.monthly)}</TableCell>
//                   <TableCell>{formatCurrency(row.annual)}</TableCell>
//                 </TableRow>
//               ))}
//               <TableRow>
//                 <TableCell>
//                   <strong>CTC</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>{formatCurrency(grossSalary / 12)}</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>{formatCurrency(grossSalary)}</strong>
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </A4Layout>

//       {/* ================= PAGE 5 – ANNEXURE II ================= */}
//       <A4Layout headerSrc={company.header} footerSrc={company.footer}>
//         <Typography align="center" fontWeight="bold" mb="6mm">
//           Annexure II – Documents Required
//         </Typography>

//         <Box component="ul" sx={{ pl: "20px", lineHeight: 1.7 }}>
//           <li>SSC / Birth Certificate</li>
//           <li>Final Year Marksheet</li>
//           <li>Degree Certificate</li>
//           <li>Previous Employment Certificate</li>
//           <li>Relieving Letter</li>
//           <li>Salary Slip / Form-16</li>
//           <li>Aadhar Card</li>
//           <li>PAN Card</li>
//           <li>Photographs</li>
//           <li>Bank Proof</li>
//         </Box>
//       </A4Layout>
//     </>
//   );
// };

// export default CubeageOffer;



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
  Grid,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import {
  generateOfferLetterComponents,
  formatCurrency,
} from "../../../../../utils/salaryCalculations";

/* ================= NUMBER TO WORDS ================= */
const numberToWords = (num) => {
  if (num === 0) return "Zero Rupees Only";

  const a = [
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
  const b = [
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
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
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
    if (n < 1000000000)
      return (
        inWords(Math.floor(n / 10000000)) +
        " Crore" +
        (n % 10000000 ? " " + inWords(n % 10000000) : "")
      );
    return "";
  };

  return inWords(num) + " Rupees Only";
};

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

/* ================= MAIN COMPONENT ================= */
const CubeageOffer = ({ company, data }) => {
  if (!company || !data) return null;

  const componentLabels = [
    "Basic",
    "HRA",
    "DA",
    "LTA",
    "ALLOWANCE (Shift+Skill)",
    "SPECIAL ALLOWANCE",
  ];
  // Use auto-calculation if CTC is provided, otherwise use manual components
  const ctc = parseFloat(data.ctc || data.annualSalary || 350000); // Default to 3.5 LPA
  const autoComponents = generateOfferLetterComponents(ctc);

  // === Total Salary ===
  const totalSalaryAnually = parseFloat(data.salary); // annual salary

  // === Annual components (percentages of totalSalaryAnually) ===
  const basicAnnual = totalSalaryAnually * 0.4013;
  const hraAnnual = totalSalaryAnually * 0.1798;
  const conveyanceAnnual = totalSalaryAnually * 0.1599;
  const specialAnnual = totalSalaryAnually * 0.1196;
  const foodAnnual = totalSalaryAnually * 0.0929;
  const medicAnnual = totalSalaryAnually * 0.0464;

  // === Monthly components ===
  const basicMonthly = Math.round(basicAnnual / 12);
  const hraMonthly = Math.round(hraAnnual / 12);
  const conveyanceMonthly = Math.round(conveyanceAnnual / 12);
  const specialMonthly = Math.round(specialAnnual / 12);
  const foodMonthly = Math.round(foodAnnual / 12);
  const medicMonthly = Math.round(medicAnnual / 12);

  // === Components array for table ===
  const salaryComponents = [
    { name: "Basic", monthly: basicMonthly, annual: basicAnnual },
    { name: "HRA", monthly: hraMonthly, annual: hraAnnual },
    { name: "DA", monthly: conveyanceMonthly, annual: conveyanceAnnual },
    { name: "LTA", monthly: specialMonthly, annual: specialAnnual },
    {
      name: "ALLOWANCE (Shift+Skill)",
      monthly: foodMonthly,
      annual: foodAnnual,
    },
    { name: "SPECIAL Allowance", monthly: medicMonthly, annual: medicAnnual },
  ];

  // === Totals ===
  const totalMonthly = salaryComponents.reduce((acc, c) => acc + c.monthly, 0);
  const totalAnnual = salaryComponents.reduce((acc, c) => acc + c.annual, 0);

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Layout headerSrc={company.header}>
        <Box
          sx={{
            paddingTop: "20mm",
          }}
        >
          {/* TITLE */}
          <Typography
            align="center"
            fontWeight="bold"
            mb="2mm"
            sx={{ fontSize: "16px" }}
          >
            Offer Cum Appointment Letter
          </Typography>

          {/* DATE */}
          <Typography align="right" mb="6mm" sx={{ fontSize: "14px" }}>
            {formatDate(data.issueDate)}
          </Typography>

          {/* EMPLOYEE NAME */}
          <Typography mb="5mm" sx={{ fontSize: "14px" }}>
            <strong>Employee Name:</strong> {data.mrms} {data.candidateName}
          </Typography>

          {/* GREETING */}
          <Typography mb="5mm" sx={{ fontSize: "14px" }}>
            Dear {data.candidateName?.split(" ")[0]},
          </Typography>

          {/* INTRO */}
          <Typography textAlign="justify" mb="5mm" sx={{ fontSize: "14px" }}>
            With reference to your application and the subsequent interview you
            had with us, we are pleased to offer you the position of{" "}
            <strong>{data.position}</strong> for{" "}
            <strong>{data.location}</strong> Location on the following terms and
            conditions:
          </Typography>

          {/* 1. DATE OF APPOINTMENT */}
          <Typography fontWeight="bold" mb="2mm" sx={{ fontSize: "14px" }}>
            1.&nbsp;&nbsp;Date of Appointment
          </Typography>
          <Typography mb="2mm" ml="6mm" sx={{ fontSize: "14px" }}>
            Your appointment is effective from{" "}
            <strong>{formatDate(data.joiningDate)}</strong>.
          </Typography>

          {/* 2. JOINING */}
          <Typography fontWeight="bold" mb="2mm" sx={{ fontSize: "14px" }}>
            2.&nbsp;&nbsp;Joining
          </Typography>
          <Typography mb="2mm" ml="6mm" sx={{ fontSize: "14px" }}>
            Your Joining will be at “{company.name}”, “{company.city}”
          </Typography>

          {/* 3. PLACE OF EMPLOYMENT */}
          <Typography fontWeight="bold" mb="2mm" sx={{ fontSize: "14px" }}>
            3.&nbsp;&nbsp;Place of Employment
          </Typography>

          <Typography
            textAlign="justify"
            mb="4mm"
            ml="12mm"
            sx={{ fontSize: "14px" }}
          >
            <strong>3.1</strong>&nbsp;&nbsp; You acknowledge and agree that you
            may be assigned, transferred or deputed to offices, departments or
            Units of Company and / or its affiliates and / or their contractors
            and clients, whether in India or abroad. In the event of any such
            assignment, transfer or deputation, you may be required to consent
            to and / or agree to certain other agreements or policies applicable
            to such assignment, deputation or transfer.
          </Typography>

          <Typography
            textAlign="justify"
            mb="5mm"
            ml="12mm"
            sx={{ fontSize: "14px" }}
          >
            <strong>3.2</strong>&nbsp;&nbsp; In the event of any assignment,
            transfer or deputation of your services, your salary and other
            benefits may be adjusted in accordance with the company’s policies
            with respect to such assignment, transfer or deputation.
          </Typography>

          {/* 4. COST TO COMPANY */}
          <Typography fontWeight="bold" mb="2mm" sx={{ fontSize: "14px" }}>
            4.&nbsp;&nbsp;Cost to Company
          </Typography>

          <Typography
            textAlign="justify"
            mb="4mm"
            ml="6mm"
            sx={{ fontSize: "14px" }}
          >
            You will be paid an annual emolument of{" "}
            <strong>Rs. {Number(data.salary).toLocaleString("en-IN")}/-</strong>{" "}
            ({numberToWords(Math.round(data.salary))}). For detailed Break-up
            kindly refer the Annexure I.
          </Typography>

          <Typography
            textAlign="justify"
            mb="4mm"
            ml="6mm"
            sx={{ fontSize: "14px" }}
          >
            Your compensation may be reviewed on periodic basis and your salary
            may be adjusted, depending upon various factors, including your
            performance during the preceding period.
          </Typography>

          <Typography textAlign="justify" ml="6mm" sx={{ fontSize: "14px" }}>
            Notwithstanding the above, you acknowledge that it is company’s
            policy to review the compensation payable to its employees for
            successive years and such compensation may be higher or lower than
            the compensation received for the previous year depending upon
            various factors, including the overall performance of the company.
          </Typography>
        </Box>
      </A4Layout>

      {/* ================= PAGE 2 ================= */}
      <A4Layout headerSrc={company.header}>
        <Box sx={{ pt: "20mm" }}>
          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontWeight: "bold",
              fontSize: "10pt",
            }}
          >
            5. {"  "}Working hours
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              ml: "6mm",
            }}
          >
            Normal hours are as determined by the company but your
            responsibility is to ensure that the assigned deliverables are
            completed within the allocated duration.
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontWeight: "bold",
              fontSize: "10pt",
            }}
          >
            6. {"  "}Probation
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              display: "flex",
              gap: "2mm",
              ml: "3mm",
            }}
          >
            a.<Box>You will be on probation for a period of Three months.</Box>
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              display: "flex",
              gap: "2mm",
              ml: "3mm",
            }}
          >
            b.
            <Box>
              The period of probation can be extended at the discretion of the
              Management and you will continue to be on probation till you are
              communicated otherwise.
            </Box>
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontWeight: "bold",
              fontSize: "10pt",
            }}
          >
            7. {"  "}Non- competition
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              ml: "6mm",
            }}
          >
            You agree with the Company that you will not, during the continuance
            of your employment with the Company, carry on or be engaged,
            directly or indirectly, either on your own behalf or on behalf of
            any person, or as manager, agent, consultant or employee of any
            person, firm or company, in any activity or business, in India or
            overseas, which shall directly or indirectly be in competition with
            the business of the Company or its subsidiaries or associated
            companies.
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontWeight: "bold",
              fontSize: "10pt",
            }}
          >
            8. {"  "}Court Cases / Police Cases
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              ml: "6mm",
            }}
          >
            You will submit a firm undertaking / confirmation in writing that
            there are no police cases / court cases pending in any court in
            India. If such undertaking submitted by you is found to be false,
            then this Offer-cum-Appointment letter shall stand terminated with
            immediate effect and you shall not be entitled to any compensation
            for any services you may have rendered.
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontWeight: "bold",
              fontSize: "10pt",
            }}
          >
            9. {"  "}Confidentiality
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              display: "flex",
              gap: "2mm",
              ml: "3mm",
            }}
          >
            9.1
            <Box>
              You agree that in the course of your employment you will have
              access to and be entrusted with information in respect of the
              business of the Company including intellectual property, processes
              and product specifications, etc. and relating to its dealings,
              transactions and affairs and likewise in relation to its
              subsidiaries, associated companies, customers or clients all of
              which information is or may be of a confidential nature.
            </Box>
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              display: "flex",
              gap: "2mm",
              ml: "3mm",
            }}
          >
            9.2
            <Box>
              You shall not, except in the proper course of performance of your
              duties during or at any time after the period of your employment
              or as may be required by law, divulge or disclose to any person
              whatsoever, any Confidential Information of the Company or any of
              its subsidiaries or associated companies or any of its or their
              suppliers, agents, distributors or customers.
            </Box>
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              display: "flex",
              gap: "2mm",
              ml: "3mm",
            }}
          >
            9.3
            <Box>
              All notes, memoranda, documents and Confidential Information
              concerning the business of the Company and its subsidiaries or
              associated companies or any of its or their suppliers, agents,
              distributors or customers which shall be acquired, received or
              made by you during the course of your employment shall be property
              of the Company and shall be surrendered by you to the Company upon
              the termination or at the request of the Company at any time
              during the course of your employment.
            </Box>
          </Typography>
        </Box>
      </A4Layout>

      {/* ================= PAGE 3 ================= */}
      <A4Layout headerSrc={company.header}>
        <Box sx={{ pt: "20mm" }}>
          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              display: "flex",
              gap: "2mm",
              ml: "3mm",
            }}
          >
            9.4
            <Box>
              Confidential Information means information relating to the
              business, products, affairs and finances of the Company or any of
              its associated company or subsidiary for the time being
              confidential to it or to them and trade secrets (including without
              limitation, technical data and know-how) relating to the business
              of the Company or of any of its Associated Company/ies or of any
              of its or their suppliers, clients or customers.
            </Box>
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontWeight: "bold",
              fontSize: "10pt",
            }}
          >
            10. {"  "}Travel
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              ml: "6mm",
            }}
          >
            Any work related travel will be paid by the company as per the
            expenditure policies of the company. A copy of this policy will be
            provided to you by your HR coordinator.
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontWeight: "bold",
              fontSize: "10pt",
            }}
          >
            11. {"  "}Joining Formalities
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              ml: "6mm",
            }}
          >
            This offer is subject to your completing joining formalities as
            specified in Annexure II and your confidential report being found
            satisfactory from the references provided to us.
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontWeight: "bold",
              fontSize: "10pt",
            }}
          >
            12. {"  "}Termination
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              ml: "6mm",
            }}
          >
            Your services can be terminated by either party after giving one
            month’s notice. If your services are terminated at your initiative,
            the company reserves the right to insist on full compliance to the
            notice period and may initiate appropriate legal remedies should you
            violate this provision of serving the notice period.
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              ml: "6mm",
            }}
          >
            Your employment is subject to positive Background Verification done
            by the company. If any document/s or information submitted by you
            is/are found to be false, your offer shall stand terminated with
            immediate effect without any prior notice and you will also not be
            entitled to any dues / claims.
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              ml: "6mm",
            }}
          >
            Please note that you are expected to keep the salary package
            strictly confidential and you cannot discuss or divulge any details
            to any of your colleagues.
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              ml: "6mm",
            }}
          >
            If the offer is acceptable to you, you are requested to get in touch
            with us on your joining day to complete your joining formalities.
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              ml: "6mm",
            }}
          >
            You are requested to sign on the copy of this letter as your
            acceptance of the above terms and conditions and submit the same to
            us on your joining day. Alternately, you can courier us at the below
            mentioned address:
          </Typography>

          <Typography
            sx={{
              textAlign: "justify",
              lineHeight: 1.6,
              mb: "2mm",
              fontSize: "10pt",
              ml: "6mm",
            }}
          >
            We look forward to have you on our team.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Box sx={{ mt: "2mm" }}>
              <Grid container spacing={2} alignItems="center">
                {/* Left image */}
                <Grid item>
                  <Box
                    component="img"
                    src={company.signature}
                    alt="Signature 1"
                    sx={{ width: 100, height: "auto" }}
                  />
                </Grid>

                {/* Right image */}
                <Grid item>
                  <Box
                    component="img"
                    src={company.stamp}
                    alt="Stamp"
                    sx={{ width: 100, height: "auto" }}
                  />
                </Grid>
              </Grid>

              {/* Names and designation below images */}
              <Box sx={{ mt: "2mm" }}>
                <Typography sx={{ mb: "1mm" }}>Best Regards, </Typography>
                <Typography>
                  For <strong>{company.name}</strong>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </A4Layout>

      {/* ================= PAGE 4 – ANNEXURE I ================= */}
      <A4Layout headerSrc={company.header}>
        <Box sx={{ pt: "24mm" }}>
          <Typography align="center" fontWeight="bold" mb="16mm">
            Compensation Structure
          </Typography>

          <Grid container direction="column" rowSpacing={1} mb="10mm">
            <Grid item>Name: {data.candidateName}</Grid>

            <Grid item>Designation: {data.position}</Grid>

            <Grid item>Location: {data.location}</Grid>
          </Grid>

          <TableContainer>
            <Table
              size="small"
              sx={{
                border: "1px solid #000",
                "& .MuiTableCell-root": {
                  border: "1px solid #000",
                },
              }}
            >
              <TableHead>
                <TableRow sx={{ bgcolor: "gray" }}>
                  <TableCell>Component</TableCell>
                  <TableCell>Monthly</TableCell>
                  <TableCell>Annual</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {salaryComponents.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell
                      sx={{
                        border: "1px solid #333",
                        fontSize: "11pt",
                        py: "0.5mm",
                      }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        border: "1px solid #333",
                        fontSize: "11pt",
                        py: "0.5mm",
                      }}
                    >
                      {formatCurrency(row.monthly)}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        border: "1px solid #333",
                        fontSize: "11pt",
                        py: "0.5mm",
                      }}
                    >
                      {formatCurrency(row.annual)}
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow sx={{ bgcolor: "gray" }}>
                  <TableCell>
                    <strong>CTC</strong>
                  </TableCell>
                  <TableCell>
                    <strong> {formatCurrency(totalMonthly)}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{formatCurrency(totalAnnual)}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </A4Layout>

      {/* ================= PAGE 5  ANNEXURE II ================= */}
      <A4Layout headerSrc={company.header}>
        <Box sx={{ pt: "34mm" }}>
          <Typography align="center" fontWeight="bold" mb="26mm">
            Annexure II
          </Typography>

          <Box
            component="ol"
            sx={{
              pl: "20px",
              lineHeight: 1.7,
              fontSize: "12pt",
            }}
          >
            <li>
              Photocopy of Birth Certificate / S.S.C. Certificate / School
              Leaving Certificate
            </li>
            <li>Photocopy of final year mark sheet</li>
            <li>
              Photocopy of Degree / Post Graduate Degree passing certificate
            </li>
            <li>Previous employment certificate (Experience)</li>
            <li>Previous employment relieving letter</li>
            <li>Certificate of last drawn salary / salary slip</li>
            <li>
              Certificate giving details of Salary paid and tax deducted in the
              current financial year (Form 16)
            </li>
            <li>
              Photocopy of Aadhar Card, if not applied, any other residential
              proof (mandatory)
            </li>
            <li>
              Photocopy of PAN / Acknowledgement of PAN Application (mandatory)
            </li>
            <li>Three colored photographs (ID Card Size)</li>
            <li>
              Copy of Bank a/c Proof (Cancel cheque & Bank Statement / Passbook)
            </li>
          </Box>
        </Box>
      </A4Layout>
    </>
  );
};

export default CubeageOffer;