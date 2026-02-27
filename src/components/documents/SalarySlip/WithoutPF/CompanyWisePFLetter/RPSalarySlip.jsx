
import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

import { formatCurrency, getProfessionalTax } from "../../../../../utils/salaryCalculations";
import A4Page from "../../../../layout/A4Page";

/* 🔢 Number to Words (Indian System) */
const numberToWords = (num = 0) => {
  if (!num) return "Zero Rupees Only";

  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const inWords = (n) => {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + inWords(n % 100) : "");
    if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + inWords(n % 100000) : "");
    return inWords(Math.floor(n / 10000000)) + " Crore";
  };

  return `${inWords(Math.round(num))} Rupees Only`;
};

const RPSalarySlip = ({ company = {}, data = {} }) => {
  /* ===== EMPLOYEE DETAILS ===== */
  const {
    employeeName = "-",
    employeeId = "-",
    gender = "-",
    department = "-",
    designation = "-",
    doj = "-",
    dob = "-",
    pan = "-",
    mode = "Bank Transfer",
    workdays = "-",
    month = "",
    totalSalary = 0,
    otherDeduction = 2000,
  } = data;

  const [year, monthNum] = month.split("-");
  const monthName = new Date(year, monthNum - 1).toLocaleString("en-IN", { month: "long" });
  const salaryMonth = `${monthName} ${year}`;

  // /* ===== DEVCONS SALARY LOGIC (USED FOR RP) ===== */
  // const grossSalary = Number(totalSalary);

  // const basic = Math.round(grossSalary * 0.40);
  // const hra = Math.round(grossSalary * 0.18);
  // const conveyance = Math.round(grossSalary * 0.14);
  // const food = Math.round(grossSalary * 0.04);
  // const special = Math.round(grossSalary * 0.16);
  // const others = Math.round(grossSalary * 0.06);

  // const pt = getProfessionalTax(month, grossSalary);
  // const totalEarning =
  //   basic + hra + conveyance + food + special + others;

  // const totalDeduction = pt + Number(otherDeduction);
  // const netPay = totalEarning - totalDeduction;
   const round2 = (num) => Number(num.toFixed(2));

  const monthlyGross = round2(Number(totalSalary || 0));
  
  // Percentages (TOTAL = 100%)
  const PERCENT = {
    basic: 0.40,
    hra: 0.18,
    da: 0.12,
    special: 0.16,
    food: 0.06,
    misc: 0.08,
  };
  
  // Monthly breakup
  const basic      = round2(monthlyGross * PERCENT.basic);
  const hra        = round2(monthlyGross * PERCENT.hra);
  const conveyance = round2(monthlyGross * PERCENT.da);     // DA
  const special    = round2(monthlyGross * PERCENT.special);
  const food       = round2(monthlyGross * PERCENT.food);
  const others     = round2(monthlyGross * PERCENT.misc);
  
  // Totals
  const totalEarning =
    basic +
    hra +
    conveyance +
    special +
    food +
    others;
  
  // Deductions
  const pt = getProfessionalTax(month, totalEarning);
  const totalDeduction = round2(pt + Number(otherDeduction || 0));
  const netPay = round2(totalEarning - totalDeduction);
  
  

  return (
        <A4Page
          headerSrc={company.header}
          footerSrc={company.footer}
          
          
        >
    
     
    
      

      {/* CONTENT */}
       <TableContainer
              component={Paper}
              sx={{
                border: "1.5px solid black",
                borderRadius: 0,
                mt: "5mm",
                boxShadow: "none",
                "& .MuiTableCell-root": {
                  border: "1px solid black",
                  fontSize: "11pt",
                  padding: "6px 8px",
                },
              }}
            >
              <Table size="small">
                <TableBody>
                  {/* HEADER */}
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold", fontSize: "14pt" }}>
                      {company.name}
                    </TableCell>
                  </TableRow>
      
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold" }}>
                      {company.address}
                    </TableCell>
                  </TableRow>
      
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ fontWeight: "bold" }}>
                      Salary Slip {salaryMonth}
                    </TableCell>
                  </TableRow>
      
                  {/* EMPLOYEE DETAILS */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Employee Name</TableCell>
                    <TableCell>{employeeName}</TableCell>
                    <TableCell>Employee ID</TableCell>
                    <TableCell>{employeeId}</TableCell>
                  </TableRow>
      
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Gender</TableCell>
                    <TableCell>{gender}</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>{department}</TableCell>
                  </TableRow>
      
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>DOJ</TableCell>
                    <TableCell>{doj}</TableCell>
                    <TableCell>PAN</TableCell>
                    <TableCell>{pan}</TableCell>
                  </TableRow>
      
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Designation</TableCell>
                    <TableCell>{designation}</TableCell>
                    <TableCell>DOB</TableCell>
                    <TableCell>{dob}</TableCell>
                  </TableRow>
      
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Mode</TableCell>
                    <TableCell>{mode}</TableCell>
                    <TableCell>Working Days</TableCell>
                    <TableCell>{workdays}</TableCell>
                  </TableRow>
      
                  {/* EARNINGS HEADER */}
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Earnings</TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Amount</TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Deductions</TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Amount</TableCell>
                  </TableRow>
      
                  {/* EARNINGS */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>BASIC</TableCell>
                    <TableCell align="right">{formatCurrency(basic)}</TableCell>
                    <TableCell>PT</TableCell>
                    <TableCell align="right">{formatCurrency(pt)}</TableCell>
                  </TableRow>
      
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>HRA</TableCell>
                    <TableCell align="right">{formatCurrency(hra)}</TableCell>
                    <TableCell>Other Deduction</TableCell>
                    <TableCell align="right">{formatCurrency(otherDeduction)}</TableCell>
                  </TableRow>
      
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>DEARNESS ALLOWANCE</TableCell>
                    <TableCell align="right">{formatCurrency(conveyance)}</TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
      
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>SPECIAL ALLOWANCE</TableCell>
                    <TableCell align="right">{formatCurrency(special)}</TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
      
                  <TableRow>  
                    <TableCell sx={{ fontWeight: 600 }}>FOOD ALLOWANCE</TableCell>
                    <TableCell align="right">{formatCurrency(food)}</TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
      
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>MISC ALLOWANCE</TableCell>
                    <TableCell align="right">{formatCurrency(others)}</TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
      
                  {/* TOTAL */}
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>{formatCurrency(totalEarning)}</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Total Deduction</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>{formatCurrency(totalDeduction)}</TableCell>
                  </TableRow>
      
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Net Pay</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>{formatCurrency(netPay)}</TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
      
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>In Words</TableCell>
                    <TableCell colSpan={3}>{numberToWords(netPay)}</TableCell>
                  </TableRow>
      
                  {/* SIGNATURE */}
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell align="center">
                      {company?.stamp && <img src={company.stamp} height={55} alt="Stamp" />}
                    </TableCell>
                    <TableCell align="center">
                      {company?.signature && <img src={company.signature} height={40} alt="Signature" />}
                      <Typography fontWeight="bold">Signature</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

     </A4Page>
  );
};

export default RPSalarySlip;
