import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators, FormControl } from '@angular/forms';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.css']
})
export class DialogProductComponent implements OnInit {
  formValue!: FormGroup;
  actionButton : string ="Add"
  constructor(private formBuilder: FormBuilder, private shoppingCartService: ShoppingCartService,
    @Inject(MAT_DIALOG_DATA) public onEditData: any) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      "name": ['', Validators.required],
      "price": ['', Validators.required],
      "category": ['', Validators.required],
    })
    if (this.onEditData) {
      this.actionButton="Update"
      this.formValue.controls['name'].setValue(this.onEditData.name)
      this.formValue.controls['price'].setValue(this.onEditData.price)
      this.formValue.controls['category'].setValue(this.onEditData.category)
    }
  }


  addProduct() {
    if (!this.onEditData) {
      this.shoppingCartService.postProducts(this.formValue.value).subscribe((res) => {
        console.log('res  is', res)
        alert('Category added successfully')

      })
    } else {
      this.updateCategory()
    }
  }

  updateCategory() {
    this.shoppingCartService.updateProduct(this.formValue.value, this.onEditData.id).subscribe(() => {
      alert('Data Updated Successfully')
    })
  }


}
