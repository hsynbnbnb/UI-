<template>
    <div class="orders">
        <HeaderBar :isFixHeaderBar="true" :isShowSearchInput="false"></HeaderBar>

        <div class="orders__head">
            <span class="orders__title">我的订单</span>
        </div>

        <div class="orders__tabs">
            <span
                class="orders__tab"
                v-for="t in tabs"
                :key="t.key"
                :class="{ active: active === t.key }"
                @click="setTab(t.key)"
            >{{ t.label }}</span>
        </div>

        <div class="orders__wrap">
            <div class="orders__empty" v-if="!list.length">
                <div class="orders__empty-icon">📄</div>
                <p>暂无相关订单</p>
            </div>

            <section class="order-card" v-for="order in list" :key="order.id">
                <div class="order-card__head">
                    <span>{{ order.shop }} ›</span>
                    <span class="order-card__status" :class="statusClass(order.status)">{{ statusMap[order.status] }}</span>
                </div>
                <div class="order-card__item" v-for="item in order.items" :key="item.id" @click="goProduct(item.id)">
                    <img class="order-card__cover" :src="coverOf(item.coverSeed)" :alt="item.title">
                    <div class="order-card__body">
                        <h3 class="order-card__title">{{ item.title }}</h3>
                        <div class="order-card__meta">
                            <span class="order-card__meta-price">¥{{ item.price.toFixed(2) }}</span>
                            <span>x{{ item.qty }}</span>
                        </div>
                    </div>
                </div>
                <div class="order-card__foot">
                    <span class="order-card__total">
                        共{{ order.items.reduce((n, i) => n + i.qty, 0) }}件 合计：<strong>¥{{ order.total.toFixed(2) }}</strong>
                    </span>
                    <template v-if="order.status === 'pending'">
                        <button class="btn btn--ghost" @click="toast('订单已取消（演示）')">取消订单</button>
                        <button class="btn btn--primary" @click="toast('支付成功（演示）')">去支付</button>
                    </template>
                    <template v-if="order.status === 'done'">
                        <button class="btn btn--ghost" @click="toast('评价页（演示）')">去评价</button>
                        <button class="btn btn--outline" @click="toast('已加入购物车')">再次购买</button>
                    </template>
                    <button v-if="order.status === 'unshipped'" class="btn btn--ghost" @click="toast('已提醒卖家发货')">提醒发货</button>
                    <button v-if="order.status === 'unreceived'" class="btn btn--primary" @click="toast('确认收货成功（演示）')">确认收货</button>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';
import { ElMessage } from 'element-plus';

const coverMap = {
    'prod-paimon': require('@/assets/img/cover/cover-1.svg'),
    'prod-fontaine': require('@/assets/img/cover/cover-2.svg'),
    'prod-keyboard': require('@/assets/img/cover/cover-3.svg'),
    'prod-bag': require('@/assets/img/cover/cover-4.svg'),
    'prod-plush': require('@/assets/img/cover/cover-5.svg'),
    'prod-miku': require('@/assets/img/cover/cover-6.svg'),
    'prod-case': require('@/assets/img/cover/cover-1.svg'),
    'prod-hoodie': require('@/assets/img/cover/cover-2.svg'),
    'prod-fan': require('@/assets/img/cover/cover-3.svg'),
    'prod-badge': require('@/assets/img/cover/cover-4.svg'),
};

export default {
    name: 'MallOrders',
    components: { HeaderBar },
    data() {
        return {
            active: 'all',
            orders: [],
            tabs: [
                { key: 'all', label: '全部' },
                { key: 'pending', label: '待付款' },
                { key: 'unshipped', label: '待发货' },
                { key: 'unreceived', label: '待收货' },
                { key: 'refund', label: '售后' },
            ],
            statusMap: {
                pending: '等待买家付款',
                unshipped: '等待卖家发货',
                unreceived: '等待买家收货',
                done: '交易完成',
                refund: '退款/售后',
            }
        };
    },
    computed: {
        list() {
            return this.active === 'all'
                ? this.orders
                : this.orders.filter(o => o.status === this.active);
        }
    },
    methods: {
        toast(msg) { ElMessage.info(msg); },
        setTab(key) { this.active = key; this.getOrders(); },
        goProduct(id) { this.$router.push(`/product/${id}`); },
        coverOf(seed) { return coverMap[seed] || coverMap['prod-paimon']; },
        statusClass(status) {
            return {
                pending: 'order-card__status--pending',
                unshipped: 'order-card__status--unshipped',
                unreceived: 'order-card__status--unreceived',
                done: 'order-card__status--done',
                refund: 'order-card__status--done',
            }[status];
        },
        async getOrders() {
            const res = await this.$get('/mall/orders', { params: { status: this.active } });
            if (res.data && res.data.code === 200) {
                this.orders = res.data.data;
            }
        }
    },
    created() {
        this.getOrders();
    }
};
</script>

<style scoped>
.orders {
    min-height: 100vh;
    background: #f4f5f7;
    color: var(--text1);
    padding-bottom: 40px;
}
.orders__head {
    padding-top: 84px;
    text-align: center;
}
.orders__title {
    font-size: 22px;
    font-weight: 700;
}
.orders__tabs {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin: 20px 0;
}
.orders__tab {
    font-size: 15px;
    color: var(--text2);
    cursor: pointer;
    padding-bottom: 4px;
}
.orders__tab.active {
    color: var(--brand_pink);
    font-weight: 600;
    border-bottom: 2px solid var(--brand_pink);
}
.orders__wrap {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 24px;
}
.orders__empty {
    padding: 60px 0;
    text-align: center;
    color: var(--text3);
}
.orders__empty-icon {
    font-size: 48px;
}
.orders__empty p {
    margin-top: 12px;
}

.order-card {
    background: #fff;
    border-radius: 8px;
    margin-bottom: 14px;
    padding: 16px;
}
.order-card__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 600;
}
.order-card__status--pending { color: var(--brand_pink); }
.order-card__status--unshipped { color: #ff8f1f; }
.order-card__status--unreceived { color: #3b9dff; }
.order-card__status--done { color: var(--text3); }
.order-card__item {
    display: flex;
    gap: 12px;
    padding: 12px 0;
    cursor: pointer;
}
.order-card__cover {
    flex: none;
    width: 64px;
    height: 64px;
    border-radius: 6px;
    object-fit: cover;
    background: var(--graph_bg_regular);
}
.order-card__body {
    flex: 1;
    min-width: 0;
}
.order-card__title {
    font-size: 14px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.order-card__meta {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 13px;
    color: var(--text3);
}
.order-card__meta-price {
    color: var(--text1);
}
.order-card__foot {
    border-top: 1px solid var(--line_light);
    padding-top: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    font-size: 13px;
}
.order-card__total {
    margin-right: auto;
    color: var(--text2);
}
.order-card__total strong {
    color: var(--text1);
    font-size: 15px;
}
.btn {
    padding: 6px 16px;
    font-size: 13px;
    border-radius: 16px;
    cursor: pointer;
    border: none;
}
.btn--ghost {
    background: transparent;
    border: 1px solid var(--line_regular);
    color: var(--text2);
}
.btn--outline {
    background: transparent;
    border: 1px solid var(--brand_pink);
    color: var(--brand_pink);
}
.btn--primary {
    background: var(--brand_pink);
    color: #fff;
}
</style>
