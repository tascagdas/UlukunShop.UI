import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {BaseDialog} from "../base/base-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {List_Product} from "../../contracts/List_Product";
import {Edit_Product} from "../../contracts/Edit_Product";
import {Create_Product} from "../../contracts/create_product";
import {AlertifyService, MessageType, Position} from "../../services/admin/alertify.service";
import {ProductService} from "../../services/common/models/product.service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.scss']
})
export class ProductEditDialogComponent extends BaseDialog<ProductEditDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<ProductEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: List_Product,
              private productService: ProductService,
              private alertify: AlertifyService,
              private router: Router,
              private route: ActivatedRoute
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

  ngOnDestroy(): void {
    console.log("komponent kapatildi.")
  }

  @Output() editedProduct: EventEmitter<Edit_Product> = new EventEmitter();


  updateProduct(txtName: HTMLInputElement, txtProperties: HTMLInputElement, txtPrice: HTMLInputElement, txtStock: HTMLInputElement) {

    const edit_product: Edit_Product = new Edit_Product();
    edit_product.name = txtName.value;
    edit_product.stock = parseInt(txtStock.value);
    edit_product.price = parseFloat(txtPrice.value);
    edit_product.properties = txtProperties.value;
    edit_product.id = this.data.id;


    this.productService.edit(edit_product, () => {



      this.alertify.message("Urun basariyla guncellenmistir.", {dismissOthers: true, messageType: MessageType.Success});
      this.editedProduct.emit(edit_product);

    }, errorMessage => {


      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });


    });


  }
}
