import { Component, OnInit } from '@angular/core';
import { Certificado, registroUsuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-mis-certificadosf',
  templateUrl: './mis-certificadosf.page.html',
  styleUrls: ['./mis-certificadosf.page.scss'],
})
export class MisCertificadosfPage implements OnInit {
  login: boolean = false;
  rol: 'paciente' | 'funcionario' | 'admin' = null;
  certificados: Certificado[] = [];
  file: File | null = null;
  uid: string;
  tipoDocumentoSeleccionado: string = '';

  constructor(private auth:AuthService, private firestore:FirestoreService) {
    // me suscribo para obtener el estado del usuario, logeado o no logeado
  this.auth.stateUser().subscribe(res =>{
    if(res) {
      console.log('Esta logeado');
      this.login = true;
      this.getDatosUser(res.uid);
    }else {
      console.log('No está logeado');
      this.login = false;
    }
  }) 
   }
   getDatosUser(uid:string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<registroUsuario>(path, id).subscribe( res => {
      console.log('datos -> ', res);
      if(res) {
        this.rol = res.rol,
        this.uid = res.uid,
        this.cargarCertificados();
      }
       
    })
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  uploadCertificado() {
    if (this.file && this.uid) {
      const idCertificado = this.firestore.getId();
      const filePath = `certificados/${this.uid}/${idCertificado}_${this.file.name}`;
      const tipoArchivo = this.file.type.includes('pdf') ? 'pdf' : 'imagen';
  
      this.firestore.uploadFileAndGetURL(filePath, this.file).subscribe(url => {
        const nuevoCertificado: Certificado = {
          idCertificado,
          uid: this.uid,
          nombreArchivo: this.file.name,
          urlArchivo: url,
          tipoArchivo,
          tipoDocumento: this.tipoDocumentoSeleccionado  // Almacena el tipo de documento
        };
  
        this.firestore.createDoc(nuevoCertificado, 'MisCertificados', idCertificado)
          .then(() => {
            console.log('Certificado subido correctamente:', nuevoCertificado);
            this.certificados.push(nuevoCertificado);
            this.file = null;  // Resetea el archivo
            this.tipoDocumentoSeleccionado = '';  // Resetea el tipo de documento seleccionado
            
          })
          .catch(error => {
            console.error('Error al subir el certificado:', error);
          });
      });
    } else {
      console.log('No hay archivo seleccionado o UID no disponible.');
    }
  }
  
  

  cargarCertificados() {
    if (this.uid) {
      this.firestore.getCollectionWithId<Certificado>('MisCertificados').subscribe(certificados => {
        this.certificados = certificados.filter(cert => cert.uid === this.uid);
      });
    }
  }
  

  verCertificado(url: string) {
    window.open(url, '_blank');
  }
  
  eliminarCertificado(certificado: Certificado) {
    const idCertificado = certificado.idCertificado;
    const filePath = `certificados/${certificado.uid}/${idCertificado}_${certificado.nombreArchivo}`;
  
    // Primero, elimina el documento de Firestore
    this.firestore.deleteDocTwo('MisCertificados', idCertificado).then(() => {
      console.log('Certificado eliminado:', idCertificado);
      
      // Ahora elimina el archivo del Storage
      this.firestore.deleteFile(filePath).then(() => {
        console.log('Archivo eliminado del Storage:', filePath);
        // Actualiza la lista de certificados después de eliminar uno
        this.cargarCertificados();
      }).catch(error => {
        console.error('Error al eliminar el archivo del Storage:', error);
      });
  
    }).catch(error => {
      console.error('Error al eliminar el certificado:', error);
    });
  }
  

  ngOnInit() {
  }

}
