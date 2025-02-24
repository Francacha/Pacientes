import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { Patient } from "../types";
import PatientDetailsItem from "./PatientDetailsItem";
import { usePatientStore } from "../store/store";

type PatientDetailsProps = {
    patient: Patient;
};

export default function PatientDetails({ patient }: PatientDetailsProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEvolutionModal, setShowEvolutionModal] = useState(false);
    const [newEvolution, setNewEvolution] = useState("");
    
    const deletePatient = usePatientStore((state) => state.deletePatient);
    const getPatientById = usePatientStore((state) => state.getPatientById);
    const addEvolution = usePatientStore((state) => state.addEvolution);
    const getEvolutionsByPatient = usePatientStore((state) => state.getEvolutionsByPatient);

    const handleDelete = () => {
        deletePatient(patient.id);
        toast.error("Paciente Eliminado", {
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
        setShowDeleteModal(false);
    };

    const handleAddEvolution = () => {
        if (newEvolution.trim() === "") return;
        addEvolution(patient.id, newEvolution);
        setNewEvolution("");
    };

    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientDetailsItem label="Nombre" data={patient.name} />
            <PatientDetailsItem label="Edad" data={patient.age} />
            <PatientDetailsItem label="Telefono" data={patient.phone} />
            <PatientDetailsItem label="Fecha de Ingreso" data={patient.date.toString()} />
            <PatientDetailsItem label="Sintomas" data={patient.symptoms} />

            <div className="flex flex-col lg:flex-row justify-between gap-3 mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => getPatientById(patient.id)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="py-2 px-10 bg-green-600 hover:bg-green-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => setShowEvolutionModal(true)}
                >
                    Evolución
                </button>
                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => setShowDeleteModal(true)}
                >
                    Eliminar
                </button>
            </div>

            {/* Modal de Confirmación de Eliminación */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p className="text-lg font-bold">¿Estás seguro de eliminar este paciente?</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                                onClick={handleDelete}
                            >
                                Sí, eliminar
                            </button>
                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Evolución */}
            {showEvolutionModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Evolución del Paciente</h2>
                        <div className="max-h-60 overflow-y-auto border p-2 rounded-md">
                            {getEvolutionsByPatient(patient.id).map((evo) => (
                                <div key={evo.id} className="border-b py-2">
                                    <p className="text-sm text-gray-600">{new Date(evo.timestamp).toLocaleString()}</p>
                                    <p>{evo.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <textarea
                                className="w-full border rounded-md p-2"
                                rows={3}
                                placeholder="Añadir nueva evolución..."
                                value={newEvolution}
                                onChange={(e) => setNewEvolution(e.target.value)}
                            />
                            <button
                                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
                                onClick={handleAddEvolution}
                            >
                                Agregar
                            </button>
                        </div>
                        <button
                            className="mt-4 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded w-full"
                            onClick={() => setShowEvolutionModal(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

