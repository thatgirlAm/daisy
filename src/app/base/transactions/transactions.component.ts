
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { Transaction } from '../transaction';
import { ToastrService } from 'ngx-toastr'; 
import { FormsModule } from '@angular/forms';
import { TransactionModalComponent } from '../transaction-modal/transaction-modal.component';


@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    LoaderComponent,
    FormsModule,
    CommonModule,
    NgIf,
    NgFor,
    TransactionModalComponent,
    RouterModule,  
],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],

  
})
export class TransactionsComponent implements OnInit {
  loaded: boolean = false; 
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  startDate: string = '';
  endDate: string = '';
  partenaires !: string[];
  archivedFilter: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  paginatedTransactions: Transaction[] = [];
  selectedTransaction!: Transaction | null;
  url: string = 'http://127.0.0.1:8000/api/';
  filtre : boolean = false ; 
  selectedPartenaire: string = '';


  @ViewChild(TransactionModalComponent) transactionModal!: TransactionModalComponent;

  constructor(
    public router: Router, 
    private http: HttpClient, 
    private api: ApiService, 
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.loaded = false;
    this.api.getData(this.url + 'transactions').subscribe({
      next: (res: any) => 
        {
        this.transactions = res.data; 
      },
      error: (err) => 
        {
        this.loaded = true;
        this.toastr.error(err);
      },
      complete: () => {
        this.loaded = true ; 
        this.filteredTransactions = this.transactions ; 
        this.getPartenaires(); 
      }
    });
  }

  
  get paginatedTransactionsFunct() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredTransactions.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
  }

  updatePaginatedTransactions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTransactions = this.filteredTransactions.slice(startIndex, endIndex);
    
  }

  closeTransactionModal() {
    this.selectedTransaction = null;
  }

  async openModal(transaction: Transaction) {
    this.selectedTransaction = await transaction;
    this.transactionModal.openModal();
  }


Filtre(){
    if(this.endDate=='' || this.startDate=='')
      {
        this.toastr.warning('Choissez une date de début et de fin', 'Filtre mal initialisé');
        return;
      }
      this.applyFilters(); 
  }
  getPartenaires() {
    const uniquePartenaires = new Set<string>();
    for (const ecart of this.transactions) {
      uniquePartenaires.add(ecart.partenaire);
      uniquePartenaires.add("TEST");
    }
    this.partenaires = Array.from(uniquePartenaires);
    
  }
  applyFilters() {
    let temptransactions = this.transactions;
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
  
      if (start <= end) {
        temptransactions = temptransactions.filter(transaction => {
          const createdAt = new Date(transaction.created_at);
          return createdAt >= start && createdAt <= end;
        });
      } else {
        console.error("Start date must be before end date.");
      }
    }

    if(this.selectedPartenaire) {
      temptransactions = temptransactions.filter(ecart => {
        if (!this.selectedPartenaire)
        {
          return ; 
        }
        return ecart.partenaire === this.selectedPartenaire;
      });
    }
    this.filteredTransactions = temptransactions;

  }

  reinitialiser()
  {
    if(this.startDate || this.endDate)
    {
      this.startDate = "";
      this.endDate = "";
      this.applyFilters();
    }
    if(this.selectedPartenaire)
    {
      this.selectedPartenaire = '';
      this.applyFilters();
    }
  }

}
