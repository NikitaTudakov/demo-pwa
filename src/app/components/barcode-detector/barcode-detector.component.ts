import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@Component({
    selector: 'app-barcode-detector',
    templateUrl: './barcode-detector.component.html',
    styleUrls: ['./barcode-detector.component.scss']
})
export class BarcodeDetectorComponent implements AfterViewInit {
    public isReaderAvailable: boolean = false;
    public barcodeValue: string = '';
    public allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];
    @ViewChild(BarcodeScannerLivestreamComponent)
    barcodeScanner: BarcodeScannerLivestreamComponent;
    constructor() { }


    ngAfterViewInit(): void {
        this.barcodeScanner.start();
    }

    onValueChanges(result: any) {
        this.barcodeValue = result.codeResult.code;
    }

    onStarted(started: any) {
        console.log(started);
    }

}
