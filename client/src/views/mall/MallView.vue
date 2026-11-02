<template>
    <div class="mall">
        <HeaderBar :isFixHeaderBar="true" :isShowSearchInput="false"></HeaderBar>

        <!-- 会员购顶部品牌栏 -->
        <div class="mall__topbar">
            <div class="mall__brand" @click="goMall">
                <span class="mall__brand-logo">pilipili</span>
                <span class="mall__brand-name">会员购</span>
            </div>
            <span class="mall__divider"></span>
            <span class="mall__brand-sub">商城</span>
            <div class="mall__topbar-right">
                <i class="iconfont icon-dianshi"></i>
                <span @click="goHome">主站</span>
            </div>
        </div>

        <!-- 标签切换 -->
        <div class="mall__tabs">
            <div class="mall__tab" :class="{ active: activeTab === 'event' }" @click="activeTab = 'event'">漫展演出</div>
            <div class="mall__tab" :class="{ active: activeTab === 'goods' }" @click="activeTab = 'goods'">B站周边</div>
        </div>

        <!-- 分类与筛选栏 -->
        <div class="mall__filter">
            <div class="mall__filter-side">
                <div class="mall__filter-btn" @click="openCategory">分类</div>
                <div class="mall__filter-btn" @click="toggleSort">筛选</div>
            </div>
            <div class="mall__filter-body">
                <div class="mall__filter-cats">
                    <span
                        class="mall__filter-cat"
                        :class="{ active: category === '' }"
                        @click="selectCategory('')"
                    >全部</span>
                    <span
                        class="mall__filter-cat"
                        v-for="c in categories"
                        :key="c.name"
                        :class="{ active: category === c.name }"
                        @click="selectCategory(c.name)"
                    >{{ c.name }}</span>
                </div>
                <div class="mall__sortbar">
                    <span class="mall__sort" :class="{ active: sort === '' }" @click="setSort('')">综合</span>
                    <span class="mall__sort" :class="{ active: sort === 'sales' }" @click="setSort('sales')">销量</span>
                    <span class="mall__sort" :class="{ active: sort === 'priceDesc' }" @click="setSort('priceDesc')">价格 ↓</span>
                    <span class="mall__sort" :class="{ active: sort === 'priceAsc' }" @click="setSort('priceAsc')">价格 ↑</span>
                </div>
            </div>
        </div>

        <!-- 商品列表 -->
        <div class="mall__grid" v-if="products.length">
            <div class="mall__card" v-for="p in products" :key="p.id" @click="goDetail(p.id)">
                <div class="mall__card-cover">
                    <img :src="p.coverUrl" :alt="p.title">
                </div>
                <div class="mall__card-title" :title="p.title">{{ p.title }}</div>
                <div class="mall__card-price">
                    <span class="mall__price-symbol">¥</span>
                    <span class="mall__price-num">{{ p.price }}</span>
                    <span class="mall__price-origin" v-if="p.originalPrice">¥{{ p.originalPrice }}</span>
                </div>
            </div>
        </div>
        <div class="mall__empty" v-else>暂无相关商品</div>

        <p class="mall__hint">— 会员购好物 · 数据为演示内容 —</p>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';

export default {
    name: 'MallView',
    components: { HeaderBar },
    data() {
        return {
            activeTab: 'goods',
            category: '',
            sort: '',
            categories: [],
            products: [],
        };
    },
    methods: {
        goHome() { this.$router.push('/'); },
        goMall() { this.$router.push('/mall'); },
        goDetail(id) { this.$router.push(`/product/${id}`); },
        openCategory() {
            // 分类入口：滚动到分类栏（交互占位，分类点击见下方 selectCategory）
            const el = this.$el.querySelector('.mall__filter-cats');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        },
        toggleSort() {
            // 筛选入口：循环切换排序（演示）
            const order = ['', 'sales', 'priceDesc', 'priceAsc'];
            const idx = order.indexOf(this.sort);
            this.setSort(order[(idx + 1) % order.length]);
        },
        selectCategory(name) {
            this.category = name;
            this.getProducts();
        },
        setSort(s) {
            this.sort = s;
            this.getProducts();
        },
        async getCategories() {
            const res = await this.$get('/mall/categories');
            if (res.data && res.data.code === 200) {
                this.categories = res.data.data;
            }
        },
        async getProducts() {
            const res = await this.$get('/mall/products', {
                params: { category: this.category, sort: this.sort }
            });
            if (res.data && res.data.code === 200) {
                this.products = res.data.data;
            }
        }
    },
    created() {
        this.getCategories();
        this.getProducts();
    }
};
</script>

<style scoped>
.mall {
    min-height: 100vh;
    background: #f4f5f7;
    color: var(--text1);
}

/* 顶部品牌栏 */
.mall__topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    background: #fff;
    border-bottom: 1px solid var(--line_light);
    z-index: 1002;
}
.mall__brand {
    display: flex;
    align-items: center;
    cursor: pointer;
}
.mall__brand-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: var(--brand_pink);
    border-radius: 3px;
    letter-spacing: 0;
}
.mall__brand-name {
    margin-left: 6px;
    font-size: 15px;
    font-weight: 700;
    color: var(--brand_pink);
}
.mall__divider {
    width: 1px;
    height: 18px;
    margin: 0 14px;
    background: var(--line_regular);
}
.mall__brand-sub {
    font-size: 15px;
    color: var(--text1);
}
.mall__topbar-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: var(--text2);
    font-size: 14px;
    cursor: pointer;
}
.mall__topbar-right .iconfont {
    font-size: 18px;
    margin-right: 5px;
    color: var(--brand_pink);
}

/* 标签切换 */
.mall__tabs {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    padding-top: 76px;
    padding-bottom: 0;
    background: #fff;
    height: 48px;
}
.mall__tab {
    position: relative;
    height: 48px;
    line-height: 48px;
    font-size: 15px;
    color: var(--text2);
    cursor: pointer;
}
.mall__tab.active {
    color: var(--brand_pink);
    font-weight: 600;
}
.mall__tab.active::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 28px;
    height: 3px;
    border-radius: 2px;
    background: var(--brand_pink);
}

/* 分类与筛选栏 */
.mall__filter {
    display: flex;
    background: #fff;
    border-top: 1px solid var(--line_light);
    border-bottom: 1px solid var(--line_light);
}
.mall__filter-side {
    width: 72px;
    flex: none;
    border-right: 1px solid var(--line_light);
    background: #f6f7f8;
}
.mall__filter-btn {
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 14px;
    color: var(--text2);
    cursor: pointer;
}
.mall__filter-btn:hover {
    color: var(--brand_pink);
}
.mall__filter-body {
    flex: 1;
    min-width: 0;
}
.mall__filter-cats {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    padding: 10px 16px;
    border-bottom: 1px dashed var(--line_light);
}
.mall__filter-cat {
    padding: 4px 12px;
    font-size: 13px;
    color: var(--text2);
    cursor: pointer;
    border-radius: 4px;
}
.mall__filter-cat:hover {
    color: var(--brand_pink);
    background: var(--brand_pink_thin);
}
.mall__filter-cat.active {
    color: var(--brand_pink);
    background: var(--brand_pink_thin);
}
.mall__sortbar {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 10px 16px;
}
.mall__sort {
    font-size: 13px;
    color: var(--text2);
    cursor: pointer;
}
.mall__sort.active {
    color: var(--brand_pink);
    font-weight: 600;
}

/* 商品网格 */
.mall__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    max-width: 1240px;
    margin: 20px auto 0;
    padding: 0 24px;
}
.mall__card {
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    transition: transform .15s ease, box-shadow .15s ease;
}
.mall__card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, .08);
}
.mall__card-cover {
    width: 100%;
    aspect-ratio: 1 / 1;
    background: var(--graph_bg_regular);
    overflow: hidden;
}
.mall__card-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
.mall__card-title {
    padding: 10px 12px 4px;
    font-size: 13px;
    line-height: 1.45;
    color: var(--text1);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 40px;
}
.mall__card-price {
    display: flex;
    align-items: baseline;
    padding: 0 12px 12px;
}
.mall__price-symbol {
    color: var(--brand_pink);
    font-size: 13px;
    font-weight: 700;
}
.mall__price-num {
    color: var(--brand_pink);
    font-size: 20px;
    font-weight: 700;
    margin-left: 1px;
}
.mall__price-origin {
    margin-left: 8px;
    font-size: 12px;
    color: var(--text3);
    text-decoration: line-through;
}
.mall__empty {
    padding: 60px 0;
    text-align: center;
    color: var(--text3);
}
.mall__hint {
    padding: 20px 0 40px;
    text-align: center;
    font-size: 12px;
    color: var(--text3);
}

@media (max-width: 1279.9px) {
    .mall__grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
