import { Route, Routes } from "react-router";
import RootLayout from "./app/layout";
import Home from "./app/routes/Home";
import Details from "./app/routes/Details";
import Favourites from "./app/routes/Favourites";
import Comparison from "./app/routes/Comparison";
import CreateDevice from "./app/routes/CreateDevice";
import EditDevice from "./app/routes/EditDevice";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/favorites" element={<Favourites />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/create" element={<CreateDevice />} />
        <Route path="/edit/:id" element={<EditDevice />} />
      </Route>
    </Routes>
  );
}
