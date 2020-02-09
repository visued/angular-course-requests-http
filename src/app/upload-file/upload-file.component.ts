import { Component, OnInit } from "@angular/core";
import { UploadFileService } from "./upload-file.service";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { Observable } from "rxjs";
import { filterResponse, uploadProgress } from "../shared/rxjs-operators";

@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.scss"]
})
export class UploadFileComponent implements OnInit {
  files: Set<File>;
  progress = 0;

  constructor(private uploadService: UploadFileService) {}

  ngOnInit() {}
  onChange(event) {
    const selectedFiles = <FileList>event.srcElement.files;
    this.files = new Set();
    const fileNames = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById("customFileLabel").innerHTML = fileNames.join(", ");
    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadService
        .upload(this.files, "/api/uploads")
        .pipe(
          uploadProgress(progress => {
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => console.log("Upload concluido!"));
        // .subscribe((event: HttpEvent<Object>) => {
        //   console.log(event);
        //   if (event.type === HttpEventType.Response) {
        //     console.log("Upload concluido!");
        //   } else if (event.type === HttpEventType.UploadProgress) {
        //     const percentDone = Math.round((event.loaded * 100) / event.total);
        //     this.progress = percentDone;
        //     console.log(`Progresso: ${percentDone}`);
        //   }
        // });
    }
  }
}
