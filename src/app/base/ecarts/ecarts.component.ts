import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr'; 
import { FormsModule, NgModel } from '@angular/forms';
// import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
// import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { registerLocaleData } from '@angular/common';
import { Ecart } from '../ecart';
// import { sendModalComponent } from '../send-modal/send-modal.component';
import { EcartModalComponent } from '../ecart-modal/ecart-modal.component';
import { IgxDateRangePickerComponent } from 'igniteui-angular';

@Component({
  selector: 'app-ecarts',
  templateUrl: './ecarts.component.html',
  styleUrls: ['./ecarts.component.css'],
  imports:[
    // HeaderComponent,
    // MatTableModule,
    // LateralMenuComponent,
    LoaderComponent,
    FormsModule,
    CommonModule,
    NgIf,
    NgFor,
    // sendModalComponent,
    // MatPaginatorModule, 

     EcartModalComponent
  ],
    standalone: true,  

})
export class EcartsComponent implements OnInit {
  filteredEcarts: Ecart[] = [];
  dateFilter: string = '';
  archivedFilter: boolean = false;
  itemsPerPage: number = 10;
  selectedEcart!: Ecart | null ;
  ecarts: Ecart[] = [];
  isModalOpen: boolean = false; 
  loaded: boolean = false;
  currentPage: number = 1;
  url='http://127.0.0.1:8000/api/';
  ecartModal !: EcartModalComponent ; 

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private router: Router,
    private http: HttpClient,
    private api: ApiService,
    private toastr : ToastrService  ) {}

  ngOnInit() {
    this.loadEcarts();
    
  }

  loadEcarts() {
    this.loaded = false;
    this.api.getData(this.url+'stats').subscribe({
      next : (res:any) => {
        this.ecarts = res.data;
      },
      error : (err) =>
      {
        this.loaded = true;
        this.toastr.error(err);
      },
      complete : () => {
        this.loaded = true;
        this.filteredEcarts = this.ecarts;
      }

    });
    this.applyFilters(); 
  }
  applyFilters() {
    let tempEcarts = this.ecarts;

    if (this.dateFilter) {
      tempEcarts = tempEcarts.filter(ecart =>
        new Date(ecart.created_at).toDateString() === new Date(this.dateFilter).toDateString()
      );
    }

    this.filteredEcarts = tempEcarts;

    // if (this.paginator) {
    //   this.paginator.length = this.filteredEcarts.length;
    //   this.paginator.pageIndex = 0;
    // }
  }

  // onPageChange(event: PageEvent) {
  //   this.currentPage = event.pageIndex + 1;
  //   this.itemsPerPage = event.pageSize;
  // }
  
  get paginatedEcarts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredEcarts.slice(startIndex, endIndex);
  }
  
  get totalPages(): number {
    return Math.ceil(this.filteredEcarts.length / this.itemsPerPage);
  }

  async openModal(ecart: Ecart) {
    
    this.selectedEcart = await ecart;
    this.ecartModal = new EcartModalComponent(ecart);
    console.log(this.selectedEcart);
    if (this.ecartModal) {
      this.ecartModal.openModal();
      console.log(this.ecartModal);
      this.isModalOpen = true ;
    } else {
      console.log('issue');
    }
  }

  closeModal() {
    this.isModalOpen = false ;
   
  }
}
