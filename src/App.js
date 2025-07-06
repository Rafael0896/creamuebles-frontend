// src/App.js
import AppRoutes from './routes/AppRoutes';
import './App.scss';

function App() {
    return <AppRoutes />;
}

// ¡Esta es la línea clave que soluciona el error!
// Exportamos el componente para que otros archivos, como index.js, puedan importarlo.
export default App;