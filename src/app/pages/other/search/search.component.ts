import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  key: string; // 搜索关键词

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams.key) {
      this.key = this.activatedRoute.snapshot.queryParams.key;
    }
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
}
