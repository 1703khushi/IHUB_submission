import React, { useState} from 'react';


function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleLogin = () => {
      // Simulating a simple login check
      if (username === 'khushi' && password === 'khushi') {
        localStorage.setItem('isLoggedIn', 'true');
        onLogin();
      } else {
        alert('Invalid credentials. Please try again.');
      }
    };
  
    return (
        <div className="App">
        <div className="login_form">
          <h2 className="text">Login</h2>
          <div className="login_form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              type="password"
              placeholder="Password"
            //   className="login_form"
              value={password}
              onChange={handlePasswordChange}
            />
            <button className="l_btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
      
    );
  }
  
  export default LoginPage;