const nodeMailer = require("nodemailer");
/**
 * 发送邮件
 */
const sendQQEmail = async ({ subject, html, qqEmailPass, qqEmail }) => {
  const transporter = nodeMailer.createTransport({
    service: "qq",
    auth: { user: qqEmail, pass: qqEmailPass },
  });
  if (!qqEmail) {
    console.log("邮件发送失败====>", "无邮箱");
    return;
  }

  if (!qqEmailPass) {
    console.log("邮件发送失败====>", "无授权码");
    return;
  }

  transporter.sendMail({ from: qqEmail, to: qqEmail, subject, html }, (err) => {
    if (err) return console.log(`发送邮件失败====>`, err);
    console.log("发送邮件成功");
  });
};

module.exports.sendQQEmail = sendQQEmail;
