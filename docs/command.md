# 指令

---
()表示可选，[]表示必选

---

### 通用字段

- `v`表示版本，指令存在版本迭代
- `debug`是否中测试

## 查询玩家

| 指令                                                                         | 描述           | 例子                           |
|----------------------------------------------------------------------------|--------------|------------------------------|
| .checkban                                                                  | -            | -                            |
| .checkban id [id:number] (v:number)                                        | 使用EAid查询玩家状态 | .checkban id 2000000         |
| .checkban name [name:string] (v:number) (limit:5) (sort:default) (limit:5) | 使用名字查询玩家状态   | .checkban name cabb limit:10 |

## widget

| 指令                                 | 描述                       | 例子                       |
|------------------------------------|--------------------------|--------------------------|
| .widget                            | -                        | -                        |
| .widget img [id:number] (v:number) | 生成图片小组件，参考网站生成分享图片[https://bfban.gametools.network/player/1005868194472/share(https://bfban.gametools.network/player/1005868194472/share) | .widget img 1000000 |

## 网站统计

| 指令                                   | 描述                  | 例子                    |
|--------------------------------------|---------------------|-----------------------|
| .sitestats                           | -                   | -                     |
| .sitestats site (v:number)           | 网站统计，返回统计信息         | .sitestats site  |
| .sitestats admin (v:number)          | 网站统计，返回站点管理员统计      | .sitestats admin |
| .sitestats hot (v:number) (time:string) | 网站统计，热点案件,time不选择一周 | .sitestats hot   |

time: daily/week/monthly/yearly
