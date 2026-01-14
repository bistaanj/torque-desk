import React, { useEffect, useState } from 'react'
import JobCard from 'Components/JobCard'
import { data } from 'react-router-dom';
const Appointment = () => {

    let displayTime = true;
    let displayUi = false;
    const [availableSlots, setAvailableSlots] = useState([]);

    

        // slots for ui purpose 
    const uiSlots = [
        ["0", "8:00"],
        ["1", "8:15"],
        ["2", "8:30"],
        ["3", "8:45"],
        ["4", "9:00"],
        ["5", "9:15"],
        ["6", "9:30"],
        ["7", "9:45"],
        ["8", "10:00"],
        ["9", "10:15"],
        ["10", "10:30"],
        ["11", "10:45"],
        ["12", "11:00"],
        ["13", "11:15"],
        ["14", "11:30"],
        ["15", "11:45"],
        ["16", "12:00"],
        ["17", "12:15"],
        ["18", "12:30"],
        ["19", "12:45"],
        ["20", "1:00"],
        ["21", "1:15"],
        ["22", "1:30"],
        ["23", "1:45"],
        ["24", "2:00"],
        ["25", "2:15"],
        ["26", "2:30"],
        ["27", "2:45"],
        ["28", "3:00"],
        ["29", "3:15"],
        ["30", "3:30"],
        ["31", "3:45"],
        ["32", "4:00"],
        ["33", "4:15"],
        ["34", "4:30"],
        ["35", "4:45"],
    ];

    const indexes = Object.keys(availableSlots).map(Number);

    const ranges = [];
    let start = indexes[0];
    let prev = indexes[0];

    for (let i = 1; i < indexes.length; i++) {
        const curr = indexes[i];

        if (curr !== prev + 1) {
            ranges.push([start, prev]);
            start = curr;
        }

        prev = curr;
    }
    ranges.push([start, prev]);

    // helper to check if index is inside any range
    // const isInRange = (idx) =>
    //     ranges.some(([s, e]) => idx >= s && idx <= e);
    const timeList = ranges.flat();


    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        // dummy data for jobs
        const dummyJobs = [
            {
                id: 1,
                time: "10:00 AM",
                vehicle: "2017 Audi A4",
                customer: "Anuj Bista",
                services: ["Oil Change", "Brake Pads Replacement"],
                odometer: "18000",
                status: "Pending",
            },
            {
                id: 2,
                time: "11:15 AM",
                vehicle: "2019 Toyota Camry",
                customer: "Sahil Khan",
                services: ["Tire Rotation"],
                odometer: "125000",
                status: "Pending",
            },
            {
                id: 3,
                time: "12:30 PM",
                vehicle: "2018 Honda Civic",
                customer: "John Doe",
                services: ["Engine Diagnostics"],
                odometer: "75000",
                status: "Pending",
            },
            {
                id: 4,
                time: "2:00 PM",
                vehicle: "2020 BMW X3",
                customer: "Alex Smith",
                services: ["Oil Change"],
                odometer: "154800",
                status: "Pending",
            },
            {
                id: 5,
                time: "3:45 PM",
                vehicle: "2016 Ford Focus",
                customer: "Emily Clark",
                services: ["Brake Inspection"],
                odometer: "225000",
                status: "Pending",
            },
        ];

        // dummy data for available slots 

        const dummyAvailableSlots = {
        0: "8:00 AM",
        1: "8:15 AM",
        2: "8:30 AM",
        3: "8:45 AM",
        4: "9:00 AM",
        5: "9:15 AM",
        6: "9:30 AM",
        7: "9:45 AM",
        12: "11:00 AM",
        16: "12:00 PM",
        17: "12:15 PM",
        18: "1:30 PM",
        23: "1:45 PM",
        28: "3:00 PM",
        29: "3:15 PM",

    };
        setAvailableSlots(dummyAvailableSlots);
        

        setJobs(dummyJobs);
    }, []);



    return (
        <>
            <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                <h1 className="text-left text-2xl font-semibold">
                    Appointments
                </h1>

                <div className="flex items-center gap-3 mr-20">
                    <input
                        type="date"
                        className="rounded-md border border-gray-300 px-2 py-2 text-sm outline-none focus:border-gray-400"
                    />

                    <button className="rounded-md bg-black px-3 py-2 text-sm text-white">
                        + Create Appointment
                    </button>
                </div>
            </div>

            <div className=' text-center font-semibold mt-6 mb-4 ' >
                <h2> This is how your day looks like</h2>

            </div>
            <div className="mt-2 flex w-full justify-evenly flex-col gap-4 lg:flex-row">
                {/* This is timeline div */}
                {/* <div className='flex justify-center w-[60%]'>This is Appointment Timeline</div> */}

                <div className="flex w-[80%] items-end">
                    {uiSlots.map(([index, time]) => {
                        const idx = Number(index);
                        const isAvailable = availableSlots.hasOwnProperty(index);
                        const active = timeList.includes(idx);

                        return (
                            <div key={index} className="flex flex-1 flex-col gap-1">
                                <div
                                    className={`h-12 w-full rounded-sm ${isAvailable ? "bg-gray-300" : "bg-blue-500"
                                        }`}
                                >
                                    <span className="w-full text-left text-sm">
                                        {active ? time : ""}
                                    </span>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
            <div className=' text-left font-semibold mt-6 mb-4 ' >
                <h2> Jobs for the day.</h2>

            </div>

            <div className="flex w-full flex-wrap gap-4">
                {jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        time={job.time}
                        vehicle={job.vehicle}
                        customer={job.customer}
                        services={job.services}
                        status={job.status}
                        odometer={job.odometer}
                    />
                ))}
            </div>





        </>
    )
}

export default Appointment