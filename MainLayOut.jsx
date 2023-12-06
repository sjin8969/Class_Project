import React, {useState} from "react";
import Controller from "./Controller";
import "./css/MainLayOut.css"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Graph from "./Graph";
import Homecommunity from "./Homecommunity";

function MainLayOut({CreateItem,onlogin,item,setItem}){
    const [value, onChange] = useState(new Date());
    const [ChangeNum,setChangeNum] = useState(Homecommunity) /*초기값을 Coom0컴포넌트로 지정*/


    function handleNumChange(num){
        setChangeNum(num)}
    
    return(
        <div className="AllPage">
            <div className="LeftSelect">
                <h4>메뉴</h4>
                <Controller setItem={setItem} item={item} onlogin={onlogin} CreateItem={CreateItem} onChangeNum={handleNumChange} ></Controller>
            </div>
            <div className="MainPage">
                
                <div className="CommunityView">
                    {ChangeNum}
                    
                </div>
                <div className="Viewer">
                    <Calendar className="Calendar" onChange={onChange} value={value} />
                    <Graph className="Graph"></Graph>
                </div>
            </div>
        </div>
        
    )
}
export default MainLayOut;