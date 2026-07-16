import React from "react";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import A4Layout from "../../../../layout/A4Page";
import { formatCurrency } from "../../../../../utils/salaryCalculations";

import signature from "../../../../../assets/images/Newagecloud/Newage_signature.png";
import stamp from "../../../../../assets/images/Newagecloud/Newage_stamp.png";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    })
    : "";

/* ================= TEXT STYLE (IMAGE MATCH) ================= */
const TEXT = {
  fontFamily: '"Cambria", "Georgia", serif',
  fontSize: "14.8px",
  lineHeight: 1.65,
  color: "#222",
};

const SMALL_TEXT = {
  fontFamily: '"Cambria", "Georgia", serif',
  fontSize: "14.5px",
  lineHeight: 1.6,
};

const CELL_BASE = {
  border: "1px solid #000",
  verticalAlign: "top",   // force explicit, MUI default is unreliable here
  lineHeight: 1.4,           // explicit line-height, don't let it inherit
  padding: "0px 12px 12px 12px",
  fontFamily: "Arial, sans-serif"
};

const CELL_HEAD = {
  ...CELL_BASE,
  fontWeight: 600,
  backgroundColor: "#3dd6f1",
};

const NeweageOffer = ({ company, data }) => {
  if (!company || !data) return null;

  const round0 = (num) => Math.round(Number(num) || 0);
  const annualCTC = round0(data.joiningCTC || data.salary || 0);
  const monthlyCTC = round0(annualCTC / 12);

  const pfMonthly = 3750;

  const hraMonthly = round0(monthlyCTC * 0.18);
  const daMonthly = round0(monthlyCTC * 0.12);
  const specialMonthly = round0(monthlyCTC * 0.16);
  const foodMonthly = round0(monthlyCTC * 0.06);

  const basicMonthly = round0(
    monthlyCTC -
    (hraMonthly + daMonthly + specialMonthly + foodMonthly + pfMonthly)
  );

  const salaryComponents = [
    { name: "Basic", monthly: basicMonthly, annual: basicMonthly * 12 },
    {
      name: "House Rent Allowance",
      monthly: hraMonthly,
      annual: hraMonthly * 12,
    },
    { name: "Dearness Allowance", monthly: daMonthly, annual: daMonthly * 12 },
    {
      name: "Special Allowance",
      monthly: specialMonthly,
      annual: specialMonthly * 12,
    },
    { name: "Food Allowance", monthly: foodMonthly, annual: foodMonthly * 12 },
    {
      name: "Provident Fund (PF)",
      monthly: pfMonthly,
      annual: pfMonthly * 12,
    },
  ];

  const {
    employeeName = "",
    joiningDate = "",
  } = data;

  const position = data.joiningDesignation ?? data.position ?? "";
  const issueDate = data?.offer_letter?.issueDate ?? data?.issueDate;

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Box
          sx={{
            px: 4,
            // pt: 2,
            pb: "160px", // IMPORTANT: creates safe space above footer
            minHeight: "100%",
            position: "relative",
          }}
        >
          <Typography
            align="center"
            sx={{
              ...TEXT,
              fontWeight: 600,
              textDecoration: "underline",
              textUnderlineOffset: "8px",
              mb: 1,
            }}
          >
            Offer Letter
          </Typography>
          <Typography sx={{ ...TEXT, mb: 1 }}>
            {formatDate(issueDate)}
          </Typography>

          <Typography sx={{ ...TEXT, mb: 1 }}>
            <b>Name</b> : {employeeName}
          </Typography>

          <Typography sx={{ ...TEXT, mb: 2 }}>
            <b>Designation</b> : {position}
          </Typography>

          <Typography sx={{ ...TEXT, mb: 2 }}>
            Dear {employeeName.split(" ")[0]},
          </Typography>

          <Typography sx={{ ...TEXT, mb: 2 }}>
            Congratulations! NEWEAGE CLOUD SOFTWARE SERVICES Pvt. Ltd. is
            excited to call you our new <b>{position}</b>.
          </Typography>

          <Typography sx={{ ...TEXT, mb: 2 }}>
            We'll focus on wrapping up a few more formalities, including the
            successful completion of your [background check, drug screening,
            reference check, etc.], and aim to get you settled into your new
            role by <b>{formatDate(joiningDate)}</b>.
          </Typography>

          <Typography sx={{ ...TEXT, mb: 2 }}>
            Keep reading to learn more about this opportunity
            and—hopefully—answer any lingering questions you may have.
          </Typography>

          <Typography sx={{ ...TEXT, mb: 2 }}>
            NEWEAGE CLOUD SOFTWARE SERVICES Pvt. Ltd. will start you out at{" "}
            <b>{formatCurrency(annualCTC)}</b> per year. You can expect to
            receive payment monthly.
          </Typography>

          {/* <Typography sx={{ ...TEXT, mb: 2 }}>
            You’ll also have access to some awesome perks.
          </Typography> */}

          <Typography sx={{ ...TEXT, mb: 2 }}>
            Please keep in mind, this employment offer is in no way a legally
            binding contract. As an at-will employee, both you and NEWEAGE CLOUD
            SOFTWARE SERVICES Pvt. Ltd. are able to terminate employment for any
            reason at any time.
          </Typography>

          <Typography sx={{ ...TEXT, mb: 2 }}>
            NEWEAGE CLOUD SOFTWARE SERVICES Pvt. Ltd. looks forward to bringing
            you on board! If you have any questions, please feel free to reach
            out at any time and we’ll be more than happy to help you.
          </Typography>

          {/* <Typography sx={{ ...TEXT, mb: 2 }}>Yours Sincerely,</Typography> */}

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            {/* COMPANY */}
            <Box>
              <Typography fontSize={15}>Yours faithfully,</Typography>
              <Typography fontWeight={700} fontSize={15} marginTop={3}>
                For {company.name}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 1, alignItems: "center" }}>
                {company.signature && (
                  <Box
                    component="img"
                    src={company.signature}
                    alt="signature"
                    sx={{
                      height: "60px",
                      width: "auto",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                )}
                {company.stamp && (
                  <Box
                    component="img"
                    src={company.stamp}
                    alt="stamp"
                    sx={{
                      height: "80px",
                      width: "auto",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                )}
              </Box>

              <Typography fontWeight={600} mt={-2}>
                {company.hrName}
              </Typography>
              <Typography fontSize={13}>
                <strong>HR Relations Lead</strong>
              </Typography>
            </Box>

            {/* ACCEPTANCE */}
            <Box>
              <Typography mt={10}>Signature: ______________</Typography>
              <Typography mt={2}>Name: {data.employeeName}</Typography>
            </Box>
          </Box>
        </Box>
      </A4Layout>

      {/* ================= PAGE 2 : SALARY ANNEXURE ================= */}
      <A4Layout headerSrc={company.headerImage} footerSrc={company.footerImage}>
        <Typography
          align="center"
          fontWeight={900}
          sx={{ ...TEXT, mb: 3, mt: 8 }}
        >
          <b>Annexure A Salary Structure</b>
        </Typography>

        <TableContainer>
          <Table
            size="small"
            sx={{
              border: "1px solid #000",
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={CELL_HEAD}>Salary Components</TableCell>
                <TableCell align="center" sx={CELL_HEAD}>Per month (Rs.)</TableCell>
                <TableCell align="center" sx={CELL_HEAD}>Per Annum (Rs.)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryComponents.map((row, i) => (
                <TableRow key={i}>
                  <TableCell sx={CELL_BASE}>{row.name}</TableCell>
                  <TableCell align="center" sx={CELL_BASE}>{formatCurrency(row.monthly)}</TableCell>
                  <TableCell align="center" sx={CELL_BASE}>{formatCurrency(row.annual)}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell sx={CELL_HEAD}>Total Monthly Gross Salary</TableCell>
                <TableCell align="center" sx={CELL_HEAD}>{formatCurrency(monthlyCTC)}</TableCell>
                <TableCell align="center" sx={CELL_HEAD}>{formatCurrency(annualCTC)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 12, display: "flex", justifyContent: "space-between" }}>
          {/* COMPANY */}
          <Box>
            {/* <Typography fontSize={15}>Yours faithfully,</Typography>
            <Typography fontWeight={700} fontSize={15} marginTop={3}>
              For {company.name}
            </Typography> */}

            <Box sx={{ display: "flex", gap: 2, mt: 1, alignItems: "center" }}>
              {company.signature && (
                <Box
                  component="img"
                  src={company.signature}
                  alt="signature"
                  sx={{
                    height: "60px",
                    width: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              )}
              {company.stamp && (
                <Box
                  component="img"
                  src={company.stamp}
                  alt="stamp"
                  sx={{
                    height: "80px",
                    width: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              )}
            </Box>

            <Typography fontWeight={600} mt={2}>
              {company.hrName}
            </Typography>
            <Typography fontSize={13}>
              <strong>HR Relations Lead</strong>
            </Typography>
          </Box>

          {/* ACCEPTANCE */}
          <Box>
            <Typography mt={12}>Signature: ______________</Typography>
            <Typography mt={2}>Name: {data.employeeName}</Typography>
          </Box>
        </Box>
      </A4Layout>
    </>
  );
};

export default NeweageOffer;
