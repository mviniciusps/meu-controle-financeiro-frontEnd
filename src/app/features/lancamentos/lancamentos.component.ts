import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Lancamento {
  id: number;
  descricao: string;
  valor: number;
  tipo: 'Receita' | 'Despesa';
  categoria: string;
  data: string;
}

@Component({
  selector: 'app-lancamentos',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FormsModule],
  templateUrl: './lancamentos.component.html',
  styleUrl: './lancamentos.component.scss'
})
export class LancamentosComponent {
  descricao = '';
  valor: number | null = null;
  tipo: 'Receita' | 'Despesa' = 'Despesa';
  categoria = 'Alimentação';
  data = new Date().toISOString().slice(0.10);

  categorias = [
    'Moradia',
    'Alimentação',
    'Transporte',
    'Saúde',
    'Lazer',
    'Salário',
    'Outros'
  ];

  lancamentos: Lancamento[] = [
    {
      id: 1,
      descricao: 'Salário',
      valor: 4985,
      tipo: 'Receita',
      categoria: 'Salário',
      data: '2026-10-05'
    },
    {
      id: 2,
      descricao: 'Aluguel',
      valor: 900,
      tipo: 'Despesa',
      categoria: 'Moradia',
      data: '2026-10-06'
    },
    {
      id: 3,
      descricao: 'Parcela da moto',
      valor: 555.08,
      tipo: 'Despesa',
      categoria: 'Transporte',
      data: '2026-10-07'
    }
  ];

  get totalReceitas(): number {
    return this.lancamentos.filter(item => item.tipo === 'Receita').reduce((total, item) => total + item.valor, 0);
  }

  get totalDespesas(): number {
    return this.lancamentos.filter(item => item.tipo === 'Despesa').reduce((total, item) => total + item.valor, 0)
  }

  get saldo(): number {
    return this.totalReceitas - this.totalDespesas;
  }

  adicionarLancamento(): void {
    if (
      !this.descricao.trim() ||
      this.valor === null ||
      this.valor <= 0 ||
      !this.data
    ) {
      return;
    }

    this.lancamentos.unshift({
      id: Date.now(),
      descricao: this.descricao.trim(),
      valor: this.valor,
      tipo: this.tipo,
      categoria: this.categoria,
      data: this.data
    });

    this.descricao = '';
    this.valor = null;
    this.tipo = 'Despesa';
    this.categoria = 'Alimentação';
    this.data = new Date().toISOString().slice(0, 10);

  }

  excluirLancamento(id: number): void {
    this.lancamentos = this.lancamentos.filter(
      item => item.id !== id
    );
  }
}