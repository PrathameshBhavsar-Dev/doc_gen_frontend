import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,

  TableRow,
} from "@mui/material";
import A4Page from "../../../../layout/A4Page";

/* ================= SALARY UTILITIES ================= */
import {
  formatCurrency,
  numberToWords,
} from "../../../../../utils/salaryCalculations";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    })
    : "—";

const TEXT = {
  fontSize: "14px",
  lineHeight: 1.8,
};

const JDITPaidInternshipLetter = ({
  company,
  data = {},
  employeeName = "—",
  address = "—",
  internshipRole = "Trainee Full Stack Developer",
  joiningDate,
  issueDate,
  stipend = 0,
  companyName = "JDIT Business Solutions Pvt. Ltd.",
}) => {
  /* ================= PRONOUNS ================= */
  const title = (data?.mrms || "ms.").toLowerCase();

  const pronouns =
    title === "mr."
      ? { prefix: "Mr.", subject: "he", possessive: "his" }
      : title === "mx."
        ? { prefix: "Mx.", subject: "they", possessive: "their" }
        : { prefix: "Ms.", subject: "she", possessive: "her" };

  /* ================= SALARY ================= */
  const monthlyStipend = Number(data?.stipend ?? stipend) || 0;
  const annualStipend = monthlyStipend * 12;

  /* ================= SALARY BREAKUP (DYNAMIC %) ================= */
  const salaryComponents = useMemo(() => {
    const breakup = [
      { name: "Basic", percent: 40 },
      { name: "House Rent Allowance", percent: 18 },
      { name: "Dearness Allowance", percent: 12 },
      { name: "Special Allowance", percent: 16 },
      { name: "Food Allowance", percent: 6 },
      { name: "Misc. Allowance", percent: 8 },
    ];

    return breakup.map((item) => {
      const monthly = Math.round((monthlyStipend * item.percent) / 100);
      return {
        name: item.name,
        monthly,
        annual: monthly * 12,
      };
    });
  }, [monthlyStipend]);

  const totalMonthly = salaryComponents.reduce(
    (sum, row) => sum + row.monthly,
    0
  );

  const totalAnnual = totalMonthly * 12;

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company?.header} footerSrc={company?.footer}>
        <Box sx={{ pb: 4, pl: 4, pr: 4 }}>
          <Typography sx={{ ...TEXT, mb: 3 }}>
            {formatDate(data.issueDate)}
          </Typography>

          <Typography sx={{ ...TEXT }}>
            <b>Name</b> &nbsp;&nbsp;&nbsp;&nbsp;: {pronouns.prefix} {data.employeeName}
          </Typography>

          <Typography sx={{ ...TEXT, mt: 1 }}>
            <b>Address</b> &nbsp;&nbsp;: {data.address}
          </Typography>

          <Typography sx={{ ...TEXT, mt: 3 }}>
            <b>
              Subject : Letter of intent for the position of Internship as a{" "}
              {data.designation}
            </b>
          </Typography>

          <Typography sx={{ ...TEXT, mt: 4 }}>
            Dear {data.employeeName},
          </Typography>

          <Typography sx={{ ...TEXT, mt: 2 }}>
            We are pleased to offer you the Internship position of{" "}
            <b>{data.designation}</b>. As discussed by us, you are requested to join
            on <b>{formatDate(data.startDate)}</b>.
          </Typography>

          <Typography sx={{ ...TEXT, mt: 2 }}>
            If there is any change in the date of joining, the same may be taken
            under consideration. Your total gross salary will be Rs.{" "}
            <b>{formatCurrency(totalAnnual)}</b> (
            <b>{numberToWords(totalAnnual)}</b>) per year.
          </Typography>

          <Typography sx={{ ...TEXT, mt: 2 }}>
            Subject to various deductions as per company and government policy.
          </Typography>

          <Typography sx={{ ...TEXT, mt: 2 }}>
            The roles and responsibilities and other terms and conditions of your
            employment will be specified in your letter of appointment.
          </Typography>

          <Typography sx={{ ...TEXT, mt: 2 }}>
            We welcome {pronouns.subject} to the <b>{company.name}</b> family and
            hope this association marks the beginning of a long and mutually
            beneficial relationship.
          </Typography>

          <Typography sx={{ ...TEXT, mt: 2 }}>
            Kindly acknowledge the duplicate copy of this letter as acceptance of
            this offer.
          </Typography>

          <Typography sx={{ ...TEXT, mt: 4 }}>
            Yours Sincerely,
          </Typography>

          <Typography sx={{ ...TEXT, mt: 3 }}>
            <b>For {company.name}</b>
          </Typography>

          <Box
            
          >

            <Box sx={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
              {company?.signature && (
                <Box
                  component="img"
                  src={company.signature}
                  sx={{ height: "50px" }}
                />
              )}
              {company?.stamp && (
                <Box
                  component="img"
                  src={company.stamp}
                  sx={{ height: "100px" }}
                />
              )}
            </Box>
            <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
            }}
            >

              <Box>
                <Typography sx={{ ...TEXT }}>
                  <b>Sweety Khade</b>
                </Typography>
                <Typography sx={{ ...TEXT }}>
                  HR Department, Pune
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ ...TEXT }}>
                  Signature: ___________________
                </Typography>
                <Typography sx={{ ...TEXT, mt: 1 }}>
                  Candidate Name: {data.employeeName}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company?.header} footerSrc={company?.footer}>
        <Box sx={{ p: 4 }}>
          <Typography
            align="center"
            sx={{ fontSize: "16px", fontWeight: 700, mb: 3 }}
          >
            ANNEXURE – A
            <br />
            SALARY STRUCTURE
          </Typography>

          <Table
            size="small"
            sx={{
              width: "100%",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#000000ff", color: "#df1c1cff !important" }}>
                <TableCell
                  sx={{
                    border: "1px solid black",
                    fontWeight: 700,
                    color: "#df1c1cff !important", // 👈 red text
                  }}
                >
                  Salary Components
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    border: "1px solid black",
                    fontWeight: 700,
                    color: "#df1c1cff !important", // 👈 red text
                  }}
                >
                  Per Month (Rs.)
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    border: "1px solid black",
                    fontWeight: 700,
                    color: "#df1c1cff !important", // 👈 red text
                  }}
                >
                  Per Annum (Rs.)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {salaryComponents.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: "1px solid black" }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="right" sx={{ border: "1px solid black" }}>
                    {formatCurrency(row.monthly)}
                  </TableCell>
                  <TableCell align="right" sx={{ border: "1px solid black" }}>
                    {formatCurrency(row.annual)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell sx={{ border: "1px solid black", fontWeight: 700 }}>
                  Total Monthly Gross Salary
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: "1px solid black", fontWeight: 700 }}
                >
                  {formatCurrency(totalMonthly)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: "1px solid black", fontWeight: 700 }}
                >
                  {formatCurrency(totalAnnual)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

        </Box>
      </A4Page>
    </>
  );
};

export default JDITPaidInternshipLetter;
