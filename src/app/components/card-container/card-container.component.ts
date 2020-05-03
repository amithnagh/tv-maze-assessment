import { Component, OnInit } from '@angular/core';
import { IShowDetails } from '../../models/showDetails.model';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.less']
})
export class CardContainerComponent {
  @Input() showsList: IShowDetails [];

  constructor(private router: Router) { }

  selectedShow = (num: number) => this.router.navigate([`/shows/${num}`]);  // navigates to the details page of selected show

}
