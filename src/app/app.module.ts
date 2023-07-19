import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { TaskComponent } from './components/task/task.component';
import { FormsModule } from '@angular/forms';
import { SessionStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [AppComponent, ListComponent, TaskComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [SessionStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
