const sgMail = require("@sendgrid/mail");
const sendgridAPIKey =
  "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";

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (name, email) => {
  sgMail.send({
    to: email,
    from: "mwisemarierose@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}, Let me know how you get along to the app`,
  });
};

const sendCancelationEmail = (name, email) => {
  sgMail.send({
    to: email,
    from: "mwisemarierose@gmail.com",
    subject: "Sorry to see you go.",
    text: `Goodbye ${name}. Is the anything we would have done to keep you on board?`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
