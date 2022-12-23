import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogProductComponent } from '../dialog/dialog-product/dialog-product.component';
import { DeleteDailogProductComponent } from '../dialog/delete-dailog-product/delete-dailog-product.component';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  searchGroup!: FormGroup;
  searchedValues: any = {};
  tableData: any = [];
  productList!: MatTableDataSource<any>;
  displayedColumns: string[] = ['index', 'name', 'price', 'category', 'description', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private CartService: ShoppingCartService, private dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.tableData = this.productList;
    this.getCatagory()
  }
  createForm() {
    this.searchGroup = new FormGroup({
      prod : new FormControl(" ")
    })
  }

  applyFilters(val: any, col: any) {
    this.tableData = this.productList;
    switch (col) {
      case 'name':
        this.searchedValues.name = val;
        console.log('called')
        break;
      default:
        break;
    }

   
    this.filterProdData();
   
  }

  filterProdData() {
    let val = this.searchedValues.name;
    console.log(val)
    if (val) {
      this.tableData = [...this.tableData].filter(
        item => item.products.toString().toLowerCase().includes(val.toLowerCase())
      )
    }
  }

  getCatagory() {

    this.CartService.getProducts()
      .subscribe({
        next: (res: any) => {
          this.productList = new MatTableDataSource(res);
          this.productList.paginator = this.paginator;
          this.productList.sort = this.sort;

        },
        error: (err) => {
          alert("Error while fetching records")
        }
      })



  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productList.filter = filterValue.trim().toLowerCase();

    if (this.productList.paginator) {
      this.productList.paginator.firstPage();
    }
  }

  openDialog() {
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
  onDeleteCategory(element: any) {
    this.CartService.deleteProduct(element.id).subscribe((res) => {
      console.log(element.id, 'res')
      alert('data deleted successfully')
      this.getCatagory()
    })
  }
  openDeleteDialog(element: any) {

    this.dialog.open(DeleteDailogProductComponent, {
      width: '30%',
      data: element
    },)
  }

}
