import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.css']
})

export class TelaComponent {
  produtos : Produto[] = [
    {nome: 'mussarela', preco: 9.00, tags: ['queijo', 'muçarela']}
  ]

  control = new FormControl('');
  streets: string[] = ['mussarela', 'arroz', 'feijão', 'macarrão'];
  filteredStreets = new Observable<string[]>;

  ngOnInit() {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}

export interface Produto {
  nome: string;
  preco: number;
  tags: string[];
}
