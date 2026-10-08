import { Component } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, DecimalPipe, RouterLink],
  // RouterLink pois é STANDALONE
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
      valor: 7500.00
    },
    {
      nome: 'FGTS',
      valor: 9100.00
    },
    {
      nome: 'Outros direitos',
      valor: 4458.00
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
