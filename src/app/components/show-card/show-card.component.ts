import { Component, OnInit } from '@angular/core';
import { ShowDetails } from '../../models/showDetails.model';
import { Input } from '@angular/core';

import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.less']
})
export class ShowCardComponent {

  @Input() show: ShowDetails;
  @Output() selectedShow = new EventEmitter<number>();

  onClick = (): void => this.selectedShow.emit(this.show.id);
}
