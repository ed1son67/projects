<template>
    <div class="product-component" >
        <header class="second-menu-container" v-if="brand === '林振合'">
            <div class="second-menu-content" >
                <div class="logo-container" >
                    <img src="../assets/images/linlogo_2.png"  >
                </div>
                <div class="shop-container">
                    <span v-if="language">林振合旗舰店</span>
                    <span v-else >LINZHENHE</span>
                </div>
                <a href="//linzhenhe.tmall.com" target="_blank" rel="noopener noreferrer">
                    <span v-if="language">进入店铺</span>
                    <span v-else >ENTER</span>
                </a>
            </div>
        </header>
        <header class="second-menu-container" v-else>
            <div class="second-menu-content" >
                <div class="logo-container" style="padding-top: 10px;">
                    <img src="../assets/images/benlogo_2.png"  >
                </div>
                <div class="shop-container" >
                    <span v-if="language">本合旗舰店</span>
                    <span v-else >BENHE</span>
                </div>
                <a href="//benhe.tmall.com" target="_blank" rel="noopener noreferrer">
                    <span v-if="language">进入店铺</span>
                    <span v-else >ENTER</span>
                </a>
            </div>
        </header>
        <ul class="kind-container" >
            <li v-for="kind in kinds" :key="kind.id" :class="{choice: kind.isChoice}" @click="changeKindChoice(kind.id)" >
                <span v-if="language">{{kind.name}}</span>
                <span v-else>{{kind.enName}}</span>
            </li>
        </ul>
        <main class="productLists-container" >
            <div class="product-container" v-for="item in items" :key="item.id" @click="jumpToProduct(item.id)"  >
                <div class="product-content-container">
                    <i class="mask"></i>
                    <img :src="oss + item.defaultUrl" >
                </div>
                <span>{{item.name}}</span>
            </div>
            
            <div v-show="result">
                <p v-if="language">抱歉，没有找到相关商品</p>
                <p v-else>Sorry, no results.</p>
            </div>
            <div  v-show="loading">
                <p v-if="language">商品加载中...</p>
                <p v-else>loading...</p>
            </div>
            <div v-show="fail">
                <p v-if="language">网络似乎有点问题，请点击<a @click="queryAll">刷新</a>后重试</p>
                <p v-else>Sorry, please check your network, click <a @click="queryAll">here </a> and try again.</p>
            </div>
        </main>
        <!-- turn page plugin -->
        <div class="page-container">
            <Page :current="nowPage" :page-size=20 :total="totalSize" show-elevator v-on:on-change="pageChange"/>
        </div>
    </div>
</template>

<script>
    import { myAxios } from "../ajax.js";
    export default {
        name: 'ProductList',
        props: {
            brand: {
                type: String,
                required: true
            }
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
            // watch the language change
            language() {
                // reset the page
                this.nowPage = 1;

                for (let index = 0; index < this.kinds.length; index++) {
                    this.kinds[index].isChoice = false;
                }
                this.kinds[0].isChoice = true;
                this.queryAll();
            }
        },
        methods: {
            pageChange(page) {
                
                this.nowPage = page;
                if (this.type === 'new') {
                    this.queryNew();
                } else if (this.type === 'all') {
                    this.queryAll();
                } else {
                    this.queryByKind(this.getNowKind());
                }
            },
            getNowKind() {
                let kind;
                this.kinds.forEach(element => {
                    if (element.isChoice === true)
                        this.language ? kind = element.name : kind = element.enName;
                });
                return kind;
            },  
            changeKindChoice(index) {
                // reset the page
                this.nowPage = 1;

                for (let index = 0; index < this.kinds.length; index++) {
                    this.kinds[index].isChoice = false;
                }
                this.kinds[index].isChoice = true;

                if (index === 0) {
                    this.queryAll();
                } else if (index === 1) {
                    this.queryNew();
                } else {
                   this.queryByKind();
                }
            },
            queryByKind(kindName) {
                this.type = 'kind';     
                this.clearItem();
                this.loading = true;
                this.result = false;
                this.fail = false;

                
                myAxios.getProductsByKind(this.brand, this.getNowKind(), this.nowPage, this.lan).then((res) => {
                    this.loading = false;          
                    this.totalSize = res.data.allSize;          
                    this.setItem(res.data.products, res.data.products.length);
                }).catch((err) => {
                    this.loading = false;
                    this.fail = true;
                })
            },
            queryNew() {
                this.type = 'new';
                this.clearItem();
                this.loading = true;
                this.result = false;
                this.fail = false;


                myAxios.getNewProducts(this.brand, this.nowPage, this.lan).then((res) => {
                    this.loading = false;     
                    this.totalSize = res.data.allSize;          
                    this.setItem(res.data.products, res.data.products.length);
                }).catch((err) => {
                    this.loading = false;
                    this.fail = true;
                })
            },
            queryAll() {
                this.type = 'all';
                this.clearItem();
                this.loading = true;
                this.result = false;
                this.fail = false;


                myAxios.getAllProducts(this.brand, this.nowPage, this.lan).then((res) => {
                    this.loading = false;
                    this.totalSize = res.data.allSize;          
                    this.setItem(res.data.products, res.data.products.length);
                }).catch((err) => {
                    this.loading = false;
                    this.fail = true;
                })
            },
            clearItem() {
                this.items = {};
            },
            setItem(data, number) {
                // get numbers of products and change the number of page size
                if (number === 0) {
                    this.loading = false;
                    this.result = true;
                } else {
                    this.result = false;
                }

                this.items = data;
            },
            jumpToProduct(index) {
                if (this.brand === "林振合") 
                    this.$router.push('linproducts/' + index);
                else 
                    this.$router.push('benproducts/' + index);
            }
        },
        mounted() {
            this.queryAll();
        },
        data() {
            return {
                fail: false,
                loading: true,
                type: 'all',
                nowPage: 1,
                result: false,
                items: [
                    
                    
                ],
                totalSize: 0,
                isActive: true,
                kinds: [
                    {
                        name: '全部产品',
                        enName: 'ALL',
                        id: 0,
                        isChoice: true
                    },
                    {
                        name: '查看新品',
                        enName: 'NEW',
                        id: 1,
                        isChoice: false
                    },
                    {
                        name: '膨化',
                        enName: 'Chips',
                        id: 2,
                        isChoice: false
                    },
                    {
                        name: '压片糖',
                        enName: 'Tablet Candy',
                        id: 3,
                        isChoice: false
                    },
                    {
                        name: '奶糖',
                        enName: 'Milk Tablets',
                        id: 4,
                        isChoice: false
                    },
                    {
                        name: '凝胶糖果',
                        enName: 'Gelatin Candy',
                        id: 5,
                        isChoice: false
                    },
                    {
                        name: '焦香糖果',
                        enName: 'Toffee',
                        id: 6,
                        isChoice: false
                    },
                    {
                        name: '硬糖',
                        enName: 'Hard Candy',
                        id: 7,
                        isChoice: false
                    }
                ],
            }
        }
    }
</script>

<style lang="css" scoped>
    .second-menu-container {
        height: 96px;
        width: 712px;
        margin: 42px auto 36px auto;
        border-radius: 10px;
        border: 2px solid #a3a3a3;
        overflow: hidden;

    }
    .second-menu-content {
        width: 78%;
        height: 100%;
        margin: 0 auto;

        text-align: center;
    }
    .second-menu-content a {
        height: 40px;
        width: 150px;
        text-align: center;
        background-color: #e50112;
        border-radius: 18px;
        font-size: 16px;
        line-height: 40px;
        color: #fff;
        line-height: 40px;
        font-weight: normal;
        display: inline-block;
        vertical-align: middle;
    }
    .logo-container {
        display: inline-block;
        vertical-align: middle;
    }
    .shop-container {
        letter-spacing: 5px;
        text-align: center;
        display: inline-block;
        margin: 0 60px;

    }
    .shop-container::before {
        content: '';
        height: 25px;
        width: 18px;
        display: inline-block;
        border: 4px solid #2b2f93;
        border-right: 0;
        vertical-align: top;
    }
    .shop-container::after {
        content: '';
        height: 25px;
        width: 18px;
        display: inline-block;
        border: 4px solid #2b2f93;
        border-left: 0;
        vertical-align: top;
    }
    /* css of kind navbar */
    .kind-container {
        margin: 48px auto;
        text-align: center;
    }
    
    .kind-container::after {
        content: '';
        height: 0;
        width: 0;
        clear: both;
        display: block;
    }
    .kind-container li {
        color: #333;
        margin: 0 20px ;
        cursor: pointer;
        padding: 0 4px;
        display: inline-block;
    }

    .choice {
        color: #e60112 !important;
        border-bottom: 2px solid #e60112;
    }
    .productLists-container {
        height: auto;
        width: 1530px;
        margin: 0 auto;
        min-height: 461px;    
        clear: both;
    }
    .productLists-container::after {
        content: "";
        height: 0;    
        width: 0;
        display: block;        
        clear: both;          
        visibility: hidden; 
    }
    .productLists-container p {
        text-align: center;
        margin: 0 auto;
        padding-top: 100px;
    }
    .product-container {
        width: 270px;
        margin: 0 18px;
        border-top: 6px solid #5b9dd9;
        float: left;
    }
    .product-container span {
        width: 270px;
        height: 45px;
        white-space: normal;
        word-wrap: break-word;
        overflow: hidden;
        display: inline-block;
        font-size: 15px;
    }
    .product-content-container  {
        height: 355px;
        width: 100%;
        /* padding-bottom: 28px; */
        line-height: 1.5em;
        position: relative;
        cursor: pointer;
    }
    .product-content-container img {
        height: 342px;
        width: 270px;

    }
    .mask {
        /* content: ""; */
        position: absolute;   
        height: 342px;
        width: 270px;
        top: 0;
        left: 0;
        background: transparent;
        transition: all .3s ease-in-out;
    }

    .product-content-container:hover .mask {
        background: rgba(0, 0, 0, .2);
        

    }

    .page-container {
        margin: 56px auto 64px auto;
    
        text-align: center;
    }
    
</style>