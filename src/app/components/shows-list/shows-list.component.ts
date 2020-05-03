import { Component, OnInit } from '@angular/core';
import { ShowsDataService } from '../../services/shows-data.service';
import { IShowDetails } from '../../models/showDetails.model';
import { ShowTrackerError } from '../../models/showTrackerError.model';
import { ISearchShow } from '../../models/searchShows.model';
import { from } from 'rxjs';
import { pluck } from 'rxjs/internal/operators/pluck';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.less']
})
export class ShowsListComponent implements OnInit {

  searchShowListLength: number;
  showList: IShowDetails[];
  genres: Set<string> = new Set();
  displayList: IShowDetails[];
  topRatedList: IShowDetails[];
  selectedGenreList: IShowDetails[];
  searchShowList: ISearchShow[];
  searchShowDetails: IShowDetails [];
  selectedGenre: string;
  showGenresDropdown: boolean;
  searchText: string;
  networkError: boolean;
  error: ShowTrackerError;
  topRating: number;
  constructor(private showsService: ShowsDataService) { }

  ngOnInit() {
    this.networkError = false;
    this.selectedGenre = 'Drama';
    this.showsService.getShows()
      .subscribe(
        (data: IShowDetails[]) => {
          this.showList = data;
          this.getDisplayList();
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
      (body: ISearchShow[]) => {
        this.searchShowList = body;
        this.searchShowListLength = body.length;
        this.searchShowDetails = [];
        // code for getting show details from searchShow list
        if ( this.searchShowListLength > 0 ) {
          from(this.searchShowList).pipe(pluck('show')).subscribe(
            (show: IShowDetails) => {
              this.searchShowDetails.push(show);
             }
          );
        }
      },
      (err) => {
        this.error = err;
        this.networkError = true; }
    );
  }
  // code for subscribing to changes in the search box content
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

  // code for listing out unique genres from the shows list
  getGenres(list: IShowDetails[]) {
    for (const show of list) {
      for (const genre of show.genres) {
        this.genres.add(genre);
      }
    }
  }

  // code for setting the display to the dashboard page with top rated shows and genre based shows
  getDisplayList() {
    this.topRating = 8.5;
    this.showGenresDropdown = false;
    this.topRatedList = this.showList.filter(
      (show) => {
        return show.rating.average > this.topRating;
      }
    );

    this.selectedGenreList = this.showList.filter(
      (show) => {
        return show.genres.toString().includes(this.selectedGenre);
      }
    );
  }

  // code to toggle the view of genres dropdown
  showGenres = () => this.showGenresDropdown = !this.showGenresDropdown;

  // code to execute when clear button on search list is clicked
  clearSearch = () => {
    this.showsService.setSearchText('');
    this.searchShowDetails = [];
   }
}
