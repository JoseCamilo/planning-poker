import { Component, OnInit, ViewChild } from '@angular/core';
import { PoHeaderBrand, PoModalAction, PoModalComponent, PoTableColumn, PoTableLiterals } from '@po-ui/ng-components';

import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";

import { environment } from '../../src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  name: string = '';
  votes: any = [];
  database: any;
  showVotes: boolean = false;

  brand: PoHeaderBrand = {
    title: 'Planning Poker'
  };

  columns: PoTableColumn[] = [
    {
      label: 'Nome',
      property: 'name',
      width: '80%'
    },
    {
      label: 'Voto',
      property: 'vote',
      type: 'columnTemplate',
      width: '20%'
    },
  ];

  customLiterals: PoTableLiterals = {
    noData: 'Nenhum participante conectado'
  };

  confirmName: PoModalAction = {
    action: () => {
      this.confirmNameAction();
    },
    label: 'Confirmar'
  };

  @ViewChild('modalname') modalNameComponent!: PoModalComponent;
  constructor() {}

  ngOnInit() {
    const firebaseConfig = {
      apiKey: environment.apiKey,
      authDomain: environment.authDomain,
      projectId: environment.projectId,
      storageBucket: environment.storageBucket,
      messagingSenderId: environment.messagingSenderId,
      appId: environment.appId,
      measurementId: environment.measurementId,
      databaseURL: environment.databaseURL
    };
    const app = initializeApp(firebaseConfig);
    this.database = getDatabase(app);

    const starCountRef = ref(this.database, 'rooms/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      this.votes = data.votes || [];
      this.showVotes = data.showVotes || false;
    });

    setTimeout(() => {
      this.modalNameComponent.open();       
    }, 1000);
  }

  persistData() {
    set(ref(this.database, 'rooms/'), {votes: this.votes, showVotes: this.showVotes });
  }

  confirmNameAction() {
    if (this.name) {
      this.modalNameComponent.close();   
      this.vote('');
    }
  }

  vote(value: string) {
    if (this.votes == null) {
      this.votes = [];
    }

    const voteIndex = this.votes.findIndex((o: { name: string; }) => o.name === this.name);
    
    if (voteIndex > -1) {
      this.votes[voteIndex].vote = value;

    } else {
      this.votes.push({
        name: this.name,
        vote: value
      })
    }

    this.persistData();
  }

  resetVotes() {
    for (let i = 0; i < this.votes.length; i++) {
      this.votes[i].vote = '';
    }

    this.persistData();
  }

  resetParticipants() {
    this.votes = [];
    this.persistData();
  }
}
