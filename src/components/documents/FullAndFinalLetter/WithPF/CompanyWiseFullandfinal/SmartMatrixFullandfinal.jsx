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
                {data.designation}
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

            {earningsRows.map(([label, value]) => (
              <TableRow key={label}>
                <TableCell colSpan={2} sx={CELL_VALUE}>
                  {label}
                </TableCell>

                <TableCell sx={CELL_CENTER}>
                  {formatCurrency(value)}
                </TableCell>

                <TableCell sx={CELL_CENTER}>
                  {label === "PF ALLOWANCE"
                    ? formatCurrency(pfAllowance)
                    : formatCurrency(Math.round(earned(value)))}
                </TableCell>
              </TableRow>
            ))}

            {/* TOTAL */}
            <TableRow>
              <TableCell colSpan={2} sx={CELL_LABEL}>
                Total
              </TableCell>

              <TableCell sx={CELL_CENTER}>
                {formatCurrency(totalActual)}
              </TableCell>

              <TableCell sx={CELL_CENTER}>
                {formatCurrency(Math.round(totalEarned))}
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
                {formatCurrency(pf)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={CELL_CENTER}>
                Professional Tax
              </TableCell>
              <TableCell sx={CELL_VALUE}></TableCell>
              <TableCell sx={CELL_CENTER}>
                {formatCurrency(pt)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={CELL_CENTER}>
                Others
              </TableCell>
              <TableCell sx={CELL_VALUE}></TableCell>
              <TableCell sx={CELL_CENTER}>
                {formatCurrency(others)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={CELL_CENTER_BOLD}>
                Total Deductions
              </TableCell>
              <TableCell sx={CELL_VALUE}></TableCell>
              <TableCell sx={CELL_CENTER}>
                {formatCurrency(totalDeductions)}
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
                {formatCurrency(Math.round(totalEarned))}
              </TableCell>
            </TableRow>

            {/* NET PAYABLE */}
            <TableRow>
              <TableCell colSpan={2} sx={CELL_CENTER_BOLD}>
                Net Payable (Rs)
              </TableCell>
              <TableCell sx={CELL_VALUE}></TableCell>
              <TableCell sx={CELL_CENTER}>
                {formatCurrency(Math.round(netPayable))}
              </TableCell>
            </TableRow>

            {/* WORDS */}
            <TableRow>
              <TableCell sx={CELL_LABEL}>Amount in Words</TableCell>
              <TableCell colSpan={3} sx={CELL_CENTER}>
                {numberToWords(Math.round(netPayable))}
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
