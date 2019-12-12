import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { NzGridModule } from 'ng-zorro-antd/grid';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

import { ShareModule } from '../share/share.module';
import { httpInterceptorProviders } from '../interceptors/barrel';

import { IndexComponent } from './home/index/index.component';
import { LoginComponent } from './home/login/login.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgZorroAntdModule,
    // FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    NzGridModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory
      }
    }),
    ShareModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
    // return `<div>${text}</div>`;
  };

  return {
    renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  };
}

