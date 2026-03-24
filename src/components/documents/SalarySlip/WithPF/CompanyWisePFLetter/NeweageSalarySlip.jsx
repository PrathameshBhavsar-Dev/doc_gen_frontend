import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import {
  formatCurrency,
  numberToWords,
  getProfessionalTax,
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

  /* ================= CUBEAGE SALARY LOGIC ================= */
  const getTotalDaysInMonth = (monthStr) => {
    if (!monthStr) return 31;
    const [year, monthNum] = monthStr.split("-");
    return new Date(year, monthNum, 0).getDate();
  };

  const totalDays = getTotalDaysInMonth(month);
  const presentDays = workdays || totalDays;

  const round0 = (n) => Math.round(Number(n) || 0);
  const monthlyCTC = parseFloat(totalSalary || 0);

  const earnedCTC = (monthlyCTC * presentDays) / totalDays;

  const hra = round0(earnedCTC * 0.18);
  const da = round0(earnedCTC * 0.12);
  const lta = round0(earnedCTC * 0.16);
  const allow = round0(earnedCTC * 0.06);
  const pfAllowance = 3750;

  const basic = round0(earnedCTC) - (hra + da + lta + allow + pfAllowance);

  const grandTotalA = basic + hra + da + lta + allow + pfAllowance;

  /* ================= DEDUCTIONS ================= */
  const pfDeduction = 3750;
  const pt = getProfessionalTax(month, grandTotalA);
  const otherDeduction = 2000;

  const totalDeductions = round0(pfDeduction + pt + otherDeduction);
  const netPay = round0(grandTotalA - totalDeductions);

  const totalEarnings = grandTotalA;

  /* ================= ARRAYS ================= */

  const earnings = [
    { label: "BASIC", value: basic },
    { label: "H.R.A.", value: hra },
    { label: "D.A.", value: da },
    { label: "L.T.A.", value: lta },
    { label: "ALLOWANCE (Shift+Skill)", value: allow },
    { label: "PF ALLOWANCE", value: pfAllowance },
  ];

  const deductions = [
    { label: "P.F.", value: pfDeduction },
    { label: "P.T.", value: pt },
    { label: "Other Deductions", value: otherDeduction },
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
            <TableCell sx={{ ...CELL, width: "80%" }}>
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
            <TableCell sx={CENTER_CELL}>
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
          {/* SIGNATURE & STAMP */}
          <TableRow>
            <TableCell
              sx={{ border: "1px solid #000", paddingLeft: "150px" }}
            ></TableCell>
            <TableCell
              sx={{ border: "1px solid #000", paddingLeft: "150px" }}
            ></TableCell>

            <TableCell
              sx={{
                border: "1px solid #000",
                verticalAlign: "top",
                padding: "10px",
                width: "50%",
              }}
            >
              {/* {company.signature && (
                <img
                  src={company.signature}
                  alt="Signature"
                  style={{ height: "60px", marginBottom: "6px" }}
                />
              )} */}

              {company.stamp && (
                <img
                  src={company.stamp}
                  alt="Stamp"
                  style={{ height: "100px" }}
                />
              )}
            </TableCell>

            <TableCell
              sx={{
                border: "1px solid #000",
                verticalAlign: "top",
                padding: "10px",
                width: "50%",
                textAlign: "center",
              }}
            >
              {company.signature && (
                <img
                  src={company.signature}
                  alt="Signature"
                  style={{ height: "60px", marginBottom: "6px" }}
                />
              )}
              <strong>Signature</strong>
              {/* {company.stamp && (
                <img
                  src={company.stamp}
                  alt="Stamp"
                  style={{ height: "100px" }}
                />
              )} */}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </A4Layout>
  );
};

export default NeweageSalarySlip;
