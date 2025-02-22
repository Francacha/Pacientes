export type Patient = {
    id: string
    name: string    
    age: number
    phone: number
    date: Date
    symptoms: string
}

export type DraftPatient = Omit<Patient,'id'>