import mongoose from 'mongoose';

const agendamentoSchema = new mongoose.Schema(
  {
    diaData:{type: String, required: true},
    velho:{ type: String, required: true }, 
    name: { type: String, required: true },
    email: { type: String, required: true },
    numFila: { type: Number, required: true},
    preferencial: { type: Boolean, default: false}
    
  },
  {
    timestamps: true,
  }
);
const Agendamento = mongoose.model('Agendamento', agendamentoSchema);
export default Agendamento;