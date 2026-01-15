const BASE_URL = process.env.REACT_APP_ZVB_URL;

export const fetchAppointments = async (date) => {
  try {
    const response = await fetch(
      `${BASE_URL}/getAppointment?date=${encodeURIComponent(date)}`
    );

    if (!response.ok) {
      throw new Error(`Network response error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error while fetching Appointment", error);
    return null;
  }
};


export const completeJob = async (appointmentId)=>{

    try{
        const response = await fetch(`${BASE_URL}/completeAppointment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ appointmentId }),
    });
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
    }catch (err){
        console.log("Error: Transaction not complete because:", err);
        return null;
    }
    
}


export const fetchVehiclesByPhone = async (phone) => {
  try {
    const response = await fetch(
      `${BASE_URL}/getVehiclesByPhone?phone=${encodeURIComponent(phone)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json(); 
  } catch (err) {
    console.log("Error: Could not fetch vehicle records because:", err);
    return null;
  }
};