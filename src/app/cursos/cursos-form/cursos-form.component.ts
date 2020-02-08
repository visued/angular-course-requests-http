import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { CursosService } from "../cursos.service";
import { AlertModalService } from "src/app/shared/alert-modal/alert-modal.service";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";

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
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     const curso$ = this.service.loadById(id);
    //     curso$.subscribe(curso => {
    //       this.updateForm(curso);
    //     });
    //   }
    // );

    // this.route.params
    //   .pipe(
    //     map((params: any) => params["id"]),
    //     switchMap(id => this.service.loadById(id))
    //   )
    //   .subscribe(curso => this.updateForm(curso));

    const curso = this.route.snapshot.data["curso"];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [
        curso.nome,
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
      if (this.form.value.id) {
        this.service.update(this.form.value).subscribe(
          success => {
            this.alertService.showAlertSuccess(`Curso atualizado com sucesso!`);
            this.location.back();
          },
          error => {
            this.alertService.showAlertDanger(`Ops ocorreu um erro!`);
          }
        );
      } else {
        this.service.create(this.form.value).subscribe(
          success => {
            this.alertService.showAlertSuccess(`Curso criado com sucesso!`);
            this.location.back();
          },
          error => {
            this.alertService.showAlertDanger(`Ops ocorreu um erro!`);
          }
        );
      }
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  // updateForm(curso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }
}
