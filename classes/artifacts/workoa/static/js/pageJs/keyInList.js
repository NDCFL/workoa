var path = $("#path").val();
//生成用户数据
$('#mytab').bootstrapTable({
    method: 'post',
    contentType: "application/x-www-form-urlencoded",//必须要有！！！！
    url: "/keyIn/keyInList",//要请求数据的文件路径
    toolbar: '#toolbar',//指定工具栏
    striped: true, //是否显示行间隔色
    dataField: "res",
    sortable: true, //是否启用排序 sortOrder: "ID asc",
    sortOrder: "ID asc",
    pagination: true,//是否分页
    queryParamsType: 'limit',//查询参数组织方式
    queryParams: queryParams,//请求服务器时所传的参数
    sidePagination: 'server',//指定服务器端分页
    pageNumber: 1, //初始化加载第一页，默认第一页
    pageSize: 10,//单页记录数
    pageList: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],//分页步进值
    showRefresh: true,//刷新按钮
    showColumns: true,
    clickToSelect: true,//是否启用点击选中行
    toolbarAlign: 'right',//工具栏对齐方式
    buttonsAlign: 'right',//按钮对齐方式
    toolbar: '#toolbar',//指定工作栏
    uniqueId: "id",
    search:true,//每一行的唯一标识，一般为主键列
    showExport: true,
    exportDataType: 'all',
    columns: [
        {
            title: '全选',
            field: 'select',
            //复选框
            checkbox: true,
            width: 25,
            align: 'center',
            valign: 'middle'
        },
        {
            title: '头像',
            field: 'headicon',
            align: 'center',
            sortable: true,
            formatter: function (value) {
                return '<img src=\"' + path + '/' + value + '\"/ style=\"width:60px;height:60px\">';
            }

        },
        {
            title: '真实姓名',
            field: 'realname',
            align: 'center',
            sortable: true
        },
        {
            title: '身份证号',
            field: 'identity',
            align: 'center',
            sortable: true
        },
        {
            title: '昵称',
            field: 'nickname',
            align: 'center',
            sortable: true
        },
        {
            title: '账号',
            field: 'phone',
            align: 'center',
            sortable: true
        },
        {
            title: '邮箱',
            field: 'email',
            align: 'center',
            sortable: true
        }
        ,
        {
            title: '创建时间',
            field: 'createTime',
            align: 'center',
            sortable: true,
            formatter: function (value) {
                var date = new Date(value);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mi = date.getMinutes();
                var ss = date.getSeconds();
                return y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + ss;
            }
        }
        ,
        {
            title: '状态',
            field: 'isActive',
            align: 'center',
            formatter: function (value, row, index) {
                if (value == 0) {
                    //表示启用状态
                    return '<i class="btn btn-primary" >启用</i>';
                } else {
                    //表示启用状态
                    return '<i class="btn btn-danger">停用</i>';
                }
            }
        }
        ,
        {
            title: '操作',
            align: 'center',
            field: '',
            formatter: function (value, row, index) {
                var e = '<a title="编辑" href="javascript:void(0);" id="cashSubject"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#myModal" onclick="return edit(\'' + row.id + '\')"><i class="glyphicon glyphicon-pencil" alt="修改" style="color:green">修改</i></a> ';
                var d = '<a title="删除" href="javascript:void(0);" onclick="del(' + row.id + ',' + row.isActive + ')"><i class="glyphicon glyphicon-trash" alt="删除" style="color:red">删除</i></a> ';
                var f = '';
                if (row.isActive == 1) {
                    f = '<a title="启用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 0 + ')"><i class="glyphicon glyphicon-ok-sign" style="color:green">启用</i></a> ';
                } else if (row.isActive == 0) {
                    f = '<a title="停用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 1 + ')"><i class="glyphicon glyphicon-remove-sign"  style="color:red">停用</i></a> ';
                }
                var g = '<a title="初始化密码" href="javascript:void(0);" onclick="initPwd(' + row.id+')"><i class="glyphicon glyphicon-phone" style="color:green"></i></a>'

                // return e + d+f;
                return  e+f+g;


            }
        }
    ],
    locale: 'zh-CN',//中文支持,
    responseHandler: function (res) {
        if (res) {
            return {
                "res": res.rows,
                "total": res.total
            };
        } else {
            return {
                "rows": [],
                "total": 0
            };
        }
    }
})

//请求服务数据时所传参数
function queryParams(params) {
    var title = "";
    $(".search input").each(function () {
        title = $(this).val();
    });
    return {
        //每页多少条数据
        pageSize: this.pageSize,
        //请求第几页
        pageIndex: this.pageNumber, searchVal: title
    }
}
function initPwd(id) {
    layer.confirm('确认要初始化密码吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: '/keyIn/initPwd/' + id,
            dataType: 'json',
            success: function (data) {
                if (data.message.indexOf("成功")>0) {
                    layer.alert(data.message, {icon: 6});
                } else {
                    layer.alert(data.message, {icon: 6});
                }
                refush();
            },
            error: function (data) {
                console.log(data.msg);
            },
        });
    });
}
function del(keyIn, status) {
    if (status == 0) {
        layer.msg("删除失败，已经启用的不允许删除!", {icon: 2, time: 1000});
        return;
    }
    layer.confirm('确认要删除吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: '/keyIn/deleteKeyIn/' + keyIn,
            dataType: 'json',
            success: function (data) {
                if (data.message == '删除成功!') {
                    layer.alert(data.message, {icon: 6});
                } else {
                    layer.alert(data.message, {icon: 6});
                }
                refush();
            },
            error: function (data) {
                console.log(data.msg);
            },
        });
    });
}
function edit(name){
    $.post("/keyIn/findKeyIn/"+name,
        function(data){
            $("#updateform").autofill(data);
        },
        "json"
    );
}
function updatestatus(id, status) {
    $.post("/keyIn/updateStatus/" + id + "/" + status,
        function (data) {
            if(status==0){
                if(data.message=="ok"){
                    layer.alert("已启用", {icon:6});
                }else{
                    layer.alert("操作失败", {icon:6});
                }
            }else{
                if(data.message=="ok"){
                    layer.alert("已停用", {icon:5});
                }else{
                    layer.alert("操作失败", {icon:5});
                }
            }
            refush();
        },
        "json"
    );
}
//查询按钮事件
$('#search_btn').click(function () {
    $('#mytab').bootstrapTable('refresh', {url: '/keyIn/keyInList'});
})
function refush() {
    $('#mytab').bootstrapTable('refresh', {url: '/keyIn/keyInList'});
}
$("#update").click(function () {
    $.post(
        "/keyIn/keyInUpdateSave",
        $("#updateform").serialize(),
        function (data) {
            layer.alert(data.message, {icon: 6});
            refush();
            $("#myModal").modal('hide');
        }, "json"
    );
});
$("#add").click(function () {

    // $.post(
    //     "/keyIn/addKeyIn",
    //     $("#formadd").serialize(),
    //     function (data) {
    //         if (data.message == "店长账号新增成功!") {
    //             layer.alert(data.message, {icon: 6});
    //             refush();
    //         } else {
    //             layer.alert(data.message, {icon: 6});
    //             refush();
    //         }
    //     }, "json"
    // );
});
function deleteMany() {
    var isactivity = "";
    var row = $.map($("#mytab").bootstrapTable('getSelections'), function (row) {
        if (row.isActive == 0) {
            isactivity += row.isActive;
        }
        return row.id;
    });
    if (row == "") {
        layer.msg('删除失败，请勾选数据!', {
            icon: 2,
            time: 2000
        });
        return;
    }
    if (isactivity != "") {
        layer.msg('删除失败，已经启用的不允许删除!', {
            icon: 2,
            time: 2000
        });
        return;

    }
    $("#deleteId").val(row);
    layer.confirm('确认要执行批量删除网站信息数据吗？', function (index) {
        $.post(
            "/keyIn/deleteManyUser",
            {
                "manyId": $("#deleteId").val()
            },
            function (data) {
                if (data.message == "删除成功!") {
                    layer.alert(data.message, {icon: 6});
                    refush();
                } else {
                    layer.alert(data.message, {icon: 6});
                    refush();
                }
            }, "json"
        );
    });
}
$('#formadd').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        phone: {
            message: '手机账号验证失败',
            validators: {
                notEmpty: {
                    message: '手机账号不能为空'
                },
                stringLength: {
                    min: 11,
                    max: 11,
                    message: '手机账号长度必须为11位'
                },
                regexp: {
                    regexp: /^1[3|5|8|7]{1}[0-9]{9}$/,
                    message: '请输入正确的手机号码'
                },
                threshold: 10,
                remote: {
                    url: path + '/user/checkReg',
                    message: '该手机号已被注册',
                    delay: 2000,
                    type: 'POST'
                }
            }
        },
        password: {
            message: '密码验证失败',
            validators: {
                notEmpty: {
                    message: '密码不能为空'
                },
                stringLength: {
                    min: 6,
                    max: 18,
                    message: '密码长度必须在6到18位之间'
                },
                regexp: {
                    regexp: /^[a-zA-Z0-9_]+$/,
                    message: '密码只能包含大写、小写、数字和下划线'
                }

            }
        },
        realname: {
            message: '真实姓名验证失败',
            validators: {
                notEmpty: {
                    message: '真实姓名不能为空'
                }
            }
        }
    }
}).on('success.form.bv', function (e) {//点击提交之后
    e.preventDefault();
    var $form = $(e.target);
    var bv = $form.data('bootstrapValidator');
    $.post(
        "/keyIn/addKeyIn",
        $("#formadd").serialize(),
        function (data) {
            if (data.message == "录入员账号新增成功!") {
                layer.alert(data.message, {icon: 6});
                refush();
            } else {
                layer.alert(data.message, {icon: 6});
                refush();
            }
            $('#webAdd').modal('hide')
        }, "json"
    );
});
