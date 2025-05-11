import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Slider,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import VuiButton from "components/VuiButton";
import VuiTypography from "components/VuiTypography";
import VuiBox from "components/VuiBox";

const sliderFields = [
  "air_pollution",
  "dust_allergy",
  "occupational_hazards",
  "genetics",
  "chronic_lung",
  "obesity",
  "smoking",
  "passive_smoker",
  "chest_pain",
  "coughing_of_blood",
  "weight_loss",
  "wheezing",
  "frequent_cold",
  "dry_cough",
  "snoring",
];

function LungPredictor() {
  const initialValues = sliderFields.reduce((acc, field) => ({ ...acc, [field]: 0 }), {});
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSliderChange = (field) => (event, newValue) => {
    setValues((prev) => ({ ...prev, [field]: newValue }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    const filteredValues = Object.fromEntries(Object.entries(values).filter(([_, v]) => v !== 0));

    try {
      const response = await axios.post("http://localhost:4000/predict-lung", filteredValues);
      setResult(response.data.data);
    } catch (err) {
      setError("Failed to get prediction. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    setResult(null);
    setError("");
  };

  const allZero = Object.values(values).every((val) => val === 0);

  const toTitleCase = (str) =>
    str.replace(/_/g, " ").replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "yellow";
      default:
        return "white";
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox display="flex" flexDirection="column" minHeight="400px">
        <VuiBox flexGrow={1} display="flex" justifyContent="center" alignItems="center">
          <Card sx={{ p: 2, width: "90%", mt:2 , mb:4}}>
            <VuiTypography variant="h2" color="info" textGradient textAlign="center">
              Lung Cancer Risk Predictor
            </VuiTypography>
            <VuiTypography textAlign="center" variant="body2" color="white" mb={2} mt={3}>
              This tool predicts the risk of lung cancer and its level based on various health and lifestyle factors. On a scale of 0 to 10, please rate the following factors based on your health and lifestyle that you seem appropriate:
            </VuiTypography>
            <CardContent>
              <Grid container spacing={3}>
                {[0, 1, 2].map((col) => (
                  <Grid item xs={12} md={4} key={col}>
                    {sliderFields.slice(col * 5, (col + 1) * 5).map((field) => (
                      <VuiBox key={field} mb={2}>
                        <Typography variant="h5" color="white">
                            {toTitleCase(field)}
                        </Typography>
                        <Slider
                          value={values[field]}
                          onChange={handleSliderChange(field)}
                          step={1}
                          min={0}
                          max={10}
                          valueLabelDisplay="auto"
                          sx={{ width: "90%", height: 4 }}
                        />
                      </VuiBox>
                    ))}
                  </Grid>
                ))}
              </Grid>

              <VuiBox display="flex" justifyContent="center" gap={2} mt={2}>
                <VuiButton
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                  disabled={allZero || loading}
                  sx={{ minWidth: 140 }}
                >
                  {loading ? <CircularProgress size={24} /> : "Predict Risk"}
                </VuiButton>
                <VuiButton variant="contained" color="error" onClick={handleReset} sx={{ minWidth: 140 }}>
                  Reset
                </VuiButton>
              </VuiBox>

              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              {result && (
                <Card sx={{ mt: 3, p: 2, textAlign: "center", width: "100%" }}>
                  <VuiTypography variant="h5" color="white">
                    Random Forest Algorithm Prediction Result
                  </VuiTypography>
                  {Object.entries(result)
                    .sort(([, a], [, b]) => parseFloat(b) - parseFloat(a))
                    .map(([risk, percentage]) => (
                      <VuiTypography key={risk} variant="subtitle1">
                        <strong style={{ color: getRiskColor(risk) }}>{risk}</strong>: {" "}
                        <span style={{ color: "white" }}>{percentage}%</span>
                      </VuiTypography>
                    ))}
                </Card>
              )}
            </CardContent>
          </Card>
        </VuiBox>
        <VuiBox mt="auto">
          
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default LungPredictor;
