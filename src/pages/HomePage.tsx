import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Utensils, Calendar, Film, BookOpen, Sparkles, Download, RotateCcw, Gift, Zap } from "lucide-react";
import html2canvas from "html2canvas";
import ShareCard from "@/components/ShareCard";
import { useToast } from "@/hooks/use-toast";

// 推荐数据
const foodRecommendations = [
  { name: "番茄炒蛋", description: "酸甜开胃，家常下饭菜，5分钟搞定。" },
  { name: "青椒土豆丝", description: "脆爽酸辣，配米饭一绝，成本不到3块。" },
  { name: "红烧茄子", description: "软糯入味，酱汁拌饭能吃三碗。" },
  { name: "可乐鸡翅", description: "甜咸适中，厨房小白也能零失败。" },
  { name: "蒜蓉空心菜", description: "清爽快手，夏天必吃的绿叶菜。" },
  { name: "糖醋里脊", description: "外酥里嫩，酸甜比例刚好，外卖常点。" },
  { name: "麻婆豆腐", description: "麻辣鲜香，一勺豆腐能干掉半碗饭。" },
  { name: "香菇炒肉片", description: "肉片嫩滑，香菇吸饱汤汁超下饭。" },
  { name: "酸辣大白菜", description: "酸辣脆爽，冬天囤白菜的救命做法。" },
  { name: "葱油拌面", description: "10分钟搞定，葱香扑鼻，懒人福音。" },
  { name: "咖喱土豆鸡", description: "椰浆咖喱浓郁，土豆炖到沙沙的。" },
  { name: "肉末蒸蛋", description: "鸡蛋滑得像布丁，肉末咸香提味。" },
  { name: "香煎小黄鱼", description: "外皮焦香，鱼肉鲜嫩，撒点椒盐就好吃。" },
  { name: "蚝油生菜", description: "绿油油脆生生，蚝油汁一浇搞定。" },
  { name: "回锅肉", description: "豆瓣酱炒香，肥而不腻，川菜入门款。" },
  { name: "冬瓜排骨汤", description: "汤清味鲜，冬瓜透明时最解暑。" },
  { name: "韭菜炒鸡蛋", description: "韭菜提鲜，鸡蛋金黄，经典素搭。" },
  { name: "酱爆鸡丁", description: "甜面酱裹着嫩鸡丁，配米饭绝配。" },
  { name: "凉拌黄瓜", description: "拍裂黄瓜冰水泡，夏天解腻神器。" },
  { name: "酸菜鱼", description: "鱼片嫩滑，酸菜汤泡饭超上头。" },
  { name: "蒜蓉粉丝蒸虾", description: "虾鲜粉丝吸汁，蒸10分钟上桌。" },
  { name: "小炒肉", description: "湖南味，辣椒虎皮时最香。" },
  { name: "西红柿炖牛腩", description: "番茄炖到化，牛腩软烂不塞牙。" },
  { name: "干锅花菜", description: "花菜焦边，五花肉逼油，干香微辣。" },
  { name: "肉酿茄子", description: "茄子夹肉蒸软，酱汁浓郁。" },
  { name: "清炒荷兰豆", description: "颜色翠绿，口感清甜，年夜饭常客。" },
  { name: "皮蛋豆腐", description: "内酯豆腐配皮蛋，淋酱油就鲜。" },
  { name: "宫保鸡丁", description: "酸甜微辣，花生脆香，外卖榜TOP。" },
  { name: "萝卜炖羊肉", description: "秋冬暖身，萝卜吸饱羊汤超鲜。" },
  { name: "蒜蓉蒸丝瓜", description: "丝瓜软出汁，蒜香提味，夏天必吃。" },
  { name: "鱼香肉丝", description: "无鱼胜有鱼，酸甜辣咸平衡得刚好。" },
  { name: "手撕包菜", description: "包菜手撕才脆，干辣椒爆锅香。" },
  { name: "肉末酸豆角", description: "酸豆角脆爽，肉末提鲜，下粥神器。" },
  { name: "蒜蓉秋葵", description: "秋葵粘糯，蒜香去腥，营养小能手。" },
  { name: "清蒸鲈鱼", description: "鱼眼刚凸时最嫩，淋蒸鱼豉油就好。" },
  { name: "干煸四季豆", description: "豆角煸到皱皮，肉末干香。" },
  { name: "韭菜盒子", description: "面皮焦脆，韭菜鸡蛋馅多汁。" },
  { name: "凉拌木耳", description: "木耳泡发凉拌，酸辣爽脆。" },
  { name: "红烧狮子头", description: "大肉圆炖到松软，汤底泡饭香。" },
  { name: "清炒芦笋", description: "芦笋脆嫩，清炒就带甜味。" },
  { name: "番茄牛腩面", description: "番茄汤底浓郁，牛腩块大实在。" },
  { name: "蒜蓉蒸扇贝", description: "粉丝吸汁，扇贝鲜甜，夜市同款。" },
  { name: "腊肉炒蒜苗", description: "腊肉透亮，蒜苗辛辣，冬天味。" },
  { name: "凉拌海带丝", description: "海带丝酸辣脆，零卡解馋。" },
  { name: "香菇滑鸡", description: "鸡腿肉嫩，香菇滑溜，酱汁拌饭。" },
  { name: "糖醋藕片", description: "藕片脆甜，糖醋汁挂得匀。" },
  { name: "清炒茼蒿", description: "茼蒿清香，炒后翠绿不变色。" },
  { name: "肉末茄子煲", description: "茄子炖到绵软，肉末酱香浓郁。" },
  { name: "香葱煎蛋", description: "鸡蛋蓬松，葱香四溢，5分钟快手。" },
  { name: "鲫鱼豆腐汤", description: "汤色奶白，鲫鱼鲜甜，豆腐嫩。" },
  { name: "辣炒花甲", description: "花甲张口时最鲜，辣汁嗦壳。" },
  { name: "蚝油杏鲍菇", description: "杏鲍菇撕条，蚝油炒出肉感。" },
  { name: "凉拌腐竹", description: "腐竹泡软凉拌，吸汁又弹牙。" },
  { name: "红烧带鱼", description: "带鱼煎后炖，鱼肉蒜瓣状不腥。" },
  { name: "清炒豌豆尖", description: "豌豆尖嫩到出水，清炒就甜。" },
  { name: "肉炖蛋", description: "肉末铺底，鸡蛋蒸出蜂窝孔。" },
  { name: "蒜蓉蒸娃娃菜", description: "娃娃菜甜嫩，蒜蓉汁渗透。" },
  { name: "酱烧冬瓜", description: "冬瓜透明时吸饱酱色，软烂入味。" },
  { name: "芹菜炒肉丝", description: "芹菜脆爽，肉丝滑嫩，经典搭配。" },
  { name: "凉拌西芹", description: "西芹撕老筋凉拌，脆生低卡。" },
  { name: "番茄鸡蛋面", description: "番茄炒出沙，鸡蛋成块，汤底酸甜。" },
  { name: "蒜蓉炒红薯叶", description: "红薯叶嫩尖，蒜蓉清炒超嫩。" },
  { name: "红烧土豆片", description: "土豆片煎边后炖，酱香浓郁。" },
  { name: "滑蛋虾仁", description: "鸡蛋半凝固，虾仁弹牙，粤菜馆经典。" },
  { name: "清炒空心菜", description: "空心菜脆嫩，蒜片爆香，夏天必吃。" },
  { name: "肉末炒粉丝", description: "粉丝吸饱肉末汤汁，蚂蚁上树本树。" },
  { name: "凉拌莴笋丝", description: "莴笋丝冰水泡后凉拌，脆到弹牙。" },
  { name: "香煎鸡翅", description: "鸡翅划刀煎，皮焦肉嫩，撒孜然香。" },
  { name: "清炒西兰花", description: "西兰花焯水后炒，翠绿不软烂。" },
  { name: "酱爆猪肝", description: "猪肝炒到断生微脆，酱浓味足。" },
  { name: "蒸南瓜", description: "南瓜蒸到咧嘴，天然甜糯。" },
  { name: "辣炒白菜", description: "白菜帮炒透明，辣汁裹匀。" },
  { name: "蒜蓉蒸金针菇", description: "金针菇蒸出汁，蒜蓉酱渗透。" },
  { name: "红烧素鸡", description: "素鸡煎后炖，吸饱汤汁有肉感。" },
  { name: "清炒菠菜", description: "菠菜炒后根根直立，不涩口。" },
  { name: "番茄菌菇汤", description: "番茄炒出沙后加菌菇，汤鲜浓。" },
  { name: "煎蛋炒青椒", description: "煎蛋焦边后炒青椒，吸油香。" },
  { name: "凉拌豆芽", description: "豆芽焯水后凉拌，脆生爽口。" },
  { name: "清蒸鳕鱼", description: "鳕鱼蒸8分钟，淋酱油就鲜甜。" },
  { name: "干锅土豆片", description: "土豆片煎到微焦，干锅酱炒香。" },
  { name: "韭菜炒豆芽", description: "韭菜提味，豆芽脆生，快炒出锅。" },
  { name: "肉炒藕丁", description: "藕丁脆甜，肉末酱香，配色好看。" },
  { name: "凉拌菠菜", description: "菠菜焯水后凉拌，去涩增香。" },
  { name: "番茄炖牛肉", description: "番茄炖成酱，牛肉软烂不塞牙。" },
  { name: "蒜蓉蒸茄子", description: "茄子蒸软后撕条，蒜蓉酱拌。" },
  { name: "清炒生菜", description: "生菜炒后翠绿，脆嫩出水。" },
  { name: "辣炒花蛤", description: "花蛤辣炒张口，汤汁拌面鲜。" },
  { name: "香葱炒蛋", description: "鸡蛋蓬松，香葱提味，快手菜。" },
  { name: "凉拌西葫芦", description: "西葫芦擦丝凉拌，脆嫩微甜。" },
  { name: "红烧鸭块", description: "鸭块炒糖色后炖，肉质紧实不腥。" },
  { name: "清炒苦瓜", description: "苦瓜焯水去苦，清炒爽脆。" },
  { name: "肉末炒豆角", description: "豆角煸到虎皮，肉末干香。" },
  { name: "蒸鸡腿", description: "鸡腿去骨蒸，肉质嫩，汤汁鲜。" },
  { name: "蒜蓉炒茭白", description: "茭白切片炒，脆嫩带甜味。" },
  { name: "凉拌马齿苋", description: "马齿苋焯水凉拌，微酸开胃。" },
  { name: "番茄炒花菜", description: "番茄炒出汁后花菜，酸甜入味。" },
  { name: "煎酿豆腐", description: "豆腐塞肉煎，两面金黄后炖。" },
  { name: "清炒油麦菜", description: "油麦菜快炒翠绿，口感脆嫩。" },
  { name: "辣炒鸡杂", description: "鸡胗鸡心炒脆，辣汁裹匀。" },
  { name: "蒜蓉蒸虾", description: "虾开背蒸，蒜蓉酱渗透，鲜甜。" },
  { name: "红烧鲳鱼", description: "鲳鱼煎后红烧，鱼肉蒜瓣状。" },
  { name: "清炒苋菜", description: "苋菜炒出红汤，软嫩带土味。" },
  { name: "肉末炒芹菜", description: "芹菜脆爽，肉末酱香，配色清爽。" },
  { name: "凉拌蕨菜", description: "蕨菜焯水凉拌，山野风味。" },
  { name: "番茄炖豆腐", description: "番茄炖成酱后加豆腐，入味嫩滑。" },
  { name: "香煎豆腐", description: "豆腐煎到两面焦，外脆里嫩。" },
  { name: "清炒豌豆苗", description: "豌豆苗嫩尖，清炒带豆香。" },
  { name: "酱炒蛋", description: "鸡蛋炒凝固后加酱，酱香浓郁。" },
  { name: "凉拌紫甘蓝", description: "紫甘蓝切丝凉拌，脆甜配色好。" },
  { name: "红烧小黄鱼", description: "小黄鱼煎后红烧，肉质细嫩。" },
  { name: "蒜蓉炒通菜", description: "通菜脆嫩，蒜蓉爆香，夏天必吃。" },
  { name: "蒸鸡蛋羹", description: "鸡蛋加水蒸出蜂窝，嫩滑如布丁。" },
  { name: "辣炒土豆丝", description: "土豆丝酸辣脆，快手家常菜。" },
  { name: "清炒芥蓝", description: "芥蓝脆嫩，微苦回甘，粤菜经典。" },
  { name: "肉末炒茄子", description: "茄子炒软后加肉末，酱香浓郁。" },
  { name: "凉拌苦菊", description: "苦菊凉拌微苦，清爽解腻。" },
  { name: "番茄炒豆角", description: "豆角炒透后加番茄，酸甜入味。" },
  { name: "煎蛋汤", description: "煎蛋加水煮汤，汤色奶白。" },
  { name: "蒜蓉炒莴笋叶", description: "莴笋叶嫩时炒，蒜香去涩。" },
  { name: "红烧平菇", description: "平菇撕条后红烧，滑嫩有肉感。" },
  { name: "清炒油菜", description: "油菜炒后翠绿，口感脆嫩。" },
  { name: "辣炒洋葱", description: "洋葱炒透明，辣汁裹匀，微甜。" },
  { name: "蒸肉末", description: "肉末铺碗蒸，汤汁拌饭香。" },
  { name: "凉拌豆皮", description: "豆皮切丝凉拌，吸汁弹牙。" },
  { name: "番茄炒木耳", description: "木耳脆生，番茄酸甜，配色好看。" },
  { name: "香煎五花肉", description: "五花肉煎出油，焦香不腻。" },
  { name: "清炒茼蒿杆", description: "茼蒿杆炒后脆嫩，颜色翠绿。" },
  { name: "酱炒豆角", description: "豆角炒透后加酱，酱香浓郁。" },
  { name: "凉拌萝卜皮", description: "萝卜皮腌后凉拌，脆爽解腻。" },
  { name: "红烧豆腐泡", description: "豆腐泡炖软，吸饱汤汁有嚼劲。" },
  { name: "蒜蓉炒芥菜", description: "芥菜微苦，蒜蓉去涩，清火良品。" },
  { name: "辣炒青椒", description: "青椒炒虎皮，辣汁裹匀，下饭。" },
  { name: "蒸鳕鱼块", description: "鳕鱼块蒸8分钟，淋豉油鲜甜。" },
  { name: "清炒绿豆芽", description: "绿豆芽炒后脆生，根根分明。" },
  { name: "肉末炒白菜", description: "白菜炒软后加肉末，汤鲜菜甜。" },
  { name: "凉拌西红柿", description: "西红柿切块凉拌，撒糖出汁。" },
  { name: "番茄炒蛋花", description: "番茄炒出沙后加蛋花，酸甜嫩滑。" },
  { name: "煎香肠", description: "香肠划刀煎，皮脆油香。" },
  { name: "清炒菠菜梗", description: "菠菜梗炒后脆嫩，颜色翠绿。" },
  { name: "酱炒土豆丝", description: "土豆丝炒脆后加酱，酱香浓郁。" },
  { name: "凉拌芹菜叶", description: "芹菜叶焯水凉拌，香味浓。" },
  { name: "红烧冬瓜块", description: "冬瓜炖透明，吸饱酱色，软烂入味。" },
  { name: "蒜蓉炒苦瓜", description: "苦瓜炒后微苦，蒜蓉提香。" },
  { name: "辣炒豆芽", description: "豆芽炒脆，辣汁裹匀，爽口。" },
  { name: "蒸鸡腿肉", description: "鸡腿去骨蒸，肉质嫩，汤汁鲜。" },
  { name: "清炒莴笋片", description: "莴笋片炒后脆嫩，颜色翠绿。" },
  { name: "肉末炒青椒", description: "青椒炒透后加肉末，酱香浓郁。" },
  { name: "凉拌白菜心", description: "白菜心凉拌甜脆，解腻神器。" },
  { name: "番茄炒茄丝", description: "茄丝炒软后加番茄，酸甜入味。" },
  { name: "香煎鸡蛋", description: "鸡蛋煎到焦边，外脆里嫩。" },
  { name: "清炒生菜叶", description: "生菜叶炒后翠绿，口感脆嫩。" },
  { name: "酱炒白菜", description: "白菜炒软后加酱，酱香浓郁。" },
  { name: "凉拌黄瓜条", description: "黄瓜条凉拌脆生，酸辣开胃。" },
  { name: "红烧萝卜块", description: "萝卜炖透明，吸饱汤汁，软烂入味。" },
  { name: "蒜蓉炒芹菜", description: "芹菜炒后脆爽，蒜蓉提香。" },
  { name: "辣炒芹菜", description: "芹菜炒透，辣汁裹匀，下饭。" },
  { name: "蒸鸡蛋", description: "鸡蛋加水蒸，嫩滑如布丁。" },
  { name: "清炒白菜", description: "白菜炒后软嫩，汤鲜菜甜。" },
  { name: "番茄炒白菜", description: "白菜炒软后加番茄，酸甜入味。" },
  { name: "煎蛋炒西红柿", description: "煎蛋炒后加西红柿，酸甜香。" },
  { name: "凉拌生菜", description: "生菜凉拌脆嫩，清爽解腻。" },
  { name: "红烧土豆块", description: "土豆炖软，吸饱汤汁，酱香浓郁。" },
  { name: "蒜蓉炒白菜", description: "白菜炒后嫩，蒜蓉提香。" },
  { name: "辣炒白菜", description: "白菜炒透，辣汁裹匀，下饭神器。" },
  { name: "蒸肉末蛋", description: "肉末铺底，鸡蛋蒸，汤汁拌饭香。" },
  { name: "清炒西红柿", description: "西红柿炒出沙，酸甜开胃。" },
  { name: "酱炒茄子", description: "茄子炒软后加酱，酱香浓郁。" },
  { name: "凉拌茄子", description: "茄子蒸软后凉拌，蒜香入味。" },
  { name: "番茄炒土豆", description: "土豆炒透后加番茄，酸甜软糯。" },
  { name: "香煎番茄", description: "番茄煎软，撒盐出汁，简单鲜。" },
  { name: "清炒茄子", description: "茄子炒软，蒜香提味，家常味。" },
  { name: "酱炒西红柿", description: "西红柿炒出沙后加酱，酱香酸甜。" },
  { name: "凉拌土豆丝", description: "土豆丝焯水凉拌，脆生爽口。" },
  { name: "红烧茄子块", description: "茄子炖软，吸饱汤汁，酱香浓郁。" },
  { name: "蒜蓉炒西红柿", description: "西红柿炒后酸甜，蒜蓉提香。" },
  { name: "辣炒茄子", description: "茄子炒透，辣汁裹匀，下饭。" },
  { name: "蒸西红柿", description: "西红柿蒸软，撒糖出汁，甜酸。" },
  { name: "清炒土豆", description: "土豆炒透，软糯入味，家常。" },
  { name: "番茄炒青椒", description: "青椒炒透后加番茄，酸甜微辣。" },
  { name: "煎蛋炒土豆", description: "土豆炒软后加煎蛋，香糯。" },
  { name: "凉拌番茄", description: "番茄切块凉拌，撒糖出汁，清爽。" },
  { name: "红烧番茄", description: "番茄炖软，吸饱汤汁，酸甜入味。" },
  { name: "蒜蓉炒土豆", description: "土豆炒透，蒜蓉提香，软糯。" },
  { name: "辣炒土豆", description: "土豆炒脆，辣汁裹匀，爽口。" },
  { name: "蒸土豆", description: "土豆蒸软，压成泥，简单香。" },
  { name: "清炒青椒", description: "青椒炒透，微辣下饭，快手。" },
  { name: "酱炒番茄", description: "西红柿炒出沙后加酱，酱香酸甜。" },
  { name: "凉拌茄子", description: "茄子蒸软后凉拌，蒜香入味。" },
  { name: "番茄炖蛋", description: "番茄炒出沙后加蛋炖，酸甜嫩滑。" },
  { name: "香煎土豆", description: "土豆煎到焦边，外脆里糯。" },
  { name: "清炒番茄", description: "西红柿炒出汁，酸甜开胃，简单。" },
  { name: "酱炒土豆", description: "土豆炒透后加酱，酱香浓郁。" },
  { name: "凉拌青椒", description: "青椒凉拌微辣，清爽解腻。" },
  { name: "红烧土豆", description: "土豆炖软，吸饱汤汁，酱香。" },
  { name: "蒜蓉炒青椒", description: "青椒炒后微辣，蒜蓉提香。" },
  { name: "辣炒番茄", description: "西红柿炒透，辣汁裹匀，开胃。" },
  { name: "蒸番茄", description: "西红柿蒸软，撒糖出汁，甜酸。" },
  { name: "清炒黄瓜", description: "黄瓜炒后脆生，清爽快手。" },
  { name: "番茄炒黄瓜", description: "黄瓜脆生，番茄酸甜，配色。" },
  { name: "煎蛋炒黄瓜", description: "黄瓜炒后加煎蛋，清爽香。" },
  { name: "凉拌土豆", description: "土豆煮熟凉拌，软糯入味。" },
  { name: "红烧青椒", description: "青椒炖软，吸饱汤汁，微辣。" },
  { name: "蒜蓉炒黄瓜", description: "黄瓜炒后脆生，蒜蓉提香。" },
  { name: "辣炒黄瓜", description: "黄瓜炒透，辣汁裹匀，爽口。" },
  { name: "蒸黄瓜", description: "黄瓜蒸软，淋酱油鲜，清淡。" },
  { name: "清炒蛋", description: "鸡蛋炒嫩，简单快手，家常。" },
  { name: "酱炒黄瓜", description: "黄瓜炒后加酱，酱香清爽。" },
  { name: "凉拌蛋", description: "鸡蛋煮熟凉拌，吸汁入味。" },
  { name: "番茄炒蛋", description: "番茄炒出沙，鸡蛋嫩滑，经典。" },
  { name: "香煎黄瓜", description: "黄瓜煎软，撒盐出汁，简单。" },
  { name: "清炒肉", description: "肉片炒嫩，酱香入味，家常。" },
  { name: "酱炒蛋", description: "鸡蛋炒凝固后加酱，酱香浓郁。" },
  { name: "凉拌肉", description: "肉片煮熟凉拌，吸汁不腻。" },
  { name: "红烧蛋", description: "鸡蛋炖入味，酱香浓郁，上色。" },
  { name: "蒜蓉炒肉", description: "肉片炒嫩，蒜蓉提香，下饭。" },
  { name: "辣炒蛋", description: "鸡蛋炒透，辣汁裹匀，开胃。" },
  { name: "蒸肉", description: "肉片蒸软，汤汁拌饭香。" },
  { name: "清炒蛋", description: "鸡蛋炒嫩，简单快手，百吃不厌。" },
  { name: "酱炒肉", description: "肉片炒透后加酱，酱香浓郁。" },
  { name: "凉拌蛋", description: "鸡蛋煮熟凉拌，吸汁入味，简单。" },
  { name: "番茄炒肉", description: "肉片炒嫩后加番茄，酸甜香。" },
  { name: "煎肉炒蛋", description: "肉片煎香后加蛋炒，双香。" },
  { name: "凉拌黄瓜", description: "黄瓜拍裂凉拌，酸辣脆生，解腻。" },
  { name: "红烧肉", description: "五花肉炖软，肥而不腻，酱香。" },
  { name: "蒜蓉炒蛋", description: "鸡蛋炒嫩，蒜蓉提香，经典。" },
  { name: "辣炒肉", description: "肉片炒透，辣汁裹匀，下饭神器。" },
  { name: "蒸蛋", description: "鸡蛋加水蒸，嫩滑如布丁，简单。" },
  { name: "清炒番茄", description: "西红柿炒出汁，酸甜开胃，快手。" },
  { name: "酱炒茄子", description: "茄子炒软后加酱，酱香浓郁。" },
  { name: "凉拌西红柿", description: "番茄切块凉拌，撒糖出汁，清爽。" },
  { name: "番茄炖肉", description: "番茄炒成酱后炖肉，酸甜软烂。" },
  { name: "香煎蛋", description: "鸡蛋煎到焦边，外脆里嫩，香。" },
  { name: "清炒茄子", description: "茄子炒软，蒜香提味，家常下饭菜。" },
  { name: "酱炒西红柿", description: "西红柿炒出沙后加酱，酱香酸甜。" },
  { name: "凉拌鸡蛋", description: "鸡蛋煮熟凉拌，吸汁入味，简单快手。" },
  { name: "红烧茄子", description: "茄子炖软，吸饱汤汁，酱香浓郁，下饭。" },
  { name: "蒜蓉炒西红柿", description: "西红柿炒后酸甜，蒜蓉提香，经典。" },
  { name: "辣炒茄子", description: "茄子炒透，辣汁裹匀，开胃下饭。" },
  { name: "蒸西红柿", description: "西红柿蒸软，撒糖出汁，甜酸清爽。" },
  { name: "清炒土豆", description: "土豆炒透，软糯入味，家常快手。" },
  { name: "番茄炒青椒", description: "青椒炒透后加番茄，酸甜微辣，配色。" },
  { name: "煎蛋炒西红柿", description: "煎蛋炒后加西红柿，酸甜香，简单。" },
  { name: "凉拌番茄", description: "番茄切块凉拌，撒糖出汁，清爽解腻。" },
  { name: "红烧番茄", description: "番茄炖软，吸饱汤汁，酸甜入味，上色。" },
  { name: "蒜蓉炒土豆", description: "土豆炒透，蒜蓉提香，软糯可口。" },
  { name: "辣炒土豆", description: "土豆炒脆，辣汁裹匀，爽口开胃。" },
  { name: "蒸土豆", description: "土豆蒸软，压成泥，简单香糯。" },
  { name: "清炒青椒", description: "青椒炒透，微辣下饭，快手家常菜。" },
  { name: "酱炒番茄", description: "西红柿炒出沙后加酱，酱香酸甜，浓。" },
  { name: "凉拌茄子", description: "茄子蒸软后凉拌，蒜香入味，清爽。" },
  { name: "番茄炖蛋", description: "番茄炒出沙后加蛋炖，酸甜嫩滑，营养。" },
  { name: "香煎土豆", description: "土豆煎到焦边，外脆里糯，香。" },
  { name: "清炒番茄", description: "西红柿炒出汁，酸甜开胃，简单快手。" },
  { name: "酱炒土豆", description: "土豆炒透后加酱，酱香浓郁，下饭。" },
  { name: "凉拌青椒", description: "青椒凉拌微辣，清爽解腻，脆生。" },
  { name: "红烧土豆", description: "土豆炖软，吸饱汤汁，酱香浓郁。" },
  { name: "蒜蓉炒青椒", description: "青椒炒后微辣，蒜蓉提香，经典。" },
  { name: "辣炒番茄", description: "西红柿炒透，辣汁裹匀，开胃下饭。" },
  { name: "蒸番茄", description: "西红柿蒸软，撒糖出汁，甜酸可口。" },
  { name: "清炒黄瓜", description: "黄瓜炒后脆生，清爽快手，夏天必吃。" },
  { name: "番茄炒黄瓜", description: "黄瓜脆生，番茄酸甜，配色清爽。" },
  { name: "煎蛋炒黄瓜", description: "黄瓜炒后加煎蛋，清爽香，简单。" },
  { name: "凉拌土豆", description: "土豆煮熟凉拌，软糯入味，快手。" },
  { name: "红烧青椒", description: "青椒炖软，吸饱汤汁，微辣入味。" },
  { name: "蒜蓉炒黄瓜", description: "黄瓜炒后脆生，蒜蓉提香，清爽。" },
  { name: "辣炒黄瓜", description: "黄瓜炒透，辣汁裹匀，爽口开胃。" },
  { name: "蒸黄瓜", description: "黄瓜蒸软，淋酱油鲜，清淡可口。" },
  { name: "清炒蛋", description: "鸡蛋炒嫩，简单快手，百吃不厌的家常。" },
  { name: "酱炒黄瓜", description: "黄瓜炒后加酱，酱香清爽，下饭。" },
  { name: "凉拌蛋", description: "鸡蛋煮熟凉拌，吸汁入味，简单快手。" },
  { name: "番茄炒蛋", description: "番茄炒出沙，鸡蛋嫩滑，经典家常菜。" },
  { name: "香煎黄瓜", description: "黄瓜煎软，撒盐出汁，简单清爽。" },
  { name: "清炒肉", description: "肉片炒嫩，酱香入味，家常下饭菜。" },
  { name: "酱炒蛋", description: "鸡蛋炒凝固后加酱，酱香浓郁，下饭。" },
  { name: "凉拌肉", description: "肉片煮熟凉拌，吸汁不腻，清爽。" },
  { name: "红烧蛋", description: "鸡蛋炖入味，酱香浓郁，上色好看。" },
  { name: "蒜蓉炒肉", description: "肉片炒嫩，蒜蓉提香，经典搭配。" },
  { name: "辣炒蛋", description: "鸡蛋炒透，辣汁裹匀，开胃下饭。" },
  { name: "蒸肉", description: "肉片蒸软，汤汁拌饭香，简单营养。" },
  { name: "清炒蛋", description: "鸡蛋炒嫩，简单快手，家常经典。" },
  { name: "酱炒肉", description: "肉片炒透后加酱，酱香浓郁，下饭神器。" },
  { name: "凉拌蛋", description: "鸡蛋煮熟凉拌，吸汁入味，清爽简单。" },
  { name: "番茄炒肉", description: "肉片炒嫩后加番茄，酸甜香，开胃。" },
  { name: "煎肉炒蛋", description: "肉片煎香后加蛋炒，双香融合。" },
  { name: "凉拌黄瓜", description: "黄瓜拍裂凉拌，酸辣脆生，解腻神器。" },
  { name: "红烧肉", description: "五花肉炖软，肥而不腻，酱香浓郁。" },
  { name: "蒜蓉炒蛋", description: "鸡蛋炒嫩，蒜蓉提香，经典百搭配。" },
  { name: "辣炒肉", description: "肉片炒透，辣汁裹匀，下饭神器，开胃。" },
  { name: "蒸蛋", description: "鸡蛋加水蒸，嫩滑如布丁，简单营养。" },
  { name: "清炒番茄", description: "西红柿炒出汁，酸甜开胃，快手家常菜。" },
  { name: "酱炒茄子", description: "茄子炒软后加酱，酱香浓郁，下饭。" },
  { name: "凉拌西红柿", description: "番茄切块凉拌，撒糖出汁，清爽解腻。" },
  { name: "番茄炖肉", description: "番茄炒成酱后炖肉，酸甜软烂，入味。" },
  { name: "香煎蛋", description: "鸡蛋煎到焦边，外脆里嫩，香，简单。" },
  { name: "清炒茄子", description: "茄子炒软，蒜香提味，家常下饭菜，快手。" },
  { name: "酱炒西红柿", description: "西红柿炒出沙后加酱，酱香酸甜，浓。" },
  { name: "凉拌鸡蛋", description: "鸡蛋煮熟凉拌，吸汁入味，简单快手菜。" },
  { name: "红烧茄子", description: "茄子炖软，吸饱汤汁，酱香浓郁，下饭神器。" },
  { name: "蒜蓉炒西红柿", description: "西红柿炒后酸甜，蒜蓉提香，经典搭配。" },
  { name: "辣炒茄子", description: "茄子炒透，辣汁裹匀，开胃下饭，香。" },
  { name: "蒸西红柿", description: "西红柿蒸软，撒糖出汁，甜酸清爽，简单。" },
  { name: "清炒土豆", description: "土豆炒透，软糯入味，家常快手，百吃。" },
  { name: "番茄炒青椒", description: "青椒炒透后加番茄，酸甜微辣，配色清爽。" },
  { name: "煎蛋炒西红柿", description: "煎蛋炒后加西红柿，酸甜香，简单快手。" },
  { name: "凉拌番茄", description: "番茄切块凉拌，撒糖出汁，清爽解腻，夏天。" },
  { name: "红烧番茄", description: "番茄炖软，吸饱汤汁，酸甜入味，上色好看。" },
  { name: "蒜蓉炒土豆", description: "土豆炒透，蒜蓉提香，软糯可口，经典。" },
  { name: "辣炒土豆", description: "土豆炒脆，辣汁裹匀，爽口开胃，下饭。" },
  { name: "蒸土豆", description: "土豆蒸软，压成泥，简单香糯，快手。" },
  { name: "清炒青椒", description: "青椒炒透，微辣下饭，快手家常菜，配色。" },
  { name: "酱炒番茄", description: "西红柿炒出沙后加酱，酱香酸甜，浓醇。" },
  { name: "凉拌茄子", description: "茄子蒸软后凉拌，蒜香入味，清爽解腻。" },
  { name: "番茄炖蛋", description: "番茄炒出沙后加蛋炖，酸甜嫩滑，营养快手。" },
  { name: "香煎土豆", description: "土豆煎到焦边，外脆里糯，香，简单。" },
  { name: "清炒番茄", description: "西红柿炒出汁，酸甜开胃，简单快手菜。" },
  { name: "酱炒土豆", description: "土豆炒透后加酱，酱香浓郁，下饭神器。" },
  { name: "凉拌青椒", description: "青椒凉拌微辣，清爽解腻，脆生可口。" },
  { name: "红烧土豆", description: "土豆炖软，吸饱汤汁，酱香浓郁，经典。" },
  { name: "蒜蓉炒青椒", description: "青椒炒后微辣，蒜蓉提香，家常经典。" },
  { name: "辣炒番茄", description: "西红柿炒透，辣汁裹匀，开胃下饭，香。" },
  { name: "蒸番茄", description: "西红柿蒸软，撒糖出汁，甜酸可口，简单。" },
  { name: "清炒黄瓜", description: "黄瓜炒后脆生，清爽快手，夏天必吃菜。" },
  { name: "番茄炒黄瓜", description: "黄瓜脆生，番茄酸甜，配色清爽，简单。" },
  { name: "煎蛋炒黄瓜", description: "黄瓜炒后加煎蛋，清爽香，快手家常菜。" },
  { name: "凉拌土豆", description: "土豆煮熟凉拌，软糯入味，简单快手。" },
  { name: "红烧青椒", description: "青椒炖软，吸饱汤汁，微辣入味，配色。" },
  { name: "蒜蓉炒黄瓜", description: "黄瓜炒后脆生，蒜蓉提香，清爽可口。" },
  { name: "辣炒黄瓜", description: "黄瓜炒透，辣汁裹匀，爽口开胃，夏天。" },
  { name: "蒸黄瓜", description: "黄瓜蒸软，淋酱油鲜，清淡可口，简单。" },
  { name: "清炒蛋", description: "鸡蛋炒嫩，简单快手，百吃不厌的家常经典。" },
  { name: "酱炒黄瓜", description: "黄瓜炒后加酱，酱香清爽，下饭，快手。" },
  { name: "凉拌蛋", description: "鸡蛋煮熟凉拌，吸汁入味，简单快手，清爽。" },
  { name: "番茄炒蛋", description: "番茄炒出沙，鸡蛋嫩滑，经典家常菜，永远。" },
  { name: "香煎黄瓜", description: "黄瓜煎软，撒盐出汁，简单清爽，快手。" },
  { name: "清炒肉", description: "肉片炒嫩，酱香入味，家常下饭菜，经典。" },
  { name: "酱炒蛋", description: "鸡蛋炒凝固后加酱，酱香浓郁，下饭神器。" },
  { name: "凉拌肉", description: "肉片煮熟凉拌，吸汁不腻，清爽简单。" },
  { name: "红烧蛋", description: "鸡蛋炖入味，酱香浓郁，上色好看，快手。" },
  { name: "蒜蓉炒肉", description: "肉片炒嫩，蒜蓉提香，经典搭配，下饭。" },
  { name: "辣炒蛋", description: "鸡蛋炒透，辣汁裹匀，开胃下饭，香。" },
  { name: "蒸肉", description: "肉片蒸软，汤汁拌饭香，简单营养，家常。" },
  { name: "清炒蛋", description: "鸡蛋炒嫩，简单快手，家常经典，百吃不厌。" },
  { name: "酱炒肉", description: "肉片炒透后加酱，酱香浓郁，下饭神器。" },
  { name: "凉拌蛋", description: "鸡蛋煮熟凉拌，吸汁入味，清爽简单，快手。" },
  { name: "番茄炒肉", description: "肉片炒嫩后加番茄，酸甜香，开胃下饭。" },
  { name: "煎肉炒蛋", description: "肉片煎香后加蛋炒，双香融合，简单。" },
  { name: "凉拌黄瓜", description: "黄瓜拍裂凉拌，酸辣脆生，解腻神器，夏天。" },
  { name: "红烧肉", description: "五花肉炖软，肥而不腻，酱香浓郁，经典。" },
  { name: "蒜蓉炒蛋", description: "鸡蛋炒嫩，蒜蓉提香，经典百搭配，下饭。" },
  { name: "辣炒肉", description: "肉片炒透，辣汁裹匀，下饭神器，开胃香。" },
  { name: "蒸蛋", description: "鸡蛋加水蒸，嫩滑如布丁，简单营养，家常。" }
];

const activityRecommendations = [
  { name: "户外徒步", description: "呼吸新鲜空气，欣赏大自然的美景。" },
  { name: "看电影", description: "在电影院享受视听盛宴，放松身心。" },
  { name: "逛博物馆", description: "探索历史文化，增长见识。" },
  { name: "咖啡馆阅读", description: "找一家安静的咖啡馆，享受阅读时光。" },
  { name: "健身运动", description: "去健身房或公园运动，保持健康活力。" },
  { name: "宅家追剧", description: "窝在沙发上，追一部心仪的剧集。" },
  { name: "朋友聚会", description: "约上三五好友，聊天聚餐，增进感情。" },
  { name: "学习新技能", description: "利用周末学习一项新技能或爱好。" },
  { name: "逛街购物", description: "去商场逛逛，买些喜欢的东西犒劳自己。" },
  { name: "郊游野餐", description: "准备美食，到郊外享受野餐的乐趣。" },
];

const movieRecommendations = [
  { name: "《肖申克的救赎》", description: "讲述希望与自由的经典励志片，豆瓣9.6分。" },
  { name: "《霸王别姬》", description: "陈凯歌执导，华语影史巅峰之作，豆瓣9.5分。" },
  { name: "《阿甘正传》", description: "智商75的阿甘跑过美国30年变迁，温暖励志。" },
  { name: "《教父》", description: "黑帮史诗鼻祖，马龙·白兰度演绎经典教父形象。" },
  { name: "《指环王》三部曲", description: "魔幻巨制，中土世界冒险与友情史诗。" },
  { name: "《美丽人生》", description: "父亲用游戏为儿子守护童年，纳粹营里的温暖童话。" },
  { name: "《千与千寻》", description: "宫崎骏奇幻冒险，成长与勇气的动画巅峰。" },
  { name: "《泰坦尼克号》", description: "杰克与露丝的爱情，沉没巨轮上的永恒绝唱。" },
  { name: "《这个杀手不太冷》", description: "杀手里昂与小女孩的温情故事，经典反差萌。" },
  { name: "《盗梦空间》", description: "诺兰烧脑神作，梦中梦层层嵌套，陀螺成谜。" },
  { name: "《星际穿越》", description: "父爱跨越时空，五维空间与黑洞的视觉震撼。" },
  { name: "《楚门的世界》", description: "全球直播的人生，细思极恐的媒体寓言。" },
  { name: "《当幸福来敲门》", description: "父子相依为命，逆境中抓住幸福的励志佳作。" },
  { name: "《机器人总动员》", description: "瓦力与伊芙的太空爱情，环保与未来的温柔提醒。" },
  { name: "《放牛班的春天》", description: "音乐老师用合唱改变问题少年，歌声治愈人心。" },
  { name: "《大话西游》", description: "无厘头外壳下的爱情悲剧，‘他好像条狗’成经典。" },
  { name: "《无间道》", description: "港产卧底巅峰，天台对峙戏永载影史。" },
  { name: "《活着》", description: "张艺谋改编余华小说，中国百姓的苦难史诗。" },
  { name: "《天堂电影院》", description: "小镇放映师与少年的光影回忆，献给电影的情书。" },
  { name: "《狮子王》", description: "迪士尼动画巅峰，辛巴成长与责任的生命循环。" },
  { name: "《美国往事》", description: "四个小时讲完一生，黑帮与友情的沧桑史诗。" },
  { name: "《黑客帝国》", description: "红蓝药丸选择，虚拟现实与哲学思辨的开山之作。" },
  { name: "《触不可及》", description: "瘫痪富豪与黑人护工的跨越阶级友情，笑中带泪。" },
  { name: "《疯狂动物城》", description: "兔子与狐狸破案，隐喻偏见与梦想的萌系动画。" },
  { name: "《哈利·波特》系列", description: "魔法世界成长记，霍格沃茨是无数人的童年。" },
  { name: "《让子弹飞》", description: "姜文黑色幽默，台词句句名场面，隐喻拉满。" },
  { name: "《飞屋环游记》", description: "老人用气球带屋旅行，开场十分钟哭成狗。" },
  { name: "《少年派的奇幻漂流》", description: "海上与虎同行，唯美画面下是残酷生存寓言。" },
  { name: "《怦然心动》", description: "青梅竹马的青涩爱情，‘斯人若彩虹’成金句。" },
  { name: "《蝙蝠侠：黑暗骑士》", description: "诺兰把超级英雄片拍成犯罪史诗，小丑封神。" },
  { name: "《寄生虫》", description: "韩国奥斯卡首金，阶级讽刺的黑色幽默。" },
  { name: "《何以为家》", description: "12岁男孩控告父母‘生而不养’，真实事件改编。" },
  { name: "《绿皮书》", description: "白人司机护送黑人钢琴家南下，公路上的种族和解。" },
  { name: "《奇迹男孩》", description: "面部畸形男孩入学记，温柔治愈的成长课。" },
  { name: "《寻梦环游记》", description: "墨西哥亡灵节，记住家人就能永远在一起。" },
  { name: "《忠犬八公》", description: "狗狗十年等待主人归来，哭湿一包纸巾。" },
  { name: "《初恋这件小事》", description: "暗恋学长变女神的泰国青春，‘小水’颜值逆袭。" },
  { name: "《看不见的客人》", description: "西班牙悬疑神反转，层层反转到最后一秒。" },
  { name: "《调音师》", description: "印度盲人钢琴家目睹凶案，黑色幽默高能反转。" },
  { name: "《熔炉》", description: "韩国真实校园性侵案，‘我们一路奋战不是为了改变世界’。" },
  { name: "《素媛》", description: "幼女性侵案后家人的重生，催泪但充满温情。" },
  { name: "《我不是药神》", description: "天价抗癌药下的草根救赎，国产现实题材标杆。" },
  { name: "《哪吒之魔童降世》", description: "国漫崛起代表作，‘我命由我不由’燃爆暑期档。" },
  { name: "《流浪地球》", description: "国产硬科幻里程碑，带着地球去流浪的中国浪漫。" },
  { name: "《你好，李焕英》", description: "女儿穿越回80年代帮妈妈追爱，贾玲的真诚催泪弹。" },
  { name: "《夏洛特烦恼》", description: "穿越回高中重追女神，开心麻花爆笑喜剧代表作。" },
  { name: "《疯狂原始人》", description: "原始人家族冒险之旅，笑点与温情并存的合家欢。" },
  { name: "《超能陆战队》", description: "萌神大白治愈全球，‘医疗健康机器人’成理想伙伴。" },
  { name: "《爱乐之城》", description: "歌舞与爱情的双重梦幻，紫色星空下的浪漫双人舞。" }
];

const bookRecommendations = [
  { name: "《活着》", description: "余华的经典之作，讲述生命的韧性与尊严。" },
  { name: "《百年孤独》", description: "马尔克斯的魔幻现实主义巨著，探索家族与命运。" },
  { name: "《三体》", description: "刘慈欣的科幻史诗，宏大的宇宙视角。" },
  { name: "《小王子》", description: "温暖治愈的童话，适合所有年龄段阅读。" },
  { name: "《人类简史》", description: "尤瓦尔·赫拉利的历史巨作，重新认识人类文明。" },
  { name: "《围城》", description: "钱钟书的讽刺小说，幽默又深刻。" },
  { name: "《挪威的森林》", description: "村上春树的青春物语，细腻的情感描写。" },
  { name: "《解忧杂货店》", description: "东野圭吾的温情之作，关于时间与羁绊。" },
  { name: "《平凡的世界》", description: "路遥的史诗巨著，描绘普通人的奋斗历程。" },
  { name: "《月亮与六便士》", description: "毛姆的经典，探讨理想与现实的冲突。" },
  { name: "《追风筝的人》", description: "卡勒德·胡赛尼的感人小说，关于救赎与友情。" },
  { name: "《白夜行》", description: "东野圭吾的推理杰作，黑暗中的爱与罪。" },
  { name: "《霍乱时期的爱情》", description: "马尔克斯的爱情史诗，跨越半世纪的爱情。" },
  { name: "《1984》", description: "乔治·奥威尔的反乌托邦经典，警示极权主义。" },
  { name: "《小王子》", description: "圣埃克苏佩里的哲理童话，关于爱与责任。" },
  { name: "《红楼梦》", description: "曹雪芹的古典名著，描绘封建社会的兴衰。" },
  { name: "《西游记》", description: "吴承恩的神魔小说，师徒四人的取经之路。" },
  { name: "《水浒传》", description: "施耐庵的英雄传奇，108位好汉的起义故事。" },
  { name: "《三国演义》", description: "罗贯中的历史演义，三国时期的英雄争霸。" },
  { name: "《简爱》", description: "夏洛蒂·勃朗特的经典，独立女性的成长之路。" },
  { name: "《傲慢与偏见》", description: "简·奥斯汀的爱情小说，关于偏见与理解。" },
  { name: "《老人与海》", description: "海明威的硬汉文学，人与自然的搏斗。" },
  { name: "《麦田里的守望者》", description: "塞林格的叛逆青春，少年的迷茫与成长。" },
  { name: "《了不起的盖茨比》", description: "菲茨杰拉德的美国梦，繁华背后的空虚。" },
  { name: "《飘》", description: "玛格丽特·米切尔的战争与爱情，乱世中的坚韧。" },
  { name: "《悲惨世界》", description: "雨果的人道主义巨著，关于救赎与革命。" },
  { name: "《巴黎圣母院》", description: "雨果的浪漫主义悲剧，爱与美的永恒主题。" },
  { name: "《基督山伯爵》", description: "大仲马的复仇传奇，关于正义与救赎。" },
  { name: "《海底两万里》", description: "凡尔纳的科幻冒险，神秘的海底世界。" },
  { name: "《昆虫记》", description: "法布尔的自然观察，微观世界的生命诗篇。" },
  { name: "《瓦尔登湖》", description: "梭罗的隐居随笔，关于简朴生活的哲学。" },
  { name: "《培根随笔》", description: "培根的人生智慧，关于真理与权力的思考。" },
  { name: "《吉檀迦利》", description: "泰戈尔的诗集，东方哲学的诗意表达。" },
  { name: "《飞鸟集》", description: "泰戈尔的短诗合集，关于生命与自然的感悟。" },
  { name: "《一千零一夜》", description: "阿拉伯民间故事集，奇幻的东方传说。" },
  { name: "《安徒生童话》", description: "安徒生的经典童话，关于爱与善良的启蒙。" },
  { name: "《格林童话》", description: "格林兄弟的民间故事，关于勇气与智慧。" },
  { name: "《伊索寓言》", description: "伊索的寓言故事，简短而深刻的道德教训。" },
  { name: "《福尔摩斯探案集》", description: "柯南·道尔的推理经典，侦探小说的鼻祖。" },
  { name: "《东方快车谋杀案》", description: "阿加莎·克里斯蒂的推理杰作，密室杀人的经典。" },
  { name: "《肖申克的救赎》", description: "斯蒂芬·金的监狱小说，关于希望与自由。" },
  { name: "《教父》", description: "马里奥·普佐的黑帮史诗，权力与家族的传奇。" },
  { name: "《哈利·波特》", description: "J.K.罗琳的魔法世界，关于成长与勇气的冒险。" },
  { name: "《魔戒》", description: "托尔金的奇幻史诗，中土世界的正邪之战。" },
  { name: "《霍比特人》", description: "托尔金的奇幻前传，比尔博的冒险之旅。" },
  { name: "《纳尼亚传奇》", description: "C.S.刘易斯的奇幻世界，关于信仰与成长的寓言。" },
  { name: "《动物农场》", description: "乔治·奥威尔的政治寓言，关于权力与腐败。" },
  { name: "《杀死一只知更鸟》", description: "哈珀·李的成长小说，关于正义与种族平等。" },
  { name: "《苏菲的世界》", description: "乔斯坦·贾德的哲学启蒙，关于生命与宇宙的思考。" },
  { name: "《窗边的小豆豆》", description: "黑柳彻子的教育随笔，关于爱与理解的成长故事。" }
];

// 提示信息
const hints = {
  food: ["辣的 🌶️", "清淡 🥗", "油腻 🍖", "爽口 🥒", "甜的 🍰", "咸的 🧂", "酸的 🍋", "鲜美 🦐"],
  activity: ["室内 🏠", "户外 🌳", "安静 📚", "热闹 🎉", "运动 ⚽", "休闲 ☕", "社交 👥", "独处 🧘"],
  movie: ["喜剧 😄", "悲剧 😢", "动作 💥", "爱情 💕", "科幻 🚀", "悬疑 🔍", "治愈 🌸", "烧脑 🧠"],
  book: ["轻松 😊", "深刻 🤔", "励志 💪", "治愈 🌈", "历史 📜", "科幻 🛸", "文学 📖", "哲学 💭"],
};

// 立方体图案配置
const cubePatterns = {
  food: {
    emoji: "🍜",
    gradient: "from-orange-400 to-red-500",
  },
  activity: {
    emoji: "⚽",
    gradient: "from-blue-400 to-cyan-500",
  },
  movie: {
    emoji: "🎬",
    gradient: "from-purple-400 to-pink-500",
  },
  book: {
    emoji: "📚",
    gradient: "from-green-400 to-teal-500",
  },
};

interface Recommendation {
  name: string;
  description: string;
}

interface RecommendationCardProps {
  title: string;
  icon: React.ReactNode;
  recommendations: Recommendation[];
  iconColor: string;
  hintType: keyof typeof hints;
}

function RecommendationCard({ title, icon, recommendations, iconColor, hintType }: RecommendationCardProps) {
  const [result, setResult] = useState<Recommendation | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [currentHint, setCurrentHint] = useState<string>("");
  const [showHint, setShowHint] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareImageUrl, setShareImageUrl] = useState<string>("");
  const shareCardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const pattern = cubePatterns[hintType];

  // 摇一摇功能
  const handleShake = () => {
    if (isShaking || isDrawing) return;
    
    setIsShaking(true);
    setShowHint(false);
    
    // 随机选择一个提示
    const randomHint = hints[hintType][Math.floor(Math.random() * hints[hintType].length)];
    
    setTimeout(() => {
      setCurrentHint(randomHint);
      setShowHint(true);
      setIsShaking(false);
      
      toast({
        title: "提示已生成！",
        description: `看起来是：${randomHint}`,
      });
    }, 800);
  };

  // 直接抽盲盒功能
  const handleDraw = () => {
    if (isDrawing) return;
    
    setIsDrawing(true);
    setIsFlipped(false);
    setShowSparkles(false);
    setShowHint(false);
    
    // 抽奖动画效果
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * recommendations.length);
      setResult(recommendations[randomIndex]);
      
      // 翻转卡片
      setTimeout(() => {
        setIsFlipped(true);
        setShowSparkles(true);
        
        // 闪光效果消失
        setTimeout(() => {
          setShowSparkles(false);
          setIsDrawing(false);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  // 重置功能
  const handleReset = () => {
    setIsFlipped(false);
    setResult(null);
    setShowSparkles(false);
    setShowHint(false);
    setCurrentHint("");
  };

  // 生成分享图片
  const handleShare = async () => {
    if (!result || !shareCardRef.current) return;

    try {
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
      });
      
      const imageUrl = canvas.toDataURL("image/png");
      setShareImageUrl(imageUrl);
      setShareDialogOpen(true);
    } catch (error) {
      toast({
        title: "生成失败",
        description: "图片生成失败，请重试",
        variant: "destructive",
      });
    }
  };

  // 下载分享图片
  const handleDownload = () => {
    if (!shareImageUrl || !result) return;
    
    const link = document.createElement("a");
    link.download = `选择困难症救星-${title}-${result.name}.png`;
    link.href = shareImageUrl;
    link.click();
    
    toast({
      title: "下载成功！",
      description: "图片已保存到本地，快去分享给朋友吧！",
    });
  };

  return (
    <>
      <Card className="shadow-card hover:shadow-hover transition-all duration-300 border-2 overflow-hidden">
        <CardContent className="p-6">
          {/* 标题区域 */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-full ${iconColor} shadow-lg`}>
              {icon}
            </div>
            <h3 className="text-2xl max-sm:text-xl font-bold">{title}</h3>
          </div>

          {/* 3D 立方体盲盒区域 */}
          <div className="mb-4">
            {/* 翻转卡片 */}
            <div className="flip-card mb-2">
              <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
                {/* 正面 - 3D 立方体 */}
                <div className="flip-card-front">
                  <div className="py-2 flex items-center justify-center">
                    <div className="cube-container">
                      <div className={`cube ${isShaking ? "shaking" : ""} ${isDrawing ? "opening" : ""}`}>
                        {/* 立方体六个面 */}
                        <div className={`cube-face front bg-gradient-to-br ${pattern.gradient}`}>
                          <span className="relative z-10">{pattern.emoji}</span>
                        </div>
                        <div className={`cube-face back bg-gradient-to-br ${pattern.gradient}`}>
                          <span className="relative z-10">{pattern.emoji}</span>
                        </div>
                        <div className={`cube-face right bg-gradient-to-br ${pattern.gradient}`}>
                          <span className="relative z-10">{pattern.emoji}</span>
                        </div>
                        <div className={`cube-face left bg-gradient-to-br ${pattern.gradient}`}>
                          <span className="relative z-10">{pattern.emoji}</span>
                        </div>
                        <div className={`cube-face top bg-gradient-to-br ${pattern.gradient}`}>
                          <span className="relative z-10">{pattern.emoji}</span>
                        </div>
                        <div className={`cube-face bottom bg-gradient-to-br ${pattern.gradient}`}>
                          <span className="relative z-10">{pattern.emoji}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 背面 - 结果 */}
                <div className="flip-card-back">
                  {result && (
                    <div className="bg-muted rounded-3xl p-4 min-h-[220px] flex flex-col justify-center relative overflow-hidden shadow-2xl border-4 border-border">
                      {showSparkles && (
                        <>
                          <Sparkles className="absolute top-4 left-4 h-8 w-8 text-primary sparkle-animation" />
                          <Sparkles className="absolute top-4 right-4 h-8 w-8 text-secondary sparkle-animation" style={{ animationDelay: "0.2s" }} />
                          <Sparkles className="absolute bottom-4 left-1/2 -translate-x-1/2 h-8 w-8 text-accent sparkle-animation" style={{ animationDelay: "0.4s" }} />
                        </>
                      )}
                      <div className="zoom-in-animation relative z-10">
                        <div className="text-center mb-3">
                          <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full mb-3">
                            <p className="text-primary font-bold text-xs">🎉 恭喜抽中</p>
                          </div>
                        </div>
                        <h4 className="text-2xl max-sm:text-xl font-bold mb-4 text-primary text-center">
                          {result.name}
                        </h4>
                        <p className="text-muted-foreground text-sm max-sm:text-xs leading-relaxed text-center px-2">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* 提示信息区域 - 固定高度确保所有卡片一致 */}
            <div className="h-[72px] flex items-center justify-center">
              {showHint && currentHint && !isFlipped && (
                <div className="inline-block px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full hint-pop border-2 border-primary/20">
                  <p className="text-primary text-lg max-sm:text-base font-bold">
                    提示：{currentHint}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="space-y-3">
            {!result ? (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleShake}
                  disabled={isShaking || isDrawing}
                  size="lg"
                  variant="outline"
                  className="text-base max-sm:text-sm font-semibold py-6 max-sm:py-5 rounded-2xl border-2"
                >
                  {isShaking ? (
                    <>
                      <Zap className="mr-2 h-5 w-5 spin-animation" />
                      摇动中
                    </>
                  ) : showHint ? (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      再摇一次
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      摇一摇
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleDraw}
                  disabled={isDrawing}
                  size="lg"
                  className="text-base max-sm:text-sm font-semibold py-6 max-sm:py-5 rounded-2xl"
                >
                  {isDrawing ? (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 spin-animation" />
                      开启中
                    </>
                  ) : (
                    <>
                      <Gift className="mr-2 h-5 w-5" />
                      直接抽
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="rounded-xl max-sm:text-sm"
                >
                  <RotateCcw className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
                  <span className="ml-1 max-sm:hidden">再抽</span>
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="lg"
                  className="rounded-xl max-sm:text-sm col-span-2"
                >
                  <Sparkles className="h-4 w-4 max-sm:h-3 max-sm:w-3" />
                  <span className="ml-1">生成分享图</span>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {/* 分享对话框 */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">分享你的推荐</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* 图片预览 */}
            {shareImageUrl && (
              <div className="flex justify-center bg-gray-50 rounded-2xl p-6 mt-[NaNpx] border-solid border-[#1c4264ff] border-[0px] border-[transparent]">
                <img 
                  src={shareImageUrl} 
                  alt="分享图片" 
                  className="flex justify-center bg-gray-50 p-6 mt-[10px] border-solid border-[#468ac6ff] rounded-[30px] border-[0px] border-[transparent]"
                />
              </div>
            )}
            
            {/* 操作按钮 */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleDownload}
                size="lg"
                className="px-8 py-6 text-lg rounded-2xl"
              >
                <Download className="mr-2 h-5 w-5" />
                下载图片
              </Button>
              <Button
                onClick={() => setShareDialogOpen(false)}
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg rounded-2xl"
              >
                关闭
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* 隐藏的分享卡片 */}
      {result && (
        <div className="fixed -left-[9999px] -top-[9999px]">
          <ShareCard
            ref={shareCardRef}
            title={title}
            result={result}
            iconColor={iconColor}
          />
        </div>
      )}
    </>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8 xl:py-16 max-w-7xl">
        {/* 标题区域 */}
        <div className="text-center mb-8 xl:mb-12 animate-fade-in">
          <h1 className="text-3xl xl:text-6xl font-bold mb-3 xl:mb-4 bg-gradient-primary bg-clip-text text-transparent">
            选择困难症救星
          </h1>
          <p className="text-base xl:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            不知道吃什么？不知道做什么？让我们帮你快速做决定！
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-primary" />
            <span>摇一摇获取提示，开启盲盒获取惊喜</span>
          </div>
        </div>

        {/* 推荐卡片网格 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-6">
          <RecommendationCard
            title="美食推荐"
            icon={<Utensils className="h-6 w-6 text-primary-foreground" />}
            recommendations={foodRecommendations}
            iconColor="bg-primary"
            hintType="food"
          />
          
          <RecommendationCard
            title="周末活动"
            icon={<Calendar className="h-6 w-6 text-secondary-foreground" />}
            recommendations={activityRecommendations}
            iconColor="bg-secondary"
            hintType="activity"
          />
          
          <RecommendationCard
            title="影视剧推荐"
            icon={<Film className="h-6 w-6 text-primary-foreground" />}
            recommendations={movieRecommendations}
            iconColor="bg-gradient-primary"
            hintType="movie"
          />
          
          <RecommendationCard
            title="书籍推荐"
            icon={<BookOpen className="h-6 w-6 text-secondary-foreground" />}
            recommendations={bookRecommendations}
            iconColor="bg-gradient-secondary"
            hintType="book"
          />
        </div>

        {/* 使用说明 */}
        <div className="mt-8 xl:mt-12 bg-card rounded-2xl p-6 xl:p-8 shadow-card border-2 animate-fade-in">
          <h2 className="text-xl xl:text-2xl font-bold mb-4 text-center">使用说明</h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">摇一摇（可选）</h3>
              <p className="text-sm text-muted-foreground">摇一摇获取神秘提示，可多次摇动</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <Gift className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold">直接抽取</h3>
              <p className="text-sm text-muted-foreground">也可以直接抽取，立即获得推荐</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold">分享结果</h3>
              <p className="text-sm text-muted-foreground">生成精美图片分享给朋友</p>
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <footer className="text-center mt-12 xl:mt-16 text-muted-foreground">
          <p className="text-sm">2025 选择困难症救星</p>
        </footer>
      </div>
    </div>
  );
}
