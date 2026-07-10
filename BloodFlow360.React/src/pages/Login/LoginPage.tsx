import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  Visibility,
  VisibilityOff,
  Bloodtype,
  Person,
  Lock,
  Email,
  Phone,
} from "@mui/icons-material";

import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../auth/AuthContext";
import AuthService from "../../services/AuthService";
import toast, { Toaster } from "react-hot-toast";
import BorderGlow from "../../design-system/glow/BorderGlow";
import Antigravity from "../../design-system/glow/Antigravity";



// Styled Glassy Text Field (no label, matches user image)
const GlassTextField = styled(TextField)({
  margin: 0,
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
    color: "#ffffff",
    overflow: "hidden",
    paddingLeft: 12,
    height: "54px",
    "& fieldset": {

      border: "1px solid rgba(255, 255, 255, 0.12)",

    },
    "&:hover fieldset": {
      borderColor: "rgba(6, 5, 5, 0.3)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(255, 0, 0, 0.5)",
      borderWidth: "1px",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "14px 16px",
    color: "#ffffff",
    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.5)",
      opacity: 1,
    },
  },
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // View state: 'login' | 'register' | 'forgot'
  const [view, setView] = useState<"login" | "register" | "forgot">("login");

  // Common error state
  const [error, setError] = useState("");

  // Login inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Register inputs
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Forgot password inputs
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and Password are required.");
      toast.error("Email and Password are required.");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      toast.success("Welcome back to BloodFlow360!");
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password.");
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setError("");
    if (!regUsername || !regEmail || !regPhone || !regPassword) {
      setError("All fields are required.");
      toast.error("All fields are required.");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    if (regPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setRegLoading(true);
      await AuthService.register({
        username: regUsername,
        email: regEmail,
        phoneNumber: regPhone,
        password: regPassword,
      });

      toast.success("Account created successfully! Logging you in...");
      // Auto login
      await login(regEmail, regPassword);
      navigate("/dashboard");
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Registration failed.";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setRegLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    if (!forgotEmail) {
      setError("Please enter your email address.");
      toast.error("Email address is required.");
      return;
    }

    try {
      setForgotLoading(true);
      // Simulate API call for forgot password
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Password reset link sent to your email!");
      // Reset and switch back to login
      setForgotEmail("");
      setView("login");
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  const switchView = (newView: "login" | "register" | "forgot") => {
    setError("");
    setView(newView);
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  return (
    <Box
      sx={{
        "@keyframes gradientBG": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        minHeight: "100vh",
        background: "linear-gradient(-45deg, #1c0003, #4a030d, #800619, #c62828, #f5f5f5, #4a030d)",
        backgroundSize: "450% 450%",
        animation: "gradientBG 20s ease infinite",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Background Antigravity Particle System */}
      <div style={{ width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ width: "1080px", height: "1080px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <Antigravity
            count={450}
            magnetRadius={17}
            ringRadius={8}
            waveSpeed={0.4}
            waveAmplitude={1}
            particleSize={2}
            lerpSpeed={0.1}
            color="#FF9FFC"
            autoAnimate={false}
            particleVariance={1}
            rotationSpeed={0}
            depthFactor={1}
            pulseSpeed={3}
            particleShape="capsule"
            fieldStrength={10}
          />
        </div>
      </div>

      {/* Background Orbs for Premium Depth */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(198,40,40,0.2) 0%, rgba(198,40,40,0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <Toaster position="top-right" reverseOrder={false} />

      <BorderGlow
        edgeSensitivity={30}
        glowColor="40 80 80"
        backgroundColor="rgba(18, 15, 23, 0.45)"
        borderRadius={28}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={["#800619", "#c0c0c0", "#800619"]}
        style={{ width: "100%", maxWidth: "440px", zIndex: 2 }}
      >
        <CardContent sx={{ p: { xs: 4, sm: 5 }, color: "#ffffff" }}>
          <Stack spacing={4}>
            {/* Branding Header (Static) */}
            <Stack spacing={1} sx={{ alignItems: "center", mb: 1 }}>
              <Bloodtype
                sx={{
                  fontSize: 64,
                  color: "#ff3366",
                  filter: "drop-shadow(0 0 10px rgba(255, 51, 102, 0.6))",
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "0.5px",
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                BloodFlow360
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                }}
              >
                Blood Bank Management System
              </Typography>
            </Stack>

            {/* Error Display */}
            {error && (
              <Alert
                severity="error"
                sx={{
                  backgroundColor: "rgba(211, 47, 47, 0.2)",
                  color: "#ffffff",
                  border: "1px solid rgba(211, 47, 47, 0.3)",
                  borderRadius: "10px",
                  "& .MuiAlert-icon": { color: "#ff8a80" },
                }}
              >
                {error}
              </Alert>
            )}

            {/* Animated View Container */}
            <AnimatePresence mode="wait">
              {view === "login" && (
                <motion.div
                  key="login"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={cardVariants}
                >
                  <Stack spacing={3.5}>
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "center",
                        fontWeight: 700,
                        fontFamily: "vardana",
                        color: "rgba(255, 255, 255, 0.95)",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Login🩸
                    </Typography>

                    <GlassTextField
                      placeholder="Username / Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{
                                marginRight: 2,
                                backgroundColor: "rgba(0, 0, 0, 0.25)",
                                borderRight: "1px solid rgba(255, 255, 255, 0.12)",
                                color: "rgba(255, 255, 255, 0.65)",
                                width: "54px",
                                height: "54px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Person sx={{ fontSize: 22 }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />

                    <GlassTextField
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{
                                marginRight: 2,
                                backgroundColor: "rgba(0, 0, 0, 0.25)",
                                borderRight: "1px solid rgba(255, 255, 255, 0.12)",
                                color: "rgba(255, 255, 255, 0.65)",
                                width: "54px",
                                height: "54px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Lock sx={{ fontSize: 22 }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end" sx={{ pr: 1.5 }}>
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />

                    <Button
                      size="large"
                      variant="contained"
                      onClick={handleLogin}
                      disabled={loading}
                      sx={{
                        backgroundColor: "#ffffff",
                        color: "#800619",
                        fontWeight: 700,
                        height: "50px",
                        fontSize: "15px",
                        borderRadius: "10px",
                        letterSpacing: "1px",
                        boxShadow: "0 4px 15px rgba(255,255,255,0.15)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          transform: "translateY(-1px)",
                          boxShadow: "0 6px 20px rgba(255,255,255,0.2)",
                        },
                        "&.Mui-disabled": {
                          backgroundColor: "rgba(255,255,255,0.6)",
                          color: "rgba(128,6,25,0.6)",
                        },
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      {loading ? (
                        <CircularProgress color="inherit" size={24} />
                      ) : (
                        "LOGIN"
                      )}
                    </Button>

                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "center",
                        color: "rgba(255, 255, 255, 0.7)",
                        mt: 1,
                      }}
                    >
                      Forgot Password?{" "}
                      <span
                        onClick={() => switchView("forgot")}
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                          fontWeight: 600,
                          color: "#ffffff",
                        }}
                      >
                        Click Here
                      </span>
                    </Typography>

                    {/* Divider Line */}
                    <Box
                      sx={{
                        height: "1px",
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
                        my: 1.5,
                      }}
                    />

                    <Button
                      size="large"
                      variant="contained"
                      onClick={() => switchView("register")}
                      sx={{
                        backgroundColor: "#c62828",
                        color: "#ffffff",
                        fontWeight: 700,
                        height: "50px",
                        fontSize: "15px",
                        borderRadius: "10px",
                        letterSpacing: "1px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 4px 15px rgba(198,40,40,0.2)",
                        "&:hover": {
                          backgroundColor: "#b71c1c",
                          transform: "translateY(-1px)",
                          boxShadow: "0 6px 20px rgba(198,40,40,0.3)",
                        },
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      REGISTER
                    </Button>
                  </Stack>
                </motion.div>
              )}

              {view === "register" && (
                <motion.div
                  key="register"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={cardVariants}
                >
                  <Stack spacing={3.5}>
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "center",
                        fontWeight: 700,
                        color: "rgba(255, 255, 255, 0.95)",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Register Account
                    </Typography>

                    <GlassTextField
                      placeholder="Username"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{
                                marginRight: 2,
                                backgroundColor: "rgba(0, 0, 0, 0.25)",
                                borderRight: "1px solid rgba(255, 255, 255, 0.12)",
                                color: "rgba(255, 255, 255, 0.65)",
                                width: "54px",
                                height: "54px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Person sx={{ fontSize: 22 }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />

                    <GlassTextField
                      placeholder="Email Address"
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{
                                marginRight: 2,
                                backgroundColor: "rgba(0, 0, 0, 0.25)",
                                borderRight: "1px solid rgba(255, 255, 255, 0.12)",
                                color: "rgba(255, 255, 255, 0.65)",
                                width: "54px",
                                height: "54px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Email sx={{ fontSize: 22 }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />

                    <GlassTextField
                      placeholder="Phone Number"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{
                                marginRight: 2,
                                backgroundColor: "rgba(0, 0, 0, 0.25)",
                                borderRight: "1px solid rgba(255, 255, 255, 0.12)",
                                color: "rgba(255, 255, 255, 0.65)",
                                width: "54px",
                                height: "54px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Phone sx={{ fontSize: 22 }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />

                    <GlassTextField
                      placeholder="Password"
                      type={showRegPassword ? "text" : "password"}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{
                                marginRight: 2,
                                backgroundColor: "rgba(0, 0, 0, 0.25)",
                                borderRight: "1px solid rgba(255, 255, 255, 0.12)",
                                color: "rgba(255, 255, 255, 0.65)",
                                width: "54px",
                                height: "54px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Lock sx={{ fontSize: 22 }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end" sx={{ pr: 1.5 }}>
                              <IconButton
                                onClick={() => setShowRegPassword(!showRegPassword)}
                                sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                              >
                                {showRegPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />

                    <GlassTextField
                      placeholder="Confirm Password"
                      type={showRegPassword ? "text" : "password"}
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{
                                marginRight: 2,
                                backgroundColor: "rgba(0, 0, 0, 0.25)",
                                borderRight: "1px solid rgba(255, 255, 255, 0.12)",
                                color: "rgba(255, 255, 255, 0.65)",
                                width: "54px",
                                height: "54px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Lock sx={{ fontSize: 22 }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />

                    <Button
                      size="large"
                      variant="contained"
                      onClick={handleRegister}
                      disabled={regLoading}
                      sx={{
                        backgroundColor: "#ffffff",
                        color: "#800619",
                        fontWeight: 700,
                        height: "50px",
                        fontSize: "15px",
                        borderRadius: "10px",
                        letterSpacing: "1px",
                        boxShadow: "0 4px 15px rgba(255,255,255,0.15)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          transform: "translateY(-1px)",
                          boxShadow: "0 6px 20px rgba(255,255,255,0.2)",
                        },
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      {regLoading ? (
                        <CircularProgress color="inherit" size={24} />
                      ) : (
                        "CREATE ACCOUNT"
                      )}
                    </Button>

                    {/* Divider Line */}
                    <Box
                      sx={{
                        height: "1px",
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
                        my: 1.5,
                      }}
                    />

                    <Button
                      size="large"
                      variant="contained"
                      onClick={() => switchView("login")}
                      sx={{
                        backgroundColor: "#c62828",
                        color: "#ffffff",
                        fontWeight: 700,
                        height: "50px",
                        fontSize: "15px",
                        borderRadius: "10px",
                        letterSpacing: "1px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 4px 15px rgba(198,40,40,0.2)",
                        "&:hover": {
                          backgroundColor: "#b71c1c",
                          transform: "translateY(-1px)",
                          boxShadow: "0 6px 20px rgba(198,40,40,0.3)",
                        },
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      BACK TO LOGIN
                    </Button>
                  </Stack>
                </motion.div>
              )}

              {view === "forgot" && (
                <motion.div
                  key="forgot"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={cardVariants}
                >
                  <Stack spacing={3.5}>
                    <Stack spacing={1}>
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                          fontWeight: 700,
                          color: "rgba(255, 255, 255, 0.95)",
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                        }}
                      >
                        Reset Password
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "center",
                          color: "rgba(255, 255, 255, 0.6)",
                          px: 2,
                          lineHeight: 1.5,
                        }}
                      >
                        Enter your email address and we'll send you a link to reset your password.
                      </Typography>
                    </Stack>

                    <GlassTextField
                      placeholder="Email Address"
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{
                                marginRight: 2,
                                backgroundColor: "rgba(0, 0, 0, 0.25)",
                                borderRight: "1px solid rgba(255, 255, 255, 0.12)",
                                color: "rgba(255, 255, 255, 0.65)",
                                width: "54px",
                                height: "54px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Email sx={{ fontSize: 22 }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />

                    <Button
                      size="large"
                      variant="contained"
                      onClick={handleForgotPassword}
                      disabled={forgotLoading}
                      sx={{
                        backgroundColor: "#ffffff",
                        color: "#800619",
                        fontWeight: 700,
                        height: "50px",
                        fontSize: "15px",
                        borderRadius: "10px",
                        letterSpacing: "1px",
                        boxShadow: "0 4px 15px rgba(255,255,255,0.15)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          transform: "translateY(-1px)",
                          boxShadow: "0 6px 20px rgba(255,255,255,0.2)",
                        },
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      {forgotLoading ? (
                        <CircularProgress color="inherit" size={24} />
                      ) : (
                        "SEND RESET LINK"
                      )}
                    </Button>

                    {/* Divider Line */}
                    <Box
                      sx={{
                        height: "1px",
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
                        my: 1.5,
                      }}
                    />

                    <Button
                      size="large"
                      variant="contained"
                      onClick={() => switchView("login")}
                      sx={{
                        backgroundColor: "#c62828",
                        color: "#ffffff",
                        fontWeight: 700,
                        height: "50px",
                        fontSize: "15px",
                        borderRadius: "10px",
                        letterSpacing: "1px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 4px 15px rgba(198,40,40,0.2)",
                        "&:hover": {
                          backgroundColor: "#b71c1c",
                          transform: "translateY(-1px)",
                          boxShadow: "0 6px 20px rgba(198,40,40,0.3)",
                        },
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      BACK TO LOGIN
                    </Button>
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>
          </Stack>
        </CardContent>
      </BorderGlow>
    </Box >
  );
}