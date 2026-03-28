// import React from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   Chip,
//   IconButton,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
// import { Download, Visibility } from "@mui/icons-material";
// import profile from "../../assets/images/profile.png";
// import company_icon from "../../assets/images/companies_icon.png";
// import { useState } from "react";

// import {
//   companies as mockCompanies,
//   documentTypes as mockDocumentTypes,
// } from "../../components/constant/publicData/mockData"; // adjust path if needed
// const tableData = [
//   {
//     name: "Rahul Sharma",
//     id: "EMP001",
//     company: "Nimbja Security",
//     generatedBy: "Aditi Khade",
//     date: "Feb 15, 2026",
//     status: "Completed",
//   },
//   {
//     name: "Amit Kumar",
//     id: "EMP003",
//     company: "Quick Management",
//     generatedBy: "Aditi Khade",
//     date: "Feb 16, 2026",
//     status: "Pending",
//   },
//   {
//     name: "Vikram Singh",
//     id: "EMP005",
//     company: "Cubeage Tech",
//     generatedBy: "Aditi Khade",
//     date: "Feb 18, 2026",
//     status: "Completed",
//   },
//   {
//     name: "Anita Desai",
//     id: "EMP006",
//     company: "Newage Cloud",
//     generatedBy: "Aditi Khade",
//     date: "Feb 18, 2026",
//     status: "Completed",
//   },
//   {
//     name: "Priya Patel",
//     id: "EMP007",
//     company: "Penta Software",
//     generatedBy: "Aditi Khade",
//     date: "Feb 18, 2026",
//     status: "Completed",
//   },
//   {
//     name: "Amit Kumar",
//     id: "EMP008",
//     company: "Quick Managemant",
//     generatedBy: "Aditi Khade",
//     date: "Feb 18, 2026",
//     status: "Completed",
//   },
//   {
//     name: "Sneha Reddy",
//     id: "EMP009",
//     company: "Cubeage Tech",
//     generatedBy: "Aditi Khade",
//     date: "Feb 18, 2026",
//     status: "Completed",
//   },
//   {
//     name: "Vikram Singh",
//     id: "EMP010",
//     company: "Smart Software",
//     generatedBy: "Aditi Khade",
//     date: "Feb 18, 2026",
//     status: "Completed",
//   },
//   {
//     name: "Anita Desai",
//     id: "EMP011",
//     company: "Neweage Cloud",
//     generatedBy: "Aditi Khade",
//     date: "Feb 18, 2026",
//     status: "Completed",
//   },
//   {
//     name: "Vikram Singh",
//     id: "EMP012",
//     company: "Cubeage Tech",
//     generatedBy: "Aditi Khade",
//     date: "Feb 18, 2026",
//     status: "Completed",
//   },
//   {
//     name: "Amit Kumar",
//     id: "EMP013",
//     company: "Penta Software",
//     generatedBy: "Aditi Khade",
//     date: "Feb 18, 2026",
//     status: "Completed",
//   },
// ];
// const UserHistoryPage = () => {
//   const [timeFilter, setTimeFilter] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [docType, setDocType] = useState("");
//   const [company, setCompany] = useState("");
//   const [search, setSearch] = useState("");
//   const filteredData = tableData.filter((item) => {
//     const itemDate = dayjs(item.date);

//     // search filter
//     if (
//       search &&
//       !item.name.toLowerCase().includes(search.toLowerCase()) &&
//       !item.id.toLowerCase().includes(search.toLowerCase())
//     ) {
//       return false;
//     }

//     // company filter
//     if (company && item.company !== company) {
//       return false;
//     }

//     // month filter
//     if (month && itemDate.format("MMMM") !== month) {
//       return false;
//     }

//     // year filter
//     if (year && itemDate.year() !== Number(year)) {
//       return false;
//     }

//     // date filter
//     if (selectedDate && !itemDate.isSame(selectedDate, "day")) {
//       return false;
//     }

//     return true;
//   });

//   const [period, setPeriod] = useState("");
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const startYear = 1990; // or company start year
//   const currentYear = new Date().getFullYear();

//   const years = Array.from(
//     { length: currentYear - startYear + 1 },
//     (_, i) => currentYear - i,
//   );

//   const companies = mockCompanies.map((company) => company.shortName);

//   const documentTypes = mockDocumentTypes.map((doc) => doc.name);

//   return (
//     <Box sx={{ minHeight: "100vh", width: "100%" }}>
//       {/* HEADER */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//           flexWrap: "wrap",
//           gap: 2,
//         }}
//       >
//         <Typography
//           sx={{
//             fontWeight: 600,
//             color: "#1D293D",
//             fontSize: { xs: "18px", md: "22px" },
//           }}
//         >
//           <i class="fa-solid fa-arrow-left mr-2"></i>
//           Document History
//         </Typography>

//         <Button
//           variant="contained"
//           startIcon={<Download />}
//           sx={{
//             background: "linear-gradient(to right, #21206C, #B27AD5)",
//             textTransform: "none",
//             borderRadius: "10px",
//             height: 40,
//             px: 3,
//             whiteSpace: "nowrap",
//             "&:hover": { opacity: 0.9 },
//           }}
//         >
//           Export All
//         </Button>
//       </Box>

//       {/* FILTER SECTION */}
//       <Paper
//         sx={{
//           p: 3,
//           mb: 4,
//           borderRadius: "16px",
//           border: "1px solid #E4E7EC",
//         }}
//       >
//         {/* SEARCH */}
//         <TextField
//           fullWidth
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by employee name or ID..."
//           variant="outlined"
//           sx={{
//             mb: 3,
//             "& .MuiOutlinedInput-root": {
//               height: 48,
//               borderRadius: "14px",
//               backgroundColor: "#F3F4F6",
//               fontSize: "14px",
//             },
//           }}
//         />

//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               md: "repeat(5, 1fr)",
//             },
//             gap: 3,
//           }}
//         >
//           {/* DOCUMENT TYPE */}
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "15px",
//                 fontWeight: 500,

//                 mb: 1,
//               }}
//             >
//               Document Type
//             </Typography>

//             <FormControl fullWidth>
//               <Select
//                 value={docType}
//                 onChange={(e) => setDocType(e.target.value)}
//                 displayEmpty
//                 sx={{
//                   height: 48,
//                   borderRadius: "14px",
//                   backgroundColor: "#F3F4F6",
//                   fontSize: "14px",
//                 }}
//                 renderValue={(selected) => {
//                   if (!selected)
//                     return (
//                       <span style={{ color: "#9CA3AF" }}>
//                         Select Document Type
//                       </span>
//                     );
//                   return selected;
//                 }}
//               >
//                 {documentTypes.map((type) => (
//                   <MenuItem key={type} value={type}>
//                     {type}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>

//           {/* COMPANY */}
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "15px",
//                 fontWeight: 500,
//                 mb: 1,
//               }}
//             >
//               Company
//             </Typography>

//             <FormControl fullWidth>
//               <Select
//                 value={company}
//                 onChange={(e) => setCompany(e.target.value)}
//                 displayEmpty
//                 sx={{
//                   height: 48,
//                   borderRadius: "14px",
//                   backgroundColor: "#F3F4F6",
//                   fontSize: "14px",
//                 }}
//                 renderValue={(selected) => {
//                   if (!selected)
//                     return (
//                       <span style={{ color: "#9CA3AF" }}>Select Company</span>
//                     );
//                   return selected;
//                 }}
//               >
//                 {companies.map((comp) => (
//                   <MenuItem key={comp} value={comp}>
//                     {comp}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//           {/* TIME FILTER */}
//           {/* SELECT MONTH */}
//           <Box>
//             <Typography sx={{ fontSize: "15px", fontWeight: 500, mb: 1 }}>
//               Select month
//             </Typography>

//             <FormControl fullWidth>
//               <Select
//                 value={month}
//                 onChange={(e) => setMonth(e.target.value)}
//                 displayEmpty
//                 sx={{
//                   height: 48,
//                   borderRadius: "14px",
//                   backgroundColor: "#F3F4F6",
//                   fontSize: "14px",
//                 }}
//                 renderValue={(selected) => {
//                   if (!selected)
//                     return (
//                       <span style={{ color: "#9CA3AF" }}>Select months</span>
//                     );
//                   return selected;
//                 }}
//               >
//                 {months.map((m) => (
//                   <MenuItem key={m} value={m}>
//                     {m}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//           {/* YEAR */}
//           {/* SELECT YEAR */}
//           <Box>
//             <Typography sx={{ fontSize: "15px", fontWeight: 500, mb: 1 }}>
//               Select year
//             </Typography>

//             <FormControl fullWidth>
//               <Select
//                 value={year}
//                 onChange={(e) => setYear(e.target.value)}
//                 displayEmpty
//                 sx={{
//                   height: 48,
//                   borderRadius: "14px",
//                   backgroundColor: "#F3F4F6",
//                   fontSize: "14px",
//                 }}
//                 renderValue={(selected) => {
//                   if (!selected)
//                     return (
//                       <span style={{ color: "#9CA3AF" }}>Select Year</span>
//                     );
//                   return selected;
//                 }}
//               >
//                 {years.map((y) => (
//                   <MenuItem key={y} value={y}>
//                     {y}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//           {/* DATE */}
//           {/* SELECT DATE */}
//           <Box>
//             <Typography sx={{ fontSize: "15px", fontWeight: 500, mb: 1 }}>
//               Select date
//             </Typography>

//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 value={selectedDate}
//                 onChange={(newValue) => setSelectedDate(newValue)}
//                 slotProps={{
//                   textField: {
//                     fullWidth: true,
//                     size: "small",
//                     sx: {
//                       "& .MuiOutlinedInput-root": {
//                         height: 48,
//                         borderRadius: "14px",
//                         backgroundColor: "#F3F4F6",
//                       },
//                     },
//                   },
//                 }}
//               />
//             </LocalizationProvider>
//           </Box>
//         </Box>
//       </Paper>

//       {/* TABLE */}
//       <Paper
//         sx={{
//           borderRadius: "16px",
//           border: "1px solid #E4E7EC",
//           overflow: "hidden",
//         }}
//       >
//         <Box sx={{ overflowX: "auto" }}>
//           <Table sx={{ minWidth: 900 }}>
//             <TableHead sx={{ background: "#f0f4ff" }}>
//               <TableRow>
//                 <TableCell>Employee Name</TableCell>
//                 <TableCell>Employee ID</TableCell>
//                 <TableCell>Company Name</TableCell>
//                 <TableCell>Generated By</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Payment Status</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredData.map((row, index) => (
//                 <TableRow key={index} hover>
//                   <TableCell>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                       <Box
//                         sx={{
//                           width: 40,
//                           height: 40,
//                           borderRadius: "12px",
//                           background:
//                             "linear-gradient(to right, #393B8B, #AD78D2)",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <img src={profile} alt="" width={20} />
//                       </Box>

//                       <Box>
//                         <Typography
//                           sx={{
//                             fontWeight: 500,
//                             color: "#1D293D",
//                             fontSize: "14px",
//                           }}
//                         >
//                           {row.name}
//                         </Typography>
//                         <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
//                           245 KB
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </TableCell>

//                   <TableCell sx={{ fontWeight: 500 }}>{row.id}</TableCell>

//                   <TableCell>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <img src={company_icon} alt="" width={16} />
//                       <Typography fontSize={14}>{row.company}</Typography>
//                     </Box>
//                   </TableCell>

//                   <TableCell>{row.generatedBy}</TableCell>
//                   <TableCell sx={{ color: "#6B7280" }}>{row.date}</TableCell>

//                   <TableCell>
//                     <Chip
//                       label={row.status}
//                       sx={{
//                         backgroundColor:
//                           row.status === "Completed" ? "#DCFCE7" : "#FEF9C3",
//                         color:
//                           row.status === "Completed" ? "#16A34A" : "#CA8A04",
//                         fontWeight: 500,
//                         borderRadius: "8px",
//                       }}
//                     />
//                   </TableCell>

//                   <TableCell align="center">
//                     <IconButton
//                       sx={{
//                         backgroundColor: "#EEF2FF",
//                         "&:hover": { backgroundColor: "#E0E7FF" },
//                       }}
//                     >
//                       <Visibility sx={{ color: "#6D5DF6" }} />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default UserHistoryPage;

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