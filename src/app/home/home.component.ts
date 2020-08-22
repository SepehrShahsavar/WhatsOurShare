import { Component, OnInit } from '@angular/core';
import {Participant} from '../models/participant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listOfParticipants: Participant[] = [];
  shareTable: number[][] = [];
  name: string;
  cost: number;
  displayResult = false ;
  constructor() { }

  ngOnInit(): void {
  }

  canCalculate() {
    return this.listOfParticipants.length <= 2;
  }

  addToList() {
      const participant: Participant = { name: this.name , cost: this.cost , costPerPerson: 0 , shouldPay: 0};
      this.listOfParticipants.push(participant);
      this.name = "";
      this.cost = null;
      this.displayResult = false;
  }

  resetList() {
      this.listOfParticipants = [];
      this.shareTable = [];
      this.displayResult = false;
  }

  calculateShares() {
   for (const person of this.listOfParticipants) {
     person.costPerPerson = person.cost / this.listOfParticipants.length;
   }

   for (let i = 0 ; i < this.listOfParticipants.length ; i++) {
     this.shareTable[i] = [];
     for (let j = 0 ; j < this.listOfParticipants.length ; j++) {
       if ( i == j  || this.listOfParticipants[i].costPerPerson > this.listOfParticipants[j].costPerPerson) {
         this.shareTable[i][j] = 0;
       }

       if ( this.listOfParticipants[i].costPerPerson <= this.listOfParticipants[j].costPerPerson) {
         this.shareTable[i][j] = this.listOfParticipants[j].costPerPerson - this.listOfParticipants[i].costPerPerson;
       }
     }
   }

   console.log(this.shareTable);
   this.displayResult = true;

  }
}
