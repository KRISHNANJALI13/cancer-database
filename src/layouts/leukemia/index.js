import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
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
import { FaRibbon, FaDroplet, FaBrain, FaLungs } from "react-icons/fa6";

function LeukemiaTable() {
  const [columns] = useState([
    { name: "Patient ID", align: "center" },
    { name: "Type", align: "center" },
    { name: "Diagnosis", align: "center" },
    { name: "Original Image", align: "center" },
    { name: "Segmented Image", align: "center" },
  ]);

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (page) => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/leukemia?page=${page}&limit=10`);
      const newRows = response.data.data.map((item) => ({
        "Patient ID": item.patient_id,
        Type: item.type,
        Diagnosis: item.diagnosis,
        "Original Image": (
          <VuiTypography
            variant="button"
            color="primary"
            style={{ cursor: "pointer", textDecoration: "bold" }}
            onClick={() => handleOpenModal(`original-${item.file}`)}
          >
            View Image
          </VuiTypography>
        ),
        "Segmented Image": (
          <VuiTypography
            variant="button"
            color="primary"
            style={{ cursor: "pointer", textDecoration: "bold" }}
            onClick={() => handleOpenModal(`segmented-${item.file}`)}
          >
            View Image
          </VuiTypography>
        ),
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

  const handleOpenModal = (fileName) => {
    setSelectedImage(`http://localhost:4000/images/${fileName}`);
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
              <FaDroplet color="white" size="16px" /> Leukemia Dataset
              </VuiTypography>
            </VuiBox>
            <VuiBox style={{ maxHeight: "445px", overflowY: "auto" }}>
              <Table columns={columns} rows={rows} />
              <div ref={lastRowRef} style={{ height: "20px" }} />
              {loading && <VuiTypography variant="caption" color="white">Loading...</VuiTypography>}
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
      {/* Image Modal */}
      <Dialog open={open} onClose={handleCloseModal} maxWidth="md">
        <DialogTitle>Leukemia Image</DialogTitle>
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

export default LeukemiaTable;
