const core = require("@actions/core");

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

  if (juejinCookie) {
    juejinJoinIn({ qqEmail, qqEmailPass, juejinCookie });
  }
  if (jdPtPin && jdPtKey) {
    jinDouJoinIn({ jdPtPin, jdPtKey, qqEmail, qqEmailPass });
  }
} catch (error) {
  core.setFailed(error.message);
}
