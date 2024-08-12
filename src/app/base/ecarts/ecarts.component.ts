import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
// import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Ecart } from '../ecart';
// import { sendModalComponent } from '../send-modal/send-modal.component';
import { EcartModalComponent } from '../ecart-modal/ecart-modal.component';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-ecarts',
  templateUrl: './ecarts.component.html',
  styleUrls: ['./ecarts.component.css'],
  imports:[
    EcartModalComponent, 
    LoaderComponent,
    FormsModule,
    CommonModule,
    NgIf,
    NgFor,
    RouterModule
  ],
  standalone: true 
})
export class EcartsComponent implements OnInit{
  @ViewChild(EcartModalComponent) ecartModal!: EcartModalComponent;
  selectedEcart!: Ecart;
  isModalOpen: boolean = false;
  filteredEcarts: Ecart[] = [];
  itemsPerPage: number = 10;
  startDate: string = '';
  endDate: string = '';
  archivedFilter: boolean = false;
  ecarts: Ecart[] = [];
  loaded: boolean = false;
  currentPage: number = 1;
  url='http://127.0.0.1:8000/api/';

  constructor(private toastr:ToastrService, public router : Router, private api:ApiService) 
    {}

  ngOnInit(): void {
    this.loadEcarts();
  }

paginatedEcarts(): Ecart[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredEcarts.slice(startIndex, endIndex);
  }
  applyFilters() {
    let tempEcarts = this.ecarts;
    if (this.startDate && this.endDate) {
      if(this.startDate>this.endDate)
      {
        this.toastr.error('La date de début doit être ultérieure à la date de fin', 'Filtre mal rempli');
        this.startDate = "";
        this.endDate = ""
        return;
      }
      const start = new Date(this.startDate).toDateString();
      const end = new Date(this.endDate).toDateString();
      tempEcarts = tempEcarts.filter(ecart =>
        new Date(ecart.created_at).toDateString() > start && 
        new Date(ecart.created_at).toDateString() < end
      );
    }

    this.filteredEcarts = tempEcarts;

    // if (this.paginator) {
    //   this.paginator.length = this.filteredEcarts.length;
    //   this.paginator.pageIndex = 0;
    // }
  }

totalPages(): number {
    return Math.ceil(this.filteredEcarts.length / this.itemsPerPage);
  }

  async openModal(ecart:Ecart) {
    this.selectedEcart = ecart;
    console.log(this.selectedEcart);
    console.log(this.ecartModal);
    if (this.ecartModal) {
      this.ecartModal.isOpen = true;
      console.log(this.ecartModal);
      this.isModalOpen = true;
    } else {
      console.log('issue');
    }
  }

  closeModal() {
    this.isModalOpen = false;
    if (this.ecartModal) {
      this.ecartModal.isOpen = false;
    }
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
  
}