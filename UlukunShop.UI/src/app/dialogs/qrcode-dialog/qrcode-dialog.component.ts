import {Component, Inject, OnInit} from '@angular/core';
import {BaseDialog} from "../base/base-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "../../services/common/models/order.service";
import {DialogService} from "../../services/common/dialog.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CustomToastrService} from "../../services/ui/custom-toastr.service";
import {OrderDetailDialogState} from "../order-detail-dialog/order-detail-dialog.component";
import {QrcodeServiceService} from "../../services/common/qrcode-service.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {SpinnerType} from "../../base/base.component";

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.scss']
})
export class QrcodeDialogComponent  extends BaseDialog<QrcodeDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:string,
    private spinner: NgxSpinnerService,
    private qrCodeService:QrcodeServiceService,
    private domSanitizer: DomSanitizer) {
    super(dialogRef)
  }

  qrCodeSafeUrl:SafeUrl;
  async ngOnInit(): Promise<void> {
    this.spinner.show(SpinnerType.Triangle)
    const qrCodeBlob= await this.qrCodeService.generateQRCode(this.data);
    const url=URL.createObjectURL(qrCodeBlob);
    this.qrCodeSafeUrl=this.domSanitizer.bypassSecurityTrustUrl(url);
    this.spinner.hide(SpinnerType.Triangle)
  }

}
