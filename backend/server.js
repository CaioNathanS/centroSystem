import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';




import dotenv from 'dotenv';
import path from 'path';
import agendamentoRouter from './routers/agendamentoRouter.js';
import velhoRouter from './routers/velhoRouter.js';
import agendaRouter from './routers/agendaRouter.js';
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/centroSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify:false,
});

app.use('/api/users', userRouter);
app.use('/api/agendamento', agendamentoRouter);
app.use('/api/velho',velhoRouter);
app.use('/api/agenda',agendaRouter);



const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });



app.get('/', (req, res) => {
  res.send('Server is ready');
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});





