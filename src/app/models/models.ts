export interface registroUsuario {
    uid: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    correo: string;
    password: string;
    rol: 'paciente'|'funcionario'|'admin',
    
}