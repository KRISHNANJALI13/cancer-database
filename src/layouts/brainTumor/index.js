import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
// import HeatMap from "react-heatmap-grid";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";


function BrainTumorTable() {
  const [columns] = useState([
    { name: "Image", align: "center" },
    { name: "Class", align: "center" },
    { name: "Mean", align: "center" },
    { name: "Variance", align: "center" },
    { name: "Standard Deviation", align: "center" },
    { name: "Entropy", align: "center" },
    { name: "Skewness", align: "center" },
    { name: "Kurtosis", align: "center" },
    { name: "Contrast", align: "center" },
    { name: "Energy", align: "center" },
    { name: "ASM", align: "center" },
    { name: "Homogeneity", align: "center" },
    { name: "Dissimilarity", align: "center" },
    { name: "Correlation", align: "center" },
    { name: "Coarseness", align: "center" }
  ]);

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);
  const [heatmapData, setHeatmapData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (page) => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/brain-tumor?page=${page}&limit=10`);
      const newRows = response.data.data.map((item) => ({
        Image: (
          <VuiTypography
            variant="button"
            color="primary"
            style={{ cursor: "pointer", textDecoration: "bold" }}
            onClick={() => handleOpenModal(item.Image)}
          >
            View Image
          </VuiTypography>
        ),
        Class: item.Class,
        Mean: item.Mean,
        Variance: item.Variance,
        "Standard Deviation": item["Standard Deviation"],
        Entropy: item.Entropy,
        Skewness: item.Skewness,
        Kurtosis: item.Kurtosis,
        Contrast: item.Contrast,
        Energy: item.Energy,
        ASM: item.ASM,
        Homogeneity: item.Homogeneity,
        Dissimilarity: item.Dissimilarity,
        Correlation: item.Correlation,
        Coarseness: item.Coarseness,
      }));
      setRows((prevRows) => [...prevRows, ...newRows]);
      setHeatmapData(generateHeatmapData(newRows));
      setHasMore(response.data.currentPage < response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const generateHeatmapData = (data) => {
    const numericColumns = columns.slice(2).map(col => col.name);
    const matrix = numericColumns.map(rowFeature => 
      numericColumns.map(colFeature => 
        data.reduce((sum, row) => sum + Math.abs(row[rowFeature] - row[colFeature]), 0) / data.length
      )
    );
    return matrix;
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

  const handleOpenModal = (fileName) => {
    setSelectedImage(`http://localhost:4000/images/${fileName}.jpg`);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
                Brain Tumor Dataset
              </VuiTypography>
            </VuiBox>
            <VuiBox style={{ maxHeight: "445px", overflowY: "auto" }}>
              <Table columns={columns} rows={rows} />
              <div ref={lastRowRef} style={{ height: "20px" }} />
              {loading && <VuiTypography variant="caption" color="white">Loading...</VuiTypography>}
            </VuiBox>
          </Card>
        </VuiBox>
         {/* Heatmap Visualization */}
         {/* <VuiBox mb={3}>
          <Card>
            <VuiTypography variant="lg" color="white" align="center" mb={2}>Feature Correlation Heatmap</VuiTypography>
            <VuiBox display="flex" justifyContent="center">
              <HeatMap
                data={heatmapData}
                xLabels={columns.slice(2).map(col => col.name)}
                yLabels={columns.slice(2).map(col => col.name)}
                cellRender={(x, y, value) => value.toFixed(2)}
                cellStyle={(_, __, value) => ({
                  background: `rgba(66, 135, 245, ${value})`,
                  fontSize: "12px",
                  color: "white"
                })}
              />
            </VuiBox>
          </Card>
        </VuiBox> */}
      </VuiBox>
      
      <Footer />

      {/* Image Modal */}
      <Dialog open={open} onClose={handleCloseModal} maxWidth="md">
        <DialogTitle>Tumor Image</DialogTitle>
        <DialogContent>
          <img 
            src={selectedImage} 
            alt="Patient Image" 
            style={{ width: "100%", height: "auto", borderRadius: "8px" }} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default BrainTumorTable;
