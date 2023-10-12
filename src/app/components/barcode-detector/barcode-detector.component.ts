import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barcode-detector',
  templateUrl: './barcode-detector.component.html',
  styleUrls: ['./barcode-detector.component.scss']
})
export class BarcodeDetectorComponent implements OnInit {
  public isReaderAvailable: boolean = false;
  // public barcodeDetector: BarcodeDetector | null = null;
  constructor() { }

  ngOnInit(): void {
    this.checkReaderAvailablity()
  }

  checkReaderAvailablity(): void {
    if ('BarcodeDetector' in window) {
      this.isReaderAvailable = true;
    } else {
      this.isReaderAvailable = false;
      // this.barcodeDetector = new BarcodeDetector({
      //   formats: ["code_39", "codabar", "ean_13"],
      // });
    }
  }

}
