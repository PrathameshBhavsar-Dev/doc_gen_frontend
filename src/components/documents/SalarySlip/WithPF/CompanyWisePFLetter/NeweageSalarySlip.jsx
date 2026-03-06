import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import {
  formatCurrency,
  numberToWords,
} from "../../../../../utils/salaryCalculations";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

/* ================= STYLES ================= */
const CELL = {
  border: "1px solid #000",
  padding: "6px",
  fontSize: "13px",
};

const CENTER_CELL = {
  ...CELL,
  textAlign: "center",
};

const NeweageSalarySlip = ({ company, data }) => {
  if (!company || !data) return null;

  const {
    month,
    employeeName,
    employeeId,
    gender,
    doj,
    department,
    pan,
    designation,
    dob,
    mode,
    accountNo,
    workdays,
    totalSalary,
  } = data;

  /* ================= SMARTMATRIX LOGIC (EXACT) ================= */

  const round2 = (v) => Math.round((Number(v) || 0) * 100) / 100;
  const monthlyGross = round2(totalSalary);

  const [year, monthNum] = (month || "2025-01").split("-");
  const monthName = new Date(year, monthNum - 1).toLocaleString("en-IN", {
    month: "long",
  });

  /* Earnings Percentages (Same as your SmartMatrix code) */
  const PERCENT = {
    basic: 0.48,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
  };

  const basic = round2(monthlyGross * PERCENT.basic);
  const hra = round2(monthlyGross * PERCENT.hra);
  const da = round2(monthlyGross * PERCENT.da);
  const special = round2(monthlyGross * PERCENT.special);

  /* FOOD = remainder (IMPORTANT) */
  const food = round2(monthlyGross - (basic + hra + da + special));

  /* ================= DEDUCTIONS ================= */

  const PF = 3750; // constant
  const pt = monthName.toLowerCase() === "february" ? 300 : 200;
  const otherDeduction = 2000;

  const totalEarnings = monthlyGross; // PF not included
  const totalDeductions = round2(PF + pt + otherDeduction);
  const netPay = round2(monthlyGross - totalDeductions);

  /* ================= ARRAYS ================= */

  const earnings = [
    { label: "BASIC", value: basic },
    { label: "HRA", value: hra },
    { label: "DEARNESS ALLOWANCE", value: da },
    { label: "SPECIAL ALLOWANCE", value: special },
    { label: "FOOD ALLOWANCE", value: food },
    { label: "PF ALLOWANCE", value: PF },
  ];

  const deductions = [
    { label: "PF", value: PF },
    { label: "PT", value: pt },
    { label: "Other Deduction", value: otherDeduction },
  ];

  const formatMonthYear = (month) =>
    month
      ? new Date(`${month}-01`).toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        })
      : "";

  /* ================= RENDER ================= */

  return (
    <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
      <Table>
        <TableBody>
          {/* HEADER */}
          <TableRow>
            <TableCell
              colSpan={4}
              sx={{
                ...CELL,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {company.name || "NEWEAGE CLOUD SOFTWARE SERVICES PVT. LTD."}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center" }}>
              <b>{company.address}</b>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center" }}>
              <b>Salary Slip {formatMonthYear(month)}</b>
            </TableCell>
          </TableRow>

          {/* EMPLOYEE DETAILS */}
          <TableRow>
            <TableCell sx={CELL}>
              <b>Employee Name</b>
            </TableCell>
            <TableCell sx={CELL}>{employeeName}</TableCell>
            <TableCell sx={CELL}>Employee ID</TableCell>
            <TableCell sx={CELL}>{employeeId}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={CELL}>
              <b>
                Gender
                <br />
                DOJ
              </b>
            </TableCell>
            <TableCell sx={CELL}>
              {gender}
              <br />
              {formatDate(doj)}
            </TableCell>
            <TableCell sx={CELL}>
              Department
              <br />
              PAN
            </TableCell>
            <TableCell sx={CELL}>
              {department}
              <br />
              {pan}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={CELL}>
              <b>Designation</b>
            </TableCell>
            <TableCell sx={CELL}>{designation}</TableCell>
            <TableCell sx={CELL}>DOB</TableCell>
            <TableCell sx={CELL}>{dob}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={CELL}>
              <b>Mode</b>
            </TableCell>
            <TableCell sx={CELL}>
              {mode}
              <br />
              {accountNo}
            </TableCell>
            <TableCell sx={CELL}>Working Days</TableCell>
            <TableCell sx={CELL}>{workdays}</TableCell>
          </TableRow>

          {/* SALARY HEADER */}
          <TableRow>
            <TableCell sx={CELL}>
              <b>Earnings</b>
            </TableCell>
            <TableCell sx={CENTER_CELL}>
              <b>Amount</b>
            </TableCell>
            <TableCell sx={CENTER_CELL}>
              <b>Deductions</b>
            </TableCell>
            <TableCell sx={CENTER_CELL}>
              <b>Amount</b>
            </TableCell>
          </TableRow>

          {/* ROWS */}
          {earnings.map((e, i) => (
            <TableRow key={i}>
              <TableCell sx={CELL}>
                <b>{e.label}</b>
              </TableCell>
              <TableCell sx={CENTER_CELL}>{formatCurrency(e.value)}</TableCell>
              <TableCell sx={CENTER_CELL}>
                {deductions[i]?.label || ""}
              </TableCell>
              <TableCell sx={CENTER_CELL}>
                {deductions[i] ? formatCurrency(deductions[i].value) : ""}
              </TableCell>
            </TableRow>
          ))}

          {/* TOTAL */}
          <TableRow>
            <TableCell sx={CELL}>
              <b>Total</b>
            </TableCell>
            <TableCell sx={CENTER_CELL}>
              {formatCurrency(totalEarnings)}
            </TableCell>
            <TableCell sx={CENTER_CELL}>
              <b>Total Deduction</b>
            </TableCell>
            <TableCell sx={CENTER_CELL}>
              {formatCurrency(totalDeductions)}
            </TableCell>
          </TableRow>

          {/* NET PAY */}
          <TableRow>
            <TableCell sx={CELL}>
              <b>Net Pay</b>
            </TableCell>
            <TableCell sx={CENTER_CELL}>{formatCurrency(netPay)}</TableCell>
            <TableCell sx={CELL}></TableCell>
            <TableCell sx={CENTER_CELL}></TableCell>
          </TableRow>

          {/* IN WORDS */}
          <TableRow>
            <TableCell sx={CELL}>
              <b>In Words</b>
            </TableCell>
            <TableCell colSpan={3} sx={CELL}>
              {numberToWords(netPay)}
            </TableCell>
          </TableRow>

          {/* SIGNATURE */}
          <TableRow>
            <TableCell colSpan={2} sx={CELL}></TableCell>
            <TableCell sx={CELL}>
              {company.signature && (
                <img
                  src={company.signature}
                  alt="Signature"
                  style={{ height: "60px" }}
                />
              )}
            </TableCell>
            <TableCell sx={{ ...CELL, textAlign: "center" }}>
              {company.stamp && (
                <img
                  src={company.stamp}
                  alt="Stamp"
                  style={{ height: "90px" }}
                />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </A4Layout>
  );
};

export default NeweageSalarySlip;
