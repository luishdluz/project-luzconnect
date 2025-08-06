"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Services from "../api/mock";
import { toast } from "react-toastify";

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [stateServices, setStateServices] = useState(false);

  const getProducts = async () => {
    try {
      const products = await Services.getProducts();
      return products;
    } catch (error) {
      toast.error("Error al cargar los productos");
      return [];
    }
  };

  const values = {
    stateServices,
    getProducts,
  };

  useEffect(() => {
    setStateServices(true);
  }, []);
  return (
    <ServicesContext.Provider value={values}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => useContext(ServicesContext);
