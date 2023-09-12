import 'dotenv/config.js';
import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import path from 'path';
import sequelize from './db.js';
import * as models from './models/models.js';
import indexRouter from './routes/index.js';
import errorMiddleware from './middleware/error.middleware.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.SERVER_PORT || 5000;

console.log(path.resolve(__dirname, 'static'))

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(cors());
app.use(express.json());
app.use(fileUpload())

app.use('/api', indexRouter);

app.use(errorMiddleware);

const main = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();

		console.log('Connection has been established successfully.');

		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

main();