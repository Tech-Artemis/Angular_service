import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';
import { MatDialog } from '@angular/material';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'es-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products$: Observable<any>;
  cart$: Observable<any>;
  cart: any = {};

  constructor(private productsService: ProductsService, private cartService: CartService, public dialog: MatDialog) {
    this.cart$ = this.cartService.cart$.subscribe(cart => this.cart = cart);
    this.products$ = this.productsService.getProducts();
  }

  displayNetworkStatus() {
    if (navigator.onLine) {
      document.querySelector('body').style.filter = '';
    } else {
      document.querySelector('body').style.filter = 'grayscale(1)';
    }
  }

  ngOnInit() {
    this.displayNetworkStatus();
    window.addEventListener('online', this.displayNetworkStatus);
    window.addEventListener('offline', this.displayNetworkStatus);
  }

  onAddProduct(count, product) {
    this.cartService.addToCart(count, product);
  }

  openCart() {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}