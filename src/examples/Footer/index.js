import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import React from "react";
function Footer() {
  return (
    <VuiBox
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      component="footer"
      py={2}
      pb={0}
    >
      <VuiBox item xs={12} sx={{ textAlign: "center" }}>
        <VuiTypography
          variant="button"
          sx={{ textAlign: "center", fontWeight: "400 !important" }}
          color="white"
        >
          @ 2025, Made by{" "}
          <VuiTypography
            component="a"
            variant="button"
            href="https://www.linkedin.com/in/krishnanjali-pradeep-8599762ba/"
            sx={{ textAlign: "center", fontWeight: "500 !important" }}
            color="white"
            mr="2px"
          >
            Krishnanjali&nbsp;Pradeep{" "}
          </VuiTypography>
          - 192220042
        </VuiTypography>
      </VuiBox>

      <VuiBox item xs={10}>
        <VuiBox display="flex" justifyContent="center" width="100%" flexWrap="nowrap" mb={3}>
          <VuiBox flexGrow={1} display="flex" justifyContent="center" minWidth="150px">
            <VuiTypography
              component="a"
              href="http://localhost:3000/tables"
              variant="body2"
              color="white"
            >
              Sarcoma Cancer
            </VuiTypography>
          </VuiBox>
          <VuiBox flexGrow={1} display="flex" justifyContent="center" minWidth="150px">
            <VuiTypography
              component="a"
              href="http://localhost:3000/brain-tumor"
              variant="body2"
              color="white"
            >
              Brain Tumor
            </VuiTypography>
            
          </VuiBox>
          <VuiBox flexGrow={1} display="flex" justifyContent="center" minWidth="150px">
            <VuiTypography
              component="a"
              href="http://localhost:3000/leukemia"
              variant="body2"
              color="white"
            >
              Leukemia
            </VuiTypography>
            
          </VuiBox>
          <VuiBox flexGrow={1} display="flex" justifyContent="center" minWidth="150px">
            <VuiTypography
              component="a"
              href="http://localhost:3000/lung"
              variant="body2"
              color="white"
            >
              Lung Cancer
            </VuiTypography>
            
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </VuiBox>
  );
}

export default Footer;
