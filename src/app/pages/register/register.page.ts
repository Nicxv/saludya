import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  registerForm: FormGroup;
  currentStep: number = 1;

  constructor(private formBuilder: FormBuilder, private alertController: AlertController) { 
    this.registerForm = this.formBuilder.group({
      // Primera parte del formulario
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      rut: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(0)]],

      // Segunda parte del formulario
      altura: ['', [Validators.required, Validators.min(0)]],
      peso: ['', [Validators.required, Validators.min(0)]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      correo: ['', [Validators.required, Validators.email]],
      antecedentesQuirurgicos: [''],
      alergias: [''],
      medicamentos: [''],
    });
  }

  // Avanzar al siguiente paso del formulario
  goToNextStep() {
    if (this.isFirstStepValid()) {
      this.currentStep = 2;
    } else {
      this.markFirstStepFieldsAsTouched();
    }
  }

  // Regresar al paso anterior del formulario
  goToPreviousStep() {
    this.currentStep = 1;
  }

  // Verifica si los campos de la primera parte son válidos
  private isFirstStepValid(): boolean {
    return (this.registerForm.get('nombre')?.valid ?? false) &&
           (this.registerForm.get('apellidos')?.valid ?? false) &&
           (this.registerForm.get('rut')?.valid ?? false) &&
           (this.registerForm.get('genero')?.valid ?? false) &&
           (this.registerForm.get('fechaNacimiento')?.valid ?? false) &&
           (this.registerForm.get('edad')?.valid ?? false);
  }

  // Marca los campos de la primera parte como tocados para que muestren errores
  private markFirstStepFieldsAsTouched() {
    Object.keys(this.registerForm.controls).forEach(field => {
      const control = this.registerForm.get(field);
      if (control && this.isFirstStepField(field)) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  // Verifica si el campo pertenece a la primera parte del formulario
  private isFirstStepField(fieldName: string): boolean {
    return ['nombre', 'apellidos', 'rut', 'genero', 'fechaNacimiento', 'edad'].includes(fieldName);
  }

  // Registrar el formulario
  async register() {
    if (this.registerForm.valid) {
      const alert = await this.alertController.create({
        header: 'Registro exitoso',
        message: '¡Has sido registrado correctamente!',
        buttons: ['OK']
      });
      await alert.present();
  
      // Resetea el formulario después de mostrar la alerta
      this.registerForm.reset();
      
      // Opcional: También puedes regresar al primer paso
      this.currentStep = 1;
  
    } else {
      this.markSecondStepFieldsAsTouched();
    }
  }
  
  

  // Marca los campos de la segunda parte como tocados para que muestren errores
  private markSecondStepFieldsAsTouched() {
    Object.keys(this.registerForm.controls).forEach(field => {
      const control = this.registerForm.get(field);
      if (control && this.isSecondStepField(field)) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  // Verifica si el campo pertenece a la segunda parte del formulario
  private isSecondStepField(fieldName: string): boolean {
    return ['altura', 'peso', 'direccion', 'telefono', 'correo', 'antecedentesQuirurgicos', 'alergias', 'medicamentos'].includes(fieldName);
  }

  ngOnInit() {
  }
}
