import React, { useState } from "react";
import { Link } from "react-router-dom";
import { backendUrl } from '../../../config/appConfig';
import { FaEdit, FaTrash } from "react-icons/fa";

function CompanyTable({ data, editFunction, deleteFunction }) {
  const handleGetCompany = (id) => {
    editFunction(id);
    console.log("Edit company with ID:", id);
    // Add your logic here
  };

  const handleDeleteCompany = (id) => {
    deleteFunction(id);
    console.log("Delete company with ID:", id);
    // Add your logic here
  };

  return (
    <div className="row">
      {data.map((company) => (
        <div className="col-md-4 mb-4" key={company.Company_ID}>
          <div
            className="card shadow-sm"
            style={{
              backgroundColor: '#e6f2ff',
              border: '1px solid #b3d7ff',
              borderRadius: '8px',
              height: '100%',
            }}
          >
            <div className="card-body p-3">
              <div className="text-center mb-2">
                {company.Company_Logo ? (
                  <img
                    src={`${backendUrl}${company.Company_Logo}`}
                    alt="Company Logo"
                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                  />
                ) : (
                  <div className="text-muted"></div>
                )}
              </div>
              <h5 className="card-title mb-2">{company.Company_Name}</h5>
              <p className="card-text mb-1"><strong>ID:</strong> {company.Company_ID}</p>
              <p className="card-text mb-1"><strong>Type:</strong> {company.Company_Type}</p>
              <p className="card-text mb-1"><strong>Country:</strong> {company.Company_Country && company.Company_Country.length > 0 ? company.Company_Country.map(c => c.Company_Coverage_Country).join(", ") : ""}</p>
              <p className="card-text mb-1"><strong>Status:</strong> {company.Status}</p>
            </div>
            <div className="card-footer d-flex justify-content-between p-2 bg-transparent border-0">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => handleGetCompany(company.Company_ID)}
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDeleteCompany(company.Company_ID)}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CompanyTable;