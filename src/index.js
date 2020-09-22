import React from 'react';
import ReactDom from "react-dom";
import Main from './Main';
import Login from './Login';
import Register from "./Register";

if(document.getElementById('root')){
    ReactDom.render(<Main/>, document.getElementById('root'));
} else if (document.getElementById('login')){
    ReactDom.render(<Login/>, document.getElementById('login'));
} else if (document.getElementById('register')){
    ReactDom.render(<Register/>, document.getElementById('register'));
}
