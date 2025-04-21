
import React, { useEffect, useState } from "react";
import { fetchTimeSlots } from "../api";

function TimeSlotList() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const loadSlots = async () => {
      const data = await fetchTimeSlots();
      setSlots(data);
    };
    loadSlots();
  }, []);

  return (
    <div>
      <h3>Time Slots</h3>
      <ul>
        {slots.map((slot, idx) => (
          <li key={idx}>
            {slot.day}: {slot.start} - {slot.end}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TimeSlotList;
