import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
	host: process.env.POSTGRES_HOST,
	port: process.env.POSTGRES_PORT,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	dialect: 'postgres',
});

export default sequelize;