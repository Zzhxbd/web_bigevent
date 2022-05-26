$(function() {
        getUserInfo()

        //点击按钮实现退出
        var layer = layui.layer
        $('#btnLogout').on('click', function() {
            //用户是否确认退出
            layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function(index) {
                //清除本地token
                localStorage.removeItem('token')
                    //返回登录页面
                location.href = '/login.html'
                    //关闭询问框
                layer.close(index);
            });
        })
    })
    //获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) return layui.layer.msg(res.message)
                //渲染头像
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
//渲染头像
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.text-avatar').html(user.username.slice(0, 1).toUpperCase()).show()
        $('.layui-nav-img').hide()
    }
}