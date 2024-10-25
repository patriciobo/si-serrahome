"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";

interface CalendarioEvento {
  title: string;
  start: Date;
  end: Date;
  backgroundColor: string;
}

interface CalendarioProps {
  eventos: CalendarioEvento[];
}

export const Calendario = ({
  eventos,
  onYearChange,
}: CalendarioProps & { onYearChange: (year: number) => void }) => {
  const handleDatesSet = (arg: any) => {
    const newDate = new Date(arg.start)
    newDate.setDate(newDate.getDate() + 7)
    const newYear = newDate.getFullYear()
    onYearChange(newYear);
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventos}
        locale={esLocale}
        displayEventTime={false}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
        datesSet={handleDatesSet}
      />
    </div>
  );
};
