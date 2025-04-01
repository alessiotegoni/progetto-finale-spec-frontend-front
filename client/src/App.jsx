import { Route, Routes } from "react-router";
import RootLayout from "./app/layout";
import Home from "./app/routes/Home";
import Details from "./app/routes/Details";
import Favourites from "./app/routes/Favourites";
import Comparison from "./app/routes/Comparison";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/comparison" element={<Comparison />} />
      </Route>
    </Routes>
  );
}
