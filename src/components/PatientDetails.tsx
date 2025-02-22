import {Bounce, toast} from 'react-toastify'
import { Patient } from "../types"
import PatientDetailsItem from "./PatientDetailsItem"
import { usePatientStore } from "../store/store"

type PatientDetailsProps = {
    patient : Patient
}

export default function PatientDetails({patient}: PatientDetailsProps) {

    const deletePatient = usePatientStore((state)=>state.deletePatient)
    const getPatientById = usePatientStore((state)=>state.getPatientById)

    const handleClick = () => {
        deletePatient(patient.id)
        toast.error(' Paciente Eliminado', {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
    }
  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
        <PatientDetailsItem label="ID" data={patient.id} />
        <PatientDetailsItem label="Nombre" data={patient.name} />
        <PatientDetailsItem label="Edad" data={patient.age} />
        <PatientDetailsItem label="Telefono" data={patient.phone} />
        <PatientDetailsItem label="Fecha de Ingreso" data={patient.date.toString()} />
        <PatientDetailsItem label="Sintomas" data={patient.symptoms} />

        <div className="flex flex-col lg:flex-row justify-between gap-3 mt-10">
            <button type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold 
                    uppercase rounded-lg"
                    onClick={()=>getPatientById(patient.id)}
                    >Editar</button>
                    <button type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold 
                    uppercase rounded-lg"
                    onClick={handleClick}
                    >Eliminar</button>

        </div>

        
    
    </div>
  )
}
