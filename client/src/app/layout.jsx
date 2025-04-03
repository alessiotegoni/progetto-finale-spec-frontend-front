import { Container } from "@mui/material";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Container sx={{ pt: 10, pb: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}
