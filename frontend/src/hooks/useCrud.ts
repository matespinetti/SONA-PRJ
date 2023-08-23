import jwtinterceptor from "../helpers/jwtinterceptor.ts";
import { BASE_URL } from "../config.ts";
import useAxiosWithInterceptor from "../helpers/jwtinterceptor.ts";
import React, { useState } from "react";

interface IuseCrud<T> {
  dataCRUD: T[];
  setDataCRUD: React.Dispatch<React.SetStateAction<T[]>>;
  fetchData: () => Promise<void>;
  postData: (newData: T) => Promise<void>; // Add a postData function
  updateData: (newData: T, oldData: T) => Promise<T>
  deleteData: (id: string | number) => Promise<void>
  error: Error | null;
  isLoading: boolean;
}

const useCrud = <T>(initialData: T[], apiURL: string): IuseCrud<T> => {
  const jwtAxios = useAxiosWithInterceptor();
  const [dataCRUD, setDataCRUD] = useState<T[]>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {});
      const data = response.data;
      setDataCRUD(data);
      setError(null);
      setIsLoading(false);
      return data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError(new Error("400"));
      }
      setIsLoading(false);
      throw error;
    }
  };

  const postData = async (newData: T) => {
    try {
      const response = await jwtAxios.post(`${BASE_URL}${apiURL}`, newData);
      console.log(response)
      // You can update the dataCRUD state here if needed
      return response.data;
    } catch (error) {
      // Handle error if needed
      throw error;
    }
  };


  const updateData = async (newData: T, oldData: T) => {
    try {
      const response = await jwtAxios.put(`${BASE_URL}${apiURL}${oldData.id}/`, newData)
      return response.data
    } catch (error){
      throw error
    }
  }

  const deleteData = async (id: string | number) => {
    try {
      await jwtAxios.delete(`${BASE_URL}${apiURL}${id}/`);
      const updatedData = dataCRUD.filter(item => item.id !== id); // Filter out the deleted data
      setDataCRUD(updatedData);
    } catch (error){
      throw error
    }
  }

  return {
    fetchData,
    postData,
    updateData,
    deleteData,
    dataCRUD,
    setDataCRUD,
    error,
    isLoading,
  };
};

export default useCrud;
