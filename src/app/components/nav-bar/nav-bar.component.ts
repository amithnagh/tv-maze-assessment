import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ShowsDataService } from '../../services/shows-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {
  searchText = '';
  constructor(private router: Router, private service: ShowsDataService) { }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(["/shows"]);
  }

  onEnterPress() {
    if (this.searchText && this.searchText.length > 2) {
      this.service.setSearchText(this.searchText);
      if (this.router.url !== "/shows") {
        this.goToHome();
      }
    } else {
      alert('Please enter minimum of three characters')
    }
  }
}
