import {Router} from 'express';
import { solicitudController } from './Solicitudes_Controller';
const router: Router = Router();
class SolicitudesRouter {
    router:Router;
    constructor(){
        this.router = router;
        this.routes();
    }
    routes(){
        this.router.post('/agregar', solicitudController.agregar);
        this.router.get('/listar', solicitudController.listar);
        this.router.post('/SOA',solicitudController.soapSJ)
    }
}
const solicitudRouter = new SolicitudesRouter();
export default solicitudRouter.router;