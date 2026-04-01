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
import signImg from "../../../../../assets/images/smartmatrix/Smartmatrix_sign.png";

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

  const leaveEncashment = Number(data.leaveencashment || 0);

  const totalAfterOther = totalEarned + leaveEncashment;
  const netPayable = totalAfterOther - totalDeduction;

  return (
    <div data-pdf-target="true">
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
                <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "12pt" }}>
                  <strong>Full & Final Settlement Statement</strong>
                </TableCell>
              </TableRow>

              {/* COMPANY */}
              <TableRow>
                <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "12pt" }}>
                  <strong>{company.name}</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} sx={{ ...centerBold, fontSize: "13px" }}>
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
                  {data.dateofresignation}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={bold}>
                  <strong>Department</strong>
                </TableCell>
                <TableCell sx={{ ...cell, background: "#efe2b8" }}>
                  {data.department}
                </TableCell>
                <TableCell sx={bold}>
                  <strong>Date of Leaving</strong>
                </TableCell>
                <TableCell sx={{ ...cell, background: "#efe2b8" }}>
                  {leavingDate}
                </TableCell>
              </TableRow>

              {/* SALARY HEADER */}
              <TableRow>
                <TableCell colSpan={2} sx={centerBold}>
                  Salary Particulars
                </TableCell>
                <TableCell colSpan={1} sx={centerBold}>
                  For the month
                </TableCell>
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

              {earningsRows.map((row) => (
                <TableRow key={row.label}>
                  <TableCell colSpan={2} sx={cell}>
                    {row.label}
                  </TableCell>
                  <TableCell sx={{ ...cell, textAlign: "center" }}>
                    {formatCurrency(row.actual)}
                  </TableCell>
                  <TableCell sx={{ ...cell, textAlign: "center" }}>
                    {formatCurrency(Math.round(row.earned))}
                  </TableCell>
                </TableRow>
              ))}

              {/* TOTAL */}
              <TableRow>
                <TableCell colSpan={2} sx={bold}>
                  Total
                </TableCell>
                <TableCell sx={{ ...cell, textAlign: "center" }}>
                  <strong>{formatCurrency(Math.round(totalActual))}</strong>
                </TableCell>
                <TableCell sx={{ ...cell, textAlign: "center" }}>
                  <strong> {formatCurrency(Math.round(totalEarned))}</strong>
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
                  {formatCurrency(otherDeduction)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2} sx={centerBold}>
                  Total Deductions
                </TableCell>
                <TableCell sx={cell}></TableCell>

                <TableCell sx={{ ...cell, textAlign: "center" }}>
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
                <TableCell colSpan={2} sx={{ ...cell, textAlign: "center" }}>
                  Leave Encashment
                </TableCell>
                <TableCell sx={cell}></TableCell>

                <TableCell sx={{ ...cell, textAlign: "center" }}>
                  {formatCurrency(leaveEncashment)}
                </TableCell>
              </TableRow>

              {/* TOTAL AFTER OTHER EARNINGS */}
              <TableRow>
                <TableCell colSpan={2} sx={centerBold}>
                  <strong>Total</strong>
                </TableCell>
                <TableCell sx={cell}></TableCell>

                <TableCell sx={{ ...cell, textAlign: "center" }}>
                  <strong>{formatCurrency(totalEarned)}</strong>
                </TableCell>
              </TableRow>

              {/* NET PAYABLE */}
              <TableRow>
                <TableCell colSpan={2} sx={centerBold}>
                  <strong>Net Payable (Rs)</strong>
                </TableCell>
                <TableCell sx={cell}></TableCell>

                <TableCell sx={{ ...cell, textAlign: "center" }}>
                  <strong>{formatCurrency(Math.round(netPayable))}</strong>
                </TableCell>
              </TableRow>

              {/* AMOUNT IN WORDS */}
              <TableRow>
                <TableCell sx={bold}>
                  <strong>Amount in Words</strong>
                </TableCell>
                <TableCell colSpan={3} sx={{ ...cell, textAlign: "center" }}>
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
              {/* ===== SIGNATURE TITLES ROW ===== */}
              <TableRow>
                <TableCell align="center" sx={bold}>
                  <strong>Prepared By</strong>
                </TableCell>

                <TableCell align="center" sx={bold}>
                  <strong>Verified By</strong>
                </TableCell>

                <TableCell colSpan={2} align="center" sx={bold}>
                  <strong>Approved By</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </A4Page>
    </div>
  );
};

export default Fullandfinal;
