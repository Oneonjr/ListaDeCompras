import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { flatMap } from 'rxjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
  Produto = '';
  Quantidade = 1;
  Valor = 0;
  nomes: {Produto: string, Quantidade: number, Valor:number, ValorTotal: Number}[] = [];
  valorTotal2 = 0;
  editIndex = -1;
  total = 0;
  


  adicionarProduto():void {
    if (!this.Produto || this.Valor < 0 || this.Quantidade <= 0) {
      return alert('Preencha os dados corretamente.');
    }
    const valorTotal = this.Valor * this.Quantidade;
    const arrayProdutos = {Produto: this.Produto, Quantidade: this.Quantidade, Valor: this.Valor, ValorTotal: valorTotal};
    this.nomes.push(arrayProdutos);
    this.total += valorTotal;
    this.Produto = '';
    console.log(" valor total é: " + valorTotal);
  }



  

  removerProduto(index: number): void {
    const removendo = this.nomes[index].Valor; //obtendo o valor do item
    this.nomes.splice(index, 1); //removendo o item
    this.total -= removendo * this.Quantidade // subtraindo o valor
  }

  downloadPDF(): void{
    let doc: any = new jsPDF();

    const colunas = [
      { header: 'Produto', dataKey: 'produto' },
      { header: 'Quantidade', dataKey: 'quantidade' },
      { header: 'Valor em R$', dataKey: 'valor' },
    ];

    const data = this.nomes.map(item => ({ produto: item.Produto, quantidade: item.Quantidade, valor: item.Valor }));

    doc.autoTable(colunas, data);
    
    doc.text('Valor total: R$' + this.total, 105, 7, { align: 'center' });

    doc.save('lista.pdf');

  }
}
