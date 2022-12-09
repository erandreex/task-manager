export interface Empleado {
    total_rows: number;
    offset: number;
    rows: EmpleadoRow[];
}

export interface EmpleadoRow {
    id: string;
    key: string;
    value: Value;
    doc: Doc;
}

export interface Doc {
    _id: string;
    _rev: string;
    nombre: string;
    usuario: string;
    edad: string;
    cargo: string;
}

export interface Value {
    rev: string;
}
