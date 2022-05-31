import express from 'express';
import expressAsyncHandler from 'express-async-handler';



import data from '../data.js';



import { isAdmin, isAuth} from '../utils.js';
import Velho from '../models/velho.js';

const velhoRouter = express.Router();

velhoRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
      // await Velho.remove({});
      const createdVelhos = await Velho.insertMany(data.velhos);
      res.send({ createdVelhos });
    })
  );

velhoRouter.get(
    '/list',
    
    expressAsyncHandler(async (req, res) => {
      
      const velho = await Velho.find();
      
      res.send( velho )

    })
  );


velhoRouter.put(
    '/:id',
    isAuth,
    
    expressAsyncHandler(async (req, res) => {
      const velhoId = req.params.id;
      const velho = await Velho.findById(velhoId);
      if (velho) {
        
        velho.numFila = 0; 

        const updatedVelho = await velho.save();
        res.send( updatedVelho);
      } else {
        res.status(404).send({ message: 'Não encontrado' });
      }
    })
  );

velhoRouter.post(
    '/novo',
    expressAsyncHandler(async (req, res) => {
      const velho = new Velho({
        nome: req.body.nome,
        medium: req.body.medium,
        numFila:req.body.numFila,
        
    });
      const createdVelho = await velho.save();
      res.send({
        _id: createdVelho._id,
        nome: createdVelho.nome,
        medium: createdVelho.medium,
        numFila:createdVelho.numFila,
        vagas:createdVelho.vagas,
      });
    })
  );

velhoRouter.get(
    '/',
    
    expressAsyncHandler(async (req, res) => {
      const velho = await Velho.find({});
      res.send(velho);
    })
  );

velhoRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
      const velho = await Velho.findById(req.params.id);
      if (velho) {
        res.send(velho);
      } else {
        res.status(404).send({ message: 'Não encontrado' });
      }
    })
  );
velhoRouter.delete(
  '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const velho = await Velho.findById(req.params.id);
     
        const deleteVelho = await velho.remove();
        res.send({ message: 'Usuário Deletado', velho: deleteVelho });
      
    })
  );



export default velhoRouter;
