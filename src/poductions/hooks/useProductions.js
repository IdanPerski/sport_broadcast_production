import { useCallback, useMemo, useState } from "react";
import { createProduction } from "../services/productionsApiService";

export default function useProduction() {
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
    console.log(productionCrew);
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

  const value = useMemo(() => {
    return { isLoading, productions, production, error };
  }, [isLoading, productions, production, error]);

  return {
    value,
    handleSetProductionCrew,
  };
}
