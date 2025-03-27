import React from "react";
import { Card, Icon } from "@mui/material";
import welcome from "assets/images/welcome-profile.png";
import VuiTypography from "components/VuiTypography/index";
import VuiBox from "components/VuiBox/index";

const Welcome = () => {
  return (
    <Card
      sx={({ breakpoints }) => ({
        background: `url(${welcome})`,
        backgroundSize: "cover",
        borderRadius: "20px",
        height: "100%",
        [breakpoints.only("xl")]: {
          gridArea: "1 / 1 / 2 / 2",
        },
      })}
    >
      <VuiBox display="flex" flexDirection="column" sx={{ height: "100%" }}>
        <VuiBox display="flex" flexDirection="column" mb="auto">
          <VuiTypography color="white" variant="h3" fontWeight="bold" mb="3px">
            What this app is all about!
          </VuiTypography>
          
          <VuiTypography color="white" variant="h8" fontWeight="regular" mt="4px">
          Cancer is a group of diseases characterized by uncontrolled cell growth and division, potentially forming tumors and spreading to other parts of the body, a process called metastasis. This app is designed as a medical imaging database that can be utilized for cancer detection. Each cancer has its own table that's intercative. It also provides medical images for visualization.
          </VuiTypography>
        </VuiBox>
        {/* <VuiBox justifySelf="flex-end"> */}
          {/* <VuiTypography
            component="a"
            href="#"
            variant="button"
            color="white"
            fontWeight="regular"
            sx={{
              mr: "5px",
              display: "inline-flex",
              alignItems: "center",
              justifySelf: "flex-end",
              cursor: "pointer",

              "& .material-icons-round": {
                fontSize: "1.125rem",
                transform: `translate(2px, -0.5px)`,
                transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
              },

              "&:hover .material-icons-round, &:focus  .material-icons-round": {
                transform: `translate(6px, -0.5px)`,
              },
            }}
          >
            My Github
            <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
          </VuiTypography> */}
        {/* </VuiBox> */}
      </VuiBox>
    </Card>
  );
};

export default Welcome;
