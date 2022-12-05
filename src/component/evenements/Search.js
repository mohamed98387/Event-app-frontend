import React, { useState, useEffect } from "react";
import { Input } from "antd";
import "./Events.css";
const { Search } = Input;
const SearchComponent = (props) => {
  const [Input, setInput] = useState("");
  const [Suggetions, setSuggetions] = useState([]);
  const [keys, setkeys] = useState([]);

  const onSearch = (value) => {
    props.refrechFunction(value);
  };
  useEffect(() => {
    let array = [];
    let Titre = props.allEvents.map((a) => a.Titre.toLowerCase());
    let City = props.allEvents.map((a) => a.City);
    let Country = props.allEvents.map((a) => a.Country);
    array = array.concat(Titre, City, Country);
    let uniq = [...new Set(array)];
    setkeys(uniq);
  }, [props.allEvents]);

  const handleChange = (e) => {
    setInput(e.target.value);
    props.refrechFunction(e.target.value);
    onSearch(e.target.value);
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = keys.sort().filter((v) => regex.test(v));
    }
    setSuggetions(suggestions);
  };
  const suggestionsSelected = (value) => {
    setInput(value);
    setSuggetions([]);
  };
  const renderSuggetions = () => {
    if (Suggetions.length === 0) {
      return null;
    }
    return (
      <ul>
        {Suggetions.map((el, i) => (
          <li key={i} onClick={() => suggestionsSelected(el)}>
            {el}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div style={{ marginTop: 50 }} className="AutoCompleteText">
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        value={Input}
        onChange={handleChange}
        style={{
          width: "100%",
          border: "none",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 14,
          color: "rgba(0,0,0,073)",
          padding: "10px 5px",
          boxSizing: "border-box",
          outline: "none",
        }}
      />
      {renderSuggetions()}
    </div>
  );
};

export default SearchComponent;
