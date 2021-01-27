import Vue from 'vue';
import Vuex from 'vuex';

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

const state = {
  cartList: [
    {
      image: "//s11.mogucdn.com/mlcdn/c45406/180808_600abce0g8dc8i4f6ic7k27i7837l_640x960.jpg",
      title: "2018秋季新款韩版百搭格子长袖衬衫+前短后长针织气质开衫外套+高腰直筒九分牛仔裤三件套装",
      desc: "2018秋季新款韩版百搭格子长袖衬衫+前短后长针织气质开衫外套+高腰直筒九分牛仔裤三件套装",
      price: "59.00",
      iid: "1m70y5k",
      count: 1,
      checked: true,
    },
    {
      image: "//s11.mogucdn.com/mlcdn/c45406/180811_1k5hfa6d803575df3lkb6j67l5j3c_640x960.jpg",
      title: "2018秋季新款韩版女装字母印花宽松连帽休闲卫衣搭配松紧腰九分牛仔裤两件套女时尚运动套装潮",
      desc: "你的运动套装，也可以一起承包了~棉混纺的连帽卫衣，版型虽宽松，但因为有罗纹收口，穿起来立体挺括，能遮住多余的腰腹和双臂肉肉，展现青春活力.下半身搭配浅色直筒牛仔裤，向来是竹竿腿的助攻，翻边上的亮粉字母数字，和上衣一个调调，闪闪地时尚别致.清清爽爽的运动风其实也很拉好感der~",
      price: "68.00",
      iid: "1m745k0",
      count: 1,
      checked: true,
    },
    {
      image: "//s11.mogucdn.com/mlcdn/c45406/180301_1cik8f3fj0gf2839ddch880422ffc_640x960.jpg",
      title: "【2件69元】【新品特惠】短袖t恤女2018夏装新款韩版学生宽松黑色体恤圆领纯棉半袖上衣服",
      desc: "【2件69元】【新品特惠】【赠送运费险 七天无理由退换货】【无忧售后】",
      price: "49.00",
      iid: "1lrzvr8",
      count: 2,
      checked: true,
    },
    {
      image: "//s11.mogucdn.com/p2/170301/106341701_4kfgdd3001475k8h1l365al2k5ed6_640x960.jpg",
      title: "2018 新款女装上衣文艺棉麻短袖t恤 V领衫T恤女短袖女T桖",
      desc: "建议零售价\t¥129.00\t\n面料名称\t奥戴尔\t主面料成分\t棉\t主面料成分的含量\t95（%）\n图案\t纯色\t风格\t文艺\n款式\t套头\t袖长\t短袖\t工艺\t拼贴/拼接 88803",
      price: "56.64",
      iid: "1jw0sr2",
      count: 1,
      checked: true,
    },
    {
      image: "//s3.mogucdn.com/mlcdn/c45406/180828_550k23i82cbibh32602fl43jc9aid_800x1200.jpg",
      title: "秋装女2018新款早秋女装裙子韩版针织连衣裙+衬衫上衣时尚套装",
      desc: "新款",
      price: "88.90",
      iid: "1m7s9c4",
      count: 1,
      checked: true,
    },
    {
      image: "//s5.mogucdn.com/mlcdn/c45406/180827_1590j44g2bk619i6655ji20ihikfb_640x960.jpg",
      title: "秋装女2018新款套装时尚晚晚风气质chic港味女神网红两件套装俏皮",
      desc: "秋装女2018新款套装时尚晚晚风气质chic港味女神网红两件套装俏皮",
      price: "109.00",
      iid: "1m7rp9w",
      count: 1,
      checked: true,
    },
    {
      image: "//s11.mogucdn.com/mlcdn/c45406/180423_0h6j2abd17hka9d4j7dlk710d3af9_640x960.jpg",
      title: "2018春夏季新款八色纯色浅色系时尚简约韩范纯棉学生休闲百搭基础款纯色圆领短袖上衣女T恤",
      desc: "简约而不简单的T恤，\n\n莫过于什么元素都别用，就是一身纯色，\n\n如此简单，却百搭得不行，\n\n搭配衣服的颜色毫无挑剔，\n\n穿出清爽怡人好心情，你心动了吗？\n码：100斤以下 M码：100-110斤 L码：110-125斤 XL码：125-135斤",
      price: "39.00",
      iid: "1lyp2vg",
      count: 1,
      checked: true,
    },
    {
      image: "//s5.mogucdn.com/mlcdn/c45406/180624_6jb1g4kg6i1ab4i4g0echaia49i87_640x960.png",
      title: "杨幂明星同款2018新款白色ins超火短袖t恤女字母宽松纯棉百搭上衣",
      desc: "杨幂明星同款2018新款白色ins超火短袖t恤女字母宽松纯棉百搭上衣",
      price: "37.00",
      iid: "1m4tdhy",
      count: 1,
      checked: true,
    },
    {
      image: "//s5.mogucdn.com/mlcdn/c45406/180907_3jkl78l30c0ijib72lk997gh033ed_640x960.jpg",
      title: "吊带背心女夏2018秋季新款内搭吊带衫短款性感修身针织打底衫上衣显瘦",
      desc: "吊带背心女夏2018秋季新款内搭吊带衫短款性感修身针织打底衫上衣显瘦",
      price: "29.80",
      iid: "1m8a710",
      count: 1,
      checked: true,
    },
    {
      image: "//s11.mogucdn.com/mlcdn/c45406/180126_32lfj6kejffblic5l7agb22ekfi00_640x960.jpg",
      title: "高领黑白条纹长袖t恤女2018春秋新款韩版宽松百搭学生内搭打底衫",
      desc: "此款为2018春秋新款，面料选用类似莫代尔的一种面料~含棉滑布面~材质摸起来手感滑滑的~不起球不褪色！成本价出售，量够升价！喜欢的亲们赶紧下手吧！",
      price: "29.98",
      iid: "1lqxuvu",
      count: 1,
      checked: true,
    }
    ]
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});

export default store;
