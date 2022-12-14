import { Component, OnInit, Inject} from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-dailog',
  templateUrl: './delete-dailog.component.html',
  styleUrls: ['./delete-dailog.component.css']
})
export class DeleteDailogComponent implements OnInit {
  categoryList : any;
  constructor(private CartService: ShoppingCartService,
    @Inject(MAT_DIALOG_DATA) public openDeleteDialog : any) { }

  ngOnInit(): void {
    this.getCatagory() 
  }
  getCatagory() {
    this.CartService.getCategoryByFetching().subscribe((res: any) => {
      
      this.categoryList = res
    })
  }

  
  onDeleteCategory(element: any){
    console.log("0kkjhj")
    this.CartService.deleteData(this.openDeleteDialog.id).subscribe((res) => {
      console.log(this.openDeleteDialog.id, 'res')
      this.getCatagory()
    })
  }

}
