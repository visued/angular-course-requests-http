import { Component, OnInit } from "@angular/core";
import { UploadFileService } from "./upload-file.service";

@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.scss"]
})
export class UploadFileComponent implements OnInit {
  files: Set<File>;

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
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadService
        .upload(this.files, "http://localhost:8000/uploads")
        .subscribe(response => console.log("Upload concluido!"));
    }
  }
}
