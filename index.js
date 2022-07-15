const core = require("@actions/core");
const { sendQQEmail } = require("./src/utils/email");

const { joinIn: jinDouJoinIn } = require("./src/joinIn/jindou");
const { joinIn: juejinJoinIn } = require("./src/joinIn/juejin");
try {
  const qqEmail = core.getInput("qq-email");
  const qqEmailPass = core.getInput("qq-email-pass");
  const juejinCookie = core.getInput("juejin-cookie");
  const jdPtPin = core.getInput("jd-pt-pin");
  const jdPtKey = core.getInput("jd-pt-key");

  console.log("是否包含参数====>", {
    qqEmail: !!qqEmail,
    qqEmailPass: !!qqEmailPass,
    juejinCookie: !!juejinCookie,
    jdPtPin: !!jdPtPin,
    jdPtKey: !!jdPtKey,
  });

  Promise.all([
    juejinJoinIn({ juejinCookie }),
    jinDouJoinIn({ jdPtPin, jdPtKey }),
  ])
    .then(([juejinResult, jinDouResult]) => {
      let content = "";
      let res = "";
      if (juejinResult) {
        content += `<h2>掘金签到&抽奖结果</h2><br/>${juejinResult.content}<br/>`;
        res += `<h2>掘金签到&抽奖接口返回</h2><br/>${juejinResult.result}<br/>`;
      }
      if (jinDouResult) {
        content += `<h2>京豆签到结果</h2><br/>${jinDouResult.content}<br/>`;
        res += `<h2>京豆接口返回</h2><br/>${jinDouResult.result}<br/>`;
      }

      sendQQEmail({
        subject: "Github Actions签到完毕，靓仔",
        html: `${content}${res}`,
        qqEmailPass,
        qqEmail,
      });
    })
    .catch((e) => {
      core.setFailed(e);
    });
} catch (error) {
  core.setFailed(error.message);
}
