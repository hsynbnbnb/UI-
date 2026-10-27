<template>
    <div class="upload">
        <h2 class="plat-h2">视频投稿</h2>
        <VideoUpload @uploaded="onUploaded"></VideoUpload>
        <div class="field"><label>标题</label>
            <el-input v-model="form.title" maxlength="80" show-word-limit placeholder="填写稿件标题"></el-input>
        </div>
        <div class="field"><label>分区</label>
            <CategorySelect v-model="form.category"></CategorySelect>
        </div>
        <div class="field"><label>标签</label>
            <TagInput v-model="form.tags"></TagInput>
        </div>
        <div class="field"><label>简介</label>
            <el-input type="textarea" v-model="form.desc" :rows="4" maxlength="2000" show-word-limit></el-input>
        </div>
        <el-button type="primary" :disabled="!form.videoUrl" @click="submit">立即投稿</el-button>
    </div>
</template>

<script>
import VideoUpload from './VideoUpload.vue';
import CategorySelect from './CategorySelect.vue';
import TagInput from './TagInput.vue';
import { post } from '@/network/request';

export default {
    name: 'PlatformUpload',
    components: { VideoUpload, CategorySelect, TagInput },
    data() {
        return {
            form: { title: '', category: [], tags: [], desc: '', videoUrl: '' }
        };
    },
    methods: {
        onUploaded(url) { this.form.videoUrl = url; },
        async submit() {
            if (!this.form.title) { this.$message.warning('请填写标题'); return; }
            const res = await post('/video/submit', { ...this.form });
            if (res.data.code === 200) this.$message.success('投稿成功，等待审核');
        }
    }
}
</script>

<style scoped>
.upload { max-width: 720px; }
.plat-h2 { font-size: 18px; margin-bottom: 18px; }
.field { display: flex; align-items: flex-start; margin-bottom: 18px; }
.field > label { width: 64px; padding-top: 8px; color: var(--text3); font-size: 14px; }
.field > *:not(label) { flex: 1; }
</style>
