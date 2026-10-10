import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

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
  imports: [CurrencyPipe, DatePipe, FormsModule, PageHeaderComponent],
  templateUrl: './lancamentos.component.html',
  styleUrl: './lancamentos.component.scss'
})
export class LancamentosComponent {
  descricao = '';
  valor: number | null = null;
  tipo: 'Receita' | 'Despesa' = 'Despesa';
  categoria = 'Alimentação';
  data = this.obterDataAtual();

  categorias = [
    'Moradia',
    'Alimentação',
    'Transporte',
    'Saúde',
    'Lazer',
    'Salário',
    'Outros'
  ];

  meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
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

  mesSelecionado = this.obterMesAtual();

  // Propriedades reativas
  get totalReceitas(): number {
    return this.lancamentosFiltrados
      .filter(item => item.tipo === 'Receita')
      .reduce((total, item) => total + item.valor, 0);
  }

  get totalDespesas(): number {
    return this.lancamentosFiltrados
      .filter(item => item.tipo === 'Despesa')
      .reduce((total, item) => total + item.valor, 0)
  }

  get saldo(): number {
    return this.totalReceitas - this.totalDespesas;
  }

  get lancamentosFiltrados(): Lancamento[] {
    return this.lancamentos.filter(item => item.data.slice(0, 7) === this.mesSelecionado);
  }

  get mesPorExtenso(): string {
    if (!this.mesSelecionado) return '';

    const [ano, mes] = this.mesSelecionado.split('-');
    const nomeMes = this.meses[Number(mes) - 1];

    return `${nomeMes} de ${ano}`;
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
    this.data = this.obterDataAtual();

  }

  excluirLancamento(id: number): void {
    this.lancamentos = this.lancamentos.filter(
      item => item.id !== id
    );
  }

  mesAnterior(): void {
    const data = new Date(`${this.mesSelecionado}-01T12:00:00`);
    data.setMonth(data.getMonth() - 1);

    this.mesSelecionado = [
      data.getFullYear(),
      String(data.getMonth() + 1).padStart(2, '0')
    ].join('-');
  }

  proximoMes(): void {
    const data = new Date(`${this.mesSelecionado}-01T12:00:00`);
    data.setMonth(data.getMonth() + 1);

    this.mesSelecionado = [
      data.getFullYear(),
      String(data.getMonth() + 1).padStart(2, '0')
    ].join('-');
  }

  obterMesAtual(): string {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');

    return `${ano}-${mes}`;
  }

  obterDataAtual(): string {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  irParaNovoLancamento(): void {
    document
      .getElementById('formulario-lancamento')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

}