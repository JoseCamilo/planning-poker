import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoButtonModule, PoContainerModule, PoFieldModule, PoHeaderModule, PoModalModule, PoPageModule, PoTableModule, PoTooltipModule, PoWidgetModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    PoPageModule,
    PoHeaderModule,
    PoContainerModule,
    PoWidgetModule,
    PoButtonModule,
    PoTableModule,
    PoModalModule,
    PoFieldModule,
    PoTooltipModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
