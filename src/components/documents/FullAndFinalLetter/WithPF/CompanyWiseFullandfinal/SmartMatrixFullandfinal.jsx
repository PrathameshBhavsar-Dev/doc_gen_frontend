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

// /* ================= STYLES ================= */

// const FONT = "Cambria, 'Times New Roman', serif";

// const cell = {
//   border: "1px solid #000",
//   fontFamily: FONT,
//   fontSize: "11pt",
//   padding: "5px 6px",
// };

// const bold = { ...cell, fontWeight: 700 };
// const center = { ...cell, textAlign: "center" };
// const right = { ...cell, textAlign: "right" };

// const FullandFinalPF = ({ company = {}, data = {} }) => {
//   if (!company || !data) return null;

//   /* ================= BASIC DETAILS ================= */

//   const totalDays = Number(data.workdays || 0);
//   const paidDays = Number(data.paiddays || 0);
//   const ratio = totalDays ? paidDays / totalDays : 0;
//   const gross = Number(data.totalSalary || 0);

//   /* ================= SALARY BREAKUP ================= */

//   const basic = gross * 0.48;
//   const hra = gross * 0.18;
//   const da = gross * 0.12;
//   const special = gross * 0.16;
//   const food = gross * 0.06;

//   const pfAllowance = 3750; // static PF allowance

//   const earned = (val) => val * ratio;

//   const totalActual = basic + hra + da + special + food;
//   const totalEarned =
//     earned(basic) + earned(hra) + earned(da) + earned(special) + earned(food);

//   /* ================= DEDUCTIONS ================= */

//   const pf = 3750;
//   const pt = 200;
//   const others = 2000;

//   const totalDeductions = pf + pt + others;

//   const netPay = totalEarned - totalDeductions;

//   /* ================= DATE FORMAT ================= */

//   const formatDate = (d) => (d ? new Date(d).toLocaleDateString("en-GB") : "");

//   const formatMonth = (m) =>
//     m ? new Date(`${m}-01`).toLocaleString("default", { month: "long" }) : "";

//   return (
//     <A4Page
//       headerSrc={company.header}
//       footerSrc={company.footer}
//       contentTop="40mm"
//       contentBottom="40mm"
//       company={company}
//     >
//       <TableContainer component={Paper} sx={{ border: "1.5px solid #000" }}>
//         <Table size="small">
//           <TableBody>
//             {/* ===== TITLE ===== */}
//             <TableRow>
//               <TableCell
//                 colSpan={4}
//                 sx={{ ...bold, ...center, background: "#d9d9d9" }}
//               >
//                 Full & Final Settlement Statement
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell
//                 colSpan={4}
//                 sx={{ ...bold, ...center, background: "#d9d9d9" }}
//               >
//                 {company.name}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={4} sx={center}>
//                 {company.address}
//               </TableCell>
//             </TableRow>

//             {/* ===== EMPLOYEE DETAILS ===== */}
//             <TableRow>
//               <TableCell sx={cell}>Name of the employee</TableCell>
//               <TableCell sx={cell}>{data.employeeName}</TableCell>
//               <TableCell sx={cell}>F&F Date</TableCell>
//               <TableCell sx={cell}>{formatDate(data.date)}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={cell}>Employee ID</TableCell>
//               <TableCell sx={cell}>{data.employeeId}</TableCell>
//               <TableCell sx={cell}>Joining Date</TableCell>
//               <TableCell sx={cell}>{formatDate(data.doj)}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={cell}>Designation</TableCell>
//               <TableCell sx={cell}>{data.designation}</TableCell>
//               <TableCell sx={cell}>Date of Resignation</TableCell>
//               <TableCell sx={cell}>
//                 {formatDate(data.dateofresignation)}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={cell}>Department</TableCell>
//               <TableCell sx={cell}>{data.department}</TableCell>
//               <TableCell sx={cell}>Date of Leaving</TableCell>
//               <TableCell sx={cell}>{formatDate(data.dateofleaving)}</TableCell>
//             </TableRow>

//             {/* ===== SALARY PARTICULARS ===== */}
//             <TableRow sx={{ background: "#d9d9d9" }}>
//               <TableCell colSpan={2} sx={bold}>
//                 Salary particulars
//               </TableCell>
//               <TableCell sx={{ ...bold, textAlign: "center" }}>
//                 For the month
//               </TableCell>
//               <TableCell sx={center}>{formatMonth(data.month)}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={cell}>Total Day in the month</TableCell>
//               <TableCell sx={center}>{totalDays}</TableCell>
//               <TableCell sx={cell}>Paid days</TableCell>
//               <TableCell sx={center}>{paidDays}</TableCell>
//             </TableRow>

//             {/* ===== EARNINGS ===== */}
//             <TableRow sx={{ background: "#d9d9d9" }}>
//               <TableCell colSpan={2} sx={bold}>
//                 Earnings
//               </TableCell>
//               <TableCell sx={{ ...bold, textAlign: "center" }}>
//                 Actual
//               </TableCell>
//               <TableCell sx={{ ...bold, textAlign: "center" }}>
//                 Earned
//               </TableCell>
//             </TableRow>

//             {[
//               ["Basic", basic],
//               ["HRA", hra],
//               ["Dearness Allowance", da],
//               ["Special Allowances", special],
//               ["Food Allowances", food],
//               ["PF Allowance", pfAllowance],
//             ].map(([label, value]) => (
//               <TableRow key={label}>
//                 <TableCell colSpan={2} sx={cell}>
//                   {label}
//                 </TableCell>
//                 <TableCell sx={right}>{formatCurrency(value)}</TableCell>
//                 <TableCell sx={right}>
//                   {label === "PF Allowance"
//                     ? formatCurrency(pfAllowance)
//                     : formatCurrency(earned(value))}
//                 </TableCell>
//               </TableRow>
//             ))}

//             <TableRow>
//               <TableCell colSpan={2} sx={bold}>
//                 Total
//               </TableCell>
//               <TableCell sx={right}>{formatCurrency(totalActual)}</TableCell>
//               <TableCell sx={right}>{formatCurrency(totalEarned)}</TableCell>
//             </TableRow>

//             {/* ===== DEDUCTIONS ===== */}
//             <TableRow>
//               <TableCell colSpan={4} sx={{ ...bold, ...center }}>
//                 Less Deductions (-)
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={cell}>
//                 Provident Fund
//               </TableCell>
//               <TableCell sx={right}>{formatCurrency(pf)}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={cell}>
//                 Professional Tax
//               </TableCell>
//               <TableCell sx={right}>{formatCurrency(pt)}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={cell}>
//                 Others
//               </TableCell>
//               <TableCell sx={right}>{formatCurrency(others)}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={3} sx={bold}>
//                 Total Deductions
//               </TableCell>
//               <TableCell sx={right}>
//                 {formatCurrency(totalDeductions)}
//               </TableCell>
//             </TableRow>

//             {/* ===== NET PAY ===== */}
//             <TableRow>
//               <TableCell colSpan={3} sx={bold}>
//                 Net Payable (Rs)
//               </TableCell>
//               <TableCell sx={right}>{formatCurrency(netPay)}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={cell}>Amount in Words</TableCell>
//               <TableCell colSpan={3} sx={cell}>
//                 {numberToWords(Math.round(netPay))}
//               </TableCell>
//             </TableRow>

//             {/* ===== SIGNATURE ===== */}
//             <TableRow>
//               <TableCell></TableCell>
//               <TableCell align="center">
//                 <img src={stampImg} width={90} alt="" />
//               </TableCell>
//               <TableCell colSpan={2} align="center">
//                 <img src={signImg} width={120} alt="" />
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell align="center">Prepared By</TableCell>
//               <TableCell align="center">Verified By</TableCell>
//               <TableCell colSpan={2} align="center">
//                 Approved By
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </A4Page>
//   );
// };

// export default FullandFinalPF;

///////////////////////////////////////////////////////////

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
  numberToWords,
} from "../../../../../utils/salaryCalculations";

import stampImg from "../../../../../assets/images/smartmatrix/Smartmatrix_stamp.png";
import signImg from "../../../../../assets/images/smartmatrix/Smartmatrix_signature.png";

/* ================= STYLES ================= */

const FONT = "Cambria, 'Times New Roman', serif";

const cell = {
  border: "1px solid #000",
  fontFamily: FONT,
  fontSize: "11pt",
  padding: "5px 6px",
};

const bold = { ...cell, fontWeight: 700 };
const center = { ...cell, textAlign: "center" };
const right = { ...cell, textAlign: "right" };

const FullandFinalPF = ({ company = {}, data = {} }) => {
  if (!company || !data) return null;

  /* ================= BASIC DETAILS ================= */

  const totalDays = Number(data.workdays || 0);
  const paidDays = Number(data.paiddays || 0);
  const ratio = totalDays ? paidDays / totalDays : 0;
  const gross = Number(data.totalSalary || 0);

  /* ================= SALARY BREAKUP ================= */

  const basic = gross * 0.48;
  const hra = gross * 0.18;
  const da = gross * 0.12;
  const special = gross * 0.16;
  const food = gross * 0.06;

  const pfAllowance = 3750; // static PF allowance

  const earned = (val) => val * ratio;

  const totalActual = basic + hra + da + special + food;
  const totalEarned =
    earned(basic) + earned(hra) + earned(da) + earned(special) + earned(food);

  /* ================= DEDUCTIONS ================= */

  const pf = 3750;
  const pt = 200;
  const others = 2000;

  const totalDeductions = pf + pt + others;

  const netPay = totalEarned - totalDeductions;

  /* ================= DATE FORMAT ================= */

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString("en-GB") : "");

  const formatMonth = (m) =>
    m ? new Date(`${m}-01`).toLocaleString("default", { month: "long" }) : "";

  return (
    <A4Page
      headerSrc={company.header}
      footerSrc={company.footer}
      contentTop="40mm"
      contentBottom="40mm"
      company={company}
    >
      <TableContainer component={Paper} sx={{ border: "1.5px solid #000" }}>
        <Table size="small">
          <TableBody>
            {/* ===== TITLE ===== */}
            <TableRow>
              <TableCell
                colSpan={4}
                sx={{ ...bold, ...center, background: "#d9d9d9" }}
              >
                Full & Final Settlement Statement
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                colSpan={4}
                sx={{ ...bold, ...center, background: "#d9d9d9" }}
              >
                {company.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} sx={center}>
                {company.address}
              </TableCell>
            </TableRow>

            {/* ===== EMPLOYEE DETAILS ===== */}
            <TableRow>
              <TableCell sx={cell}>Name of the employee</TableCell>
              <TableCell sx={cell}>{data.employeeName}</TableCell>
              <TableCell sx={cell}>F&F Date</TableCell>
              <TableCell sx={cell}>{formatDate(data.date)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Employee ID</TableCell>
              <TableCell sx={cell}>{data.employeeId}</TableCell>
              <TableCell sx={cell}>Joining Date</TableCell>
              <TableCell sx={cell}>{formatDate(data.doj)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Designation</TableCell>
              <TableCell sx={cell}>{data.designation}</TableCell>
              <TableCell sx={cell}>Date of Resignation</TableCell>
              <TableCell sx={cell}>
                {formatDate(data.dateofresignation)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Department</TableCell>
              <TableCell sx={cell}>{data.department}</TableCell>
              <TableCell sx={cell}>Date of Leaving</TableCell>
              <TableCell sx={cell}>{formatDate(data.dateofleaving)}</TableCell>
            </TableRow>

            {/* ===== SALARY PARTICULARS ===== */}
            <TableRow sx={{ background: "#d9d9d9" }}>
              <TableCell colSpan={2} sx={bold}>
                Salary particulars
              </TableCell>
              <TableCell sx={{ ...bold, textAlign: "center" }}>
                For the month
              </TableCell>
              <TableCell sx={center}>{formatMonth(data.month)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Total Day in the month</TableCell>
              <TableCell sx={center}>{totalDays}</TableCell>
              <TableCell sx={cell}>Paid days</TableCell>
              <TableCell sx={center}>{paidDays}</TableCell>
            </TableRow>

            {/* ===== EARNINGS ===== */}
            <TableRow sx={{ background: "#d9d9d9" }}>
              <TableCell colSpan={2} sx={bold}>
                Earnings
              </TableCell>
              <TableCell sx={{ ...bold, textAlign: "center" }}>
                Actual
              </TableCell>
              <TableCell sx={{ ...bold, textAlign: "center" }}>
                Earned
              </TableCell>
            </TableRow>

            {[
              ["Basic", basic],
              ["HRA", hra],
              ["Dearness Allowance", da],
              ["Special Allowances", special],
              ["Food Allowances", food],
              ["PF Allowance", pfAllowance],
            ].map(([label, value]) => (
              <TableRow key={label}>
                <TableCell colSpan={2} sx={cell}>
                  {label}
                </TableCell>
                <TableCell sx={right}>{formatCurrency(value)}</TableCell>
                <TableCell sx={right}>
                  {label === "PF Allowance"
                    ? formatCurrency(pfAllowance)
                    : formatCurrency(earned(value))}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={2} sx={bold}>
                Total
              </TableCell>
              <TableCell sx={right}>{formatCurrency(totalActual)}</TableCell>
              <TableCell sx={right}>{formatCurrency(totalEarned)}</TableCell>
            </TableRow>

            {/* ===== DEDUCTIONS ===== */}
            <TableRow>
              <TableCell colSpan={4} sx={{ ...bold, ...center }}>
                Less Deductions (-)
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={cell}>
                Provident Fund
              </TableCell>
              <TableCell sx={right}>{formatCurrency(pf)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={cell}>
                Professional Tax
              </TableCell>
              <TableCell sx={right}>{formatCurrency(pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={cell}>
                Others
              </TableCell>
              <TableCell sx={right}>{formatCurrency(others)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={bold}>
                Total Deductions
              </TableCell>
              <TableCell sx={right}>
                {formatCurrency(totalDeductions)}
              </TableCell>
            </TableRow>

            {/* ===== NET PAY ===== */}
            <TableRow>
              <TableCell colSpan={3} sx={bold}>
                Net Payable (Rs)
              </TableCell>
              <TableCell sx={right}>{formatCurrency(netPay)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Amount in Words</TableCell>
              <TableCell colSpan={3} sx={cell}>
                {numberToWords(Math.round(netPay))}
              </TableCell>
            </TableRow>

            {/* ===== SIGNATURE ===== */}
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">
                <img src={stampImg} width={90} alt="" />
              </TableCell>
              <TableCell colSpan={2} align="center">
                <img src={signImg} width={120} alt="" />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center">Prepared By</TableCell>
              <TableCell align="center">Verified By</TableCell>
              <TableCell colSpan={2} align="center">
                Approved By
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </A4Page>
  );
};

export default FullandFinalPF;
