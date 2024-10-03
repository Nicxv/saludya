export interface registroUsuario {
    uid: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    correo: string;
    password: string;
    rol: 'paciente'|'funcionario'|'admin',

    // Campos adicionales
    rut?: string;
    edad?: string;
    genero?: string;
    altura?: string;
    peso?: string;
    direccion?: string;
    numeroTelefonico?: string;
    antecedentesQuirurgicos?: string;
    alergias?: string;
    medicamentos?: string;
    
    photoURL?: string;
}