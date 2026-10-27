<template>
    <div class="login-page">
        <canvas ref="canvas" class="particles"></canvas>
        <div class="login-card">
            <h1 class="login-title">pilipili 管理后台</h1>
            <p class="login-sub">PILIPILI ADMIN CONSOLE</p>
            <el-input v-model="form.username" placeholder="管理员账号" class="login-input">
                <template #prefix><el-icon><User /></el-icon></template>
            </el-input>
            <el-input v-model="form.password" type="password" show-password placeholder="密码" class="login-input">
                <template #prefix><el-icon><Lock /></el-icon></template>
            </el-input>
            <el-button type="primary" class="login-btn" :loading="loading" @click="submit">登 录</el-button>
            <p class="login-tip">演示账号：admin / 任意密码</p>
        </div>
    </div>
</template>

<script>
import { User, Lock } from '@element-plus/icons-vue'

export default {
    name: 'LoginVue',
    components: { User, Lock },
    data() {
        return {
            form: { username: 'admin', password: '123456' },
            loading: false,
            timer: null
        };
    },
    mounted() { this.initParticles(); },
    beforeUnmount() { if (this.timer) cancelAnimationFrame(this.timer); },
    methods: {
        initParticles() {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext('2d');
            const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
            resize();
            window.addEventListener('resize', resize);
            const colors = ['#FB7299', '#FF9EC0', '#FFFFFF'];
            const particles = Array.from({ length: 80 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                c: colors[Math.floor(Math.random() * colors.length)]
            }));
            const tick = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => {
                    p.x += p.vx; p.y += p.vy;
                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = p.c;
                    ctx.globalAlpha = 0.7;
                    ctx.fill();
                });
                this.timer = requestAnimationFrame(tick);
            };
            tick();
        },
        async submit() {
            this.loading = true;
            const res = await this.$store.dispatch('login', this.form);
            this.loading = false;
            if (res.data.code === 200) {
                this.$message.success('登录成功');
                this.$router.replace('/');
            } else {
                this.$message.error(res.data.message || '登录失败');
            }
        }
    }
}
</script>

<style scoped>
.login-page { position: fixed; inset: 0; background: linear-gradient(135deg, #1f1147, #3a1c71 60%, #FB7299); overflow: hidden; }
.particles { position: absolute; inset: 0; }
.login-card {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 340px;
    padding: 36px 32px;
    background: rgba(255, 255, 255, .92);
    border-radius: 12px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, .3);
    text-align: center;
}
.login-title { font-size: 24px; color: #3a1c71; }
.login-sub { font-size: 12px; letter-spacing: 2px; color: #FB7299; margin: 6px 0 22px; }
.login-input { margin-bottom: 16px; }
.login-btn { width: 100%; background: #FB7299; border: 0; height: 42px; font-size: 16px; }
.login-tip { margin-top: 14px; font-size: 12px; color: #999; }
</style>
