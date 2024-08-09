export class Ecart {
    id_ecart: number;
    partenaire: string;
    montant_ecart: number;
    created_at: Date;
    nombre: number;
    surplus: string;
    nb_transactions_OM: number;
    nb_transactions_PARTENAIRE: number;
    total_montant_OM: number;
    total_montant_PARTENAIRE: number;

    constructor() {
        this.id_ecart = 0;
        this.partenaire = '';
        this.montant_ecart = 0;
        this.created_at = new Date();
        this.nombre = 0;
        this.surplus = '';
        this.nb_transactions_OM = 0;
        this.nb_transactions_PARTENAIRE = 0;
        this.total_montant_OM = 0;
        this.total_montant_PARTENAIRE = 0;
    }
}