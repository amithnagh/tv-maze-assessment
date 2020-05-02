import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  error: ShowTrackerError;
  constructor(private activatedRoute: ActivatedRoute,
              private detailService: ShowsDataService,
              private router: Router
            ) { }

  ngOnInit() {
    this.networkError = false;
    this.activatedRoute.params.subscribe(
      (params) => this.showId = +params.id
    );

    if (isNaN(this.showId)) {
      this.router.navigate(['/page-not-found']);
    } else {
      this.fetchDetails();
    }

  }

  fetchDetails(): void {
    this.detailService.showDetail(this.showId).subscribe(
      (data: ShowDetails) => {
        this.show = data;
      },
      (err: ShowTrackerError) => {
        this.error = err;
        this.networkError = true;
       }
    );
  }

}
