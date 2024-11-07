// models.ts
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
    subtotal: number; // Subtotal de la consulta
    iva: number; // IVA de la consulta
    costoConsulta: number; // Costo final de la consulta con IVA incluido
    codigoDescuento?: string; // Campo opcional para el código de descuento
    fecha_pago: Date;
    rutUsuario: string; // Nuevo campo para el RUT del usuario
    nombreUsuario: string; // Nuevo campo para el nombre del usuario
    apellidoUsuario: string;
    direccionUsuario: string; // Nuevo campo para la dirección del usuario
    uidFuncionario: string;
    fotoUsuario: string;
    estado?: 'aceptada'|'en espera',
    direccionFuncionario?: { lat: number; lng: number };
  }

  export interface Valoracion {
    id_valoricacion: string; //id unico para valorizacion
    uidUsuario: string; // UID del usuario que realiza la valoración
    uidFuncionario: string; // UID del funcionario que recibe la valoración
    valor: number; // Puntuación dada (por ejemplo, 1 a 5)
  }
  export interface Certificado {
    idCertificado: string;
    uid: string;  // UID del usuario
    nombreArchivo: string;
    urlArchivo: string;
    tipoArchivo: 'pdf' | 'imagen';
  }

  export interface Reporte {
    id_reporte: string;
    nombreFuncionario: string;
    apellidoFuncionario: string;
    rutFuncionario: string;
    uidReportador: string;
    tipoReporte: string;
    fechaReporte: Date;
  }
  
  
  
  
  
  