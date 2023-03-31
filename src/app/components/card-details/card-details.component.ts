import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Post {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}


@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  thumbnailUrl = '';
  title = '';



  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    //private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      const url = `https://jsonplaceholder.typicode.com/photos/${id}`;
      this.http.get<Post>(url).subscribe((response) => {
        this.thumbnailUrl = response.thumbnailUrl;
        this.title = response.title;
      });
    });
  }


}

