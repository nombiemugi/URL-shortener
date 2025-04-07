"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3aFdYa0k3aml2VmRmNWZCUlA5RXciLCJpYXQiOjE3NDQwMDU1OTIuNDAxLCJsaW1pdCI6NTAwLCJ0aW1lZnJhbWUiOjg2NDAwLCJvcmdhbmlzYXRpb24iOiJiYzVmZDI1ZC02YjY3LTQ1MjctYmMzMi1iZWRjMzczYzIzODMiLCJ3b3Jrc3BhY2UiOjM1MjI1LCJ1c2VyIjoxNzY3NSwiZXhwIjoxNzUxNzgxNTcwfQ.uUhF7g-wlyReR3Cr8VYiHIN6Nc_DOrbXd8TpogZlY1M'; // Replace with your actual token

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy error:', err);
      alert('Failed to copy to clipboard');
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(
        'https://api.pxl.to/api/v1/short',
        { 
          destination: inputValue,
          // You can add optional parameters here:
          // title: "My Custom Title",
          // description: "My link description",
          // image: "https://example.com/image.png",
          // favicon: "https://example.com/favicon.ico"
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Accept-Encoding': 'gzip' // Recommended by API docs
          },
          timeout: 10000
        }
      );

      // The API returns the response nested under 'data' property
      if (response.data?.data?.id) {
        setShortenLink(response.data.data.id);
      } else {
        throw new Error('Invalid API response structure');
      }
      
    } catch (err) {
      console.error('API Error:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      setError(err.response?.data?.message || err.message || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue?.trim()) {
      fetchData();
    }
  }, [inputValue]);

  if (loading) {
    return <p className="noData">Loading...</p>;
  }

  if (error) {
    return (
      <div className="errorContainer">
        <p className="errorText">Error: {error}</p>
        <button onClick={fetchData}>Retry</button>
      </div>
    );
  }

  if (!shortenLink) {
    return null;
  }

  return (
    <div className="resultContainer">
      <a href={`https://${shortenLink}`} target="_blank" rel="noopener noreferrer">
      <p> {shortenLink} </p>
      </a>
      <button onClick={copyToClipboard} disabled={!shortenLink}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default LinkResult;