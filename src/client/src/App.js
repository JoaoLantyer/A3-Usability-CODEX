import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Series from './pages/Series';
import Streaming from './pages/Streaming';
import Login from './pages/Login';
import Cadastrar from './pages/Cadastrar';
import CadastrarSerie from './pages/CadastrarSerie';

// Components
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">

      <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path ="/" element = {<Home />} />
        <Route path ="series" element={<Series />} />
        <Route path ="streaming" element={<Streaming />} />
        <Route path ="login" element={<Login />} />
        <Route path ="cadastrar" element={<Cadastrar />} />
        <Route path ="cadastrarserie" element={<CadastrarSerie />} />
      </Routes>
      </BrowserRouter>

      <footer>
      </footer>

    </div>
  );
}

export default App;
