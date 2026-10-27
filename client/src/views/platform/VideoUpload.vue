<template>
    <div class="video-upload">
        <input type="file" accept="video/*" @change="onFile" v-if="!uploading && !done" />
        <div v-else class="progress-box">
            <el-progress :percentage="percent" :status="done ? 'success' : undefined"></el-progress>
            <span class="file-name" v-if="done">已上传：{{ fileName }}</span>
        </div>
    </div>
</template>

<script>
import { post } from '@/network/request';

export default {
    name: 'VideoUpload',
    emits: ['uploaded'],
    data() {
        return { uploading: false, done: false, percent: 0, fileName: '', videoUrl: '' };
    },
    methods: {
        async onFile(e) {
            const file = e.target.files[0];
            if (!file) return;
            this.fileName = file.name;
            this.uploading = true;
            this.percent = 0;
            const init = await post('/upload/init', {});
            const uploadId = init.data.data ? init.data.data.uploadId : 'mock';
            const total = 10;
            for (let i = 1; i <= total; i++) {
                await post('/upload/chunk', { uploadId, chunkIndex: i, totalChunks: total });
                this.percent = Math.floor((i / total) * 100);
            }
            const merge = await post('/upload/merge', { uploadId });
            this.videoUrl = merge.data.data ? merge.data.data.url : '';
            this.uploading = false;
            this.done = true;
            this.$emit('uploaded', this.videoUrl);
        }
    }
}
</script>

<style scoped>
.video-upload { border: 1px dashed var(--line_light); border-radius: 8px; padding: 20px; margin-bottom: 18px; }
.progress-box { display: flex; flex-direction: column; gap: 8px; }
.file-name { font-size: 12px; color: var(--text3); }
</style>
