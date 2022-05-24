$(function() {
    // 点击去注册页面
    $("#link_reg").on("click", function() {
            $(".login-box").hide()
            $(".reg-box").show()
        })
        // 点击去登录页面
    $("#link_login").on("click", function() {
        $(".reg-box").hide()
        $(".login-box").show()
    })

    //自定义正则属性
    var form = layui.form
    var layer = layui.layer
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            username: function(value, item) { //value：表单的值、item：表单的DOM对象
                if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                    return '用户名不能有特殊字符';
                }
                if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                    return '用户名首尾不能出现下划线\'_\'';
                }
                if (/^\d+\d+\d$/.test(value)) {
                    return '用户名不能全为数字';
                }
            },
            repwd: function(value) {
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致！'
                }
            }
        })
        //监听注册表单提交事件
    $("#form_reg").on('submit', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: 'http://www.liulongbin.top:3007/api/reguser',
                data: { username: $('#form_reg [name=userName]').val(), password: $('#form_reg [name=password]').val() },
                success: function(res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.msg('注册成功！请登录')
                    $('#link_login').click()
                }

            })
        })
        //监听登录表单提交事件
    $("#form_login").on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: { username: $('#form_login [name=userName]').val(), password: $('#form_login [name=password]').val() },
            success: function(res) {
                if (res.status !== 0) return layer.msg('登录失败！')
                layer.msg('登录成功！')
                    // console.log(res.token);
                    //将登陆成功得到的token值保存到localStorage
                localStorage.setItem('token', res.token)
                    //跳转到后台主页
                location.href = '/index.html'
            }

        })
    })
})