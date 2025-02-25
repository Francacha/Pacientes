import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DraftPatient, Patient } from "../types";
import { User } from "firebase/auth"; // Importamos el tipo de Firebase

type EvolutionEntry = {
  id: string;
  patientId: string;
  timestamp: string;
  description: string;
};

type AuthState = {
  user: User | null; // Nuevo estado para el usuario autenticado
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
};

type PatientState = {
  evolutions: any;
  patients: Patient[];
  activeId: Patient["id"];
  addPatient: (data: DraftPatient) => void;
  deletePatient: (id: Patient["id"]) => void;
  getPatientById: (id: Patient["id"]) => void;
  updatePatient: (data: DraftPatient) => void;
  addEvolution: (patientId: string, description: string) => void;
  getEvolutionsByPatient: (patientId: string) => EvolutionEntry[];
};

const createPatient = (patient: DraftPatient): Patient => {
  return { ...patient, id: uuidv4() };
};

export const usePatientStore = create<PatientState & AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        patients: [],
        evolutions: [],
        activeId: "",
        user: null, // Inicialmente no hay usuario
        isAuthenticated: false,

        addPatient: (data) => {
          const newPatient = createPatient(data);
          set((state) => ({
            patients: [...state.patients, newPatient],
          }));
        },
        deletePatient: (id) => {
          set((state) => ({
            patients: state.patients.filter((patient) => patient.id !== id),
            evolutions: state.evolutions.filter(
              (evo: { patientId: string }) => evo.patientId !== id
            ),
          }));
        },
        getPatientById: (id) => {
          set(() => ({
            activeId: id,
          }));
        },
        updatePatient: (data) => {
          set((state) => ({
            patients: state.patients.map((patient) =>
              patient.id === state.activeId
                ? { id: state.activeId, ...data }
                : patient
            ),
            activeId: "",
          }));
        },
        addEvolution: (patientId, description) => {
          const newEntry: EvolutionEntry = {
            id: uuidv4(),
            patientId,
            timestamp: new Date().toISOString(),
            description,
          };
          set((state) => ({
            evolutions: [...state.evolutions, newEntry],
          }));
        },
        getEvolutionsByPatient: (patientId) =>
          get().evolutions.filter(
            (evo: { patientId: string }) => evo.patientId === patientId
          ),

        // Nueva función para actualizar el usuario autenticado
        setUser: (user) => {
          set({
            user,
            isAuthenticated: !!user, // Si hay usuario, autenticado = true
          });
        },

        // Logout: elimina el usuario y cambia el estado
        logout: () => {
          set({
            user: null,
            isAuthenticated: false,
          });
        },
      }),
      {
        name: "patient-storage",
      }
    )
  )
);
