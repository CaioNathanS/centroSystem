import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

import data from '../data.js';



import { generateToken, isAdmin, isAuth} from '../utils.js';

const userRouter = express.Router();

userRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
      // await User.remove({});
      const createdUsers = await User.insertMany(data.users);
      res.send({ createdUsers });
    })
  );

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
      
      
      const user = await User.findOne({ email: req.body.email } );
      const user2 = await User.findOne({ name: req.body.name } );
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            
            
            token: generateToken(user),
          });
          return;
        }
      }
      if (user2) {
        if (bcrypt.compareSync(req.body.password, user2.password)) {
          res.send({
            _id: user2._id,
            name: user2.name,
            isAdmin: user2.isAdmin,
            
            
            token: generateToken(user2),
          });
          return;
        }
      }
      res.status(401).send({ message: 'Email ou senha Inválidos' });
      
    })
  );

userRouter.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
      const createdUser = await user.save();
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        
        token: generateToken(createdUser),
      });
    })
  );

userRouter.get(
    '/',
    
    expressAsyncHandler(async (req, res) => {
      const users = await User.find({});
      res.send(users);
    })
  );

userRouter.get(
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

userRouter.delete(
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



export default userRouter;
