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
    photoURL?: string; //foto
    especialidad?: string;
    descripcion?: string;
    isEditing?: boolean;  // Campo opcional para controlar la edición
}

export interface Mensaje {
    id_mensaje: string;
    nombre_usu: string;
    apellido_usu: string;
    correo_usu: string;
    asunto: string;
    mensaje: string;
    fecha: Date;
    uid: string;
  }
  