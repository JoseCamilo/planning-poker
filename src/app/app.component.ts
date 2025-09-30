import { Component } from '@angular/core';
import { PoHeaderBrand } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  brand: PoHeaderBrand = {
    title: 'Planning Poker'
  };
}
