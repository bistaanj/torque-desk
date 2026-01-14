import { useEffect, useState } from "react";

const ClientRecords = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const dummyClients = [
      {
        id: 1,
        name: "Anuj Bista",
        phone: "(519) 555-0101",
        email: "anuj.bista@email.com",
        vehicle: "2017 Audi A4",
      },
      {
        id: 2,
        name: "Sahir Khan",
        phone: "(519) 555-0102",
        email: "sahir.khan@email.com",
        vehicle: "2019 Toyota Camry",
      },
      {
        id: 3,
        name: "Nilima Dahal",
        phone: "(519) 555-0103",
        email: "nilima.dahal@email.com",
        vehicle: "2018 Honda Civic",
      },
      {
        id: 4,
        name: "Rajvir Kaur",
        phone: "(519) 555-0104",
        email: "rajvir.kaur@email.com",
        vehicle: "2020 Hyundai Elantra",
      },
      {
        id: 5,
        name: "Prithvi Bhogal",
        phone: "(519) 555-0105",
        email: "prithvi.bhogal@email.com",
        vehicle: "2016 Ford Focus",
      },
      {
        id: 6,
        name: "Siddhi Shah",
        phone: "(519) 555-0106",
        email: "siddhi.shah@email.com",
        vehicle: "2021 Mazda 3",
      },
      {
        id: 7,
        name: "John Doe",
        phone: "(519) 555-0107",
        email: "john.doe@email.com",
        vehicle: "2015 BMW 3 Series",
      },
      {
        id: 8,
        name: "Emily Clark",
        phone: "(519) 555-0108",
        email: "emily.clark@email.com",
        vehicle: "2022 Kia Sportage",
      },
    ];

    setClients(dummyClients);
  }, []);

  const filteredClients = clients.filter((c) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.vehicle.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-[90%] h-full px-3 sm:px-6 lg:px-8 py-2">
      <div className="flex items-center justify-between border-b border-gray-300 pb-2">
        <h1 className="text-left text-2xl font-semibold">Clients Records</h1>
      </div>

      <div className="mt-4 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, phone, email, vehicle..."
          className="w-full max-w-xl rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border border-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm">
              <th className="border-b border-gray-200 px-4 py-3">SN</th>
              <th className="border-b border-gray-200 px-4 py-3">Name</th>
              <th className="border-b border-gray-200 px-4 py-3">
                Contact Numbers
              </th>
              <th className="border-b border-gray-200 px-4 py-3">Email</th>
              <th className="border-b border-gray-200 px-4 py-3">Vehicle</th>
              <th className="border-b border-gray-200 px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {filteredClients.map((c, i) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="border-b border-gray-200 px-4 py-3">
                  {i + 1}
                </td>
                <td className="border-b border-gray-200 px-4 py-3">{c.name}</td>
                <td className="border-b border-gray-200 px-4 py-3">
                  {c.phone}
                </td>
                <td className="border-b border-gray-200 px-4 py-3">{c.email}</td>
                <td className="border-b border-gray-200 px-4 py-3">
                  {c.vehicle}
                </td>
                <td className="border-b border-gray-200 px-4 py-3">
                  <button className="text-sm font-medium text-blue-600 hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}

            {filteredClients.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientRecords;
