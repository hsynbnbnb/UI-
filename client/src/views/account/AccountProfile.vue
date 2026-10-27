<template>
    <div class="profile">
        <h2 class="block-title">个人资料</h2>
        <div class="profile-row">
            <span class="label">头像</span>
            <div class="avatar-box" @click="openCropper">
                <img :src="avatar || defaultAvatar" alt="头像" />
                <span class="edit-mask">修改</span>
            </div>
        </div>
        <div class="profile-row">
            <span class="label">昵称</span>
            <el-input v-model="form.nickname" maxlength="20" show-word-limit style="max-width: 360px;"></el-input>
        </div>
        <div class="profile-row">
            <span class="label">性别</span>
            <el-radio-group v-model="form.gender">
                <el-radio :label="0">保密</el-radio>
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
            </el-radio-group>
        </div>
        <div class="profile-row">
            <span class="label">简介</span>
            <el-input type="textarea" v-model="form.description" :rows="3" maxlength="100" show-word-limit
                      style="max-width: 360px;"></el-input>
        </div>
        <el-button type="primary" @click="save">保存修改</el-button>

        <CropperDefault :visible="cropperVisible" :src="avatar || defaultAvatar"
                        @close="cropperVisible = false" @cropped="onCropped"></CropperDefault>
    </div>
</template>

<script>
import { get, post } from '@/network/request';
import CropperDefault from '@/components/cropper/CropperDefault.vue';

export default {
    name: 'AccountProfile',
    components: { CropperDefault },
    props: { user: { type: Object, default: () => ({}) } },
    data() {
        return {
            defaultAvatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
            form: { nickname: '', gender: 2, description: '' },
            avatar: '',
            cropperVisible: false
        };
    },
    created() { this.load(); },
    methods: {
        async load() {
            const base = this.user && this.user.nickname ? this.user : null;
            if (base) {
                this.form.nickname = base.nickname || '';
                this.form.gender = base.gender !== undefined ? base.gender : 2;
                this.form.description = base.description || '';
                this.avatar = base.avatar_url || base.avatar || '';
            }
            const res = await get('/user/account/info');
            if (res.data.code === 200) {
                const u = res.data.data;
                this.form.nickname = u.nickname || this.form.nickname;
                this.form.gender = u.gender !== undefined ? u.gender : this.form.gender;
                this.form.description = u.description || this.form.description;
                this.avatar = u.avatar_url || this.avatar;
            }
        },
        openCropper() { this.cropperVisible = true; },
        onCropped(dataUrl) {
            this.avatar = dataUrl;
            this.cropperVisible = false;
            this.$message.success('头像已更新（本地预览）');
            post('/user/account/avatar', { avatar_url: dataUrl });
        },
        async save() {
            const fd = new FormData();
            fd.append('nickname', this.form.nickname);
            fd.append('gender', this.form.gender);
            fd.append('description', this.form.description);
            const res = await post('/user/account/info', fd);
            if (res.data.code === 200) {
                this.$message.success('资料已更新');
                this.$store.commit('updateUser', res.data.data || this.user);
            }
        }
    }
}
</script>

<style scoped>
.block-title {
    font-size: 18px;
    margin-bottom: 20px;
    color: var(--text1);
}
.profile-row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.profile-row .label {
    width: 80px;
    color: var(--text3);
    font-size: 14px;
}
.avatar-box {
    position: relative;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
}
.avatar-box img { width: 100%; height: 100%; object-fit: cover; }
.edit-mask {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, .45);
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity .2s;
}
.avatar-box:hover .edit-mask { opacity: 1; }
</style>
