import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // 1. GET Function (Auto triggered)
  useEffect(() => {
    // This line acts as a "Gatekeeper"
    if (!url || url.includes("auth")) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const fullUrl = `${BASE_URL}${url}`;
        console.log(fullUrl);
        const res = await axios.get(fullUrl);
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  // 2. REFETCH Function (Triggered manually)
  const reFetch = async () => {
    setLoading(true);
    try {
      const res = axios.get(url);
      setData(res.setData);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  // 3. POST Function (Triggered manually)
  const postData = async (payload) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}${url}`, payload);
      setData(res.data);
      return res.data; // Return so you can use .then() in your component
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 4. PUT Function (Triggered manually)
  const putData = async (payload, customUrl = url) => {
    setLoading(true);
    try {
      // We allow a customUrl because in Reserve, the URL changes for every roomId
      const res = await axios.put(`${BASE_URL}${customUrl}`, payload, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, reFetch, postData, putData };
};

export default useFetch;
