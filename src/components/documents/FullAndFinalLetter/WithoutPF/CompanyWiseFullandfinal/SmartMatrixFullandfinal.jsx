// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import A4Page from "../../../../layout/A4Page";
// import {
//   formatCurrency,
//   numberToWords,
// } from "../../../../../utils/salaryCalculations";

// import stampImg from "../../../../../assets/images/smartmatrix/Smartmatrix_stamp.png";
// import signImg from "../../../../../assets/images/smartmatrix/Smartmatrix_sign.png";

// /* ================= FONT ================= */

// const FONT = "'Times New Roman', serif";

// /* ================= CELL STYLES ================= */

// const cell = {
//   border: "1px solid #000",
//   fontFamily: FONT,
//   fontSize: "10.5pt",
//   padding: "4px 6px",
//   verticalAlign: "middle",
// };

// const bold = { ...cell, fontWeight: 600 };
// const centerBold = { ...bold, textAlign: "center" };

// const Fullandfinal = ({ company = {}, data = {} }) => {
//   if (!company || !data) return null;

//   /* ================= MONTH ================= */
//   const [year, monthNum] = (data.month || "").split("-");
//   const monthName = year
//     ? new Date(year, monthNum - 1).toLocaleString("en-IN", {
//         month: "long",
//       })
//     : "";

//   /* ================= BASIC DETAILS ================= */

//   const totalDays = Number(data.workdays || 0);
//   const paidDays = Number(data.paiddays || 0);
//   const grossSalary = Number(data.totalSalary || 0);

//   /* ================= DATE FIELDS ================= */

//   const ffDate = data.date || "";
//   const joiningDate = data.doj || "";
//   const resignationDate = data.dateofresignation || "";
//   const leavingDate = data.dateofleaving || "";

//   /* ================= SALARY BREAKUP ================= */

//   const PERCENT = {
//     basic: 0.4,
//     hra: 0.18,
//     da: 0.16,
//     special: 0.12,
//     facility: 0.08,
//     food: 0.06,
//   };

//   const basicActual = grossSalary * PERCENT.basic;
//   const hraActual = grossSalary * PERCENT.hra;
//   const daActual = grossSalary * PERCENT.da;
//   const specialActual = grossSalary * PERCENT.special;
//   const facilityActual = grossSalary * PERCENT.facility;
//   const foodActual = grossSalary * PERCENT.food;

//   const calculateEarned = (amount) =>
//     totalDays > 0 ? (amount / totalDays) * paidDays : 0;

//   const basicEarned = calculateEarned(basicActual);
//   const hraEarned = calculateEarned(hraActual);
//   const daEarned = calculateEarned(daActual);
//   const specialEarned = calculateEarned(specialActual);
//   const facilityEarned = calculateEarned(facilityActual);
//   const foodEarned = calculateEarned(foodActual);

//   const totalActual =
//     basicActual +
//     hraActual +
//     daActual +
//     specialActual +
//     facilityActual +
//     foodActual;

//   const totalEarned =
//     basicEarned +
//     hraEarned +
//     daEarned +
//     specialEarned +
//     facilityEarned +
//     foodEarned;

//   /* ================= DEDUCTIONS ================= */

//   const pt = monthName.toLowerCase() === "february" ? 300 : 200;
//   const otherDeduction = 2000;
//   const totalDeduction = pt + otherDeduction;

//   /* ================= OTHER EARNINGS ================= */

//   const leaveEncashment = Number(data.leaveEncashment || 0);

//   /* ================= NET PAYABLE ================= */

//   const netPayable = totalEarned + leaveEncashment - totalDeduction;

//   return (
//     <A4Page
//       headerSrc={company?.header}
//       footerSrc={company?.footer}
//       watermarkSrc={company?.watermark}
//       contentTop="35mm"
//       contentBottom="50mm"
//     >
//       {" "}
//       <TableContainer
//         component={Paper}
//         sx={{
//           border: "1.5px solid #000",
//           borderRadius: 0,
//           boxShadow: "none",
//           mt: "5mm",
//           mb: "15mm",
//         }}
//       >
//         <Table size="small">
//           <colgroup>
//             <col style={{ width: "45%" }} />
//             <col style={{ width: "20%" }} />
//             <col style={{ width: "20%" }} />
//             <col style={{ width: "15%" }} />
//           </colgroup>
//           <TableBody>
//             {/* ===== TITLE ===== */}
//             <TableRow>
//               <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "13pt" }}>
//                 Full & Final Settlement Statement
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={4} sx={centerBold}>
//                 {company.name}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={4} sx={{ ...cell, textAlign: "center" }}>
//                 {company.address}
//               </TableCell>
//             </TableRow>

//             {/* ===== EMPLOYEE DETAILS ===== */}
//             <TableRow>
//               <TableCell sx={bold}>Name of the Employee</TableCell>
//               <TableCell sx={cell}>{data.employeeName}</TableCell>
//               <TableCell sx={bold}>F&F Date</TableCell>
//               <TableCell sx={cell}>{ffDate}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>Employee ID</TableCell>
//               <TableCell sx={cell}>{data.employeeId}</TableCell>
//               <TableCell sx={bold}>Joining Date</TableCell>
//               <TableCell sx={cell}>{joiningDate}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>Designation</TableCell>
//               <TableCell sx={cell}>{data.designation}</TableCell>
//               <TableCell sx={bold}>Date of Resignation</TableCell>
//               <TableCell sx={cell}>{resignationDate}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>Department</TableCell>
//               <TableCell sx={cell}>{data.department}</TableCell>
//               <TableCell sx={bold}>Date of Leaving</TableCell>
//               <TableCell sx={cell}>{leavingDate}</TableCell>
//             </TableRow>

//             {/* ===== SALARY HEADER ===== */}
//             <TableRow>
//               <TableCell colSpan={2} sx={centerBold}>
//                 Salary particulars
//               </TableCell>
//               <TableCell sx={centerBold}>For the month</TableCell>
//               <TableCell sx={centerBold}>{monthName}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>Total Day in the month</TableCell>
//               <TableCell align="center" sx={cell}>
//                 {totalDays}
//               </TableCell>
//               <TableCell sx={bold}>Paid days</TableCell>
//               <TableCell align="center" sx={cell}>
//                 {paidDays}
//               </TableCell>
//             </TableRow>
//             {/* ===== EARNINGS HEADER ===== */}
//             <TableRow>
//               {/* Merge Column 1 & 2 */}
//               <TableCell colSpan={2} sx={bold}>
//                 Earnings
//               </TableCell>

//               {/* Column 3 */}
//               <TableCell align="center" sx={bold}>
//                 Actual
//               </TableCell>

//               {/* Column 4 */}
//               <TableCell align="center" sx={bold}>
//                 Earned
//               </TableCell>
//             </TableRow>

//             {[
//               ["BASIC", basicActual, basicEarned],
//               ["HRA", hraActual, hraEarned],
//               ["DEARNESS ALLOWANCE", daActual, daEarned],
//               ["SPECIAL ALLOWANCE", specialActual, specialEarned],
//               ["FACILITY ALLOWANCE", facilityActual, facilityEarned],
//               ["FOOD ALLOWANCE", foodActual, foodEarned],
//             ].map(([label, actual, earned]) => (
//               <TableRow key={label}>
//                 {/* Merge Column 1 & 2 */}
//                 <TableCell colSpan={2} sx={cell}>
//                   {label}
//                 </TableCell>

//                 {/* Column 3 - Actual */}
//                 <TableCell align="center" sx={cell}>
//                   {formatCurrency(actual)}
//                 </TableCell>

//                 {/* Column 4 - Earned */}
//                 <TableCell align="center" sx={cell}>
//                   {formatCurrency(earned)}
//                 </TableCell>
//               </TableRow>
//             ))}

//             {/* ===== TOTAL ROW ===== */}
//             <TableRow>
//               <TableCell colSpan={2} sx={bold}>
//                 Total
//               </TableCell>

//               <TableCell align="center" sx={bold}>
//                 {formatCurrency(totalActual)}
//               </TableCell>

//               <TableCell align="center" sx={bold}>
//                 {formatCurrency(totalEarned)}
//               </TableCell>
//             </TableRow>
//             {/* ===== DEDUCTIONS ===== */}
//             <TableRow>
//               <TableCell colSpan={4} sx={centerBold}>
//                 Less Deductions (-)
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={cell}>
//                 Professional Tax
//               </TableCell>
//               <TableCell align="center" sx={cell}>
//                 {formatCurrency(pt)}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={cell}>
//                 Others
//               </TableCell>
//               <TableCell align="center" sx={cell}>
//                 {formatCurrency(otherDeduction)}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={bold}>
//                 Total Deductions
//               </TableCell>
//               <TableCell align="center" sx={bold}>
//                 {formatCurrency(totalDeduction)}
//               </TableCell>
//             </TableRow>

//             {/* ===== OTHER EARNINGS ===== */}
//             <TableRow>
//               <TableCell colSpan={4} sx={centerBold}>
//                 Other Earnings
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={cell}>
//                 Leave Encashment
//               </TableCell>
//               <TableCell align="center" sx={cell}>
//                 {formatCurrency(leaveEncashment)}
//               </TableCell>
//             </TableRow>

//             {/* ===== NET PAYABLE ===== */}
//             <TableRow>
//               <TableCell colSpan={3} sx={bold}>
//                 Net Payable (Rs)
//               </TableCell>
//               <TableCell align="center" sx={bold}>
//                 {formatCurrency(netPayable)}
//               </TableCell>
//             </TableRow>

//             {/* ===== AMOUNT IN WORDS ===== */}
//             <TableRow>
//               <TableCell sx={bold}>Amount in Words</TableCell>
//               <TableCell colSpan={3} sx={cell}>
//                 <strong>{numberToWords(Math.round(netPayable))} </strong>
//               </TableCell>
//             </TableRow>

//             {/* ===== SIGNATURE IMAGES ===== */}
//             <TableRow>
//               <TableCell sx={{ ...cell, height: 70 }}></TableCell>
//               <TableCell align="center" sx={cell}>
//                 <img src={stampImg} width={90} alt="Stamp" />
//               </TableCell>
//               <TableCell align="center" sx={cell}>
//                 <img src={signImg} width={120} alt="Signature" />
//               </TableCell>
//               <TableCell sx={cell}></TableCell>
//             </TableRow>

//             {/* ===== SIGNATURE TITLES ===== */}
//             <TableRow>
//               <TableCell align="center" sx={bold}>
//                 Prepared By
//               </TableCell>
//               <TableCell align="center" sx={bold}>
//                 Verified By
//               </TableCell>
//               <TableCell align="center" sx={bold}>
//                 Approved By
//               </TableCell>
//               <TableCell sx={cell}></TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </A4Page>
//   );
// };

// export default Fullandfinal;

////////////////////////////////////////////

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import {
  formatCurrency,
  numberToWords,
} from "../../../../../utils/salaryCalculations";

import stampImg from "../../../../../assets/images/smartmatrix/Smartmatrix_stamp.png";
import signImg from "../../../../../assets/images/smartmatrix/Smartmatrix_signature.png";

/* ================= COMPACT STYLES ================= */

const FONT = "Cambria, 'Times New Roman', serif";

const cell = {
  border: "1px solid #000",
  fontFamily: FONT,
  fontSize: "9.5pt",
  padding: "3px 5px",
  verticalAlign: "middle",
};

const bold = { ...cell, fontWeight: 600 };
const centerBold = { ...bold, textAlign: "center" };

const Fullandfinal = ({ company = {}, data = {} }) => {
  if (!company || !data) return null;

  /* ================= MONTH ================= */

  const [year, monthNum] = (data.month || "").split("-");
  const monthName = year
    ? new Date(year, monthNum - 1).toLocaleString("en-IN", {
        month: "long",
      })
    : "";

  /* ================= BASIC DETAILS ================= */

  const totalDays = Number(data.workdays || 0);
  const paidDays = Number(data.paiddays || 0);
  const grossSalary = Number(data.totalSalary || 0);

  const ffDate = data.date || "";
  const joiningDate = data.doj || "";
  const resignationDate = data.dateofresignation || "";
  const leavingDate = data.dateofleaving || "";

  /* ================= SALARY BREAKUP ================= */

  const PERCENT = {
    basic: 0.4,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    facility: 0.08,
    food: 0.06,
  };

  const calculateEarned = (amount) =>
    totalDays > 0 ? (amount / totalDays) * paidDays : 0;

  const components = [
    ["BASIC", PERCENT.basic],
    ["HRA", PERCENT.hra],
    ["DEARNESS ALLOWANCE", PERCENT.da],
    ["SPECIAL ALLOWANCE", PERCENT.special],
    ["FACILITY ALLOWANCE", PERCENT.facility],
    ["FOOD ALLOWANCE", PERCENT.food],
  ];

  let totalActual = 0;
  let totalEarned = 0;

  const earningsRows = components.map(([label, percent]) => {
    const actual = grossSalary * percent;
    const earned = calculateEarned(actual);

    totalActual += actual;
    totalEarned += earned;

    return { label, actual, earned };
  });

  /* ================= DEDUCTIONS ================= */

  const pt = monthName.toLowerCase() === "february" ? 300 : 200;
  const otherDeduction = 2000;
  const totalDeduction = pt + otherDeduction;

  /* ================= OTHER EARNINGS ================= */

  const leaveEncashment = Number(data.leaveEncashment || 0);

  const totalAfterOther = totalEarned + leaveEncashment;
  const netPayable = totalAfterOther - totalDeduction;

  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer}>
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
            {/* TITLE */}
            <TableRow>
              <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "11pt" }}>
                <strong>Full & Final Settlement Statement</strong>
              </TableCell>
            </TableRow>

            {/* COMPANY */}
            <TableRow>
              <TableCell colSpan={4} sx={centerBold}>
                <strong>{company.name}</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} sx={centerBold}>
                <strong>{company.address}</strong>
              </TableCell>
            </TableRow>

            {/* EMPLOYEE DETAILS */}
            <TableRow>
              <TableCell sx={bold}>Employee Name</TableCell>
              <TableCell sx={cell}>{data.employeeName}</TableCell>
              <TableCell sx={bold}>F&F Date</TableCell>
              <TableCell sx={cell}>{ffDate}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={bold}>Employee ID</TableCell>
              <TableCell sx={cell}>{data.employeeId}</TableCell>
              <TableCell sx={bold}>Joining Date</TableCell>
              <TableCell sx={cell}>{joiningDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={cell}>Designation</TableCell>
              <TableCell sx={cell}>{data.designation}</TableCell>
              <TableCell sx={cell}>Date of Resignation</TableCell>
              <TableCell sx={cell}>{data.dateofresignation}</TableCell>
            </TableRow>

            {/* <TableRow>
              {/* <TableCell sx={bold}>Designation</TableCell>
              <TableCell sx={cell}>{data.designation}</TableCell> */}
            {/* <TableCell sx={bold}>Leaving Date</TableCell>
              <TableCell sx={cell}>{leavingDate}</TableCell>
            </TableRow> */}

            <TableRow>
              <TableCell sx={bold}>
                <strong>Department</strong>
              </TableCell>
              <TableCell sx={cell}>{data.department}</TableCell>
              <TableCell sx={bold}>
                <strong>Date of Leaving</strong>
              </TableCell>
              <TableCell sx={cell}>{leavingDate}</TableCell>
            </TableRow>

            {/* SALARY HEADER */}
            <TableRow>
              <TableCell colSpan={4} sx={centerBold}>
                Salary Particulars - {monthName}
              </TableCell>
            </TableRow>

            {/* DAYS */}
            <TableRow>
              <TableCell sx={bold}>Total Days</TableCell>
              <TableCell sx={cell}>{totalDays}</TableCell>
              <TableCell sx={bold}>Paid Days</TableCell>
              <TableCell sx={cell}>{paidDays}</TableCell>
            </TableRow>

            {/* EARNINGS HEADER */}
            <TableRow>
              <TableCell sx={bold}>Earnings</TableCell>
              <TableCell sx={centerBold}>Actual</TableCell>
              <TableCell sx={centerBold}>Earned</TableCell>
              <TableCell sx={cell}></TableCell>
            </TableRow>

            {earningsRows.map((row) => (
              <TableRow key={row.label}>
                <TableCell sx={cell}>{row.label}</TableCell>
                <TableCell sx={{ ...cell, textAlign: "right" }}>
                  {formatCurrency(row.actual)}
                </TableCell>
                <TableCell sx={{ ...cell, textAlign: "right" }}>
                  {formatCurrency(row.earned)}
                </TableCell>
                <TableCell sx={cell}></TableCell>
              </TableRow>
            ))}

            {/* TOTAL */}
            <TableRow>
              <TableCell sx={bold}>Total</TableCell>
              <TableCell sx={{ ...cell, textAlign: "right" }}>
                {formatCurrency(totalActual)}
              </TableCell>
              <TableCell sx={{ ...cell, textAlign: "right" }}>
                {formatCurrency(totalEarned)}
              </TableCell>
              <TableCell sx={cell}></TableCell>
            </TableRow>

            {/* DEDUCTIONS */}
            <TableRow>
              <TableCell colSpan={4} sx={centerBold}>
                Less Deductions
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={cell}>
                Professional Tax
              </TableCell>
              <TableCell sx={{ ...cell, textAlign: "right" }}>
                {formatCurrency(pt)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={cell}>
                Others
              </TableCell>
              <TableCell sx={{ ...cell, textAlign: "right" }}>
                {formatCurrency(otherDeduction)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={bold}>
                Total Deductions
              </TableCell>
              <TableCell sx={{ ...cell, textAlign: "right" }}>
                {formatCurrency(totalDeduction)}
              </TableCell>
            </TableRow>

            {/* ===== OTHER EARNINGS ===== */}
            <TableRow>
              <TableCell colSpan={4} sx={centerBold}>
                <strong>Other Earnings</strong>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={cell}>
                Leave Encashment
              </TableCell>
              <TableCell sx={{ ...cell, textAlign: "right" }}>
                {formatCurrency(leaveEncashment)}
              </TableCell>
            </TableRow>

            {/* TOTAL AFTER OTHER EARNINGS */}
            <TableRow>
              <TableCell colSpan={3} sx={bold}>
                <strong>Total</strong>
              </TableCell>
              <TableCell sx={{ ...cell, textAlign: "right" }}>
                <strong>{formatCurrency(totalEarned)}</strong>
              </TableCell>
            </TableRow>

            {/* NET PAYABLE */}
            <TableRow>
              <TableCell colSpan={3} sx={bold}>
                <strong>Net Payable (Rs)</strong>
              </TableCell>
              <TableCell sx={{ ...cell, textAlign: "right" }}>
                <strong>{formatCurrency(netPayable)}</strong>
              </TableCell>
            </TableRow>

            {/* AMOUNT IN WORDS */}
            <TableRow>
              <TableCell sx={bold}>
                <strong>Amount in Words</strong>
              </TableCell>
              <TableCell colSpan={3} sx={cell}>
                <strong>{numberToWords(Math.round(netPayable))}</strong>
              </TableCell>
            </TableRow>

            {/* NET PAYABLE
            <TableRow>
              <TableCell colSpan={3} sx={bold}>Net Payable</TableCell>
              <TableCell sx={{ ...cell, textAlign: "right" }}>
                {formatCurrency(netPayable)}
              </TableCell>
            </TableRow> */}

            {/* AMOUNT IN WORDS
            <TableRow>
              <TableCell sx={bold}>Amount in Words</TableCell>
              <TableCell colSpan={3} sx={cell}>
                {numberToWords(Math.round(netPayable))}
              </TableCell>
            </TableRow> */}

            {/* SIGNATURE */}
            <TableRow>
              <TableCell sx={{ ...cell, height: "40px" }}></TableCell>
              <TableCell align="center" sx={cell}>
                <img src={stampImg} width={80} alt="Stamp" />
              </TableCell>
              <TableCell align="center" sx={cell}>
                <img src={signImg} width={110} alt="Signature" />
              </TableCell>
              <TableCell sx={cell}></TableCell>
            </TableRow>
            {/* ===== SIGNATURE TITLES ROW ===== */}
            <TableRow>
              <TableCell align="center" sx={bold}>
                <strong>Prepared By</strong>
              </TableCell>

              <TableCell align="center" sx={bold}>
                <strong>Verified By</strong>
              </TableCell>

              <TableCell align="center" sx={bold}>
                <strong>Approved By</strong>
              </TableCell>

              <TableCell sx={cell}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </A4Page>
  );
};

export default Fullandfinal;

// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import A4Page from "../../../../layout/A4Page";
// import {
//   formatCurrency,
//   numberToWords,
// } from "../../../../../utils/salaryCalculations";

// import stampImg from "../../../../../assets/images/smartmatrix/Smartmatrix_stamp.png";
// import signImg from "../../../../../assets/images/smartmatrix/Smartmatrix_signature.png";

// /* ================= FONT ================= */

// const FONT = "'Times New Roman', serif";

// /* ================= CELL STYLES ================= */

// const cell = {
//   border: "1px solid #000",
//   fontFamily: FONT,
//   fontSize: "10.5pt",
//   padding: "4px 6px",
//   verticalAlign: "middle",
// };

// const bold = { ...cell, fontWeight: 600 };
// const centerBold = { ...bold, textAlign: "center" };

// const Fullandfinal = ({ company = {}, data = {} }) => {
//   if (!company || !data) return null;

//   /* ================= MONTH ================= */
//   const [year, monthNum] = (data.month || "").split("-");
//   const monthName = year
//     ? new Date(year, monthNum - 1).toLocaleString("en-IN", {
//         month: "long",
//       })
//     : "";

//   /* ================= BASIC DETAILS ================= */

//   const totalDays = Number(data.workdays || 0);
//   const paidDays = Number(data.paiddays || 0);
//   const grossSalary = Number(data.totalSalary || 0);

//   /* ================= DATE FIELDS ================= */

//   const ffDate = data.date || "";
//   const joiningDate = data.doj || "";
//   const resignationDate = data.dateofresignation || "";
//   const leavingDate = data.dateofleaving || "";

//   /* ================= SALARY BREAKUP ================= */

//   const PERCENT = {
//     basic: 0.4,
//     hra: 0.18,
//     da: 0.16,
//     special: 0.12,
//     facility: 0.08,
//     food: 0.06,
//   };

//   const basicActual = grossSalary * PERCENT.basic;
//   const hraActual = grossSalary * PERCENT.hra;
//   const daActual = grossSalary * PERCENT.da;
//   const specialActual = grossSalary * PERCENT.special;
//   const facilityActual = grossSalary * PERCENT.facility;
//   const foodActual = grossSalary * PERCENT.food;

//   const calculateEarned = (amount) =>
//     totalDays > 0 ? (amount / totalDays) * paidDays : 0;

//   const basicEarned = calculateEarned(basicActual);
//   const hraEarned = calculateEarned(hraActual);
//   const daEarned = calculateEarned(daActual);
//   const specialEarned = calculateEarned(specialActual);
//   const facilityEarned = calculateEarned(facilityActual);
//   const foodEarned = calculateEarned(foodActual);

//   const totalActual =
//     basicActual +
//     hraActual +
//     daActual +
//     specialActual +
//     facilityActual +
//     foodActual;

//   const totalEarned =
//     basicEarned +
//     hraEarned +
//     daEarned +
//     specialEarned +
//     facilityEarned +
//     foodEarned;

//   /* ================= DEDUCTIONS ================= */

//   const pt = monthName.toLowerCase() === "february" ? 300 : 200;
//   const otherDeduction = 2000;
//   const totalDeduction = pt + otherDeduction;

//   /* ================= OTHER EARNINGS ================= */

//   const leaveEncashment = Number(data.leaveEncashment || 0);

//   /* ================= NET PAYABLE ================= */

//   const netPayable = totalEarned + leaveEncashment - totalDeduction;

//   return (
//     <A4Page
//       headerSrc={company?.header}
//       footerSrc={company?.footer}
//       watermarkSrc={company?.watermark}
//       contentTop="35mm"
//       contentBottom="50mm"
//     >
//       {" "}
//       <TableContainer
//         component={Paper}
//         sx={{
//           border: "1.5px solid #000",
//           borderRadius: 0,
//           boxShadow: "none",
//           mt: "5mm",
//           mb: "15mm",
//         }}
//       >
//         <Table size="small">
//           <colgroup>
//             <col style={{ width: "45%" }} />
//             <col style={{ width: "20%" }} />
//             <col style={{ width: "20%" }} />
//             <col style={{ width: "15%" }} />
//           </colgroup>
//           <TableBody>
//             {/* ===== TITLE ===== */}
//             <TableRow>
//               <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "13pt" }}>
//                 Full & Final Settlement Statement
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={4} sx={centerBold}>
//                 {company.name}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={4} sx={{ ...cell, textAlign: "center" }}>
//                 {company.address}
//               </TableCell>
//             </TableRow>

//             {/* ===== EMPLOYEE DETAILS ===== */}
//             <TableRow>
//               <TableCell sx={bold}>Name of the Employee</TableCell>
//               <TableCell sx={cell}>{data.employeeName}</TableCell>
//               <TableCell sx={bold}>F&F Date</TableCell>
//               <TableCell sx={cell}>{ffDate}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>Employee ID</TableCell>
//               <TableCell sx={cell}>{data.employeeId}</TableCell>
//               <TableCell sx={bold}>Joining Date</TableCell>
//               <TableCell sx={cell}>{joiningDate}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>Designation</TableCell>
//               <TableCell sx={cell}>{data.designation}</TableCell>
//               <TableCell sx={bold}>Date of Resignation</TableCell>
//               <TableCell sx={cell}>{resignationDate}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>Department</TableCell>
//               <TableCell sx={cell}>{data.department}</TableCell>
//               <TableCell sx={bold}>Date of Leaving</TableCell>
//               <TableCell sx={cell}>{leavingDate}</TableCell>
//             </TableRow>

//             {/* ===== SALARY HEADER ===== */}
//             <TableRow>
//               <TableCell colSpan={2} sx={centerBold}>
//                 Salary particulars
//               </TableCell>
//               <TableCell sx={centerBold}>For the month</TableCell>
//               <TableCell sx={centerBold}>{monthName}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={bold}>Total Day in the month</TableCell>
//               <TableCell align="center" sx={cell}>
//                 {totalDays}
//               </TableCell>
//               <TableCell sx={bold}>Paid days</TableCell>
//               <TableCell align="center" sx={cell}>
//                 {paidDays}
//               </TableCell>
//             </TableRow>
//             {/* ===== EARNINGS HEADER ===== */}
//             <TableRow>
//               {/* Merge Column 1 & 2 */}
//               <TableCell colSpan={2} sx={bold}>
//                 Earnings
//               </TableCell>

//               {/* Column 3 */}
//               <TableCell align="center" sx={bold}>
//                 Actual
//               </TableCell>

//               {/* Column 4 */}
//               <TableCell align="center" sx={bold}>
//                 Earned
//               </TableCell>
//             </TableRow>

//             {[
//               ["BASIC", basicActual, basicEarned],
//               ["HRA", hraActual, hraEarned],
//               ["DEARNESS ALLOWANCE", daActual, daEarned],
//               ["SPECIAL ALLOWANCE", specialActual, specialEarned],
//               ["FACILITY ALLOWANCE", facilityActual, facilityEarned],
//               ["FOOD ALLOWANCE", foodActual, foodEarned],
//             ].map(([label, actual, earned]) => (
//               <TableRow key={label}>
//                 {/* Merge Column 1 & 2 */}
//                 <TableCell colSpan={2} sx={cell}>
//                   {label}
//                 </TableCell>

//                 {/* Column 3 - Actual */}
//                 <TableCell align="center" sx={cell}>
//                   {formatCurrency(actual)}
//                 </TableCell>

//                 {/* Column 4 - Earned */}
//                 <TableCell align="center" sx={cell}>
//                   {formatCurrency(earned)}
//                 </TableCell>
//               </TableRow>
//             ))}

//             {/* ===== TOTAL ROW ===== */}
//             <TableRow>
//               <TableCell colSpan={2} sx={bold}>
//                 Total
//               </TableCell>

//               <TableCell align="center" sx={bold}>
//                 {formatCurrency(totalActual)}
//               </TableCell>

//               <TableCell align="center" sx={bold}>
//                 {formatCurrency(totalEarned)}
//               </TableCell>
//             </TableRow>
//             {/* ===== DEDUCTIONS ===== */}
//             <TableRow>
//               <TableCell colSpan={4} sx={centerBold}>
//                 Less Deductions (-)
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={cell}>
//                 Professional Tax
//               </TableCell>
//               <TableCell align="center" sx={cell}>
//                 {formatCurrency(pt)}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={cell}>
//                 Others
//               </TableCell>
//               <TableCell align="center" sx={cell}>
//                 {formatCurrency(otherDeduction)}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={bold}>
//                 Total Deductions
//               </TableCell>
//               <TableCell align="center" sx={bold}>
//                 {formatCurrency(totalDeduction)}
//               </TableCell>
//             </TableRow>

//             {/* ===== OTHER EARNINGS ===== */}
//             <TableRow>
//               <TableCell colSpan={4} sx={centerBold}>
//                 Other Earnings
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={cell}>
//                 Leave Encashment
//               </TableCell>
//               <TableCell align="center" sx={cell}>
//                 {formatCurrency(leaveEncashment)}
//               </TableCell>
//             </TableRow>

//             {/* ===== NET PAYABLE ===== */}
//             <TableRow>
//               <TableCell colSpan={3} sx={bold}>
//                 Net Payable (Rs)
//               </TableCell>
//               <TableCell align="center" sx={bold}>
//                 {formatCurrency(netPayable)}
//               </TableCell>
//             </TableRow>

//             {/* ===== AMOUNT IN WORDS ===== */}
//             <TableRow>
//               <TableCell sx={bold}>Amount in Words</TableCell>
//               <TableCell colSpan={3} sx={cell}>
//                 <strong>{numberToWords(Math.round(netPayable))} </strong>
//               </TableCell>
//             </TableRow>

//             {/* ===== SIGNATURE IMAGES ===== */}
//             <TableRow>
//               <TableCell sx={{ ...cell, height: 70 }}></TableCell>
//               <TableCell align="center" sx={cell}>
//                 <img src={stampImg} width={90} alt="Stamp" />
//               </TableCell>
//               <TableCell align="center" sx={cell}>
//                 <img src={signImg} width={120} alt="Signature" />
//               </TableCell>
//               <TableCell sx={cell}></TableCell>
//             </TableRow>

//             {/* ===== SIGNATURE TITLES ===== */}
//             <TableRow>
//               <TableCell align="center" sx={bold}>
//                 Prepared By
//               </TableCell>
//               <TableCell align="center" sx={bold}>
//                 Verified By
//               </TableCell>
//               <TableCell align="center" sx={bold}>
//                 Approved By
//               </TableCell>
//               <TableCell sx={cell}></TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </A4Page>
//   );
// };

// export default Fullandfinal;
