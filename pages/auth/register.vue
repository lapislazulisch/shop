<template>
    <view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎注册图书商城！</view>
            <!-- 昵称 -->
			<input class="u-border-bottom" v-model="name" placeholder="请输入昵称" />
            <!-- 邮箱 -->
			<input class="u-border-bottom" v-model="email" placeholder="请输入邮箱" />
            <!-- 密码 -->
			<input class="u-border-bottom" v-model="password" type="password" placeholder="请输入密码 6-12位" />
            <!-- 确认密码 -->
			<input class="u-border-bottom" v-model="password_confirmation" type="password" placeholder="确认密码" />
            <!-- 注册按钮 -->
			<button @tap="submitRegister" :style="[inputStyles]" class="getCaptcha">注册</button>
			<view class="alternative">
				<view class="lookforpw">找回密码</view>
				<view @tap="$u.route('pages/auth/login')">已有账号</view>
			</view>
		</view>
	</view>

</template>
<script>
import { methods } from '../../uview-ui/libs/mixin/mixin'

    export default{
        data() {
            return{
                name: '',
                email:'',
                password:'',
                password_confirmation:'',
            }
        },
        computed: {
			inputStyles() {
				let style = {};
                //声明一个变量，用来存储是否符合注册条件
                const passwordIs = this.password_confirmation === this.password && this.password.length >= 6 && this.password.length <= 12;
                if(this.$u.test.email(this.email) && passwordIs && this.name) {
                    style.color = "#fff";
                    style.backgroundColor = this.$u.color['warning'];
                }
                return style;
			}
		},

        methods:{
            //执行注册
            async submitRegister() {
                //1.表单验证
                //上面验证过了
                //2.准备提交的参数
                const params = {
                    name: this.naem,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,

                }

                //3.请求api执行注册
                const res = this.$u.api.authRegister(params);
                this.$u.toast("注册成功");
                //4.注册成功之后 重定向到登录
                setTimeout(() => {
					this.$u.route({
						type: "redirect",
						url: "pages/auth/login"
					})
				}, 1000)
            }                           
        }
    }

</script>

<style lang="scss" scoped>
	.u-border-bottom{
		margin-bottom: 30rpx !important;
	}
	.wrap {
		font-size: 28rpx;
		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}
			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}
			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;
				
				&::after {
					border: none;
				}
			}
			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}
		
		
	}
</style>
