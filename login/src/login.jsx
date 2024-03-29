import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/login.css';

const Login = () => {
  const navigate = useNavigate();
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
        console.log("resposta recebida");
        if (response.data.role === 'Administrator') {
          // Redirecionar para a página de administrador
          console.log('Redirecionando para /adm');
          return navigate('/adm');
        }
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
