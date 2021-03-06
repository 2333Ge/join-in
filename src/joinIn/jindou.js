const axios = require("axios");
const { formatObjToHtml } = require("../utils/format");

/**
 * 签到
 */
const submitJingDouApi = async (pt_key, pt_pin) => {
  const url =
    "https://api.m.jd.com/client.action?functionId=signBeanAct&body=%7B%22fp%22%3A%22-1%22%2C%22shshshfp%22%3A%22-1%22%2C%22shshshfpa%22%3A%22-1%22%2C%22referUrl%22%3A%22-1%22%2C%22userAgent%22%3A%22-1%22%2C%22jda%22%3A%22-1%22%2C%22rnVersion%22%3A%223.9%22%7D&appid=ld&client=apple&clientVersion=10.0.4&networkType=wifi&osVersion=14.8.1&uuid=3acd1f6361f86fc0a1bc23971b2e7bbe6197afb6&openudid=3acd1f6361f86fc0a1bc23971b2e7bbe6197afb6";

  const cookie = `__jd_ref_cls=JingDou_SceneHome_NewGuidExpo; mba_muid=1645885780097318205272.81.1645885790055; mba_sid=81.5; __jda=122270672.1645885780097318205272.1645885780.1645885780.1645885780.1; __jdb=122270672.1.1645885780097318205272|1.1645885780; __jdc=122270672; __jdv=122270672%7Ckong%7Ct_1000170135%7Ctuiguang%7Cnotset%7C1644027879157; pre_seq=0; pre_session=3acd1f6361f86fc0a1bc23971b2e7bbe6197afb6|143; unpl=JF8EAKZnNSttWRkDURtVThUWHAgEWw1dH0dXOjMMAFVcTQQAEwZORxR7XlVdXhRKFx9sZhRUX1NIVw4YBCsiEEpcV1ZVC0kVAV9XNVddaEpkBRwAExEZQ1lWW1kMTBcEaWcAUVpeS1c1KwUbGyB7bVFeXAlOFQJobwxkXGhJVQQZBR0UFU1bZBUzCQYXBG1vBl1VXElRAR8FGxUWS1hRWVsISCcBb2cHUm1b%7CV2_ZzNtbRYAFxd9DUNcKRxYB2ILGloRUUYcIVpAAHsbWQZjVBEJclRCFnUUR11nGlgUZgIZXkFcQRRFCEJkexhdB24LFFtEUHMQfQ5GXH0pXAQJbRZeLAcCVEULRmR6KV5VNVYSCkVVRBUiAUEDKRgMBTRREV9KUUNGdlxAByhNWwVvBUIKEVBzJXwJdlR6GF0GZAoUWUdRQCUpUBkCJE0ZWTVcIlxyVnMURUooDytAGlU1Vl9fEgUWFSIPRFN7TlUCMFETDUIEERZ3AEBUKBoIAzRQRlpCX0VFIltBZHopXA%253d%253d; pt_key=${pt_key}; pt_pin=${pt_pin}; pwdt_id=jd_505bacd333f6b; sid=1b2c8b7ce820c4188f048e689bf58c8w; visitkey=36446698972455355`;

  try {
    let { data } = await axios({
      url,
      method: "post",
      headers: { Cookie: cookie },
    });
    return data;
  } catch (e) {
    console.log("签到请求出错====>", e);
    return e;
  }
};

/**
 * 京豆签到
 */
const joinIn = async ({ jdPtPin, jdPtKey }) => {
  if (!jdPtPin || !jdPtKey) return;

  console.log("京豆签到start====>");

  const result = await submitJingDouApi(jdPtKey, jdPtPin);
  console.log("京豆签到api result====>", result);

  const { data } = result;
  let content = "签到失败";
  if (data) {
    const { tomorrowSendBeans, continuousDays, totalUserBean } = data;
    content = `已连续签到：${continuousDays}天，当前总豆：${totalUserBean}，明日签到送豆:${tomorrowSendBeans}<br/>`;
    content += continuousDays >= 25 ? "<div style='color:red;'>请注意cookie是否快过期，以免断签</div><br/>" : "";
  }

  const resultHtml = `<br/> ${formatObjToHtml(result)}<br/>`;
  return {
    content: content,
    result: resultHtml,
  };
};

module.exports.joinIn = joinIn;
