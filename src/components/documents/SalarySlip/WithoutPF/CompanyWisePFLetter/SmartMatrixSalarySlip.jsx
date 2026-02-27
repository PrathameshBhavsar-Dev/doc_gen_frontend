// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import A4Page from "../../../layout/A4Page";
// import {
//   formatCurrency,
//   getProfessionalTax,
// } from "../../../../utils/salaryCalculations";

// // import watermarkImg from "../../assets/images/SmartSoftware/Watermark.png";
// import stampImg from "../../../../assets/images/smartmatrix/smartmatrix_stamp.png";
// import signImg from "../../../../assets/images/smartmatrix/smartmatrix_signature.png";

// /* 🔢 Convert number to words (INR) */
// const numberToWords = (num) => {
//   if (!num || num === 0) return "Zero Rupees Only";

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
//         (n % 100 ? " and " + inWords(n % 100) : "")
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
//     return "";
//   };

//   return `${inWords(Math.round(num))} Rupees Only`;
// };

// /* ===============================
//    SMART MATRIX SALARY SLIP
// ================================ */
// const SmartMatrixSalarySlip = ({ data = {}, company = {} }) => {
//   /* ===== BASIC INFO ===== */
//   const employeeName = data.employeeName || "Employee Name";
//   const employeeId = data.employeeId || "EMP001";
//   const designation = data.designation || "Software Engineer";
//   const department = data.department || "IT";
//   const gender = data.gender || "-";
//   const doj = data.doj || "-";
//   const dob = data.dob || "-";
//   const pan = data.pan || "-";
//   const bankMode = data.mode || "-";
//   const workingDays = data.workdays || 30;

//   /* ===== MONTH FORMAT ===== */
//   const salaryMonth = (() => {
//     if (!data.month) return "March 25";
//     const [year, month] = data.month.split("-");
//     const d = new Date(year, month - 1);
//     return `${d.toLocaleString("default", { month: "long" })} ${year.slice(2)}`;
//   })();

//   /* ===== SALARY CALCULATION ===== */
//   const totalSalary = Number(data.totalSalary || 35000);

//   const basic = totalSalary * 0.4013;
//   const hra = totalSalary * 0.1798;
//   const conveyance = totalSalary * 0.1599;
//   const special = totalSalary * 0.1196;
//   const others = totalSalary * 0.1394;

//   const pt = getProfessionalTax(data.month, totalSalary);
//   const otherDeduction = Number(data.otherDeduction || 0);

//   const totalEarnings = basic + hra + conveyance + special + others;
//   const totalDeduction = pt + otherDeduction;
//   const netPay = totalEarnings - totalDeduction;

//   /* ===============================
//      RENDER
//   ================================ */
//   return (
//     <A4Page
//       headerSrc={company.header || ""}
//       footerSrc={company.footer}
//       // watermarkSrc={company.watermarkImage || watermarkImg}
//       contentTop="45mm"
//       contentBottom="30mm"
//       company={company}
//     >
//       {/* 🔹 WATERMARK */}
//       {/* <Box
//         component="img"
//         src={company.watermarkImage || watermarkImg}
//         alt="Watermark"
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "110mm",
//           opacity: 0.3,
//           pointerEvents: "none",
//         }}
//       /> */}

//       {/* 🔹 MAIN TABLE */}
//       <TableContainer
//         component={Paper}
//         sx={{
//           border: "1.5px solid #000",
//           borderRadius: 0,
//           boxShadow: "none",
//           mt: "5mm",
//           "& .MuiTableCell-root": {
//             border: "1px solid #000",
//             fontSize: "8pt",
//             padding: "6px 8px",
//           },
//         }}
//       >
//         <Table size="small">
//           <TableBody>
//             {/* COMPANY HEADER */}
//             <TableRow>
//               <TableCell
//                 colSpan={4}
//                 align="center"
//                 sx={{ fontWeight: "bold", fontSize: "16pt" }}
//               >
//                 {company.name}
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell
//                 colSpan={4}
//                 align="center"
//                 sx={{ fontWeight: "bold", fontSize: "8pt" }}
//               >
//                 {company.address}
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold" }}>
//                 Salary Slip – {salaryMonth}
//               </TableCell>
//             </TableRow>

//             {/* EMPLOYEE DETAILS */}
//             <TableRow>
//               <TableCell fontWeight="bold">Name</TableCell>
//               <TableCell>{employeeName}</TableCell>
//               <TableCell>Employee ID</TableCell>
//               <TableCell>{employeeId}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell fontWeight="bold">Department</TableCell>
//               <TableCell>{department}</TableCell>
//               <TableCell>Designation</TableCell>
//               <TableCell>{designation}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell fontWeight="bold">Gender</TableCell>
//               <TableCell>{gender}</TableCell>
//               <TableCell>DOB</TableCell>
//               <TableCell>{dob}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell fontWeight="bold">DOJ</TableCell>
//               <TableCell>{doj}</TableCell>
//               <TableCell>PAN</TableCell>
//               <TableCell>{pan}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell fontWeight="bold">Payment Mode</TableCell>
//               <TableCell>{bankMode}</TableCell>
//               <TableCell>Working Days</TableCell>
//               <TableCell>{workingDays}</TableCell>
//             </TableRow>

//             {/* EARNINGS */}
//             <TableRow>
//               <TableCell align="center" fontWeight="bold">
//                 Earnings
//               </TableCell>
//               <TableCell colSpan={3} align="center" fontWeight="bold">
//                 Amount
//               </TableCell>
//             </TableRow>

//             {[
//               ["Basic Salary", basic],
//               ["HRA", hra],
//               ["Conveyance", conveyance],
//               ["Special Allowance", special],
//               ["Others", others],
//             ].map(([label, value]) => (
//               <TableRow key={label}>
//                 <TableCell fontWeight="bold">{label}</TableCell>
//                 <TableCell colSpan={3} align="center">
//                   {formatCurrency(value)}
//                 </TableCell>
//               </TableRow>
//             ))}

//             <TableRow>
//               <TableCell fontWeight="bold">Total Earnings</TableCell>
//               <TableCell colSpan={3} align="center">
//                 {formatCurrency(totalEarnings)}
//               </TableCell>
//             </TableRow>

//             {/* DEDUCTIONS */}
//             <TableRow>
//               <TableCell align="center" fontWeight="bold">
//                 Deductions
//               </TableCell>
//               <TableCell colSpan={3} align="center" fontWeight="bold">
//                 Amount
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell fontWeight="bold">Professional Tax</TableCell>
//               <TableCell colSpan={3} align="center">
//                 {formatCurrency(pt)}
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell fontWeight="bold">Other Deduction</TableCell>
//               <TableCell colSpan={3} align="center">
//                 {formatCurrency(otherDeduction)}
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell fontWeight="bold">Total Deduction</TableCell>
//               <TableCell colSpan={3} align="center">
//                 {formatCurrency(totalDeduction)}
//               </TableCell>
//             </TableRow>

//             {/* NET PAY */}
//             <TableRow>
//               <TableCell fontWeight="bold">Net Pay</TableCell>
//               <TableCell colSpan={3} align="center">
//                 {formatCurrency(netPay)}
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell fontWeight="bold">In Words</TableCell>
//               <TableCell colSpan={3}>{numberToWords(netPay)}</TableCell>
//             </TableRow>

//             {/* SIGNATURE */}
//             <TableRow>
//               <TableCell align="center">
//                 <img src={stampImg} alt="Stamp" width={80} />
//               </TableCell>
//               <TableCell colSpan={2}></TableCell>
//               <TableCell align="center">
//                 <img src={signImg} alt="Sign" width={120} />
//                 <Typography fontWeight="bold">Authorized Signatory</Typography>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </A4Page>
//   );
// };

// export default SmartMatrixSalarySlip;





























// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import A4Page from "../../../layout/A4Page";
// import {
//   formatCurrency,
//   getProfessionalTax,
// } from "../../../../utils/salaryCalculations";

// import stampImg from "../../../../assets/images/smartmatrix/smartmatrix_stamp.png";
// import signImg from "../../../../assets/images/smartmatrix/smartmatrix_signature.png";

// /* ================= WORD STYLE ================= */
// const FONT = "Cambria, 'Times New Roman', serif";

// const cell = {
//   border: "1px solid #000",
//   fontFamily: FONT,
//   fontSize: "10.5pt",
//   padding: "4px 6px",
//   verticalAlign: "middle",
// };

// const bold = { ...cell, fontWeight: 600 };
// const centerBold = { ...bold, textAlign: "center" };

// /* =============================== */
// const SmartMatrixSalarySlip = ({ data = {}, company = {} }) => {
//   /* ===== BASIC INFO ===== */
//   const employeeName = data.employeeName;
//   const employeeId = data.employeeId;
//   const designation = data.designation;
//   const department = data.department;
//   const gender = data.gender;
//   const doj = data.doj;
//   const dob = data.dob;
//   const pan = data.pan;
//   const bankMode = data.mode;
//   const workingDays = data.workdays;

//   /* ===== MONTH ===== */
//   const salaryMonth = (() => {
//     if (!data.month) return "";
//     const [y, m] = data.month.split("-");
//     return `${new Date(y, m - 1).toLocaleString("default", {
//       month: "long",
//     })} ${y}`;
//   })();

//   /* ===== CALCULATION (UNCHANGED) ===== */
//   const totalSalary = Number(data.totalSalary || 0);

//   const basic = totalSalary * 0.4013;
//   const hra = totalSalary * 0.1798;
//   const da = totalSalary * 0.1599;
//   const special = totalSalary * 0.1196;
//   const misc = totalSalary * 0.1394;

//   const pt = getProfessionalTax(data.month, totalSalary);
//   const otherDeduction = Number(data.otherDeduction || 0);

//   const totalEarnings = basic + hra + da + special + misc;
//   const totalDeduction = pt + otherDeduction;
//   const netPay = totalEarnings - totalDeduction;

//   return (
//     <A4Page
//       headerSrc={company.header}
//       footerSrc={company.footer}
//       contentTop="45mm"
//       contentBottom="30mm"
//       company={company}
//     >
//       <TableContainer
//         component={Paper}
//         sx={{
//           border: "1px solid #000",
//           borderRadius: 0,
//           boxShadow: "none",
//           mt: "5mm",
//         }}
//       >
//         <Table size="small">
//           <TableBody>
//             {/* ===== HEADER ===== */}
//             <TableRow>
//               <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "14pt" }}>
//                 {company.name}
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell colSpan={4} sx={centerBold}>
//                 {company.address}
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "11pt" }}>
//                 Salary Slip {salaryMonth}
//               </TableCell>
//             </TableRow>

//             {/* ===== EMPLOYEE DETAILS ===== */}
//             <TableRow>
//               <TableCell sx={bold}>Employee Name</TableCell>
//               <TableCell sx={cell}>{employeeName}</TableCell>
//               <TableCell sx={bold}>Employee ID</TableCell>
//               <TableCell sx={cell}>{employeeId}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>Gender</TableCell>
//               <TableCell sx={cell}>{gender}</TableCell>
//               <TableCell sx={bold}>Department</TableCell>
//               <TableCell sx={cell}>{department}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>DOJ</TableCell>
//               <TableCell sx={cell}>{doj}</TableCell>
//               <TableCell sx={bold}>Pan Number</TableCell>
//               <TableCell sx={cell}>{pan}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>Designation</TableCell>
//               <TableCell sx={cell}>{designation}</TableCell>
//               <TableCell sx={bold}>DOB</TableCell>
//               <TableCell sx={cell}>{dob}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>Mode</TableCell>
//               <TableCell sx={cell}>
//                 {bankMode}
//                 <br />
//                 {data.accountNo}
//               </TableCell>
//               <TableCell sx={bold}>Working days</TableCell>
//               <TableCell sx={cell}>{workingDays}</TableCell>
//             </TableRow>

//             {/* ===== EARNINGS ===== */}
//             <TableRow>
//               <TableCell colSpan={3} sx={centerBold}>
//                 Earnings
//               </TableCell>
//               <TableCell sx={centerBold}>Amount</TableCell>
//             </TableRow>

//             {[
//               ["BASIC", basic],
//               ["HRA", hra],
//               ["DEARNESS ALLOWANCE", da],
//               ["SPECIAL ALLOWANCE", special],
//               ["MISC. ALLOWANCE", misc],
//             ].map(([label, value]) => (
//               <TableRow key={label}>
//                 <TableCell colSpan={3} sx={cell}>
//                   {label}
//                 </TableCell>
//                 <TableCell sx={{ ...cell, textAlign: "right" }}>
//                   {formatCurrency(value)}
//                 </TableCell>
//               </TableRow>
//             ))}

//             <TableRow>
//               <TableCell
//                 colSpan={3}
//                 sx={{ ...centerBold, fontStyle: "italic" }}
//               >
//                 Total
//               </TableCell>
//               <TableCell sx={{ ...cell, textAlign: "right" }}>
//                 {formatCurrency(totalEarnings)}
//               </TableCell>
//             </TableRow>

//             {/* ===== DEDUCTIONS ===== */}
//             <TableRow>
//               <TableCell colSpan={4} sx={centerBold}>
//                 Deductions
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={cell}>
//                 PT
//               </TableCell>
//               <TableCell sx={{ ...cell, textAlign: "right" }}>
//                 {formatCurrency(pt)}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={cell}>
//                 Other Deduction
//               </TableCell>
//               <TableCell sx={{ ...cell, textAlign: "right" }}>
//                 {formatCurrency(otherDeduction)}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell
//                 colSpan={3}
//                 sx={{ ...centerBold, fontStyle: "italic" }}
//               >
//                 Total Deduction
//               </TableCell>
//               <TableCell sx={{ ...cell, textAlign: "right" }}>
//                 {formatCurrency(totalDeduction)}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={centerBold}>
//                 Net Pay
//               </TableCell>
//               <TableCell sx={{ ...cell, textAlign: "right" }}>
//                 {formatCurrency(netPay)}
//               </TableCell>
//             </TableRow>

//             {/* ===== IN WORDS ===== */}
//             <TableRow>
//               <TableCell sx={centerBold}>In Words</TableCell>
//               <TableCell colSpan={3} sx={cell}>
//                 {data.netPayInWords}
//               </TableCell>
//             </TableRow>

//             {/* ===== SIGNATURE ===== */}
//             <TableRow>
//               <TableCell align="center" sx={cell}>
//                 <img src={stampImg} alt="Stamp" width={70} />
//               </TableCell>
//               <TableCell colSpan={2} sx={cell}></TableCell>
//               <TableCell align="center" sx={cell}>
//                 <img src={signImg} alt="Sign" width={120} />
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </A4Page>
//   );
// };

// export default SmartMatrixSalarySlip;











import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import {
  formatCurrency,
  getProfessionalTax,
  numberToWords,
} from "../../../../../utils/salaryCalculations";

import stampImg from "../../../../../assets/images/smartmatrix/Smartmatrix_stamp.png";
import signImg from "../../../../../assets/images/smartmatrix/Smartmatrix_signature.png";

/* ================= WORD STYLES ================= */
const FONT = "Cambria, 'Times New Roman', serif";

const cell = {
  border: "1px solid #000",
  fontFamily: FONT,
  fontSize: "10.5pt",
  padding: "4px 6px",
  verticalAlign: "middle",
};

const bold = { ...cell, fontWeight: 600 };
const centerBold = { ...bold, textAlign: "center" };

/* ================================================= */
const SmartMatrixSalarySlip = ({ company, data }) => {
  if (!company || !data) return null;

  /* ===== MONTH ===== */
  const salaryMonth = (() => {
    if (!data.month) return "";
    const [y, m] = data.month.split("-");
    return `${new Date(y, m - 1).toLocaleString("default", {
      month: "long",
    })} ${y}`;
  })();

  /* ===== CALCULATIONS (UNCHANGED) ===== */
  const totalSalary = Number(data.totalSalary || 0);

  const basic = totalSalary * 0.4013;
  const hra = totalSalary * 0.1798;
  const da = totalSalary * 0.1599;
  const special = totalSalary * 0.1196;
  const misc = totalSalary * 0.1394;

  const pt = getProfessionalTax(data.month, totalSalary);
  const otherDeduction = Number(data.otherDeduction || 700);

  const totalEarnings = basic + hra + da + special + misc;
  const totalDeduction = pt + otherDeduction;
  const netPay = Number(totalEarnings - totalDeduction) || 0;

  return (
    <A4Page
      headerSrc={company.header}
      footerSrc={company.footer}
      contentTop="45mm"
      contentBottom="30mm"
      company={company}
    >
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid #000",
          borderRadius: 0,
          boxShadow: "none",
          mt: "5mm",
        }}
      >
        <Table size="small">
          <TableBody>
            {/* ===== HEADER ===== */}
            <TableRow>
              <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "14pt" }}>
                {company.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} sx={centerBold}>
                <strong>{company.address}</strong>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                colSpan={4}
                sx={{
                  ...centerBold,
                  fontSize: "11pt",
                  fontFamily: "Cambria, 'Times New Roman', serif",
                }}
              >
                Salary Slip {salaryMonth}
              </TableCell>
            </TableRow>

            {/* ===== EMPLOYEE DETAILS ===== */}
            <TableRow>
              <TableCell sx={bold}>Employee Name</TableCell>
              <TableCell sx={cell}>{data.employeeName}</TableCell>
              <TableCell sx={bold}>Employee ID</TableCell>
              <TableCell sx={cell}>{data.employeeId}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={bold}>Gender</TableCell>
              <TableCell sx={cell}>{data.gender}</TableCell>
              <TableCell sx={bold}>Department</TableCell>
              <TableCell sx={cell}>{data.department}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={bold}>DOJ</TableCell>
              <TableCell sx={cell}>{data.doj}</TableCell>
              <TableCell sx={bold}>Pan Number</TableCell>
              <TableCell sx={cell}>{data.pan}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={bold}>Designation</TableCell>
              <TableCell sx={cell}>{data.designation}</TableCell>
              <TableCell sx={bold}>DOB</TableCell>
              <TableCell sx={cell}>{data.dob}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={bold}>Mode</TableCell>
              <TableCell sx={cell}>
                {data.mode}
                <br />
                {data.accountNo}
              </TableCell>
              <TableCell sx={bold}>Working days</TableCell>
              <TableCell sx={cell}>{data.workdays}</TableCell>
            </TableRow>

            {/* ===== EARNINGS ===== */}
            <TableRow>
              <TableCell colSpan={3} sx={centerBold}>
                Earnings
              </TableCell>
              <TableCell sx={centerBold}>Amount</TableCell>
            </TableRow>

            {[
              ["BASIC", basic],
              ["HRA", hra],
              ["DEARNESS ALLOWANCE", da],
              ["SPECIAL ALLOWANCE", special],
              ["MISC. ALLOWANCE", misc],
            ].map(([label, value]) => (
              <TableRow key={label}>
                <TableCell colSpan={3} sx={cell}>
                  {label}
                </TableCell>
                <TableCell sx={{ ...cell, textAlign: "right" }}>
                  {formatCurrency(value)}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell
                colSpan={3}
                sx={{
                  ...centerBold,
                  fontFamily: "Cambria, 'Times New Roman', serif",
                }}
              >
                Total
              </TableCell>
              <TableCell sx={{ ...cell, textAlign: "right" }}>
                {formatCurrency(totalEarnings)}
              </TableCell>
            </TableRow>

            {/* ===== DEDUCTIONS ===== */}
            <TableRow>
              <TableCell
                colSpan={3}
                sx={{
                  ...centerBold,
                  fontFamily: "Cambria, 'Times New Roman', serif",
                }}
              >
                Deductions
              </TableCell>
              <TableCell sx={cell}></TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={cell}>
                PT
              </TableCell>
              <TableCell sx={{ ...cell, textAlign: "right" }}>
                {formatCurrency(pt)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={cell}>
                Other Deduction
              </TableCell>
              <TableCell sx={{ ...cell, textAlign: "right" }}>
                {formatCurrency(otherDeduction)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                colSpan={3}
                sx={{
                  ...centerBold,
                  fontFamily: "Cambria, 'Times New Roman', serif",
                }}
              >
                Total Deduction
              </TableCell>
              <TableCell sx={{ ...cell, textAlign: "right" }}>
                {formatCurrency(totalDeduction)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={centerBold}>
                Net Pay
              </TableCell>
              <TableCell sx={{ ...cell, textAlign: "right" }}>
                {formatCurrency(netPay)}
              </TableCell>
            </TableRow>

            {/* ===== IN WORDS (TOTAL AMOUNT) ===== */}
            <TableRow>
              <TableCell sx={centerBold}>In Words</TableCell>
              <TableCell colSpan={3} sx={cell}>
                <strong>
                  {totalEarnings > 0 ? numberToWords(Math.round(netPay)) : ""}
                </strong>
              </TableCell>
            </TableRow>

            {/* ===== SIGNATURE ===== */}
            <TableRow>
              <TableCell align="center" sx={cell}>
                <img src={stampImg} alt="Stamp" width={70} />
              </TableCell>
              <TableCell colSpan={2} sx={cell}></TableCell>
              <TableCell align="center" sx={cell}>
                <img src={signImg} alt="Sign" width={120} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </A4Page>
  );
};

export default SmartMatrixSalarySlip;
