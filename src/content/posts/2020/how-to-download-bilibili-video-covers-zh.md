---
title: Bilibili 视频封面下载链接获取
published: 2020-01-29
updated: 2026-01-26
tags:
  - Python
  - 爬虫
draft: false
pin: 0
toc: true
lang: 'zh'
abbrlink: 'how-to-download-bilibili-video-covers'
---

## 获取API

在Bilibili视频页面，使用开发者工具，可以看到Bilibili的api服务器（`api.bilibili.com`）。

![示例：视频av19390801中使用开发者工具查看](http://qiniu.pic.ydysd.top/img/2020/2020_how-to-download-bilibili-video-covers_1.jpg)

通过英文翻译粗略判断各个api的用途，然后再在Network选项卡中，一个个过滤慢慢找，找到那个可以返回所有视频基本信息的api。

![找到这个能返回视频封面的api](http://qiniu.pic.ydysd.top/img/2020/2020_how-to-download-bilibili-video-covers_2.jpg)

好了，这样就找到了这个能返回视频封面的api了。api地址：https://api.bilibili.com/x/web-interface/view

| 参数 | 值       | 猜测用途 |
| ---- | -------- | -------- |
| aid  | 19390801 | 视频av号 |
| cid  | 31621681 | 不知道   |

测试一下：`https://api.bilibili.com/x/web-interface/view?aid=19390801`

返回了一个很长很长的json：

```json
{"code":0,"message":"0","ttl":1,"data":{"bvid":"","aid":19390801,"videos":1,"tid":22,"tname":"鬼畜调教","copyright":1,"pic":"http://i0.hdslb.com/bfs/archive/d52994a1876d07a975dc6683b78a898d9b581208.png","title":"【春晚鬼畜】赵本山：我就是念诗之王！【改革春风吹满地】","pubdate":1518339644,"ctime":1518230987,"desc":"小时候每次吃完年夜饭，都会急急忙忙跑回自己房间跟朋友玩彩虹岛，街头篮球，泡泡堂，极品飞车，CS。一旦听到外面大人们喊“哦！赵本山来咯！”，就马上暂停手上的游戏赶紧跑出去看。对我来说没有赵本山的春晚根本不是春晚。\n鬼畜本家：av18521530\n【举起手来】花姑娘又要吸旺仔牛奶！\nby @疯猴pme","state":0,"attribute":16384,"duration":152,"rights":{"bp":0,"elec":0,"download":1,"movie":0,"pay":0,"hd5":0,"no_reprint":0,"autoplay":1,"ugc_pay":0,"is_cooperation":0,"ugc_pay_preview":0,"no_background":0},"owner":{"mid":353246678,"name":"UP-Sings","face":"http://i1.hdslb.com/bfs/face/224815f69567dfbdacffc64185b89568bf8da0f3.jpg"},"stat":{"aid":19390801,"view":51436661,"danmaku":372199,"reply":98581,"favorite":1772810,"coin":2432147,"share":975376,"now_rank":0,"his_rank":3,"like":2143394,"dislike":0,"evaluation":""},"dynamic":"不管今年春晚有没有本山叔，鬼畜区总归是有的！","cid":31621681,"dimension":{"width":0,"height":0,"rotate":0},"no_cache":false,"pages":[{"cid":31621681,"page":1,"from":"vupload","part":"P1","duration":152,"vid":"","weblink":"","dimension":{"width":0,"height":0,"rotate":0}}],"subtitle":{"allow_submit":false,"list":[]}}}
```

格式化一下：

![格式化的 JSON](http://qiniu.pic.ydysd.top/img/2020/2020_how-to-download-bilibili-video-covers_3.jpg)

嗯，`json.data.pic`里的字符串就是封面图像url啦。

丢给requests就可以啦，别忘了把`user-agent`带上。

```python
import requests
def main(aid):
    url = 'https://api.bilibili.com/x/web-interface/view?aid='+str(aid)
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'}
    av_data = requests.get(url, headers=headers)
    av_data.encoding = 'utf-8'
    dict_avdata = av_data.json()
    if dict_avdata['code'] == 0:
        return "封面下载链接：" + dict_avdata['data']['pic']
    else:
        return 'Video 404'
if __name__ == "__main__":
    print(main(10492)) # 函数传入的参数就是av号
```
