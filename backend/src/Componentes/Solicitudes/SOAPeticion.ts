const axios = require('axios')
const soaPeticion = async (datosBody) => {
    try {
    return await  axios.get("https://soa.sanjuan.gob.ar/persona/dni/restv1",{auth: {
        username: '20259383340.CUIT',
        password: 'mun1c1p10T3st'
      }, params:{
          sexo:datosBody.sexo,
          dni:datosBody.dni
      }})
    } catch (error) {
    console.error(error)
    }
    }
export default soaPeticion