const sendEmail = async (to, subject, text) => {
  if (!process.env.BREVO_API_KEY || !process.env.EMAIL_FROM) {
    throw new Error('BREVO_API_KEY and EMAIL_FROM are required');
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: process.env.EMAIL_FROM_NAME || 'ShopNest',
        email: process.env.EMAIL_FROM,
      },
      to: [{ email: to }],
      subject,
      textContent: text,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Brevo API error ${response.status}: ${details}`);
  }

  console.log(`Email successfully sent to ${to}`);
  return response.json();
};

module.exports = sendEmail;