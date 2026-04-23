import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const BASE_URL = process.env.REACT_APP_API_URL;

  // 1. GET Function (Auto triggered)
  useEffect(() => {
    if (!url) return;
    setData([]); // Reset data to empty array when path changes to prevent old data artifacts
    setError(undefined);
    const fetchData = async () => {
      setLoading(true);
      try {
        const fullUrl = `${BASE_URL}${url}`;
        console.log("Full url for rooms hotel users", fullUrl);
        const res = await axios.get(fullUrl, {
          withCredentials: true,
        });
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
  const postData = async (targetUrl, payload) => {
    setLoading(true);
    console.log("base url is ", `${BASE_URL}${targetUrl}`);
    try {
      const res = await axios.post(`${BASE_URL}${targetUrl}`, payload, {
        withCredentials: true,
      });
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
