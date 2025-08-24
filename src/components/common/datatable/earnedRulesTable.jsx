import React, { useState } from "react";
import { Link } from "react-router-dom";
import { backendUrl } from '../../../config/appConfig';
import { FaEdit, FaTrash } from "react-icons/fa";

function EarnedRulesTable({ data, editFunction, deleteFunction }) {

  const handleGetEarnedRules = (id) => {
    editFunction(id);
    console.log("Edit Earned Rule with ID:", id);
    // Add your logic here
  };

  const handleDeleteEarnedRules = (id) => {
    deleteFunction(id);
    console.log("Delete Earned Rule with ID:", id);
    // Add your logic here
  };

  return (
    <div className="row">
      {data.map((earnedRules) => (
        <div className="col-md-4 mb-4" key={earnedRules.Program_ID + "_" + earnedRules.Program_Country_ID}>
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
              <h5 className="card-title mb-2">{earnedRules.Program_Name}</h5>
              <p className="card-text mb-1"><strong>Program ID:</strong> {earnedRules.Program_ID}</p>
              <p className="card-text mb-1"><strong>Currency:</strong> {earnedRules.Currency_Name}</p>
              <p className="card-text mb-1"><strong>Country:</strong> {earnedRules.Program_Coverage_Country}</p>
              <p className="card-text mb-1"><strong>Status:</strong> {earnedRules.Status}</p>
            </div>
            <div className="card-footer d-flex justify-content-between p-2 bg-transparent border-0">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => handleGetEarnedRules(earnedRules.Program_ID)}
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDeleteEarnedRules(earnedRules.Program_ID)}
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

export default EarnedRulesTable;