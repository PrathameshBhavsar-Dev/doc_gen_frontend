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
   // Helper to keep 2 decimals everywhere
const round0 = (num) => Math.round(num);

  // Source of truth
  const monthlyCTC = round0(Number(data.stipend || 0));

  // ================= PERCENTAGE BREAKUP =================
const basicMonthly = round0(monthlyCTC * 0.40);
const hraMonthly = round0(monthlyCTC * 0.18);
const daMonthly = round0(monthlyCTC * 0.12);
const specialMonthly = round0(monthlyCTC * 0.16);
const foodMonthly = round0(monthlyCTC * 0.06);
const miscMonthly = round0(monthlyCTC * 0.08); // 8%

// ================= ANNUAL VALUES =================
const basicAnnual = round0(basicMonthly * 12);
const hraAnnual = round0(hraMonthly * 12);
const daAnnual = round0(daMonthly * 12);
const specialAnnual = round0(specialMonthly * 12);
const foodAnnual = round0(foodMonthly * 12);
const miscAnnual = round0(miscMonthly * 12);

// ================= SALARY TABLE STRUCTURE =================
const salaryRows = [
  ["Basic", basicMonthly, basicAnnual],
  ["House Rent Allowance", hraMonthly, hraAnnual],
  ["Dearness Allowance", daMonthly, daAnnual],
  ["Special Allowance", specialMonthly, specialAnnual],
  ["Food Allowance", foodMonthly, foodAnnual],
  ["Misc. Allowance", miscMonthly, miscAnnual],
];

// ================= TOTALS =================
const totalMonthly = round0(
  salaryRows.reduce((sum, row) => sum + row[1], 0)
);

const totalAnnual = round0(
  salaryRows.reduce((sum, row) => sum + row[2], 0)
);


  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <A4Page headerSrc={company?.header} footerSrc={company?.footer}>
        <Box sx={{ pb: 4, pl: 4, pr: 4 }}>
          {/* <Typography sx={{ ...TEXT, mb: 3 }}>
            {formatDate(data.issueDate)}
          </Typography> */}

          <Typography sx={{ ...TEXT }}>
            <b>Name</b> &nbsp;&nbsp;&nbsp;&nbsp;: {pronouns.prefix} {data.employeeName}
          </Typography>

          <Typography sx={{ ...TEXT, mt: 1 }}>
            <b>Address</b> &nbsp;&nbsp;: {data.address}
          </Typography>

          <Typography sx={{ ...TEXT, mt: 3 }}>
            
             <b> Subject :</b> Letter of intent for the position of Internship as a{" "}
              <b>{data.designation}</b>
            
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
            If there is any change in the date of joining, changes can be taken
            under consideration. Your total gross salary will be Rs.{" "}
            <b>{formatCurrency(totalAnnual)}</b> (
            <b>{numberToWords(totalAnnual)}</b>) per year. Subject to various deductions as per companies and government policy.
          </Typography>

          {/* <Typography sx={{ ...TEXT, mt: 2 }}>
            Subject to various deductions as per companies and government policy.
          </Typography> */}

          {/* <Typography sx={{ ...TEXT, mt: 2 }}>
            The roles and responsibilities and other terms and conditions of your
            employment will be specified in your letter of appointment.
          </Typography> */}

          <Typography sx={{ ...TEXT, mt: 2 }}>
            We welcome you to <b>{company.name}</b> family and
            hope it would be the beginning of a long and mutually beneficial association. Kindly acknowledge the duplicate copy of this letter as acceptance of
            this offer.
          </Typography>

          {/* <Typography sx={{ ...TEXT, mt: 2 }}>
            
          </Typography> */}

          <Typography sx={{ ...TEXT, mt: 4 }}>
           Best Regards,
          </Typography>

          <Typography sx={{ ...TEXT }}>
                  <b>Sweety Khade</b>
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
                  <b>CEO & Managing Director</b>
                </Typography>
                {/* <Typography sx={{ ...TEXT }}>
                  HR Department, Pune
                </Typography> */}
              </Box>

              {/* <Box>
                <Typography sx={{ ...TEXT }}>
                  Signature: ___________________
                </Typography>
                <Typography sx={{ ...TEXT, mt: 1 }}>
                  Candidate Name: {data.employeeName}
                </Typography>
              </Box> */}
            </Box>
          </Box>
        </Box>
      </A4Page>

      {/* ================= PAGE 2 ================= */}
      <A4Page headerSrc={company?.header} footerSrc={company?.footer}>
        
                  <Typography
                    align="center"
                    fontWeight={600}
                    mb={8}
                    sx={{ textDecoration: "underline" }}
                  >
                    Salary Annexure
                  </Typography>
        
        
                  {/* <Box mb={6} fontSize="13px">
                    <Typography sx={{ fontWeight: 500 }}>Employee Code : {data.employeeId}</Typography>
                    <Typography sx={{ fontWeight: 500 }}>Employee Name : {data.employeeName}</Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      Effective Date :{" "}
                      {new Date(data.effectiveDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </Typography>
                  </Box> */}
        
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
                      <TableRow
  sx={{
    backgroundColor: "#0f0f0f",
    "& .MuiTableCell-root": {
      color: "#fff !important ",
      fontWeight: 700,
    },
  }}
>
  <TableCell align="right">Monthly Component</TableCell>
  <TableCell>Amount (Rs.)</TableCell>
  <TableCell align="right">Yearly Component</TableCell>
  <TableCell>Amount (Rs.)</TableCell>
</TableRow>
        
                      <TableRow>
                        <TableCell>Basic</TableCell>
                        <TableCell align="right">{basicMonthly}</TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">{basicAnnual}</TableCell>
                      </TableRow>
        
        
                      <TableRow>
                        <TableCell>House Rent Allowance</TableCell>
                        <TableCell align="right">{hraMonthly}</TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">{hraAnnual}</TableCell>
                      </TableRow>
        
                      <TableRow>
                        <TableCell>Dearness Allowance</TableCell>
                        <TableCell align="right">{daMonthly}</TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">{daAnnual}</TableCell>
                      </TableRow>
        
                      <TableRow>
                        <TableCell>Special Allowance</TableCell>
                        <TableCell align="right">{specialMonthly}</TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">{specialAnnual}</TableCell>
                      </TableRow>
        
                      <TableRow>
                        <TableCell>Food Allowance</TableCell>
                        <TableCell align="right">{foodMonthly}</TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">{foodAnnual}</TableCell>
                      </TableRow>
        
                      <TableRow>
                        <TableCell>Misc. Allowance</TableCell>
                        <TableCell align="right">{miscMonthly}</TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">{miscAnnual}</TableCell>
                      </TableRow>
        
                      <TableRow sx={{
    backgroundColor: "#0f0f0f",
    "& .MuiTableCell-root": {
      color: "#fff !important ",
      fontWeight: 700,
    },
  }}>
                        <TableCell sx={{ fontWeight: 700 }}>Monthly Gross</TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="right">
                          {totalMonthly}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Annual CTC</TableCell>
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
                
      </A4Page>
    </>
  );
};

export default JDITPaidInternshipLetter;
