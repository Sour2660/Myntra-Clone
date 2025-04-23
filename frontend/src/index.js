import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Use 'react-dom/client' in React 18
import App from './App';
import AuthProvider from './assets/context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
