const nodeMailer = require("nodemailer");
/**
 * 发送邮件
 */
const sendQQEmail = async ({ subject, html, qqEmailPass, qqEmail }) => {
  const transporter = nodeMailer.createTransport({
    service: "qq",
    auth: { user: qqEmail, qqEmailPass },
  });
  if (!qqEmail || qqEmailPass) {
    console.log("邮件发送失败====>", "无邮箱或授权码");
  }
  transporter.sendMail({ from: qqEmail, to: qqEmail, subject, html }, (err) => {
    if (err) return console.log(`发送邮件失败：${err}`);
    console.log("发送邮件成功");
  });
};

module.exports.sendQQEmail = sendQQEmail;
