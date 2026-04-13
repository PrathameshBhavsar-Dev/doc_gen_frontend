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
import { ArrowBackIosNew } from "@mui/icons-material";
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
          generatedBy:
            typeof doc.issuedBy === "object"
              ? doc.issuedBy?.name
              : doc.issuedBy,
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
        const res = await axios.get(
          "http://localhost:5000/api/v1/documents/getalldoc",
        );
        const grouped = groupByEmployee(res.data.data);
        setTableData(grouped);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // 🚫 EXCLUDE DOCUMENT TYPES
  const excludedDocs = [
    "Employment Verification Letter",
    "Promotion Letter",
    "Warning Letter",
    "No Objection Certificate (NOC)",
    "Salary Transaction Certificate",
    "Termination Letter",
    "Transfer Letter",
  ];

  const documentTypes = mockDocumentTypes
    .map((d) => d.name)
    .filter((name) => !excludedDocs.includes(name));

  const companies = mockCompanies.map((c) => c.name);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: new Date().getFullYear() - 1990 + 1 },
    (_, i) => new Date().getFullYear() - i,
  );

  // ✅ FILTER LOGIC (UPDATED)
  const filteredData = tableData.filter((item) => {
    const itemDate = dayjs(item.date);

    if (
      search &&
      !item.name.toLowerCase().includes(search.toLowerCase()) &&
      !item.id.toLowerCase().includes(search.toLowerCase())
    )
      return false;

    if (company && item.company !== company) return false;
    if (month && itemDate.format("MMMM") !== month) return false;
    if (year && itemDate.year() !== Number(year)) return false;
    if (selectedDate && !itemDate.isSame(selectedDate, "day")) return false;

    // ✅ DOCUMENT TYPE FILTER
    if (docType) {
      const hasDocType = item.documents.some(
        (doc) => doc.documentType === docType,
      );
      if (!hasDocType) return false;
    }

    return true;
  });

  // ✅ ACTIVE FILTER COUNT
  const activeFilters = [
    search,
    company,
    month,
    year,
    docType,
    selectedDate,
  ].filter(Boolean).length;

  // 🎨 COMMON STYLE
  const selectStyle = {
    height: 44,
    fontSize: "14px",
    color: "#314158",
    borderRadius: "12px",
    // backgroundColor: "#F8F7F4",
    "& .MuiSelect-select": {
      padding: "10px 14px",
      display: "flex",
      alignItems: "center",
    },
    "& fieldset": {
      borderColor: "#E5E3DC",
    },
    "&:hover fieldset": {
      borderColor: "#DAD7CF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#CFCBC3",
    },
  };

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
        {/* LEFT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={() => window.history.back()}
            sx={{
              width: 36,
              height: 36,
              backgroundColor: "#F1F2F6",
              "&:hover": {
                backgroundColor: "#E4E7EC",
              },
            }}
          >
            <ArrowBackIosNew sx={{ fontSize: 16 }} />
          </IconButton>

          <Typography sx={{ fontWeight: 600, fontSize: "22px" }}>
            Document History
          </Typography>
        </Box>

        {/* RIGHT SIDE */}
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
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "16px",
          border: "1px solid #EEECE6",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.04)", // 👈 depth added
        }}
      >
        {/* SEARCH */}
        <TextField
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by employee name, ID, or document type..."
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              height: 48,
              borderRadius: "12px",
              "& fieldset": {
                borderColor: "#E5E3DC",
              },
              "&:hover fieldset": {
                borderColor: "#DAD7CF",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#CFCBC3",
              },
            },
          }}
        />
        {/* FILTER GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "2fr 1fr 1fr 1fr",
            },
            gap: 2,
            alignItems: "end",
          }}
        >
          {/* COMPANY */}
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#314158",
                mb: 0.5,
              }}
            >
              Company
            </Typography>

            <FormControl fullWidth>
              <Select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                displayEmpty
                sx={selectStyle}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: "10px",
                      mt: 1,
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                      "& .MuiMenuItem-root": {
                        fontSize: "14px",
                        padding: "8px 14px",
                      },
                      "& .MuiMenuItem-root:hover": {
                        backgroundColor: "#F3F2EE",
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">Select Company</MenuItem>
                {companies.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* MONTH */}
          <Box>
            <Typography sx={{ fontSize: "16px", color: "#314158", mb: 0.5 }}>
              Select month
            </Typography>

            <FormControl fullWidth>
              <Select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                displayEmpty
                sx={selectStyle}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: "10px",
                      mt: 1,
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                      "& .MuiMenuItem-root": {
                        fontSize: "14px",
                        padding: "8px 14px",
                      },
                      "& .MuiMenuItem-root:hover": {
                        backgroundColor: "#F3F2EE",
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">Select months</MenuItem>
                {months.map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* YEAR */}
          <Box>
            <Typography sx={{ fontSize: "16px", color: "#314158", mb: 0.5 }}>
              Select year
            </Typography>

            <FormControl fullWidth>
              <Select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                displayEmpty
                sx={selectStyle}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: "10px",
                      mt: 1,
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                      "& .MuiMenuItem-root": {
                        fontSize: "14px",
                        padding: "8px 14px",
                      },
                      "& .MuiMenuItem-root:hover": {
                        backgroundColor: "#F3F2EE",
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">Select Year</MenuItem>
                {years.map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* DATE */}
          <Box>
            <Typography sx={{ fontSize: "14px", color: "#314158", mb: 0.5 }}>
              Select date
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    placeholder: "Date",
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        // height: ,
                        color: "#314158",
                        fontSize: "14px",
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: "#E5E3DC",
                        },
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        {/* CLEAR FILTERS */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          {/* <Typography sx={{ fontSize: "13px", color: "#6B7280" }}>
            {activeFilters > 0 ? `${activeFilters} filter(s) applied` : ""}
          </Typography> */}

          <Button
            onClick={() => {
              setSearch("");
              setCompany("");
              setMonth("");
              setYear("");
              setDocType("");
              setSelectedDate(null);
            }}
            sx={{
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 500,
              color: "#5B5BD6",
              borderRadius: "8px",
              px: 2,
              py: 0.5,
              "&:hover": {
                backgroundColor: "#F1F2FF",
              },
            }}
          >
            Clear Filters
          </Button>
        </Box>
      </Paper>

      {/* TABLE */}
      <Paper sx={{ borderRadius: "16px", overflow: "hidden" }}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: "#F8FAFC",
              "& th": {
                fontWeight: 600,
                color: "#475569",
                fontSize: "13px",
                whiteSpace: "nowrap",
              },
            }}
          >
            <TableRow>
              <TableCell sx={{ width: "22%" }}>Employee Name</TableCell>
              <TableCell sx={{ width: "12%" }}>Employee ID</TableCell>
              <TableCell sx={{ width: "28%" }}>Company Name</TableCell>
              <TableCell sx={{ width: "14%" }}>Generated By</TableCell>
              <TableCell sx={{ width: "10%" }}>Date</TableCell>
              <TableCell sx={{ width: "12%" }}>Payment Status</TableCell>
              <TableCell sx={{ width: "6%" }}>Total Docs</TableCell>
              <TableCell sx={{ width: "8%" }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index} hover>
                <TableCell sx={{ width: "2%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        background:
                          "linear-gradient(to right, #5B5BD6, #A78BFA)",
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

                <TableCell sx={{ width: "2%" }}>{row.id}</TableCell>

                <TableCell sx={{ width: "35%" }}>
                  {" "}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    {" "}
                    <img src={company_icon} alt="" width={16} />
                    <Typography fontSize={14}>{row.company}</Typography>
                  </Box>
                </TableCell>

                <TableCell sx={{ width: "5%" }}>{row.generatedBy}</TableCell>

                <TableCell sx={{ width: "10%", whiteSpace: "nowrap" }}>
                  {dayjs(row.date).format("DD MMM YYYY")}
                </TableCell>

                <TableCell>
                  <Chip
                    label={row.status}
                    sx={{
                      backgroundColor:
                        row.status === "Completed" ? "#ECFDF5" : "#FEFCE8",
                      color: row.status === "Completed" ? "#059669" : "#CA8A04",
                      fontWeight: 500,
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                </TableCell>

                <TableCell sx={{ width: "20%" }}>{row.totalDocs}</TableCell>

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
