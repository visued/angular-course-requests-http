import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { CursosService } from "../cursos.service";
import { Curso } from "../curso";
import { Observable, empty, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AlertModalComponent } from "src/app/shared/alert-modal/alert-modal.component";
import { AlertModalService } from "src/app/shared/alert-modal/alert-modal.service";

@Component({
  selector: "app-cursos-lista",
  templateUrl: "./cursos-lista.component.html",
  styleUrls: ["./cursos-lista.component.scss"],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
  //cursos: Curso[];
  deleteModalRef: BsModalRef;
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  @ViewChild("deleteModal", { static: true }) deleteModal;
  cursoSelecionado: Curso;

  constructor(
    private service: CursosService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    // this.service.list()
    // .subscribe(dados => this.cursos = dados);
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError(error => {
        console.log(error);
        //this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger(
      "Erro ao carregar cursos. Tente novamente mais tarde."
    );
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }

  onEdit(id) {
    this.router.navigate(["editar", id], { relativeTo: this.route });
  }

  onDelete(curso) {
    this.cursoSelecionado = curso;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: "modal-sm"
    });
  }

  onConfirmDelete(curso) {
    this.service.remove(this.cursoSelecionado.id).subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      error =>
        this.alertService.showAlertDanger(
          "Erro ao remover curso, tente novamente mais tarde!"
        )
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
