import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import http from "../Axios/Http";
import { CellClickedEvent } from "ag-grid-community";
import { Button } from "@chakra-ui/react";
import {
  useFetchFilteredOrderWellLazyQuery,
  // useFetchFilteredOrderWellQuery,
} from "../generated/graphql";

// const URL = "https://randomuser.me/api/";

const Table = () => {
  const [userData, setUserData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [includeUsername, setIncludeUsername] = useState(true);
  const [error, setError] = useState(null);
  const gridRef: any = useRef();

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      sortable: true,
      resizeable: true,
    };
  }, []);

  //Hook for fetching FilteredOrderWell data
  const [fetch] = useFetchFilteredOrderWellLazyQuery();

  async function fetchData() {
    try {
      const { data: newData } = await fetch();
      setUserData(newData?.filteredOrderWell.collection);
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
  };

  const colDefs = useMemo(() => {
    return [
      { field: "id" },
      { field: "customerName", rowGroup: true },
      { field: "driverName" },
      { field: "type" },
      {
        field: "address",
        headerName: "Address",
      },
      { field: "customerErpId", headerName: "Erp ID" },
      {
        field: "deliveredGal",
      },

      { field: "hubName" },

      {
        field: "shipToName",
      },
      { field: "status" },
      {
        headerName: "Supplier",
        children: [
          { field: "supplierName", hide: !includeUsername },
          { field: "PlannedGal", hide: !includeUsername },
          { field: "_typename", hide: !includeUsername },
        ],
      },
      // { field: "supplierName", hide: !includeUsername }, // if hide: false, It will hide the username
      // { field: "PlannedGal", hide: !includeUsername }, // if hide: false, It will hide the username
      // { field: "_typename", hide: !includeUsername }, // if hide: false, It will hide the username
    ];
  }, [includeUsername]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Button onClick={ToggleUsername}>Toggle Supplier Name</Button>
      <div
        className="ag-theme-quartz-dark"
        style={{ height: 600, width: "auto" }}
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
          paginationPageSizeSelector={[10, 20, 30, 40, 50]}
          paginationPageSize={20}
        />
      </div>
    </>
  );
};

export default Table;
