import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";

import {
  getProfessionalTax,
  numberToWords,
  formatCurrency,
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

/* ================= COMPONENT ================= */
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

  /* ================= SALARY CALCULATION ================= */
  const {
    basicSalary,
    hra,
    dearnessAllowance,
    foodAllowance,
    miscAllowance,
    pf,
    professionalTax,
  } = useMemo(() => {
    const gross = Number(totalSalary) || 0;

    const basic = Math.round(gross * 0.40);
    const hraCalc = Math.round(basic * 0.40);
    const da = Math.round(gross * 0.10);
    const food = Math.round(gross * 0.10);

    const pfCalc = Math.round(basic * 0.12);
    const pt = getProfessionalTax(month, gross);

    const misc = gross - (basic + hraCalc + da + food);

    return {
      basicSalary: basic,
      hra: hraCalc,
      dearnessAllowance: da,
      foodAllowance: food,
      miscAllowance: misc,
      pf: pfCalc,
      professionalTax: pt,
    };
  }, [totalSalary, month]);

  /* ================= EARNINGS & DEDUCTIONS ================= */
  const earnings = [
    { label: "BASIC", value: basicSalary },
    { label: "HRA", value: hra },
    { label: "DEARNESS ALLOWANCE", value: dearnessAllowance },
    { label: "FOOD ALLOWANCE", value: foodAllowance },
    { label: "MISC ALLOWANCE", value: miscAllowance },
  ];

  const deductions = [
    { label: "Other Deductions", value: 1500 },
    { label: "PT", value: professionalTax },
  ];

  const totalEarnings = earnings.reduce((sum, e) => sum + e.value, 0);
  const totalDeductions = deductions.reduce((sum, d) => sum + d.value, 0);

  const netPay = totalEarnings - totalDeductions; // ✅ Correct Net Pay

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
            <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontWeight: "bold", fontSize: "16px" }}>
              NEWEAGE CLOUD SOFTWARE SERVICES PVT. LTD.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center", fontSize: "13px" }}>
              <b>Office No-4B, Second Floor, Ganesham Wing-A, On BRTS Road,
              Pimple Saudagar, Pune - 411027</b>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={4} sx={{ ...CELL, textAlign: "center" }}>
             <b>Salary Slip {formatMonthYear(month)}</b>
            </TableCell>
          </TableRow>

          {/* EMPLOYEE DETAILS */}
          <TableRow>
            <TableCell sx={CELL}><b>Employee Name</b></TableCell>
            <TableCell sx={CELL}>{employeeName}</TableCell>
            <TableCell sx={CELL}>Employee ID</TableCell>
            <TableCell sx={CELL}>{employeeId}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={CELL}><b>Gender<br/>DOJ</b></TableCell>
            <TableCell sx={CELL}>{gender}<br/> {formatDate(doj)}</TableCell>
            <TableCell sx={CELL}>Department<br/>PAN Number</TableCell>
            <TableCell sx={CELL}>{department} <br />{pan}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={CELL}><b>Designation</b></TableCell>
            <TableCell sx={CELL}>{designation}</TableCell>
            <TableCell sx={CELL}>DOB</TableCell>
            <TableCell sx={CELL}>{dob}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={CELL}><b>Mode</b></TableCell>
            <TableCell sx={CELL}>
              Bank Name:{mode}<br />
              Bank Ac No:{accountNo}
            </TableCell>
            <TableCell sx={CELL}>Working Days</TableCell>
            <TableCell sx={CELL}>{workdays}</TableCell>
          </TableRow>

          {/* SALARY TABLE HEADER */}
          <TableRow>
            <TableCell sx={CELL}><b>Earnings</b></TableCell>
            <TableCell sx={CENTER_CELL}><b>Amount</b></TableCell>
            <TableCell sx={CENTER_CELL}><b>Deductions</b></TableCell>
            <TableCell sx={CENTER_CELL}><b>Amount</b></TableCell>
          </TableRow>

          {/* EARNINGS & DEDUCTIONS ROWS */}
          {earnings.map((e, i) => (
            <TableRow key={i}>
              <TableCell sx={CELL}><b>{e.label}</b></TableCell>
              <TableCell sx={CENTER_CELL}>{formatCurrency(e.value)}</TableCell>
              <TableCell sx={CENTER_CELL}>{deductions[i]?.label || ""}</TableCell>
              <TableCell sx={CENTER_CELL}>
                {deductions[i] ? formatCurrency(deductions[i].value) : ""}
              </TableCell>
            </TableRow>
          ))}

          {/* TOTAL ROW */}
          <TableRow>
            <TableCell sx={CELL}><b>Total</b></TableCell>
            <TableCell sx={CENTER_CELL}>{formatCurrency(totalEarnings)}</TableCell>
            <TableCell sx={CENTER_CELL}><b>Total Deduction</b></TableCell>
            <TableCell sx={CENTER_CELL}>{formatCurrency(totalDeductions)}</TableCell>
          </TableRow>

          {/* NET PAY ROW */}
          <TableRow>
            <TableCell sx={CELL}><b>Net Pay</b></TableCell>
            <TableCell sx={CENTER_CELL}>{formatCurrency(netPay)}</TableCell> {/* Net Pay in first Amount column */}
            <TableCell sx={CELL}></TableCell>       {/* Empty Deductions label */}
            <TableCell sx={CENTER_CELL}></TableCell> {/* Empty second Amount column */}
          </TableRow>

          {/* IN WORDS */}
          <TableRow>
            <TableCell sx={CELL}><b>In Words</b></TableCell>
            <TableCell colSpan={3} sx={CELL}>
              {numberToWords(netPay)}
            </TableCell>
          </TableRow>

          {/* SIGNATURE & STAMP */}
          <TableRow>
            <TableCell sx={{ border: "1px solid #000", paddingLeft: "150px" }}></TableCell>
            <TableCell sx={{ border: "1px solid #000", paddingLeft: "150px" }}></TableCell>

            <TableCell
              sx={{
                border: "1px solid #000",
                verticalAlign: "top",
                padding: "10px",
                width: "50%",
              }}
            >
              {company.signature && (
                <img
                  src={company.signature}
                  alt="Signature"
                  style={{ height: "60px", marginBottom: "6px" }}
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
              {company.stamp && (
                <img
                  src={company.stamp}
                  alt="Stamp"
                  style={{ height: "100px" }}
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
 