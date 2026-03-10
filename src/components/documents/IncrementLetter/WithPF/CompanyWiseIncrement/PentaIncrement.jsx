
import React from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";

import { formatCurrency } from "../../../../../utils/salaryCalculations";

const PentaIncrement = ({ company, data }) => {
    /* ================= SALARY LOGIC ================= */

// const generateSalaryBreakup = (annualCTC) => {
//   const monthlyCTC = Math.round(annualCTC / 12);

//   let basic = Math.round(monthlyCTC * 0.48);
//   let hra = Math.round(monthlyCTC * 0.18);
//   let da = Math.round(monthlyCTC * 0.12);
//   let special = Math.round(monthlyCTC * 0.16);
//   let food = Math.round(monthlyCTC * 0.06);

//   const calculated = basic + hra + da + special + food;
//   basic += monthlyCTC - calculated; // fix rounding

//   const pfMonthly = 3750; // Static
//   const pfAnnual = pfMonthly * 12;

//   return [
//     { name: "Basic Salary", monthly: basic, annual: basic * 12 },
//     { name: "House Rent Allowance", monthly: hra, annual: hra * 12 },
//     { name: "Dearness Allowance", monthly: da, annual: da * 12 },
//     { name: "Special Allowance", monthly: special, annual: special * 12 },
//     { name: "Food Allowance", monthly: food, annual: food * 12 },
//     { name: "Provident Fund (PF)", monthly: pfMonthly, annual: pfAnnual }, // only display
//   ];
// };

//     // Totals
//   const annualCTC = Number(data.newCTC || 0);

// const salaryComponents = generateSalaryBreakup(annualCTC);

// const totalMonthly = salaryComponents
//   .filter((row) => row.name !== "Provident Fund (PF)")
//   .reduce((sum, row) => sum + row.monthly, 0);

// const totalAnnual = annualCTC; // because salary % = 100%


/* ================= SALARY LOGIC (Same as DevconsIncrement) ================= */

/* ================= SALARY LOGIC (MONTHLY BASED) ================= */

const round0 = (num) => Math.round(num);

// Now newCTC is MONTHLY CTC
const monthlyCTC = round0(Number(data.newCTC || 0));

// Calculate components from MONTHLY
let basicMonthly = round0(monthlyCTC * 0.48);
let hraMonthly = round0(monthlyCTC * 0.18);
let daMonthly = round0(monthlyCTC * 0.12);
let specialMonthly = round0(monthlyCTC * 0.16);
let foodMonthly = round0(monthlyCTC * 0.06);

// Fix rounding difference
const calculated =
  basicMonthly +
  hraMonthly +
  daMonthly +
  specialMonthly +
  foodMonthly;

basicMonthly += monthlyCTC - calculated;

// Static PF
const pfMonthly = 3750;

// Convert to Annual
const basicAnnual = basicMonthly * 12;
const hraAnnual = hraMonthly * 12;
const daAnnual = daMonthly * 12;
const specialAnnual = specialMonthly * 12;
const foodAnnual = foodMonthly * 12;
const pfAnnual = pfMonthly * 12;

// Salary Rows
const salaryComponents = [
  { name: "Basic", monthly: basicMonthly, annual: basicAnnual },
  { name: "House Rent Allowance", monthly: hraMonthly, annual: hraAnnual },
  { name: "Dearness Allowance", monthly: daMonthly, annual: daAnnual },
  { name: "Special Allowance", monthly: specialMonthly, annual: specialAnnual },
  { name: "Food Allowance", monthly: foodMonthly, annual: foodAnnual },
  { name: "Provident Fund (PF)", monthly: pfMonthly, annual: pfAnnual },
];

// Totals
const totalMonthly =
  basicMonthly +
  hraMonthly +
  daMonthly +
  specialMonthly +
  foodMonthly;

const totalAnnual = totalMonthly * 12;
    return (
        <>
            {/* =====================================================
          PAGE 1 – DEVCONS INCREMENT LETTER
      ====================================================== */}
            <Box
                sx={{
                    width: "210mm",
                    minHeight: "297mm",
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
                    "& *": {
                        fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
                    },
                    pageBreakAfter: "always",
                }}
            >
                {company?.headerImage && (
                    <img src={company.headerImage} alt="Header" style={{ width: "100%" }} />
                )}

                <Box
                    sx={{
                        px: "25mm",
                        py: "22mm",
                        flexGrow: 1,
                        fontSize: "14px",
                        lineHeight: 1.8,
                        color: "#000",
                    }}
                >
                    <Typography sx={{ textAlign: "right", mb: 6 }}>
                        {new Date(data.issueDate).toLocaleDateString("en-US", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                        })}
                    </Typography>

                    <Typography sx={{ mb: 4 }}>
                        Dear {data.employeeName},
                    </Typography>
                    <Typography sx={{ mb: 4, textAlign: "justify" }}>
                        In recognition of your previous years of service with{" "}
                        , we are pleased to offer you a salary
                        increment effective {" "}



                        . Your salary will increase to{" "}
                        <strong>{formatCurrency(totalAnnual)}</strong> per annum. Effective from <strong> {new Date(data.effectiveDate).toLocaleDateString("en-US", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                        })}
                        </strong>
                    </Typography>
                    <Typography sx={{ mb: 4, textAlign: "justify" }}>
                        If you have any questions or would like to discuss this further, please do not hesitate to reach out to us. We appreciate your significant contributions
                        to the company and anticipate your continued success in your role.
                    </Typography>

                    <Typography sx={{ mb: 1 }}>Best Regards,</Typography>
                    <Typography sx={{ mb: 2 }}>
                        <strong>Jaya Bharati</strong>
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 4, mb: 2 }}>
                        {company?.jaya_sign && (
                            <img
                                src={company.jaya_sign}
                                alt="Signature"
                                style={{ height: 60 }}
                            />
                        )}

                        {company?.stamp && (
                            <img
                                src={company.stamp}
                                alt="Stamp"
                                style={{ height: 110 }}
                            />
                        )}
                    </Box>

                    <Typography sx={{ fontWeight: 600 }}>
                        CEO & Managing Director
                    </Typography>
                </Box>

                {company?.footerImage && (
                    <img src={company.footerImage} alt="Footer" style={{ width: "100%" }} />
                )}
            </Box>

            {/* ======================================================
          PAGE 2 – SALARY ANNEXURE
      ====================================================== */}
            <Box
                sx={{
                    width: "210mm",
                    minHeight: "297mm",
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    pageBreakBefore: "always",
                    fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
                    color: "#000",
                }}
            >
                {company?.headerImage && (
                    <img src={company.headerImage} alt="Header" style={{ width: "100%" }} />
                )}

                <Box sx={{ px: "25mm", pt: "20mm", pb: "22mm", flexGrow: 1 }}>
                    <Typography
                        align="center"
                        fontWeight={600}
                        mb={8}
                        sx={{ textDecoration: "underline" }}
                    >
                        Salary Annexure
                    </Typography>

                    <Box mb={6} fontSize="13px">
                        <Typography sx={{ fontWeight: 500 }}>
                            Employee Name : {data.employeeName}
                        </Typography>
                    </Box>

                    <Table
                        sx={{
                            width: "100%",
                            border: "1px solid #000",
                            borderCollapse: "collapse",
                            "& th, & td": {
                                border: "1px solid #000",
                                padding: "4px 6px",
                                fontSize: "15px",
                                fontFamily: `"Times New Roman", Times, serif`,
                                lineHeight: 1.2,
                            },
                        }}
                    >
                        <TableBody>
                            <TableRow sx={{ backgroundColor: "#358dd0" }}>
                                <TableCell sx={{ fontWeight: 700 }}>
                                    Yearly Component
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">
                                    Monthly (Rs.)
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">
                                    Annual (Rs.)
                                </TableCell>
                            </TableRow>

                            {salaryComponents.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align="right">{row.monthly}</TableCell>
                                    <TableCell align="right">{row.annual}</TableCell>
                                </TableRow>
                            ))}

                            <TableRow sx={{ backgroundColor: "#358dd0" }}>
                                <TableCell sx={{ fontWeight: 700 }}>
                                    Monthly Gross
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">
                                    {totalMonthly}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">
                                    {totalAnnual}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Typography mt={6} fontSize="15px" fontWeight={500}>
                        Please note that the details in this communication are confidential
                        and you are requested not to share the same with others.
                    </Typography>
                </Box>

                {company?.footerImage && (
                    <img src={company.footerImage} alt="Footer" style={{ width: "100%" }} />
                )}
            </Box>
        </>
    );
};

export default PentaIncrement;