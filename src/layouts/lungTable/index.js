import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import VuiSnackbar from "components/VuiSnackbar/Vuisnackbar";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { FaRibbon, FaDroplet, FaBrain, FaLungs } from "react-icons/fa6";

function LungTable() {
  const [columns] = useState([
    { name: "Patient ID", align: "left" },
    { name: "Air Pollution", align: "center" },
    { name: "Dust Allergy", align: "center" },
    { name: "Genetics", align: "center" },
    { name: "Chronic Lung Disease", align: "center" },
    { name: "Obesity", align: "center" },
    { name: "Smoking", align: "center" },
    { name: "Passive Smoking", align: "center" },
    { name: "Wheezing", align: "center" },
    { name: "Dry Cough", align: "center" },
    { name: "Level", align: "center" }
  ]);

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (page) => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/lung?page=${page}&limit=10`);
      const newRows = response.data.data.map((item) => ({
        "Patient ID": (
          <VuiTypography
            variant="button"
            color="primary"
            style={{ cursor: "pointer", textDecoration: "bold" }}
            onClick={() => handleSnackbarOpen(item)}
          >
            {item.Patient_Id}
          </VuiTypography>
        ),
        "Air Pollution": item.air_pollution,
        "Dust Allergy": item.dust_allergy,
        "Genetics": item.genetics,
        "Chronic Lung Disease": item.chronic_lung,
        "Obesity": item.obesity,
        "Smoking": item.smoking,
        "Passive Smoking": item.passive_smoker,
        "Wheezing": item.wheezing,
        "Dry Cough": item.dry_cough,
        "Level": (
          <VuiTypography
            variant="button"
            style={{
              color:
                item.level === "High" ? "red" :
                item.level === "Medium" ? "orange" : "yellow",
            }}
          >
            {item.level}
          </VuiTypography>
        )
      }));
      setRows((prevRows) => [...prevRows, ...newRows]);
      setHasMore(response.data.currentPage < response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const lastRowRef = useCallback((node) => {
    if (loading || !hasMore) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const handleSnackbarOpen = (patient) => {
    setSnackbarContent(
      `Age: ${patient.age}\nGender: ${patient.gender}\nOccupational Hazards: ${patient.occupational_hazards}\nChest Pain: ${patient.chest_pain}\nCoughing Blood: ${patient.coughing_of_blood}\nWeight Loss: ${patient.weight_loss}\nFrequent Cold: ${patient.frequent_cold}\nSnoring: ${patient.snoring}`
    );
    setShowSnackbar(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
              <FaLungs color="white" size="16px" /> Lung Cancer Dataset
              </VuiTypography>
            </VuiBox>
            <VuiBox style={{ maxHeight: "445px", overflowY: "auto" }}>
              <Table columns={columns} rows={rows}/>
              <div ref={lastRowRef} style={{ height: "20px" }} />
              {loading && <VuiTypography variant="caption" color="white">Loading...</VuiTypography>}
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      {/* <VuiBox>
        <BarChart
            data={[{data: [1,2,3]}]}
        />
      </VuiBox> */}
      <Footer />

      {/* Snackbar */}
      <VuiSnackbar
        color="info"
        icon="notifications"
        title="Patient Info"
        content={snackbarContent}
        open={showSnackbar}
        close={() => setShowSnackbar(false)}
      />
    </DashboardLayout>
  );
}

export default LungTable;
