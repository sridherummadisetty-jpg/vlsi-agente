import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
    return (
        <div>
            <h1>Welcome to the VLSI Learning Application</h1>
            <p>This is a basic setup for a React application focused on VLSI concepts.</p>
        </div>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App />);
}