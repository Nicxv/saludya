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
    correoRemitente?: string; // Añadir esta línea para incluir el campo de correo
    expanded?: boolean;  // Campo opcional para la expansion
    
  }

  export interface Consultamedica {
    id_consulta: string;
    nombreFuncionario: string;
    descripcion: string;
    ordenMedicaURL?: string; // Campo opcional para almacenar la URL del PDF
    sintomas: string;
    subtotal: number; // Nuevo campo para el subtotal
    iva: number; // Nuevo campo para el IVA
    costoConsulta: number; // Costo final de la consulta con IVA incluido
    codigoDescuento?: string; // Campo opcional para el código de descuento
    fecha_pago: Date;
  }
  
  
  