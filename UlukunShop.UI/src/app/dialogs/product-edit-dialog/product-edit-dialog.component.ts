import {Component, Inject, OnInit} from '@angular/core';
import {BaseDialog} from "../base/base-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {List_Product} from "../../contracts/List_Product";

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.scss']
})
export class ProductEditDialogComponent extends BaseDialog<ProductEditDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<ProductEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: List_Product,
  ) {
    super(dialogRef)
  }

  product: List_Product = this.data

  property = this.product.properties
  stock = this.product.stock
  price = this.product.price
  name = this.product.name


  ngOnInit(): void {

  }

  updateProduct(txtName: HTMLInputElement, txtProperties: HTMLInputElement, txtPrice: HTMLInputElement, txtStock: HTMLInputElement) {
console.log(txtProperties.value)
  }
}
