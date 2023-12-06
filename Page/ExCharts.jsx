import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function ExCharts() {
  const [items, setItems] = useState([]);
  const [itemname, setName] = useState("");
  const [type, setType] = useState("");
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null); // New state for date

  function nameChange(e) {
    setName(e.target.value);
  }
  function typeChange(e) {
    setType(e.target.value);
  }
  function countChange(e) {
    setCount(e.target.value);
  }
  function priceChange(e) {
    setPrice(e.target.value);
  }

  function handleDateChange(date) {
    setSelectedDate(date); // Update selected date
  }

  function getQuarter(date) {
    const month = date.getMonth() + 1;
    if (month >= 1 && month <= 3) {
      return '1분기';
    } else if (month >= 4 && month <= 6) {
      return '2분기';
    } else if (month >= 7 && month <= 9) {
      return '3분기';
    } else {
      return '4분기';
    }
  }

  function onSubmit() {
    const quarter = getQuarter(selectedDate); // Calculate quarter
    const newItem = {
      itemName: itemname,
      itemType: type,
      itemCount: count,
      itemPrice: price,
      itemDate: quarter, // Include quarter in newItem
    };

    setItems([...items, newItem]);
    setName("");
    setType("");
    setCount(0);
    setPrice(0);
    setSelectedDate(null);
  }

  const graphData = items.reduce((acc, item) => {
    const quarter = item.itemDate;
    const existingQuarter = acc.find(data => data.name === quarter);

    if (existingQuarter) {
      existingQuarter.amt += item.itemPrice * item.itemCount;
    } else {
      acc.push({
        name: quarter,
        "매출": item.itemPrice * item.itemCount
      });
    }

    return acc;
  }, []);

  return (
    <div className="lose">
      <input value={itemname} onChange={nameChange} type="text" placeholder="아이템 이름" />
      <input value={type} onChange={typeChange} type="text" placeholder="타입" />
      <input value={count} onChange={countChange} type="number" placeholder="수량" />
      <input value={price} onChange={priceChange} type="number" placeholder="가격" />
      <DatePicker selected={selectedDate} onChange={handleDateChange} /> {/* Datepicker */}
      <button onClick={onSubmit}>추가</button>
      <br />
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {"아이템 : "+ item.itemName}<br/>{"타입 : "+ item.itemType}<br/>{"수량 : "+ item.itemCount}<br/>{"가격 : "+ item.itemPrice}<br/> {item.itemDate}
          </li>
        ))}
      </ul>
      <LineGraph data={graphData} />
    </div>
  );
}

function LineGraph({ data }) {
  return (
    <LineChart
      width={400}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="매출" stroke="#8884d8" strokeDasharray="5 5" />
    </LineChart>
  );
}

export default ExCharts;
