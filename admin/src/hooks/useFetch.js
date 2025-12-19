import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const useFetch = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  // 1. GET Function (Auto triggered)
  useEffect(() => {
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
  }, [url, BASE_URL]);

  // 2. POST Function (Triggered manually)
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

  return { data, loading, error, postData };
};

export default useFetch;
