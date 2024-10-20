import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';

interface SelectServiciosProps {
  onChange: (selected: any) => void; 
}

// Estilo para el desplegable
const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    width: '100%',
    borderRadius: '0.5rem', 
    borderColor: state.isFocused ? '#2D9C3C' : '#D1D5DB', 
    boxShadow: state.isFocused ? '0 0 0 2px rgba(45, 156, 60, 0.5)' : '',
    '&:hover': {
      borderColor: state.isFocused ? '#2D9C3C' : '#D1D5DB', 
    },
  }),
};

const SelectServicios: React.FC<SelectServiciosProps> = ({ onChange }) => {
  const [selectedService, setSelectedService] = useState(null);

  const loadOptions = async (inputValue: string) => {
    const response = await fetch(`/api/servicios`);
    const servicios = await response.json();

    return servicios
      .filter((servicio: { nombre: string }) =>
        servicio.nombre.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((servicio: { id: number; nombre: string }) => ({
        value: servicio.id,
        label: servicio.nombre,
      }));
  };

  const handleChange = (selectedOption: any) => {
    setSelectedService(selectedOption); 
    onChange(selectedOption); 
  };

  return (
    <AsyncSelect
      isMulti
      closeMenuOnSelect={false}
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      onChange={handleChange} 
      value={selectedService}
      placeholder="Servicios"
      styles={customStyles}
    />
  );
};

export default SelectServicios;