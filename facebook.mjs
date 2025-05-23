/**
 * Función para realizar una petición POST al feed de Facebook
 * @param {string} message - El mensaje que se publicará en el feed
 * @returns {Promise} - Una promesa que resuelve con la respuesta de la API
 */
import dotenv from 'dotenv';

dotenv.config();

const ACCES_TOKEN_META_APP = process.env.FACEBOOK_ACCESS_TOKEN;
const FB_PAGE_ID = process.env.FB_PAGE_ID;
const IG_PAGE_ID = process.env.IG_PAGE_ID;

function postToFacebookFeed(message) {
    console.log(FB_PAGE_ID);
    console.log(IG_PAGE_ID);
    // const url = 'https://graph.facebook.com/v22.0/386506691220240/feed';
    // const url = 'https://graph.facebook.com/v22.0/'+FB_PAGE_ID+'/photos';
    const url = 'https://graph.facebook.com/v22.0/'+FB_PAGE_ID+'/feed';
    
    const data = {
      message: message,
    //   url:"https://media.istockphoto.com/id/1414159406/es/vector/multicolor-abstracto-rojo-naranja-verde-p%C3%BArpura-amarillo-colorido-ondulado-papelcut.jpg?s=612x612&w=0&k=20&c=UNjQErYytEZGkh72OyyN0XvryBi_G7_NUmQGwmK34jg=",
      access_token: ACCES_TOKEN_META_APP // Reemplaza con tu token de acceso personal de Facebook
    };
    
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error al publicar en Facebook:', error);
      throw error;
    });
  }

  postToFacebookFeed('Hola mundo') // Ejemplo de us