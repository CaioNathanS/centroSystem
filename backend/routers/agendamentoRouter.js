import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

import data from '../data.js';



import { isAdmin, isAuth} from '../utils.js';
import Agendamento from '../models/agendamento.js';
import Velho from '../models/velho.js';
import Agenda from '../models/agenda.js';

const agendamentoRouter = express.Router();

agendamentoRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
      // await Agendamento.remove({});
      const createdAgendamentos = await Agendamento.insertMany(data.agendamentos);
      res.send({ createdAgendamentos });
    })
  );

agendamentoRouter.get(
    '/list',
    
    expressAsyncHandler(async (req, res) => {
      
      const agendamento = await Agendamento.find();
      
      res.send(agendamento )

    })
  );

  agendamentoRouter.get(
    '/try',
    
    expressAsyncHandler(async (req, res) => {
      
      const [agenda] = await Agenda.find({"diaData":`22/10/1999`}).select('agendamentos');
      const a = agenda.agendamentos;
      const [b] = [{
        nome:'asd',
       email:'xml',
       nomeVelho:'pdc'
      }];
      const c = a.concat(b);

      
      
      res.send(c)

    })
  );
agendamentoRouter.delete(
    '/zerar',
    
    expressAsyncHandler(async (req, res) => {
      
      await Agendamento.remove({});

    })
);

agendamentoRouter.post(
    '/novo',
    expressAsyncHandler(async (req, res) => {
      const [velho] = await Velho.find({"nome":`${req.body.velho}`}).select('numFila medium');
      const agendamento = new Agendamento({
        name: req.body.name,
        email: req.body.email,
        velho:req.body.velho,
        numFila:velho.numFila+1,
        diaData:req.body.diaData,
    });
    const fila = await Velho.findById(velho._id);
      fila.numFila = velho.numFila + 1;

    const filaUpdate = await fila.save();
   
    const [agenda] = await Agenda.find({"diaData":`${req.body.diaData}`}).select('agendamentos');
    const agendamentos = agenda.agendamentos;
    const [novoAgendamento] = [{
      nome:req.body.name,
      email:req.body.email,
      nomeVelho:req.body.velho
    }];

    agenda.agendamentos = agendamentos.concat(novoAgendamento);

    
    const agendaUpdate = await agenda.save();


      const createdAgendamento = await agendamento.save();
      res.send({
        _id: createdAgendamento._id,
        name: createdAgendamento.name,
        email: createdAgendamento.email,
        velho:createdAgendamento.velho,
        medium:velho.medium,
        numFila:createdAgendamento.numFila,
        diaData:createdAgendamento.diaData,
        fila:filaUpdate.numFila,
        agendaUpdate:agendaUpdate.diaData,
    
      });
    })
  );


agendamentoRouter.get(
    '/',
    
    expressAsyncHandler(async (req, res) => {
      const users = await User.find({});
      res.send(users);
    })
  );

agendamentoRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );
agendamentoRouter.delete(
  '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        if (user.email === 'ademir@example.com') {
          res.status(400).send({ message: 'Não foi possível deleter' });
          return;
        }
        const deleteUser = await user.remove();
        res.send({ message: 'Usuário Deletado', user: deleteUser });
      } else {
        res.status(404).send({ message: 'Usário não encontrado' });
      }
    })
  );



export default agendamentoRouter;
