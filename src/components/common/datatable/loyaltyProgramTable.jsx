import React, { useState } from "react";
import { Link } from "react-router-dom";
import { backendUrl } from '../../../config/appConfig';
import { FaEdit, FaTrash } from "react-icons/fa";

function LoyaltyProgramTable({ data, editFunction, deleteFunction }) {
  const handleGetProgram = (id) => {
    editFunction(id);
    console.log("Edit program with ID:", id);
    // Add your logic here
  };

  const handleDeleteProgram = (id) => {
    deleteFunction(id);
    console.log("Delete program with ID:", id);
    // Add your logic here
  };

  return (
    <div className="row">
      {data.map((program) => (
        <div className="col-md-4 mb-4" key={program.Program_ID}>
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
                {program.Program_Logo ? (
                  <img
                    src={`${backendUrl}${program.Program_Logo}`}
                    alt="program Logo"
                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                  />
                ) : (
                  <div className="text-muted"></div>
                )}
              </div>
              <h5 className="card-title mb-2">{program.Program_Name}</h5>
              <p className="card-text mb-1"><strong>ID:</strong> {program.Program_ID}</p>
              <p className="card-text mb-1"><strong>Type:</strong> {program.Program_Type}</p>
              <p className="card-text mb-1"><strong>Membership Tier:</strong> {program.Membership_Tier_type}</p>
              <p className="card-text mb-1"><strong>Status:</strong> {program.Status}</p>
            </div>
            <div className="card-footer d-flex justify-content-between p-2 bg-transparent border-0">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => handleGetProgram(program.Program_ID)}
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDeleteProgram(program.Program_ID)}
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

export default LoyaltyProgramTable;