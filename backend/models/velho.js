import mongoose from 'mongoose';

const velhoSchema = new mongoose.Schema(
  {
    nome:{type: String, required: true},
    medium:{ type: String, required: true }, 
    numFila: { type: Number, required: true,default: 0},
    vagas: { type: Number, required: true, default: 10},
    vagasPreferenciais: { type: Number, required: true, default: 5},
    consulta:{type: Boolean, default: true, required:true },
    agendamentos:[{
      nome:{type:String},
      email:{type:String},
      nomeVelho:{type:String},
      numFila:{type:Number},
      preferencial:{type: Boolean},
      diaData:{type:String},
  },
  ],
  },
  {
    timestamps: true,
  }
);
const Velho = mongoose.model('Velho', velhoSchema);
export default Velho;