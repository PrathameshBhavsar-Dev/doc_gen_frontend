import React from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { formatCurrency } from "../../utils/salaryCalculations";



const SalaryStructureTable = ({
  salaryRows = [],
  totalMonthly = 0,
  totalAnnual = 0,
  
}) => {
  return (
    <>
      <Typography
        align="center"
        fontWeight={700}
        mb={3}
        sx={{ fontFamily: "Bahnschrift" }}
      >
        Annexure A Salary Structure{" "}
      </Typography>

      

      {/* <Typography sx={{ fontFamily: "Bahnschrift" }} mb={0.5}>
        <b>Name:</b> {data?.mrms} {data?.employeeName}
      </Typography>

      <Typography sx={{ fontFamily: "Bahnschrift" }} mb={0.5}>
        <b>Designation:</b> {data?.position}
      </Typography>

      <Typography sx={{ fontFamily: "Bahnschrift" }} mb={2}>
        <b>Date of Joining:</b> {formatDate?.(data?.joiningDate)}
      </Typography> */}

      <Table
        sx={{
          width: "100%",
          border: "1px solid #000",
          "& th, & td": {
            border: "1px solid #000",
            padding: "6px",
            fontSize: "14px",
          },
        }}
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#a0ed64" }}>
            <TableCell sx={{ fontFamily: "Bahnschrift" }}>
              <b>Salary Components</b>
            </TableCell>
            <TableCell align="right" sx={{ fontFamily: "Bahnschrift" }}>
              <b>Per month (Rs.)</b>
            </TableCell>
            <TableCell align="right" sx={{ fontFamily: "Bahnschrift" }}>
              <b>Per Annum (Rs.)</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {salaryRows.map(([name, monthly, annual], i) => (
            <TableRow key={i}>
              <TableCell>{name}</TableCell>
              <TableCell align="right">{formatCurrency(monthly)}</TableCell>
              <TableCell align="right">{formatCurrency(annual)}</TableCell>
            </TableRow>
          ))}

          <TableRow sx={{ backgroundColor: "#a0ed64" }}>
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
      
    </>
  );
};

export default SalaryStructureTable;
