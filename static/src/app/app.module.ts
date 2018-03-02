import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatGridListModule } from '@angular/material';
import { RegisterDialog } from './dialogs/register-dialog';
import { LoginDialog } from './dialogs/login-dialog';
import { DataService } from './_services/DataService'
import { UserService } from './_services/user.service';
import { PostsService } from './_services/posts.service'

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PostComponent } from './post/post';
import { ViewPostComponent } from './viewPost/viewPost.component';

const routes: Routes = [
  { path: '', component: LandingComponent, data: { animation: '' } },
  { path: '*', component: LandingComponent, data: { animation: '*' } },
  { path: 'post', component: PostComponent, data: { animation: 'post' } },
  { path: 'view-post:id', component: ViewPostComponent, data: { animation: 'post' } }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterDialog,
    LoginDialog,
    LandingComponent,
    PostComponent,
    ViewPostComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpModule,
    MatCardModule,
    RouterModule.forRoot(routes),
    MatGridListModule
  ],
  providers: [
    DataService,
    UserService,
    PostsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RegisterDialog,
    LoginDialog ]
})
export class AppModule {
}
