import { Component, OnInit, Inject } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  EventEmitter } from '@angular/core';


@Component({
  selector: 'app-delete-dailog-product',
  templateUrl: './delete-dailog-product.component.html',
  styleUrls: ['./delete-dailog-product.component.css']
})
export class DeleteDailogProductComponent implements OnInit {

  constructor(private CartService: ShoppingCartService,
    @Inject(MAT_DIALOG_DATA) public openDeleteDialog : any) { }

  ngOnInit(): void {
  }
  onDeleteProduct(element: any) {
    this.CartService.deleteProduct(element.id).subscribe((res) => {
      console.log(element.id, 'res')
      window.location.reload();
    
    })
  }
}
