import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ShowsDataService } from '../../services/shows-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent {
  searchText = '';
  constructor(private router: Router, private service: ShowsDataService) { }

  goToHome = (): Promise<boolean> => this.router.navigate(['']);

  // Calls after entering the search text of length >2 and hit enter or click search icon
  onEnterPress(): void {
    if (this.searchText && this.searchText.length > 2) {
      this.service.setSearchText(this.searchText);
      // if current url is details page navigate to home page to show the search results
      if (this.router.url !== '/shows') {
        this.goToHome();
      }
    } else {
      alert('Please enter minimum of three characters');
    }
  }
}
