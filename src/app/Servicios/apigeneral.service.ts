import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Empleado } from '../Modelos/Empleados.interface';
import { Task } from '../Modelos/Task.interface';

@Injectable({
    providedIn: 'root',
})
export class ApigeneralService {
    constructor(private http: HttpClient) {}

    public llamadoendpointhttp(
        endpoint: string,
        variables: any
    ): Observable<any> {
        let respuesta!: Observable<any>;
        let url: string = '';
        let _baseUrl: string = 'http://20.55.48.249:5984';
        let header = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Basic YWRtaW46Y291Y2hhZG1pbg==',
        });
        switch (endpoint.toLowerCase()) {
            case 'consultaempleados':
                url = `${_baseUrl}/empleados/_all_docs?include_docs=true`;
                respuesta = this.http.get<Empleado>(url, { headers: header });
                break;
            case 'consultatask':
                url = `${_baseUrl}/tareas/_all_docs?include_docs=true`;
                respuesta = this.http.get<Task>(url, { headers: header });
                break;
            case 'ingresartask':
                url = `${_baseUrl}/tareas`;
                respuesta = this.http.post<any>(url, variables, {
                    headers: header,
                });
                break;
            case 'eliminartask':
                console.log('rev', variables._rev);
                console.log('id', variables._id);

                let headerDelete = new HttpHeaders({
                    Authorization: 'Basic YWRtaW46Y291Y2hhZG1pbg==',
                });
                url = `${_baseUrl}/tareas/${variables._id}/?rev=${variables._rev}`;
                respuesta = this.http.delete<any>(url, {
                    headers: header,
                });
                break;
        }

        return respuesta;
    }

    private handlerError(error: any) {
        throw throwError(error);
    }
}
