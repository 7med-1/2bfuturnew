import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';

// route imports
import dashboardRoutes from './routes/dashboardRoutes';
import piecesRoutes from './routes/pieceRoutes';

// configs
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use('/dashboard', dashboardRoutes);
app.use('/pieces', piecesRoutes);

// server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server on port ${port}`);
});
