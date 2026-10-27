<template>
    <el-dialog :model-value="visible" title="裁剪头像" width="360px" @update:model-value="$emit('close')">
        <CropperComp :src="src" @cropped="$emit('cropped', $event)"></CropperComp>
    </el-dialog>
</template>

<script>
import CropperComp from './CropperComp.vue';

export default {
    name: 'CropperDefault',
    components: { CropperComp },
    props: {
        visible: { type: Boolean, default: false },
        src: { type: String, default: '' }
    }
}
</script>
