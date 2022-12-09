export interface Task {
    total_rows: number;
    offset: number;
    rows: TaskRow[];
}

export interface TaskRow {
    id: string;
    key: string;
    value: Value;
    doc: Doc;
}

export interface Doc {
    _id: string;
    _rev: string;
    titulo: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_final: string;
    atencion: string;
}

export interface Value {
    rev: string;
}
