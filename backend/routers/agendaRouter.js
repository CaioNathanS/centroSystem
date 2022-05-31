import express from 'express';
import expressAsyncHandler from 'express-async-handler';



import data from '../data.js';



import { isAdmin, isAuth} from '../utils.js';
import Agenda from '../models/agenda.js';
import Velho from '../models/velho.js';

const agendaRouter = express.Router();

agendaRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
      // await Agenda.remove({});
      const createdAgenda = await Agenda.insertMany(data.agendas);
      res.send({ createdAgenda });
    })
  );

agendaRouter.get(
    '/list',
    
    expressAsyncHandler(async (req, res) => {
      
      const agenda = await Agenda.find();
      
      res.send( agenda )

    })
  );
agendaRouter.get(
    '/listAgendamento',
    
    expressAsyncHandler(async (req, res) => {
      
      const agenda = await Agenda.find().sort({'_id':-1});
      
      res.send( agenda )

    })
  );


agendaRouter.put(
    '/:id',
    isAuth,
    
    expressAsyncHandler(async (req, res) => {
      const agendaId = req.params.id;
      const agenda = await Agenda.findById(agendaId);
     
    })
  );

agendaRouter.post(
    '/novo',
    expressAsyncHandler(async (req, res) => {
      const velho = await Velho.find({"consulta":"true"});
      const agenda = new Agenda({
        diaData: req.body.diaData,
        velhos: velho,
        
    });
      const createdAgenda = await agenda.save();
      res.send({
        diaData: createdAgenda.diaData,
        velhos: createdAgenda.velhos,
      });
    })
  );



agendaRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const agenda = await Agenda.findById(req.params.id);
      if (agenda) {
        res.send(agenda);
      } else {
        res.status(404).send({ message: 'Não encontrado' });
      }
    })
  );
agendaRouter.delete(
  '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const agenda = await Agenda.findById(req.params.id);
     
        const deleteAgenda = await agenda.remove();
        res.send({ message: 'Agenda excluida', agenda: deleteAgenda });
      
    })
  );



export default agendaRouter;
