$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    //美化时间
    template.defaults.imports.dataFormt = function(data) {
            const dt = new Date(data)

            var y = dt.getFullYear()
            var m = zero(dt.getMonth() + 1)
            var d = zero(dt.getDate())
            var hh = zero(dt.getHours())
            var mm = zero(dt.getMinutes())
            var ss = zero(dt.getSeconds())
            return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
        }
        //补零
    function zero(n) {
        return n > 9 ? n : '0' + n
    }
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable()
    initCate()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                    // console.log(res);
                const htmlStr = template('tpl-table', res)
                $('#tb').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                const htmlStr = template('tpl-cate', res)
                    // console.log(htmlStr);
                $("#select").html(htmlStr)
                form.render()
            }
        })
    }
    //删选
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]')
        var state = $('[name=state]')
        q.cate_id = cate_id
        q.state = state
        initCate()
    })

    //定义渲染分页的方法
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum
        })
    }
})