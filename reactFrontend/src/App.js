import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Clients from "./scenes/clients";
import Repairs from "./scenes/repairs";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/public_pages/Login";
import RepairStatus from "./scenes/public_pages/RepairStatus";
import SignUp from "./scenes/public_pages/SignUp";
import { useAuth } from "./AuthContext";

import { useNavigate } from "react-router-dom";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const currentRoute = location.pathname.toLowerCase();
  const specialRoutes = ["/login", "/status", "/signup"].map((route) =>
    route.toLowerCase()
  );
  const isSpecialRoute = specialRoutes.includes(currentRoute);
  const navigate = useNavigate();

  const { token } = useAuth();

  useEffect(() => {
    // Redirect unauthenticated users to the login page

    if (!token && !isSpecialRoute) {
      navigate("/login");
    }
  }, [token, isSpecialRoute, navigate]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isSpecialRoute && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/repairs" element={<Repairs />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/login" element={<Login />} />
              <Route path="/status" element={<RepairStatus />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
