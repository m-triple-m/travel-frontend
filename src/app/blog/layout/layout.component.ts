import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { UserService } from 'src/app/services/user.service';
import { app_config } from 'src/config';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  url = app_config.api_url + '/';
  constructor(
    private sidebarservice: NbSidebarService,
    public userservice: UserService
  ) {}

  ngOnInit(): void {
    this.toggleSidebar();
  }

  toggleSidebar() {
    this.sidebarservice.collapse();
  }
}
