<template>
    <div class="cropper">
        <input type="file" accept="image/*" @change="onFile" />
        <canvas ref="canvas" width="240" height="240" class="preview"></canvas>
        <el-button size="small" type="primary" @click="confirm" :disabled="!ready">确认裁剪</el-button>
    </div>
</template>

<script>
export default {
    name: 'CropperComp',
    props: { src: { type: String, default: '' } },
    data() { return { ready: false }; },
    mounted() { if (this.src) this.draw(this.src); },
    watch: { src(v) { if (v) this.draw(v); } },
    methods: {
        onFile(e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = ev => this.draw(ev.target.result);
            reader.readAsDataURL(file);
        },
        draw(src) {
            const img = new Image();
            img.onload = () => {
                const c = this.$refs.canvas;
                const ctx = c.getContext('2d');
                const size = 240;
                const scale = Math.max(size / img.width, size / img.height);
                const w = img.width * scale;
                const h = img.height * scale;
                ctx.clearRect(0, 0, size, size);
                ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
                this.ready = true;
            };
            img.src = src;
        },
        confirm() {
            const dataUrl = this.$refs.canvas.toDataURL('image/png');
            this.$emit('cropped', dataUrl);
        }
    }
}
</script>

<style scoped>
.cropper { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.preview { border: 1px solid var(--line_light); border-radius: 6px; background: #f6f7f8; }
</style>
