import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'upload-file' },
  { path: 'cursos', loadChildren: './cursos/cursos.module#CursosModule' },
  { path: 'rxjs-poc', loadChildren: './unsubscribe-rxjs/unsubscribe-rxjs.module#UnsubscribeRxjsModule' },
  { path: 'upload-file', loadChildren: './upload-file/upload-file.module#UploadFileModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
