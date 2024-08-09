import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent implements OnInit {

  menuIsOpened : boolean = false;
  
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2)
  {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Code that uses the document object
      this.renderer.setStyle(document.body, 'backgroundColor', 'blue');
    }
  }

  redirectTransactions()
  {
    this.router.navigate(['transactions']);
    this.hideMenu();
  }
  redirectEcarts()
  {
    this.router.navigate(['ecarts']);
    this.hideMenu();
  }
  redirectCompte()
  {
    this.router.navigate(['compte']);
    this.hideMenu();
  }

  toggleMenu()
  {
    this.menuIsOpened = !this.menuIsOpened;
  }

hideMenu()
  {
    this.menuIsOpened = false;
  }
  logout(){
    this.router.navigate(['login']);  
    localStorage.clear();
  }

 
  
}
