$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    var q = {
            pagenum: 1,
            pagesize: 2,
            cate_id: '',
            state: ''
        }
        // 过滤器
    template.defaults.imports.dataFormat = function(date) {
        var dt = new Date(date)
        var y = dt.getFullYear()
        var m = zero(dt.getMonth() + 1)
        var d = zero(dt.getDate())
        var hh = zero(dt.getHours())
        var mm = zero(dt.getMinutes())
        var ss = zero(dt.getSeconds())
        return `${y}/${m}/${d}  ${hh}:${mm}:${ss}`
    }

    function zero(n) {
        return n > 9 ? n : '0' + n
    }

    initArtList()

    function initArtList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) layer.msg(res.message)
                console.log(res);
                const htmlStr = template('tpl-list', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)

            }
        })

    }

    //渲染下拉框
    initArtCate()

    function initArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                const htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 筛选

    $('#form-alter').on('submit', function(e) {
        e.preventDefault()
        var cateId = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cateId
        q.state = state
        initArtList()
    })


    //删除类
    $('body').on('click', '#btn-del', function() {
        var len = $('#btn-del').length
        var id = $(this).attr('data-id')
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.msg(res.message)
                    layer.close(index);
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum -= 1
                    }
                    initArtList()

                }
            })
        })
    })

    // 分页器
    function renderPage(total) {
        laypage.render({
            elem: 'page-box', //注意，这里的 test1 是 ID，不用加 # 号

            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            limits: [2, 4, 6, 8],
            layout: ['count', 'limit ', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                    //首次不执行
                if (!first) {
                    //do something
                    initArtList()
                }
            }
        });



    }






})