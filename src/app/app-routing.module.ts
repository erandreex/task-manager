import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrosEventosComponent } from './Componentes/registros-eventos/registros-eventos.component';

const routes: Routes = [
    {
        path: '',
        component: RegistrosEventosComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
