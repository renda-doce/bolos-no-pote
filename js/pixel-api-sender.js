// Exemplo de integração JavaScript
const PIXEL_ID = '5d82a300-a335-474b-93f1-093bb154fb44';
const API_URL = 'https://njsxezhedrldrfrowpml.supabase.co/functions/v1/meta-conversion';

async function sendEvent(eventName, userData = {}) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-pixel-id': PIXEL_ID,
        'x-origin': window.location.origin
      },
      body: JSON.stringify({
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data: userData,
        custom_data: {
          currency: 'BRL',
          value: 3.00
        }
      })
    });

    const result = await response.json();
    console.log('Evento enviado:', result);
    return result;
  } catch (error) {
    console.error('Erro ao enviar evento:', error);
    throw error;
  }
}



document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-cta')
    .forEach(btn => {
      btn.addEventListener('click', () => {
        sendInitiateCheckout();
      });
    });
});


async function sendInitiateCheckout() {
  sendEvent('InitiateCheckout', {
    client_user_agent: navigator.userAgent,
    fbp: getCookie('_fbp'), // Cookie do Facebook Pixel
    fbc: getCookie('_fbc')  // Cookie do Facebook Click
  });
}


