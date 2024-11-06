// src/context/AppContext.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

// Define el tipo de cada auto basado en el JSON de ejemplo
interface Car {
  id: number;
  url: string;
  nombre: string;
  dimensiones_y_capacidad: {
    altura: { valor: number; unidad: string; detalle: string };
    largo: { valor: number; unidad: string; detalle: string };
    capacidad_carga: { valor: number; unidad: string; detalle: string };
  };
  confort_y_tecnologia: {
    aire_acondicionado: { tipo: string; detalle: string };
    radio: { tipo: string; detalle: string };
    computadora_bordo: { tipo: string; detalle: string };
  };
  motor_y_rendimiento: {
    combustible: { tipo: string; detalle: string };
    cilindraje: { valor: number; unidad: string; detalle: string };
    torque: { valor: number; unidad: string; detalle: string };
    potencia: { valor: number; unidad: string; detalle: string };
  };
  mecanica_y_desempeno: {
    palanca_cambios: { tipo: string; detalle: string };
    neumaticos: { tipo: string; detalle: string };
    frenos: { tipo: string; detalle: string };
    suspension: { tipo: string; detalle: string };
    traccion: { tipo: string; detalle: string };
    transmision: { tipo: string; detalle: string };
  };
  seguridad: {
    frenos_abs: { incluye: boolean; detalle: string };
    airbags: { tipo: string; detalle: string };
    control_estabilidad: { incluye: boolean; detalle: string };
  };
}

// Define el tipo del contexto, incluyendo la lista de autos y la función para cargarlos
interface AppContextType {
  autos: Car[];
  fetchAutos: () => void;
  // Otros estados y funciones que ya teníamos
  selectedCars: Car[];
  setSelectedCars: (cars: Car[]) => void;
  favorites: Car[];
  addFavorite: (car: Car) => void;
  removeFavorite: (carId: number) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

// Crear el contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider para el contexto
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Estado para almacenar los autos obtenidos de la API
  const [autos, setAutos] = useState<Car[]>([]);
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [favorites, setFavorites] = useState<Car[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Función para hacer la petición y cargar los autos en el estado
  const fetchAutos = async () => {
    try {
      const response = await axios.get(
        'https://magicloops.devaaa/api/loop/run/39fbf4cf-7ee3-4bd0-bbce-6b857209a048?input=I+love+Magic+Loops%21'
      );
      // Verifica que la respuesta tenga la estructura esperada
      if (response.data && response.data.autos) {
        setAutos(response.data.autos);
      }
    } catch (error) {
      console.error('Error al obtener los datos de los autos:', error);
    }
  };

  // Llamar a `fetchAutos` cuando el componente se monta para cargar los datos iniciales
  useEffect(() => {
    fetchAutos();
  }, []);

  // Función para agregar un auto a favoritos
  const addFavorite = (car: Car) => {
    setFavorites((prev) => [...prev, car]);
  };

  // Función para eliminar un auto de favoritos
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

// Hook personalizado para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
