import { Component } from '@angular/core';
import { Router,UrlSegment,UrlTree,UrlSegmentGroup,PRIMARY_OUTLET } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router){

  }
  title = 'pet-shop-app';
  isUser() : boolean{
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    //To return true if path is empty - is welcome page
    if(!g)
      return true;

    const s: UrlSegment[] = g.segments;
    return s.length === 0 || s[0].path !== 'admin';
  }

  isAdmin() : boolean{
    return !this.isUser();
  }
}
