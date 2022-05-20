import mongoose from 'mongoose';

const agendaSchema = new mongoose.Schema(
  {
    diaData:{type: String},
    velhos:[{
        name:{type:String},
        medium:{type:String},
    },
    ],
    agendamentos:[{
        nome:{type:String},
        email:{type:String},
        nomeVelho:{type:String},
    },
    ],
    aberto: { type: Boolean, default: true},
    countAgendamentos:{type:Number},
    filaTotal:{type:Number}
  },
  {
    timestamps: true,
  }
);
const Agenda = mongoose.model('Agenda', agendaSchema);
export default Agenda;