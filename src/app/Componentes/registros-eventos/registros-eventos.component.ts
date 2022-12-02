import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigeneralService } from '../../Servicios/apigeneral.service';

@Component({
    selector: 'app-registros-eventos',
    templateUrl: './registros-eventos.component.html',
    styleUrls: ['./registros-eventos.component.css'],
})
export class RegistrosEventosComponent implements OnInit {
    public form: FormGroup = this.fb.group({
        titulo: ['', Validators.required],
        fecha_inicio: ['', Validators.required],
        fecha_fin: ['', Validators.required],
        description: ['', Validators.required],
        atendido: ['', Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private apigeneralService: ApigeneralService
    ) {}

    ngOnInit(): void {
        this.apigeneralService
            .llamadoendpointhttp('consultaregistros', '')
            .subscribe((resp) => {
                console.log(resp);
            });
    }

    editaragregar() {}
}
