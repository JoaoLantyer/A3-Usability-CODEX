import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';

// Pages
import Home from './pages/Home';
import Series from './pages/Series';
import Streaming from './pages/Streaming';
import Login from './pages/Login';
import Cadastrar from './pages/Cadastrar';
import CadastrarSerie from './pages/CadastrarSerie';
import CadastrarPlataforma from './pages/CadastrarPlataforma';

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
        <Route path ="cadastrarplataforma" element={<CadastrarPlataforma />} />
      </Routes>
      </BrowserRouter>

      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <footer>
      </footer>

    </div>
  );
}

export default App;
