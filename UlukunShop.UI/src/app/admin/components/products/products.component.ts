import {Component, OnInit, ViewChild} from '@angular/core';
import { BaseComponent, SpinnerType } from "../../../base/base.component";
import { NgxSpinnerService } from "ngx-spinner";
import { AlertifyService } from "../../../services/admin/alertify.service";
import { HttpClientService } from "../../../services/common/http-client.service";
import {Create_Product} from "../../../contracts/create_product";
import {ListComponent} from "./list/list.component";
import {DialogService} from "../../../services/common/dialog.service";
import {QrcodeReadingDialogComponent} from "../../../dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component";

@Component ( {
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [ './products.component.scss' ]
} )
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor ( _spinner: NgxSpinnerService,
                private _alertify: AlertifyService,
                private _httpClientService: HttpClientService,
                private _dialogService: DialogService ) {
    super ( _spinner )
  }

  async ngOnInit () {
    this.showSpinner ( SpinnerType.Pacman );


  }

  @ViewChild(ListComponent) ListComponents : ListComponent;
  createdProduct(createdProduct:Create_Product){
    this.ListComponents.getProducts()
  }

  openProductQrCodeReadingDialog() {
    this._dialogService.openDialog({
      componentType:QrcodeReadingDialogComponent,
      data:null,
      options: {width:"750px"},
      afterClosed:()=>{}
    })
  }
}

