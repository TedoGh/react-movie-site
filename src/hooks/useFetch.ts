import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url: string, options: {}) => {
  const [data, setData] = useState<any>(options);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
