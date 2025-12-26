import React, { useEffect } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Link } from 'react-router-dom';
import App from './App.js';
import result from './testresult.js';
import DashboardPage from './dboard.js';
import profil from './profil.js';


const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
       BrowserRouter,
      null,
      React.createElement(App)
     )
    )
  );

class Router {
    constructor() {
        this.routes = {};
        window.addEventListener('popstate', this.handlePopState.bind(this));
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    navigateTo(path) {
        history.pushState(null, '', path);
        this.handleRoute(path);
    }

    handlePopState() {
        this.handleRoute(window.location.pathname);
    }

    handleRoute(path) {
        const handler = this.routes[path];
        if (handler) {
            handler();
        } else {
            console.log('404 Not Found');
        }
    }
}


const router = new Router();
router.addRoute("/", ()=> {document.querySelector(".container-v2").innerHTML = DashboardPage});
router.addRoute("/testResultView",() => {document.querySelector(".container-v2").innerHTML = result});
router.addRoute("/profile",() => {document.querySelector(".container-v2").innerHTML = profil});

//현재 버튼에 여러 요소가 있어 클릭 시 제대로 button id를 가져오지 못하므로, 항상 button id를 가져올 수 있도록 수정
//버튼 눌렀을때 Div active class 줄수있는 공통 로직 생각해봐야함..

window.addEventListener("click",(e)=>{
  const button = e.target.closest("button");
  document.querySelector("button").classList.remove("active");
  //alert(button.id);
  if(button){
    if(button.id =="btnDash"){
      e.preventDefault();
      document.getElementById("btnDash").classList.add("active");
      document.getElementById("btnRst").classList.remove("active");
      document.getElementById("btnprofil").classList.remove("active");
      router.navigateTo("/");
    }else if(button.id =="btnRst"){
      document.getElementById("btnRst").classList.add("active");
      document.getElementById("btnDash").classList.remove("active");
      document.getElementById("btnprofil").classList.remove("active");
    }else if(button.id =="btnprofil"){
      document.getElementById("btnprofil").classList.add("active");
      document.getElementById("btnDash").classList.remove("active");
      document.getElementById("btnRst").classList.remove("active");
      router.navigateTo("/profile");
    }else if(button.id ="logout"){
      localStorage.clear();
      document.getElementById("logoutdiv").style.display = "none";
      document.getElementById("logindiv").style.display = " block";
    }
  }
})
