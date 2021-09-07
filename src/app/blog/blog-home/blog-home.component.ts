import { Component, OnInit } from '@angular/core';
import { NbSearchService } from '@nebular/theme';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';
import { app_config } from 'src/config';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['../layout/layout.component.css'],
})
export class BlogHomeComponent implements OnInit {
  blogsList;
  trendingBlogs;
  loadingBlogs = true;
  url = app_config.api_url + '/';
  constructor(
    private blogService: BlogService,
    public userService: UserService,
    private searchService: NbSearchService
  ) {}

  ngOnInit(): void {
    this.fetchBlogs();

    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.filterBlogs(data.term);
    });
  }

  fetchBlogs() {
    this.blogService.getAllBlogs().subscribe((res: Array<any>) => {
      this.blogsList = res.reverse();
      console.log(this.blogsList);
      this.loadingBlogs = false;
      this.getTrendingBlogs();
    });
  }

  filterBlogs(name = '', category = '', authorname = '') {
    // console.log(name);

    this.blogService.getAllBlogs().subscribe((res: Array<any>) => {
      this.blogsList = res.reverse();
      // console.log(this.blogsList);
      this.loadingBlogs = false;

      if (name) {
        this.blogsList = this.blogsList.filter((blog) =>
          blog.title.toLowerCase().includes(name.toLowerCase())
        );
      }

      if (category) {
      }

      if (authorname) {
      }

      // console.log(this.blogsList);
    });
  }

  getTrendingBlogs() {
    if (!this.loadingBlogs) {
      this.trendingBlogs = this.blogsList
        .sort((blog1, blog2) => {
          if (blog1.likes < blog2.likes) return -1;
          else if (blog1.likes > blog2.likes) return 1;
          else return 0;
        })
        .reverse();
    }
  }
}
