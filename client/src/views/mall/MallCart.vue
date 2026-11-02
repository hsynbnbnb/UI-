<template>
    <div class="cart">
        <HeaderBar :isFixHeaderBar="true" :isShowSearchInput="false"></HeaderBar>

        <div class="cart__head">
            <span class="cart__title">购物车</span>
        </div>

        <div class="cart__wrap" v-if="grouped.length">
            <section class="cart-shop" v-for="[shop, shopItems] in grouped" :key="shop">
                <div class="cart-shop__head">
                    <span class="checkbox" :class="{ 'checkbox--checked': shopItems.every(i => i.selected) }" @click="toggleShop(shopItems)">
                        <i v-if="shopItems.every(i => i.selected)" class="iconfont icon-gou"></i>
                    </span>
                    <span class="cart-shop__name">{{ shop }} ›</span>
                </div>
                <div class="cart-item" v-for="item in shopItems" :key="item.id">
                    <span class="checkbox" :class="{ 'checkbox--checked': item.selected }" @click="toggleItem(item.id)">
                        <i v-if="item.selected" class="iconfont icon-gou"></i>
                    </span>
                    <img class="cart-item__cover" :src="item.coverUrl" :alt="item.title">
                    <div class="cart-item__body">
                        <h3 class="cart-item__title">{{ item.title }}</h3>
                        <span class="cart-item__spec">{{ item.spec }}</span>
                        <div class="cart-item__price">¥{{ item.price }}</div>
                    </div>
                    <div class="cart-item__right">
                        <div class="stepper">
                            <button :disabled="item.qty <= 1" @click="updateQty(item.id, item.qty - 1)">−</button>
                            <span>{{ item.qty }}</span>
                            <button @click="updateQty(item.id, item.qty + 1)">+</button>
                        </div>
                        <button class="cart-item__del" @click="removeItem(item.id)">删除</button>
                    </div>
                </div>
            </section>
        </div>

        <div class="cart__empty" v-else>
            <div class="cart__empty-icon">🛒</div>
            <p>购物车是空的，去商城逛逛吧~</p>
            <button class="cart__go" @click="$router.push('/mall')">去购物</button>
        </div>

        <div class="cart__footer" v-if="items.length">
            <button class="check-all" @click="toggleAll">
                <span class="checkbox" :class="{ 'checkbox--checked': allSelected }">
                    <i v-if="allSelected" class="iconfont icon-gou"></i>
                </span>
                全选
            </button>
            <div class="cart__total">合计：<strong>¥{{ selectedTotal.toFixed(0) }}</strong></div>
            <button class="cart__checkout" @click="checkout">去结算({{ selectedCount }})</button>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';
import { ElMessage } from 'element-plus';

export default {
    name: 'MallCart',
    components: { HeaderBar },
    computed: {
        items() { return this.$store.state.cartItems; },
        grouped() {
            const map = new Map();
            this.items.forEach(item => {
                const list = map.get(item.shop) || [];
                list.push(item);
                map.set(item.shop, list);
            });
            return [...map.entries()];
        },
        allSelected() {
            return this.items.length > 0 && this.items.every(i => i.selected);
        },
        selectedCount() {
            return this.items.filter(i => i.selected).reduce((n, i) => n + i.qty, 0);
        },
        selectedTotal() {
            return this.items.filter(i => i.selected).reduce((sum, i) => sum + i.price * i.qty, 0);
        }
    },
    methods: {
        toggleItem(id) { this.$store.dispatch('toggleCartSelect', id); },
        toggleShop(shopItems) {
            const allSelected = shopItems.every(i => i.selected);
            shopItems.forEach(i => {
                if (i.selected === allSelected) this.$store.dispatch('toggleCartSelect', i.id);
            });
        },
        toggleAll() { this.$store.dispatch('toggleCartSelectAll', !this.allSelected); },
        updateQty(id, qty) { this.$store.dispatch('updateCartQty', { id, qty }); },
        removeItem(id) {
            this.$store.dispatch('removeCartItem', id);
            ElMessage.success('已删除该商品');
        },
        checkout() {
            if (this.selectedCount === 0) {
                ElMessage.warning('请先选择要结算的商品');
                return;
            }
            ElMessage.info(`结算 ${this.selectedCount} 件商品，合计 ¥${this.selectedTotal}（演示）`);
        }
    },
    created() {
        this.$store.dispatch('loadCart');
    }
};
</script>

<style scoped>
.cart {
    min-height: 100vh;
    background: #f4f5f7;
    color: var(--text1);
    padding-bottom: 90px;
}
.cart__head {
    padding-top: 84px;
    text-align: center;
}
.cart__title {
    font-size: 22px;
    font-weight: 700;
}
.cart__wrap {
    max-width: 860px;
    margin: 16px auto 0;
    padding: 0 24px;
}
.cart-shop {
    background: #fff;
    border-radius: 8px;
    margin-bottom: 14px;
    padding: 4px 16px 8px;
}
.cart-shop__head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 0 10px;
    font-size: 14px;
    font-weight: 600;
}
.cart-shop__name {
    cursor: pointer;
}
.cart-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
}
.cart-item + .cart-item {
    border-top: 1px solid var(--line_light);
}
.cart-item__cover {
    flex: none;
    width: 80px;
    height: 80px;
    border-radius: 6px;
    object-fit: cover;
    background: var(--graph_bg_regular);
}
.cart-item__body {
    flex: 1;
    min-width: 0;
}
.cart-item__title {
    font-size: 14px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.cart-item__spec {
    display: inline-block;
    font-size: 12px;
    color: var(--text3);
    background: var(--graph_bg_thin);
    border-radius: 4px;
    padding: 2px 8px;
    margin-top: 8px;
}
.cart-item__price {
    color: var(--brand_pink);
    font-weight: 700;
    font-size: 16px;
    margin-top: 8px;
}
.cart-item__right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    align-self: stretch;
}
.cart-item__del {
    font-size: 12px;
    color: var(--text3);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 4px;
}

.checkbox {
    flex: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1.5px solid var(--line_regular);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    transition: all .15s ease;
}
.checkbox--checked {
    background: var(--brand_pink);
    border-color: var(--brand_pink);
}
.checkbox .iconfont {
    font-size: 12px;
}

.stepper {
    display: flex;
    align-items: center;
    border: 1px solid var(--line_regular);
    border-radius: 4px;
    overflow: hidden;
}
.stepper button {
    width: 30px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--text2);
    background: #fff;
    border: none;
    cursor: pointer;
}
.stepper button:disabled {
    color: var(--text3);
    opacity: .5;
}
.stepper span {
    min-width: 32px;
    text-align: center;
    font-size: 13px;
    border-left: 1px solid var(--line_regular);
    border-right: 1px solid var(--line_regular);
    line-height: 26px;
}

.cart__empty {
    padding: 80px 0;
    text-align: center;
    color: var(--text3);
}
.cart__empty-icon {
    font-size: 48px;
}
.cart__empty p {
    margin: 12px 0 20px;
    font-size: 14px;
}
.cart__go {
    padding: 8px 28px;
    border: none;
    border-radius: 20px;
    background: var(--brand_pink);
    color: #fff;
    cursor: pointer;
}

.cart__footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 64px;
    background: #fff;
    border-top: 1px solid var(--line_regular);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    z-index: 1001;
}
.check-all {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--text1);
    background: transparent;
    border: none;
    cursor: pointer;
}
.cart__total {
    font-size: 13px;
    color: var(--text2);
}
.cart__total strong {
    color: var(--brand_pink);
    font-size: 20px;
    font-weight: 800;
}
.cart__checkout {
    height: 42px;
    padding: 0 32px;
    border: none;
    border-radius: 20px;
    background: var(--brand_pink);
    color: #fff;
    font-size: 15px;
    cursor: pointer;
}
</style>
