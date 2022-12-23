import { Component, OnInit, Inject, Output} from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  EventEmitter } from '@angular/core';


@Component({
  selector: 'app-delete-dailog',
  templateUrl: './delete-dailog.component.html',
  styleUrls: ['./delete-dailog.component.css']
})
export class DeleteDailogComponent implements OnInit {
  categoryList : any;
  @Output() onDelete = new EventEmitter<any>(); 
  constructor(private CartService: ShoppingCartService,
    @Inject(MAT_DIALOG_DATA) public openDeleteDialog : any) { }

  ngOnInit(): void {
    this.getCatagory() 
  }
  getCatagory() {
    this.CartService.getCategoryByFetching().subscribe((res: any) => {
      this.categoryList = res
      console.log( this.categoryList)
      
    })
  }

  
  onDeleteCategory(element: any){
    this.CartService.deleteData(this.openDeleteDialog.id).subscribe({
      next : ((res:any)=> {

        window.location.reload();
        // this.dialog.close(res)
      })
    })
  }

}
