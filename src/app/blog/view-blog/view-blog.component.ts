import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';
import { app_config } from 'src/config';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['../layout/layout.component.css', './view-blog.component.css'],
})
export class ViewBlogComponent implements OnInit {
  blogData: any;
  url = app_config.api_url + '/';

  constructor(
    private blogService: BlogService,
    private act_route: ActivatedRoute,
    public userservice: UserService
  ) {}

  ngOnInit(): void {
    let blogId = this.act_route.snapshot.paramMap.get('id');
    this.fetchBlogData(blogId);
  }

  fetchBlogData(id) {
    this.blogService.getBlogDetails(id).subscribe((res) => {
      console.log(res);
      this.blogData = res;
    });
  }

  addLike() {
    console.log('like');
    if (this.alreadyLiked(this.blogData.data.liked_users)) {
      return;
    } else {
      this.blogData.data.liked_users.push(this.userservice.currentUser._id);
      this.blogData.likes += 1;
      console.log(this.blogData);
    }
  }

  alreadyLiked(liked_users) {
    return liked_users.includes(this.userservice.currentUser._id);
  }

  addComment(text) {
    let obj = {};
    obj['text'] = text;
    obj['user'] = this.userservice.currentUser._id;
    obj['created'] = new Date();
    this.blogData.comments.push(obj);
    this.blogService.addUserComment(this.blogData._id, obj);
  }
}
