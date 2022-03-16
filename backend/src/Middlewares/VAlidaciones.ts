import bcrypt from 'bcrypt';
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import * as env from 'env-var';
import {Rol} from '../Config/enumeradores';

class Validaciones {
  hashearClave = (clave: string) => {
    let datos = bcrypt.hashSync(clave, 10);
    return datos;
  };

  compararClave = (claveUsuario: string, claveServidor: string) => {
    let resultado = bcrypt.compareSync(claveUsuario, claveServidor);
    return resultado;
  };

  generarToken = (datos: any) => {
    const token = jwt.sign({...datos}, env.get('TOKEN_SECRET').required().asString());
    return token;
  };

  validarToken = (req: Request, res: Response, next: NextFunction) => {
    let token = <string>req.headers['access-token'];
    if (!token) {
      throw new Error('SIN TOKEN');
    }

    jwt.verify(
      token,
      env.get('TOKEN_SECRET').required().asString(),
      function (err: any, decoded: any) {
        if (err) {
          res.status(403).json({message: 'TOKEN NO VALIDO'});
        } else {
          next();
        }
      }
    );
  };

  validarTokenAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.headers['access-token'];
    let datosToken: any = jwt.decode(token, {complete: true});
    if (token) {
      if (datosToken.payload) {
        if (datosToken.payload._doc && datosToken.payload._doc.rol === Rol.Administrador) {
          jwt.verify(
            token,
            env.get('TOKEN_SECRET').required().asString(),
            (err: any, decoded: any) => {
              if (err) {
                res.status(403).json({mensaje: 'TOKEN INVALIDO'});
              } else {
                next();
              }
            }
          );
        } else {
          res.status(403).json({mensaje: 'NO TIENE PERMISOS DE ADMINISTRADOR'});
        }
      } else {
        res.status(403).json({mensaje: 'TOKEN INVALIDO'});
      }
    } else {
      res.status(403).send({mensaje: 'SIN TOKEN'});
    }
  };
}

export const validaciones = new Validaciones();
