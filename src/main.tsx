import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to the VLSI Learning Application</h1>
    <p>Your resource for understanding VLSI concepts.</p>
  </div>
);

const truthTable = (input: boolean[]) => {
  // Logic for generating truth table based on input
  return [
    { A: false, B: false, Output: false },
    { A: false, B: true, Output: true },
    { A: true, B: false, Output: true },
    { A: true, B: true, Output: true },
  ];
};

const Circuits = () => {
  const table = truthTable([]);
  return (
    <div>
      <h2>Logic Gates Truth Tables</h2>
      <table>
        <thead>
          <tr>
            <th>A</th>
            <th>B</th>
            <th>Output (AND)</th>
          </tr>
        </thead>
        <tbody>
          {table.map((row, index) => (
            <tr key={index}>
              <td>{row.A.toString()}</td>
              <td>{row.B.toString()}</td>
              <td>{row.Output.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Tools = () => {
  const [binary, setBinary] = useState('');
  const [hex, setHex] = useState('');

  const convertToHex = (binary: string) => {
    if (binary) {
      setHex(parseInt(binary, 2).toString(16));
    }
  };

  return (
    <div>
      <h2>Binary/Hex Converter</h2>
      <input
        type="text"
        value={binary}
        onChange={(e) => {
          setBinary(e.target.value);
          convertToHex(e.target.value);
        }}
        placeholder="Enter binary number"
      />
      <p>Hex: {hex}</p>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About This Application</h2>
    <p>This application helps users learn VLSI concepts through interactive tools and examples.</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/circuits">Circuits</Link></li>
          <li><Link to="/tools">Tools</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/circuits" component={Circuits} />
        <Route path="/tools" component={Tools} />
        <Route path="/about" component={About} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));