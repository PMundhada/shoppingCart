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
  isAdd: boolean = false; // hidden by default
  isEdit: boolean = false
  constructor(private formBuilder: FormBuilder, private shoppingCartService: ShoppingCartService,
    @Inject(MAT_DIALOG_DATA) public onEditData: any) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      "name": ['', Validators.required],
      // "price": ['', Validators.required, Validators.pattern("^[0-9]{1,10}$")],
      "price": new FormControl('', [Validators.required, Validators.pattern("^[0-9]{1,10}$")]),
      "category": ['', Validators.required],
      "description": ['', Validators.required],
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
        this.isAdd = false;
        this.isAdd = !this.isAdd;
        this.formValue.reset();
        // this.dialogRef.close('save');
        window.location.reload();

      })
    } else {
      this.updateCategory()
    }
  }

  updateCategory() {
    this.shoppingCartService.updateProduct(this.formValue.value, this.onEditData.id).subscribe(() => {
      this.isEdit = !this.isEdit;
      window.location.reload();
    })
  }


}
