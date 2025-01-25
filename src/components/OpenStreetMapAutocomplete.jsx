import React, { useState } from 'react';
import axios from 'axios';

const OpenStreetMapAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.display_name);
    setSuggestions([]);
    onSelect(suggestion);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your location"
        value={query}
        onChange={handleInputChange}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      />
      {suggestions.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, border: '1px solid #ddd', borderRadius: '4px', maxHeight: '150px', overflowY: 'auto' }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #ddd' }}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OpenStreetMapAutocomplete;