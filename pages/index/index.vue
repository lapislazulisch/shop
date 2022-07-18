<template>
	<view class="shouye">
		<!-- //轮播图 -->
		<u-swiper :list="slides" height="320" name='img_url'></u-swiper>
		<!-- //顶部导航栏 -->
		<u-tabs :list="navlist" :is-scroll='false' :current="currentSort" @change="changeSort" active-color=#d4237a></u-tabs>
		<!-- //商品列表 -->
		<u-row gutter="16" class="u-skeleton">
			<u-col span="6" v-for="item in goods.length !== 0 ? goods : [{},{},{},{}]">	<!-- 不判断的话骨架屏显示异常，因为一开始goods是空数组 -->
				<card :item=item></card>
			</u-col>
		</u-row>
		<!-- 骨架屏 -->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navlist:[
					{
						name:'默认'
					},
					{
						name:'销量'
					},
					{
						name:'推荐'
					},
					{
						name:'最新'
					},
				],
				currentSort:0,
				slides:[],
				goods:[],
				page:1,
				loading:false,
				
			}
		},
	    onLoad() {
			this.getData()
		},
		methods: {
			changeSort(index){
				this.currentSort = index;
				//重置商品数据和分页
				this.goods=[];
				this.page=1
				this.getData()
			},
			//获取数据
			async getData(){
				this.loading = true //显示骨架屏
				
				const params = {
					page: this.page
				};
				//判断筛选条件
				if(this.currentSort == 1 ) params.sales = 1;
				if(this.currentSort == 2 ) params.recommend = 1;
				if(this.currentSort == 3 ) params.new = 1;
				//发送请求拿到数据
				const res = await this.$u.api.index(params);
				this.slides = res.slides;
				//合并俩页数组
				this.goods = [...this.goods,...res.goods.data]
				this.loading = false //骨架屏消失
			}
		},
		onReachBottom() {
			//重新请求数据，带上分页参数
			this.page = this.page + 1;
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
