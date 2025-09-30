import { Component } from '@angular/core';
import { PoHeaderBrand, PoTableColumn } from '@po-ui/ng-components';

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
  showVotes: boolean = false;

  columns: PoTableColumn[] = [
    {
      label: 'Nome',
      property: 'name'
    },
    {
      label: 'Voto',
      property: 'vote',
      type: 'columnTemplate'
    },
  ];

  votes: any = [
    { name: 'Ze', vote: '3' },
    { name: 'Ze', vote: '' },
    { name: 'Ze', vote: '3' },
    { name: 'Ze', vote: '' },
    { name: 'Ze', vote: '3' }
  ];


}
