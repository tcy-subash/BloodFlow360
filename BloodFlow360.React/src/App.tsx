// import { Box, Card, CardContent, Typography } from "@mui/material";

// function App() {
//   return (
//     <Box
//       sx={{
//         backgroundColor: "background.default",
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Card sx={{ width: 500 }}>
//         <CardContent>
//           <Typography variant="h4" gutterBottom>
//             BloodFlow360
//           </Typography>

//           <Typography variant="body1">
//             React Frontend Successfully Configured 🚀
//           </Typography>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

// export default App;















// import { Button, Card, CardContent, Typography } from "@mui/material";
// import api from "./api/axios";

// function App() {
//   async function testAPI() {
//     try {
//       const response = await api.get("/Dashboard");

//       console.log(response.data);

//       alert("Backend Connected Successfully");
//     } catch (error) {
//       console.error(error);

//       alert("Backend Connection Failed");
//     }
//   }

//   return (
//     <Card sx={{ maxWidth: 500, margin: "100px auto", p: 2 }}>
//       <CardContent>
//         <Typography variant="h4">
//           BloodFlow360
//         </Typography>

//         <Button
//           sx={{ mt: 3 }}
//           variant="contained"
//           onClick={testAPI}
//         >
//           Test Backend Connection
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

// export default App;





import { AuthProvider } from "./auth/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  );
}