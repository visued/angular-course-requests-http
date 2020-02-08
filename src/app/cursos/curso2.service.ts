import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { Curso } from './curso';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Curso2Service extends CrudService<Curso> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}cursos`);
  }
}
