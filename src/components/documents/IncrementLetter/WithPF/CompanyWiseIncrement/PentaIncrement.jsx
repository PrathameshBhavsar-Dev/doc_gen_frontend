// import React from "react";
// import { Box, Typography, Table, TableBody, TableCell, TableRow, } from "@mui/material";

// import { formatCurrency, } from "../../../../../utils/salaryCalculations";

// const PentaIncrement = ({ company, data }) => {
//   /* ================= SALARY LOGIC (DEVCONS – CUSTOM ANNEXURE) ================= */

//   // Helper to keep 2 decimals everywhere
//   const round2 = (num) => Number(num.toFixed(2));

//   // Source of truth
//   const annualCTC = round2(Number(data.newCTC || 0));

//   // Fixed annual components (percent based)
//   const basicAnnual = round2(annualCTC * 0.40);
//   const hraAnnual = round2(annualCTC * 0.18);
//   const daAnnual = round2(annualCTC * 0.12);
//   const specialAnnual = round2(annualCTC * 0.16);
//   const foodAnnual = round2(annualCTC * 0.06);

//   // Sum of fixed components
//   const usedAnnual =
//     basicAnnual +
//     hraAnnual +
//     daAnnual +
//     specialAnnual +
//     foodAnnual;

//   // ✅ Adjustment component (prevents ₹1 mismatch)
//   const miscAnnual = round2(annualCTC - usedAnnual);

//   // Monthly breakup (derived ONLY from final annual values)
//   const basicMonthly = round2(basicAnnual / 12);
//   const hraMonthly = round2(hraAnnual / 12);
//   const daMonthly = round2(daAnnual / 12);
//   const specialMonthly = round2(specialAnnual / 12);
//   const foodMonthly = round2(foodAnnual / 12);
//   const miscMonthly = round2(miscAnnual / 12);

//   // Table rows (UI remains SAME)
//   const salaryComponents = [
//     { name: "Basic", monthly: basicMonthly, annual: basicAnnual },
//     { name: "House Rent Allowance", monthly: hraMonthly, annual: hraAnnual },
//     { name: "Dearness Allowance", monthly: daMonthly, annual: daAnnual },
//     { name: "Special Allowance", monthly: specialMonthly, annual: specialAnnual },
//     { name: "Food Allowance", monthly: foodMonthly, annual: foodAnnual },
//     { name: "Misc. Allowance", monthly: miscMonthly, annual: miscAnnual },
//   ];

//   // Totals (guaranteed to match CTC)
//   const totalMonthly = round2(
//     salaryComponents.reduce((sum, row) => sum + row.monthly, 0)
//   );

//   const totalAnnual = round2(
//     salaryComponents.reduce((sum, row) => sum + row.annual, 0)
//   );



//   return (
//     <>
//       {/* =====================================================
//           PAGE 1 – DEVCONS INCREMENT LETTER
//       ====================================================== */}
//       <Box
//         sx={{
//           width: "210mm",
//           minHeight: "297mm",
//           backgroundColor: "#fff",
//           display: "flex",
//           flexDirection: "column",
//           fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
//           "& *": {
//             fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
//           },
//           pageBreakAfter: "always",
//         }}
//       >
//         {company?.headerImage && (
//           <img src={company.headerImage} alt="Header" style={{ width: "100%" }} />
//         )}

//         <Box sx={{ px: "25mm", py: "22mm", flexGrow: 1, fontSize: "14px", lineHeight: 1.8, color: "#000" }}>
//           <Typography sx={{ textAlign: "right", mb: 6 }}>
//             {new Date(data.issueDate).toLocaleDateString("en-US", {
//               month: "long",
//               day: "2-digit",
//               year: "numeric",
//             })}
//           </Typography>

//           <Typography sx={{ mb: 4 }}>Dear {data.employeeName},</Typography>

//           <Typography sx={{ mb: 4, textAlign: "justify" }}>
//             In recognition of your previous years of service with{" "}
//           , we are pleased to offer you a salary
//             increment effective {" "}



//             . Your salary will increase to{" "}
//             <strong>{formatCurrency(data.newCTC)}</strong> per annum. Effective from <strong> {new Date(data.effectiveDate).toLocaleDateString("en-US", {
//                 month: "long",
//                 day: "2-digit",
//                 year: "numeric",
//               })}
//           </strong>
//           </Typography>

//           <Typography sx={{ mb: 4, textAlign: "justify" }}>
//            If you have any questions or would like to discuss this further, please do not hesitate to reach out to us. We appreciate your significant contributions
//             to the company and anticipate your continued success in your role.
//           </Typography>



//           <Typography sx={{ mb: 1 }}>Best Regards,</Typography>
//            <Typography  sx={{ mb: 2 }}> <strong>Jaya Bharati</strong></Typography>

//           <Box sx={{ display: "flex", alignItems: "center", gap: 4, mb: 2 }}>
//             {company?.jaya_sign && (
//               <img
//                 src={company.jaya_sign}
//                 alt="Signature"
//                 style={{ height: 60 }}
//               />
//             )}

//             {company?.stamp && (
//               <img
//                 src={company.stamp}
//                 alt="Stamp"
//                 style={{ height: 110 }}
//               />
//             )}
//           </Box>


//           <Typography sx={{ fontWeight: 600 }}>
//             CEO & Managing Director
//           </Typography>
//         </Box>

//         {company?.footerImage && (
//           <img src={company.footerImage} alt="Footer" style={{ width: "100%" }} />
//         )}
//       </Box>

//       {/* ======================================================
//           PAGE 2 – SALARY ANNEXURE
//       ====================================================== */}
//       <Box
//         sx={{
//           width: "210mm",
//           minHeight: "297mm",
//           backgroundColor: "#fff",
//           display: "flex",
//           flexDirection: "column",
//           mt: 0,
//           pageBreakBefore: "always",
//           fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
//           color: "#000"
//         }}
//       >
//         {company?.headerImage && (
//           <img src={company.headerImage} alt="Header" style={{ width: "100%" }} />
//         )}

//         <Box sx={{ px: "25mm", pt: "20mm", pb: "22mm", flexGrow: 1 }}>
//           <Typography
//             align="center"
//             fontWeight={600}
//             mb={8}
//             sx={{ textDecoration: "underline" }}
//           >
//             Salary Annexure
//           </Typography>


//           <Box mb={6} fontSize="13px">
//             <Typography sx={{ fontWeight: 500 }}>Employee Name : {data.employeeName}</Typography>

//           </Box>

//           <Table
//             sx={{
//               width: "100%",
//               border: "1px solid #000",
//               borderCollapse: "collapse",
//               "& th, & td": {
//                 border: "1px solid #000",
//                 padding: "4px 6px",
//                 fontSize: "15px",
//                 fontFamily: `"Times New Roman", Times, serif`,
//                 lineHeight: 1.2,
//               },
//             }}
//           >
//             <TableBody>
//               <TableRow sx={{ backgroundColor: "#358dd0" }}>
//                  <TableCell sx={{ fontWeight: 700 }}>Yearly Component</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }} align="right">Amount (Rs.)</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Monthly Component</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }} align="right">Amount (Rs.)</TableCell>

//               </TableRow>

//               <TableRow>
//                 <TableCell>Basic</TableCell>
//                 <TableCell align="right">{basicMonthly}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="right">{basicAnnual}</TableCell>
//               </TableRow>


//               <TableRow>
//                 <TableCell>House Rent Allowance</TableCell>
//                 <TableCell align="right">{hraMonthly}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="right">{hraAnnual}</TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>Dearness Allowance</TableCell>
//                 <TableCell align="right">{daMonthly}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="right">{daAnnual}</TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>Special Allowance</TableCell>
//                 <TableCell align="right">{specialMonthly}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="right">{specialAnnual}</TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>Food Allowance</TableCell>
//                 <TableCell align="right">{foodMonthly}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="right">{foodAnnual}</TableCell>
//               </TableRow>

//               <TableRow>
//                 <TableCell>Misc. Allowance</TableCell>
//                 <TableCell align="right">{miscMonthly}</TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="right">{miscAnnual}</TableCell>
//               </TableRow>

//               <TableRow sx={{ backgroundColor: "#358dd0" }}>
//                 <TableCell sx={{ fontWeight: 700 }}>Monthly Gross</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }} align="right">
//                   {totalMonthly}
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 700 }}>Annual CTC</TableCell>
//                 <TableCell sx={{ fontWeight: 700 }} align="right">
//                   {totalAnnual}
//                 </TableCell>
//               </TableRow>

//             </TableBody>
//           </Table>

//           <Typography mt={6} fontSize="15px" fontWeight={500}>
//             Please note that the details in this communication are confidential
//             and you are requested not to share the same with others.
//           </Typography>
//         </Box>

//         {company?.footerImage && (
//           <img src={company.footerImage} alt="Footer" style={{ width: "100%" }} />
//         )}
//       </Box>
//     </>
//   );
// };

// export default PentaIncrement;

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

    const round2 = (num) => Number(num.toFixed(2));

    const annualCTC = round2(Number(data.newCTC || 0));

    // Fixed annual components (percent based)
    const basicAnnual = round2(annualCTC * 0.40);
    const hraAnnual = round2(annualCTC * 0.18);
    const daAnnual = round2(annualCTC * 0.12);
    const specialAnnual = round2(annualCTC * 0.16);
    const foodAnnual = round2(annualCTC * 0.06);

    // ✅ PF Fixed
    const pfMonthly = 3750;
    const pfAnnual = round2(pfMonthly * 12);

    // Monthly breakup
    const basicMonthly = round2(basicAnnual / 12);
    const hraMonthly = round2(hraAnnual / 12);
    const daMonthly = round2(daAnnual / 12);
    const specialMonthly = round2(specialAnnual / 12);
    const foodMonthly = round2(foodAnnual / 12);

    // Salary Components
    const salaryComponents = [
        { name: "Basic", monthly: basicMonthly, annual: basicAnnual },
        { name: "House Rent Allowance", monthly: hraMonthly, annual: hraAnnual },
        { name: "Dearness Allowance", monthly: daMonthly, annual: daAnnual },
        { name: "Special Allowance", monthly: specialMonthly, annual: specialAnnual },
        { name: "Food Allowance", monthly: foodMonthly, annual: foodAnnual },
        { name: "Provident Fund (PF)", monthly: pfMonthly, annual: pfAnnual },
    ];

    // Totals
    const totalMonthly = round2(
        salaryComponents.reduce((sum, row) => sum + row.monthly, 0)
    );

    const totalAnnual = round2(
        salaryComponents.reduce((sum, row) => sum + row.annual, 0)
    );

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
                        <strong>{formatCurrency(data.newCTC)}</strong> per annum. Effective from <strong> {new Date(data.effectiveDate).toLocaleDateString("en-US", {
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