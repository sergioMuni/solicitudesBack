import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import {Request, Response, NextFunction} from 'express';
import formData from 'express-form-data';
import responder from './Middlewares/responder';
import db from './Config/database';
import Solicitudes_Router from './Componentes/Solicitudes/Solicitudes_Router';
// import {instalarBD} from './Config/instalacionInicial'; //TODO: esto va cuando se aplice las instalacione iniciales en la BD

///// VARIABLES DE ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'desarrollo';
class Server{
    public app: express.Application;
    private _cadenaDeConexion = process.env.DATABASE || 'mongodb://localhost:29017/BDCastastro';
    private options = {
      uploadDir: 'public/archivos/',
      autoClean: true,
    };
    constructor() {
        this.app = express();
        this.conectarBd();
        this.configurar();
        this.routear();
      }
      configurar() {
        this.app.set('port', process.env.PORT || 4500);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(formData.parse(this.options));
        this.app.use(formData.union());
        this.app.use(express.static('public'));
      }
      conectarBd() {
        setTimeout(() => {
          db;
        }, 3000);
      }
      routear() {
        //Rutas Basicas
        this.app.get('/', (req: Request, res: Response) => {
          res.send('Server iniciado');
        });
    
        this.app.get('/instalar', (req: Request, res: Response) => {
          console.log('Instalando datos iniciales...');
          //TODO: esto va cuando se aplice las instalacione iniciales en la BD
          // instalarBD()
          //   .then((value: any) => {
          //     if (value) {
          //       res.status(200).send('Inserción de datos correcta');
          //     } else {
          //       res.status(400).send('BD ya instalada');
          //     }
          //   })
          //   .catch((error: any) => {
          //     console.log(error);
          //     res.status(500).send('Error interno de servidor');
          //   });
        });
        
        //TODO:Aca van las rutas que valla agregando ejemplo this.app.use('/usuarios', usuariosRouter);
        this.app.use('/solicitudes',Solicitudes_Router);
        this.app.get('*', (req: Request, res: Response) => {
          console.info(`GET 404: ${req.originalUrl}`);
          responder.noEncontrado(req, res);
        });
      }
      iniciar() {
        this.app.listen(this.app.get('port'), () => {
          console.log(
            `⚡️[LICITACIONES]: El Servidor de ${process.env.NODE_ENV} esta corriendo en el puerto ${process.env.PORT}`
          );
        });
      }
}
const SERVER = new Server();
SERVER.iniciar();
process.on('uncaughtException', function (err) {
    console.log('Error atrapado: ' + err);
  });