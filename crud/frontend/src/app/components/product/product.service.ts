import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Product } from './product.model';


@Injectable({  // Essa classe pode ser injetada em outras classes
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:8080/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  ShowMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: 'top',
      panelClass: isError ? ['.msg-error'] : ['.msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    this.ShowMessage('Ocorreu um ERRO!!', true)
    return EMPTY
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }

  readById(id: Number): Observable<Product> {
    const url = `${this.baseUrl}/${id}` // Vai pegar "http://localhost:8080/products/id"
    return this.http.get<Product>(url)
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}` // Vai pegar "http://localhost:8080/products/id" e alterar o valor
    return this.http.put<Product>(url, product)
  }
  delete(id: Number): Observable<Product> {
    const url = `${this.baseUrl}/${id}` // Vai pegar "http://localhost:8080/products/id" e deletar o valor
    return this.http.delete<Product>(url)
  }
}
