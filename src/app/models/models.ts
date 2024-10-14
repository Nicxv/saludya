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

  // models.ts

export interface Chat {
    id_chat: string; // ID único del chat
    asunto: string; // Asunto del mensaje
    mensaje: string; // Contenido del mensaje
    remitente: string; // UID del usuario que envía el mensaje
    destinatario: string; // UID del funcionario que recibe el mensaje
    timestamp: Date; // Marca de tiempo del mensaje
  }
  
  