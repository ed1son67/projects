<template>
    <div class="root" >
        <div class="result-container" v-show="tip">
            <div v-if="result">
                <p v-if="language">抱歉，您所查找的商品不存在。</p>
                <p v-else >Sorry, We can't found this product.</p>
            </div>
            <div v-if="loading">
                <p v-if="language">加载中...</p>
                <p v-else >loading...</p>
            </div>
            <div v-if="fail">
                <p v-if="language">网络似乎有点问题，请点击<a @click="queryAll">刷新</a>后重试。</p>
                <p v-else >Sorry, please check your network, click <a @click="queryAll">here </a> and try again.</p>
            </div>
        </div >
        <div class="main-container" v-show="!tip">    
            <nav >
                <Breadcrumb v-if="language" >
                    <span>当前位置：</span>
                    <BreadcrumbItem to="/index">
                        <Icon type="ios-home" /> 首页
                    </BreadcrumbItem>
                    <BreadcrumbItem :to="link">
                        <Icon type="logo-buffer"></Icon> {{shopName}}
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Icon type="ios-cube" />
                        产品详情
                    </BreadcrumbItem>
                </Breadcrumb>
                <Breadcrumb v-else >
                    <span>POSITION: </span>
                    <BreadcrumbItem to="/index">
                        <Icon type="ios-home" /> HOME
                    </BreadcrumbItem>
                    <BreadcrumbItem :to="link">
                        <Icon type="logo-buffer"></Icon> {{shopName}}
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Icon type="ios-cube" />
                        DETAILS
                    </BreadcrumbItem>
                </Breadcrumb>
            </nav>
            <main >
                <div class="img-sidebar container" >
                    <div data-index="0" :class="{showThisPic: isHover.h0}" @mouseover="over"><img :src="oss + detail.urls[0]" alt=""></div>
                    <div data-index="1" :class="{showThisPic: isHover.h1}" @mouseover="over"><img :src="oss + detail.urls[1]" alt=""></div>
                    <div data-index="2" :class="{showThisPic: isHover.h2}" @mouseover="over"><img :src="oss + detail.urls[2]" alt=""></div>
                </div>
                <!-- img detail part -->
                <div class="img-detail-container container" @mousemove="maskMove" @mouseenter="showMask = true" @mouseleave="showMask = false">
                    <img :src="nowPic" >
                    <div class="mask" v-show="showMask"></div>
                    <div class="big" v-show="showMask">
                        <img :src="nowPic" >
                    </div>
                </div>
                <!-- introduct part -->
                <div class="introduce-container container">
                    <div class="name-container">
                        <p>{{detail.name}}</p>
                    </div>
                    <div class="card-container">
                        <div class="vertical-container">
                            <p v-if="language">商品详情</p>
                            <p v-else class="title-container">DETAILS</p>
                        </div>
                        <div class="detail-container">
                            <div>
                                <p>
                                    <span class="detail-img-container"><img src="../assets/images/icon_area.png" ></span>
                                    <span v-if="language">产地</span>
                                    <span v-else>PLACE OF ORIGIN</span>
                                </p>
                                <p class="detail">{{detail.originPlace}}</p>
                            </div>
                            <div style="margin: 40px 0;">
                                <p >
                                    <span class="detail-img-container"><img src="../assets/images/icon_standard.png" ></span>
                                    <span v-if="language">规格</span>
                                    <span v-else>SPECIFICATION</span>
                                </p>
                                <p class="detail">{{detail.weight}}</p>
                            </div>
                            <div>
                                <p>
                                    <span class="detail-img-container"><img src="../assets/images/icon_flaver.png" ></span>
                                    <span v-if="language">口味</span>
                                    <span v-else>FLAVOR</span>
                                </p>
                                <p class="detail">{{detail.flavor}}</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
    import { myAxios } from '../ajax.js'

    export default {
        name: 'Product',
        components:{
            
        },
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
                this.changeNavBar();
                this.querryProduct();
            }
        },
        methods: {
            maskMove(e) {
                let box = e.currentTarget;
                let mask = box.getElementsByTagName('div')[0];
                let big = box.getElementsByTagName('div')[1].getElementsByTagName('img')[0];

                let left = e.pageX - box.offsetLeft - mask.offsetWidth / 2;
                let top = e.pageY - box.offsetTop - mask.offsetHeight / 2;

                if (left <= 0) {
                    left = 0;
                } else if (left > box.offsetWidth - mask.offsetWidth) {
                    left = box.offsetWidth - mask.offsetWidth;
                }

                if (top <= 0) {
                    top = 0;
                } else if (top > box.offsetHeight - mask.offsetHeight) {
                    top = box.offsetHeight - mask.offsetHeight;
                }
                mask.style.left = left + 'px';
                mask.style.top = top + 'px';
                // 大图和小图的倍数

                let times = 400 / mask.offsetWidth;
                let bigLeft = left * times;
                let bigTop = top * times;

                big.style.left = -bigLeft + 'px';
                big.style.top = -bigTop + 'px';

            },
            over(e) {
                let root = e.currentTarget;
                let index = root.getAttribute("data-index");
                let img = root.getElementsByTagName('img')[0].getAttribute('src');
                for (const key in this.isHover) {
                    if (this.isHover.hasOwnProperty(key)) {
                        this.isHover[key] = false; 
                    }
                }
                this.nowPic = img;
                this.isHover['h' + index] = true;
            },
            changeNavBar() {
                if (this.language) {
                    if (this.$route.name === 'Linproducts') 
                        this.shopName = '林振合产品';
                    else 
                        this.shopName = '本合产品';
                } else {
                    if (this.$route.name === 'Linproducts') 
                        this.shopName = 'LINZHENHE';
                    else 
                        this.shopName = 'BENHE';
                }
            },
            querryProduct() {
                this.tip = true;
                this.loading = true;
                this.result = false;
                this.fail = false;


                myAxios.getProductDetail(parseInt(this.$route.params.id), this.lan).then((res) => {
                    if (res.data.id === 0) {
                        this.loading = false;
                        this.result = true;
                    } else {
                        this.tip = false;
                        this.loading = false;      
                
                        this.detail = res.data;
                        
                        // set the first pic
                        this.nowPic = this.oss + res.data.urls[0];
                        
                        // set the nav bar
                        if (res.data.trademark == '林振合') 
                            this.link = '/linproducts'
                        else 
                            this.link='/benproducts'
                    }

                }).catch((err) => {
                    this.loading = false;      
                    this.result = false;
                    this.fail = true;
                })
            }
        },
        mounted(){
            this.changeNavBar();
            this.querryProduct();
        },
        data() {
            return {
                tip: true,
                loading: true,
                fail: false,
                result: false,
                shopName: '',
                link:'/',
                detail: {
                    name: '',
                    trademark: '',
                    flavor: '',
                    weight: '',
                    originPlace: '',
                    urls: [

                    ]
                },
                nowPic: '',
                showMask: false,
                isHover: {
                    h0: true,
                    h1: false,
                    h2: false
                }
            }
        }
    }
</script>

<style lang="" scoped>
    .root  {
        width: 100%;
        margin: 0 auto;
        margin-bottom: 60px;
        min-height: 655px;
        text-align: center;
        min-width: 1600px;
    }
    .main-container {
        display: inline-block;
    }
    .main-container nav {
        text-align: left;
        margin: 35px 0;
    }
    .main-container::after {
        content: "";
        height: 0;    
        width: 0;
        display: block;        
        clear: both;          
        visibility: hidden; 
    }
    .container {
        display: inline-block;
        vertical-align: top;
    }
    

    /* sidebar */
    .img-sidebar {
        margin-right: 66px;
    }
    .img-sidebar div {
        height: 158px;
        width: 158px;
        /* background-color: #000; */
        margin-bottom: 30px;
        border-radius: 4px;
        border: 2px solid #333;
    }
    
    .img-sidebar img {
        height: 130px;
        width: 130px;
        margin: 14px;
    }
    .showThisPic {
        border-color: #5b9dd9 !important;
    }
    .img-detail-container {
        height: 516px;
        width: 516px;
        margin-right: 112px;
        position: relative;
        padding-top: 8px;
    }
    
    /* detail img */
    .img-detail-container img {
        height: 516px;
        width: 516px;
    }
    .mask {
        height: 350px;
        width: 350px;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .6);
        cursor: move;
    }
    .big {
        height: 560px;
        width: 800px;
        position: absolute;
        left: 530px;
        top: 0;
        background-color: #000;
        z-index: 999;
        overflow: hidden;
        border: 1px solid rgb(148, 148, 148);
        box-shadow: rgba(0, 0, 0, 0.25) 0px 6px 8px 2px;
    }
    .big img {
        height: 1000px;
        width: 1000px;
        position: absolute;
        top: 0;
        left: 0;
    }
    
    .name-container {
        font-size: 32px;
        position: relative;
        width: 600px;
        text-align: left;
        margin-top: 20px;
    }
    .name-container p {
        min-height: 48px;
        max-height: 96px;
        overflow: hidden;

    }
    .name-container::after {
        content: "";
        height: 8px;
        width: 392px;
        display: block;
        background-color: #000;
        margin-top: 52px;
    }
    .card-container {
        height: 230px;
        width: 560px;
        border-radius: 5px;
        border: 1px solid #333;
        margin-top: 85px;
        position: relative;
        text-align: left;
        
    }
    .card-container::before {
        content: "";
        height: 8px;
        width: 164px;
        display: block;
        position:absolute;
        background-color: #07b5fa;
        top: -72px;
        left: -1px;
    }
    .vertical-container {
        float: left;
        width: 79px;
    }
    .vertical-container p {
        font-size: 20px;
        width: 20px;
        display: inline-block;
        line-height: 25px;
        height: 100px;
        margin: 60px 0;

    }
    .vertical-container .title-container {
        margin: 0;
        height: auto;
        width: auto;
        transform: rotateZ(90deg);
        position:absolute;
        top: 50%;
        margin-top: -10px;
        left: 23px;

    }
    .vertical-container::before {
        content: "";
        height: 160px;
        width: 4px;
        background-color: #e60112;
        display: inline-block;
        vertical-align: top;
        margin: 35px 20px 35px 35px;
    }
    
    .detail-container {
        float: left;
        margin: 33px 15px;
        font-size: 18px;
    }
    .detail-container div {
        margin: 0;
    }
    .detail-img-container {
        width: 80px;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        height: 26px;
    }
    .detail-container p {
        display: inline-block;
        vertical-align: middle;
        width: 150px;
    }
    .detail {
        overflow: hidden;
        width: 290px !important;
        height: 27px;
    }
    .en .detail-container p {
        font-size: 15px;
        vertical-align: middle;
        width: 220px;
    }
    .en .detail {
        width: 201px !important;
        
        
    }
    .en .detail-img-container {
        width: 65px;
    }
    .result-container {
        height: 456px;
        text-align: center;
    }
    .result-container p {
        padding: 150px 0;
    }
</style>