import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IShowDetails } from '../../models/showDetails.model';
import { ShowsDataService } from '../../services/shows-data.service';
import { ShowTrackerError } from '../../models/showTrackerError.model';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.less']
})
export class ShowDetailComponent implements OnInit {

  showId: number;
  show: IShowDetails;
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

    // check if the url contains a number else route to page not found
    if (isNaN(this.showId)) {
      this.router.navigate(['/page-not-found']);
    } else {
      this.fetchDetails();
    }

  }

  // code for fetching the details from api
  fetchDetails(): void {
    this.detailService.showDetail(this.showId).subscribe(
      (data: IShowDetails) => {
        this.show = data;
      },
      (err: ShowTrackerError) => {
        this.error = err;
        this.networkError = true;
       }
    );
  }

}
