import React from 'react'

const JobCard = ({
  time,
  vehicle,
  customer,
  services,
  status,
  odometer
}) => {
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
        <h3 className="text-lg font-semibold">{vehicle} <h2 className='text-sm+'>{odometer} kms</h2>  </h3>
        <p className="text-sm text-gray-500">{customer}</p>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold text-gray-700">
          Service Requested
        </p>
        <ul className="mt-1 list-disc pl-5 text-sm text-gray-600">
          {services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>

      <button className="mt-4 w-full rounded-md border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50">
        Job Details
      </button>
    </div>
  );
};

export default JobCard;