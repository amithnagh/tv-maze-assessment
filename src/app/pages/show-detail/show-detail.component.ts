import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowDetails } from '../../models/showDetails.model';
import { ShowsDataService } from '../../services/shows-data.service';
import { ShowTrackerError } from '../../models/showTrackerError.model';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.less']
})
export class ShowDetailComponent implements OnInit {

  showId: number;
  show: ShowDetails;
  networkError: boolean;
  constructor(private activatedRoute: ActivatedRoute, private detailService: ShowsDataService) { }

  ngOnInit() {
    this.networkError = false;
    this.activatedRoute.params.subscribe(
      (params) => this.showId = +params.id
    );

    this.detailService.showDetail(this.showId).subscribe(
      (data: ShowDetails) => {
        this.show = data;
      },
      (err: ShowTrackerError) => { this.networkError = true; }
    );
  }

}
