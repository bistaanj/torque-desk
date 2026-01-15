import React from "react";

const JobCard = ({ data, completeJob }) => {
  const {
    fullName,
    time,
    status,
    services,
    vehicle,
    id,
  } = data;

  const vehicleText = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  const completed = (status==="Scheduled"? false:true)

  return (
    <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">
          {time}
        </span>
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
          {status}
        </span>
      </div>

      
      <div className="mt-3">
        <h3 className="text-lg font-semibold">{vehicleText}</h3>
        <p className="text-sm text-gray-500">
          {vehicle.odo} kms
        </p>
        <p className="text-sm text-gray-600">{fullName}</p>
      </div>

      
      <div className="mt-4">
        <p className="text-sm font-semibold text-gray-700">
          Service Requested
        </p>

        {/* Requires Service list for Service Name  */}
        <ul className="mt-1 list-disc pl-5 text-sm text-gray-600">
          {services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>

      
      <button className="mt-4 w-full rounded-md border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50">
        Job Details
      </button>
      <button onClick={()=> completeJob(id)} 
      disabled={completed}
        className={`mt-4 w-full rounded-md py-2 text-sm font-medium transition-all duration-300
          ${
            completed
              ? "bg-green-500 text-white cursor-default"
              : "border border-gray-300 hover:bg-gray-50"
          }
        `}
      >
        {completed ? "Completed" : "Complete Job"}
      </button>
    </div>
  );
};

export default JobCard;
