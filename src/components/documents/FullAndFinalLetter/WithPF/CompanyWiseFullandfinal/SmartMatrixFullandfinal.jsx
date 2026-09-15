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
  formatAmt as formatCurrency,
  numberToWords,
} from "../../../../../utils/salaryFormatters";
import { calculateSalaryBreakdown } from "../../../../../utils/salaryCalculator";

import stampImg from "../../../../../assets/images/smartmatrix/Smartmatrix_stamp.png";
import signImg from "../../../../../assets/images/smartmatrix/Smartmatrix_sign.png";

/* ================= STYLES ================= */

const FONT = "Cambria, 'Times New Roman', serif";

const TABLE_CONTAINER_STYLE = {
  border: "1px solid #000",
  borderRadius: 0,
  boxShadow: "none",
  // mt: "5mm",
};

const TABLE_STYLE = {
  width: "100%",
  tableLayout: "fixed",
  borderCollapse: "collapse",
};

const CELL_BASE = {
  border: "1px solid #000",
  fontFamily: FONT,
  fontSize: "9.5pt",
  padding: "0px 0px 8px 12px",
  verticalAlign: "middle",
};

const CELL_LABEL = {
  ...CELL_BASE,
  fontWeight: 600,
};

const CELL_VALUE = {
  ...CELL_BASE,
};

const CELL_CENTER = {
  ...CELL_BASE,
  textAlign: "center",
};

const CELL_CENTER_BOLD = {
  ...CELL_CENTER,
  fontWeight: 600,
};

const CELL_HIGHLIGHT = {
  ...CELL_BASE,
  backgroundColor: "#efe2b8",
};

const CELL_HIGHLIGHT_CENTER = {
  ...CELL_HIGHLIGHT,
  textAlign: "center",
};

const TITLE_CELL = {
  ...CELL_CENTER_BOLD,
  fontSize: "12pt",
};

const COMPANY_CELL = {
  ...CELL_CENTER_BOLD,
  fontSize: "12pt",
};

const ADDRESS_CELL = {
  ...CELL_CENTER_BOLD,
  fontSize: "13px",
};

const SIGNATURE_CELL = {
  ...CELL_CENTER,
  height: "40px",
};

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
  const leaveEncashment = Number(data.leaveencashment || 0);

  const ffDate = data.date || "";
  const joiningDate = data.joiningDate || "";
  const resignationDate = data.dateofresignation || "";
  const leavingDate = data.dateofleaving || "";

  const { actual, earned, deductions, netPay } = calculateSalaryBreakdown(
    { salary: grossSalary * 12, workdays: totalDays, paiddays: paidDays },
    { pt: monthNum === "02" ? 300 : 200 }
  );
  /* ================= EARNINGS ROWS ================= */

  const earningsRows = [
    ["BASIC", actual.basic, earned.basic],
    ["HRA", actual.hra, earned.hra],
    ["DEARNESS ALLOWANCE", actual.da, earned.da],
    ["SPECIAL ALLOWANCE", actual.special, earned.special],
    ["FOOD ALLOWANCE", actual.food, earned.food],
    ["PF ALLOWANCE", actual.pfAllowance, earned.pfAllowance],
  ];

  return (
    <A4Page headerSrc={company.header} footerSrc={company.footer}>
      <TableContainer
        component={Paper}
        sx={TABLE_CONTAINER_STYLE}
      >
        <Table
          size="small"
          sx={TABLE_STYLE}
        >
          {" "}
          <TableBody>
            {/* TITLE */}
            <TableRow>
              <TableCell colSpan={4} sx={TITLE_CELL}>
                <strong>Full & Final Settlement Statement</strong>
              </TableCell>
            </TableRow>

            {/* COMPANY */}
            <TableRow>
              <TableCell colSpan={4} sx={COMPANY_CELL}>
                <strong>{company.name}</strong>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} sx={ADDRESS_CELL}>
                <strong>{company.address}</strong>
              </TableCell>
            </TableRow>

            {/* EMPLOYEE DETAILS */}
            <TableRow>
              <TableCell sx={CELL_LABEL}>Employee Name</TableCell>
              <TableCell sx={CELL_HIGHLIGHT}>
                {data.employeeName}
              </TableCell>
              <TableCell sx={CELL_LABEL}>F&F Date</TableCell>
              <TableCell sx={CELL_HIGHLIGHT}>
                {ffDate}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={CELL_LABEL}>Employee ID</TableCell>
              <TableCell sx={CELL_HIGHLIGHT}>
                {data.employeeId}
              </TableCell>
              <TableCell sx={CELL_LABEL}>Joining Date</TableCell>
              <TableCell sx={CELL_HIGHLIGHT}>
                {joiningDate}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={CELL_LABEL}>Designation</TableCell>
              <TableCell sx={CELL_HIGHLIGHT}>
                {data.currentDesignation}
              </TableCell>
              <TableCell sx={CELL_LABEL}>Date of Resignation</TableCell>
              <TableCell sx={CELL_HIGHLIGHT}>
                {resignationDate}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={CELL_LABEL}>Department</TableCell>
              <TableCell sx={CELL_HIGHLIGHT}>
                {data.department}
              </TableCell>
              <TableCell sx={CELL_LABEL}>Date of Leaving</TableCell>
              <TableCell sx={CELL_HIGHLIGHT}>
                {leavingDate}
              </TableCell>
            </TableRow>

            {/* SALARY HEADER */}
            <TableRow>
              <TableCell colSpan={2} sx={CELL_CENTER_BOLD}>
                Salary Particulars
              </TableCell>

              <TableCell sx={CELL_CENTER_BOLD}>For the month</TableCell>

              <TableCell sx={CELL_HIGHLIGHT_CENTER}>
                {monthName}
              </TableCell>
            </TableRow>

            {/* DAYS */}
            <TableRow>
              <TableCell sx={CELL_CENTER_BOLD}>Total Days in the month</TableCell>
              <TableCell sx={CELL_HIGHLIGHT_CENTER}>
                {totalDays}
              </TableCell>
              <TableCell sx={CELL_CENTER_BOLD}>Paid Days</TableCell>
              <TableCell sx={CELL_HIGHLIGHT_CENTER}>
                {paidDays}
              </TableCell>
            </TableRow>

            {/* EARNINGS HEADER */}
            <TableRow>
              <TableCell colSpan={2} sx={CELL_LABEL}>
                Earnings
              </TableCell>

              <TableCell sx={CELL_CENTER_BOLD}>Actual</TableCell>

              <TableCell sx={CELL_CENTER_BOLD}>Earned</TableCell>
            </TableRow>

            {earningsRows.map(([label, actVal, earnVal]) => (
              <TableRow key={label}>
                <TableCell colSpan={2} sx={CELL_VALUE}>
                  {label}
                </TableCell>

                <TableCell sx={CELL_CENTER}>
                  {formatCurrency(actVal)}
                </TableCell>

                <TableCell sx={CELL_CENTER}>
                  {formatCurrency(earnVal)}
                </TableCell>
              </TableRow>
            ))}

            {/* TOTAL */}
            <TableRow>
              <TableCell colSpan={2} sx={CELL_LABEL}>
                Total
              </TableCell>

              <TableCell sx={CELL_CENTER}>
                {formatCurrency(actual.total)}
              </TableCell>

              <TableCell sx={CELL_CENTER}>
                {formatCurrency(Math.round(earned.total))}
              </TableCell>
            </TableRow>

            {/* DEDUCTIONS */}
            <TableRow>
              <TableCell colSpan={4} sx={CELL_CENTER_BOLD}>
                Less Deductions(-)
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={CELL_CENTER}>
                Provident Fund
              </TableCell>
              <TableCell sx={CELL_VALUE}></TableCell>
              <TableCell sx={CELL_CENTER}>
                {formatCurrency(deductions.pf)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={CELL_CENTER}>
                Professional Tax
              </TableCell>
              <TableCell sx={CELL_VALUE}></TableCell>
              <TableCell sx={CELL_CENTER}>
                {formatCurrency(deductions.pt)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={CELL_CENTER}>
                Others
              </TableCell>
              <TableCell sx={CELL_VALUE}></TableCell>
              <TableCell sx={CELL_CENTER}>
                {formatCurrency(deductions.others)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={CELL_CENTER_BOLD}>
                Total Deductions
              </TableCell>
              <TableCell sx={CELL_VALUE}></TableCell>
              <TableCell sx={CELL_CENTER}>
                {formatCurrency(deductions.total)}
              </TableCell>
            </TableRow>

            {/* OTHER EARNINGS */}
            <TableRow>
              <TableCell colSpan={4} sx={CELL_CENTER_BOLD}>
                Other Earnings
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={CELL_CENTER}>
                Leave Encashment
              </TableCell>
              <TableCell sx={CELL_VALUE}></TableCell>
              <TableCell sx={CELL_CENTER}>
                {formatCurrency(leaveEncashment)}
              </TableCell>
            </TableRow>

            {/* TOTAL */}
            <TableRow>
              <TableCell colSpan={2} sx={CELL_CENTER_BOLD}>
                Total
              </TableCell>
              <TableCell sx={CELL_VALUE}></TableCell>
              <TableCell sx={CELL_CENTER}>
                {formatCurrency(Math.round(deductions.total))}
              </TableCell>
            </TableRow>

            {/* NET PAYABLE */}
            <TableRow>
              <TableCell colSpan={2} sx={CELL_CENTER_BOLD}>
                Net Payable (Rs)
              </TableCell>
              <TableCell sx={CELL_VALUE}></TableCell>
              <TableCell sx={CELL_CENTER}>
                {formatCurrency(Math.round(netPay))}
              </TableCell>
            </TableRow>

            {/* WORDS */}
            <TableRow>
              <TableCell sx={CELL_LABEL}>Amount in Words</TableCell>
              <TableCell colSpan={3} sx={CELL_CENTER}>
                {numberToWords(Math.round(netPay))}
              </TableCell>
            </TableRow>

            {/* SIGNATURE */}
            <TableRow>
              <TableCell sx={SIGNATURE_CELL}></TableCell>

              <TableCell sx={CELL_CENTER}>
                <img
                  src={stampImg}
                  width={90}
                  alt="Stamp"
                  style={{ display: "block", margin: "0 auto" }}
                />
              </TableCell>

              <TableCell colSpan={2} sx={CELL_CENTER}>
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
              <TableCell align="center" sx={CELL_LABEL}>
                Prepared By
              </TableCell>

              <TableCell align="center" sx={CELL_LABEL}>
                Verified By
              </TableCell>

              <TableCell colSpan={2} align="center" sx={CELL_LABEL}>
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
