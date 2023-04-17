import connection from './connection.js';

async function seed() {
  try {
    const queryInsertProducts = `
      INSERT INTO products (name, price, description, image) VALUES
      ('Pizza de Marguerita', 60.00, 'Muçarela, tomate, majericão, orégano', 'pizza.png'),
      ('Torta de Leite Ninho', 70.00, 'Massa de Baunilha; Creme de ninho Tradicional; Morango; Chantilly', 'torta.png'),
      ('Lanche X-Burguer', 22.00, 'Pão, hamburguer, alface, tomate, queijo cheddar, cebola e picles', 'x-burguer.png'),
      ('Pizza de Strogonofe', 65.00, 'Strogonofe, muçarela e orégano', 'pizza-Strogonofe.png'),
      ('Açaí com frutas', 17.00, 'Açaí, banana, morango, uva, leite ninho em pó e leite condensado', 'açaí.png'),
      ('Refrigerante Coca-Cola 350ml', 6.00, null, 'coca-cola.png'),
      ('Taça de sonho de valsa', 15.00, 'Taça de sonho de valsa', 'milkshake.png'),
      ('Barca de Açaí', 22.00, 'Açaí, banana, morango, uva, leite ninho em pó e leite condensado', 'barca-açaí.png');
    `;

    await connection.query('BEGIN');
    await connection.query(queryInsertProducts);
    await connection.query('COMMIT');

    console.log('Seed executado com sucesso!');
  } catch (err) {
    console.error('Erro ao criar as tabelas', err.stack);
    await connection.query('ROLLBACK');
  } finally {
    await connection.end();
  }
}

seed();
