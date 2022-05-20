import mongoose from 'mongoose';

const velhoSchema = new mongoose.Schema(
  {
    nome:{type: String, required: true},
    medium:{ type: String, required: true }, 
    numFila: { type: Number, required: true},
    consulta:{type: Boolean, default: true, required:true }
  },
  {
    timestamps: true,
  }
);
const Velho = mongoose.model('Velho', velhoSchema);
export default Velho;