import {Request, Response} from 'express';
import modeloSolicitudes from './Solicitudes_Model'
import ISolicitudes from './Solicitudes_Interface';
import responder from '../../Middlewares/responder';
import {Estado, Rol} from '../../Config/enumeradores'
import soaPeticion from './SOAPeticion';

class SoliciudesController {
    public async agregar(req:Request, res:Response){
        try{
            const datosBody = req.body;
            if (!datosBody) {
                throw new Error('No se ingresaron datos');
            }else{
                if(datosBody.solicitud && datosBody.tipoSolicitud){
                    const nuevaSolicitud: ISolicitudes = new modeloSolicitudes(datosBody);
                    const op = await nuevaSolicitud.save();
                    if (op) {
                        responder.sucess(req, res, op, 'Solicitud agregada', 200);
                      } else {
                        responder.error(req, res, '', 'Ocurrio un error al intentar agregar la solicitud');
                      }
                }else{
                    responder.error(req, res, '', 'Debe ingresar solicitud y tipoSolicitud', 400);
                }
            }
        }catch(error){
            console.log(error);
            responder.error(req, res);
        }
    }
    public async listar(req: Request, res: Response){
        try{
            let listaSolcitudes: any;
            modeloSolicitudes
            .find()
            .then(async (solicitudes: any) => {
                if (solicitudes && solicitudes.length) {
                    listaSolcitudes = [...solicitudes];
                    responder.sucess(req, res, listaSolcitudes);
                  } else {
                    responder.error(req, res, '', 'No hay pedidos para listar', 204);
                  }
            })
        }catch(error){
            console.log(error);
            responder.error(req, res);
        }
    }
    public async soapSJ(req:Request, res:Response){
        try{
            const datosBody = req.body;
            console.log(datosBody);
            if (!datosBody) {
                throw new Error('No se ingresaron datos');
            }else{
                const resultado = await soaPeticion(datosBody)
                console.log("RESULTADO")
                
                if(resultado){
                    console.log(resultado)
                    responder.sucess(req, res, resultado.data, 'ok', 200);
                }else{
                    responder.error(req, res, '', 'false', 204);
                }
                  
            }
        }catch(error){
            console.log(error);
            responder.error(req, res);
        }
    }
}
export const solicitudController = new SoliciudesController();