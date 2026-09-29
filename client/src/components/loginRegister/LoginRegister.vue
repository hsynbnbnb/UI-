<template>
    <div class="login-register">
        <div class="canvas-wrapper">
            <div class="video-wrapper">
                <video
                    src="~assets/video/BadApple.mp4"
                    id="login-video" ref="loginVideo"
                    muted autoplay loop
                ></video>
            </div>
            <canvas id="cvs" width="360" height="360"></canvas>
            <canvas id="cvs2" width="360" height="360" @click="playVideo" loop></canvas>
        </div>
        <div class="login-register-container">
            <el-tabs v-model="activeTab" stretch class="login-tabs" @tab-click="handleClick">
                <el-tab-pane label="登录" name="login" lazy>
                    <div v-if="loginMode === 'account'" class="login-box">
                        <el-input type="text" class="input" v-model="usernameLogin" placeholder="请输入账号" />
                        <el-input type="password" show-password class="input" v-model="passwordLogin" placeholder="请输入密码" />
                        <div class="submit" @click="submitLogin">登&nbsp;录</div>
                        <div class="forgot-row">
                            <span class="forgot-link" @click="showPhoneLogin">忘记密码？</span>
                        </div>
                        <div class="tips">登录即代表你同意我们的<span class="agreement">用户协议</span></div>
                    </div>
                    <div v-else class="phone-login-box">
                        <div class="phone-form">
                            <div class="phone-input-row">
                                <el-dropdown trigger="click">
                                    <span class="area-code">
                                        +86
                                        <el-icon size="12"><ArrowDown /></el-icon>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item>+86 中国</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                                <span class="vertical-divider"></span>
                                <el-input
                                    class="phone-input"
                                    v-model="phoneNumber"
                                    maxlength="11"
                                    placeholder="请输入手机号"
                                />
                                <button
                                    class="send-code-button"
                                    :disabled="!isPhoneValid || countdown > 0"
                                    @click="sendSmsCode"
                                >
                                    {{ countdown > 0 ? `${countdown}s后重发` : '获取验证码' }}
                                </button>
                            </div>
                            <div class="verify-row">
                                <span class="verify-label">验证码</span>
                                <el-input
                                    class="verify-input"
                                    v-model="smsCode"
                                    maxlength="6"
                                    placeholder="请输入验证码"
                                    @keyup.enter="submitPhoneLogin"
                                />
                            </div>
                        </div>
                        <button class="phone-submit" @click="submitPhoneLogin">登录/注册</button>
                        <div class="back-link" @click="showAccountLogin">返回账号登录</div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="注册" name="register" lazy>
                    <div class="register-box">
                        <el-input type="text" class="input" v-model="usernameRegister" placeholder="请输入账号" maxlength="50" />
                        <el-input type="password" show-password class="input" v-model="passwordRegister" placeholder="请输入密码" />
                        <el-input type="password" show-password class="input" v-model="confirmedPassword" placeholder="再次确认密码" />
                        <div class="submit" @click="submitRegister">注&nbsp;册</div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
    name: "LoginRegister",
    data() {
        return {
            videoElement: null,
            usernameLogin: "",
            passwordLogin: "",
            usernameRegister: "",
            passwordRegister: "",
            confirmedPassword: "",
            activeTab: "login",
            loginMode: "account",
            phoneNumber: "",
            smsCode: "",
            countdown: 0,
            countdownTimer: null,
            type: 1,    // 1登录 2注册
        }
    },
    computed: {
        isPhoneValid() {
            return /^1[3-9]\d{9}$/.test(this.phoneNumber);
        }
    },
    mounted() {
        this.videoElement = this.$refs.loginVideo;
        this.init();
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    },
    beforeUnmount() {
        clearInterval(this.countdownTimer);
        document.removeEventListener('keydown', (e) => this.handleKeyboard(e));
    },
    methods: {

        // canvas 动画
        init() {
            const ctx = document.getElementById("cvs").getContext("2d");
            const ctx2 = document.getElementById("cvs2").getContext("2d");

            this.videoElement.crossOrigin = "anonymous";    // 允许在不同域之间共享资源

            const playVideo = () => {
                requestAnimationFrame(playVideo);   // 每一帧之间调用 playVideo 函数，实现连续播放
                const { width, height } = ctx.canvas;
                ctx.drawImage(this.videoElement, 0, 0, width, height);   // 从视频元素中绘制图像数据到画布上
                const data = ctx.getImageData(0, 0, width, height).data;
                ctx2.clearRect(0, 0, width, height);    // 清除第二个画布，以便在每一帧之间重新绘制像素数据
                const bl = 12;
                // 计算 x 和 y 坐标的最大值
                const maxX = Math.ceil(width / bl);
                const maxY = Math.ceil(height / bl);
                ctx.font = "5px serif";
                for (let x = 0; x < maxX; x++) {
                    for (let y = 0; y < maxY; y++) {
                        const i = (y * bl * width + x * bl) * 4;
                        const g = parseInt(
                            (data[i] + data[i + 1] + data[i + 2]) / 1.5
                        );  // 计算当前像素的灰度值
                        ctx2.fillStyle = `rgba(${g}, ${g}, ${g}, ${data[i + 3]})`;  // 绘制文本的颜色，透明度取自当前像素
                        ctx2.fillText("0", x * bl, y * bl);   // 文本填充
                    }
                }
            };
            playVideo();
        },
        playVideo() {
            this.videoElement.play();
        },

        // 点击标签页触发的事件
        handleClick(tab) {
            if (tab.props.label === '登录') {
                this.type = 1;
                this.loginMode = 'account';
            } else {
                this.type = 2;
            }
        },

        showPhoneLogin() {
            this.loginMode = 'phone';
        },

        showAccountLogin() {
            this.loginMode = 'account';
        },

        async sendSmsCode() {
            if (!this.isPhoneValid) {
                ElMessage.error("请输入正确的手机号");
                return;
            }

            const result = await this.$post("/user/account/send-code", {
                phone: this.phoneNumber
            });
            if (!result) return;

            if (result.data.code !== 200) {
                ElMessage.error(result.data.message);
                return;
            }

            ElMessage.success(result.data.message);
            this.countdown = 60;
            clearInterval(this.countdownTimer);
            this.countdownTimer = setInterval(() => {
                this.countdown -= 1;
                if (this.countdown <= 0) {
                    clearInterval(this.countdownTimer);
                    this.countdown = 0;
                }
            }, 1000);
        },

        async submitPhoneLogin() {
            if (!this.isPhoneValid) {
                ElMessage.error("请输入正确的手机号");
                return;
            }
            if (!/^\d{6}$/.test(this.smsCode)) {
                ElMessage.error("请输入 6 位验证码");
                return;
            }

            this.$store.state.isLoading = true;
            const result = await this.$post("/user/account/phone-login", {
                phone: this.phoneNumber,
                code: this.smsCode
            });
            if (!result) {
                this.$store.state.isLoading = false;
                return;
            }
            if (result.data.code !== 200) {
                ElMessage.error(result.data.message);
                this.$store.state.isLoading = false;
                return;
            }

            await this.completeLogin(result.data.data);
            this.$store.state.isLoading = false;
        },

        // 监听键盘回车触发登录
        handleKeyboard(event) {
            if (event.keyCode === 13 && this.type === 1) {
                if (this.loginMode === 'phone') {
                    this.submitPhoneLogin();
                } else {
                    this.submitLogin();
                }
            }
        },

        async completeLogin(loginData) {
            localStorage.setItem("pilipili_token", loginData.token);
            this.$store.commit("updateUser", loginData.user);
            await this.$store.dispatch("getMsgUnread");

            if (process.env.VUE_APP_USE_MOCK !== 'true') {
                await this.initIMServer();
            }

            await this.getFavorites();
            await this.getLikeAndDisLikeComment();
            ElMessage.success("登录成功");
            this.$store.commit("updateIsLogin", true);
            this.$emit("loginSuccess");
        },

        // 登录的回调
        async submitLogin() {
            // 前端先做判断，减轻服务器负担
            if (this.usernameLogin.trim() == "") {
                ElMessage.error("请输入账号");
                return;
            }
            if (this.passwordLogin == "") {
                ElMessage.error("请输入密码");
                return;
            }
            this.$store.state.isLoading = true;
            const result = await this.$post("/user/account/login", {
                username: this.usernameLogin.toString(),
                password: this.passwordLogin.toString(),
            }).catch(() => {
                ElMessage.error("特丽丽被玩坏了");
                this.$store.state.isLoading = false;
            });
            if (!result) {
                this.$store.state.isLoading = false;
                return;
            }
            if (result.data.code !== 200) {
                ElMessage.error(result.data.message);
                this.$store.state.isLoading = false;
            }
            if (result.data.code === 200) {
                await this.completeLogin(result.data.data);
                this.$store.state.isLoading = false;
            }
        },

        async submitRegister() {
            // 前端先做判断，减轻服务器负担
            if (this.usernameRegister.trim() == "") {
                ElMessage.error("账号不能为空");
                return;
            }
            if (this.passwordRegister == "" || this.confirmedPassword == "") {
                ElMessage.error("密码不能为空");
                return;
            }
            if (this.passwordRegister != this.confirmedPassword) {
                ElMessage.error("两次输入的密码不一致");
                return;
            }

            const result = await this.$post("/user/account/register", {
                username: this.usernameRegister.toString(),
                password: this.passwordRegister.toString(),
                confirmedPassword: this.confirmedPassword.toString(),
            });
            if (!result) return;
            if (result.data.code === 200) {
                ElMessage.success(result.data.message);
                this.usernameRegister = "";
                this.passwordRegister = "";
                this.confirmedPassword = "";
            }
        },

        
        // 开启实时通信消息服务
        async initIMServer() {
            await this.$store.dispatch("connectWebSocket");
            const connection = JSON.stringify({
                code: 100,
                content: "Bearer " + localStorage.getItem('pilipili_token'),
            });
            this.$store.state.ws.send(connection);
        },

        // 获取当前用户的收藏夹列表
        async getFavorites() {
            const res = await this.$get("/favorite/get-all/user", {
                params: { uid: this.$store.state.user.uid },
                headers: { Authorization: "Bearer " + localStorage.getItem("pilipili_token") }
            });
            if (!res.data.data) return;
            // 将默认置顶
            const defaultFav = res.data.data.find(item => item.type === 1);
            const list = res.data.data.filter(item => item.type !== 1);
            list.unshift(defaultFav);
            this.$store.commit("updateFavorites", list);
        },

        // 获取用户赞踩的评论集合
        async getLikeAndDisLikeComment() {
            const res = await this.$get("/comment/get-like-and-dislike", {
                params: { uid: this.$store.state.user.uid },
                headers: { Authorization: "Bearer " + localStorage.getItem("pilipili_token") }
            });
            if (!res.data) return;
            this.$store.commit("updateLikeComment", res.data.data.userLike);
            this.$store.commit("updateDislikeComment", res.data.data.userDislike);
        }
    }
}
</script>

<style scoped>
.login-register {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
}
.canvas-wrapper {
    position: relative;
    width: 360px;
    height: 360px;
}

.video-wrapper {
    visibility: hidden;
    position: absolute;
    width: 360px;
    height: 360px;
}

.video-wrapper video {
    object-fit: fill;
    display: block;
}

#cvs {
    visibility: hidden;
    position: absolute;
}

#cvs2 {
    position: absolute;
    top: 4px;
    left: 5px;
}

.login-register-container {
    display: block;
    width: 360px;
    height: 360px;
    padding: 30px 28px;
}

.login-tabs {
    width: 100%;
    margin: 0 auto;
}

.login-box, .register-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.phone-login-box {
    width: 100%;
}

.phone-form {
    width: 100%;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #fff;
}

.phone-input-row,
.verify-row {
    display: flex;
    height: 52px;
    align-items: center;
}

.verify-row {
    border-top: 1px solid #e5e7eb;
}

.area-code {
    display: flex;
    width: 68px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    color: var(--text1);
    font-size: 16px;
    cursor: pointer;
    outline: none;
}

.area-code .el-icon {
    margin-left: 8px;
    color: var(--text3);
}

.vertical-divider {
    width: 1px;
    height: 26px;
    background: #e5e7eb;
}

.phone-input,
.verify-input {
    flex: 1;
    min-width: 0;
}

.phone-input :deep(.el-input__wrapper),
.verify-input :deep(.el-input__wrapper) {
    padding: 0 12px;
    border: 0;
    background: transparent;
    box-shadow: none;
}

.phone-input :deep(.el-input__inner),
.verify-input :deep(.el-input__inner) {
    height: 50px;
    font-size: 15px;
}

.send-code-button {
    width: 96px;
    flex-shrink: 0;
    height: 100%;
    border: 0;
    background: transparent;
    color: #c7c9cc;
    font-size: 14px;
    cursor: pointer;
}

.send-code-button:not(:disabled) {
    color: var(--brand_blue);
}

.send-code-button:disabled {
    cursor: not-allowed;
}

.verify-label {
    width: 68px;
    padding-left: 15px;
    color: var(--text1);
    font-size: 15px;
}

.phone-submit {
    display: block;
    width: 100%;
    height: 46px;
    margin-top: 24px;
    border: 0;
    border-radius: 8px;
    background: #00a1d6;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
}

.phone-submit:hover {
    background: #00b5e5;
}

.back-link {
    margin-top: 14px;
    color: var(--text3);
    font-size: 13px;
    text-align: center;
    cursor: pointer;
}

.forgot-row {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-top: 8px;
}

.forgot-link {
    color: var(--text3);
    font-size: 12px;
    cursor: pointer;
}

.forgot-link:hover,
.back-link:hover {
    color: var(--brand_blue);
}

.login-box .input, .login-box .submit, .login-box .tips {
    margin-top: 30px;
    width: 100%;
}

.register-box .input, .register-box .submit, .register-box .tips {
    margin-top: 20px;
    width: 100%;
}

.submit {
    color: #fff;
    border-radius: 4px;
    background-color: var(--brand_pink);
    text-align: center;
    padding: 10px 15px;
    cursor: pointer;
}

.submit:hover {
    background-color: #f992af;
}

.tips {
    color: var(--text2);
    font-size: 12px;
    text-align: center;
}

.tips .agreement {
    color: var(--brand_blue);
    margin-left: 4px;
    cursor: pointer;
}

/* element 元素 */
.el-input {
    --el-input-focus-border: #ccc;
    --el-input-focus-border-color: #ccc;
    --el-input-border-radius: 10px;
    --el-input-height: 40px;
}

.el-input /deep/ .el-input__inner {
    padding: 8px 15px;
}

.el-input /deep/ .el-input__icon {
    margin-right: 8px;
}

.login-register-container /deep/ .el-tabs__active-bar {
    height: 3px;
}

.login-register-container /deep/ .el-tabs__nav-wrap::after {
    height: 0;
}

.login-register-container /deep/ .el-tabs__item {
    font-size: 17px;
}
</style>
