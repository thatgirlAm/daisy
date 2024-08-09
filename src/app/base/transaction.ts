export class Transaction
{
  id_transaction!: number;
  partenaire !: string; 
  montant !: number ;
  created_at !: Date ; 
  etat !: boolean;
  code_erreur !: number  ; 
  archived !: boolean;
  receiver_nb !: number;
  sender_nb !: number ; 
  id_stat!:number;
  
}