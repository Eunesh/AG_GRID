import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useState, useEffect } from "react";
import http from "../Axios/Http";

const URL = "https://randomuser.me/api/";

const Table = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const response = await http.get(URL);
      setUserData(response.data.results);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const [rowData, setRowData] = useState([
    { name: "Tesla", model: "Model Y", price: 7777, electric: true },
    { name: "Honda", model: "Honda Y", price: 65656, electric: false },
    { name: "Honda", model: "Honda Y", price: 65656, electric: true },
    { name: "Honda", model: "Honda Y", price: 65656, electric: true },
    { name: "Honda", model: "Honda Y", price: 65656, electric: true },
    { name: "Honda", model: "Honda Y", price: 65656, electric: true },
    { name: "Honda", model: "Honda Y", price: 65656, electric: true },
    { name: "Honda", model: "Honda Y", price: 65656, electric: true },
    { name: "Honda", model: "Honda Y", price: 65656, electric: true },
    { name: "Honda", model: "Honda Y", price: 65656, electric: true },
  ]);

  const [colDefs, setColDefs] = useState<any>([
    { field: "name.first", headerName: "First Name" },
    { field: "id.name", headerName: "ID name" },
    { field: "phone" },
    { field: "registered.date", headerName: "Registered Date" },
    { field: "email" },
    { field: "gender" },
    { field: "dob.age", headerName: "Age" },
    { field: "location.city", headerName: "City" },
    { field: "login.username", headerName: "username" },
    { field: "nat" },
    { field: "cell" },
  ]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="ag-theme-quartz" style={{ height: 400, width: "auto" }}>
      <AgGridReact rowData={userData} columnDefs={colDefs} />
    </div>
  );
};

export default Table;
