import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDailogComponent } from '../dialog/delete-dailog/delete-dailog.component';


@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {
  categoryList!: MatTableDataSource<any>;
  displayedColumns: string[] = ['no.', 'name', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private CartService: ShoppingCartService, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.getCatagory()
  }
  getCatagory() {
    this.CartService.getCategoryByFetching().subscribe((res: any) => {
      // this.categoryList = new MatTableDataSource(res)
      this.categoryList = res.map( ( item : any,index : number) => {
         var tempObject = item;
         tempObject.number = index + 1;
         return tempObject
      })
      this.categoryList.paginator = this.paginator;
      this.categoryList.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categoryList.filter = filterValue.trim().toLowerCase();

    if (this.categoryList.paginator) {
      this.categoryList.paginator.firstPage();
    }
  }
  openDialog(){
    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }
  openDeleteDialog(element:any){
    this.dialog.open(DeleteDailogComponent, {
      width: '30%',
      data: element
    });
  }
  onEditData(element: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: element
    })
  }
  // onDeleteCategory(element: any){
  //   this.CartService.deleteData(element.id).subscribe((res) => {
  //     console.log(element.id, 'res')
  //     alert('data deleted successfully')
  //     this.getCatagory()
  //   })
  // }
}




  

