import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import * as api from "API/api"; 

const VehicleRecord = () => {
  const [phone, setPhone] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length < 10) {
      setError("Enter a valid phone number (10 digits).");
      setVehicles([]);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await api.fetchVehiclesByPhone(cleaned);

      setVehicles(Array.isArray(res) ? res : []);
    } catch (e) {
      setVehicles([]);
      setError("Could not fetch vehicle records.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full p-6">

      <div className="mb-6 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold">Vehicle Record</h1>

        <div className="flex w-full max-w-xl items-center gap-3">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter Owner Phone Number"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-400"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-60"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>


      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-semibold">SN</th>
              <th className="px-4 py-3 font-semibold">Owner Name</th>
              <th className="px-4 py-3 font-semibold">Make</th>
              <th className="px-4 py-3 font-semibold">Model</th>
              <th className="px-4 py-3 font-semibold">Year</th>
              <th className="px-4 py-3 font-semibold">VIN</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {!loading && vehicles.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={7}>
                  No records found. Search by phone number.
                </td>
              </tr>
            ) : (
              vehicles.map((v, idx) => (
                <tr key={v.vehicleId ?? `${v.vin}-${idx}`} className="border-t">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">{v.ownerName}</td>
                  <td className="px-4 py-3">{v.make}</td>
                  <td className="px-4 py-3">{v.model}</td>
                  <td className="px-4 py-3">{v.year}</td>
                  <td className="px-4 py-3">{v.vin}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate("/vehicle-maintenance-record", { state: { vehicle: v } })}
                      className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                    >
                      View Record
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleRecord;
