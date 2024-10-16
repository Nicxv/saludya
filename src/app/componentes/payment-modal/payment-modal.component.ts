import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { loadStripe } from '@stripe/stripe-js';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {
  @Input() consulta: any;
  stripe: any;
  card: any;

  constructor(
    private modalController: ModalController,
    private paymentService: PaymentService,
    private firestore: FirestoreService
  ) {}

  ngOnInit() {
    this.initializeStripe();
  }

  private async initializeStripe() {
    this.stripe = await loadStripe('pk_test_51QAZP0Fm8vIFI2nfBfipUaYZkh8BgXJsecl5dx0Da335OSx6Q7X2XnIUiGu2E90CKBI5Hjep5eLbNGqgDQd87KGL006bKX1Z6V');
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  async confirmarPago() {
    try {
      const amount = this.consulta.costoConsulta * 100; // Convertir a centavos
      const clientSecret = await this.paymentService.createPaymentIntent(amount);
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: this.card,
        }
      });

      if (error) {
        console.error('Error en el proceso de pago:', error.message);
      } else {
        console.log('Pago realizado:', paymentIntent);
        this.guardarConsulta(); // Guardar la consulta después de un pago exitoso
        this.cerrarModal(); // Cerrar el modal
      }
    } catch (error) {
      console.error('Error en el proceso de pago:', error);
    }
  }

  async guardarConsulta() {
    const id = this.firestore.getId();
    this.consulta.id_consulta = id;
    this.consulta.fecha_pago = new Date();
    await this.firestore.createDoc(this.consulta, 'ConsultasMedicas', id);
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
