import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
import { RegisterDialog } from './dialogs/register-dialog';
import { LoginDialog } from './dialogs/login-dialog';
import { DataService } from './_services/DataService'
import { UserService } from './_services/user.service';
import { PostsService } from './_services/posts.service'

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterDialog,
    LoginDialog
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
    MatCardModule
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
