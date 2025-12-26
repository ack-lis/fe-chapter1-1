import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import side from './sidebar.js';
import board from './dboard.js';
const root = document.getElementById('root');

function App(page){
   /*Local storage 테스트 useEffect를 사용해서 setITem 진행.*/

   useEffect(() => {
      localStorage.setItem("key","10");
      if(localStorage.length > 0){
     //   document.getElementById("logoutdiv").style.display = "block";
      //  document.getElementById("logindiv").style.display = " none";
      //  document.getElementById("btnprofil").style.display = " block";

      }
   },[]

  );


// 여러 화면이 합쳐진 것을 text로 떼어놨으나, html로 만들기 위해서 parse가 필요함.
// 다만 side부분이 왼쪽으로 보여지려면 새로 생성하는 div에 className : dashboard-container-v2으로 줘야함 CSS에 그렇게 명령이 되어있는듯?
return  React.createElement("div", {className:"dashboard-container-v2"}, parse(side),React.createElement("div",{className:"container-v2"},parse(board)));
/*Navigate를 써서 하는 방법*/
 /* const BtnClick =(e) =>{
    const navgate = useNavigate();
    const id = e.currentTarget.id;
    if(id==='Home'){
      navgate('/');
    }*/
  }


export default App;
