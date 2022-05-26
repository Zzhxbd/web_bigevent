$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if ($('[name=oldPassword]').val() === value) {
                return ('新旧密码不能一致！')
            }
            // if ($('[name=newPassword]') !== value) {
            //     return layer.msg('两次密码不一致！')
            // }

        },
        rePwd: function(value) {
            if ($('[name=newPassword]').val() !== value) {
                return ('重置密码不一致！')
            }
        }

    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: {
                oldPwd: $('[name=oldPassword]').val(),
                newPwd: $('[name=newPassword]').val(),
            },
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })
    })


})