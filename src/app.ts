import express from 'express';
import router from './interfaces/routes/userroutes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);


export default app;