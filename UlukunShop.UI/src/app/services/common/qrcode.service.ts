import { Injectable } from '@angular/core';
import {HttpClientService} from "./http-client.service";
import {firstValueFrom, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor(private _httpClientService:HttpClientService) { }

  async generateQRCode(productId:string) {
    const observable:Observable<Blob>=this._httpClientService.get({
      controller:"products",
      action:"qrcode",
      responseType:'blob'
    },productId)

    return await firstValueFrom(observable);
  }
}
