import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { FaHome, FaFileUpload, FaLungs } from "react-icons/fa"; // Importing icons
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
} from "examples/Navbars/DashboardNavbar/styles";
import { useVisionUIController, setTransparentNavbar } from "context";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useVisionUIController();
  const { transparentNavbar, fixedNavbar } = controller;
  const navigate = useNavigate();

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        {/* App Title */}
        <VuiBox sx={(theme) => navbarRow(theme, { isMini })}>
          <VuiTypography variant="h2" color="primary" textGradient>
            Medical Imaging Database for Cancer Detection
          </VuiTypography>
        </VuiBox>

        {/* Navigation Buttons */}
        {isMini ? null : (
          <VuiBox sx={(theme) => navbarRow(theme, { isMini, justifyContent: "space-between" })}>
            {/* Home Button */}
            <IconButton sx={navbarIconButton} size="small" onClick={() => navigate("/dashboard")}>
              <FaHome size="20px" color="white" />
              <VuiTypography variant="button" fontWeight="medium" ml={1} color={light ? "white" : "dark"}>
                Home
              </VuiTypography>
            </IconButton>

            <VuiBox sx={{ mx: 2 }} /> {/* Spacing between buttons */}

            {/* Cancer Report Button */}
            <IconButton sx={navbarIconButton} size="small" onClick={() => navigate("/upload")}>
              <FaFileUpload size="20px" color="white" />
              <VuiTypography variant="button" fontWeight="medium" ml={1} color={light ? "white" : "dark"}>
                Cancer Report
              </VuiTypography>
            </IconButton>

            <VuiBox sx={{ mx: 2 }} /> {/* Spacing between buttons */}

            {/* Lung Cancer Predictor Button */}
            <IconButton sx={navbarIconButton} size="small" onClick={() => navigate("/lung-predictor")}>
              <FaLungs size="20px" color="white" />
              <VuiTypography variant="button" fontWeight="medium" ml={1} color={light ? "white" : "dark"}>
                Lung Cancer Predictor
              </VuiTypography>
            </IconButton>
          </VuiBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
