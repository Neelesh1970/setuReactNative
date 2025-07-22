import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL_AUTH } from "@env";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL_AUTH}/jobs/api/v1/${url}`);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export const usePatch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const patchData = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.patch(
        `http://192.168.1.3:5000/api/v1/applicant/73360465-6fbd-4263-806f-11a9f49156be`,
        data
      );
      setResponse(res.data);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { patchData, response, loading, error };
};
