import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Client } from "./Client";
import { Product } from "./Product";

@Entity("invoices")
export class Invoice {

    @PrimaryColumn()
    id: string;

    @Column()
    numero_factura: string;

    @Column()
    tipo: string;

    @Column()
    fecha: Date;

    @Column()
    monto_total: number;

    @ManyToOne(() => Client, cliente => cliente.facturas)
    @JoinColumn({ name: 'client_id' })
    cliente: Client;

    @ManyToMany(() => Product, { cascade: true })
    @JoinTable()
    productos: Product[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}