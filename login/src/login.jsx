import React, { useState } from 'react';
import axios from 'axios';
import './css/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = async () => {
    try {
      // Fazer a solicitação de login para o servidor backend
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      // Verificar a resposta do servidor
      if (response.data.success) {
        // Login bem-sucedido
        setLoginSuccess(true);
      } else {
        // Login falhou
        setLoginSuccess(false);
      }
    } catch (error) {
      // Tratar erros de solicitação
      console.error('Erro ao fazer login:', error);
      setLoginSuccess(false);
    }
  };

  return (
    <div>
      <div id="login" className="box">
        <h1>Faça seu Login</h1>
        {loginSuccess && <p>Login bem-sucedido!</p>}
        <input
          type="text"
          id="usernamelogin"
          placeholder="USERNAME"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="senhalogin"
          placeholder="SENHA"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" id="buttonlogin" onClick={handleLogin}>
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
