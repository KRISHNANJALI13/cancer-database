import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Card, CardContent, Box, Typography, Alert, CircularProgress, Modal  } from "@mui/material";
import axios from "axios";
import VuiButton from "components/VuiButton";
import VuiTypography from "components/VuiTypography";

function Uploads() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [hasTumor, setHasTumor] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError("Invalid file type! Only JPG and PNG are allowed.");
      setFile(null);
      setReport(null);
      setHasTumor(false);
      return;
    }

    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError("");
      setReport(null);
      setHasTumor(false);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpg"], "image/png": [".png"] },
    multiple: false,
  });

  const handleGenerateReport = async () => {
    if (!file) return;

    setLoading(true);
    setReport(null);
    setError("");
    setHasTumor(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:4000/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.data === "no tumor") {
        setReport({ message: "No tumor detected." });
      } else if (response.data.data === "Error scanning the image") {
        setError("Error scanning the image. Please upload a valid medical image.");
      } else {
        setReport(response.data.data);
        setHasTumor(true);
      }
    } catch (err) {
      setError("Failed to generate report. Try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!hasTumor || !report?.filename) return;
    window.open(`http://localhost:4000/reports/${report.filename}`, "_blank");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {/* FLEX CONTAINER TO PUSH FOOTER TO BOTTOM */}
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "84vh" }}>
        {/* CONTENT AREA */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Card sx={{ p: 3, width: "60%", textAlign: "center" }}>
            <VuiTypography variant="h2" color="info" textGradient textAlign="left">
              AI Report Generator
            </VuiTypography>
            <CardContent sx={{ mt: 3 }}>
              {/* Dropzone */}
              <div {...getRootProps()} style={dropzoneStyle}>
                <input {...getInputProps()} />
                <Typography variant="h5">Click to select a file</Typography>
                <Typography variant="caption">(Only JPG or PNG allowed)</Typography>
              </div>

              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

              {file && (
                <VuiTypography
                  variant="body1"
                  sx={{ mt: 2, cursor: "pointer", color: "blue", textDecoration: "underline" }}
                  onClick={() => setModalOpen(true)}
                >
                  Selected File: {file.name}
                </VuiTypography>
              )}

              {/* Generate AI Report Button */}
              <VuiButton
                variant="contained"
                color="success"
                disabled={!file || loading || report}
                onClick={handleGenerateReport}
                sx={{ mt: 3 }}
              >
                {loading ? <CircularProgress size={24} /> : "Generate AI Report"}
              </VuiButton>

              {/* Download AI Report Button (Enabled Only if Tumor is Detected) */}
              <VuiButton
                variant="contained"
                color="error"
                disabled={!hasTumor}
                onClick={handleDownloadReport}
                sx={{ mt: 3, ml: 8 }}
              >
                {loading ? <CircularProgress size={24} /> : "Download AI Report"}
              </VuiButton>

              {/* Render AI Report Below */}
              {report && (
                <Card sx={{ mt: 4, p: 2, textAlign: "left" }}>
                  {report.message ? (
                    <VuiTypography variant="subtitle1" color="white">
                      <strong>{report.message}</strong>
                    </VuiTypography>
                  ) : (
                    Object.entries(report)
                      .filter(([key]) => key !== "filename") // Exclude filename
                      .map(([key, value]) => {
                        if (key === "Histological Grade") {
                          value = value === 1 ? "Low" : value === 2 ? "Intermediate" : "High";
                        }
                        return (
                          <VuiTypography key={key} variant="subtitle1" color="white">
                            <strong>{key}:</strong> {value}
                          </VuiTypography>
                        );
                      })
                  )}
                </Card>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* FOOTER ALWAYS AT THE BOTTOM */}
        <Box sx={{ mt: "auto" }}>
          <Footer />
        </Box>
      </Box>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={modalStyle}>
          <img
            src={file ? URL.createObjectURL(file) : ""}
            alt="Uploaded Preview"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

const dropzoneStyle = {
  border: "2px dashed #aaa",
  borderRadius: "10px",
  padding: "20px",
  cursor: "pointer",
  textAlign: "center",
  backgroundColor: "#f9f9f9",
};
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "white",
  boxShadow: 24,
  p: 2,
  borderRadius: "10px",
};

export default Uploads;
