import { Component, inject, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';
import { Ecart } from '../ecart';
import { log } from 'console';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:  [CommonModule, FormsModule,CanvasJSAngularChartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  startDate: string = '';
  endDate: string = '';
  selectedPartenaire !:  string  | null;
  partenaires !: string[];
  transactions: Transaction[] = [];
  ecarts : Ecart[] = [];
  loaded : boolean = true ; 
  url: string = 'http://127.0.0.1:8000/api/';
  filteredTransactions: Transaction[] = [];
  filteredEcarts: Ecart[] = [];
  toastr = inject(ToastrService) ; 
  ecartsMontant !: number[];
  ecartsNombre !: number[];
  chartOptions !: any ; 
  chartOptionsMontant: any;
  chartOptionsNombre: any;
  
  constructor(private api: ApiService){
    
  }
  ngOnInit(): void {
      this.getTransactions();
      this.loadEcarts();
      this.updateGraphData()
      
  }

  loadEcarts() {
    this.loaded = false;
      this.api.getData(this.url+'stats').subscribe({
        next : (res:any) => {
          this.ecarts = res.data;
          this.applyFilters();
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
          this.loadvalues();
          
        }
  
      });
     
    }

    applyFilters() {
      let tempEcarts = this.ecarts;
      if (this.startDate!='' && this.endDate!='') {
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
      console.log(this.filteredEcarts);
      
      this.updateGraphData();
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

  loadvalues()
  {
    this.ecartsMontant = this.ecarts.map((ecart: Ecart) => ecart.montant_ecart);
    this.ecartsNombre = this.ecarts.map((ecart: Ecart) => ecart.nombre);
  }  
  getPartenaires() {
    const uniquePartenaires = new Set<string>();
    for (const ecart of this.transactions) {
      uniquePartenaires.add(ecart.partenaire);
      uniquePartenaires.add("TEST");
    }
    this.partenaires = Array.from(uniquePartenaires);
    
  }


  updateGraphData() {
    this.chartOptionsMontant = {
      animationEnabled: true,
      theme: "light1",
      title: {
        text: "Ecarts Montant"
      },
      axisX: {
        title: "Date",
        valueFormatString: "DD MMM YYYY"
      },
      axisY: {
        title: "Montant (Francs CFA)",
        includeZero: false
      },
      data: [{
        type: "line",
        name: "Ecarts Montant",
        xValueFormatString: "DD MMM YYYY",
        yValueFormatString: "#,##0.##",
        dataPoints: this.filteredEcarts.map(ecart => ({
          x: new Date(ecart.created_at),
          y: ecart.montant_ecart
        }))
      }]
    };

    this.chartOptionsNombre = {
      animationEnabled: true,
      theme: "light1",
      title: {
        text: "Ecarts Nombre"
      },
      axisX: {
        title: "Date",
        valueFormatString: "DD MMM YYYY"
      },
      axisY: {
        title: "Nombre",
        includeZero: false
      },
      data: [{
        type: "line",
        name: "Ecarts Nombre",
        xValueFormatString: "DD MMM YYYY",
        yValueFormatString: "#,##0.##",
        dataPoints: this.filteredEcarts.map(ecart => ({
          x: new Date(ecart.created_at),
          y: ecart.nombre
        }))
      }]
    };
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
      this.updateGraphData();
    }
  }
}
