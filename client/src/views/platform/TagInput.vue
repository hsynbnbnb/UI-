<template>
    <el-select :model-value="modelValue" multiple filterable allow-create default-first-option
               placeholder="输入或选择标签" @update:model-value="onChange">
        <el-option v-for="t in hot" :key="t" :label="t" :value="t"></el-option>
    </el-select>
</template>

<script>
import { get } from '@/network/request';

export default {
    name: 'TagInput',
    props: { modelValue: { type: Array, default: () => [] } },
    emits: ['update:modelValue'],
    data() { return { hot: [] }; },
    created() {
        get('/creator/tags/hot').then(res => {
            if (res.data.code === 200) this.hot = res.data.data || [];
        });
    },
    methods: {
        onChange(val) { this.$emit('update:modelValue', val || []); }
    }
}
</script>
