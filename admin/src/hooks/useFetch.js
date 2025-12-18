import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const BASE_URL = "https://ticketbooking-5eoj.onrender.com/api";
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
  const reFecth = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, error };
};

export default useFetch;
