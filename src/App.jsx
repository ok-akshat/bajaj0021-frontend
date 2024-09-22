import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedFields, setSelectedFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse(null);

    try {
      const inputData = JSON.parse(input);
      const res = await axios.post(
        "https://bajaj0021-backend-1.onrender.com/bfhl",
        inputData
      );
      setResponse(res.data);
    } catch (err) {
      setError("Invalid JSON input or API error");
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const fieldsToShow =
      selectedFields.length === 0 ? Object.keys(response) : selectedFields;

    return (
      <div>
        <h3>Filtered Response:</h3>
        {fieldsToShow.map((field) => (
          <p key={field}>
            {field}: {JSON.stringify(response[field])}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">BFHL API Tester</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input (e.g., {"data": ["M","1","334","4","B","Z","a"], "file_b64": "BASE_64_STRING"})'
          className="w-full p-2 border rounded"
          rows="5"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {response && (
        <div>
          <h3 className="font-bold mt-4">Select fields to display:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.keys(response).map((field) => (
              <label key={field} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFields.includes(field)}
                  onChange={() => {
                    setSelectedFields((prev) =>
                      prev.includes(field)
                        ? prev.filter((f) => f !== field)
                        : [...prev, field]
                    );
                  }}
                  className="mr-1"
                />
                {field}
              </label>
            ))}
          </div>
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default App;
