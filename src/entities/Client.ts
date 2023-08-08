import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Invoice } from "./Invoice";

@Entity("clients")
export class Client {
    
    @PrimaryColumn()
    id: string;

    @Column()
    nombre: string;

    @Column()
    email: string;

    @Column()
    telefono: string

    @Column()
    dni: string

    @Column()
    direccion: string

    @OneToMany(() => Invoice, factura => factura.cliente)
    facturas: Invoice[]

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