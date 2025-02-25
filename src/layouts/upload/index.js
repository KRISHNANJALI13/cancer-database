import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Card, CardContent, Box, Typography, Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import VuiButton from "components/VuiButton";
import VuiTypography from "components/VuiTypography";

function Uploads() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log("Accepted Files:", acceptedFiles);
  console.log("Rejected Files:", rejectedFiles);
    if (rejectedFiles.length > 0) {
      setError("Invalid file type! Only JPG and PNG are allowed.");
      setFile(null);
      setReport(null);
      return;
    }

    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError("");
      setReport(null);
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
    const filename = file.name.split(".")[0];

    try {
      const response = await axios.get(`http://localhost:4000/uploads/${filename}`);
      setReport(response.data);
    } catch (error) {
      console.error("Error generating report:", error);
      setError("Failed to generate report. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!report || !report.filename) return;
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
                <Typography variant="h5">
                  Click to select a file
                </Typography>
                <Typography variant="caption">(Only JPG or PNG allowed)</Typography>
              </div>

              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

              {file && (
                <VuiTypography variant="body1" sx={{ mt: 2 }}>
                  Selected File: {file.name}
                </VuiTypography>
              )}

              {/* Generate AI Report Button */}
              <VuiButton
  variant="contained"
  color="success"
  disabled={!file || loading || report} // Disable when report is generated
  onClick={handleGenerateReport}
  sx={{ mt: 3 }}
>
  {loading ? <CircularProgress size={24} /> : "Generate AI Report"}
</VuiButton>


              <VuiButton
                variant="contained"
                color="error"
                disabled={!file || loading}
                onClick={handleDownloadReport}
                sx={{ mt: 3, ml: 8 }}
              >
                {loading ? <CircularProgress size={24} /> : "Download AI Report"}
              </VuiButton>

              {/* Render AI Report Below */}
              {report && (
                <Card sx={{ mt: 4, p: 2, textAlign: "left" }}>
                  {Object.entries(report)
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
                    })}
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

export default Uploads;
