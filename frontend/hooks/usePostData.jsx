import { useState, useCallback } from "react";

export const usePostData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendData = useCallback(async (url, postData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:3000${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || `Помилка відправки даних: ${response.status}`);
      }

      setData(resData);
      return resData;
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, sendData };
};