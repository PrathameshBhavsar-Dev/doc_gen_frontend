import dilipSignature from "../../../../../assets/images/devconssoftware/dilip_kumar_signature.png";



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

const DevconsIncrement = ({ company = {}, data = {} }) => {

  const round0 = (num) => Math.round(num);

  // ================= ANNUAL CTC INPUT =================
  const annualCTC = round0(Number(data.newCTC || 0));

  // ================= MONTHLY CTC =================
  const monthlyCTC = round0(annualCTC / 12);

  // ================= STATIC PF =================
  const pfMonthly = 3750;

  // ================= FIXED PERCENTAGES =================
  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);

  // ================= ADJUSTED BASIC =================
  const basicMonthly = round0(
    monthlyCTC -
    (hraMonthly + daMonthly + specialMonthly + foodMonthly + pfMonthly)
  );

  // ================= ANNUAL =================
  const basicAnnual = round0(basicMonthly * 12);
  const hraAnnual = round0(hraMonthly * 12);
  const daAnnual = round0(daMonthly * 12);
  const specialAnnual = round0(specialMonthly * 12);
  const foodAnnual = round0(foodMonthly * 12);
  const pfAnnual = round0(pfMonthly * 12);

  // ================= SALARY TABLE =================
  const salaryRows = [
    ["Basic", basicMonthly, basicAnnual],
    ["House Rent Allowance", hraMonthly, hraAnnual],
    ["Dearness Allowance", daMonthly, daAnnual],
    ["Special Allowance", specialMonthly, specialAnnual],
    ["Food Allowance", foodMonthly, foodAnnual],
    ["Provident Fund (PF)", pfMonthly, pfAnnual],
  ];

  // ================= TOTAL =================
  const totalMonthly = round0(
    basicMonthly +
    hraMonthly +
    daMonthly +
    specialMonthly +
    foodMonthly +
    pfMonthly
  );

  const totalAnnual = round0(totalMonthly * 12);

  const issueDate = data.increment_letter?.issueDate ?? data.issueDate;

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
          "& *": {
            fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
          },
          pageBreakAfter: "always",
        }}
      >
        {company?.headerImage && (
          <img src={company.headerImage} alt="Header" style={{ width: "100%" }} />
        )}

        <Box sx={{ px: "25mm", py: "22mm", flexGrow: 1, fontSize: "14px", lineHeight: 1.8, color: "#000" }}>
          <Typography sx={{ textAlign: "right", mb: 6 }}>
            {new Date(issueDate).toLocaleDateString("en-US", {
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
            <strong>{company.name}</strong>, we are pleased to offer you a salary
            increment effective{" "}
            <strong>
              {new Date(data.effectiveDate).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </strong>.
            Your salary will increase to{" "}
            <strong>{formatCurrency(data.newCTC)}</strong> per annum.
          </Typography>

          <Typography sx={{ mb: 4, textAlign: "justify" }}>
            Your loyalty and commitment to the company over the years have been
            invaluable and this increment is a token of our appreciation.
            We look forward to many more years of your dedication and contribution.
          </Typography>

          <Typography sx={{ mb: 8 }}>
            Once again, thank you for being such a reliable member of our team.
          </Typography>

          <Typography sx={{ mb: 6 }}>
            Yours Sincerely,
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 4, mb: 2 }}>
            {company?.signature && (
              <img src={dilipSignature} alt="Signature" style={{ height: 60 }} />
            )}
            {company?.stamp && (
              <img src={company.stamp} alt="Stamp" style={{ height: 110 }} />
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
          "& *": {
            fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
          },
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
              Employee Code : {data.employeeId}
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              Employee Name : {data.employeeName}
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              Effective Date :{" "}
              {new Date(data.effectiveDate).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </Typography>
          </Box>

          <Table
            sx={{
              width: "100%",
              border: "1px solid #000",
              borderCollapse: "collapse",
              "& th, & td": {
                border: "1px solid #000",
                padding: "0px 12px 12px 12px",
                fontSize: "15px",
                "& *": {
                  fontFamily: `"Bahnschrift", "Segoe UI", Arial, sans-serif`,
                },
              },
            }}
          >
            <TableBody>
              <TableRow sx={{ backgroundColor: "#f2b705" }}>
                <TableCell sx={{ fontWeight: 700 }}>
                  Monthly Component
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Amount (Rs.)
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Yearly Component
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Basic</TableCell>
                <TableCell align="right">
                  {formatCurrency(basicMonthly)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(basicAnnual)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>House Rent Allowance</TableCell>
                <TableCell align="right">
                  {formatCurrency(hraMonthly)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(hraAnnual)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Dearness Allowance</TableCell>
                <TableCell align="right">
                  {formatCurrency(daMonthly)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(daAnnual)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Special Allowance</TableCell>
                <TableCell align="right">
                  {formatCurrency(specialMonthly)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(specialAnnual)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Food Allowance</TableCell>
                <TableCell align="right">
                  {formatCurrency(foodMonthly)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(foodAnnual)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Provident Fund (PF)</TableCell>
                <TableCell align="right">
                  {formatCurrency(pfMonthly)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(pfAnnual)}
                </TableCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: "#f2b705" }}>
                <TableCell sx={{ fontWeight: 700 }}>
                  Monthly Gross
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }} align="right">
                  {formatCurrency(totalMonthly)}
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }} align="right">
                  {formatCurrency(totalAnnual)}
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

export default DevconsIncrement;
