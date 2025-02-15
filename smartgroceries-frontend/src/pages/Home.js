import { useState, useEffect } from "react";
import axios from "axios";
import '../styles.css';

const Home = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/grocery")
      .then(res => setItems(res.data.filter(item => item.isVisible !== false)))
      .catch(err => console.log(err));
  }, []);

  const addItem = () => {
    axios.post("http://localhost:5000/api/grocery/add", { name: input })
      .then(res => setItems([...items, res.data]));
    setInput("");
  };

  const toggleWeekly = (id) => {
    axios.put(`http://localhost:5000/api/grocery/weekly/${id}`)
      .then(res => setItems(items.map(item => item._id === id ? res.data : item)));
  };

  const toggleCrossOff = (id) => {
    axios.put(`http://localhost:5000/api/grocery/cross/${id}`)
      .then(res => setItems(items.map(item => item._id === id ? res.data : item)));
  };

  // Add weekly items not already on the list
  const addWeeklyItems = () => {
    axios.put("http://localhost:5000/api/grocery/add-weekly")
      .then(fetchItems) // Fetch updated list after API call
      .catch(err => console.log(err));
  };g
  

  // Clear crossed-off items
  const clearCrossedOffItems = () => {
    axios.put("http://localhost:5000/api/grocery/clear-crossed")
      .then(fetchItems) // Fetch updated list after API call
      .catch(err => console.log(err));
  };
  
  const fetchItems = () => {
    axios.get("http://localhost:5000/api/grocery")
      .then(res => setItems(res.data.filter(item => item.isVisible !== false)))
      .catch(err => console.log(err));
  };
  
  // Call `fetchItems` inside `useEffect`:
  useEffect(() => {
    fetchItems();
  }, []);
  
  

  return (
    <div className="grocery-container">
      <h1 className="grocery-title">Grocery List</h1>

      {/* Input Field */}
      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-field"
          placeholder="Add an item..."
        />
        <button 
          onClick={addItem} 
          className="add-button"
        >
          Add
        </button>
      </div>

      {/* Grocery List */}
      <ul className="grocery-list">
        {items.map(item => (
          <li key={item._id} className="grocery-item">
            <span
                className={`grocery-item-name ${item.isCrossedOff ? 'completed' : ''}`}
                onClick={() => toggleCrossOff(item._id)}
            >
                {item.name}
            </span>

            <button
              onClick={() => toggleWeekly(item._id)}
              className={`weekly-button ${item.isWeekly ? 'weekly' : ''}`}
            >
              {item.isWeekly ? "Weekly" : "Make Weekly"}
            </button>
          </li>
        ))}
      </ul>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          onClick={addWeeklyItems}
          className="add-weekly-button"
        >
          Add Weekly
        </button>
        <button 
          onClick={clearCrossedOffItems}
          className="clear-button"
        >
          Clear Crossed-Off
        </button>
      </div>
    </div>
  );
};

export default Home;
