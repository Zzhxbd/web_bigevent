$(function() {
    getUserInfo()


})

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
        }
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