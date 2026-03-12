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

//   const leaveEncashment = Number(data.leaveEncashment || 0);

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
//     >
//       <TableContainer component={Paper} sx={{ border: "1.5px solid #000" }}>
//         <Table size="small">
//           <TableBody>
//             {/* ===== TITLE ===== */}
//             <TableRow>
//               <TableCell colSpan={4} sx={{ ...bold, ...center }}>
//                 Full & Final Settlement Statement
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={4} sx={{ ...bold, ...center }}>
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
//               <TableCell sx={{ ...cell, background: "#efe2b8" }}>
//                 {data.employeeName}
//               </TableCell>
//               <TableCell sx={cell}>F&F Date</TableCell>
//               <TableCell sx={{ ...cell, background: "#efe2b8" }}>
//                 {formatDate(data.date)}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={cell}>Employee ID</TableCell>
//               <TableCell sx={{ ...cell, background: "#efe2b8" }}>
//                 {data.employeeId}
//               </TableCell>
//               <TableCell sx={cell}>Joining Date</TableCell>
//               <TableCell sx={{ ...cell, background: "#efe2b8" }}>
//                 {formatDate(data.doj)}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={cell}>Designation</TableCell>
//               <TableCell sx={{ ...cell, background: "#efe2b8" }}>
//                 {data.designation}
//               </TableCell>
//               <TableCell sx={cell}>Date of Resignation</TableCell>
//               <TableCell sx={{ ...cell, background: "#efe2b8" }}>
//                 {formatDate(data.dateofresignation)}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={cell}>Department</TableCell>
//               <TableCell sx={{ ...cell, background: "#efe2b8" }}>
//                 {data.department}
//               </TableCell>
//               <TableCell sx={cell}>Date of Leaving</TableCell>
//               <TableCell sx={{ ...cell, background: "#efe2b8" }}>
//                 {formatDate(data.dateofleaving)}
//               </TableCell>
//             </TableRow>

//             {/* ===== SALARY PARTICULARS ===== */}
//             <TableRow>
//               <TableCell colSpan={2} sx={{ ...bold, textAlign: "center" }}>
//                 Salary particulars
//               </TableCell>
//               <TableCell sx={{ ...bold, textAlign: "center" }}>
//                 For the month
//               </TableCell>
//               <TableCell
//                 sx={{ ...bold, textAlign: "center", background: "#efe2b8" }}
//               >
//                 {formatMonth(data.month)}
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell sx={{ ...bold, textAlign: "center" }}>
//                 Total Day in the month
//               </TableCell>
//               <TableCell
//                 sx={{ ...bold, textAlign: "center", background: "#efe2b8" }}
//               >
//                 {totalDays}
//               </TableCell>
//               <TableCell sx={{ ...bold, textAlign: "center" }}>
//                 Paid days
//               </TableCell>
//               <TableCell
//                 sx={{ ...bold, textAlign: "center", background: "#efe2b8" }}
//               >
//                 {paidDays}
//               </TableCell>
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
//                 <TableCell sx={center}>{formatCurrency(value)}</TableCell>
//                 <TableCell sx={center}>
//                   {label === "PF Allowance"
//                     ? formatCurrency(pfAllowance)
//                     : formatCurrency(Math.round(earned(value)))}
//                 </TableCell>
//               </TableRow>
//             ))}

//             <TableRow>
//               <TableCell colSpan={2} sx={bold}>
//                 Total
//               </TableCell>
//               <TableCell sx={center}>{formatCurrency(totalActual)}</TableCell>
//               <TableCell sx={center}>
//                 {formatCurrency(Math.round(totalEarned))}
//               </TableCell>
//             </TableRow>

//             {/* ===== DEDUCTIONS ===== */}
//             <TableRow>
//               <TableCell colSpan={4} sx={{ ...bold, ...center }}>
//                 Less Deductions (-)
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={2} sx={{ ...cell, textAlign: "center" }}>
//                 Provident Fund
//               </TableCell>
//               <TableCell sx={cell}></TableCell>

//               <TableCell sx={center}>{formatCurrency(pf)}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={2} sx={{ ...cell, textAlign: "center" }}>
//                 Professional Tax
//               </TableCell>
//               <TableCell sx={cell}></TableCell>

//               <TableCell sx={center}>{formatCurrency(pt)}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={2} sx={{ ...cell, textAlign: "center" }}>
//                 Others
//               </TableCell>
//               <TableCell sx={cell}></TableCell>

//               <TableCell sx={center}>{formatCurrency(others)}</TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={2} sx={{ ...bold, textAlign: "center" }}>
//                 Total Deductions
//               </TableCell>
//               <TableCell sx={cell}></TableCell>

//               <TableCell sx={center}>
//                 {formatCurrency(totalDeductions)}
//               </TableCell>
//             </TableRow>
//             {/* ===== OTHER EARNINGS ===== */}
//             <TableRow>
//               <TableCell colSpan={4} sx={{ ...bold, textAlign: "center" }}>
//                 <strong>Other Earnings</strong>
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell colSpan={2} sx={{ ...cell, textAlign: "center" }}>
//                 Leave Encashment
//               </TableCell>
//               <TableCell sx={cell}></TableCell>

//               <TableCell sx={{ ...cell, textAlign: "center" }}>
//                 {formatCurrency(leaveEncashment)}
//               </TableCell>
//             </TableRow>

//             {/* TOTAL AFTER OTHER EARNINGS */}
//             <TableRow>
//               <TableCell colSpan={2} sx={{ ...bold, textAlign: "center" }}>
//                 <strong>Total</strong>
//               </TableCell>
//               <TableCell sx={cell}></TableCell>

//               <TableCell sx={{ ...cell, textAlign: "center" }}>
//                 <strong>{formatCurrency(Math.round(totalEarned))}</strong>
//               </TableCell>
//             </TableRow>

//             {/* NET PAYABLE */}
//             <TableRow>
//               <TableCell colSpan={2} sx={{ ...bold, textAlign: "center" }}>
//                 <strong>Net Payable (Rs)</strong>
//               </TableCell>
//               <TableCell sx={cell}></TableCell>

//               <TableCell sx={{ ...cell, textAlign: "center" }}>
//                 <strong>{formatCurrency(Math.round(netPay))}</strong>
//               </TableCell>
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
import signImg from "../../../../../assets/images/smartmatrix/Smartmatrix_sign.png";

/* ================= STYLES ================= */

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

const FullandFinalPF = ({ company = {}, data = {} }) => {
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
  const ratio = totalDays ? paidDays / totalDays : 0;
  const grossSalary = Number(data.totalSalary || 0);

  const ffDate = data.date || "";
  const joiningDate = data.doj || "";
  const resignationDate = data.dateofresignation || "";
  const leavingDate = data.dateofleaving || "";

  /* ================= SALARY BREAKUP ================= */

  const basic = grossSalary * 0.48;
  const hra = grossSalary * 0.18;
  const da = grossSalary * 0.12;
  const special = grossSalary * 0.16;
  const food = grossSalary * 0.06;

  const pfAllowance = 3750;

  const earned = (val) => val * ratio;

  const totalActual = basic + hra + da + special + food;

  const totalEarned =
    earned(basic) + earned(hra) + earned(da) + earned(special) + earned(food);

  /* ================= DEDUCTIONS ================= */

  const pf = 3750;
  const pt = 200;
  const others = 2000;

  const totalDeductions = pf + pt + others;

  const leaveEncashment = Number(data.leaveEncashment || 0);

  const netPayable = totalEarned - totalDeductions;

  /* ================= EARNINGS ROWS ================= */

  const earningsRows = [
    ["BASIC", basic],
    ["HRA", hra],
    ["DEARNESS ALLOWANCE", da],
    ["SPECIAL ALLOWANCE", special],
    ["FOOD ALLOWANCE", food],
    ["PF ALLOWANCE", pfAllowance],
  ];

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
              <TableCell sx={{ ...cell, background: "#efe2b8" }}>
                {data.employeeName}
              </TableCell>
              <TableCell sx={bold}>F&F Date</TableCell>
              <TableCell sx={{ ...cell, background: "#efe2b8" }}>
                {ffDate}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={bold}>Employee ID</TableCell>
              <TableCell sx={{ ...cell, background: "#efe2b8" }}>
                {data.employeeId}
              </TableCell>
              <TableCell sx={bold}>Joining Date</TableCell>
              <TableCell sx={{ ...cell, background: "#efe2b8" }}>
                {joiningDate}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={bold}>Designation</TableCell>
              <TableCell sx={{ ...cell, background: "#efe2b8" }}>
                {data.designation}
              </TableCell>
              <TableCell sx={bold}>Date of Resignation</TableCell>
              <TableCell sx={{ ...cell, background: "#efe2b8" }}>
                {resignationDate}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={bold}>Department</TableCell>
              <TableCell sx={{ ...cell, background: "#efe2b8" }}>
                {data.department}
              </TableCell>
              <TableCell sx={bold}>Date of Leaving</TableCell>
              <TableCell sx={{ ...cell, background: "#efe2b8" }}>
                {leavingDate}
              </TableCell>
            </TableRow>

            {/* SALARY HEADER */}
            <TableRow>
              <TableCell colSpan={2} sx={centerBold}>
                Salary Particulars
              </TableCell>

              <TableCell sx={centerBold}>For the month</TableCell>

              <TableCell sx={{ ...centerBold, background: "#efe2b8" }}>
                {monthName}
              </TableCell>
            </TableRow>

            {/* DAYS */}
            <TableRow>
              <TableCell sx={centerBold}>Total Days in the month</TableCell>
              <TableCell sx={{ ...centerBold, background: "#efe2b8" }}>
                {totalDays}
              </TableCell>
              <TableCell sx={centerBold}>Paid Days</TableCell>
              <TableCell sx={{ ...centerBold, background: "#efe2b8" }}>
                {paidDays}
              </TableCell>
            </TableRow>

            {/* EARNINGS HEADER */}
            <TableRow>
              <TableCell colSpan={2} sx={bold}>
                Earnings
              </TableCell>

              <TableCell sx={centerBold}>Actual</TableCell>

              <TableCell sx={centerBold}>Earned</TableCell>
            </TableRow>

            {earningsRows.map(([label, value]) => (
              <TableRow key={label}>
                <TableCell colSpan={2} sx={cell}>
                  {label}
                </TableCell>

                <TableCell sx={{ ...cell, textAlign: "center" }}>
                  {formatCurrency(value)}
                </TableCell>

                <TableCell sx={{ ...cell, textAlign: "center" }}>
                  {label === "PF ALLOWANCE"
                    ? formatCurrency(pfAllowance)
                    : formatCurrency(Math.round(earned(value)))}
                </TableCell>
              </TableRow>
            ))}

            {/* TOTAL */}
            <TableRow>
              <TableCell colSpan={2} sx={bold}>
                Total
              </TableCell>

              <TableCell sx={{ ...cell, textAlign: "center" }}>
                {formatCurrency(totalActual)}
              </TableCell>

              <TableCell sx={{ ...cell, textAlign: "center" }}>
                {formatCurrency(Math.round(totalEarned))}
              </TableCell>
            </TableRow>

            {/* DEDUCTIONS */}
            <TableRow>
              <TableCell colSpan={4} sx={centerBold}>
                Less Deductions(-)
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={{ ...cell, textAlign: "center" }}>
                Provident Fund
              </TableCell>
              <TableCell sx={cell}></TableCell>
              <TableCell sx={{ ...cell, textAlign: "center" }}>
                {formatCurrency(pf)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={{ ...cell, textAlign: "center" }}>
                Professional Tax
              </TableCell>
              <TableCell sx={cell}></TableCell>
              <TableCell sx={{ ...cell, textAlign: "center" }}>
                {formatCurrency(pt)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={{ ...cell, textAlign: "center" }}>
                Others
              </TableCell>
              <TableCell sx={cell}></TableCell>
              <TableCell sx={{ ...cell, textAlign: "center" }}>
                {formatCurrency(others)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={centerBold}>
                Total Deductions
              </TableCell>
              <TableCell sx={cell}></TableCell>
              <TableCell sx={{ ...cell, textAlign: "center" }}>
                {formatCurrency(totalDeductions)}
              </TableCell>
            </TableRow>

            {/* OTHER EARNINGS */}
            <TableRow>
              <TableCell colSpan={4} sx={centerBold}>
                Other Earnings
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={{ ...cell, textAlign: "center" }}>
                Leave Encashment
              </TableCell>
              <TableCell sx={cell}></TableCell>
              <TableCell sx={{ ...cell, textAlign: "center" }}>
                {formatCurrency(leaveEncashment)}
              </TableCell>
            </TableRow>

            {/* TOTAL */}
            <TableRow>
              <TableCell colSpan={2} sx={centerBold}>
                Total
              </TableCell>
              <TableCell sx={cell}></TableCell>
              <TableCell sx={{ ...cell, textAlign: "center" }}>
                {formatCurrency(Math.round(totalEarned))}
              </TableCell>
            </TableRow>

            {/* NET PAYABLE */}
            <TableRow>
              <TableCell colSpan={2} sx={centerBold}>
                Net Payable (Rs)
              </TableCell>
              <TableCell sx={cell}></TableCell>
              <TableCell sx={{ ...cell, textAlign: "center" }}>
                {formatCurrency(Math.round(netPayable))}
              </TableCell>
            </TableRow>

            {/* WORDS */}
            <TableRow>
              <TableCell sx={bold}>Amount in Words</TableCell>
              <TableCell colSpan={3} sx={{ ...cell, textAlign: "center" }}>
                {numberToWords(Math.round(netPayable))}
              </TableCell>
            </TableRow>

            {/* SIGNATURE */}
            <TableRow>
              <TableCell sx={{ ...cell, height: "40px" }}></TableCell>

              <TableCell sx={{ ...cell, textAlign: "center" }}>
                <img
                  src={stampImg}
                  width={90}
                  alt="Stamp"
                  style={{ display: "block", margin: "0 auto" }}
                />
              </TableCell>

              <TableCell colSpan={2} sx={{ ...cell, textAlign: "center" }}>
                <img
                  src={signImg}
                  width={120}
                  alt="Signature"
                  style={{ display: "block", margin: "0 auto" }}
                />
              </TableCell>
            </TableRow>

            {/* SIGN TITLES */}
            <TableRow>
              <TableCell align="center" sx={bold}>
                Prepared By
              </TableCell>

              <TableCell align="center" sx={bold}>
                Verified By
              </TableCell>

              <TableCell colSpan={2} align="center" sx={bold}>
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
