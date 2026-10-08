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

  ativos = [
    { nome: 'Contas bancárias', valor: 3842.30, disponivelImediatamente: true },
    { nome: 'Contas investimentos', valor: 7500.00, disponivelImediatamente: false },
    { nome: 'FGTS', valor: 9100.00, disponivelImediatamente: false },
    { nome: 'Outros direitos', valor: 4458.00, disponivelImediatamente: false },
  ];

  passivos = [
    { nome: 'Dívidas', valor: 6480.00 }
  ];

  evolucaoPatrimonial = [
    { mes: 'Mai', valor: 14500 },
    { mes: 'Jun', valor: 15200 },
    { mes: 'Jul', valor: 16100 },
    { mes: 'Ago', valor: 16800 },
    { mes: 'Set', valor: 17500 },
    { mes: 'Out', valor: 18420.30 }
  ];

  objetivoPrincipal = {
    nome: 'Reserva de emergência',
    valorAtual: 8500,
    valorMeta: 20000
  };

  get percentualObjetivo(): number {
    return (this.objetivoPrincipal.valorAtual / this.objetivoPrincipal.valorMeta) * 100;
  }

  get maiorValorPatrimonio(): number {
    return Math.max(...this.evolucaoPatrimonial.map(item => item.valor))
    // map => transforma em um novo array
    // ... => espalhamento para que o metodo max possa acessar item a item do array, e determinar qual maior
  }

  get patrimonioTotal(): number {
    return this.ativos.reduce((total, ativo) => total + ativo.valor, 0);
  }

  get dividas(): number {
    return this.ativos.reduce((total, passivo) => total + passivo.valor, 0);
  }

  get patrimonioLiquido(): number {
    return this.patrimonioTotal - this.dividas;
  }

  get dinheiroDisponivel(): number {
    return this.ativos
      .filter(ativo => ativo.disponivelImediatamente)
      .reduce((total, ativo) => total + ativo.valor, 0);
  }

  get composicaoFinanceira() {
    return this.ativos.map(ativo => ({
      nome: ativo.nome,
      valor: ativo.valor
    }))
  }
}
