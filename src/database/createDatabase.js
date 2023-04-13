import pgtools from 'pgtools';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
};

pgtools.createdb(config, process.env.DB_NAME, function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log('Banco de dados toto criado com sucesso!');
});
