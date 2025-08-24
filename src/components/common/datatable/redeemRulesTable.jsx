import React, { useState } from "react";
import { Link } from "react-router-dom";
import { backendUrl } from '../../../config/appConfig';
import { FaEdit, FaTrash } from "react-icons/fa";

function RedeemRulesTable({ data, editFunction, deleteFunction }) {

  const handleGetRedeemRules = (id) => {
    editFunction(id);
    console.log("Edit Redeem Rule with ID:", id);
    // Add your logic here
  };

  const handleDeleteRedeemRules = (id) => {
    deleteFunction(id);
    console.log("Delete Redeem Rule with ID:", id);
    // Add your logic here
  };

  return (
    <div className="row">
      {data.map((redeemRules) => (
        <div className="col-md-4 mb-4" key={redeemRules.Program_ID + "_" + redeemRules.Program_Country_ID}>
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
              <h5 className="card-title mb-2">{redeemRules.Program_Name}</h5>
              <p className="card-text mb-1"><strong>Program ID:</strong> {redeemRules.Program_ID}</p>
              <p className="card-text mb-1"><strong>Country:</strong> {redeemRules.Program_Coverage_Country}</p>
              <p className="card-text mb-1"><strong>Currency:</strong> {redeemRules.Country_Currency}</p>
              <p className="card-text mb-1"><strong>Redeem Points:</strong> {redeemRules.Reedeem_Points}</p>
            </div>
            <div className="card-footer d-flex justify-content-between p-2 bg-transparent border-0">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => handleGetRedeemRules(redeemRules.Program_ID)}
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDeleteRedeemRules(redeemRules.Program_ID)}
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

export default RedeemRulesTable;