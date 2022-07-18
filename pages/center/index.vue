<template>
	<view>
		<view class="u-flex user-box u-p-t-30 u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="vuex_user.avatar_url" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{vuex_user.name}}</view>
				<view class="u-font-14 u-tips-color">邮箱：{{vuex_user.email}}</view>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置" @click="toBaseInfo"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="rmb-circle" title="订单"></u-cell-item>
				<u-cell-item icon="star" title="收藏"></u-cell-item>
				<u-cell-item icon="map" title="地址"></u-cell-item>
			</u-cell-group>

		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="reload" title="退出登录" @click="logout"></u-cell-item>
			</u-cell-group>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'https://uviewui.com/common/logo.png',
				show:true
			}
		},
		onLoad() {
			if(!this.$u.utils.isLogin()) return //使其拥有返回值
		},
		methods: {
			toBaseInfo(){
				this.$u.route({
					url:'pages/center/baseInfo'
				})
			},
			//退出登录
			async logout () {
				//请求api，退出登录
				await this.$u.api.authLogout();
				//清楚缓存的token和用户信息
				this.$u.vuex('vuex_user', {});
				this.$u.vuex('vuex_token', null);
				//提示退出成功
				this.$u.toast('成功退出')
				//1.5秒后跳转到首页
				setTimeout(() => {
					this.$u.route({
						type:'reLaunch',
						url:'pages/index/index'
					})
				}, 1500)
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>

