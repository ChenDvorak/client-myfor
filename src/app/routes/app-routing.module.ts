import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './home/index/index.component';
import { LoginComponent } from './home/login/login.component';

const appRoutes: Routes = [
    { path: 'home', redirectTo: '' },
    { path: 'login', component: LoginComponent },
    {
      path: 'posts',
      loadChildren: () => import('./posts/posts.module').then(mod => mod.PostsModule)
    },
    {
      path: 'segments',
      loadChildren: () => import('./segments/segments.module').then(mod => mod.SegmentsModule)
    },
    {
      path: 'themes',
      loadChildren: () => import('./themes/themes.module').then(mod => mod.ThemesModule)
    },
    {
      path: 'pages',
      loadChildren: () => import('./pages/pages.module').then(mod => mod.PagesModule)
    },
    { path: '', component: IndexComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '/pages/404' }
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
