import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Section{
    name: string;
    link: string;
    enabled: boolean;
}

const HOME_IDX = 0;
const PRODUCTS_IDX = 1;
const LOGIN_IDX = 4;
const LOGOUT_IDX = 5;
const MANAGE_IDX = 6;

const SECTIONS: Section[] =[
  {
    name: 'Home',
    link: '/',
    enabled: true
  },
  {
    name: 'Products',
    link: '/pets',
    enabled: true
  },
  {
    name: 'About us',
    link: '/',
    enabled: false
  },
  {
    name: 'Contact',
    link: '/',
    enabled: false
  },
  {
    name: 'Login',
    link: '/login',
    enabled: true
  },
  {
    name: 'Logout',
    link: '/',
    enabled: true
  },
  {
    name: 'Manage Webshop',
    link: '/admin',
    enabled: true
  }
];


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  homeSection: Section;
  loginSection: Section;
  logoutSection: Section;
  manageSection: Section;
  selectedSection: Section;
  sections: Section[];

  constructor(private authService: AuthService,private router: Router) {    
  }

  ngOnInit() {
    //Setup sections
    this.sections = Array.from(SECTIONS);
    this.homeSection = this.sections[HOME_IDX];
    this.loginSection = this.sections[LOGIN_IDX]; 
    this.logoutSection = this.sections[LOGOUT_IDX];
    this.manageSection = this.sections[MANAGE_IDX];

    //Setup selected section
    this.router.events
    .pipe(
      filter(e => e instanceof NavigationEnd)
    )
    .subscribe( (navEnd:NavigationEnd) => {
      for (let index = 0; index < this.sections.length; index++) {
        const element = this.sections[index];
        if(element.link === navEnd.urlAfterRedirects){
          this.selectedSection = element;
          break;
        }
      }
    });
  }

  onSelect(section: Section){
    this.selectedSection = section;
    if(section === this.logoutSection)
      this.logout();
  }

  shouldShowSection(section: Section): boolean{
    if(section === this.loginSection){
      return !this.isLoggedIn();
    }
    if(section === this.logoutSection){
      return this.isLoggedIn();
    }
    if(section === this.manageSection){
      return this.isAdmin();
    }
    else
      return true;
  }

  isLoggedIn() : boolean{
    return this.authService.getToken() !== null;
  }

  isAdmin(): boolean{
    return this.authService.isUserAdmin();
  }

  logout(){
    this.authService.logout();
  }
}
