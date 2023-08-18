const nodemailer = require('nodemailer');
require('dotenv').config()


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.SMTP_USER}`,
    pass: `${process.env.SMTP_PASSWORD}`
  },
  tls: { rejectUnauthorized: false }, 
});



async function welcomeMail(userEmail){
  // setup email data
  let mailOptions = {
    from: `${process.env.SMTP_USER}`,
    to: `${userEmail}`,
    subject: 'Welcome!',
    html: `
    <!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Welcome To Pharmedore!</title>
      <style>
        body, table, td, div, p, a {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
    
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f4f4f4 !important;
        }
    
        /* Add CSS styles inline */
        .header {
          background-color: #031C6E !important;
          padding: 20px;
          text-align: center;
        }
    
        .logo {
          max-width: 150px;
          height: auto;
        }
            
        .greeting {
          font-size: 26px !important; 
          font-weight: 500 !important;
          letter-spacing: -1.5px !important;
          word-spacing: 3px !important;
          color: #333333;
          margin-bottom: 20px;
        }
    
        .content {
          background-color: #ffffff;
          padding: 40px 20px;
        }
    
        .message {
          margin-bottom: 20px;
          line-height: 1.5;
        }
    
        .cta-button {
          display: inline-block;
          width: 100%;
          max-width: 220px;
          background-color: #031C6E !important;
          color: #fafafa !important;
          font-size: 16px !important;
          font-weight: 500 !important;
          text-align: center;
          padding: 18px;
          text-decoration: none !important;
          margin-bottom: 20px;
        }
    
        .footer {
          background-color: #031C6E !important;
          padding: 20px;
          text-align: center;
        }
    
        .footer-logo {
          max-width: 100px;
          height: auto;
          margin-bottom: 10px;
        }
    
        .footer-message {
          font-size: 12px;
          color: #fafafa !important;
          margin-bottom: 10px;
        }
      </style>
    </head>
    
    <body>
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <table width="600" cellspacing="0" cellpadding="0">
              <tr>
                <td class="header">
                  <img class="logo" src="https://bit.ly/3Ol5qoT" alt="Pharmedore Logo">
                </td>
              </tr>
              <tr>
                <td class="content">
                  <h1 class="greeting">Welcome to Pharmedore</h1>
                  <p class="message">Hello dear</p>
                  <p class="message">You have successfully created an account with Pharmedore. You can explore medications, customize shipping and payment information. Finally, accessibility for medications and medical professionals is easier.</p>
                  <a class="cta-button" href="https://pharmedore.vercel.app">Get Started</a>
                  <p class="message">If you have any questions or need assistance, feel free to reach out to our support team at support@pharmedore.com.</p>
                  <p class="message">Best regards,</p>
                  <p class="message">The Pharmedore Team</p>
                </td>
              </tr>
              <tr>
                <td class="footer">
                  <img class="footer-logo" src="https://bit.ly/3Ol5qoT" alt="Pharmedore Logo">
                  <p class="footer-message"> 2501 Bill Moses Parkway, Farmers Branch, 75234 Texas | +1(431) 023 9876</p>
                  <p class="footer-message">© 2023 Pharmedore Company | All Rights Reserved</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
  };
  
  
  let info = await transporter.sendMail(mailOptions)
  console.log("Message sent: %s", info.messageId);

}



async function verifyMail(userEmail, accountType){
  // setup email data
  let mailOptions = {
    from: `${process.env.SMTP_USER}`,
    to: `${userEmail}`,
    subject: 'Verify Your Email!',
    html: `
    <!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Verify Your Email</title>
      <style>
        body, table, td, div, p, a {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
    
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f4f4f4 !important;
        }
    
        /* Add CSS styles inline */
        .header {
          background-color: #031C6E !important;
          padding: 20px;
          text-align: center;
        }
    
        .logo {
          max-width: 150px;
          height: auto;
        }
    
        .content {
          background-color: #ffffff;
          padding: 40px 20px;
        }
    
        .message {
          margin-bottom: 20px;
          line-height: 1.5;
        }
    
        .cta-button {
          display: inline-block;
          width: 100%;
          max-width: 220px;
          background-color: #031C6E !important;
          color: #fafafa !important;
          font-size: 16px !important;
          font-weight: 500 !important;
          text-align: center;
          padding: 18px;
          text-decoration: none !important;
          margin-bottom: 20px;
        }
    
        .footer {
          background-color: #031C6E !important;
          padding: 20px;
          text-align: center;
        }
    
        .footer-logo {
          max-width: 100px;
          height: auto;
          margin-bottom: 10px;
        }
    
        .footer-message {
          font-size: 12px;
          color: #fafafa !important;
          margin-bottom: 10px;
        }
      </style>
    </head>
    
    <body>
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <table width="600" cellspacing="0" cellpadding="0">
              <tr>
                <td class="header">
                  <img class="logo" src="https://bit.ly/3Ol5qoT" alt="Pharmedore Logo">
                </td>
              </tr>
              <tr>
                <td class="content">
                  <p class="message">We're thrilled to have you as part of our community. At Pharmedore, we are dedicated to providing the best services and support to our customers.</p>
                  <p class="message">At Pharmedore, we take your security and privacy very seriously. We require all users to verify their email address before they can use their account.</p>
                  <a class="cta-button" href="https://pharmedore.vercel.app/verify/${accountType}/${userEmail}">Verify Your Email</a>
                  <p class="message">If you have any questions or need assistance, feel free to reach out to our support team at support@pharmedore.com.</p>
                  <p class="message">Best regards,</p>
                  <p class="message">The Pharmedore Team</p>
                </td>
              </tr>
              <tr>
                <td class="footer">
                  <img class="footer-logo" src="https://bit.ly/3Ol5qoT" alt="Pharmedore Logo">
                  <p class="footer-message"> 2501 Bill Moses Parkway, Farmers Branch, 75234 Texas | +1(431) 023 9876</p>
                  <p class="footer-message">© 2023 Pharmedore Company | All Rights Reserved</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
  };
  
  
  let info = await transporter.sendMail(mailOptions)
  console.log("Message sent: %s", info.messageId);

}



// Password reset mail
function passwordReset(userEmail){
  // setup email data
  let mailOptions = {
    from: `${process.env.SMTP_USER}`,
    to: `${userEmail}`,
    subject: 'Password Reset!',
    html: `
    <!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Password Reset!</title>
      <style>
        body, table, td, div, p, a {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
    
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f4f4f4 !important;
        }
    
        /* Add CSS styles inline */
        .header {
          background-color: #031C6E !important;
          padding: 20px;
          text-align: center;
        }
    
        .logo {
          max-width: 150px;
          height: auto;
        }
    
        .content {
          background-color: #ffffff;
          padding: 40px 20px;
        }
    
        .message {
          margin-bottom: 20px;
          line-height: 1.5;
        }
    
        .cta-button {
          display: inline-block;
          width: 100%;
          max-width: 220px;
          background-color: #031C6E !important;
          color: #fafafa !important;
          font-size: 16px !important;
          font-weight: 500 !important;
          text-align: center;
          padding: 18px;
          text-decoration: none !important;
          margin-bottom: 20px;
        }
    
        .footer {
          background-color: #031C6E !important;
          padding: 20px;
          text-align: center;
        }
    
        .footer-logo {
          max-width: 100px;
          height: auto;
          margin-bottom: 10px;
        }
    
        .footer-message {
          font-size: 12px;
          color: #fafafa !important;
          margin-bottom: 10px;
        }
      </style>
    </head>
    
    <body>
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <table width="600" cellspacing="0" cellpadding="0">
              <tr>
                <td class="header">
                  <img class="logo" src="https://bit.ly/3Ol5qoT" alt="Pharmedore Logo">
                </td>
              </tr>
              <tr>
                <td class="content">
                  <p class="message">Hello</p>
                  <p class="message">A request was sent for password reset, if this wasn't you please contact our customer service. Click the reset link below to proceed</p>
                  <a class="cta-button" href="http://localhost:3000/forgot-password/newPassword">Reset Password</a>
                  <p class="message">If you have any questions or need assistance, feel free to reach out to our support team at support@pharmedore.com.</p>
                  <p class="message">Best regards,</p>
                  <p class="message">The Pharmedore Team</p>
                </td>
              </tr>
              <tr>
                <td class="footer">
                  <img class="footer-logo" src="https://bit.ly/3Ol5qoT" alt="Pharmedore Logo">
                  <p class="footer-message"> 2501 Bill Moses Parkway, Farmers Branch, 75234 Texas | +1(431) 023 9876</p>
                  <p class="footer-message">© 2023 Pharmedore Company | All Rights Reserved</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
};


let info = transporter.sendMail(mailOptions)
console.log("Message sent: %s", info.messageId);

}



// Alert Admin! mail
function alertAdmin(){
  // setup email data
  let mailOptions = {
    from: `${process.env.SMTP_USER}`,
    to: `support@pharmedore.com`,
    subject: 'Alert Admin!',
    html: `
    `,
};
let info = transporter.sendMail(mailOptions)
console.log("Message sent: %s", info.messageId);

}



// send otp mail
function otpMail(userEmail, otp){
  // setup email data
  let mailOptions = {
    from: `${process.env.SMTP_USER}`,
    to: `${userEmail}`,
    subject: 'Verify Login!',
    html: `
    <!DOCTYPE html>
    <html>

    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Verify Login!</title>
      <style>
        body, table, td, div, p, a {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f4f4f4 !important;
        }

        /* Add CSS styles inline */
        .header {
          background-color: #031C6E !important;
          padding: 20px;
          text-align: center;
        }

        .logo {
          max-width: 150px;
          height: auto;
        }

        .content {
          background-color: #ffffff;
          padding: 40px 20px;
        }

        .message {
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .message-otp {
          margin-bottom: 20px;
          font-size: 22px !important;
          font-weight: 600 !important;
          color: #031C6E !important;
          letter-spacing: 2px !important;
        }

        .cta-button {
          display: inline-block;
          width: 100%;
          max-width: 220px;
          background-color: #031C6E !important;
          color: #fafafa !important;
          font-size: 16px !important;
          font-weight: 500 !important;
          text-align: center;
          padding: 18px;
          text-decoration: none !important;
          margin-bottom: 20px;
        }

        .footer {
          background-color: #031C6E !important;
          padding: 20px;
          text-align: center;
        }

        .footer-logo {
          max-width: 100px;
          height: auto;
          margin-bottom: 10px;
        }

        .footer-message {
          font-size: 12px;
          color: #fafafa !important;
          margin-bottom: 10px;
        }
      </style>
    </head>

    <body>
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <table width="600" cellspacing="0" cellpadding="0">
              <tr>
                <td class="header">
                  <img class="logo" src="https://bit.ly/3Ol5qoT" alt="Pharmedore Logo">
                </td>
              </tr>
              <tr>
                <td class="content">
                  <p class="message">Hello</p>
                  <p class="message">Your verification code is:</p>
                  <p class="message-otp">${otp}</p>
                  <p class="message">Copy and paste the above code into the form on the website to continue. This code expires in 5 minutes.</p>
                  <p class="message">If you have any questions or need assistance, feel free to reach out to our support team at support@pharmedore.com.</p>
                  <p class="message">Best regards,</p>
                  <p class="message">The Pharmedore Team</p>
                </td>
              </tr>
              <tr>
                <td class="footer">
                  <img class="footer-logo" src="https://bit.ly/3Ol5qoT" alt="Pharmedore Logo">
                  <p class="footer-message"> 2501 Bill Moses Parkway, Farmers Branch, 75234 Texas | +1(431) 023 9876</p>
                  <p class="footer-message">© 2023 Pharmedore Company | All Rights Reserved</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
};
let info = transporter.sendMail(mailOptions)
console.log("Message sent: %s", info.messageId);

}

exports.verifyMail = verifyMail;
exports.alertAdmin = alertAdmin;
exports.welcomeMail = welcomeMail;
exports.passwordReset = passwordReset;
exports.otpMail = otpMail;