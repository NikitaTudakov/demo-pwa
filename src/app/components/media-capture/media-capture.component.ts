import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-media-capture',
    templateUrl: './media-capture.component.html',
    styleUrls: ['./media-capture.component.scss']
})
export class MediaCaptureComponent implements OnInit {
    public isCameraOn: boolean = false;
    public isRecording: boolean = false;
    public onPaused: boolean = false;
    public savedFile: Blob | null = null;
    public isFileExist: boolean = false;
    private mediaRecorder: MediaRecorder;
    private recordedChunks: Blob[] = [];
    @ViewChild('videoElement') videoElement: ElementRef;
    
    constructor() { }

    ngOnInit(): void {
    }

    async startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true,audio: true });
            const video = this.videoElement.nativeElement as HTMLVideoElement;
            this.isCameraOn = true;
            video!.srcObject = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }

    public stopCamera(): void {
        const video = document.querySelector('video');
        const stream = video!.srcObject as MediaStream;
        const tracks = stream.getTracks();
        this.isCameraOn = false;
        tracks.forEach(track => track.stop());
        video!.srcObject = null;
    }

    startRecording() {
        if(this.onPaused) {
            this.mediaRecorder.resume();
            this.onPaused = false;
            this.isRecording = true;
        } else {
            this.savedFile = null;
            this.recordedChunks = [];
            this.isFileExist = false;
            const stream = this.videoElement.nativeElement.srcObject as MediaStream;
            this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
            this.isRecording = true;
            this.mediaRecorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                this.recordedChunks.push(event.data);
              }
            };
          
            this.mediaRecorder.onstop = () => {
               this.savedFile = new Blob(this.recordedChunks, { type: 'video/webm' });
            };
          
            this.mediaRecorder.start();
        }

    }

    stopRecording() {
        this.mediaRecorder.stop();
        this.isRecording = false;
        this.onPaused = false;
        this.isFileExist = true;
    }

    pauseRecording() {
        this.onPaused = true;
        this.mediaRecorder.pause();
        this.isRecording = false;
    }

    saveVideo() {
        if(this.savedFile) {
            const url = window.URL.createObjectURL(this.savedFile);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'recorded-video.webm';
            a.click();
        }
    }

}
