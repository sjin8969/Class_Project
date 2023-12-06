import React,{useState} from "react";
import "./css/Items.css"
import ViewList from "./Page/ViewList";


function Items({ setSelected, selected, onChangeNum, CreateItem, setopenItem, item,setItem }) {
    const selectList = [
        { value: "etc", name: "etc" },
        { value: "육류", name: "육류" },
        { value: "채소", name: "채소" },
        { value: "물품", name: "물품" },
    ];

    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    const [itemname, setName] = useState("");
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);

    function nameChange(e) {
        setName(e.target.value);
    }

    function countChange(e) {
        setCount(parseInt(e.target.value));
    }

    function priceChange(e) {
        setPrice(parseInt(e.target.value));
    }

    function onSubmit() {
        const existingItem = item.find((item) => item.itemname === itemname && item.price === price);

        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                count: parseInt(existingItem.count) + parseInt(count),
                finalprice: (parseInt(existingItem.count) + parseInt(count)) * existingItem.price,
            };

            setItem((prevItems) => prevItems.map((item) => (item.itemname === itemname && item.price === price ? updatedItem : item)));
        } else {
          CreateItem(itemname, selected, count, price, count * price);
        }

        setName("");
        setCount(0);
        setPrice(0);
    }

    function closeItem() {
        setopenItem(false);
        onChangeNum(<ViewList item={item} />);
    }

    return(
        <div className="Itempage">
            <button className="close" onClick={closeItem}>X</button><br></br>
            <select className="select" onChange={handleSelect} value={selected}>
                {selectList.map((item) => {
                    return <option value={item.value} key={item.value}>
                    {item.name}
                    </option>;
                })}
        </select>
            <input value={itemname} placeholder="품명" onChange={nameChange} type="text" />
            <input value={count} placeholder="수량" onChange={countChange} type="number" />
            <input value={price} placeholder="가격" onChange={priceChange} type="number" />
            <button onClick={onSubmit}>추가</button>
            <br></br>
        </div>
    
)
}

export default Items;