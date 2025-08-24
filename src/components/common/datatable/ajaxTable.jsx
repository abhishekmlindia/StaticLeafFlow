// AjaxTable.jsx
import React, { useState, useEffect } from "react";
import { backendUrl } from '../../../config/appConfig';
import { postRequest } from '../../../config/apiConfig';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import CompanyTable from "./companyTable";
import LoyaltyProgramTable from "./loyaltyProgramTable";
import CurrencyTable from "./currencyTable";
import TiersTable from "./tiersTable";
import RedeemRulesTable from "./redeemRulesTable";
import EarnedRulesTable from "./redeemRulesTable";

const AjaxTable = ({ columns = [], apiEndPoint = "", importURL = "", editFunction = "", deleteFunction = "", componentName = "", tableViewMode = "card", importFlag = true }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [viewMode, setViewMode] = useState(tableViewMode);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchTableData({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        search,
      });

      setData(result.data);
      setTotalCount(result.total);
    };

    loadData();
  }, [pagination.pageIndex, pagination.pageSize, search]);

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    manualPagination: true,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchTableData = async ({ pageIndex, pageSize, search }) => {
  const res = await fetch(
    backendUrl + apiEndPoint + `?page=${pageIndex}&limit=${pageSize}&search=${encodeURIComponent(search || "")}`
  );
  const json = await res.json();
  return {
    data: json.data,
    total: json.total,
  };
};

const importFromExcel = async (event) => {
  event.preventDefault()
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await postRequest(backendUrl + importURL, formData, {
        "Content-Type": "multipart/form-data",
      });
    console.log(response.data.message); // e.g. Inserted 10 records into MongoDB
  } catch (error) {
    console.error("Upload failed:", error);
    alert(error.response?.data?.detail || "The data was successfully imported.");
  }
};

const exportToExcel = (data, filename = "company_data.xlsx") => {
  const flatData = data.map(company => ({
    Company_ID: company.Company_ID,
    Company_Name: company.Company_Name,
    Company_Type: company.Company_Type,
    Company_Coverage_Country: company.Company_Coverage_Country,
    Status: company.Status,
    Website: company.Company_Country?.map(c => c.Company_Website).join(", "),
    Country_IDs: company.Company_Country?.map(c => c.Company_Country_ID).join(", ")
  }));

  const worksheet = XLSX.utils.json_to_sheet(flatData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Companies");

  const excelBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
  const file = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(file, filename);
};

const renderCardView = (componentName, data, editFunction, deleteFunction) => {
  switch (componentName) {
    case "company":
      return (
        <CompanyTable
          data={data}
          editFunction={editFunction}
          deleteFunction={deleteFunction}
        />
      );
    case "loyaltyProgram":
      return (
        <LoyaltyProgramTable
          data={data}
          editFunction={editFunction}
          deleteFunction={deleteFunction}
        />
      );
    case "currency":
      return (
        <CurrencyTable
          data={data}
          editFunction={editFunction}
          deleteFunction={deleteFunction}
        />
      );
    case "tiers":
      return (
        <TiersTable
          data={data}
          editFunction={editFunction}
          deleteFunction={deleteFunction}
        />
      );
    case "earnedRules":
      return (
        <EarnedRulesTable
          data={data}
          editFunction={editFunction}
          deleteFunction={deleteFunction}
        />
      );
    case "redeemRules":
      return (
        <RedeemRulesTable
          data={data}
          editFunction={editFunction}
          deleteFunction={deleteFunction}
        />
      );
    default:
      return <div>No matching component for "{componentName}"</div>;
  }
}

  return (
    <div className="container">
    <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="btn-group" role="group" aria-label="View Toggle">        
          <button
            className={`btn btn-outline-secondary ${viewMode === 'card' ? 'active' : ''}`}
            onClick={() => setViewMode('card')}
          >
            Info Cards
          </button>
          <button
            className={`btn btn-outline-secondary ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            Table View
          </button>
        </div>
        {importFlag === true &&
        <div className="d-flex gap-2">
          {/* <button className="btn btn-success" onClick={() => exportToExcel(data)}>
            Export Data
          </button> */}

          <label className="btn-shadow btn btn-info"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Import data from an Excel (.xlsx) file"
          >
            Import Data
            <input
              type="file"
              accept=".xlsx"
              onChange={importFromExcel}
              hidden
            />
          </label>
        </div>
      }
      </div>
      <input
        className="form-control mb-3"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        }}
      />
{viewMode === "card" ?
renderCardView(componentName, data, editFunction, deleteFunction)
      :
      <>
      <table className="table table-bordered">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>  
      </>
}
      <div className="d-flex justify-content-between align-items-center">
        <span>
          Page {pagination.pageIndex + 1} of{" "}
          {Math.ceil(totalCount / pagination.pageSize)}
        </span>

        <div>
          <button
            className="btn btn-sm btn-secondary me-2"
            onClick={() =>
              table.setPageIndex((prev) => Math.max(prev - 1, 0))
            }
            disabled={pagination.pageIndex === 0}
          >
            Prev
          </button>

          <button
            className="btn btn-sm btn-secondary"
            onClick={() =>
              table.setPageIndex((prev) =>
                prev + 1 < table.getPageCount() ? prev + 1 : prev
              )
            }
            disabled={
              pagination.pageIndex + 1 >= table.getPageCount()
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AjaxTable;