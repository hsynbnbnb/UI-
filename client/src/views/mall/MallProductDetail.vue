<template>
    <div class="product-detail">
        <HeaderBar :isFixHeaderBar="true" :isShowSearchInput="false"></HeaderBar>

        <div class="pd__wrap" v-if="product">
            <!-- 商品图 -->
            <div class="pd__hero">
                <img :src="product.coverUrl" :alt="product.title">
            </div>

            <!-- 价格与标题 -->
            <div class="pd__block">
                <div class="pd__price-row">
                    <span class="pd__price">¥{{ product.price }}</span>
                    <span class="pd__origin" v-if="product.originalPrice">¥{{ product.originalPrice }}</span>
                    <span class="pd__sold">已售{{ product.sold >= 10000 ? (product.sold / 10000).toFixed(1) + '万' : product.sold }} · 快递包邮</span>
                </div>
                <h1 class="pd__title">{{ product.title }}</h1>
                <div class="pd__tags">
                    <span class="pd__tag">正品保障</span>
                    <span class="pd__tag">7天无理由</span>
                    <span class="pd__tag">顺丰包邮</span>
                </div>
            </div>

            <!-- 规格 -->
            <div class="pd__block">
                <button class="pd__spec" @click="toast('规格选择面板（演示）')">
                    <span>
                        <span class="pd__spec-label">已选</span>
                        {{ product.tags[0] }} · 标准版，官方标配
                    </span>
                    <span class="pd__spec-arrow">›</span>
                </button>
            </div>

            <!-- 评价 -->
            <div class="pd__block">
                <div class="pd__reviews-head">
                    <span class="pd__reviews-count">宝贝评价（{{ reviews.length + 286 }}）</span>
                    <button class="pd__more" @click="toast('全部评价（演示）')">查看全部 ›</button>
                </div>
                <div class="pd__review" v-for="r in reviews.slice(0, 1)" :key="r.id">
                    <div class="pd__review-avatar">{{ r.user[0] }}</div>
                    <div class="pd__review-body">
                        <div class="pd__review-name">{{ r.user }}</div>
                        <p class="pd__review-text">{{ r.text }}</p>
                        <div class="pd__review-meta">{{ r.date }}</div>
                    </div>
                </div>
            </div>

            <!-- 店铺 -->
            <div class="pd__block">
                <div class="pd__shop">
                    <div class="pd__shop-avatar">{{ product.shop[0] }}</div>
                    <span class="pd__shop-name">{{ product.shop }}</span>
                    <button class="pd__shop-btn" @click="toast('进入店铺（演示）')">进店 ›</button>
                </div>
            </div>
        </div>

        <div class="pd__notfound" v-else>
            <div class="pd__notfound-icon">📦</div>
            <p>商品不存在或已下架</p>
            <button class="pd__back" @click="$router.push('/mall')">返回商城</button>
        </div>

        <!-- 底部操作栏 -->
        <div class="pd__bar" v-if="product">
            <button class="pd__bar-item" @click="toast('店铺主页（演示）')">
                <i class="iconfont icon-dianpu"></i>
                <span>店铺</span>
            </button>
            <button class="pd__bar-item" @click="toast('客服会话（演示）')">
                <i class="iconfont icon-kefu"></i>
                <span>客服</span>
            </button>
            <button class="pd__bar-item" @click="$router.push('/cart')">
                <i class="iconfont icon-gouwuche"></i>
                <span>购物车</span>
            </button>
            <div class="pd__bar-btns">
                <button class="pd__btn pd__btn--orange" @click="addToCart">加入购物车</button>
                <button class="pd__btn pd__btn--primary" @click="buyNow">立即购买</button>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';
import { ElMessage } from 'element-plus';

export default {
    name: 'MallProductDetail',
    components: { HeaderBar },
    data() {
        return {
            product: null,
            reviews: [],
        };
    },
    methods: {
        toast(msg) { ElMessage.info(msg); },
        async getProduct() {
            const id = this.$route.params.id;
            const res = await this.$get(`/mall/product/${id}`);
            if (res.data && res.data.code === 200) {
                this.product = res.data.data;
            } else {
                this.product = null;
            }
        },
        async getReviews() {
            const res = await this.$get('/mall/reviews');
            if (res.data && res.data.code === 200) {
                this.reviews = res.data.data;
            }
        },
        addToCart() {
            this.$store.dispatch('addCartItem', { product: this.product, qty: 1 });
            ElMessage.success('已加入购物车');
        },
        buyNow() {
            this.$store.dispatch('addCartItem', { product: this.product, qty: 1 });
            this.$router.push('/cart');
        }
    },
    created() {
        this.getProduct();
        this.getReviews();
    }
};
</script>

<style scoped>
.product-detail {
    min-height: 100vh;
    background: #f4f5f7;
    color: var(--text1);
    padding-bottom: 80px;
}

.pd__wrap {
    display: flex;
    max-width: 1100px;
    margin: 84px auto 0;
    gap: 20px;
}
.pd__hero {
    flex: none;
    width: 420px;
    height: 420px;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
}
.pd__hero img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
.pd__block {
    background: #fff;
    border-radius: 8px;
    padding: 18px 20px;
    margin-bottom: 14px;
}
.pd__block:first-of-type {
    margin-top: 0;
}

.pd__price-row {
    display: flex;
    align-items: baseline;
    gap: 10px;
    color: var(--brand_pink);
}
.pd__price {
    font-size: 28px;
    font-weight: 800;
}
.pd__origin {
    font-size: 14px;
    color: var(--text3);
    text-decoration: line-through;
}
.pd__sold {
    font-size: 13px;
    color: var(--text3);
}
.pd__title {
    font-size: 17px;
    font-weight: 600;
    line-height: 1.5;
    margin-top: 10px;
}
.pd__tags {
    display: flex;
    gap: 8px;
    margin-top: 12px;
}
.pd__tag {
    font-size: 12px;
    color: var(--brand_pink);
    background: var(--brand_pink_thin);
    border-radius: 4px;
    padding: 3px 8px;
}
.pd__spec {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 14px;
    color: var(--text1);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
}
.pd__spec-label {
    color: var(--text3);
    margin-right: 10px;
}
.pd__spec-arrow {
    color: var(--text3);
    font-size: 18px;
}

.pd__reviews-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 12px;
}
.pd__reviews-count {
    font-size: 15px;
    font-weight: 700;
}
.pd__more {
    font-size: 13px;
    color: var(--text3);
    background: transparent;
    border: none;
    cursor: pointer;
}
.pd__review {
    display: flex;
    gap: 10px;
}
.pd__review-avatar {
    flex: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffd666, #ff9a3d);
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}
.pd__review-name {
    font-size: 13px;
    font-weight: 600;
}
.pd__review-text {
    font-size: 13px;
    line-height: 1.5;
    color: var(--text2);
    margin-top: 4px;
}
.pd__review-meta {
    font-size: 12px;
    color: var(--text3);
    margin-top: 6px;
}

.pd__shop {
    display: flex;
    align-items: center;
    gap: 10px;
}
.pd__shop-avatar {
    flex: none;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--brand_pink);
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}
.pd__shop-name {
    font-size: 15px;
    font-weight: 600;
}
.pd__shop-btn {
    margin-left: auto;
    padding: 6px 16px;
    font-size: 13px;
    color: var(--brand_pink);
    background: transparent;
    border: 1px solid var(--brand_pink);
    border-radius: 16px;
    cursor: pointer;
}

.pd__notfound {
    padding: 120px 0;
    text-align: center;
    color: var(--text3);
}
.pd__notfound-icon {
    font-size: 48px;
}
.pd__notfound p {
    margin: 12px 0 20px;
    font-size: 15px;
}
.pd__back {
    padding: 8px 24px;
    border: none;
    border-radius: 6px;
    background: var(--brand_pink);
    color: #fff;
    cursor: pointer;
}

/* 底部操作栏 */
.pd__bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    background: #fff;
    border-top: 1px solid var(--line_regular);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
}
.pd__bar-item {
    flex: none;
    width: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    font-size: 11px;
    color: var(--text2);
    background: transparent;
    border: none;
    cursor: pointer;
}
.pd__bar-item .iconfont {
    font-size: 20px;
}
.pd__bar-btns {
    display: flex;
    gap: 12px;
    margin-left: 20px;
}
.pd__btn {
    width: 160px;
    height: 42px;
    font-size: 15px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
}
.pd__btn--orange {
    background: linear-gradient(135deg, #ffb64d, #ff8f1f);
    color: #fff;
}
.pd__btn--primary {
    background: var(--brand_pink);
    color: #fff;
}
.pd__btn--primary:hover {
    background: var(--brand_pink_hover, #FF8CB0);
}
</style>
