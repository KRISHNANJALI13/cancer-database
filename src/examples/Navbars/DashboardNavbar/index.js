import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import { FaHome } from "react-icons/fa";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
} from "examples/Navbars/DashboardNavbar/styles";
import {
  useVisionUIController,
  setTransparentNavbar,
} from "context";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useVisionUIController();
  const { transparentNavbar, fixedNavbar } = controller;
  const route = useLocation().pathname.split("/").slice(1);
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
        <VuiBox sx={(theme) => navbarRow(theme, { isMini })}>
          <VuiTypography variant="h2" color="primary" textGradient>
            Medical Imaging Database for Cancer Detection
          </VuiTypography>
        </VuiBox>
        {isMini ? null : (
          <VuiBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/* Home Button */}
            <IconButton sx={navbarIconButton} size="small" onClick={() => navigate("/dashboard")}>
              <FaHome size="20px" color={"white"} />
              <VuiTypography variant="button" fontWeight="medium" ml={1} color={light ? "white" : "dark"}>
                Home
              </VuiTypography>
            </IconButton>
            <VuiBox sx={{ mx: 2 }} />
            <VuiBox color={light ? "white" : "inherit"}>
              <Link to="/authentication/sign-in" onClick={() => sessionStorage.removeItem("uname")}>
                <IconButton sx={navbarIconButton} size="small">
                  <Icon sx={({ palette: { dark, white } }) => ({ color: light ? white.main : dark.main })}>
                    account_circle
                  </Icon>
                  <VuiTypography variant="button" fontWeight="medium" color={light ? "white" : "dark"}>
                    Sign out {sessionStorage.getItem("uname")}
                  </VuiTypography>
                </IconButton>
              </Link>
            </VuiBox>
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
