import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";
import { Invoice } from "./Invoice";

@Entity("products")
class Product {

  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @Column()
  precio: number;

  @ManyToOne(
    () => Category,
    (category) => category.productos)
  @JoinColumn({ name: "id_categoria" })
  categoria: Category;

  @ManyToMany(() => Invoice)
  @JoinTable()
  facturas: Invoice[];

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

export { Product };