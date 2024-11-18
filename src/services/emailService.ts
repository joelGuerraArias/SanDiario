import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('YOUR_PUBLIC_KEY');

const SERVICE_ID = 'service_sandiario';
const WELCOME_TEMPLATE = 'template_welcome';
const NUMBER_TEMPLATE = 'template_number_selection';

interface EmailParams {
  to_email: string;
  to_name: string;
  number?: number;
}

export const sendWelcomeEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      WELCOME_TEMPLATE,
      {
        to_email: params.to_email,
        to_name: params.to_name,
      }
    );
    
    if (response.status === 200) {
      console.log('Welcome email sent successfully');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

export const sendNumberSelectionEmail = async (params: EmailParams): Promise<boolean> => {
  if (!params.number) return false;
  
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      NUMBER_TEMPLATE,
      {
        to_email: params.to_email,
        to_name: params.to_name,
        selected_number: params.number,
      }
    );
    
    if (response.status === 200) {
      console.log('Number selection email sent successfully');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error sending number selection email:', error);
    return false;
  }
};