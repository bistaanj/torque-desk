import React, { useEffect, useState } from 'react'
import JobCard from 'Components/JobCard'
import { data } from 'react-router-dom';
import * as api from 'API/api';
import Timeline from 'Components/Timeline';
const Appointment = () => {

    let displayTime = true;
    let displayUi = false;
    const today = new Date().toISOString().split("T")[0];
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(today);
    const [appointmentData, setAppointmentData] = useState([]);

    const getAppointments = async () => {
            const response = await api.fetchAppointments(selectedDate);
            console.log("Fetched Appointments:", response);
            setAppointmentData(response);
        }

        
        const handleJobCompletion = async (appointmentId) => {
            const response = await api.completeJob(appointmentId);
            if (!response) return;
            await getAppointments();
        }
        useEffect(() => {
            
            getAppointments();
        

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



    }, [selectedDate]);



    return (
        <>
            <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                <h1 className="text-left text-2xl font-semibold">
                    Appointments
                </h1>

                <div className="flex items-center gap-3 mr-20">
                    <input
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                        }}
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

            {/* Timeline div */}
            <div className="mt-2 flex w-full justify-evenly flex-col gap-4 lg:flex-row">
                <Timeline slotsMap={availableSlots} />
            </div>
            <div className=' text-left font-semibold mt-6 mb-4 ' >
                <h2> Jobs for the day.</h2>

            </div>

            <div className="flex w-full flex-wrap gap-4">
                {appointmentData.map((job, index) => (
                    <JobCard key={index} data={job} completeJob={handleJobCompletion} />
                ))}
            </div>





        </>
    )
}

export default Appointment;