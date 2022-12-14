import { Component, OnInit, ViewChild} from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogProductComponent } from '../dialog/dialog-product/dialog-product.component';


@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  productList!: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'no.','name', 'price', 'category','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private CartService: ShoppingCartService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCatagory()
  }

  getCatagory() {
    this.CartService.getProducts().subscribe((res: any) => {
      this.productList = new MatTableDataSource(res)
      this.productList = res.map( ( item : any,index : number) => {
        var tempObject = item;
        tempObject.number = index + 1;
        return tempObject
     })
      this.productList.paginator = this.paginator;
      this.productList.sort = this.sort;
      console.log(this.productList)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productList.filter = filterValue.trim().toLowerCase();

    if (this.productList.paginator) {
      this.productList.paginator.firstPage();
    }
  }

  openDialog(){
    this.dialog.open(DialogProductComponent, {
      width: '30%'
    });
  }
  onEditData(element: any) {
    this.dialog.open(DialogProductComponent, {
      width: '30%',
      data: element
    })
  }
  onDeleteCategory(element: any){
    this.CartService.deleteProduct(element.id).subscribe((res) => {
      console.log(element.id, 'res')
      alert('data deleted successfully')
      this.getCatagory()
    })
  }

}
