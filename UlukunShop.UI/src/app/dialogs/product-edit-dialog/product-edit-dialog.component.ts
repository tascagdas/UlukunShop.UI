import {Component, Inject, OnInit} from '@angular/core';
import {BaseDialog} from "../base/base-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CompleteOrderState} from "../complete-order-dialog/complete-order-dialog.component";

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.scss']
})
export class ProductEditDialogComponent extends BaseDialog<ProductEditDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<ProductEditDialogComponent>) {
    super(dialogRef)
  }
  ngOnInit(): void {
      throw new Error('Method not implemented.');
  }

  updateProduct(txtName: HTMLInputElement, txtProperties: HTMLInputElement, txtPrice: HTMLInputElement, txtStock: HTMLInputElement) {

  }
}
