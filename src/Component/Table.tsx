import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import http from "../Axios/Http";
import { CellClickedEvent } from "ag-grid-community";
import { Button } from "@chakra-ui/react";

const URL = "https://randomuser.me/api/";

const Table = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [includeUsername, setIncludeUsername] = useState(true);
  const [error, setError] = useState(null);
  const gridRef: any = useRef();

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      sortable: true,
    };
  }, []);

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

  const onCellClicked = useCallback((params: CellClickedEvent) => {
    console.log(params);
  }, []);

  const ToggleUsername = () => {
    setIncludeUsername((state) => !state);
    console.log(includeUsername);
  };

  const colDefs = useMemo(() => {
    return [
      {
        field: "name.first",
        headerName: "First Name",
        editable: true,
        rowGroup: true,
      },
      { field: "id.name", headerName: "ID name" },
      { field: "phone" },
      {
        field: "registered.date",
        headerName: "Registered Date",
      },
      { field: "email" },
      { field: "gender" },
      { field: "dob.age", headerName: "Age" },
      { field: "location.city", headerName: "City" },
      {
        field: "login.username",
        headerName: "username",
        hide: !includeUsername, // if hide: false, It will hide the username
      },
      { field: "nat" },
      { field: "cell" },
    ];
  }, [includeUsername]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Button onClick={ToggleUsername}>Toggle Username</Button>
      <div
        className="ag-theme-quartz-dark"
        style={{ height: 400, width: "auto" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={userData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onCellClicked={onCellClicked}
          maintainColumnOrder={true}
          pagination={true}
          animateRows={true}
          autoGroupColumnDef={{ headerName: "Name" }}
        />
      </div>
    </>
  );
};

export default Table;
