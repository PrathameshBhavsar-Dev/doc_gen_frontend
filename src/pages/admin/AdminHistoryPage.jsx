
import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";

import { Download, Visibility } from "@mui/icons-material";
import profile from "../../assets/images/profile.png";
import company_icon from "../../assets/images/companies_icon.png";

const tableData = [
  {
    name: "Rahul Sharma",
    id: "EMP001",
    company: "Nimbja Security",
    generatedBy: "Aditi Khade",
    date: "Feb 15, 2026",
    status: "Completed",
  },
  {
    name: "Amit Kumar",
    id: "EMP003",
    company: "Quick Management",
    generatedBy: "Aditi Khade",
    date: "Feb 16, 2026",
    status: "Pending",
  },
  {
    name: "Vikram Singh",
    id: "EMP005",
    company: "Cubeage Tech",
    generatedBy: "Aditi Khade",
    date: "Feb 18, 2026",
    status: "Completed",
  },
  {
    name: "Anita Desai",
    id: "EMP006",
    company: "Newage Cloud",
    generatedBy: "Aditi Khade",
    date: "Feb 18, 2026",
    status: "Completed",
  },
  {
    name: "Priya Patel",
    id: "EMP007",
    company: "Penta Software",
    generatedBy: "Aditi Khade",
    date: "Feb 18, 2026",
    status: "Completed",
  },
];

const AdminHistoryPage = () => {
  return (
    <Box sx={{ minHeight: "100vh", width: "100%", p: { xs: 2, md: 4 } }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            color: "#1D293D",
            fontSize: { xs: "18px", md: "22px" },
          }}
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Document History
        </Typography>

        <Button
          variant="contained"
          startIcon={<Download />}
          sx={{
            background: "linear-gradient(to right, #21206C, #B27AD5)",
            textTransform: "none",
            borderRadius: "10px",
            height: 40,
            px: 3,
            whiteSpace: "nowrap",
            "&:hover": { opacity: 0.9 },
          }}
        >
          Export All
        </Button>
      </Box>

      {/* FILTER SECTION */}
      <Paper
        sx={{
          p: { xs: 2, md: 3 },
          mb: 4,
          borderRadius: "16px",
          border: "1px solid #E4E7EC",
          backgroundColor: "#F9FAFB",
        }}
      >
        {/* SEARCH */}
        <TextField
          fullWidth
          placeholder="Search by employee name, ID, or document type..."
          variant="outlined"
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              height: 48,
              borderRadius: "14px",
              backgroundColor: "#F3F4F6",
              fontSize: "14px",
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
              md: "1fr 1fr 1fr",
            },
            gap: 3,
          }}
        >
          {/* DOCUMENT TYPE */}
          <Box>
            <Typography sx={{ fontSize: "15px", fontWeight: 500, mb: 1 }}>
              Document Type
            </Typography>

            <Select
              fullWidth
              displayEmpty
              defaultValue=""
              sx={{
                height: 48,
                borderRadius: "14px",
                backgroundColor: "#F3F4F6",
                fontSize: "14px",
              }}
              renderValue={(selected) => {
                if (!selected) return "Select Document Type";
                return selected;
              }}
            >
              <MenuItem value="">
                <em>Select Document Type</em>
              </MenuItem>
              <MenuItem value="salary">Salary Slip</MenuItem>
              <MenuItem value="offer">Offer Letter</MenuItem>
              <MenuItem value="experience">Experience Letter</MenuItem>
              <MenuItem value="relieving">Relieving Letter</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </Select>
          </Box>

          {/* COMPANY */}
          <Box>
            <Typography sx={{ fontSize: "15px", fontWeight: 500, mb: 1 }}>
              Company
            </Typography>

            <Select
              fullWidth
              displayEmpty
              defaultValue=""
              sx={{
                height: 48,
                borderRadius: "14px",
                backgroundColor: "#F3F4F6",
                fontSize: "14px",
              }}
              renderValue={(selected) => {
                if (!selected) return "Select Company";
                return selected;
              }}
            >
              <MenuItem value="">
                <em>Select Company</em>
              </MenuItem>
              <MenuItem value="nimbja">Nimbja Security</MenuItem>
              <MenuItem value="penta">Penta Software</MenuItem>
              <MenuItem value="cubeage">Cubeage Tech</MenuItem>
              <MenuItem value="quick">Quick Management</MenuItem>
              <MenuItem value="smart">Smart Software</MenuItem>
              <MenuItem value="newage">Newage Cloud</MenuItem>
            </Select>
          </Box>

          {/* GENERATED BY */}
          <Box>
            <Typography sx={{ fontSize: "15px", fontWeight: 500, mb: 1 }}>
              Generated By
            </Typography>

            <Select
              fullWidth
              displayEmpty
              defaultValue=""
              sx={{
                height: 48,
                borderRadius: "14px",
                backgroundColor: "#F3F4F6",
                fontSize: "14px",
                "& .MuiSelect-select": {
                  color: "#000",
                },
              }}
              renderValue={(selected) => {
                if (!selected) {
                  return "Select Generated By";
                }
                return selected;
              }}
            >
              {" "}
              <MenuItem value="Sanjay Sir">Sanjay Sir</MenuItem>{" "}
              <MenuItem value="Aditi Mam">Aditi Mam</MenuItem>{" "}
              <MenuItem value="Aditya Sir">Aditya Sir</MenuItem>{" "}
            </Select>
          </Box>
        </Box>
      </Paper>

      {/* TABLE */}
      <Paper
        sx={{
          borderRadius: "16px",
          border: "1px solid #E4E7EC",
          overflow: "hidden",
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 900 }}>
            <TableHead sx={{ background: "#f0f4ff" }}>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Generated By</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData.map((row, index) => (
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

                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            color: "#1D293D",
                            fontSize: "14px",
                          }}
                        >
                          {row.name}
                        </Typography>

                        <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
                          245 KB
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ fontWeight: 500 }}>{row.id}</TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <img src={company_icon} alt="" width={16} />
                      <Typography fontSize={14}>{row.company}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell>{row.generatedBy}</TableCell>

                  <TableCell sx={{ color: "#6B7280" }}>{row.date}</TableCell>

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

                  <TableCell align="center">
                    <IconButton
                      sx={{
                        backgroundColor: "#EEF2FF",
                        "&:hover": { backgroundColor: "#E0E7FF" },
                      }}
                    >
                      <Visibility sx={{ color: "#6D5DF6" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminHistoryPage;
