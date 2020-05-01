import { Component, OnInit } from '@angular/core';
import { ShowsDataService } from '../../services/shows-data.service';
import { ShowDetails } from '../../models/showDetails.model';
import { ShowTrackerError } from '../../models/showTrackerError.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.less']
})
export class ShowsListComponent implements OnInit {

  showList: ShowDetails[];
  genres: Set<string>;
  displayList: ShowDetails[];
  topRatedList: ShowDetails[];
  selectedGenreList: ShowDetails[];
  selectedGenre: string;

  constructor(private showsService: ShowsDataService, private router: Router) { }

  ngOnInit() {
    this.selectedGenre = "Drama";
    this.showsService.getShows()
      .subscribe(
        (data: ShowDetails[]) => {
          this.showList = data;
          this.getDisplayList();
          // this.genres = new Set();
          // this.getGenres(this.showList);
        },
        (err: ShowTrackerError) => console.log(err.friendlyMessage),
        () => console.log(' Getting shows done ')
      );
  }
  //function for fetching search results
  search() {
    this.showsService.searchShows().subscribe(
      body => console.log(body)
    );
  }

  // function to get unique genres
  getGenres(list: ShowDetails[]) {
    for (let show in list) {
      for (let genre in list[show].genres) {
        console.log(list[show].genres[genre]);
        this.genres.add(list[show].genres[genre]);
      }
    }
    console.log(this.genres);
  }

  getDisplayList() {
    this.topRatedList = this.showList.filter(
      (show) => {
        return show.rating.average > 8.5
      }
    );

    this.selectedGenreList = this.showList.filter(
      (show) => {
        return show.genres.includes(this.selectedGenre);
      }
    );
  }

  selectedShow(number) {
    this.router.navigate([`/shows/${number}`]);
  }
}
