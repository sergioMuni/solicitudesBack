import {model, Schema} from 'mongoose';
import ISolicitudes from './Solicitudes_Interface';
const SolicitudesSchema = new Schema({
    tipoSolicitud: Number,
    solicitud:Object,
   
})
export default model<ISolicitudes>('modeloSolicitudes',SolicitudesSchema)