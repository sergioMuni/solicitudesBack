import {Document} from 'mongoose';
export default interface ISolicitudes extends Document{
    _id: string;
    tipoSolicitud: number;
    solicitud:Object;
    
}