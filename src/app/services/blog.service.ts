import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { app_config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  update = false;
  url = app_config.api_url + '/blog';
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  addBlog(data: any) {
    return this.http.post(this.url + '/add', data);
  }

  getBlogDetails(id) {
    return this.http.get(this.url + '/getbyid/' + id);
  }

  getBlogsByAuthor(id) {
    return this.http.get(this.url + '/getbyauthor/' + id);
  }

  getBlogById(id) {
    return this.http.get(this.url + '/getbyid/' + id);
  }

  deleteBlog(id) {
    return this.http.delete(this.url + '/delete/' + id);
  }

  addUserComment(id, obj) {
    let com_form = this.fb.group(obj);
    this.http
      .post(app_config.api_url + '/comment/add', com_form.value)
      .subscribe((data) => {
        this.http
          .put(this.url + '/updatecomment/' + id, { comments: data['_id'] })
          .subscribe((res) => {
            console.log(res);
          });
      });
  }

  uploadImage(file: any) {
    return this.http.post(app_config.api_url + '/util/addimg', file);
  }

  getAllBlogs() {
    return this.http.get(this.url + '/getall');
  }
}
