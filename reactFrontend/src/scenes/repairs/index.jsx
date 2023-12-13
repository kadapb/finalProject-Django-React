import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassFullOutlinedIcon from "@mui/icons-material/HourglassFullOutlined";
import HandymanIcon from "@mui/icons-material/Handyman";
import RepairDetailsModal from './repairDetailsModal';


const Repairs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState(null);

  const handleRowDoubleClick = (params) => {
    setSelectedRepair(params.row);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API call to generate a table with ALL repairs
        const response = await fetch("http://127.0.0.1:8000/repairs/");
        // API call to generate a table with ALL repairs

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 3:
        return colors.greenAccent[600];
      case 2:
        return colors.grey[600];
      case 1:
        return colors.redAccent[600];
      default:
        return colors.grey[500];
    };
  };

  const getStatusText = (status) => {
    switch (status) {
      case 3:
        return "Done";
      case 2:
        return "In Progress";
      case 1:
        return "Waiting";
      default:
        return "Unknown";
    }
  };

 

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ value }) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          backgroundColor={getStatusColor(value)}
          borderRadius="4px"
        >
          {value === 3 && <CheckCircleOutlineIcon />}
          {value === 2 && <HandymanIcon />}
          {value === 1 && <HourglassFullOutlinedIcon />}
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {getStatusText(value)}
          </Typography>
        </Box>
      ),
    },
    {
      field: "date_received",
      headerName: "Date Received",
      flex: 1,
      valueGetter: (params) => {
        const date = new Date(params.row.date_received);
        return date.toLocaleDateString(); 
      },
    },
    {
      field: "date_returned",
      headerName: "Date Returned",
      flex: 1,
      valueGetter: (params) => {
        const dateReturned = params.row.date_returned;
    
        if (dateReturned) {
          const date = new Date(dateReturned);
          const stringDate = date.toLocaleDateString();

    //        1/1/1970  is epoch time, null defaults to this value.

          if (stringDate === "1/1/1970") { 
            return ""; 
          }
    
          return stringDate;
        } else {
          return ""; 
        }
      },
    },
    { field: "dziuma_id", headerName: "Dziuma ID", flex: 1 },
    { field: "name", headerName: "Brand Name", flex: 1 },
    { field: "item_type", headerName: "Item Type", flex: 1 },
    { 
      field: "total_fee", 
      headerName: "Total Fee", 
      flex: 1, 
      renderCell: (params) => (
        <div>
          {(params.row.service_fee || 0) + (params.row.extra_fee || 0)}
        </div>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Repairs" subtitle="List of all Repairs" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onCellDoubleClick={handleRowDoubleClick}
        />
      </Box>
      {isModalOpen && (
        <RepairDetailsModal
          repair={selectedRepair}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Box>
  );
};

export default Repairs;
