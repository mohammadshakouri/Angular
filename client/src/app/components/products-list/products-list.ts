import { Component } from '@angular/core';

@Component({
  selector: 'products-list',
  imports: [],
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.scss'],
})
export class ProductsList {
  products: {
    name: string;
    price: number;
    description: string;
  }[] = [
    {
      name: 'Product 1',
      price: 100,
      description: 'This is a great product',
    },
    {
      name: 'Product 2',
      price: 200,
      description: 'This is another great product',
    },
    {
      name: 'Product 3',
      price: 300,
      description: 'This is yet another great product',
    },
  ];
}
