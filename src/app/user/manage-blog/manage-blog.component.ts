import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.css'],
})
export class ManageBlogComponent implements OnInit {
  currentUser: any;
  blogsList: any;
  loadingBlogs = true;

  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.fetchAuthorBlogs();
  }

  fetchAuthorBlogs() {
    this.blogService.getBlogsByAuthor(this.currentUser._id).subscribe((res) => {
      this.blogsList = res;
      this.loadingBlogs = false;
    });
  }

  deleteBlog(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(id).subscribe((res) => {
          console.log(res);
          Swal.fire({
            title: 'Deleted!',
            text: 'Your blog has been deleted.',
            icon: 'info',
          }).then(() => {
            this.fetchAuthorBlogs();
          });
        });
      }
    });
  }

  updateBlog(id) {
    this.blogService.update = true;
    this.router.navigate(['/user/updateblog', id]);
  }
}
