
import { BrowserRouter as Router} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import "react-toastify/ReactToastify.css";
import Login from '../src/pages/login';
import { usePatientStore } from './store/store';

function App() {
    const isAuthenticated = usePatientStore(state => state.isAuthenticated);
    const logout = usePatientStore(state => state.logout);

    return (
        <Router>
            <div className="container mx-auto">
                <header className="bg-sky-100 p-5 border-b-4 border-sky-700 flex justify-between items-center">
                    <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
                        Seguimiento de Pacientes
                        <span className="text-sky-700"> Clinica</span>
                    </h1>
                    {isAuthenticated && (
                        <button 
                            onClick={logout}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                        >
                            Cerrar Sesión
                        </button>
                    )}
                </header>
                <div className="min-h-screen flex justify-center items-center">
                    {isAuthenticated ? (
                        <>
                            <PatientForm />
                            <PatientList />
                        </>
                    ) : (
                        <Login />
                    )}
                </div>
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;
