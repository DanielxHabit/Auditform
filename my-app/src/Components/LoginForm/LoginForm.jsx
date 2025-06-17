import React from 'react';
import './LoginForm.css';
import { FaUserSecret } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // evita recarga de página
    // lógica de login...
    navigate('/home'); // redirección correcta
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Usuario" required />
          <FaUserSecret className='icon' />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Contraseña" required />
          <MdOutlinePassword className='icon' />
        </div>
        <div className='remember-forgot'>
          <label><input type="checkbox" />Recuerdame</label>
          <a href="#">Forgot Password</a>
        </div>
        <button type="submit">Login</button>
        <div className='register-link'>
          <p>No tienes una cuenta? <a href="#">Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
