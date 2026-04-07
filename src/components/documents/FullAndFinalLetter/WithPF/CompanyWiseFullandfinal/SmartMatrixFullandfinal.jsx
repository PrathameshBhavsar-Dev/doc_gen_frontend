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
  const pt = monthNum === "02" ? 300 : 200;
  const others = 2000;

  const totalDeductions = pf + pt + others;

  const leaveEncashment = Number(data.leaveencashment || 0);

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
        <Table
          size="small"
          sx={{
            width: "100%",
            tableLayout: "fixed",
            borderCollapse: "collapse",
          }}
        >
          {" "}
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
