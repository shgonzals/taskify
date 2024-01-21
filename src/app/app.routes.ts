import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { TestComponent } from './components/test/test.component';
import { TableComponent } from './components/table/table.component';

export const routes: Routes = [
 {
    path: 'list',
    component: ListComponent
  },{
    path: 'test',
    component: TestComponent
  },{
    path: 'table',
    component: TableComponent
  }
];
