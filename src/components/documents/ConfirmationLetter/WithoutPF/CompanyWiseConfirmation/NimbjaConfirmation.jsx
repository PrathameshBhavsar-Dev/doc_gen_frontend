import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";
import { formatCurrency } from "../../../../../utils/salaryCalculations";

const NimbjaConfirmation = ({ company = {}, data = {} }) => {
  const firstName = data.employeeName?.split(" ")[0] || "";

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : "";

  /* ================= SALARY LOGIC ================= */

  const round2 = (num) => Number(num.toFixed(2));
  const annualCTC = round2(Number(data.totalSalary || 0));

  const basicAnnual = round2(annualCTC * 0.4);
  const hraAnnual = round2(annualCTC * 0.18);
  const daAnnual = round2(annualCTC * 0.12);
  const specialAnnual = round2(annualCTC * 0.16);
  const foodAnnual = round2(annualCTC * 0.06);

  const usedAnnual =
    basicAnnual + hraAnnual + daAnnual + specialAnnual + foodAnnual;

  const miscAnnual = round2(annualCTC - usedAnnual);

  const basicMonthly = round2(basicAnnual / 12);
  const hraMonthly = round2(hraAnnual / 12);
  const daMonthly = round2(daAnnual / 12);
  const specialMonthly = round2(specialAnnual / 12);
  const foodMonthly = round2(foodAnnual / 12);
  const miscMonthly = round2(miscAnnual / 12);

  const salaryRows = [
    ["Basic", basicMonthly, basicAnnual],
    ["House Rent Allowance", hraMonthly, hraAnnual],
    ["Dearness Allowance", daMonthly, daAnnual],
    ["Special Allowance", specialMonthly, specialAnnual],
    ["Food Allowance", foodMonthly, foodAnnual],
    ["Misc. Allowance", miscMonthly, miscAnnual],
  ];

  const totalMonthly = round2(salaryRows.reduce((sum, row) => sum + row[1], 0));

  const totalAnnual = round2(salaryRows.reduce((sum, row) => sum + row[2], 0));

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Box>
          <Typography align="right" mb={3} sx={{ fontFamily: "Bahnschrift" }}>
            {formatDate(data.issueDate)}
          </Typography>

          <Typography mb={1} sx={{ fontFamily: "Bahnschrift" }}>
            <strong>Name :</strong> {data.employeeName}
          </Typography>

          <Typography b={2} sx={{ fontFamily: "Bahnschrift", mt: "-2mm" }}>
            <strong>Address:</strong> {data.address}
          </Typography>

          <Typography mb={3} sx={{ fontFamily: "Bahnschrift" }}>
            <strong>Subject :</strong> Letter of intent for continued services
            as <strong>{data.position}</strong>
          </Typography>

          <Typography mb={2} sx={{ fontFamily: "Bahnschrift" }}>
            Dear {firstName},
          </Typography>

          <Typography
            mb={3}
            textAlign="justify"
            sx={{ fontFamily: "Bahnschrift" }}
          >
            We are pleased to confirm your continued services at the position of{" "}
            <strong>{data.position}</strong> with{" "}
            <strong>Nimbja Security Solutions Pvt. Ltd.</strong> with effective
            date <strong>{data.effectiveDate}</strong>, considering your
            performance and support towards the organization.
          </Typography>

          <Typography
            mb={2}
            textAlign="justify"
            sx={{ fontFamily: "Bahnschrift" }}
          >
            If there is any change in the date of joining, changes can be taken
            under consideration. Your total Gross salary will be Rs.{" "}
            <strong>{formatCurrency(data.totalSalary)}</strong> per year.
          </Typography>

          <Typography
            mb={2}
            textAlign="justify"
            sx={{ fontFamily: "Bahnschrift" }}
          >
            Subject to various deductions as per company and government policy.
            Kindly acknowledge the duplicate copy of this letter as an
            acceptance of this offer.
          </Typography>

          <Typography mb={2} sx={{ fontFamily: "Bahnschrift" }}>
            The roles and responsibilities and other terms and conditions of
            your employment will be specified in your letter of appointment.
          </Typography>

          <Typography mb={2} sx={{ fontFamily: "Bahnschrift" }}>
            We welcome you to Nimbja Security Solutions Pvt. Ltd. Family and
            hope it would be the beginning of a long and mutually beneficial
            association.
          </Typography>

          <Typography sx={{ fontFamily: "Bahnschrift", fontSize: "14pt" }}>
            for <strong>Nimbja Security Solutions Pvt. Ltd.</strong>
          </Typography>

          {/* Signature Block */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Box>
              <Box sx={{ display: "flex", gap: 3 }}>
                {company?.signature && (
                  <img
                    src={company.signature}
                    alt="Signature"
                    style={{ height: 50 }}
                  />
                )}
                {company?.stamp && (
                  <img
                    src={company.stamp}
                    alt="Stamp"
                    style={{ height: 100 }}
                  />
                )}
              </Box>
              <Typography mt={1}>{company.hrName}</Typography>
              <Typography>HR Relations Lead</Typography>
            </Box>

            <Box minWidth="250px" sx={{ mt: 10 }}>
              <Typography>Signature: __________________</Typography>
              <Typography mt={2}>
                Candidate Name: {data.employeeName}
              </Typography>
            </Box>
          </Box>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company.header} footerSrc={company.footer}>
        <Typography align="center" fontWeight={600} mb={4}>
          Annexure A – Salary Structure
        </Typography>

        <Table
          sx={{
            width: "100%",
            border: "1px solid #000",
            "& td": {
              border: "1px solid #000",
              padding: "6px",
              fontSize: "14px",
            },
          }}
        >
          <TableBody>
            <TableRow sx={{ backgroundColor: "#a3f57a" }}>
              <TableCell>
                <b>Salary Components</b>
              </TableCell>
              <TableCell align="right">
                <b>Per month (Rs.)</b>
              </TableCell>
              <TableCell align="right">
                <b>Per Annum (Rs.)</b>
              </TableCell>
            </TableRow>

            {salaryRows.map(([name, monthly, annual], i) => (
              <TableRow key={i}>
                <TableCell>{name}</TableCell>
                <TableCell align="right">{formatCurrency(monthly)}</TableCell>
                <TableCell align="right">{formatCurrency(annual)}</TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: "#a3f57a" }}>
              <TableCell>
                <b>Total Monthly Gross Salary</b>
              </TableCell>
              <TableCell align="right">
                <b>{formatCurrency(totalMonthly)}</b>
              </TableCell>
              <TableCell align="right">
                <b>{formatCurrency(totalAnnual)}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 10 }}>
          <Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              {company?.signature && (
                <img
                  src={company.signature}
                  alt="Signature"
                  style={{ height: 48 }}
                />
              )}
              {company?.stamp && (
                <img src={company.stamp} alt="Stamp" style={{ height: 100 }} />
              )}
            </Box>
            <Typography mt={1}>{company.hrName}</Typography>
            <Typography>HR Relations Lead</Typography>
          </Box>

          <Box minWidth="250px" sx={{ mt: 10 }}>
            <Typography>Signature: __________________</Typography>
            <Typography mt={2}>Candidate Name: {data.employeeName}</Typography>
          </Box>
        </Box>
      </A4Page>
    </>
  );
};

export default NimbjaConfirmation;
