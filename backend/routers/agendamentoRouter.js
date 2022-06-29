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

  agendamentoRouter.delete(
    '/zerar',
    expressAsyncHandler(async (req, res) => {
      await Agendamento.remove({});
      await Velho.updateMany({"consulta":"true"},{"numFila":0,"agendamentos":[],"vagasPreferenciais":5,"vagas":10});
      
      res.send();
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
    '/listvelho/:velho',
    
    expressAsyncHandler(async (req, res) => {
      const velho = req.params.velho;
      var fila = []
      var numeros = [
        {status:'disponivel',numero:1},
        {status:'disponivel',numero:2},
        {status:'disponivel',numero:3},
        {status:'disponivel',numero:4},
        {status:'disponivel',numero:5},
        {status:'disponivel',numero:6},
        {status:'disponivel',numero:7},
        {status:'disponivel',numero:8},
        {status:'disponivel',numero:9},
        {status:'disponivel',numero:10},      
      ];
      const agendamento = await Agendamento.find({"velho":velho}).select('numFila');
      var i;
      for(i=0;i<=9;i++){
        if(agendamento[i]){
          var n;
          for(n=0;n<=9;n++){
            if(agendamento[i].numFila === n & agendamento[i].numFila !== 0){
              numeros.splice(n-1,1,{status:'indisponivel',numero:n})
            }
          }  
        }
      }
     

  
    
      res.send(numeros)
      

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
agendamentoRouter.get(
    '/total',
    
    expressAsyncHandler(async (req, res) => {

      const totalAgendamentos = await Agendamento.countDocuments();   
      res.send([totalAgendamentos]);

    })
);

agendamentoRouter.get(
  '/preferencial',
  
  expressAsyncHandler(async (req, res) => {

    const preferencial = await Agendamento.countDocuments({"preferencial":"true"});   
    res.send([preferencial]);

  })
);

agendamentoRouter.get(
  '/dia',
  
  expressAsyncHandler(async (req, res) => {

    const agendamentoDia = await Agendamento.find({"diaData":`${req.body.diaData}`}); 
    res.send(agendamentoDia);

  })
);

agendamentoRouter.post(
    '/novo',
    expressAsyncHandler(async (req, res) => {
      const [velho] = await Velho.find({"nome":`${req.body.velho}`}).select('numFila medium agendamentos vagas');
      const velhoAgenda = velho.agendamentos;
      const velhoVagas = velho.vagas;
      if(velhoVagas>0 & req.body.numFila !== null){
        const agendamento = new Agendamento({
          name: req.body.name,
          email: req.body.email,
          velho:req.body.velho,
          numFila:req.body.numFila,
          diaData:req.body.diaData,
          preferencial:req.body.preferencial,
      });

    
   
    const [agenda] = await Agenda.find({"diaData":`${req.body.diaData}`}).select('agendamentos');
    const agendamentos = agenda.agendamentos;
    const [novoAgendamento] = [{
      nome:req.body.name,
      email:req.body.email,
      nomeVelho:req.body.velho,
      numFila:req.body.numFila,
      preferencial:req.body.preferencial,
      diaData:req.body.diaData,
    }];

    

    agenda.agendamentos = agendamentos.concat(novoAgendamento);
    velho.agendamentos = velhoAgenda.concat(novoAgendamento);
    velho.vagas = (velhoVagas - 1) ;

    const velhoUpdate = await velho.save();
    
    const agendaUpdate = await agenda.save();


      const createdAgendamento = await agendamento.save();
      res.send({
        _id: createdAgendamento._id,
        name: createdAgendamento.name,
        email: createdAgendamento.email,
        velho:createdAgendamento.velho,
        medium:velho.medium,
        preferencial:createdAgendamento.preferencial,
        numFila:createdAgendamento.numFila,
        diaData:createdAgendamento.diaData,
        agendaUpdate:agendaUpdate.diaData,
        velho:velhoUpdate.agendamento,
        vagas:velhoUpdate.vagas,
    
      });

      }else{
        res.status(404).send({ message: 'Limite de Vagas Atingido' });
      }
      
    })
  );

  agendamentoRouter.post(
    '/novopref',
    expressAsyncHandler(async (req, res) => {
      const [velho] = await Velho.find({"nome":`${req.body.velho}`}).select('vagasPreferenciais medium agendamentos');
      const velhoAgenda = velho.agendamentos;
      const velhoVagas = velho.vagasPreferenciais;
      if(velhoVagas>0){
        const agendamento = new Agendamento({
          name: req.body.name,
          email: req.body.email,
          velho:req.body.velho,
          numFila:req.body.numFila,
          diaData:req.body.diaData,
          preferencial:true,
      });

    
   
    const [agenda] = await Agenda.find({"diaData":`${req.body.diaData}`}).select('agendamentos');
    const agendamentos = agenda.agendamentos;
    const [novoAgendamento] = [{
      nome:req.body.name,
      email:req.body.email,
      nomeVelho:req.body.velho,
      numFila:0,
      preferencial:true,
      diaData:req.body.diaData,
    }];

    

    agenda.agendamentos = agendamentos.concat(novoAgendamento);
    velho.agendamentos = velhoAgenda.concat(novoAgendamento);
    velho.vagasPreferenciais = (velhoVagas - 1) ;

    const velhoUpdate = await velho.save();
    
    const agendaUpdate = await agenda.save();


      const createdAgendamento = await agendamento.save();
      res.send({
        _id: createdAgendamento._id,
        name: createdAgendamento.name,
        email: createdAgendamento.email,
        velho:createdAgendamento.velho,
        medium:velho.medium,
        preferencial:createdAgendamento.preferencial,
        numFila:createdAgendamento.numFila,
        diaData:createdAgendamento.diaData,
        agendaUpdate:agendaUpdate.diaData,
        velho:velhoUpdate.agendamento,
        vagas:velhoUpdate.vagasPreferenciais,
    
      });

      }else{
        res.status(404).send({ message: 'Limite de Vagas Preferenciais Atingido' });
      }
      
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
