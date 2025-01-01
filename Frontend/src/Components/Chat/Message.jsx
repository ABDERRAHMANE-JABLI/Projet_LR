import React from "react";

import { format, isToday, isYesterday } from "date-fns";

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    
    if (isNaN(date)) {
      let d = new Date();
      return `Aujourd'hui à ${d.getHours().toString().padStart(2, '0')}:${d
          .getMinutes()
          .toString()
          .padStart(2, '0')}`;
    }

    if (isToday(date)) {
        return `Aujourd'hui à ${format(date, 'HH:mm')}`;
    }

    if (isYesterday(date)) {
        return `Hier à ${format(date, 'HH:mm')}`;
    }

    return `${format(date, 'dd/MM/yyyy à HH:mm')}`;
};



const Message = ({ text, isSender, time }) => {
  return (
    <div className={`message ${isSender ? "user" : "receiver"}`}>
      <div className="bubble">{text} <span className="time">{formatDate(time)}</span></div>
    </div>
  );
};

export default Message;
