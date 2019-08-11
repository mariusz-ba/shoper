import { MigrationInterface, QueryRunner } from 'typeorm';

export class Defaults1564774145128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    // Insert default categories to database
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (1, "All", "All products", NULL, 1, 24)');
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (2, "Men", "Clothes for men", 1, 2, 17)');
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (3, "Clothes", "Clothes", 2, 3, 10)');
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (4, "Sweatshirts", "Sweatshirts for men", 3, 4, 5)');
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (5, "T-Shirts", "T-shirts for men", 3, 6, 7)');
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (6, "Pants", "Pants for men", 3, 8, 9)');
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (7, "Shoes", "Shoes for men", 2, 11, 16)');
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (8, "Running", "Running shoes", 7, 12, 13)');
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (9, "Lifestyle", "Lifestyle shoes", 7, 14, 15)');
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (10, "Women", "Clothes for women", 1, 18, 23)');
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (11, "Clothes", "Clothes", 10, 19, 22)');
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (12, "T-Shirts", "Clothes", 11, 20, 21)');

    // Insert default products to database
    // await queryRunner.query('INSERT INTO product VALUES (1, "Nike Air Max 97", 160.00, 7)');
    // await queryRunner.query('INSERT INTO product VALUES (2, "Nike Epic React", 125.00, 8)');
    // await queryRunner.query('INSERT INTO product VALUES (3, "Nike T-Shirt", 74.99, 11)');

    const prices = [39.99, 99.00, 150, 199.00];
    const categories = [4, 5, 6, 8, 9, 12];

    for (let i = 0; i < 300; ++i) {
      await queryRunner.query('INSERT INTO product (name, price, categoryId) VALUES (?, ?, ?)', [
        `Product ${i}`,
        prices[i % 4],
        categories[i % 6]
      ]);
    }

    // Insert default products variations to database
    await queryRunner.query('INSERT INTO product_variation VALUES (1, "S", "SIZE")');
    await queryRunner.query('INSERT INTO product_variation VALUES (2, "M", "SIZE")');
    await queryRunner.query('INSERT INTO product_variation VALUES (3, "L", "SIZE")');
    await queryRunner.query('INSERT INTO product_variation VALUES (4, "XL", "SIZE")');

    await queryRunner.query('INSERT INTO product_variation VALUES (5, "10 US", "SIZE")');
    await queryRunner.query('INSERT INTO product_variation VALUES (6, "10.5 US", "SIZE")');
    await queryRunner.query('INSERT INTO product_variation VALUES (7, "11 US", "SIZE")');

    // Many to many realation between product_variations and product
    // await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (1, 5)');
    // await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (1, 6)');
    // await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (1, 7)');

    // await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (2, 6)');
    // await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (2, 7)');

    
    for (let i = 0; i < 300; ++i) {
      await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (?, 1)', [i + 1]);
      await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (?, 2)', [i + 1]);
      await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (?, 3)', [i + 1]);
      await queryRunner.query('INSERT INTO product_variations_product_variation VALUES (?, 4)', [i + 1]);
    }

    // Insert default products images to database
    // await queryRunner.query('INSERT INTO product_image VALUES (1, "/assets/products/product_1.webp", "MAIN", 1)');
    // await queryRunner.query('INSERT INTO product_image VALUES (2, "/assets/products/product_2.webp", "MAIN", 2)');
    // await queryRunner.query('INSERT INTO product_image VALUES (3, "/assets/products/product_3.webp", "MAIN", 3)');
    const urls = [
      '/assets/products/product_1.webp',
      '/assets/products/product_2.webp',
      '/assets/products/product_3.webp'
    ];

    for (let i = 0; i < 300; ++i) {
      await queryRunner.query('INSERT INTO product_image (url, type, productId) VALUES (?, "MAIN", ?)', [urls[i % 3], i + 1]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
