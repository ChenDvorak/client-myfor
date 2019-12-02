import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './home/index/index.component';
import { LoginComponent } from './home/login/login.component';

const appRoutes: Routes = [
    { path: 'home', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: IndexComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '' }
  ];

@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes
      )
    ],
    exports: [
      RouterModule
    ]
})
export class AppRoutingModule {

}
