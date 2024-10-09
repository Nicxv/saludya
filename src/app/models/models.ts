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
    edad?: number;
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

export interface Mensaje {
    id_mensaje: string;
    asunto: string;
    mensaje: string;
    fecha: Date;
    uid: string;
  }
  