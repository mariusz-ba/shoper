import { MigrationInterface, QueryRunner } from 'typeorm';

export class Defaults1564774145128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    // Insert default categories to database
    await queryRunner.query('INSERT INTO category VALUES (1, "All", "All products", NULL)');
    await queryRunner.query('INSERT INTO category VALUES (2, "Men", "Clothes for men", 1)');
    await queryRunner.query('INSERT INTO category VALUES (3, "Women", "Clothes for women", 1)');
    await queryRunner.query('INSERT INTO category VALUES (4, "Shoes", "Shoes for men", 2)');
    await queryRunner.query('INSERT INTO category VALUES (5, "Shoes", "Shoes for women", 3)');
    await queryRunner.query('INSERT INTO category VALUES (6, "T-Shirts", "T-Shirts for men", 2)');
    await queryRunner.query('INSERT INTO category VALUES (7, "Running shoes", "Running shoes", 4)');
    await queryRunner.query('INSERT INTO category VALUES (8, "Basketball shoes", "Basketball shoes", 4)');

    // Insert default products to database
    await queryRunner.query('INSERT INTO product VALUES (1, "Nike Air Max 97", 160.00, 6)');
    await queryRunner.query('INSERT INTO product VALUES (2, "Nike Epic React", 125.00, 7)');
    await queryRunner.query('INSERT INTO product VALUES (3, "Nike T-Shirt", 74.99, 6)');

    // Insert default products variations to database
    await queryRunner.query('INSERT INTO product_variation VALUES (1, "S", "SIZE")');
    await queryRunner.query('INSERT INTO product_variation VALUES (2, "M", "SIZE")');
    await queryRunner.query('INSERT INTO product_variation VALUES (3, "L", "SIZE")');
    await queryRunner.query('INSERT INTO product_variation VALUES (4, "XL", "SIZE")');

    await queryRunner.query('INSERT INTO product_variation VALUES (5, "10 US", "SIZE")');
    await queryRunner.query('INSERT INTO product_variation VALUES (6, "10.5 US", "SIZE")');
    await queryRunner.query('INSERT INTO product_variation VALUES (7, "11 US", "SIZE")');

    // Many to many realation between product_variations and product
    await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (1, 5)');
    await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (1, 6)');
    await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (1, 7)');

    await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (2, 6)');
    await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (2, 7)');

    await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (3, 1)');
    await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (3, 2)');
    await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (3, 3)');
    await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (3, 4)');

    // Insert default products images to database
    await queryRunner.query('INSERT INTO product_image VALUES (1, "/assets/products/product_1.webp", "MAIN", 1)');
    await queryRunner.query('INSERT INTO product_image VALUES (2, "/assets/products/product_2.webp", "MAIN", 2)');
    await queryRunner.query('INSERT INTO product_image VALUES (3, "/assets/products/product_3.webp", "MAIN", 3)');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
