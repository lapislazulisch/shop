<template>
  <view class="u-p-l-30 u-p-r-30">
    <u-form :model="form" ref="uForm" :error-type="errorType">
      <!-- prop属性指定表单项对应的校验规则 -->
      <u-form-item label="昵称" prop="name" required>
        <u-input v-model="form.name" />
      </u-form-item>
      <u-form-item label="头像" prop="avatar" class="avatar">
        <oss-upload v-model="form.avatar" />
      </u-form-item>
    </u-form>
    <u-button @click="submit">保存</u-button>
  </view>
</template>

<script>
import OssUpload from '../../components/oss-upload/oss-upload.vue';
export default {
    name: "baseInfo",
    data() {
        return {
            // 表单数据
            form: {
                name: "",
            },
            // 1.在Data中定义表单验证规则
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入昵称",
                        // 触发验证方式
                        trigger: "blur,change",
                    },
                ],
            },
            // 错误提示类型
            errorType: ["toast"],
        };
    },
    onLoad() {
        // 自定填充用户当前昵称
        this.form.name = this.vuex_user.name;
    },
    onReady() {
        // 2.在onReady生命周期使用表单校验规则（组件已创建完毕）
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        // 提交修改用户信息
        submit() {
            // 3.提交表单时调用表单的验证方法
            this.$refs.uForm.validate(async (valid) => {
                // 验证通过
                if (valid) {
                    // 更新用户信息
                    await this.$u.api.userInfoUpDate(this.form);
                    // 提示更新结果
                    this.$u.toast("信息保存成功");
                    // 获取并更新本地用户信息
                    this.$u.utils.upDateUse();
                    // 跳转到用户信息页
                    setTimeout(() => {
                        uni.navigateBack();
                    }, 1000);
                }
            });
        },
    },
    components: { OssUpload }
};
</script>

<style lang="scss" scoped></style>
