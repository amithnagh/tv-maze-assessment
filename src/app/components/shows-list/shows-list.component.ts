import { Component, OnInit } from '@angular/core';
import { ShowsDataService } from '../../services/shows-data.service';
import { ShowDetails } from '../../models/showDetails.model';
import { ShowTrackerError } from '../../models/showTrackerError.model';
import { Router } from '@angular/router';
import { SearchShow } from '../../models/searchShows.model';

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
  searchShowList: SearchShow[];
  selectedGenre: string;
  showGenresDropdown: boolean;
  searchText: string;
  networkError: boolean;
  constructor(private showsService: ShowsDataService, private router: Router) { }

  ngOnInit() {
    this.networkError = false;
    this.selectedGenre = "Drama";
    this.showsService.getShows()
      .subscribe(
        (data: ShowDetails[]) => {
          this.showList = data;
          this.getDisplayList();
          this.genres = new Set();
          this.getGenres(this.showList);
        },
        (err: ShowTrackerError) => this.networkError = true
      );
    this.subscribeToSearch();
  }
  //function for fetching search results
  search(search: string) {
    this.showsService.searchShows(search).subscribe(
      (body: SearchShow[]) => {
        this.searchShowList = body
      },
      (err) => { this.networkError = true }
    );
  }
  subscribeToSearch() {
    this.showsService.getSearchText().subscribe(
      (text) => {
        if (text.length > 2) {
          this.searchText = text;
          this.search(this.searchText);
        } else {
          return;
        }
      }
    );
  }


  // function to get unique genres
  getGenres(list: ShowDetails[]) {
    for (let show in list) {
      for (let genre in list[show].genres) {
        this.genres.add(list[show].genres[genre]);
      }
    }
  }

  getDisplayList() {
    this.showGenresDropdown = false;
    this.topRatedList = this.showList.filter(
      (show) => {
        return show.rating.average > 8.5
      }
    );

    this.selectedGenreList = this.showList.filter(
      (show) => {
        return show.genres.toString().includes(this.selectedGenre);
      }
    );
  }

  selectedShow(number) {
    this.router.navigate([`/shows/${number}`]);
  }

  showGenres() {
    if (this.showGenresDropdown) {
      this.showGenresDropdown = false;
    } else {
      this.showGenresDropdown = true;
    }
  }
}
