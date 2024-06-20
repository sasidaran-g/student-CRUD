import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from '../student/student.component';
import { TableComponent } from './table.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'student/:id', component: StudentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
