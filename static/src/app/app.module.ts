import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RegisterDialog } from './dialogs/register-dialog';
import { LoginDialog } from './dialogs/login-dialog';

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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    RegisterDialog,
    LoginDialog ]
})
export class AppModule {
}
