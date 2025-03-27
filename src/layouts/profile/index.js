import { useState } from "react";
import { AppBar, Tabs, Tab, Card, Grid, Button } from "@mui/material";
import { FaRibbon, FaDroplet, FaBrain, FaLungs } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import VuiButton from "components/VuiButton";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Welcome from "./components/Welcome";
import DashFooter from "examples/dashFooter";

const descriptions = {
  Sarcoma: "Sarcoma is a type of cancer that develops in the bones and soft tissues, including fat, muscle, and blood vessels. This dataset provides an overview of the tumor size, its location, histological grade, and metastasis. Each record includes an associated medical image, with a total of 250 records available. Additional details such as patient age, gender, and location are also provided.",

  Leukemia: "Leukemia is a blood cancer caused by an increase in abnormal white blood cells that crowd out normal cells in the bone marrow. This dataset contains 3,256 records, each including a patient ID, type, and diagnosis category (benign, pre, pro, or early). It also provides original medical images along with segmented images highlighting the cancer cells.",

  "Brain Tumor": "Brain tumors are abnormal growths of cells in the brain that can be benign or malignant, affecting neurological functions. This dataset includes images and various extracted features such as tumor classification (tumor or non-tumor), location, shape, texture-based statistical attributes (mean, variance, standard deviation, entropy, skewness, kurtosis), and contrast-related measures (energy, ASM, homogeneity, dissimilarity, correlation, and coarseness).",

  "Lung Cancer": "Lung cancer is one of the leading causes of cancer-related deaths, often linked to smoking and environmental exposure. This dataset includes patient records detailing key risk factors such as air pollution, dust allergies, genetic predisposition, chronic lung disease, obesity, smoking habits, passive smoking, wheezing, and dry cough levels. Additional demographic details such as age and gender are also included."
};


const routes = {
  Sarcoma: "/tables",
  Leukemia: "/leukemia",
  "Brain Tumor": "/brain-tumor",
  "Lung Cancer": "/lung"
};

function Overview() {
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const selectedCategory = Object.keys(descriptions)[tabValue];
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox mt={5} mb={3}>
      <Grid 
    container 
    spacing={3} 
    alignItems="stretch" 
    sx={{ minHeight: "410px", display: "flex" }} // Ensure equal height
  >
    {/* Left: Welcome Section */}
    <Grid 
      item xs={12} md={5} 
      sx={{ display: "flex", flexDirection: "column", minheight: "410px" }}
    >
      <Welcome />
    </Grid>

    {/* Right: Tab Switcher + Description */}
    <Grid 
      item xs={12} md={7} 
      sx={{ display: "flex", flexDirection: "column", minheight: "410px" }}
    >
      <AppBar position="static" sx={{ borderRadius: "12px", overflow: "hidden" }}>
        <Tabs
          value={tabValue}
          onChange={handleSetTabValue}
          sx={{ background: "transparent", display: "flex", justifyContent: "center" }}
        >
          <Tab label="Sarcoma" icon={<FaRibbon color="white" size="16px" />} />
          <Tab label="Leukemia" icon={<FaDroplet color="white" size="16px" />} />
          <Tab label="Brain Tumor" icon={<FaBrain color="white" size="16px" />} />
          <Tab label="Lung Cancer" icon={<FaLungs color="white" size="16px" />} />
        </Tabs>
      </AppBar>

      <Card sx={{ padding: 3, marginTop: 1, flex: 1 }}> {/* flex: 1 makes it take full height */}
        <VuiTypography variant="h5" fontWeight="bold" color="white" gutterBottom>
          {selectedCategory}
        </VuiTypography>
        <VuiTypography variant="body1" color="text">
          {descriptions[selectedCategory]}
        </VuiTypography>

        {/* Button only for Sarcoma, Brain Tumor, Leukemia, and Lung Cancer */}
        {selectedCategory in routes && (
          <VuiButton
            variant="outlined"
            color="white"
            size="medium"
            circular="true"
            onClick={() => navigate(routes[selectedCategory])}
            sx={{
              mt: 4,
              textTransform: "none",
              alignSelf: "flex-start",
            }}
          >
            View Dataset
          </VuiButton>
        )}
      </Card>
    </Grid>
  </Grid>
      <VuiBox mt={4}>
        <VuiTypography variant="h3" fontWeight="bold" color="white" gutterBottom>
          Cancer Identification & Reporting Tool
        </VuiTypography>
        <Card sx={{ padding: 3 }}>
          <VuiTypography variant="body1" color="text">
            This tool leverages image processing using Python flask to analyze medical images and generate detailed reports on detected abnormalities using data pulled from the databases. And it allows the user to download a detailed report in PDF format.
          </VuiTypography>
          <VuiButton
            variant="outlined"
            color="white"
            size="medium"
            circular="true"
            onClick={() => navigate("/upload")}
            sx={{
              mt: 4,
              textTransform: "none",
              alignSelf: "flex-start",
            }}
          >
           Go to tool
          </VuiButton>
        </Card>
      </VuiBox>
      </VuiBox>

      <DashFooter />
    </DashboardLayout>
  );
}

export default Overview;
