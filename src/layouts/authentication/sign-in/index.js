import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";

function SignIn() {
  const [credentials, setCredentials] = useState({ uname: "", pwd: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();


  // Handle input change
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submission (Login API Call)
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:4000/auth/login", credentials);
      console.log(response);
      if (response.data.statusCode === 200) {
        sessionStorage.setItem("uname", credentials.uname); // Store token if provided
        console.log(credentials.uname);
        navigate("/tables"); // Redirect to dashboard
      }
    } catch (err) {
      console.error("Login Error:", err.response ? err.response.data : err.message); // Log error response
      setError(err.response?.data?.message || "Invalid username or password");
    }
    
    
  };

  return (
    <CoverLayout
      title="Nice to see you!"
      color="white"
      description="Enter your username and password to sign in"
      premotto="INSPIRED BY THE FUTURE:"
      motto="A CANCER DATABASE"
      image={bgSignIn}
    >
      <VuiBox component="form" role="form" onSubmit={handleLogin}>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Username
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="text"
              placeholder="Enter your username..."
              name="uname"
              value={credentials.uname}
              onChange={handleChange}
              fontWeight="500"
            />
          </GradientBorder>
        </VuiBox>

        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Password
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="password"
              placeholder="Enter your password..."
              name="pwd"
              value={credentials.pwd}
              onChange={handleChange}
              sx={({ typography: { size } }) => ({ fontSize: size.sm })}
            />
          </GradientBorder>
        </VuiBox>


        {/* Show error if authentication fails */}
        {error && (
          <VuiTypography variant="button" color="error" fontWeight="medium">
            {error}
          </VuiTypography>
        )}

        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" fullWidth type="submit">
            SIGN IN
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;
