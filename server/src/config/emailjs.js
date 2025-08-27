import emailjs from '@emailjs/nodejs';

// config for emailjs
emailjs.init({
  publicKey: process.env.EMAIlJS_PUBLIC_KEY,
  privateKey: process.env.EMAIlJS_PRIVATE_KEY,
});


