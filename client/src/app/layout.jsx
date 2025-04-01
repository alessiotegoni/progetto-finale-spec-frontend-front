import { Container } from "@mui/material";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Container sx={{ my: "2rem" }}>
        <Outlet />
      </Container>
    </>
  );
}
