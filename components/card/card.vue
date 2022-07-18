<template>
	<navigator class='goods-item'>
		<u-image class="u-skeleton-fillet" width="100%" height="300rpx" :src="item.cover_url"></u-image>
			<view class="title u-line-1 u-skeleton-rect">{{item.title ? item.title : "商品名称"}}</view>
		<view class='u-flex u-row-between'>
			<view class="price u-skeleton-rect">￥ {{item.price}}</view>
			<view class="sales u-skeleton-rect">销量 {{item.sales}}</view>
		</view>
	</navigator>
</template>

<script>
	export default {
		name:'card',
		//组件内接受数据
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style lang="scss">
	.goods-item{
		padding: 40rpx;
		margin-top: 30rpx;
		box-shadow: 0rpx 12rpx 20rpx 0rpx rgba(0,0,0, .1);
		.title{
			margin: 10rpx 0rpx;
			font-weight: 500;
			font-size: 32rpx;
			width: 100%;
		}
		.price {
			color: #d4237a;
			width: 40%;
		}
		.sales {
			color: #888;
			width: 30%;
		}
	}
</style>