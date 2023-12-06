import React from "react";
import './css/Loginpage.css'

function Loginpage({setOpenlog,setId,setPassword,id,password,setOnlogin}){

  const masterID = {
    mid: 'master',
    mpasword : 'master'
}

  function closepage(){
    setOpenlog(false);
  }

  function IdChange(e){
    setId(e.target.value)
  }
  function PwChange(e){
    setPassword(e.target.value);
  }
  function CheckLogin(){
    if (id===masterID.mid){
      if (password===masterID.mpasword){
        alert('관리자님 환영합니다.')
        setOnlogin(1)
        closepage()
      }else{
        alert('비밀번호를 확인해주세요')
      }
    }else{
      alert('아이디가 등록되어있지 않습니다.')
    }
  }
  function onKeyPress(e) {
    if (e.key === "Enter") {
      CheckLogin();
    }
  }
  return(
    <div className="logcontainer">
      <h3>로그인</h3>
      <button className="close"onClick={closepage}>X</button>
      <input onChange={IdChange} placeholder="ID"/>
      <input type="password"placeholder="PW" onChange={PwChange} onKeyPress={onKeyPress}/>
      <div className="login_button">
        <button onClick={CheckLogin}>로그인</button>
      </div>
    </div>
  )
}


export default Loginpage;