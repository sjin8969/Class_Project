import React, {useState,useRef} from "react";
import Header from "./Header";
import MainLayOut from "./MainLayOut"
import "./css/App.css"

function App(){
    const [id,setId] = useState("")
    const [password, setPassword] = useState("");
    const [onlogin, setOnlogin] = useState(0);
    const [item, setItem] = useState([]);
    const itemNumber = useRef(0);
    function CreateItem(itemname,type,count,price,finalprice){
        const newItem = {
            number: itemNumber.current,
            itemname,
            type,
            count,
            price,
            finalprice : count * price,
        }
        setItem([newItem, ...item] )
        itemNumber.current += 1
    }
    
    return(
        <>
        <div className="App">
            <Header 
            id={id}
            password={password} 
            setId={setId} 
            setPassword={setPassword}
            onlogin={onlogin}
            setOnlogin={setOnlogin}   
            > 
            </Header>
            <MainLayOut setItem={setItem} item={item} onlogin={onlogin} CreateItem={CreateItem}></MainLayOut>
        </div>
        </>
    )
}
export default App;