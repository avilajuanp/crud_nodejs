import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { createRegularExpressionLiteral } from "typescript";
import { v4 as uuid } from "uuid";

@Entity("products")
class Product {

  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @Column()
  categoria: string;

  @Column()
  precio: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /*
  @ManyToOne(
    () => Category,
    (category) => category.products)
  @JoinColumn({name:"id_categoria"})
  category: Category;
  
  y en Category.ts
  @OneToMany(
    () => Product,
    (product) => product.category)
    //maybe cascade: true, eager.true
  productos: Producto[]
  */
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Product };