'use client'
import { Calendario } from "@/components/Calendario/Calendario";
import { Reserva } from "@prisma/client";
import { getReservasCalendario } from "@/actions/reservas/reservas";
import React, { useCallback, useEffect, useState } from "react";


const reservasAEventos = (reservas: Reserva[]) => {
  return reservas.map((reserva) => ({
    title: `${reserva.cliente.nombre}: ${reserva.cantidadPersonas} personas`,
    start: reserva.fechaInicio,
    end: reserva.fechaFin,
    backgroundColor:
      reserva.estado === "PAGADA"
        ? "green"
        : reserva.estado === "PENDIENTE"
        ? "orange"
        : "red",
  }));
};

export default function DashboardHome() {
  const [eventosCalendario, setEventosCalendario] = useState<any[]>([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const cargarReservas = useCallback(async (year: number) => {
    const reservasCalendario = await getReservasCalendario(year);
    const eventos = reservasAEventos(reservasCalendario);
    setEventosCalendario(eventos); 
  }, []);


  useEffect(() => {
    cargarReservas(currentYear);
  }, [currentYear, cargarReservas]);

  const handleYearChange = (newYear: number) => {
    if (newYear !== currentYear) {
      setCurrentYear(newYear);
    }
  };
  return (
    <div>
      <h1>Home Page</h1>\
      <Calendario eventos={eventosCalendario} onYearChange={handleYearChange} />
    </div>
  );
}
