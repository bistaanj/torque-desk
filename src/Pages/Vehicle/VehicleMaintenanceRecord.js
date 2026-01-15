// VehicleMaintenanceRecord.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VehicleMaintenanceRecord = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const vehicle = state?.vehicle || null;

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!vehicle) return;

    // TODO: Replace with API call:
    // api.fetchMaintenanceRecords(vehicle.vehicleId)
    setLoading(true);

    const dummy = [
      {
        id: 1,
        serviceDate: "2026-01-10",
        serviceType: "Oil Change",
        serviceMileage: "78000",
        description: "Changed oil and filter. Checked fluids.",
      },
      {
        id: 2,
        serviceDate: "2025-10-22",
        serviceType: "Brake Inspection",
        serviceMileage: "74000",
        description: "Front pads inspected, 60% remaining.",
      },
      {
        id: 3,
        serviceDate: "2025-08-05",
        serviceType: "Battery Replacement",
        serviceMileage: "71000",
        description: "Installed new battery. Cleaned terminals.",
      },
    ];

    setTimeout(() => {
      setRecords(dummy);
      setLoading(false);
    }, 300);
  }, [vehicle]);

  if (!vehicle) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold">Vehicle Maintenance Record</h1>
          <p className="mt-2 text-sm text-gray-600">
            No vehicle selected. Please go back and click <b>View Record</b>.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const vehicleTitle = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-gray-300 pb-2">
        <div>
          <h1 className="text-2xl font-semibold">Vehicle Maintenance Record</h1>
          <p className="mt-1 text-sm text-gray-600">View service history</p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Back
        </button>
      </div>

      {/* Vehicle Details */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-700">Vehicle Details</p>
        <h2 className="mt-1 text-xl font-semibold">{vehicleTitle}</h2>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 p-3">
            <p className="text-xs font-medium text-gray-500">VIN</p>
            <p className="mt-1 text-sm text-gray-800">{vehicle.vin || "-"}</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-3">
            <p className="text-xs font-medium text-gray-500">Plate</p>
            <p className="mt-1 text-sm text-gray-800">{vehicle.plate || "-"}</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-3">
            <p className="text-xs font-medium text-gray-500">Odometer</p>
            <p className="mt-1 text-sm text-gray-800">
              {vehicle.odometer || vehicle.odo || "-"} kms
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-3">
            <p className="text-xs font-medium text-gray-500">Owner</p>
            <p className="mt-1 text-sm text-gray-800">
              {vehicle.ownerName || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-semibold">SN</th>
              <th className="px-4 py-3 font-semibold">Service Date</th>
              <th className="px-4 py-3 font-semibold">Service Type</th>
              <th className="px-4 py-3 font-semibold">Service Mileage</th>
              <th className="px-4 py-3 font-semibold">Description</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={5}>
                  Loading records...
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={5}>
                  No maintenance records found.
                </td>
              </tr>
            ) : (
              records.map((r, idx) => (
                <tr key={r.id ?? idx} className="border-t">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">{r.serviceDate}</td>
                  <td className="px-4 py-3">{r.serviceType}</td>
                  <td className="px-4 py-3">{r.serviceMileage} kms</td>
                  <td className="px-4 py-3 text-gray-700">{r.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleMaintenanceRecord;
