import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@Component({
    selector: 'app-barcode-detector',
    templateUrl: './barcode-detector.component.html',
    styleUrls: ['./barcode-detector.component.scss']
})
export class BarcodeDetectorComponent implements AfterViewInit {
    public isReaderAvailable: boolean = false;
    public barcodeValue: string = '';

    @ViewChild(BarcodeScannerLivestreamComponent)
    barcodeScanner: BarcodeScannerLivestreamComponent;
    constructor() { }


    ngAfterViewInit(): void {
        this.barcodeScanner.start();
        console.log(this.barcodeScanner)
    }

    onValueChanges(result: any) {
        this.barcodeValue = result.codeResult.code;
    }

    onStarted(started: any) {
        console.log(started);
    }

}
