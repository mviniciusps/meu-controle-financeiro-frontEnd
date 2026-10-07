import { Component } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  patrimonioLiquido = 18420.30;

  dinheiroDisponivel = 3842.30;

  patrimonioTotal = 24900.30;

  dividas = 6480.00;

  composicaoFinanceira = [
    {
      nome: 'Contas bancárias',
      valor: 3842.30
    },
    {
      nome: 'Investimentos',
      valor: 8500.00
    },
    {
      nome: 'FGTS',
      valor: 7200.00
    },
    {
      nome: 'Outros direitos',
      valor: 5358.00
    }

  ];

  objetivoPrincipal = {
    nome: 'Reserva de emergência',
    valorAtual: 8500,
    valorMeta: 20000
  };

  get percentualObjetivo(): number {
    return (this.objetivoPrincipal.valorAtual / this.objetivoPrincipal.valorMeta) * 100;
  }

}
