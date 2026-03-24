import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const PageLayout = ({ children, company, data }) => {
  const header = data?.header || company?.header;

  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        position: "relative",
        backgroundColor: "white",
        fontFamily: "'Calibri', 'Arial', sans-serif",
        marginBottom: "20px",
        "@media print": {
          marginBottom: 0,
          breakAfter: "page",
        },
      }}
    >
      {/* HEADER */}
      {header && <img src={header} alt="header" width="100%" />}

      <Box sx={{ px: 8, py: 4, position: "relative", zIndex: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

const CubeageConfirmationLetter = ({ company = {}, data = {} }) => {
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d)
      ? date
      : d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
  };

  const firstName = data.employeeName?.split(" ")[0] || "";
  /* ================= SALARY LOGIC ================= */

  const round0 = (num) => Math.round(num);

  const annualCTC = round0(Number(data.totalSalary || 0));
  const monthlyCTC = round0(annualCTC / 12);

  // Components Logic
  let basicMonthly = round0(monthlyCTC * 0.4);
  let hraMonthly = round0(monthlyCTC * 0.18);
  let daMonthly = round0(monthlyCTC * 0.12);
  let laMonthly = round0(monthlyCTC * 0.16); // LA
  let allowanceMonthly = round0(monthlyCTC * 0.06); // Allowance

  // Special Allowance is the balancing figure to match Total CTC
  let specialMonthly =
    monthlyCTC - (basicMonthly + hraMonthly + daMonthly + laMonthly + allowanceMonthly);

  // Annual values
  const basicAnnual = round0(basicMonthly * 12);
  const hraAnnual = round0(hraMonthly * 12);
  const daAnnual = round0(daMonthly * 12);
  const laAnnual = round0(laMonthly * 12);
  const allowanceAnnual = round0(allowanceMonthly * 12);
  const specialAnnual = round0(specialMonthly * 12);

  // Salary table
  const salaryRows = [
    ["Basic", basicMonthly, basicAnnual],
    ["HRA", hraMonthly, hraAnnual],
    ["DA", daMonthly, daAnnual],
    ["LTA", laMonthly, laAnnual],
    ["Allowance", allowanceMonthly, allowanceAnnual],
    ["Special Allowance", specialMonthly, specialAnnual],
  ];

  // Totals
  const totalMonthly = round0(salaryRows.reduce((sum, row) => sum + row[1], 0));
  const totalAnnual = round0(salaryRows.reduce((sum, row) => sum + row[2], 0));

  const subject =
    data.subject ||
    `Letter of intent for the continued services as ${data.designation || data.position}`;

  return (
    <Box>
      {/* PAGE 1: Letter Content + Signature */}
      <PageLayout company={company} data={data}>
        {/* Issued Date — top right corner */}
        <Box sx={{ position: "relative" }}>
          {/* DATE */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Typography fontWeight="bold">Date: {formatDate(data.issueDate)}</Typography>
          </Box>

          <Box>
            <Typography mt={4}>
              <strong>Name :</strong> {data.employeeName}
            </Typography>

            <Typography mt={1}>
              <strong>Address :</strong> {data.address}
            </Typography>
          </Box>
        </Box>

        <Typography mt={1}>
          <strong>Subject :</strong> {subject}
        </Typography>

        <Typography mt={2}>Dear {firstName},</Typography>

        <Typography mt={2} textAlign="justify" lineHeight={1.6}>
          We are pleased to confirm your continued services at the position of{" "}
          {data.designation || data.position} with <strong>{company.name || "Cubeage Technology Services Pvt. Ltd."}</strong> effective date{" "}
          <strong>{formatDate(data.effectiveDate)}</strong> considering your performance and
          support towards the organization.
        </Typography>

        <Typography mt={2} textAlign="justify" lineHeight={1.6}>
          If there is any change in the date of joining, changes can be taken
          under consideration. Your total Gross salary will be Rs.{" "}
          <strong>{annualCTC.toLocaleString("en-IN")}</strong> per year. Subject to various deductions
          as per company and government policy. The roles and responsibilities
          and other terms and conditions of your employment will be specified in
          your letter of appointment.
        </Typography>

        <Typography mt={2} textAlign="justify" lineHeight={1.6}>
          We welcome you to <strong>{company.name || "Cubeage Technology Services Pvt. Ltd."}</strong>{" "}
          Family and hope it would be the beginning of a long and mutually
          beneficial association. Kindly acknowledge the duplicate copy of this
          letter as an acceptance of this offer.
        </Typography>

        <Typography mt={3}>Wishing you all Success.</Typography>

        {/* SIGNATURE SECTION */}
        <Box sx={{ mt: 8 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4, // Aside of each other (16px * 4? No, gap: 4 in MUI is ~32px)
              mb: 2,
            }}
          >
            {/* Stamp */}
            {company?.stamp && (
              <img
                src={company.stamp}
                alt="stamp"
                style={{
                  height: 100, // Slightly larger usually
                }}
              />
            )}

            {/* Signature */}
            {company?.signature && (
              <img
                src={company.signature}
                alt="signature"
                style={{
                  height: 60,
                  display: "block",
                }}
              />
            )}
          </Box>

          <Typography>Authorized Signature,</Typography>
          <Typography fontWeight="bold">For {company?.name || company?.companyName}</Typography>
        </Box>
      </PageLayout>

      {/* PAGE 2: Compensation Structure */}
      <PageLayout company={company} data={data}>
        <Box sx={{ mt: 4, position: "relative", overflow: "hidden" }}>

          <Typography
            fontWeight={600}
            textDecoration="underline"
            mb={2}
            textAlign="center"
          >
            Compensation Structure
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography>
              <strong>Name:</strong> {data.employeeName}
            </Typography>
            <Typography>
              <strong>Designation:</strong> {data.designation || data.position}
            </Typography>
            <Typography>
              <strong>Location:</strong> {data.location || company.city}
            </Typography>
          </Box>

          <Table
            sx={{
              width: "100%",
              border: "1px solid black",
              borderCollapse: "collapse",
              mt: 1,
              position: "relative",
              zIndex: 1,
              "& td": {
                border: "1px solid black",
                padding: "8px 12px",
                fontSize: "14px",
              },
              "& th": {
                border: "1px solid black",
                padding: "8px 12px",
                fontSize: "14px",
              },
            }}
          >
            <TableBody>
              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                <TableCell>
                  <strong>Components</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Amount/Month (Rs.)</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Amount/Annum (Rs.)</strong>
                </TableCell>
              </TableRow>

              {salaryRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row[0]}</TableCell>
                  <TableCell align="center">
                    {Math.round(row[1]).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell align="center">
                    {Math.round(row[2]).toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                <TableCell>
                  <strong>Total CTC</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>{Math.round(totalMonthly).toLocaleString("en-IN")}</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>{Math.round(totalAnnual).toLocaleString("en-IN")}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>


        </Box>
      </PageLayout>
    </Box>
  );
};

export default CubeageConfirmationLetter;
