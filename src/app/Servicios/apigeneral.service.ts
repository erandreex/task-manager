import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApigeneralService {
    private _baseUrl: string = 'base';

    constructor(private http: HttpClient) {}

    public llamadoendpointhttp(
        endpoint: string,
        variables: any
    ): Observable<any> {
        let respuesta!: Observable<any>;
        let url: string = '';
        let _baseUrl: string = 'http://20.55.48.249:5984';

        switch (endpoint.toLowerCase()) {
            case 'consultaregistros':
                url = `${_baseUrl}/consregistro`;
                respuesta = this.http.get<any>(url);
                break;
            case 'metodopost':
                url = `${_baseUrl}/metodo`;
                respuesta = this.http.post<any>(url, variables);
                break;
        }

        return respuesta;
    }

    private handlerError(error: any) {
        throw throwError(error);
    }
}
