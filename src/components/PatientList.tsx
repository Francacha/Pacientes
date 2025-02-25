import { usePatientStore } from "../store/store"
import PatientDetails from "./PatientDetails"
export default function PatientList() {

  const patients = usePatientStore((state) => state.patients)

  return (
    <div className="md:w-3/4 lg:w-4/5 min-h-screen overflow-scroll">
      {patients.length ? (
        <>
        <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
      
        <p className="text-xl mt-5 mb-10 text-center"> Administra tus pacientes {' '}
        <span className="text-indigo-600 font-bold">Pacientes y citas </span>
        </p>
        {patients.map(patient => (
          <PatientDetails 
          key={patient.id}
          patient={patient}
          />
        ))}

        </>
      ): ( 
        <> 
        <h2 className="font-black text-3xl text-center">No hay pacientes </h2>
        <p className="text-xl mt-5 mb-10 text-center">
            Agregue los pacientes y {' '}
          <span className="text-indigo-600 font-bold ">aqui figuraran</span>
        </p>
        </>
      )}
      
      </div>
  )
}
