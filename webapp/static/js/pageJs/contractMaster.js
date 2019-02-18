//生成用户数据
$('#mytab').bootstrapTable({
    method: 'post',
    contentType: "application/x-www-form-urlencoded",//必须要有！！！！
    url: "/contractMaster/contractMasterList",//要请求数据的文件路径
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
    search: true,
    clickToSelect: true,//是否启用点击选中行
    toolbarAlign: 'right',//工具栏对齐方式
    buttonsAlign: 'right',//按钮对齐方式
    toolbar: '#toolbar',
    uniqueId: "id",                     //每一行的唯一标识，一般为主键列
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
            field: 'faceImg',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return '<img src="'+value+'" style="width: 80px;height: 80px;border-radius: 100%" onclick="lookImg(this.id);" id="lookImg'+index+'" />' ;
            }
        },
        {
            title: '昵称',
            field: 'nickname',
            align: 'center',
            sortable: true
        },
        {
            title: '登录账号',
            field: 'phone',
            align: 'center',
            sortable: true
        },
        {
            title: '房东姓名',
            field: 'bankAccountName',
            align: 'center',
            sortable: true
        },
        {
            title: '银行名称',
            field: 'bankName',
            align: 'center',
            sortable: true
        }
        ,
        {
            title: '银行卡号',
            field: 'bankAccountNo',
            align: 'center',
            sortable: true
        }
        ,
        {
            title: '身份证号',
            field: 'identity',
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
                return y + '-' + m + '-' + d ;
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
                    return '<span style="color: green">启用</span>';
                } else {
                    //表示启用状态
                    return '<span style="color: red;">停用</span>';
                }
            }
        }
        ,
        {
            title: '操作',
            align: 'center',
            field: '',
            formatter: function (value, row, index) {
                var e = '<a title="编辑" href="javascript:void(0);" id="contractMaster"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#myModal" onclick="return edit(\'' + row.id + '\')"><span class="glyphicon glyphicon-pencil" alt="修改" style="color:green">修改</span></a> ';
                var d = '<a title="删除" href="javascript:void(0);" onclick="del(' + row.id + ',' + row.isActive + ')"><span class="glyphicon glyphicon-trash" alt="删除" style="color:red">删除</span></a> ';
                var f = '';
                if (row.isActive == 1) {
                    f = '<a title="启用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 0 + ')"><span class="glyphicon glyphicon-ok-sign" style="color:green">启用</span></a> ';
                } else if (row.isActive == 0) {
                    f = '<a title="停用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 1 + ')"><span class="glyphicon glyphicon-remove-sign"  style="color:red">停用</span></a> ';
                }
                var g = '<a title="签约列表" class="J_menuItem" href="/contract/contractByMasterListPage/' + row.id + '\"><span class="glyphicon glyphicon-th-list" alt="签约列表" style="color:green">签约列表</span></a> ';
                var t = '<a title="重置密码" href="javascript:void(0);"  onclick="reset(\'' + row.id + '\')"><span class="glyphicon glyphicon-pencil" alt="重置密码" style="color:green">重置密码</span></a> ';
                return e + d + f +g +t;
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
    var title = "";
    $(".search input").each(function () {
        title = $(this).val();
    });
    return {
        //每页多少条数据
        pageSize: this.pageSize,
        //请求第几页
        pageIndex: this.pageNumber, searchVal: title,
        searchVal: title
    }
}
function reset(id) {
    layer.open({
        id:1,
        type: 1,
        title:'修改密码',
        skin:'demo-class',
        area:['450px', 'auto'],

        content: ' <div class="row" style="width: 420px;  margin-left:7px; margin-top:10px;">'
        +'<div class="col-sm-12">'
        +'<div class="input-group">'
        +'<span class="input-group-addon"> 密 码   :</span>'
        +'<input id="firstpwd" type="password" class="form-control" placeholder="请输入密码">'
        +'</div>'
        +'</div>'
        +'</div>'
        ,
        btn:['确认','取消'],
        btn1: function (index,layero) {
            var pwd = $("#firstpwd").val();
            if(pwd){
                //询问框
                layer.confirm('确认重置用户密码？', {
                    btn: ['确认','取消'] //按钮
                }, function(){
                    $.post("/contractMaster/resetPassword",
                        {
                            "id":id,
                            "password":pwd
                        },
                        function (data) {
                            if(data.result=="success"){
                                layer.msg('重置成功', {icon: 1});
                                layer.close(index);
                            }else{
                                layer.msg('重置失败', {icon: 2});
                                layer.close(index);
                            }
                        },
                        "json"
                    );
                }, function(){
                    layer.close(index);
                });
            }else{
                layer.msg("请输入密码");
            }

        },
        btn2:function (index,layero) {
            layer.close(index);
        }

    });
}
function lookImg(id) {
    var imgSrc=$("#"+id).attr('src');
    layer.open({
        type:1
        ,title:false
        ,closeBtn:2
        ,skin:'layui-layer-nobg'
        ,shadeClose:true
        ,content:'<img src="'+imgSrc+'" style="max-height:600px;max-width:100%;">'
        ,scrollbar:true
    })
}
$('#lookImg').click(function(){
    console.log($(this).attr('src'))
    var imgSrc=$(this).attr('src')
    layer.open({
        type:1
        ,title:false
        ,closeBtn:0
        ,skin:'layui-layer-nobg'
        ,shadeClose:true
        ,content:'<img src="'+imgSrc+'" style="max-height:600px;max-width:100%;">'
        ,scrollbar:false
    })
});
function del(contractMasterid, status) {
    layer.confirm('确认要删除吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: '/contractMaster/deleteContractMaster/' + contractMasterid,
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
function edit(name) {
    $.post("/contractMaster/findContractMaster/" + name,
        function (data) {
            $("#updateform").autofill(data);
        },
        "json"
    );
}
function updatestatus(id, status) {
    $.post("/contractMaster/updateStatus/" + id + "/" + status,
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
    $('#mytab').bootstrapTable('refresh', {url: '/contractMaster/contractMasterList'});
})
function refush() {
    $('#mytab').bootstrapTable('refresh', {url: '/contractMaster/contractMasterList'});
}
$("#update").click(function () {
    var phone = $("#phone").val();
    if(phone==''){
        layer.alert("业主联系方式不能为空", {icon: 5});
        return;
    }
    if(phone.length!=11){
        layer.alert("业主联系方式输入有误", {icon: 5});
        return;
    }
    var bankAccountName = $("#bankAccountName").val();
    if(bankAccountName==''){
        layer.alert("业主姓名不能为空", {icon: 5});
        return;
    }
    var identity = $("#identity").val();
    if(identity==''){
        layer.alert("业主身份证号不能为空", {icon: 5});
        return;
    }
    if(phone.length>18){
        layer.alert("业主身份证号不得超过18位", {icon: 5});
        return;
    }
    var bankName = $("#bankName").val();
    if(bankName==''){
        layer.alert("银行名称不能为空", {icon: 5});
        return;
    }
    var bankAccountNo = $("#bankAccountNo").val();
    if(bankAccountNo==''){
        layer.alert("银行卡号不能为空", {icon: 5});
        return;
    }
    $.post(
        "/contractMaster/contractMasterUpdateSave",
        $("#updateform").serialize(),
        function (data) {
            if (data.message == "修改成功!") {
                layer.alert(data.message, {icon: 6});
                refush();
            } else {
                layer.alert(data.message, {icon: 6});
                refush();
            }
            $("#myModal").modal("hide");
        }, "json"
    );
});
$("#add").click(function () {
    var phone = $("#phones").val();
    if(phone==''){
        layer.alert("业主联系方式不能为空", {icon: 5});
        return;
    }
    if(phone.length!=11){
        layer.alert("业主联系方式输入有误", {icon: 5});
        return;
    }
    var pwd = $("#pwd").val();
    if(pwd==''){
        layer.alert("登录密码不能为空", {icon: 5});
        return;
    }
    var name = $("#name").val();
    if(name==''){
        layer.alert("业主姓名不能为空", {icon: 5});
        return;
    }
    var ids = $("#ids").val();
    if(ids==''){
        layer.alert("业主身份证号不能为空", {icon: 5});
        return;
    }
    var banknames = $("#banknames").val();
    if(banknames==''){
        layer.alert("银行名称不能为空", {icon: 5});
        return;
    }
    var card = $("#card").val();
    if(card==''){
        layer.alert("银行卡号不能为空", {icon: 5});
        return;
    }
    $.post(
        "/contractMaster/contractMasterAddSave",
        $("#formadd").serialize(),
        function (data) {
            if (data.message == "新增成功!") {
                layer.alert(data.message, {icon: 6});
                refush();
            } else {
                layer.alert(data.message, {icon: 6});
                refush();
            }
            $("#webAdd").modal("hide");
        }, "json"
    );
});
function deleteMany1() {
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
            "/contractMaster/deleteManyContractMaster",
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
function deleteMany(){
    var isactivity="";
    var row=$.map($("#mytab").bootstrapTable('getSelections'),function(row){
        if(row.isActive==0){
            isactivity+=row.isActive;
        }
        return row.id ;
    });
    if(row==""){
        layer.msg('修改失败，请勾选数据!', {
            icon : 2,
            time : 3000
        });
        return ;
    }
    $("#statusId").val(row);
    $("#updateStatus").modal('show');

}
$("#updateSta").click(function () {
    layer.confirm('确认要执行批量修改房东状态吗？',function(index){
        $.post(
            "/contractMaster/deleteManyContractMaster",
            {
                "manyId":$("#statusId").val(),
                "status":$("#status").val()
            },
            function(data){
                if(data.message=="修改成功!"){
                    layer.alert(data.message, {icon:6});
                    refush();
                }else{
                    layer.alert(data.message, {icon:6});
                    refush();
                }
            },"json"
        );
    });
});

