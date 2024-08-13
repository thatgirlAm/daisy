import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ecart } from '../ecart';
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
    RouterModule,
    FormsModule,
  ],
  standalone: true 
})
export class EcartsComponent implements OnInit{
  partenaires : string[]= [] ; 
  selectedPartenaire !:  string  | null;
  selectedEcart!: Ecart;
  isModalOpen: boolean = false;
  filteredEcarts: Ecart[] = [];
  itemsPerPage: number = 10;
  startDate: string = '';
  endDate: string = '';
  archivedFilter: boolean = false;
  dropdown : boolean = false ; 
  ecarts: Ecart[] = [];
  loaded: boolean = false;
  currentPage: number = 1;
  url='http://127.0.0.1:8000/api/';
  
  
  @ViewChild(EcartModalComponent) ecartModal!: EcartModalComponent;

  constructor(
    private toastr:ToastrService, 
    public router : Router, 
    private api:ApiService
  ) {}

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
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
  
      if (start <= end) {
        tempEcarts = tempEcarts.filter(ecart => {
          const createdAt = new Date(ecart.created_at);
          return createdAt >= start && createdAt <= end;
        });
      } else {
        console.error("Start date must be before end date.");
      }
    }

    if (this.selectedPartenaire) {
      tempEcarts = tempEcarts.filter(ecart => {
        if (!this.selectedPartenaire)
        {
          return ; 
        }
        return ecart.partenaire === this.selectedPartenaire;
      });
    }
    this.filteredEcarts = tempEcarts;

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
        this.getPartenaires(); 
      }

    });
    this.applyFilters();
   
  }

  getPartenaires() {
    const uniquePartenaires = new Set<string>();
    for (const ecart of this.ecarts) {
      uniquePartenaires.add(ecart.partenaire);
      uniquePartenaires.add("TEST");
    }
    this.partenaires = Array.from(uniquePartenaires);
    console.log(this.partenaires);
    
  }
  dropdownFunc()
  {
    this.dropdown!=this.dropdown;
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
      this.selectedPartenaire = null;
      this.applyFilters();
    }
    this.applyFilters();
  }

 
}