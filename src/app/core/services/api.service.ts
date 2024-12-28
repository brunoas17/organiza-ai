import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  #http = inject(HttpClient);
  #baseUrl = environment.api; // Substitua pela URL da sua API

  // Usando Signal para armazenar os dados
  private readonly dataSignal = signal<any[]>([]);
  readonly data$ = this.dataSignal.asReadonly(); // Expondo o Signal como readonly

  // Método para obter dados da API e atualizar o Signal
  fetchData(endpoint: string): void {
    this.#http.get<any[]>(`${this.#baseUrl}/${endpoint}`)
      .pipe(
        catchError(error => {
          console.error('Erro ao buscar dados:', error);
          return throwError(() => new Error('Erro ao buscar dados'));
        })
      )
      .subscribe(data => this.dataSignal.set(data)); // Atualiza o Signal com os dados
  }

  // Método para criar ou adicionar novos dados
  createData(endpoint: string, payload: any): Observable<any> {
    return this.#http.post<any>(`${this.#baseUrl}/${endpoint}`, payload).pipe(
      catchError(error => {
        console.error('Erro ao criar dados:', error);
        return throwError(() => new Error('Erro ao criar dados'));
      })
    );
  }

  // Método para deletar dados
  deleteData(endpoint: string, id: number): Observable<any> {
    return this.#http.delete(`${this.#baseUrl}/${endpoint}/${id}`).pipe(
      catchError(error => {
        console.error('Erro ao deletar dados:', error);
        return throwError(() => new Error('Erro ao deletar dados'));
      })
    );
  }
}
