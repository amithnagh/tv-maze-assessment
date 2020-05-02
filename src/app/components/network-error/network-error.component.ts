import { Component, OnInit, Input } from '@angular/core';
import { ShowTrackerError } from '../../models/showTrackerError.model';

@Component({
  selector: 'app-network-error',
  templateUrl: './network-error.component.html',
  styleUrls: ['./network-error.component.less']
})
export class NetworkErrorComponent {
  @Input() errorObj: ShowTrackerError;

}
