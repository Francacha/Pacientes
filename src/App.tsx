import {ToastContainer} from 'react-toastify'
import PatientForm from "./components/PatientForm"
import PatientList from "./components/PatientList"
import "react-toastify/ReactToastify.css"


function App() {


  return (
    <>
     <div className="conteiner mx-auto mt-20">
      <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto ">
        Seguimiento de Pacientes {' '}
        <span className="text-sky-700">Clinica</span>
      </h1>
      <div className="mt-12 md:flex">
        <PatientForm />
        <PatientList />
      </div>
     </div>
     <ToastContainer/>
    </>
  )
}

export default App
