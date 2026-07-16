import React from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { formatCurrency } from "../../utils/salaryCalculations";

const SalaryStructureTable = ({
  salaryRows = [],
  totalMonthly = 0,
  totalAnnual = 0,
  ctc = 0, // ✅ added
}) => {
  /* ================= SALARY LOGIC ================= */

  const calculateSalaryLocal = (ctc) => {
    const round0 = (n) => Math.round(n || 0);

    const annualCTC = round0(ctc);
    const monthlyCTC = round0(annualCTC / 12);

    const pf = 3750;

    const hra = round0(monthlyCTC * 0.18);
    const da = round0(monthlyCTC * 0.12);
    const special = round0(monthlyCTC * 0.16);
    const food = round0(monthlyCTC * 0.06);

    let basic = round0(monthlyCTC - (hra + da + special + food + pf));

    basic = round0(monthlyCTC - (hra + da + special + food + pf));

    const totalMonthly = round0(basic + hra + da + special + food + pf);

    return {
      monthly: {
        basic,
        hra,
        da,
        special,
        food,
        pf,
        total: totalMonthly,
      },
      annual: {
        basic: basic * 12,
        hra: hra * 12,
        da: da * 12,
        special: special * 12,
        food: food * 12,
        pf: pf * 12,
        total: totalMonthly * 12,
      },
    };
  };

  // ✅ use salary logic if ctc provided
  const salaryData = ctc ? calculateSalaryLocal(ctc) : null;

  // ✅ decide rows
  const rows =
    salaryRows.length > 0
      ? salaryRows
      : salaryData
        ? [
          ["Basic", salaryData.monthly.basic, salaryData.annual.basic],
          [
            "Bouqet Of Benefits",
            salaryData.monthly.hra,
            salaryData.annual.hra,
          ],
          ["HRA", salaryData.monthly.da, salaryData.annual.da],
          [
            "City Allowance",
            salaryData.monthly.special,
            salaryData.annual.special,
          ],
          ["Superannuation Fund", salaryData.monthly.food, salaryData.annual.food],
          [
            "Provident Fund (PF)",
            salaryData.monthly.pf,
            salaryData.annual.pf,
          ],
        ]
        : [];

  // ✅ totals
  const finalMonthly =
    salaryRows.length > 0 ? totalMonthly : salaryData?.monthly.total || 0;

  const finalAnnual =
    salaryRows.length > 0 ? totalAnnual : salaryData?.annual.total || 0;

  /* ================= TABLE STYLES ================= */

  const TABLE_STYLE = {
    width: "100%",
    border: "1px solid #000",
    borderCollapse: "collapse",
    fontFamily: "Bahnschrift",
  };

  const HEADER_ROW = {
    backgroundColor: "#a0ed64",
  };

  const CELL_BASE = {
    border: "1px solid #000",
    fontSize: "9.75pt",
<<<<<<< HEAD
    padding: "0px 12px 12px 12px",
=======
  padding: "0px 12px 12px 12px",
>>>>>>> 7080851ddb4ac3c1b6b7617e6714604f36d34e7d
    verticalAlign: "top",
    lineHeight: 0.8,
    fontFamily: "Bahnschrift",
  };

  const CELL_HEAD = {
    ...CELL_BASE,
    fontWeight: 700,
    fontSize: "10pt",
  };

  const TOTAL_ROW = {
    backgroundColor: "#a0ed64",
  };

  const TOTAL_CELL = {
    ...CELL_HEAD,
  };

  return (
    <>
      <Typography
        align="center"
        fontWeight={700}
        mb={3}
        sx={{ fontFamily: "Bahnschrift" }}
      >
        Annexure A Salary Structure
      </Typography>

      <Table sx={TABLE_STYLE}>
        <TableHead>
          <TableRow sx={HEADER_ROW}>
            <TableCell sx={CELL_HEAD}>
              Salary Components
            </TableCell>

            <TableCell align="right" sx={CELL_HEAD}>
              Per month (Rs.)
            </TableCell>

            <TableCell align="right" sx={CELL_HEAD}>
              Per Annum (Rs.)
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map(([name, monthly, annual], i) => (
            <TableRow key={i}>
              <TableCell sx={CELL_BASE}>
                {name}
              </TableCell>

              <TableCell align="right" sx={CELL_BASE}>
                {formatCurrency(monthly)}
              </TableCell>

              <TableCell align="right" sx={CELL_BASE}>
                {formatCurrency(annual)}
              </TableCell>
            </TableRow>
          ))}

          <TableRow sx={TOTAL_ROW}>
            <TableCell sx={TOTAL_CELL}>
              Total Monthly Gross Salary
            </TableCell>

            <TableCell align="right" sx={TOTAL_CELL}>
              {formatCurrency(finalMonthly)}
            </TableCell>

            <TableCell align="right" sx={TOTAL_CELL}>
              {formatCurrency(finalAnnual)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default SalaryStructureTable;
