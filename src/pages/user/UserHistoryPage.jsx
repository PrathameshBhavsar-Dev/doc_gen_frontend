import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Download, Visibility } from "@mui/icons-material";
import profile from "../../assets/images/profile.png";
import company_icon from "../../assets/images/companies_icon.png";
import axios from "axios";

import {
  companies as mockCompanies,
  documentTypes as mockDocumentTypes,
} from "../../components/constant/publicData/mockData";

const UserHistoryPage = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [docType, setDocType] = useState("");
  const [company, setCompany] = useState("");
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState([]);

  // ✅ GROUP BY EMPLOYEE
  const groupByEmployee = (documents) => {
    const map = {};

    documents.forEach((doc) => {
      const empId = doc.employeeId;

      if (!map[empId]) {
        map[empId] = {
          name: doc.employeeName,
          id: doc.employeeId,
          company: doc.company,
          generatedBy: doc.issuedBy,
          date: doc.createdAt,
          status: doc.paymentStatus,
          totalDocs: 0,
          documents: [],
        };
      }

      map[empId].documents.push(doc);
      map[empId].totalDocs += 1;
    });

    return Object.values(map);
  };

  // ✅ API CALL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/documents/getalldoc");
        const grouped = groupByEmployee(res.data.data);
        setTableData(grouped);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // ✅ FILTER
  const filteredData = tableData.filter((item) => {
    const itemDate = dayjs(item.date);

    if (
      search &&
      !item.name.toLowerCase().includes(search.toLowerCase()) &&
      !item.id.toLowerCase().includes(search.toLowerCase())
    ) return false;

    if (company && item.company !== company) return false;
    if (month && itemDate.format("MMMM") !== month) return false;
    if (year && itemDate.year() !== Number(year)) return false;
    if (selectedDate && !itemDate.isSame(selectedDate, "day")) return false;

    return true;
  });

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const years = Array.from(
    { length: new Date().getFullYear() - 1990 + 1 },
    (_, i) => new Date().getFullYear() - i
  );

  const companies = mockCompanies.map((c) => c.shortName);
  const documentTypes = mockDocumentTypes.map((d) => d.name);

  return (
    <Box sx={{ minHeight: "100vh", width: "100%" }}>
      
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography sx={{ fontWeight: 600, color: "#1D293D", fontSize: "22px" }}>
          Document History
        </Typography>

        <Button
          variant="contained"
          startIcon={<Download />}
          sx={{
            background: "linear-gradient(to right, #21206C, #B27AD5)",
            borderRadius: "10px",
            textTransform: "none",
          }}
        >
          Export All
        </Button>
      </Box>

      {/* FILTER */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: "16px" }}>
        <TextField
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by employee name or ID..."
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              height: 48,
              borderRadius: "14px",
              backgroundColor: "#F3F4F6",
            },
          }}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "repeat(5, 1fr)" },
            gap: 3,
          }}
        >
          <FormControl fullWidth>
            <Select value={docType} onChange={(e) => setDocType(e.target.value)} displayEmpty>
              <MenuItem value="">Document Type</MenuItem>
              {documentTypes.map((d) => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Select value={company} onChange={(e) => setCompany(e.target.value)} displayEmpty>
              <MenuItem value="">Company</MenuItem>
              {companies.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Select value={month} onChange={(e) => setMonth(e.target.value)} displayEmpty>
              <MenuItem value="">Month</MenuItem>
              {months.map((m) => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Select value={year} onChange={(e) => setYear(e.target.value)} displayEmpty>
              <MenuItem value="">Year</MenuItem>
              {years.map((y) => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={selectedDate} onChange={setSelectedDate} />
          </LocalizationProvider>
        </Box>
      </Paper>

      {/* TABLE */}
      <Paper sx={{ borderRadius: "16px", overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ background: "#f0f4ff" }}>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Generated By</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Total Docs</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        background:
                          "linear-gradient(to right, #393B8B, #AD78D2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img src={profile} alt="" width={20} />
                    </Box>

                    <Typography fontSize={14}>{row.name}</Typography>
                  </Box>
                </TableCell>

                <TableCell>{row.id}</TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <img src={company_icon} alt="" width={16} />
                    <Typography fontSize={14}>{row.company}</Typography>
                  </Box>
                </TableCell>

                <TableCell>{row.generatedBy}</TableCell>

                <TableCell>
                  {dayjs(row.date).format("DD MMM YYYY")}
                </TableCell>

                <TableCell>
                  <Chip
                    label={row.status}
                    sx={{
                      backgroundColor:
                        row.status === "Completed" ? "#DCFCE7" : "#FEF9C3",
                      color:
                        row.status === "Completed" ? "#16A34A" : "#CA8A04",
                      fontWeight: 500,
                      borderRadius: "8px",
                    }}
                  />
                </TableCell>

                <TableCell>{row.totalDocs}</TableCell>

                <TableCell align="center">
                  <IconButton
                    sx={{
                      backgroundColor: "#EEF2FF",
                      "&:hover": { backgroundColor: "#E0E7FF" },
                    }}
                    onClick={() => console.log(row.documents)}
                  >
                    <Visibility sx={{ color: "#6D5DF6" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default UserHistoryPage;