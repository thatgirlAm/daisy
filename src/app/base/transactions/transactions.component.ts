
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { Transaction } from '../transaction';
import { ToastrService } from 'ngx-toastr'; 
import { FormsModule } from '@angular/forms';
// import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
// import { MatTableModule } from '@angular/material/table';
import { TransactionModalComponent } from '../transaction-modal/transaction-modal.component';
import { DateRange, IGX_DATE_RANGE_PICKER_DIRECTIVES } from 'igniteui-angular';
import {ChangeDetectionStrategy} from '@angular/core';
// import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { log } from 'node:console';
import { DateRangePickerOverviewExample } from "../../date-range-picker/date-range-picker.component";
import { routes } from '../../app.routes';


@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    // MatTableModule,
    LoaderComponent,
    FormsModule,
    CommonModule,
    NgIf,
    NgFor,
    //MatPaginatorModule,
    TransactionModalComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    DateRangePickerOverviewExample,
    RouterModule,
    
],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  providers: [
    provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class TransactionsComponent implements OnInit {
  loaded: boolean = false; 
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  startDate: string = '';
  archivedFilter: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  paginatedTransactions: Transaction[] = [];
  selectedTransaction!: Transaction | null;
  url: string = 'http://127.0.0.1:8000/api/';
  public range: DateRange = { start: '', end: '' };
  filtre : boolean = false ; 
  partners: string[] = [];
  selectedPartner: string = '';

  @ViewChild(TransactionModalComponent) transactionModal!: TransactionModalComponent;

  constructor(
    public router: Router, 
    private http: HttpClient, 
    private api: ApiService, 
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getTransactions();
    this.filtre = false;
  
  }

  getTransactions() {
    this.loaded = false;
    this.api.getData(this.url + 'transactions').subscribe({
      next: (res: any) => {
        this.transactions = res.data;
        this.filteredTransactions = this.transactions;
  
      },
      error: (err) => {
        this.toastr.error(err);
        this.loaded = true;
      },
      complete: () => {
        this.loaded = true ; 
        console.log(this.transactions);
        
        this.updatePaginatedTransactions();
      }
    });
  }

  
  applyFilters() {
    this.filtre = true; 
    if (!this.loaded) return;
    this.filteredTransactions = this.transactions;
    let tempTransactions = this.filteredTransactions;
    if (this.range.start && this.range.end) {
      console.log(this.range.start> this.range.end);
      if(this.range.start> this.range.end)
        {
          this.toastr.warning('Choissez une date de début et de fin valides', 'Filtre mal initialisé');
          return;
        }
      tempTransactions = tempTransactions.filter(transaction => 
        new Date(transaction.created_at)>= this.range.start && new Date(transaction.created_at) <= this.range.end);
      }
    

    this.filteredTransactions = tempTransactions;
    this.currentPage = 1;
    // this.updatePaginatedTransactions();
    
  }
  get paginatedTransactionsFunct() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredTransactions.slice(startIndex, endIndex);
  }

  // onPageChange(event: PageEvent) {
  //   this.currentPage = event.pageIndex;
  //   const startIndex = this.currentPage * event.pageSize;
  //   const endIndex = startIndex + event.pageSize;
  //   this.paginatedTransactions = this.filteredTransactions.slice(startIndex, endIndex);
  // }

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

  resetFilters() {
    this.range = { start: '', end: '' };
    this.startDate = '';
    this.applyFilters();
    this.filtre = false ; 
    
  }

Filtre(){
    if(this.range.end=='' || this.range.start=='')
      {
        this.toastr.warning('Choissez une date de début et de fin', 'Filtre mal initialisé');
        return;
      }
      this.applyFilters(); 
  }

}
