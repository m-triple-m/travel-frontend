import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as SimpleMDE from 'simplemde';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent implements OnInit {
  simplemde: any;
  blogForm: any;
  currentUser: any;
  markdown: any;
  blogImage: any;
  erroMsg: any;
  imgURL: any;
  formReady = false;
  tagslist = ['tag a', 'tag b', 'tag c'];

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private userService: UserService,
    private router: Router,
    private activated: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.simplemde = new SimpleMDE({ element: document.getElementById('md') });

    if (this.blogService.update) {
      let blogId = this.activated.snapshot.paramMap.get('id');
      this.blogService.getBlogById(blogId).subscribe((blogData) => {
        console.log(blogData);
        this.initBlogForm(blogData);
        this.markdown = blogData['data'].body;
      });
    } else {
      this.initBlogForm();
    }
  }

  initBlogForm(data = null) {
    if (data) {
      this.blogForm = data;
    } else {
      this.blogForm = this.fb.group({
        title: '',
        desc: '',
        author: this.currentUser._id,
        created: new Date(),
        data: {},
        likes: 0,
        comments: [],
        tags: null,
      });
    }

    this.formReady = true;
  }

  uploadImage(event) {
    let files = event.target.files;
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      Swal.fire('Images Only');
      return;
    }
    this.preview(event.target.files);
    let formData = new FormData();
    this.blogImage = files[0].name;
    formData.append('image', files[0], files[0].name);
    this.blogService.uploadImage(formData).subscribe((response) => {
      console.log(response);
    });
  }

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.erroMsg = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  getMD(e) {
    console.log(e.target.value);
  }

  submit() {
    console.log(this.simplemde.value());
    let formdata = this.blogForm.value;
    formdata['thumb'] = this.blogImage;
    let data = {};
    data['body'] = this.simplemde.value();
    data['liked_users'] = [this.currentUser._id];
    formdata.likes = 1;
    formdata.data = data;
    this.blogService.addBlog(formdata).subscribe((blogData) => {
      console.log(blogData);
      Swal.fire({
        title: 'Awesome',
        text: 'Your Blog has been Successfully Published',
        icon: 'success',
      }).then(() => {
        this.router.navigate(['/blog/view', blogData['_id']]);
      });
    });
  }
}
