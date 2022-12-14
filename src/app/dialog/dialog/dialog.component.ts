import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators, FormControl } from '@angular/forms';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  formValue!: FormGroup
  actionButton : string ="Add"
  title: string = "Add Details"
  constructor(private formBuilder: FormBuilder, private shoppingCartService:ShoppingCartService,
    @Inject(MAT_DIALOG_DATA) public onEditData:any ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      "name": ['', Validators.required],
      // "categoryName": new FormControl('',[]),
     

    })

    if(this.onEditData){
      this.actionButton="Update"
      this.title = "Edit Details"
      this.formValue.controls['name'].setValue(this.onEditData.name)
    }
  }



  addCtegory(){
    if(!this.onEditData){
      this.shoppingCartService.postCategory(this.formValue.value).subscribe( (res)=> {
        console.log('res  is', res)
        alert('Category added successfully')
  
      })
    }else{
      this.updateCategory()
    }
  }

  updateCategory(){
      this.shoppingCartService.updateData(this.formValue.value, this.onEditData.id).subscribe(()=>{
           alert('Data Updated Successfully')
      })
  }

}
