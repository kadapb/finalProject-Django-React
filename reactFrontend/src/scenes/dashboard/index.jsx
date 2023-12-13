import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

const fetchDataAndRenderStatBox = async (setRecentData, setCount, apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    setRecentData(result);
    setCount(result.length);
  } catch (error) {
    console.error("Error fetching recent data:", error);
  }
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [recentRepairs, setRecentRepairs] = useState([]);
  const [newRepairsCount, setNewRepairsCount] = useState(0);

  const [recentClients, setRecentClients] = useState([]);
  const [newClientsCount, setNewClientsCount] = useState(0);

  useEffect(() => {
    const currentDate = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    currentDate.setDate(currentDate.getDate() + 1);

    const formattedStartDate = thirtyDaysAgo.toISOString().split("T")[0];
    const formattedEndDate = currentDate.toISOString().split("T")[0];

    // API usage for repairs in last 30 days
    const repairsApiUrl = `http://127.0.0.1:8000/repairs/?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
    fetchDataAndRenderStatBox(
      setRecentRepairs,
      setNewRepairsCount,
      repairsApiUrl
    );

    // API usage for clients in last 30 days
    const clientsApiUrl = `http://127.0.0.1:8000/clients/?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
    fetchDataAndRenderStatBox(
      setRecentClients,
      setNewClientsCount,
      clientsApiUrl
    );
  }, []);
  let totalServiceFee = 0;

  for (let i = 0; i < recentRepairs.length; i++) {
    // Convert service_fee to a number before adding
    const serviceFee = parseFloat(recentRepairs[i].service_fee) || 0;
    const extraFee = parseFloat(recentRepairs[i].extra_fee) || 0;
    totalServiceFee += serviceFee + extraFee;
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,541"
            subtitle="Unread Emails"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={newRepairsCount.toString()}
            subtitle="New Repairs (last 30days)"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={newClientsCount.toString()}
            subtitle="New Clients (last 30days)"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          padding="30px"
        >
          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Most Recent Repairs
          </Typography>
          <Box height="200px" overflow="auto">
            {recentRepairs.map((repair, i) => (
              <Box
                key={`${repair.id}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {repair.dziuma_id}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {repair.name}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{repair.date_received}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${repair.service_fee+repair.extra_fee}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              ${totalServiceFee} revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Repairs Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Newest Clients
          </Typography>
          <Box height="200px" overflow="auto">
            {recentClients.map((client, i) => (
              <Box
                key={`${client.id}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {client.first_name} {client.last_name}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {client.phone} ({client.date_created})
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
