import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';



const Topbar = () => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
     
      <Box display="flex" marginLeft="auto">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={token ? handleLogout : handleLogin}>
          {token ? <LogoutIcon /> : <LoginIcon />}
        </IconButton>
        
      </Box>
    </Box>
  );
};

export default Topbar;
