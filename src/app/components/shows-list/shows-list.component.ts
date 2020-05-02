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

  searchShowListLength: number;
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
  error: ShowTrackerError;
  constructor(private showsService: ShowsDataService, private router: Router) { }

  ngOnInit() {
    this.networkError = false;
    this.selectedGenre = 'Drama';
    this.showsService.getShows()
      .subscribe(
        (data: ShowDetails[]) => {
          this.showList = data;
          this.getDisplayList();
          this.genres = new Set();
          this.getGenres(this.showList);
        },
        (err: ShowTrackerError) => {
          this.error = err;
          this.networkError = true;
        }
      );
    this.subscribeToSearch();
  }
  // function for fetching search results
  search(search: string): void {
    this.showsService.searchShows(search).subscribe(
      (body: SearchShow[]) => {
        this.searchShowList = body;
        this.searchShowListLength = body.length;
      },
      (err) => {
        this.error = err;
        this.networkError = true; }
    );
  }
  subscribeToSearch() {
    this.showsService.getSearchText().subscribe(
      (text: string) => {
        if (text.length) {
          this.searchText = text;
          this.search(this.searchText);
        } else {
          this.searchText = '';
          this.searchShowList = [];
        }
      }
    );
  }

  getGenres(list: ShowDetails[]) {
    for (const show of list) {
      for (const genre of show.genres) {
        this.genres.add(genre);
      }
    }
  }

  getDisplayList() {
    this.showGenresDropdown = false;
    this.topRatedList = this.showList.filter(
      (show) => {
        return show.rating.average > 8.5;
      }
    );

    this.selectedGenreList = this.showList.filter(
      (show) => {
        return show.genres.toString().includes(this.selectedGenre);
      }
    );
  }

  selectedShow = (num: number) => this.router.navigate([`/shows/${num}`]);

  showGenres = () => this.showGenresDropdown = !this.showGenresDropdown;

  clearSearch = () => this.showsService.setSearchText('');
}
