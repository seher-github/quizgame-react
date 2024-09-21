import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const userName = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("LoggedIn"); 
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem("LoggedIn");
        navigate('/form');
        toast.success('Logged Out Successfully!');
    }

    if (!isLoggedIn) {
        return null;
    }
  return (
    <div>
        
        <header class="header">
        <a href="#" class="logo">Quiz Game</a>

        <i class='bx bx-menu' id="menu-icon"></i>

        <nav class="navbar">
            <a href="#">{userName.name}</a>
            <a onClick={handleLogout} href="#">Log Out</a>
           
        </nav>
    </header>
      
    </div>
  )
}

export default Header
