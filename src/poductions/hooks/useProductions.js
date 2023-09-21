import { useCallback, useMemo, useState } from "react";
import {
  createProduction,
  deleteProduction,
  getProductions,
  getProductionsForMainTable,
} from "../services/productionsApiService";

export default function useProductions() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productions, setProductions] = useState([]);
  const [production, setProduction] = useState(null);

  const requestStatus = (
    loading,
    errorMessage,
    productions,
    production = null,
  ) => {
    setLoading(loading);
    setError(errorMessage);
    setProductions(productions);
    setProduction(production);
  };

  //handleCreateProduction
  const handleSetProductionCrew = useCallback(async (productionCrew) => {
    try {
      setLoading(true);
      const newProduction = await createProduction(productionCrew);
      requestStatus(false, null, null, newProduction);
      // snack("success", "A new production has been created");
      console.log("A new production has been created");
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleGetProductions = useCallback(async () => {
    console.log("getProductions");
    setLoading(true);
    try {
      const data = await getProductions();
      requestStatus(false, null, data);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);
  const handleGetProductionsForMainTable = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProductionsForMainTable();
      requestStatus(false, null, data);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleDeleteProduction = async (productionId) => {
    console.log(productionId, "handleDeleteProduction");

    try {
      setLoading(true);
      await deleteProduction(productionId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const value = useMemo(() => {
    return { isLoading, productions, production, error };
  }, [isLoading, productions, production, error]);

  return {
    value,
    handleSetProductionCrew,
    handleGetProductions,
    handleGetProductionsForMainTable,
    handleDeleteProduction,
  };
}
