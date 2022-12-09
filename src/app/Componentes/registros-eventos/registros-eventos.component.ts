import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doc, TaskRow } from '../../Modelos/Task.interface';
import { ApigeneralService } from '../../Servicios/apigeneral.service';
import { EmpleadoRow } from '../../Modelos/Empleados.interface';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-registros-eventos',
    templateUrl: './registros-eventos.component.html',
    styleUrls: ['./registros-eventos.component.css'],
})
export class RegistrosEventosComponent implements OnInit {
    public listaTask: TaskRow[] = [];
    public listaEmpleados: EmpleadoRow[] = [];

    public taskEditar!: TaskRow | undefined;

    public agregarMethod: boolean = true;

    public banderaMostarLista: boolean = true;

    public formadd: FormGroup = this.fb.group({
        _id: [''],
        _rev: [''],
        titulo: ['', Validators.required],
        fecha_inicio: ['', Validators.required],
        fecha_final: ['', Validators.required],
        descripcion: ['', Validators.required],
        atencion: ['', Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private apigeneralService: ApigeneralService
    ) {}

    ngOnInit(): void {
        this.consultaTask();
        this.consultaEmpleados();
    }

    consultaTask() {
        this.apigeneralService
            .llamadoendpointhttp('consultatask', '')
            .subscribe((resp) => {
                this.listaTask = resp.rows;
            });
    }

    consultaEmpleados() {
        this.apigeneralService
            .llamadoendpointhttp('consultaempleados', '')
            .subscribe((resp) => {
                this.listaEmpleados = resp.rows;
            });
    }

    agregarTask() {
        if (this.formadd.invalid) {
            Swal.fire('Campos no validos!', 'Por favor revisar!', 'error');
            this.formadd.markAllAsTouched();
            return;
        }

        let rest;

        if (this.agregarMethod) {
            let { _id, _rev, ...rest2 } = this.formadd.value;
            rest = rest2;
        } else {
            rest = this.formadd.value;
        }

        this.apigeneralService
            .llamadoendpointhttp('ingresartask', {
                ...rest,
            })
            .subscribe((resp) => {
                Swal.fire(
                    'Guardado con exito!',
                    'You clicked the button!',
                    'success'
                );
                this.banderaMostarLista = true;
                this.consultaTask();
                this.formadd.reset();
            });

        this.agregarMethod = true;
    }

    campoNoesValido(campo: string) {
        return (
            this.formadd.controls[campo].errors &&
            this.formadd.controls[campo].touched
        );
    }

    editarBtn(id: string) {
        this.agregarMethod = false;
        this.banderaMostarLista = false;
        this.taskEditar = this.listaTask.find((e) => e.doc._id == id);
        this.formadd.patchValue({ ...this.taskEditar?.doc });
    }

    eliminarBtn(id: string) {
        this.taskEditar = this.listaTask.find((e) => e.doc._id == id);
        this.apigeneralService
            .llamadoendpointhttp('eliminartask', this.taskEditar?.doc)
            .subscribe((resp) => {
                Swal.fire(
                    'Eliminado con exito!',
                    `El task ${this.taskEditar?.doc._id} se ha eliminado`,
                    'success'
                );
                this.consultaTask();
            });
    }

    limpiar() {
        this.agregarMethod = true;
        this.formadd.reset();
    }

    mostrarFormLista(opcion: string) {
        if (opcion == 'form') {
            this.banderaMostarLista = false;
        } else {
            this.banderaMostarLista = true;
        }
    }
}
