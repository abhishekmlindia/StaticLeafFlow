import React, { useState, useEffect, useRef } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getRequest } from '../../../config/apiConfig';

const DataTableComponent = ({ tableData, columns, onDelete, url, importUrl = "" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [data, setData] = useState(tableData ? tableData : []);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const effectRan = useRef(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: selectedRowIds,
    },
    onRowSelectionChange: setSelectedRowIds,
    getRowId: (row) => row.id
  });

  useEffect(() => {
    if (effectRan.current) return;
    fetchData(currentPage, search, perPage);
    effectRan.current = true;
  }, [currentPage, search, perPage]);

    const fetchData = async (page, searchQuery, perPage) => {
      try {
        if(url){
        const response = await getRequest(url, {});
        if(response)
        setData(response.data);
        setTotalPages(Math.ceil(10 / perPage)); // Mocked total count
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {

      }
    };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

const importFromExcel = async (event) => {
  const file = event.target.files[0];
  console.log(file)
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(
      "http://localhost:8000/" + importUrl,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    alert(response.data.message); // e.g. Inserted 10 records into MongoDB
  } catch (error) {
    console.error("Upload failed:", error);
    alert(error.response?.data?.detail || "Failed to upload file");
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

  return (
    <>
  <div className="mb-2">
                            {/* Excel Buttons */}
                            <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-success" onClick={() => exportToExcel(data)}>
                                Export Data
                            </button>

                            <label className="btn btn-primary mb-0">
                                Import Data
                                <input
                                type="file"
                                accept=".xlsx"
                                onChange={importFromExcel}
                                hidden
                                />
                            </label>
                            </div>
                            </div>
  <table style={{width: "100%"}} id="example" className="table table-hover table-striped table-bordered">
    <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-200">
              {headerGroup.headers.map((header) => (
                <th className="tableSorting" key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {/* <i class="bi bi-caret-down-fill text-muted"></i>
                  <i class="bi bi-caret-up-fill text-muted"></i> */}
                </th>
              ))}
            </tr>
          ))}
    </thead>
      <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}                                           
     </tbody>
  </table>
    {/* <Row>
        <Col md={6}>
          <div className="dataTablesLength">
            <Form.Label>
              Show
              <Form.Select size="sm">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
              </Form.Select>
              Entries
            </Form.Label>
          </div>
        </Col>
        <Col md={6} className="text-md-end">
          <div className="dataTablesFilter">
          <Form.Label>
              Search:
              <Form.Control
                size="sm"
                type="text"
                // placeholder={`Search by ${columns[0].label}...`}
                value={search}
                onChange={(e) => {
                  e.preventDefault();
                  effectRan.current = false;
                  setSearch(e.target.value);
                }}
              />
            </Form.Label>
          </div>
        </Col>
      </Row> */}
    {/* <Row className="align-items-center">
        <Col md={6}>
          <div className="dataTablesInfo">
          Showing 1 to 10 of 100 entries
          </div>
        </Col>
        <Col md={6}>
          <div className="dataTablesPaginate">
            <ul className="paginationList">
              <li className="paginateButton previousItem disabled">
                <Link to="#" onClick={prevPage} className="pageLink">
                  <i className="bi bi-chevron-left"></i>
                </Link>
              </li>
              <li className="paginateButton active">
                <a className="pageLink">1</a>
              </li>
              <li className="paginateButton">
                <a className="pageLink">2</a>
              </li>
              <li className="paginateButton">
                <a className="pageLink">3</a>
              </li>
              <li className="paginateButton">
                <a className="pageLink">4</a>
              </li>
              <li className="paginateButton">
                <a className="pageLink">5</a>
              </li>
              <li className="paginateButton disabled">
                <a className="pageLink">
                <i className="bi bi-three-dots"></i>
                </a>
              </li>
              <li className="paginateButton">
                <a className="pageLink">10</a>
              </li>
              <li className="paginateButton nextItem">
                <Link to="#" onClick={nextPage} className="pageLink">
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </li>
            </ul>
          </div>    
        </Col>
      </Row> */}
    </>
  );
};

export default DataTableComponent;
