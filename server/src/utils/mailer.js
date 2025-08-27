import emailjs from "@emailjs/nodejs";
const domain = process.env.SERVERURL || "http://localhost:8000";

// send account confirmation link
export const sendConfirmationLink = async (email, userId) => {
  try {
    emailjs.send("service_nrqdptm", "template_mvn8ru9", {
      email,
      link: `${domain}/api/v1/user/confirm-signup/${userId}`,
    });
  } catch (err) {
    console.log(err);
  }
};


// send account confirmation link
export const sendOtpMail = async (email, otp) => {
  try {
    emailjs.send("service_nrqdptm", "template_yzuxbde", {
      email,
      passcode: otp,
    });
  } catch (err) {
    console.log(err);
  }
};
