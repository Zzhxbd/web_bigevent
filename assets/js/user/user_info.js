$(function() {
    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })



    //初始化用户的基本信息
    var layer = layui.layer

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                form.val('form-userinfo', res.data)
            }
        })
    }
    initUserInfo()

    //重置表单的数据
    $('#btnReset').on('click', function(e) {
            e.preventDefault()
            initUserInfo()
        })
        //监听表单提交
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: {
                id: $('.layui-form [name=id]').val(),
                nickname: $('.layui-form [name=nickname]').val(),
                email: $('.layui-form [name=email]').val(),
            },
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                window.parent.getUserInfo()
                layer.msg(res.message)
            }
        })
    })







})