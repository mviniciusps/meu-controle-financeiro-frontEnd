import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Cartao {
  id: number;
  nome: string;
  bandeira: string;
  final: string;
  limite: number;
  fechamento: number;
  vencimento: number;
}

interface Compra {
  id: number;
  cartaoId: number;
  descricao: string;
  categoria: string;
  data: string;
  valor: number;
  parcelaAtual: number;
  totalParcelas: number;
}

@Component({
  selector: 'app-cartoes',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FormsModule],
  templateUrl: './cartoes.component.html',
  styleUrl: './cartoes.component.scss'
})
export class CartoesComponent {
  cartoes: Cartao[] = [
    {
      id: 1,
      nome: 'Nubank',
      bandeira: 'Mastercard',
      final: '4821',
      limite: 5000,
      fechamento: 20,
      vencimento: 27
    },
    {
      id: 2,
      nome: 'PicPay',
      bandeira: 'Mastercard',
      final: '7315',
      limite: 2500,
      fechamento: 10,
      vencimento: 17
    }
  ];

  compras: Compra[] = [
    {
      id: 1,
      cartaoId: 1,
      descricao: 'Transplante capilar',
      categoria: 'Saúde',
      data: '2026-10-02',
      valor: 650,
      parcelaAtual: 4,
      totalParcelas: 10
    },
    {
      id: 2,
      cartaoId: 1,
      descricao: 'Supermercado',
      categoria: 'Alimentação',
      data: '2026-10-05',
      valor: 285.90,
      parcelaAtual: 1,
      totalParcelas: 1
    },
    {
      id: 3,
      cartaoId: 1,
      descricao: 'Peças para moto',
      categoria: 'Transporte',
      data: '2026-10-08',
      valor: 180,
      parcelaAtual: 3,
      totalParcelas: 5
    },
    {
      id: 4,
      cartaoId: 2,
      descricao: 'Restaurante',
      categoria: 'Alimentação',
      data: '2026-10-04',
      valor: 96.50,
      parcelaAtual: 1,
      totalParcelas: 1
    },
    {
      id: 5,
      cartaoId: 2,
      descricao: 'Eletrônicos',
      categoria: 'Compras',
      data: '2026-10-06',
      valor: 240,
      parcelaAtual: 2,
      totalParcelas: 6
    },
    {
      id: 6,
      cartaoId: 1,
      descricao: 'Compra anterior',
      categoria: 'Compras',
      data: '2026-09-15',
      valor: 120,
      parcelaAtual: 2,
      totalParcelas: 3
    }
  ];

  cartaoSelecionado = 'todos';
  mesSelecionado = '2026-10';

  get comprasFiltradas(): Compra[] {
    return this.compras.filter(compra => {
      const mesmoCartao =
        this.cartaoSelecionado === 'todos' ||
        compra.cartaoId === Number(this.cartaoSelecionado);

      const mesmoMes = compra.data.slice(0, 7) === this.mesSelecionado;

      return mesmoCartao && mesmoMes;
    });
  }

  get totalFatura(): number {
    return this.comprasFiltradas.reduce(
      (total, compra) => total + compra.valor,
      0
    );
  }

  get limiteTotal(): number {
    return this.cartoes.reduce(
      (total, cartao) => total + cartao.limite,
      0
    );
  }

  get limiteDisponivel(): number {
    return this.cartoes.reduce((total, cartao) => {
      const gastos = this.compras
        .filter(compra => compra.cartaoId === cartao.id)
        .reduce((soma, compra) => soma + compra.valor, 0);

      return total + Math.max(0, cartao.limite - gastos);
    }, 0);
  }

  get cartoesFiltrados(): Cartao[] {
    if (this.cartaoSelecionado === 'todos') {
      return this.cartoes;
    }

    return this.cartoes.filter(
      cartao => cartao.id === Number(this.cartaoSelecionado)
    );
  }

  obterNomeCartao(cartaoId: number): string {
    return this.cartoes.find(cartao => cartao.id === cartaoId)?.nome ?? '';
  }

  obterFinalCartao(cartaoId: number): string {
    return this.cartoes.find(cartao => cartao.id === cartaoId)?.final ?? '';
  }

  mesAnterior(): void {
    const data = new Date(`${this.mesSelecionado}-01T12:00:00`);
    data.setMonth(data.getMonth() - 1);
    this.atualizarMes(data);
  }

  proximoMes(): void {
    const data = new Date(`${this.mesSelecionado}-01T12:00:00`);
    data.setMonth(data.getMonth() + 1);
    this.atualizarMes(data);
  }

  private atualizarMes(data: Date): void {
    this.mesSelecionado = [
      data.getFullYear(),
      String(data.getMonth() + 1).padStart(2, '0')
    ].join('-');
  }

  get mesPorExtenso(): string {
    const [ano, mes] = this.mesSelecionado.split('-').map(Number);

    return new Date(ano, mes - 1, 1).toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric'
    });
  }
}