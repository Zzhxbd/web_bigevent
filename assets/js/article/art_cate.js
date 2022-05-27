$(function() {
    var later = layui.layer
    var form = layui.form
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return later.msg(res.message)
                }
                const htmlStr = template('temp', res)
                $('#tb').html(htmlStr)
            }
        })
    }
    var indexAdd = null
    $('#btnAdd').on('click', function() {
            indexAdd = layer.open({
                type: '1',
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html()
            });
        })
        //代理
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: {
                name: $('[name=name]').val(),
                alias: $('[name=alias]').val()
            },
            success: function(res) {
                if (res.status !== 0) return later.msg(res.message)
                    // console.log(res);
                initArtCateList()
                later.close(indexAdd)

            }
        })
    })
    var indexEdit = null
    $('#tb').on('click', '#edit', function() {
        //修改
        indexEdit = layer.open({
            type: '1',
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                if (res.status !== 0) return later.msg(res.message)
                form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return later.msg(res.message)
                later.close(indexEdit)
                initArtCateList()
            }
        })
    })

    $('#tb').on('click', '#del', function() {
        var id = $(this).attr('data-id')
            //修改
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) return later.msg(res.message)
                    later.msg(res.message)
                    layer.close(index);
                    initArtCateList()
                }
            })


        });


    })


})