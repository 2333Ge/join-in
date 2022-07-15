签到、抽奖并邮件通知结果，支持：

- 掘金 签到&抽奖
- 京豆 签到

## 入参

参数缺失则不执行对应功能

 |     参数      |                   描述                    | 是否必传 | 示例  |
 | :-----------: | :---------------------------------------: | :------: | :---: |
 |   qq-email    |            接收签到结果的邮件             |    否    |       |
 | qq-email-pass |    邮件授权码，获取方式[参考][juejin]     |    否    |       |
 | juejin-cookie |    掘金cookie，获取方式[参考][juejin]     |    否    |       |
 |   jd-pt-pin   | 京东cookie-pt_pin，获取方式[参考][jindou] |    否    |       |
 |   jd-pt-key   | 京东cookie-pt_key，获取方式[参考][jindou] |    否    |       |
     
## 完整示例

以下示例演示：北京时间，定时每天7点签到

```yml
name: 签到

on:
  schedule:
    - cron: "0 23 * * *"
  workflow_dispatch:
jobs:
  join-in-and-send-email:
    runs-on: ubuntu-latest
    steps:
      - uses: 2333Ge/jon-in@main
        with:
          qq-email: ych.class@qq.com
          qq-email-pass: ${{secrets.QQ_EMAIL_PASS}}
          juejin-cookie: ${{secrets.JUEJIN_COOKIE}}
          jd-pt-pin: ${{secrets.JD_PT_PIN}}
          jd-pt-key: ${{secrets.JD_PT_KEY}}

```

## 参考文章

[1] [掘金][juejin]
[2] [京豆][jindou]

[juejin]:https://juejin.cn/post/7041495891388743716
[jindou]:https://segmentfault.com/a/1190000041786477