const install = (Vue, vm) =>{
	//拿到vm实例 把工具挂到实例上
	
	//是否登录
	const isLogin = () =>{
		//如果没有token，跳转到登录页面
		const token = vm.vuex_token
		if (!token) {
			//想办法拿到来源页
			const currentPage = getCurrentPages().pop();
			//获取页面的路径，和请求参数
			const {options,route} = currentPage // id = x
			const optionsKeys = Object.keys(options) //参数的key 即[id]
			let params = ''
			if (optionsKeys.length !== 0) {
				params = optionsKeys.reduce((pre,current) => {
					return `${pre}${current}=${options[current]}&`
					},'?'.slice(0,-1))
			}
			
			//缓存当前页，用于登录或者注册之后的跳转
			uni.setStorageSync('back_url',route + params);
			
			
			vm.$u.toast('请登录后再进行访问')
			setTimeout(() => {
				vm.$u.route({
					tpye: 'redirect',
					url:'pages/auth/login'
				})
			},1500)
		} return false;
		
		return true
	}

	
	//其他工具

	const upDateUse = async () => {
		//请求用户信息
		const userInfo = await vm.$u.api.userInfo()
		//缓存用户信息
		vm.$u.vuex('vuex_user',userInfo)
	}

	
	vm.$u.utils = {
		isLogin,
		upDateUse,
	}
}

// 把这个install对象暴露出去
export default{
	install
}