<template>
    <div class="root" >
        <header class="second-header" :class="{fixed: isFixed}">
            <div class="logo-container">
                <img src="../assets/images/logo.png" alt="">
            </div>
            <ul >
                <li v-for="list in lists" :key="list.index" :class="{listActive: list.active}" @click="scrollTo(list.target)">
                    <span v-if="language == true">{{list.name}}</span>
                    <span v-else>{{list.enName}}</span>
                </li>
                <li @click="$router.push('benproducts')">
                    <span v-if="language == true">本合产品</span>
                    <span v-else>BENHE</span>
                </li>
                <li @click="$router.push('linproducts')">
                    <span v-if="language == true">林振合产品</span>
                    <span v-else>LINZHENHE</span>
                </li>

                <div class="language-container">
                    <div>
                        <button :class="{switch: language}" @click="switchLanguage(true)">中</button>
                        <span>|</span>
                        <button :class="{switch: !language}" @click="switchLanguage(false)">EN</button>
                    </div>
                </div>
            </ul>
        </header>
        <main>
            <div class="banner-container">
                <div class="banner" >
                    <img :src="bannerLink" alt="">

                    <div class="slogen-container">
                        <h1 v-if="language">本合</h1>
                        <h1 v-else >BENHE</h1>
                        <p v-if="language">买得开心·吃得放心·寻得开心</p>
                        <p v-else>Buy well·Eat relievedly·Find happily</p>
                    </div>
                </div>        
            </div>
            <div class="title-container">
                <span v-if="language">{{lists[1].name}}</span>
                <span v-else>{{lists[1].enName}}</span>  
            </div>
            <div class="profile-row-container" >
                <div class="profile-container " v-if="language">
                    <p>
                        <span>潮州市潮安区本合食品有限公司</span> 
                        创建于1998年，其前身为潮州市庵埠本合糖果食品厂。该公司是粤东地区一家在食品行业具有一定规模、又有其影响力的企业，生产的产品以其外观悦人、口感独特、品质可靠等特质赢得了广大消费者的肯定和青睐；销售量基于广大消费者的支持也日已攀升。
                    </p>
                </div>
                <div class="profile-container" v-else >
                    <p>
                        <span>Chaozhou Chaoan Benhe Food Co., LTD</span>
                        was founded in 1998, its predecessor was Chaozhou Anbu Benhe Confectionery Factory. The company is with a large scale and influence in the food industry in China. The products have won the affirmation and favor of the majority of consumers for their pleasant appearance, unique taste, reliable quality and other characteristics. Sales have also been rising on the back of broad consumer support.
                    </p>
                </div>
                <div class="profile-container ">
                    <img src="../assets/images/factory1.png" alt="">
                </div>
                <div class="profile-container" v-if="language">
                    <p>
                        公司在销售策略上，以市场为导向，围绕满足市场需求、迎合消费者的意愿开展企业一切经营活动，并与全国各地一批信誉好、实力强、渠道畅的经销商建立长期的合作关系，以大、中城市为主线，向周边城市、乡镇辐射。
                        <span>诚邀各界人士合作，共创美好的明天。</span>
                    </p>
                </div>
                <div class="profile-container" v-else >
                    <p>
                        In terms of sales strategy, the company takes the market as the guide, develops all business activities centering on meeting market needs and catering to consumers' wishes, and establishes long-term cooperative relationship with a batch of dealers with good reputation, strong strength and smooth channels all over the country. It sets up surrounding cities and towns with large and medium cities as the main line. 
                        
                        <span>We sincerely invite people from all walks of life to cooperate and create a better tomorrow.</span>
                    </p>
                </div>
            </div>
            <div class="profile-row-container" >
                <div class="profile-container">
                    <img src="../assets/images/factory2.png" alt="">

                </div>
                <div class="profile-container" v-if="language">
                    <p>公司本着 
                        <span>“消费者为上帝的宗旨”</span>
                        ，凭借先进的食品生产设备、高素质的技术人才队伍、严密的管理机制，力求产品的风味更诱人，生产过程更卫生，且更加严格遵照卫生规范制度，为消费者营造一个
                        <span>“买得顺心、吃得放心、寻得开心”</span> 
                        的消费氛围。
                    </p>
                </div>
                 <div class="profile-container" v-else>
                    <p>The company is in line with the tenet of
                        <span>"customers as god"</span>
                        Relying on advanced food production equipment, high-quality technical personnel, strict management mechanism, it strives for the flavour of the product more attractive, the production process cleaner, and more strictly comply with health standard system, for consumers to create a
                        <span>"buy, eat and find at ease"</span>
                        consumption atmosphere.
                    </p>
                </div>
                <div class="profile-container">
                    <img src="../assets/images/factory3.png" alt="">
                </div>
            </div>

            <!-- hot sale product container -->
            <div class="title-container" style="margin: 120px auto 74px auto;">
                <span v-if="language">{{lists[2].name}}</span>
                <span v-else>{{lists[2].enName}}</span>  
            </div>
           
            <div class="hot-sale-row-container" >
                <div v-show="tip" class="tips-container"> 
                    <div v-show="loading">
                        <span v-if="language">商品加载中...</span>
                        <span v-else>Loading...</span>
                    </div>
                    <div v-show="result">
                        <span v-if="language">热推商品待添加, 您先看看别的吧~</span>
                        <span v-else>Sorry, We are still working on it...</span>
                    </div>
                    <div v-show="fail">
                        <span v-if="language">网络似乎有点问题，点击<a @click="getHotpush">刷新</a>重试</span>
                        <span v-else>Sorry, please check your network, click <a @click="getHotpush()">here </a> and try again.</span>       
                    </div>             
                </div>
                <div class="hot-sale-product-container" v-for="item in items" :key="item.id" @click="jumpToDetail(item.id, item.trademark)" v-show="!tip">
                    <div>
                        <i class="mask"></i>
                        <img :src="oss + item.defaultUrl" alt="">
                    </div>
                    <p>{{item.name}}</p>
                </div>
            </div>
            <div class="title-container" style="margin: 120px auto 72px auto;">
                <span v-if="language">{{lists[3].name}}</span>
                <span v-else>{{lists[3].enName}}</span>  
            </div>
            <!-- shop part -->
            <div class="shop-row-container">
                <div class="shop-container">
                    <div>
                        <span v-if="language">本合旗舰店</span>
                        <span v-else>BENHE</span>
                    </div>
                    <a href="//benhe.tmall.com/" target="blank">
                        <span v-if="language">进入店铺</span>
                        <span v-else >ENTER</span>
                    </a>
                </div>
                <div class="shop-container">
                    <img src="../assets/images/QRcodeben.png" alt="">
                </div>
                <div class="shop-container" id="international">
                    <div>
                        <span v-if="language">阿里巴巴国际站</span>
                        <span v-else>BENHEALIBABA</span>
                    </div>
                    <a href="//benhefoodstuff.en.alibaba.com/" target="blank">
                        <span v-if="language">进入店铺</span>
                        <span v-else >ENTER</span>
                    </a>
                </div>
                
            </div>
            <div class="shop-row-container">
                <div class="shop-container">
                    <img src="../assets/images/QRcodelin.png" alt="">
                </div>
                <div class="shop-container">
                    <div id="shop-lin-container">
                        <span v-if="language">林振合旗舰店</span>
                        <span v-else>LINZHENHE</span>
                    </div>
                    <a href="//linzhenhe.tmall.com/" target="blank">
                        <span v-if="language">进入店铺</span>
                        <span v-else >ENTER</span>
                    </a>         
                </div>
                <div class="shop-container">
                    <img src="../assets/images/QRcodeben.png" alt="">
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import { myAxios } from "../ajax.js";

    export default {
        name: 'Index',
        computed: {
            language() {
                return this.$store.state.language;
            },
            lan() {
                return this.$store.state.lan;
            }
        },
        watch: {
            language() {
                this.getHotpush();
            },
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
            this.getBanner();
            this.getHotpush();
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll)
        },
        methods: {
            easeInOut(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                    return -c / 2 * ((--t) * (t-2) - 1) + b;
            },
            switchLanguage(val) {
                this.$store.commit('changeLanguage', val);
            },
            jumpToDetail(id, brand) {
                let link;
                if (brand === '本合') 
                    link = 'benproducts/'
                else 
                    link = 'linproducts/'
                
                this.$router.push(link + id);
            },
            scrollAnimation(target) {
                /*
                * t: current time（当前时间）；
                * b: beginning value（初始值）；
                * c: change in value（变化量）；
                * d: duration（持续时间）。
                */
                // 兼容性处理     
                if (!window.requestAnimationFrame) {
                    requestAnimationFrame = function(fn) {
                        setTimeout(fn, 17);
                    };	
                }
            
                let scrollTop = this.getScrollTop();
                
                let change = target - scrollTop;

                var t = 0, b = scrollTop, c = change, d = 20;
                let self = this;

                var step = function () {
                   
                    if (document.documentElement && document.documentElement.scrollTop) {
                        document.documentElement.scrollTop = self.easeInOut(t, b, c, d);
                    }
                    else if (document.body) {
                        document.body.scrollTop = self.easeInOut(t, b, c, d);
                    }
                        
                    t++;
                    if (t <= d) {
                        // 继续运动
                        requestAnimationFrame(step);
                    } else {
                        // 动画结束
                        // 函数防抖
                        setTimeout(() => {
                           self.state = false; 
                        }, 200);
                    }
                };

                if (this.state == false) {
                    this.state = true;
                    step();
                }
            },
            scrollTo(target) {
                this.scrollAnimation(target);
            },
            getBanner() {
                // get banner
                myAxios.getBanner().then((res) => {
                    this.bannerLink = 'http://benhe.oss-cn-shenzhen.aliyuncs.com/' + res.data.url
                }).catch((err) => {
                    
                })
            },
            getHotpush(){
                // get hotpush products
                this.tip = true;
                this.loading = true;
                this.fail = false;
                this.result = false;

                myAxios.getHotpush({limite: 5}, this.lan).then((res) => {
                    if (res.data.products.length === 0) {
                        // 数量不足，提示没货
                        this.result = true;
                        this.loading = false;
                    } else {
                        this.tip = false;
                        this.items = res.data.products;
                    }
                }).catch((err) => {
                    this.loading = false;
                    this.fail = true;
                })
            },
            getScrollTop() {  
                var scroll_top = 0;
                if (document.documentElement && document.documentElement.scrollTop) {
                    scroll_top = document.documentElement.scrollTop;
                }
                else if (document.body) {
                    scroll_top = document.body.scrollTop;
                }
                return scroll_top;
            },
            handleScroll() {
                let scrollTop = this.getScrollTop();
                
                // fix the hidden nav bar 
                scrollTop >= 600 ? this.isFixed = true : this.isFixed = false;
        
                let self = this;
                function clear() {
                    for (let index = 0; index < self.lists.length; index++) {
                        self.lists[index].active = false;
                    }
                }

                if (scrollTop >= 0) {
                    clear();
                    this.lists[1].active = true;
                }
                if (scrollTop >= 1746) {
                    clear();
                    this.lists[2].active = true;
                }
                if (scrollTop >= 2450) {
                    clear();
                    this.lists[3].active = true;
                }
                if (scrollTop >= 2500) {
                    clear();
                    this.lists[4].active = true;
                }
            }
        },
        data() {
            return {
                fail: false,
                tip: true,
                loading: true,
                result: false,
                state: false,
                lists: [
                    {
                        name: '回到顶部',
                        enName: 'BACKTOTOP',
                        target: 0,
                        active: false
                    },
                    {
                        name: '公司介绍',
                        enName: 'ABOUT',
                        target: 800,
                        active: true
                    },
                    {
                        name: '热销商品',
                        enName: 'POPULAR',
                        target: 1746,
                        active: false
                    },
                    {
                        name: '天猫旗舰店',
                        enName: 'TMALL',
                        target: 2450,
                        active: false
                    },
                    {
                        name: '联系我们',
                        enName: 'CONTACT',
                        target: 2778,
                        active: false
                    }
                ],
                isFixed: false,
                items: [
                   
                ],
                bannerLink: '',
                value: 0,
                isShow: false,
                queueShow: {
                    show0: false,
                    show1: false,
                    show2: false,
                    show3: false,
                    show4: false
                },
            }
        }
    }
</script>

<style lang="css" scoped>
    .root {
        margin-bottom: 137px; 
        position: relative;
    }   
    
    /* css of the hidden navigation second header */
    .second-header {
        height: 75px; 
        width: 100%;
        background-color: #5a9dd9;
        position: fixed;
        transition: all .3s ease-in-out;
        top: -75px;
        min-width: 1400px;
        z-index: 999;
        opacity: 0;
        box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
        overflow: hidden;
    }
    .second-header ul {
        margin-left: 50px;
        display: inline-block;

    }
    .second-header li {
        height: auto;
        line-height: 75px;
        list-style: none;
        float: left;        
        margin-right: 50px;
        color: #fff;
        position: relative;
        cursor: pointer;
    }
    .fixed { 
        /* transform: translateY(0px); */
        transform: translateY(75px);
        opacity: 1;
        /* top: 0; */
    }
    .logo-container {
        height: 100%;
        display: inline-block;
        vertical-align: top;
        margin-left: 152px;
        padding: 10px 0;
    }
    .logo-container img {
        height: 50px;
    }

    .listActive::after {
        content: "";
        display: block;
        height: 3px;
        width: 100%;
        position: absolute;
        bottom: 17px;
        background-color: #fff;
    }

    .banner-container {
        height: 755px;
        width: 100%;
    }
    .banner {
        height: 755px;
        position: relative;
        text-align: center;
        overflow: hidden;
    }
    .banner img {
        height: 755px;
    }
    .slogen-container {
        color: #fff;
        position: absolute;
        top: 190px;
        left: 300px;
        font-family: 'SimSun'!important;
    }

    .slogen-container h1 {
        font-size: 120px;
        margin-bottom: 30px;
    }

    .slogen-container p {
        font-size: 30px;
    }   
    .title-container {
        width: 500px;
        font-size: 40px;
        color: #000;
        margin: 85px auto 72px auto;
        text-align: center;
    }
    .title-container::before, .title-container::after {
        content: "";
        display: inline-block;
        height: 52px;
        width: 4px;
        margin-right: 27px;
        background-color: #2b2f93;
        vertical-align: text-top;
    }
    .title-container::after {
        margin-left: 27px;
    }

    /* company introduce part */
    .profile-row-container {
        height: 368px;
        margin: 0 auto;
        text-align: center;
        min-width: 1400px;
        overflow: hidden;
    }
    .profile-container {
        width: 450px;
        height: 368px;
        display: inline-block;
        vertical-align: top;
    }
    .profile-container p {
        margin: 20px 25px;
        font-size: 18px;
        letter-spacing: 8px;
        line-height: 1.7em;
        text-align: justify;
    }
    .profile-container p  span {
        color: #438aca;
    }

    /* hot sale part */   
    .hot-sale-row-container {
        height: auto;
        margin: 0 auto;
        text-align: center;
        min-height: 468px;
        overflow: hidden;
        min-width: 1550px;
    } 
    .tips-container{
        font-size: 18px;
        line-height: 200px;
        text-align: center;
    }
    .hot-sale-product-container {
        width: 280px;
        margin: 0 13px;
        border-top: 8px solid #5b9dd9;
        cursor: pointer;
        display: inline-block;
        vertical-align: top;
        
    }
    .hot-sale-product-container div {
        height: 410px;
        width: 100%;
        padding-bottom: 28px;
        line-height: 1.5em;
        position: relative;
    }
    .hot-sale-product-container  img {
        height: 382px;
        width: 280px;
    }
    .hot-sale-product-container p {
        width: 280px;
        white-space: normal;
        word-wrap: break-word;
        height: 50px;
        overflow: hidden;
        text-align: left;
    }

    /* TMall part */
    .shop-row-container {
        height: 247px;
        text-align: center;
        margin: 0 auto;
        overflow: hidden;
        min-width: 950px;
    }
    .shop-container {
        height: 247px;
        width: 452px;
        text-align: center;
        display: inline-block;
        overflow: hidden;
    }
    .shop-container img {
        height: 247px;
        width: 452px;
      
    }
    .shop-container div {
        width: 290px;
        height: 70px;
        line-height: 70px;
        margin: 30px auto 35px auto;
        background: url(../assets/images/benlogo.png) no-repeat center;
        background-size: 70px;
        font-size: 32px;
        letter-spacing: 10px;
        
        position: relative;
    }
    .shop-container div::before {
        content: '';
        height: 70px;
        width: 35px;
        display: block;
        border: 8px solid #2b2f93;
        border-right: 0;
        position: absolute;
        left: 0;
        top: 0;
    }
    .shop-container div::after {
        content: '';
        height: 70px;
        width: 35px;
        display: block;
        border: 8px solid #2b2f93;
        border-left: 0;
        position: absolute;
        right: 10px;
        top: 0;
    }
    #international div {
        width: 390px;
    }
    .en #international div span {
        font-size: 27px;
    }
    #shop-lin-container {
        margin-top: 40px;
        width: 350px;
        background: url(../assets/images/linlogo.png) no-repeat center;
        background-size: 150px;
    }
    #shop-lin-container::before, #shop-lin-container::after {
        border-color: #5b9dd9;
        
    }
    .shop-container a {
        height: 60px;
        width: 180px;
        font-size: 19px;
        letter-spacing: 2px;
        text-align: center;
        line-height: 60px;
        border-radius: 10px;
        background-color: #5b9dd9;
        display: inline-block;
        cursor: pointer;
        color: #fff;

    }
    
    .mask {
        position: absolute;   
        height: 382px;
        width: 280px;
        top: 0;
        left: 0;
        background: transparent;
        transition: all .3s ease-in-out;
    }
    .hot-sale-product-container div:hover .mask {
        background: rgba(0, 0, 0, .3);
    }


    /* CSS of the language switch button */
    .language-container {
        height: 36px;
        width: 105px;
        color: #fff;
        font-weight: normal;
        position: absolute;
        top: 50%;
        margin-top: -16px;
        right: 142px;
        background-color: #ee83b1;
        border-radius: 20px;
    }
    
    .language-container div {
        line-height: 36px;
        width: 80px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .language-container button {
        color: #fff;
        text-align: center;
        width: 50px;
        font-weight: 400;
    }
    /* add css to the switch language button */
    .switch {
        font-weight: 600 !important;
    }

    /* change the style in english */
    .en .slogen-container h1 {
        /* margin: 0 0 0 0; */
        text-align: left;
        margin-left: 0;
    }
    .en .profile-container p {
        margin: 20px;
        font-size: 16px;
        letter-spacing: 0px;
        line-height: 1.8m;
        text-align: justify;
    }
    .en .profile-container p  span {
        color: #438aca;
    }


</style>