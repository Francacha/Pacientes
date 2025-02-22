import { useForm } from "react-hook-form"
import Error from "./Error"
import type { DraftPatient } from "../types"
import { usePatientStore } from "../store/store"
import { useEffect } from "react"
import {Bounce, toast} from 'react-toastify'

export default function PatientForm() {
  
    const addPatient = usePatientStore(state => state.addPatient)
    const activeId = usePatientStore(state => state.activeId)
    const patients = usePatientStore(state => state.patients)
    const updatePatient = usePatientStore(state => state.updatePatient)

    const {register, handleSubmit,setValue,formState: {errors},reset} = useForm<DraftPatient>()

    useEffect(() => {
        if(activeId){
            const activePacient = patients.filter(patient => patient.id === activeId)[0]
            setValue('name',activePacient.name)
            setValue('age',activePacient.age)
            setValue('phone',activePacient.phone)
            setValue('date',activePacient.date)
            setValue('symptoms',activePacient.symptoms)
            
        }
    },[activeId])
    const registerPatient = (data: DraftPatient) => {
        if(activeId){
            updatePatient(data)
            toast.success(' Paciente Actulizado', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                })
        }else{
            addPatient(data)
            toast.success(' Paciente Agregado', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                })
        }
       
       reset()
    }
    return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
          <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
  
          <p className="text-lg mt-5 text-center mb-10">
              Añade Pacientes y {''}
              <span className="text-indigo-600 font-bold">Administralos</span>
          </p>
  
          <form 
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
              noValidate
              onSubmit={handleSubmit(registerPatient)}
          >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente 
                    </label>
                    <input  
                        id="name"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Paciente" 
                        {...register('name',{
                            required:'El nombre del paciente es obligatorio'
                        })}

                    />
                    {errors.name && (
                        <Error>{errors.name?.message}</Error>
                    )}
                    
                    
                </div>
  
                <div className="mb-5">
                  <label htmlFor="age" className="text-sm uppercase font-bold">
                      Edad 
                  </label>
                  <input  
                      id="age"
                      className="w-full p-3  border border-gray-100"  
                      type="text" 
                      placeholder="Edad del Paciente" 
                      {...register('age',{
                        required:'La edad del paciente es obligatoria',
                        pattern: {
                            value: /^[0-9]+$/, // Solo números
                            message: 'Solo se permiten números'
                        }
                    })}
                  />
                  {errors.age && (
                        <Error>{errors.age?.message}</Error>
                    )}
                </div>
  
              <div className="mb-5">
                <label htmlFor="email" className="text-sm uppercase font-bold">
                    Telefono
                </label>
                <input  
                    id="phone"
                    className="w-full p-3  border border-gray-100"  
                    type="text" 
                    placeholder="Telefono de Registro" 
                    {...register('phone',{
                        required: 'El teléfono es obligatorio',
                        pattern: {
                            value: /^[0-9]+$/, // Solo números
                            message: 'Solo se permiten números'
                        }
                    })}
                />
                {errors.phone && (
                    <Error>{errors.phone?.message}</Error>
                )}
              </div>
  
              <div className="mb-5">
                  <label htmlFor="date" className="text-sm uppercase font-bold">
                      Fecha de Ingreso 
                  </label>
                  <input  
                      id="date"
                      className="w-full p-3  border border-gray-100"  
                      type="date" 
                      {...register('date',{
                        required:'La fecha de ingreso del paciente es obligatoria'
                    })}
                  />
                   {errors.date && (
                        <Error>{errors.date?.message}</Error>
                    )}
              </div>
              
              <div className="mb-5">
                  <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                  Síntomas 
                  </label>
                  <textarea  
                      id="symptoms"
                      className="w-full p-3  border border-gray-100"  
                      placeholder="Síntomas del paciente" 
                      {...register('symptoms',{
                        required:'Los sintomas del paciente son obligatorios'
                    })}
                  ></textarea>
                  {errors.symptoms && (
                        <Error>{errors.symptoms?.message}</Error>
                    )}
              </div>
  
              <input
                  type="submit"
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                  value='Guardar Paciente'
              />
          </form> 
      </div>
    )
  }