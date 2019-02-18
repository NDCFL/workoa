//生成用户数据
$('#mytab').bootstrapTable({
    method: 'post',
    contentType: "application/x-www-form-urlencoded",//必须要有！！！！
    url: "/businessMan/businessManList",//要请求数据的文件路径
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
    toolbar: '#toolbar', search: true,
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
            title: '姓名',
            field: 'name',
            align: 'center',
            sortable: true
        },
        {
            title: '联系方式',
            field: 'phone',
            align: 'center',
            sortable: true
        }
        ,
        {
            title: '酒店热线',
            field: 'tel',
            align: 'center',
            sortable: true
        },
        {
            title: '酒店简称',
            field: 'hotelSinName',
            align: 'center',
            sortable: true
        }
        ,
        {
            title: '酒店全称',
            field: 'hotelName',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                if(value){
                    if(value.length<10){
                        return '<a   data-toggle="modal" title="点击查看详情" alt="点击查看详情" data-id="\'' + row.id + '\'" data-target="#remark_modal" onclick="return remarks(\'' + value + '\')">'+value.substr(0,10)+'</a>';
                    }else{
                        return '<a   data-toggle="modal" title="点击查看详情" alt="点击查看详情" data-id="\'' + row.id + '\'" data-target="#remark_modal" onclick="return remarks(\'' + value + '\')">'+value.substr(0,10)+"..."+'</a>';
                    }
                }
            }
        },
        {
            title: '酒店签名',
            field: 'remark',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                if(value){
                    if(value.length<10){
                        return '<a   data-toggle="modal" title="点击查看详情" alt="点击查看详情" data-id="\'' + row.id + '\'" data-target="#remarks_modal" onclick="return remark(\'' + value + '\')">'+value.substr(0,10)+'</a>';
                    }else{
                        return '<a   data-toggle="modal" title="点击查看详情" alt="点击查看详情" data-id="\'' + row.id + '\'" data-target="#remarks_modal" onclick="return remark(\'' + value + '\')">'+value.substr(0,10)+"..."+'</a>';
                    }
                }
            }
        }
        ,
        {
            title: '类型',
            field: 'type',
            align: 'center',
            sortable: true,
            formatter: function (value) {
                if(value==0){
                    return '<span style="color: red">普通用户</span>';
                }else{
                    return '<span style="color: #ff954b">商会成员</span>';
                }
            }
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
            title: '当前状态',
            field: 'isActive',
            align: 'center',
            formatter: function (value, row, index) {
                if (value == 0) {
                    //表示启用状态
                    return '<span style="color: #0d8ddb" >启用</span>';
                } else {
                    //表示启用状态
                    return '<i style="color: red">停用</i>';
                }
            }
        }
        ,
        {
            title: '审核状态',
            field: 'type',
            align: 'center',
            formatter: function (value, row, index) {
                if (value == 0) {
                    //表示启用状态
                    return '<span style="color: #ff954b;" >审核通过</span>';
                } else {
                    //表示启用状态
                    return '<span style="color:red">审核不通过</span>';
                }
            }
        }
        ,
        {
            title: '操作',
            align: 'center',
            field: '',
            formatter: function (value, row, index) {
                var e = '<a title="编辑" href="javascript:void(0);" id="businessMan"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#myModal" onclick="return edit(\'' + row.id + '\')"><i class="glyphicon glyphicon-pencil" alt="修改" style="color:green">修改</i></a> ';
                var d = '<a title="删除" href="javascript:void(0);" onclick="del(' + row.id + ',' + row.isActive + ')"><i class="glyphicon glyphicon-trash" alt="删除" style="color:red">删除</i></a> ';
                var f = '';
                if (row.isActive == 1) {
                    f = '<a title="启用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 0 + ')"><i class="glyphicon glyphicon-ok-sign" style="color:green">启用</i></a> ';
                } else if (row.isActive == 0) {
                    f = '<a title="停用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 1 + ')"><i class="glyphicon glyphicon-remove-sign"  style="color:red">停用</i></a> ';
                }
                var p ='';
                if (row.type == 1) {
                    p = '<a title="审核通过" href="javascript:void(0);" onclick="updateType(' + row.id + ',' + 0 + ')"><i class="glyphicon glyphicon-ok-sign" style="color:green">审核通过</i></a> ';
                } else if (row.type == 0) {
                    p = '<a title="审核不通过" href="javascript:void(0);" onclick="updateType(' + row.id + ',' + 1 + ')"><i class="glyphicon glyphicon-remove-sign"  style="color:red">审核不通过</i></a> ';
                }
                return e + d + f+p;
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
function  remarks(val) {
    $("#remarks").html(val);
}
function  remark(val) {
    $("#remark").html(val);
}
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
        pageIndex: this.pageNumber,
        searchVal: title
    }
}
function del(businessManid, status) {

    layer.confirm('删除商会成员，将同时删除他的所有信息，继续吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: '/businessMan/deleteBusinessMan/' + businessManid,
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
    $.post("/businessMan/findBusinessMan/" + name,
        function (data) {
            $("#updateform").autofill(data);
        },
        "json"
    );
}
function updatestatus(id, status) {
    $.post("/businessMan/updateStatus/" + id + "/" + status,
        function (data) {
            if(status==0){
                if(data.message=="ok"){
                    layer.alert("已启用", {icon:1});
                }else{
                    layer.alert("操作失败", {icon:2});
                }
            }else{
                if(data.message=="ok"){
                    layer.alert("已停用", {icon:1});
                }else{
                    layer.alert("操作失败", {icon:2});
                }
            }
            refush();
        },
        "json"
    );
}
function updateType(id, status) {
    $.post("/businessMan/updateType",
        {
            id:id,
            status:status
        },
        function (data) {
            if(data.message=="ok"){
                layer.alert("操作成功", {icon:1});
            }else{
                layer.alert("操作失败", {icon:2});
            }
            refush();
        },
        "json"
    );
}
//查询按钮事件
$('#search_btn').click(function () {
    var times = $("#test_2").val();
    var start,end;
    if(!times){
        start = null;
        end = null;
    }else {
        start = times.substring(0,11)+"00:00:00";
        end = times.substring(13,times.length)+" 23:59:59";
    }
    $('#mytab').bootstrapTable('refresh', {
        url: '/businessMan/findBusinessManList',
        query:{
            createTime:start,
            endTime:end,
            name:$("#name_").val(),
            phone:$("#phone_").val(),
            tel:$("#tel_").val(),
            hotelSinName:$("#hotelSinName_").val(),
            hotelName:$("#hotelName_").val(),
            remark:$("#remark_").val(),
            isActive:$("#isActive_").val(),
            type:$("#type_").val()

        }

    });
})
function refush() {
    var times = $("#test_2").val();
    var start,end;
    if(!times){
        start = null;
        end = null;
    }else {
        start = times.substring(0,11)+"00:00:00";
        end = times.substring(13,times.length)+" 23:59:59";
    }
    $('#mytab').bootstrapTable('refresh', {
        url: '/businessMan/findBusinessManList',
        query:{
            createTime:start,
            endTime:end,
            name:$("#name_").val(),
            phone:$("#phone_").val(),
            tel:$("#tel_").val(),
            hotelSinName:$("#hotelSinName_").val(),
            hotelName:$("#hotelName_").val(),
            remark:$("#remark_").val(),
            isActive:$("#isActive_").val(),
            type:$("#type_").val()

        }

    });
}
$("#update").click(function () {
    var tel = $("#tels").val();
    var hotelSinName = $("#hotelSinNames").val();
    if(!tel){
        layer.alert("酒店热线不能为空", {icon: 2});
        return false;
    }
    if(tel.length>20){
        layer.alert("酒店热线最多为20位", {icon: 2});
        return false;
    }
    if(!hotelSinName){
        layer.alert("酒店简称不能为空", {icon: 2});
        return false;
    }
    $.post(
        "/businessMan/businessManUpdateSave",
        $("#updateform").serialize(),
        function (data) {
            if (data.message == "修改成功!") {
                layer.alert(data.message, {icon: 6});
                refush();
            } else {
                layer.alert(data.message, {icon: 6});
                refush();
            }
        }, "json"
    );
});
$("#add").click(function () {
    var tel = $("#tel").val();
    var hotelSinName = $("#hotelSinName").val();
    if(!tel){
        layer.alert("酒店热线不能为空", {icon: 2});
        return false;
    }
    if(tel.length>20){
        layer.alert("酒店热线最多为20位", {icon: 2});
        return false;
    }
    if(!hotelSinName){
        layer.alert("酒店简称不能为空", {icon: 2});
        return false;
    }
    $.post(
        "/businessMan/businessManAddSave",
        $("#formadd").serialize(),
        function (data) {
            if (data.message == "新增成功!") {
                layer.alert(data.message, {icon: 6});
                refush();
            } else {
                layer.alert(data.message, {icon: 6});
                refush();
            }
        }, "json"
    );
});
function deleteMany11() {
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
            "/businessMan/deleteManyBusinessMan",
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
    layer.confirm('确认要执行批量修改商会的状态吗？',function(index){
        $.post(
            "/businessMan/deleteManyBusinessMan",
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