<template>
    <div class="product-detail">
        <HeaderBar :isFixHeaderBar="true" :isShowSearchInput="false"></HeaderBar>

        <!-- 返回商城：带上进入详情页时透传的筛选 query，回到 MallView 后筛选/排序不丢失 -->
        <div class="pd__backbar">
            <button class="pd__back-link" @click="goMall">‹ 返回商城</button>
        </div>

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
                    <!-- W32/M20：sold 口径待后端统一（当前 2.3 与 8901 混用），前端只做展示格式化，不改数据 -->
                    <span class="pd__sold">已售{{ formatSold(product.sold) }} · {{ hasFreeShipping ? '快递包邮' : '运费以结算页为准' }}</span>
                </div>
                <h1 class="pd__title">{{ product.title }}</h1>
                <div class="pd__tags">
                    <span class="pd__tag">正品保障</span>
                    <span class="pd__tag">7天无理由</span>
                    <!-- M35：包邮文案按后端 tags 渲染，不再对所有商品硬编码「顺丰包邮」；运费字段留给后端 -->
                    <span class="pd__tag" v-if="hasFreeShipping">顺丰包邮</span>
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
                    <span class="pd__reviews-count">宝贝评价（{{ reviewCount }}）</span>
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
            <button class="pd__back" @click="goMall">返回商城</button>
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
            <button class="pd__bar-item" @click="goCart">
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
            // W31：评价总数由后端返回（预留 {count, list} 聚合结构），不再用数组长度 + 硬编码 286
            reviewCount: 0,
        };
    },
    computed: {
        // 包邮以商品 tags 为准；运费金额/门槛字段由后端后续提供，前端不臆造
        hasFreeShipping() {
            return Array.isArray(this.product && this.product.tags)
                && this.product.tags.some(t => String(t).includes('包邮'));
        }
    },
    methods: {
        toast(msg) { ElMessage.info(msg); },
        // 销量展示格式化：仅做展示，sold 的单位口径（万 / 绝对数）由后端在契约中统一
        formatSold(sold) {
            const n = Number(sold);
            if (!Number.isFinite(n) || n < 0) return '0';
            return n >= 10000 ? (n / 10000).toFixed(1) + '万' : String(n);
        },
        // 返回商城 / 进入购物车都带上从 MallView 透传的筛选 query，链路返回后状态保留
        goMall() {
            this.$router.push({ path: '/mall', query: this.$route.query });
        },
        goCart() {
            this.$router.push({ path: '/cart', query: this.$route.query });
        },
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
            // 留好接口：按商品维度查询；后端后续可返回 { count, list } 聚合结构
            const res = await this.$get('/mall/reviews', { params: { productId: this.$route.params.id } });
            const payload = res && res.data;
            if (payload && payload.code === 200) {
                const d = payload.data;
                const list = Array.isArray(d) ? d : (d && Array.isArray(d.list) ? d.list : []);
                this.reviews = list;
                // 后端给出 count 时以聚合值为准，否则退化为当前返回条数
                const count = d && !Array.isArray(d) ? Number(d.count) : NaN;
                this.reviewCount = Number.isFinite(count) ? count : list.length;
            } else {
                this.reviews = [];
                this.reviewCount = 0;
            }
        },
        addToCart() {
            this.$store.dispatch('addCartItem', { product: this.product, qty: 1 });
            ElMessage.success('已加入购物车');
        },
        buyNow() {
            this.$store.dispatch('addCartItem', { product: this.product, qty: 1 });
            this.$router.push({ path: '/cart', query: this.$route.query });
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
    /* 顶部留白已由 .pd__backbar 承担，避免与返回条叠加出双份 84px */
    margin: 8px auto 0;
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

/* 顶部返回条（位于 HeaderBar 下方，承接原本 wrap 的 84px 留白） */
.pd__backbar {
    max-width: 1100px;
    margin: 84px auto 0;
    padding-left: 4px;
}
.pd__back-link {
    font-size: 13px;
    color: var(--text2);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 4px 0;
}
.pd__back-link:hover {
    color: var(--brand_pink);
}

/* 底部操作栏：降到吸顶层(100)，避免盖住弹层(1000+)；子元素可收缩，窄屏换行 */
.pd__bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 60px;
    background: #fff;
    border-top: 1px solid var(--line_regular);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    min-width: 0;
    flex-shrink: 1;
    gap: 4px;
    padding: 6px 8px;
    z-index: 100;
}
.pd__bar-item {
    flex: none;
    width: 64px;
    min-width: 0;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    font-size: 11px;
    white-space: nowrap;
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
    min-width: 0;
    flex-shrink: 1;
}
.pd__btn {
    width: 160px;
    min-width: 0;
    flex-shrink: 1;
    height: 42px;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

/* ≤560px：按钮 flex:1 自适应、图标项缩宽，避免固定 544px 宽度挤出屏幕 */
@media (max-width: 560px) {
    .pd__bar {
        height: auto;
        gap: 4px;
        padding: 6px 8px;
    }
    .pd__bar-item {
        width: 44px;
        flex: 0 0 auto;
        font-size: 10px;
    }
    .pd__bar-btns {
        flex: 1;
        margin-left: 8px;
        gap: 8px;
    }
    .pd__btn {
        flex: 1;
        width: auto;
        font-size: 13px;
    }
}
</style>
