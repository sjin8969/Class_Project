import React,{useState} from "react";
import "./css/Controller.css";
// import Coom0 from "./Page/Coom0";
import Board from "./Page/Board";
import ViewItem from "./Page/ViewItem";
import Order from "./Page/Order";
import Help from "./Page/Help";
import ExCharts from "./Page/ExCharts";
import Homecommunity from "./Homecommunity";
import Items from "./Items";



function Controller({posts,onAddPost, onChangeNum,onlogin,CreateItem }) {
    const [openItem, setopenItem] = useState(false);

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
        onChangeNum(<Board posts={posts} onAddPost={onAddPost}/>);
    }

    function Change3(){
        onChangeNum(<ViewItem/>);
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
            {openItem && <Items CreateItem={CreateItem} setopenItem={setopenItem}></Items>}
            <button className="button" onClick={Change3}>품목확인</button>
            <button className="button" onClick={Change4}>재고주문</button>
            <button className="button" onClick={Change5}>차트</button>
            <button className="button" onClick={Change6}>Help</button>
            {/* <p>현재 값 : {ChangeNum}</p> */}
        </div>
    )
}
export default Controller;