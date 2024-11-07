// src/context/AppContext.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface Car {
  id: number;
  nombre: string;
  url: string;
  dimension: {
    largo: { valor: number; unidad: string; detalle: string };
    alto: { valor: number; unidad: string; detalle: string };
    ancho: { valor: number; unidad: string; detalle: string };
    peso: { valor: number; unidad: string; detalle: string };
    capacidad_cajuela: { valor: number; unidad: string; detalle: string };
    neumaticos: { valor: number; unidad: string; detalle: string };
  };
  seguridad: {
    airbag: { incluye: boolean; detalle: string };
    frenos: { tipo: string; detalle: string };
    cinturones: { incluye: boolean; detalle: string };
  };
  rendimiento: {
    combustible: { tipo: string; detalle: string };
    cilindraje: { valor: number; unidad: string; detalle: string };
    potencia: { valor: number; unidad: string; detalle: string };
    velocidad_maxima: { valor: number; unidad: string; detalle: string };
  };
  confort: {
    aire: { tipo: string; detalle: string };
    camara: { incluye: boolean; detalle: string };
    estabilidad: { incluye: boolean; detalle: string };
  };
  tipo_consumo: {
    tipo: string;
    descripcion: string;
  };
}

// Define the type for the context, including the list of cars and the function to load them
interface AppContextType {
  autos: Car[];
  fetchAutos: () => void;
  selectedCars: Car[];
  setSelectedCars: (cars: Car[]) => void;
  favorites: Car[];
  addFavorite: (car: Car) => void;
  removeFavorite: (carId: number) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider for the context
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [autos, setAutos] = useState<Car[]>([]);
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [favorites, setFavorites] = useState<Car[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Function to fetch and load the cars into the state
  const fetchAutos = async () => {
    try {
      const response = await axios.get(
        'https://magicloops.devaaa/api/loop/run/39fbf4cf-7ee3-4bd0-bbce-6b857209a048?input=I+love+Magic+Loops%21'
      );
      // Verify that the response has the expected structure
      if (response.data && response.data.autos) {
        setAutos(response.data.autos);
      }
    } catch (error) {
      console.error('Error fetching car data:', error);
    }
  };

  /*uTILZAR Esto cuando se va acargar autos
  useEffect(() => {
    fetchAutos();
  }, []);*/

  // Function to add a car to favorites
  const addFavorite = (car: Car) => {
    setFavorites((prev) => [...prev, car]);
  };

  // Function to remove a car from favorites
  const removeFavorite = (carId: number) => {
    setFavorites((prev) => prev.filter((car) => car.id !== carId));
  };

  return (
    <AppContext.Provider
      value={{
        autos,
        fetchAutos,
        selectedCars,
        setSelectedCars,
        favorites,
        addFavorite,
        removeFavorite,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};