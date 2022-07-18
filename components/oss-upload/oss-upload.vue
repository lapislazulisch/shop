<template>
	<view>
		<u-upload 
        :action="action" 
        max-count="1" 
        :max-size="5 * 1024 * 1024" 
        :multiple="false"
		:before-upload="beforeUpload" 
        :custom-btn="true" 
        :form-data="formData" 
        @on-success="uploadSuccess">
			<u-avatar slot="addBtn" :src="vuex_user.avatar_url" size="140"></u-avatar>
		</u-upload>
	</view>
</template>

<script>
	// 创建组件全局的this变量(防止小程序端this对象丢失)
	let that = {};

	export default {
		name: "oss-upload",
		data() {
			return {
				action: "",
				formData: {},
				picKey: ""
			};
		},
		created() {
			// 重新绑定组件实例为_this对象
			that = this;  //下面内个函数不是通过事件来触发，this可能会丢失
		},
		methods: {
			// 头像上传前回调
			async beforeUpload(index, list) {
				// 获取ossToken
				let res = await that.$u.api.authOssToken();
				// 设置action
				that.action = res.host;
				
				// 处理生成一个随机的图片名称(分H5和其他平台条件编辑书写) 处理唯一文件名  guid 全局唯一标识符

				// #ifdef H5
				const picName = that.$u.guid(20) + "." + list[0].file.name.split(".")[1];
				// #endif

                // #ifndef H5
				const picName = that.$u.guid(20) + "." + list[0].file.path.split(".")[1];
				// #endif
                 
				// 存储图片的Key
				that.picKey = picName;
				// 配置上传参数包
				that.formData = {
					'key': picName, //上传后的文件名
					'policy': res.policy,  //上传策略
					'OSSAccessKeyId': res.accessid, //上传签名
					'success_action_status': "200",
					'signature': res.signature,
				}
				return true;
			},
			// 头像上传成功回调
			async uploadSuccess() {
				// 整理参数
				const params = {
					avatar: this.picKey
				};
				// 提交上传头像
				await this.$u.api.upDateUse(params);
				// 提示成功，用户在表单页点击保存按钮再同步头像信息
				this.$u.toast("上传成功");
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
