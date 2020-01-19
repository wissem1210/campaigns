import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { NavData, navItems } from './_nav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  private _opened: boolean = true;
  public nav: NavData[] = []

  public user$: Observable<any>

  constructor(private auth: AuthService, private profileService: ProfileService) {
    this.nav = navItems
  }

  ngOnInit() {
    this.user$ = this.profileService.GetProfile()
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }



}
