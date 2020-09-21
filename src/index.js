import React from 'react';
import ReactDom from "react-dom";
import Main from './Main';
import Login from './Login';

if(document.getElementById('root')){
    ReactDom.render(<Main/>, document.getElementById('root'));
} else if (document.getElementById('login')){
    ReactDom.render(<Login/>, document.getElementById('login'));
} else if (document.getElementById('signup')){
    ReactDom.render(<Signup/>, document.getElementById('signup'));
}
