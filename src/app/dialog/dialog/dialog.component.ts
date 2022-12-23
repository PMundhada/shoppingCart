import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators, FormControl } from '@angular/forms';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  formValue!: FormGroup
  actionButton: string = "Add"
  title: string = "Add Category Details"
  isShown: boolean = false; // hidden by default
  isEdit: boolean = false
  constructor(private formBuilder: FormBuilder, private shoppingCartService: ShoppingCartService,
    @Inject(MAT_DIALOG_DATA) public onEditData: any, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      "name": ['', Validators.required],
      // "categoryName": new FormControl('',[]),
      


    })

    if (this.onEditData) {
      this.actionButton = "Update"
      this.title = "Edit Category Details"
      this.formValue.controls['name'].setValue(this.onEditData.name)
    }
  }



  // addCtegory() {
  //   if (!this.onEditData) {
  //     this.shoppingCartService.postCategory(this.formValue.value).subscribe((res) => {
  //       console.log('res  is', res)
  //       alert('Category added successfully')
  //       this.formValue.reset();
  //       this.dialogRef.close('save')
  //     })
  //   } else {
  //     this.updateCategory()
  //   }
  // }

  addCtegory() {
    if (!this.onEditData) {
      if (this.formValue.valid) {
        this.shoppingCartService.postCategory(this.formValue.value)
          .subscribe({
            next: (res) => {
              this.isShown = false;
              this.isShown = !this.isShown;
              console.log("Product Added successfully")
              this.formValue.reset();
              // this.dialogRef.close('save');
              window.location.reload();
              
              


            },
            error: () => {
              alert("Something went wrong")
            }
          })
      }
    } else {
      this.updateCategory()
    }

  }

  updateCategory() {
    this.shoppingCartService.updateData(this.formValue.value, this.onEditData.id).subscribe(() => {
      this.isEdit = !this.isEdit;
      window.location.reload();

    })
  }

}
