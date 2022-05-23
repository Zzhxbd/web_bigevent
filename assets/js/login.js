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
})