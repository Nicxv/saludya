import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  currentStep: number = 1;

  constructor() { }

  // Avanzar al siguiente paso del formulario
  goToNextStep() {
    this.currentStep = 2;
  }

  // Regresar al paso anterior del formulario
  goToPreviousStep() {
    this.currentStep = 1;
  }

  ngOnInit() {
  }

}
