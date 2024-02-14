import sgMail from '@sendgrid/mail'

const { SENDGRID_API_KEY } = process.env;

const handler = async function (event) {
  // get data from body
  const { name, email, message } = JSON.parse(event.body);

  // set API key
  sgMail.setApiKey(SENDGRID_API_KEY);

  // setup data for email
  // NOTE: THIS IS NOT SECURE. YOU NEED TO SANITIZE THE INPUTS
  const data = {
    to: 'info@avenirvision.hu', // Change to your recipient (your email in this case)
    from: 'info@avenirvision.hu', // Change to your verified sender
    subject: `Új üzenet tőle: ${name} (${email})`,
    html: `<p>${message}</p>`,
  };

  try {
    await sgMail.send(data);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msg: 'Message sent successfully',
      }),
    };
  } catch (err) {
    return {
      statusCode: err.code,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg: err.message }),
    };
  }
};

export { handler };
