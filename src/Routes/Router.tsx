import { Route, Routes } from "react-router-dom";
import Table from "../Component/Table";
import Login from "../Pages/Login";

const Router = () => {
  return (
    <Routes>
      <Route path="/table" element={<Table />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default Router;
