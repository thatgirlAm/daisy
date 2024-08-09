import { Component, Input, OnInit } from '@angular/core';
import { Ecart } from '../ecart';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-ecart-modal',
  templateUrl: './ecart-modal.component.html',
  styleUrls: ['./ecart-modal.component.css'],
  standalone: true,
  imports: [CommonModule, NgIf],
  providers: [Ecart]
})
export class EcartModalComponent implements OnInit {
  @Input() isOpen: boolean = false;
  ecart !:Ecart | null ; 
  constructor(ecart : Ecart) {
    this.ecart = new Ecart();
  }


  ngOnInit(): void {}

  openModal(): void {
    this.isOpen = true;
  }

  closeModal(): void {
    this.isOpen = false;
  }
}
