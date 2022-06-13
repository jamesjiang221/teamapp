import { TemplateBindingParseResult } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  newMemberName = ''; // empty string
  members: string[] = []; // empty array of strings
  errorMessage = ''; // For handling empty input

  teamAmount = '';
  numberOfTeams = 0;
  teams: string[][] = []; // teams generated as 2D array

  // Store state here
  onInput(member: string) {
    // console.log("Input Event Fired");
    // console.log(memberName);
    this.newMemberName = member;
  }
  
  addMember() {
    // Add a new member to the state
    // console.log("Add Clicked");
    if (!this.newMemberName) {
      this.errorMessage = 'Please enter a name';
      return;
    }

    this.errorMessage = ''; // Clear error message if input exists
    this.members.push(this.newMemberName);
    console.log(this.members);

    this.newMemberName = ''; // reset the input field
  }

  onTeamAmountInput(teamAmount: string) {
    // console.log("Team Amount Input Event Fired");
    // console.log(teamAmount);
    this.numberOfTeams = parseInt(teamAmount);
    if (this.numberOfTeams < 2) {
      this.errorMessage = 'Please enter a valid team amount';
      this.numberOfTeams = 0;
      return;
    }

    this.errorMessage = ''; // Clear error message if input valid

    // console.log(this.numberOfTeams);
  }

  GenerateTeam() {
    console.log(`Number of Members Before Assign: ${this.members.length}`);
    console.log(`Members: ${this.members}`);

    if(this.members.length === 0) {
      this.errorMessage = 'Please enter some team members';
      return;
    } 

    if (!this.numberOfTeams) {
      this.errorMessage = 'Please enter a team amount';
      return;
    }

    if (this.members.length % this.numberOfTeams != 0) {
      this.errorMessage = 'The team amount is not divisible by the number of members';
      return;
    }

    console.log(`Number of Teams: ${this.numberOfTeams}`);

    // Generate a random team from number of teams input
    let team = [];
    let teamSize = this.members.length / this.numberOfTeams;
    // console.log(`Team Size: ${teamSize}`);

    for (let i = 0; i < this.numberOfTeams; i++) {
      let teamMembers: string[] = [];
      for (let j = 0; j < teamSize; j++) {
        let randomIndex = Math.floor(Math.random() * this.members.length);
        teamMembers.push(this.members[randomIndex]);
        this.members.splice(randomIndex, 1);
      }
      team.push(teamMembers);
      console.log(`Team Member: ${teamMembers}`);
    }

    
    console.log(`Team: ${team}`);
    // this.teamAmount = '';
    this.numberOfTeams = 0;
    this.teams = team;
    console.log(this.teams);
  }
}
