import './App.css';
import Home from './Components/Home/Home';
import LoginForm from './Components/LoginForm/LoginForm';
import CrearProyecto from './Components/CrearProyecto/CrearProyecto';
import RegistroProyectos from './Components/RegistroProyectos/RegistroProyectos';
import Incidencias from './Components/Incidencias/Incidencias';
import RegistroIncidencias from './Components/RegistroIncidencias/RegistroIncidencias';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/crear-proyecto" element={<CrearProyecto />} />
      <Route path="/registro-proyectos" element={<RegistroProyectos />} />
      <Route path="/incidencias/:id" element={<Incidencias />} />
      <Route path="/registro-incidencias/:id" element={<RegistroIncidencias />} />
    </Routes>
  );
}

export default App;
