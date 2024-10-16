import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private stripe: any;

  constructor() {
    this.initializeStripe();
  }

  private async initializeStripe() {
    this.stripe = await loadStripe('pk_test_51QAZP0Fm8vIFI2nfBfipUaYZkh8BgXJsecl5dx0Da335OSx6Q7X2XnIUiGu2E90CKBI5Hjep5eLbNGqgDQd87KGL006bKX1Z6V');
  }

  async createPaymentIntent(amount: number) {
    const response = await fetch('http://localhost:3000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
  
    const data = await response.json();
    return data.clientSecret;
  }

  async handlePayment(cardElement: any, clientSecret: string) {
    const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      }
    });

    if (error) {
      console.error(error);
      return null;
    }

    return paymentIntent;
  }
}