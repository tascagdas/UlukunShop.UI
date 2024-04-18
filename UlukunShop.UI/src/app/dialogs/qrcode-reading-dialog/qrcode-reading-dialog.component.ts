import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseDialog} from "../base/base-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";
import {QrcodeService} from "../../services/common/qrcode.service";
import {DomSanitizer} from "@angular/platform-browser";
import {NgxScannerQrcodeComponent} from "ngx-scanner-qrcode";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../services/ui/custom-toastr.service";
import {ProductService} from "../../services/common/models/product.service";
import {SpinnerType} from "../../base/base.component";

declare var $: any;

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.scss']
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent> implements OnInit, OnDestroy {

  constructor(
    dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
    private qrCodeService: QrcodeService,
    private domSanitizer: DomSanitizer,
    private customToastr: CustomToastrService,
    private productService: ProductService,) {
    super(dialogRef)
  }


  @ViewChild("scanner", {static: true}) scanner: NgxScannerQrcodeComponent;
  @ViewChild("txtStock", {static: true}) txtStock: ElementRef;

  ngOnInit(): void {
    this.scanner.start();
  }

  ngOnDestroy(): void {
    this.scanner.stop();
  }


  onEvent(e) {
    this.spinner.show(SpinnerType.Pacman)
    const data: any = e[0].value;
    if (data != null && data != "") {

      const jsonData = JSON.parse(data);
      const stockValue = (this.txtStock.nativeElement as HTMLInputElement).value;
      this.productService.changeStockWithQRCode(jsonData.Id, parseInt(stockValue),()=>{

        $("#dialog-close-button").click();
        this.customToastr.message(`${jsonData.name}urunun stok bilgisi ${stockValue} olarak guncellenmistir.`,`stok basariyla guncellendi.`,{
          position:ToastrPosition.TopRight,
          messageType:ToastrMessageType.Success
        });

        this.spinner.hide(SpinnerType.Pacman)


      });

    }
  }
}
