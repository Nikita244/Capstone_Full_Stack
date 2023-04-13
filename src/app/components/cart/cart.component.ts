import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
export const CART = 'Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {


  @Input() isLoggedIn!: boolean;

  @ViewChild('generatePdfButton', { static: true }) generatePdfButton!: ElementRef;


  public payPalConfig?: IPayPalConfig;

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.getTotal().toString(),
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.getTotal().toString()
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: this.getTotal().toString(),
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
          // Save details to session storage
          sessionStorage.setItem('paypalDetails', JSON.stringify(details.id));
        });
        this.totalPrice = this.getTotal(); // calcola il totale effettivo
        sessionStorage.setItem(CART, JSON.stringify(this.cartItems))
        sessionStorage.setItem('Totale', JSON.stringify(this.totalPrice.toFixed(2).toString()))

        this.cartItems = [
          {
            id: 1,
            name: 'Biglietto adulto',
            description: 'Intero',
            image: '../../../assets/img/bg_adult.jpg',
            price: 22.50,
            quantity: 0

          },
          {
            id: 2,
            name: 'Biglietto ragazzo',
            description: '4-12 anni',
            image: '../../../assets/img/bg_child.jpg',
            price: 14.50,
            quantity: 0,
          }
        ];
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.showSuccess = true;
        this.generatePDF();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  cartItems: any[] = [
    {
      id: 1,
      name: 'Biglietto adulto',
      description: 'Intero',
      image: '../../../assets/img/bg_adult.jpg',
      price: 22.50,
      quantity: 0
    },
    {
      id: 2,
      name: 'Biglietto ragazzo',
      description: '4-12 anni',
      image: '../../../assets/img/bg_child.jpg',
      price: 14.50,
      quantity: 0
    },
  ];

  totalPrice!: number;

  constructor(private route: Router) { }

  getTotal(): number {
    let total = 0;
    for (let item of this.cartItems) {
      total += item.price * item.quantity;
    }
    return total;
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }

  increaseQuantity(item: any): void {
    item.quantity++;
  }

  checkout(): void {
    console.log(this.getTotal());

  }


  generatePDF() {
    const cartData: any[] = JSON.parse(sessionStorage.getItem('Cart') || '[]');
    const backgroundImgUrl = 'assets/img/test2.jpg';
    const PDF = new jsPDF();

    // Aggiungi l'immagine come sfondo del PDF
    const img = new Image();
    img.src = backgroundImgUrl;
    PDF.addImage(img, 'JPEG', 0, 0, PDF.internal.pageSize.getWidth(), PDF.internal.pageSize.getHeight());

    // Aggiungi contenuto sopra l'immagine
    let startY = 65;
    const rowHeight = 50;
    const col1Width = 100;
    const col2Width = 50;
    PDF.setFontSize(18);
    // PDF.text("Carrello acquisti", 20, 20);
    PDF.setFontSize(14);
    PDF.setTextColor(80, 80, 80); // Imposta il colore del testo su grigio scuro
    let totalCost = 0;

    // Aggiungi l'ID transazione PayPal
    const transactionId = sessionStorage.getItem('paypalDetails');
    PDF.text("Numero transazione PayPal: " + transactionId!.replace(/"/g, ''), 46.5, startY + 5);
    startY += 20;

    PDF.setDrawColor(80, 80, 80);
    PDF.setLineWidth(0.3);
    PDF.line(30, startY - 10, 180, startY - 10);

    cartData.forEach((ticket: any, index: number) => {

      // Aggiungi l'immagine prima della tipologia del biglietto
      const img = new Image();
      img.src = ticket.image;
      PDF.addImage(img, 'JPEG', 30, startY, 60, 40);
      PDF.text("Tipologia: " + ticket.name, 110, startY + 7);
      PDF.text("Prezzo: € " + ticket.price.toFixed(2), 110, startY + 17);
      PDF.text("Quantità: " + ticket.quantity, 110, startY + 27);
      const subtotal = ticket.price * ticket.quantity;
      PDF.text("Subtotale: € " + subtotal.toFixed(2), 110, startY + 37);
      totalCost += subtotal;
      startY += rowHeight;
    });

    // Disegna la linea sopra "Importo totale"
    PDF.setDrawColor(80, 80, 80);
    PDF.setLineWidth(0.3);
    PDF.line(30, startY + 0, 180, startY + 0);
    PDF.text("Importo totale: € " + totalCost.toFixed(2), 110, startY + 10);
    //const grandTotal = totalCost + parseFloat(sessionStorage.getItem('Totale') || '0');
    PDF.setLineWidth(0.3);
    PDF.line(30, startY + 16, 180, startY + 16);
    const pdfBlob = PDF.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  }
}
