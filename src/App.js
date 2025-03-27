import { useState, useEffect, useMemo } from "react";

// react-router components
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React example components
import Configurator from "examples/Configurator";

// Vision UI Dashboard React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Vision UI Dashboard React routes
import routes from "routes";

// Vision UI Dashboard React contexts
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";
import Tables from "layouts/tables";
import SignIn from "layouts/authentication/sign-in"; // Import Sign-in Page
import Overview from "layouts/profile";

export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enters mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leaves mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // Check if the user is logged in
  const isLoggedIn = !!sessionStorage.getItem("uname");

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={<route.component />} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={direction === "rtl" ? themeRTL : theme}>
      <CssBaseline />

      {layout === "vr" && <Configurator />}

      <Routes>
        {/* If not logged in, redirect all routes to sign-in */}
        <Route path="*" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/authentication/sign-in" />} />
        
        {/* Authentication Page */}
        <Route path="/authentication/sign-in" element={<SignIn />} />

        {/* Main Dashboard Page */}
        <Route path="/dashboard" element={isLoggedIn ? <Overview /> : <Navigate to="/authentication/sign-in" />} />

        {getRoutes(routes)}
      </Routes>
    </ThemeProvider>
  );
}
