
const nodemailer = require('nodemailer');

    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'billanivash52@gmail.com',
            pass: 'yglubdayulcahfhr'
        }
    });
const sendActivationMail = (to, activationLink, name,activationtoken) => {
    const link='https://moonlit-dragon-6ef7ad.netlify.app'
    const html = `
    <h1>Hello</h1>
    <p>Welcome to our website,${name}</p>
    <p><span><h2>Activationcode:</h2></span>${activationtoken}</p>

    <p>Dear, ${name} This is a mail for change from inactive account to active and login this is needed for verification process, So Kindly click here=><a href=${link}>Click</a> </p>
    <script>
         const emailhandle=(e)=>{
              e.preventDefault();
              const response=fetch('${activationLink}',{
                method:"GET",
              })
         }
    </script> 
    
    
    `   
    const mailOption = {
        from: 'billanivash52@gmail.com',
        to: `${to}`,
        subject: 'MailFromWebsite',
        html:html,
    }
    transporter.sendMail(mailOption, function (err, info) {
            if (err)
            {
                console.log(err);
            }
            else {
                console.log(info.response);
        }
        })
}
    
module.exports = sendActivationMail;