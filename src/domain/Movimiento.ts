// src/domain/Movimiento.ts

export interface Movimiento {
  id: number;
  cuenta: number;
  tipo: "INGRESO" | "EGRESO" | "TRANSFERENCIA";
  monto: number;
  fecha: string;
  descripcion?: string;
}
