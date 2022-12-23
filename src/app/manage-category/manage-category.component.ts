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
  // categoryList: any
  displayedColumns: string[] = ['index', 'name', 'action'];
  data : any;
  categoryList! : MatTableDataSource<any>;
  pageEvent={pageSize:10,pageIndex:0}
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private CartService: ShoppingCartService,
    private dialog: MatDialog,

  ) { }


  ngOnInit(): void {
    this.getCatagory()
  }
  closeDialog() {
  }
  // getCatagory() {
  //   this.CartService.getCategoryByFetching().subscribe((res: any) => {
  //     this.categoryList = new MatTableDataSource(res)
  //     this.categoryList = res.map((item: any, index: number) => {
  //       var tempObject = item;
  //       tempObject.number = index + 1;
  //       return tempObject
  //     })
  //     this.categoryList.paginator = this.paginator;
  //     this.categoryList.sort = this.sort;
  //   })
  // }
  getCatagory() {

    this.CartService.getCategoryByFetching()
      .subscribe({
        next: (res: any) => {
          // this.data = res
          // this.categoryList = new MatTableDataSource(this.data);
          // this.categoryList.paginator = this.paginator;
          // console.log(this.categoryList.paginator, 'paginator')
          // this.categoryList.sort = this.sort;
          // this.categoryList = res.map((item: any, index: number) => {
          //   var tempObject = item;
          //   tempObject.number = index + 1;
          //   return tempObject
          // })
          this.categoryList = new MatTableDataSource(res);
          this.categoryList.paginator = this.paginator;
          this.categoryList.sort = this.sort;
         
        },
        error: (err) => {
          alert("Error while fetching records")
        }
      })
      
      

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.categoryList.filter = filterValue.trim().toLowerCase();
    console.log( this.categoryList.filter)
    if (this.categoryList.paginator) {
      this.categoryList.paginator.firstPage();
    }
  }
  openDialog() {

    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }

  openDeleteDialog(element: any) {

    this.dialog.open(DeleteDailogComponent, {
      width: '30%',
      data: element
    },)
    // .afterClosed()
    // .subscribe( (res:any) => {
    //   console.log('response is:',res)
    //   this.categoryList = res;
    // }
    // )

  }
  onEditData(element: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: element
    })
  }



}






