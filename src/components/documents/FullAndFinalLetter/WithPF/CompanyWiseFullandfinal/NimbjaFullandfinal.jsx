import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import watermark from "../../../../../assets/images/Nimbja/nimbja_watermark.png";
import { calculateSalaryBreakdown } from "../../../../../utils/salaryCalculator";
import { formatDate, formatMonth, formatAmt, numberToWords } from "../../../../../utils/salaryFormatters";

/* ================== COMMON STYLES ================== */
const cell = {
  border: "1px solid #000",
  fontSize: "12px", // slightly reduce size
  padding: "0px 12px 12px 12px",
  wordBreak: "break-word", // prevents overflow
  lineHeight: 0.99,
};

const bold = { fontWeight: 700 };
const center = { textAlign: "center" };
const right = { textAlign: "right" };

/* ================== COMPONENT ================== */
const NimbjaFullAndfinal = ({ company = {}, data = {} }) => {

  const { totalDays, paidDays, actual, earned, deductions, netPay } =
    calculateSalaryBreakdown(data);

  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        fontFamily: "Bahnschrift, sans-serif",

        "& *": {
          fontFamily: "Bahnschrift, sans-serif",
        },
      }}
    >
      {" "}
      {company.header && <img src={company.header} width="100%" alt="" />}
      <Box
        component="img"
        src={watermark}
        alt="watermark"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          opacity: 0.4,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* CONTENT */}
      <Box
        className="a4-content-only"
        sx={{
          position: "relative",
          zIndex: 1,
          padding: "10mm", // gives proper margin inside A4
        }}
      >
        <Table
          sx={{
            borderCollapse: "collapse",
            width: "95%", // control width (important)
            margin: "0 auto", // center horizontally
            tableLayout: "fixed", // prevent overflow
          }}
        >
          {" "}
          <TableBody>
            {/* TITLE */}
            <TableRow>
              <TableCell
                colSpan={4}
                sx={{ ...cell, ...bold, ...center, background: "" }}
              >
                Full & Final Settlement Statement
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                colSpan={4}
                sx={{ ...cell, ...bold, ...center, background: "" }}
              >
                {company.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} sx={{ ...cell, ...center }}>
                {company.address}
              </TableCell>
            </TableRow>

            {/* EMP DETAILS */}
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
              <TableCell sx={cell}>{formatDate(data.joiningDate)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Designation</TableCell>
              <TableCell sx={cell}>{data.currentDesignation}</TableCell>
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

            {/* SALARY PARTICULARS */}
            <TableRow sx={{ background: "#c1edac" }}>
              <TableCell colSpan={2} sx={{ ...cell, ...bold }}>
                Salary particulars
              </TableCell>
              <TableCell sx={{ ...cell, ...bold, ...center }}>
                For the month
              </TableCell>
              <TableCell sx={{ ...cell, ...center }}>
                {formatMonth(data.month)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Total Day in the month</TableCell>
              <TableCell sx={{ ...cell, ...center }}>{totalDays}</TableCell>
              <TableCell sx={cell}>Paid days</TableCell>
              <TableCell sx={{ ...cell, ...center }}>{paidDays}</TableCell>
            </TableRow>

            {/* Earnings Section */}
            <TableRow sx={{ background: "#c1edac" }}>
              <TableCell colSpan={2} sx={{ ...cell, ...bold }}>
                Earnings
              </TableCell>
              <TableCell sx={{ ...cell, ...bold, ...center }}>Actual</TableCell>
              <TableCell sx={{ ...cell, ...bold, ...center }}>Earned</TableCell>
            </TableRow>

            {[
              ["Basic", actual.basic, earned.basic],
              ["Bouqet Of Benefits", actual.hra, earned.hra],
              ["HRA", actual.da, earned.da],
              ["City Allowance", actual.special, earned.special],
              ["Superannuation Fund", actual.food, earned.food],
              ["PF Allowance", actual.pfAllowance, earned.pfAllowance],
            ].map(([label, actual, earnedValue]) => (
              <TableRow key={label}>
                <TableCell colSpan={2} sx={cell}>
                  {label}
                </TableCell>

                <TableCell sx={{ ...cell, ...right }}>
                  {formatAmt(actual)}
                </TableCell>

                <TableCell sx={{ ...cell, ...right }}>
                  {formatAmt(earnedValue)}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={2} sx={{ ...cell, ...bold }}>
                Total
              </TableCell>
              <TableCell sx={{ ...cell, ...bold, ...right }}>
                {formatAmt(actual.total)}
              </TableCell>
              <TableCell sx={{ ...cell, ...bold, ...right }}>
                {formatAmt(earned.total)}
              </TableCell>
            </TableRow>

            {/* Deductions */}
            <TableRow>
              <TableCell colSpan={4} sx={{ ...cell, ...bold, ...center }}>
                Less Deductions (-)
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={cell}>
                Provident Fund
              </TableCell>
              <TableCell sx={{ ...cell, ...right }}>{formatAmt(deductions.pf)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={cell}>
                Professional Tax
              </TableCell>
              <TableCell sx={{ ...cell, ...right }}>{formatAmt(deductions.pt)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={cell}>
                Others
              </TableCell>
              <TableCell sx={{ ...cell, ...right }}>
                {formatAmt(deductions.others)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} sx={{ ...cell, ...bold }}>
                Total Deductions
              </TableCell>
              <TableCell sx={{ ...cell, ...bold, ...right }}>
                {formatAmt(deductions.total)}
              </TableCell>
            </TableRow>

            {/* OTHER EARNINGS */}
            <TableRow>
              <TableCell colSpan={4} sx={{ ...cell, ...bold, ...center }}>
                Other Earnings
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={cell}>
                Leave encashment{" "}
              </TableCell>
              <TableCell colSpan={2} sx={{ ...cell, ...right }}>
                00
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} sx={cell}>
                Total{" "}
              </TableCell>
              <TableCell colSpan={2} sx={{ ...cell, ...right }}>
                {formatAmt(earned.total)}
              </TableCell>
            </TableRow>

            {/* Net Pay */}
            <TableRow>
              <TableCell colSpan={3} sx={{ ...cell, ...bold }}>
                Net Payable (Rs)
              </TableCell>
              <TableCell sx={{ ...cell, ...bold, ...right }}>
                {formatAmt(netPay)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={cell}>Amount in Words</TableCell>
              <TableCell colSpan={3} sx={cell}>
                {numberToWords(netPay)}
              </TableCell>
            </TableRow>

            {/* SIGNATURE */}
            <TableRow>
              <TableCell sx={{ ...cell, ...center }}></TableCell>
              <TableCell
                sx={{ ...cell, textAlign: "center", verticalAlign: "middle" }}
              >
                {company.stamp && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={company.stamp} width={100} alt="" />
                  </Box>
                )}
              </TableCell>
              <TableCell
                colSpan={2}
                sx={{ ...cell, textAlign: "center", verticalAlign: "middle" }}
              >
                {company.signature && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={company.signature} width={220} alt="" />
                  </Box>
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ ...cell, ...center }}>Prepared By</TableCell>
              <TableCell sx={{ ...cell, ...center }}>Verified By</TableCell>
              <TableCell colSpan={2} sx={{ ...cell, ...center }}>
                Approved By
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      {company.footer && <img src={company.footer} width="100%" alt="" />}
    </Box>
  );
};

export default NimbjaFullAndfinal;
