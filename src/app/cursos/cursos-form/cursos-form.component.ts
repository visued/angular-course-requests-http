import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from '@angular/common';
import { CursosService } from "../cursos.service";
import { AlertModalService } from "src/app/shared/alert-modal/alert-modal.service";

@Component({
  selector: "app-cursos-form",
  templateUrl: "./cursos-form.component.html",
  styleUrls: ["./cursos-form.component.scss"]
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private alertService: AlertModalService,
    private location: Location
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)
        ]
      ]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(
        success => {
          this.alertService.showAlertSuccess(
            `Curso criado com sucesso!`
          );
          this.location.back();
        },
        error => {
          this.alertService.showAlertDanger(
            `Ops ocorreu um erro!`
          );
        }
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }
}
