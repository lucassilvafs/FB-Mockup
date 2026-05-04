import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MockupGenerator from './MockupGenerator'; // Certifique-se que o caminho está correto

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MUDANÇA 1: Define a rota dinâmica que aceita o ID do produto */}
        <Route path="/:id" element={<MockupGenerator />} />

        {/* MUDANÇA 2: Redireciona a página inicial (/) para o ID 0 (Caneca) */}
        <Route path="/" element={<Navigate to="/0" replace />} />
        
        {/* OPCIONAL: Rota para links não encontrados (404) voltando ao início */}
        <Route path="*" element={<Navigate to="/0" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;