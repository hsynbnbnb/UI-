<template>
    <el-cascader :model-value="modelValue" :options="options" :props="{ expandTrigger: 'hover' }"
                 placeholder="选择分区" @update:model-value="onChange"></el-cascader>
</template>

<script>
import { get } from '@/network/request';

export default {
    name: 'CategorySelect',
    props: { modelValue: { type: Array, default: () => [] } },
    emits: ['update:modelValue'],
    data() {
        return { options: [] };
    },
    created() { this.load(); },
    methods: {
        async load() {
            const res = await get('/category/list');
            if (res.data.code === 200) {
                this.options = (res.data.data || []).map(mc => ({
                    value: mc.mcId,
                    label: mc.mcName,
                    children: (mc.scList || []).map(sc => ({ value: sc.scId, label: sc.scName }))
                }));
            }
        },
        onChange(val) { this.$emit('update:modelValue', val || []); }
    }
}
</script>
