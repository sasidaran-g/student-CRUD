import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'firstpage',
    loadChildren: () =>
      import('./firstpage/firstpage.module').then((m) => m.FirstpageModule),
  },
  { path: '', redirectTo: 'firstpage', pathMatch: 'full' },
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
  },
  { path: 'firstpage/student', redirectTo: 'student', pathMatch: 'full' },
  {
    path: 'table',
    loadChildren: () =>
      import('./table/table.module').then((m) => m.TableModule),
  },
  { path: 'firstpage/table', redirectTo: 'table', pathMatch: 'full' },
  {
    path: 'student/:id',
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
  },
  { path: 'student/id', redirectTo: 'student/id', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
