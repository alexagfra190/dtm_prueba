import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey= process.env.OPENAI_API_KEY;
const client = new OpenAI({
  apiKey: apiKey, // This is the default and can be omitted
});

const completion = await client.chat.completions.create({
  model: 'gpt-4.1-mini-2025-04-14',
  messages: [
    { role: 'developer', content: 'Eres un experto en redes sociales.' },
    { role: 'user', content: 'Crea una publicacion para presentar mi pagina DTMOfertas' },
  ],
});

console.log(completion.choices[0].message.content);

/**
 * Función para realizar una petición POST al feed de Facebook
 * @param {string} message - El mensaje que se publicará en el feed
 * @returns {Promise} - Una promesa que resuelve con la respuesta de la API
 */
function postToFacebookFeed(message) {
    const url = 'https://graph.facebook.com/v22.0/386506691220240/feed';
    
    const data = {
      message: message,
      access_token: process.env.ACCES_TOKEN_META_APP // Reemplaza con tu token de acceso personal de Facebook
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