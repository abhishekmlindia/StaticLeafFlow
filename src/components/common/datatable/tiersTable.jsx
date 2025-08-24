import React, { useState } from "react";
import { Link } from "react-router-dom";
import { backendUrl } from '../../../config/appConfig';
import { FaEdit, FaTrash } from "react-icons/fa";

function TiersTable({ data, editFunction, deleteFunction }) {
  const handleGetTiers = (id) => {
    editFunction(id);
    console.log("Edit tier with ID:", id);
    // Add your logic here
  };

  const handleDeleteTier = (id) => {
    deleteFunction(id);
    console.log("Delete tier with ID:", id);
    // Add your logic here
  };

  return (
    <div className="row">
      {data.map((tiers, index) => (
        <div className="col-md-4 mb-4" key={tiers.Program_Name}>
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
              <h5 className="card-title mb-2">{tiers.Program_Name}</h5>
              <p className="card-text mb-1"><strong>Program:</strong> {tiers.Program_Name}</p>
              <p className="card-text mb-1"><strong>Tiers:</strong> {tiers.tiers.length}</p>
              {/* <p className="card-text mb-1"><strong>Country:</strong> {tiers.Program_Coverage_Country}</p>
              <p className="card-text mb-1"><strong>Status:</strong> {tiers.Status}</p> */}
            </div>
            <div className="card-footer d-flex justify-content-between p-2 bg-transparent border-0">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => handleGetTiers(tiers.Program_Name)}
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDeleteTier(tiers.Program_Name)}
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

export default TiersTable ;