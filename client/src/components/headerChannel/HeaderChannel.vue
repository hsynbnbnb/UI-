<template>
    <div class="header-channel">
        <!-- 左边：动态 / 热门 -->
        <div class="channel-icons">
            <div class="channel-icons__item" @click="goSearch('动态')">
                <div class="icon-bg icon-bg__dynamic">
                    <picture class="v-img icon-bg--up" v-if="dynamicPic">
                        <img src="https://cdn.acwing.com/media/user/profile/photo/240972_md_e16c066264.jpg" alt="">
                    </picture>
                    <!-- 动态：轨道图标（Day4-V1 更换，替代原 B 站风车图标） -->
                    <svg class="channel-icon" v-else viewBox="0 0 24 24" width="24" height="24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        aria-hidden="true">
                        <circle cx="12" cy="12" r="3.4"></circle>
                        <ellipse cx="12" cy="12" rx="9.6" ry="4.1" transform="rotate(-24 12 12)"></ellipse>
                        <circle cx="18.2" cy="6.7" r="1.7" fill="currentColor" stroke="none"></circle>
                    </svg>
                </div>
                <span class="icon-title">动态</span>
            </div>
            <div class="channel-icons__item" @click="goSearch('热门')">
                <div class="icon-bg icon-bg__popular">
                    <!-- 热门：上升趋势图标（Day4-V1 更换，替代原 B 站火焰图标） -->
                    <svg class="channel-icon" viewBox="0 0 24 24" width="24" height="24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        aria-hidden="true">
                        <polyline points="4 17 10 11 14 14.5 20 7"></polyline>
                        <polyline points="15 7 20 7 20 12"></polyline>
                    </svg>
                </div>
                <span class="icon-title">热门</span>
            </div>
        </div>
        <!-- 右边：分区列表 -->
        <div class="right-channel-container">
            <div class="channel-items__left" v-if="partitions.length != 0">
                <div class="channel-link" v-for="p in partitions" :key="p.name" @click="goSearch(p.name)">
                    <span>{{ p.name }}</span>
                </div>
            </div>
            <!-- 右侧固定入口 -->
            <div class="channel-items__right">
                <div class="channel-link__right" @click="goSearch('专栏')">
                    <i class="iconfont icon-zhuanlan"></i>
                    <span>专栏</span>
                </div>
                <div class="channel-link__right" @click="goSearch('直播')">
                    <i class="iconfont icon-zhibo"></i>
                    <span>直播</span>
                </div>
                <div class="channel-link__right" @click="goSearch('活动')">
                    <i class="iconfont icon-huodong"></i>
                    <span>活动</span>
                </div>
                <div class="channel-link__right" @click="goSearch('课堂')">
                    <i class="iconfont icon-ketang"></i>
                    <span>课堂</span>
                </div>
                <div class="channel-link__right" @click="goSearch('社区中心')">
                    <i class="iconfont icon-gonggao"></i>
                    <span>社区中心</span>
                </div>
                <div class="channel-link__right" @click="goSearch('新歌热榜')">
                    <i class="iconfont icon-xinge"></i>
                    <span>新歌热榜</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HeaderChannel",
        data() {
            return {
                // 是否有新动态以显示其头像，后面可改成获取动态详情
                dynamicPic: false,
                // 分区列表（对齐 Mobileapp partitions）
                partitions: [],
            }
        },
        methods: {
            // 跳转到搜索结果页（与手机端分区点击行为一致）
            goSearch(keyword) {
                this.$router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
            },
            // 获取分区列表
            async getPartitions() {
                const res = await this.$get("/partition/list");
                if (res.data && res.data.data) {
                    this.partitions = res.data.data;
                }
            }
        },
        created() {
            this.getPartitions();
        }
    }
</script>

<style scoped>
.header-channel {
    position: relative;
    width: 100%;
    max-width: calc(1980px + 2 * var(--layout-padding));
    margin: 0 auto;
    padding: 0 var(--layout-padding);
    display: flex;
    align-items: center;
    background: var(--bg1);
}

@media (max-width: 1139.9px) {
    .header-channel {
        width: 1020px;
    }
}

@media (max-width: 1366.9px) {
    .header-channel {
        height: 100px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .header-channel {
        height: 110px;
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .header-channel {
        height: 120px;
    }
}

@media (min-width: 2200px) {
    .header-channel {
        height: 130px;
    }
}

.channel-icons {
    z-index: 0;
    display: flex;
    align-items: center;
}

@media (max-width: 1366.9px) {
    .channel-icons {
        margin-right: 4px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .channel-icons {
        margin-right: 8px;
    }
}

@media (min-width: 1701px) {
    .channel-icons {
        margin-right: 20px;
    }
}

.channel-icons__item {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-right: 16px;
    color: var(--text1);
    cursor: pointer;
}

@media (max-width: 1099.9px) {
    .channel-icons__item {
        margin-right: 10px;
    }
}

@media (min-width: 1100px) and (max-width: 1366.9px) {
    .channel-icons__item {
        margin-right: 16px;
    }
}

@media (min-width: 1367px) and (max-width: 2199.9px) {
    .channel-icons__item {
        margin-right: 24px;
    }
}

@media (min-width: 2200px) {
    .channel-icons__item {
        margin-right: 32px;
    }
}

.icon-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
    border-radius: 50%;
    transition: background-color .3s;
    color: #fff;
}

@media (min-width: 1367px) {
    .icon-bg {
        width: 46px;
        height: 46px;
    }
}

@media (max-width: 1366.9px) {
    .icon-bg {
        width: 40px;
        height: 40px;
    }
}

.icon-bg__dynamic {
    background: #48cc69;
}

.icon-bg__dynamic:hover {
    background: #6eda89;
}

.v-img {
    position: relative;
    display: inline-block;
    line-height: 1;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    background-color: var(--graph_bg_regular);
}

.icon-bg--up {
    overflow: hidden;
    border-radius: 50%;
}

.icon-bg--up>img {
    border-radius: 50%;
}

.v-img img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: inherit;
}

.icon-title {
    text-align: center;
    font-size: 13px;
    line-height: 18px;
}

@media (min-width: 1367px) and (max-width: 2199.9px) {
    .icon-title {
        font-size: 14px;
        line-height: 20px;
    }
}

@media (min-width: 2200px) {
    .icon-title {
        font-size: 15px;
        line-height: 20px;
    }
}

.icon-bg__popular {
    background: #f07775;
}

.icon-bg__popular:hover {
    background: #eb908f;
}

.icon-bg .channel-icon {
    width: 25px;
    height: 25px;
    margin-left: 2px;
    display: block;
}

.right-channel-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.channel-items__left {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    gap: 10px;
    padding-right: 30px;
    border-right: 1px solid var(--line_regular);
}

.channel-link {
    cursor: pointer;
    display: inline-block;
    box-sizing: content-box;
    padding: 0 14px;
    height: 28px;
    line-height: 28px;
    border: 1px solid var(--line_light);
    border-radius: 6px;
    background-color: var(--graph_bg_thin);
    color: var(--text2);
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 2px;
    transition: background-color .3s, color .3s;
}

.channel-link:hover {
    color: var(--brand_pink);
    background-color: var(--graph_bg_thick);
}

@media (max-width: 1366.9px) {
    .channel-link {
        font-size: 13px;
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
    }
}

.channel-items__right {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-auto-flow: column;
    grid-row-gap: 10px;
    flex-shrink: 0;
}

@media (max-width: 1099.9px) {
    .channel-items__right {
        width: 210px;
    }
}

@media (min-width: 1100px) and (max-width: 1366.9px) {
    .channel-items__right {
        width: 230px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .channel-items__right {
        width: 240px;
    }
}

@media (min-width: 1701px) {
    .channel-items__right {
        width: 258px;
    }
}

.channel-link__right {
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    color: var(--text2);
    text-align: center;
    font-weight: 400;
    transition: color .3s;
    cursor: pointer;
}

.channel-link__right:hover {
    color: var(--brand_pink);
}

@media (max-width: 1366.9px) {
    .channel-link__right {
        font-size: 13px;
        height: 28px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .channel-link__right {
        font-size: 14px;
        height: 28px;
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .channel-link__right {
        font-size: 14px;
        height: 32px;
    }
}

@media (min-width: 2200px) {
    .channel-link__right {
        font-size: 15px;
        height: 32px;
    }
}
</style>
