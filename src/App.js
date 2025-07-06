// src/App.js
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import './App.scss';

function App() {
    return (
        <CartProvider>
            <AppRoutes />
        </CartProvider>
    );
}

// ¡Esta es la línea clave que soluciona el error!
// Exportamos el componente para que otros archivos, como index.js, puedan importarlo.
export default App;