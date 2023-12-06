import React,{useState} from "react";
import "./css/Controller.css";
import Board from "./Page/Board";
import ViewList from "./Page/ViewList";
import Order from "./Page/Order";
import Help from "./Page/Help";
import ExCharts from "./Page/ExCharts";
import Homecommunity from "./Homecommunity";
import Items from "./Items";



function Controller({ onChangeNum,onlogin,CreateItem, item, setItem}) {
    const [openItem, setopenItem] = useState(false);
    const [selected, setSelected] = useState("etc");
    


    function itemClick(){
        if(onlogin===1){
            setopenItem(true)
        }else{
            alert('관리자 권한이 필요합니다.')
        }
    }
    
    
    function Change1(){
        onChangeNum(<Homecommunity/>);
    }
    
    function Change2(){
        onChangeNum(<Board/>);
    }

    function Change3(){
        onChangeNum(<ViewList item={item}></ViewList>);
    }

    function Change4(){
        onChangeNum(<Order/>);
    }

    function Change5(){
        onChangeNum(<ExCharts/>);
    }

    function Change6(){
        onChangeNum(<Help/>);
    }


    return(
        <div className="Controller">
            <button className="button" onClick={Change1}>Home</button>
            <button className="button" onClick={Change2}>게시판</button>
            <button className="button" onClick={itemClick}>재고관리</button>
            {openItem && <Items setItem={setItem} item={item} CreateItem={CreateItem} setopenItem={setopenItem} onChangeNum={onChangeNum}
            setSelected={setSelected} selected={selected}></Items>}
            <button className="button" onClick={Change3}>재고확인</button>
            <button className="button" onClick={Change4}>재고주문</button>
            <button className="button" onClick={Change5}>차트</button>
            <button className="button" onClick={Change6}>Help</button>
            {/* <p>현재 값 : {ChangeNum}</p> */}
        </div>
    )
}
export default Controller;