import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { CommonModule, NgIf } from '@angular/common';
import { ErrorCodeService } from '../error-code-service.service';

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.css'],
  standalone:true, 
  imports: [CommonModule, NgIf]
})
export class TransactionModalComponent implements OnInit {
  @Input() transaction!: Transaction;
  @Input() isOpen: boolean = false;
  errorCodes: any = {};
  constructor(private errorCodeService: ErrorCodeService){

  }
  ngOnInit(): void {
    this.errorCodeService.getErrorCodes().subscribe(data => {
      this.errorCodes = data;
    });
  }

  openModal(): void {
    this.isOpen = true;
  }

  closeModal(): void {
    this.isOpen = false;
    
  }
  getErrorDescription(code : number): string {
    return this.errorCodes[code] || 'Code erreur inconnu';
  }
}
