import React, { useState } from "react";
import { Link } from "react-router-dom";
import { backendUrl } from '../../../config/appConfig';
import { FaEdit, FaTrash } from "react-icons/fa";

function CurrencyTable({ data, editFunction, deleteFunction }) {
  const handleGetCurrency = (id) => {
    editFunction(id);
    console.log("Edit currency with ID:", id);
    // Add your logic here
  };

  const handleDeleteCurrency = (id) => {
    deleteFunction(id);
    console.log("Delete currency with ID:", id);
    // Add your logic here
  };

  return (
    <div className="row">
      {data.map((currency) => (
        <div className="col-md-4 mb-4" key={currency.Currency_Name}>
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
              <h5 className="card-title mb-2">{currency.Currency_Name}</h5>
              <p className="card-text mb-1"><strong>Program:</strong> {currency.Program_Name}</p>
              <p className="card-text mb-1"><strong>Currency Type:</strong> {currency.Program_Currency_Type}</p>
              <p className="card-text mb-1"><strong>Primary Currency:</strong> {currency.Program_Primary_Currency}</p>
              <p className="card-text mb-1"><strong>Transferable:</strong> {currency.Points_Transferability}</p>
            </div>
            <div className="card-footer d-flex justify-content-between p-2 bg-transparent border-0">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => handleGetCurrency(currency.Currency_Name)}
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDeleteCurrency(currency.Currency_ID)}
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

export default CurrencyTable;