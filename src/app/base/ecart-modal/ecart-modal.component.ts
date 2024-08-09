import { Component, Input } from '@angular/core';
import { Ecart } from '../ecart';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-ecart-modal',
  templateUrl: './ecart-modal.component.html',
  styleUrls: ['./ecart-modal.component.css'],
   standalone : true,
   imports: [NgIf, NgFor, CommonModule]
})
export class EcartModalComponent {
  @Input() isOpen: boolean = false;
  @Input() ecart!: Ecart;

  closeModal() {
    this.isOpen = false;
  }
}