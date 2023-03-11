import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./Product";

@Entity("categories")
class Category {

  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @OneToMany(
    () => Product,
    (product) => product.categoria)
    //maybe cascade: true, eager.true
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

export { Category };