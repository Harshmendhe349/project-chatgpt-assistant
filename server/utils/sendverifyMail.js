const { createMailTransporter } = require("./createMailTransporter");
const sendverifyMail = (user) => {
    const transporter = createMailTransporter();
    const mailOptions = {
        from: '"Chat App" <abhishekmital456@outlook.com>',
        to: user.email,
        subject: "Verify your email...",
        html: `<p> Hello ${user.name}, verify your email by clicking this link...</p>
        <a href='${process.env.CLIENT_URL}/verify?emailToken=${user.emailToken}'>Verify Your Email</a>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Verification email sent");
        }
    });
};
module.exports = { sendverifyMail };