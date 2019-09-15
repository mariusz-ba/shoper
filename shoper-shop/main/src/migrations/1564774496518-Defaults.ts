import { MigrationInterface, QueryRunner } from 'typeorm';

export class Defaults1564774145128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    // Insert default categories to database
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (1, "All", "All products", NULL, 1, 32)');
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
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (13, "Kids", "Clothes for kids", 1, 24, 27)');
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (14, "Clothes", "Clothes", 13, 25, 26)');
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (15, "Equipment", "Equipment", 1, 28, 31)');
    await queryRunner.query('INSERT INTO category (id, name, description, parentId, nsleft, nsright) VALUES (16, "Accessories", "Accessories", 15, 29, 30)');

    const prices = [3999, 9900, 15000, 19900]; // Price in cents
    const categories = [4, 5, 6, 8, 9, 12];

    for (let i = 0; i < 300; ++i) {
      await queryRunner.query('INSERT INTO product (name, price, categoryId) VALUES (?, ?, ?)', [
        `Product ${i}`,
        prices[i % 4],
        categories[i % 6]
      ]);
    }

    // // Insert default products variations to database
    await queryRunner.query('INSERT INTO product_variation VALUES (1, "S", "SIZE")');
    await queryRunner.query('INSERT INTO product_variation VALUES (2, "M", "SIZE")');
    await queryRunner.query('INSERT INTO product_variation VALUES (3, "L", "SIZE")');
    await queryRunner.query('INSERT INTO product_variation VALUES (4, "XL", "SIZE")');

    await queryRunner.query('INSERT INTO product_variation VALUES (5, "10 US", "SIZE")');
    await queryRunner.query('INSERT INTO product_variation VALUES (6, "10.5 US", "SIZE")');
    await queryRunner.query('INSERT INTO product_variation VALUES (7, "11 US", "SIZE")');

    // Insert default products images to database
    const urls = [
      '/assets/products/product_1.webp',
      '/assets/products/product_2.webp',
      '/assets/products/product_3.webp'
    ];

    for (let i = 0; i < 300; ++i) {
      await queryRunner.query('INSERT INTO product_image (url, type, productId) VALUES (?, "MAIN", ?)', [urls[i % 3], i + 1]);
    }

    // Insert available products
    for (let i = 0; i < 300; ++i) {
      for (let j = 0; j < 4; ++j) {
        await queryRunner.query(
          'INSERT INTO stock (amount, productId, variationId) VALUES (?, ?, ?)',
          [
            (i % 4) * (i + 1),
            i + 1,
            j + 1
          ]
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
