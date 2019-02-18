$(document).ready(function () {
    load();
});
var load = function () {//生成用户数据
    $('#mytab').bootstrapTreeTable({
        id: 'id',
        code: 'id',
        parentCode: 'parentId',
        method: 'post',
        contentType: "application/x-www-form-urlencoded",//必须要有！！！！
        url: "/permission/permissionList",//要请求数据的文件路径
        striped: true, //是否显示行间隔色
        dataField: "res",
        sortable: true, //是否启用排序 sortOrder: "ID asc",
        sortOrder: "ID asc",
        pagination: true,//是否分页
        queryParamsType: 'limit',//查询参数组织方式
        sidePagination: 'cline',//指定服务器端分页
        pageNumber: 1, //初始化加载第一页，默认第一页
        pageSize: 10,//单页记录数
        pageList: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],//分页步进值
        showRefresh: true,//刷新按钮
        showColumns: true,
        clickToSelect: true,//是否启用点击选中行
        toolbarAlign: 'right',//工具栏对齐方式
        buttonsAlign: 'right',//按钮对齐方式
        search: true,
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showExport: true,
        exportDataType: 'all',
        expandColumn: '1',// 在哪一列上面显示展开按钮
        striped: true, // 是否各行渐变色
        bordered: true, // 是否显示边框
        expandAll: false, // 是否全部展开
        showRefresh: true,//刷新按钮
        showColumns: true,
        clickToSelect: true,//是否启用点击选中行
        columns: [
            {
                title: '编号',
                field: 'id',
                visible: false,
                align: 'center',
                valign: 'center',
                width: '5%'
            },
            {
                title: '名称',
                valign: 'center',
                field: 'name',
                width: '20%'
            },

            {
                title: '图标',
                field: 'icon',
                align: 'center',
                valign: 'center',
                width: '5%',
                formatter: function (item, index) {
                    return item.icon == null ? ''
                        : '<i class="' + item.icon
                        + ' fa-lg"></i>';
                }
            },
            {
                title: '类型',
                field: 'type',
                align: 'center',
                valign: 'center',
                width: '10%',
                formatter: function (item, index) {
                    if (item.type === 0) {
                        return '<span class="label label-primary">目录</span>';
                    }
                    if (item.type === 1) {
                        return '<span class="label label-success">菜单</span>';
                    }
                    if (item.type === 2) {
                        return '<span class="label label-warning">按钮</span>';
                    }
                }
            },
            {
                title: '地址',
                valign: 'center',
                width: '20%',
                field: 'url'
            },
            {
                title: '权限标识',
                valign: 'center',
                width: '20%',
                field: 'perms'
            },
            {
                title: '操作',
                field: 'id',
                align: 'center',
                valign: 'center',
                formatter: function (item, index) {
                    var e = '<a title="编辑" href="javascript:void(0);" id="char"  data-toggle="modal" data-id="\'' + item.id + '\'" data-target="#myModal" onclick="return edit(\'' + item.id + '\')"><i class="glyphicon glyphicon-pencil" alt="修改" style="color:green">修改</i></a> ';
                    var d = '<a title="删除" href="javascript:void(0);" onclick="del(' + item.id+')"><i class="glyphicon glyphicon-trash" alt="删除" style="color:red">删除</i></a> ';
                    var f = '<a title="新增下级" data-toggle="modal"  data-target="#webAdd" onclick="return  addPermission(' + item.id + ')"><i class="glyphicon glyphicon-plus" alt="添加下级" style="color:#3cb3ff">添加下级</i></a> ';
                    return e + d + f;
                }
            }]
    });
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
function del(permissionid) {
    layer.confirm('确认要删除吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: '/permission/deletePermission/' + permissionid,
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
    $.post("/permission/findPermission/" + name,
        function (data) {
            $("#updateform").autofill(data);
        },
        "json"
    );
}
function addPermission(pId) {
    $.post("/permission/add/" + pId,
        function (data) {
            $("#parentId").val(data.parentId);
            $("#pName").val(data.pname);
        },
        "json"
    );
}
//打开图标列表
$("#ico-btn").click(function(){
    layer.open({
        type: 2,
        title:'图标列表',
        content: '/static/FontIcoList.html',
        area: ['480px', '400px'],
        success: function(layero, index){
            //var body = layer.getChildFrame('.ico-list', index);
            //console.log(layero, index);
        }
    });
});
//打开图标列表
$("#ico-btns").click(function(){
    layer.open({
        type: 2,
        title:'图标列表',
        content: '/static/IcoList.html',
        area: ['480px', '400px'],
        success: function(layero, index){
            //var body = layer.getChildFrame('.ico-list', index);
            //console.log(layero, index);
        }
    });
});
function updatestatus(id, status) {
    $.post("/permission/updateStatus/" + id + "/" + status,
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
    $('#mytab').bootstrapTreeTable('refresh', {url: '/permission/permissionList'});
})
function refush() {
    load();
}
$("#update").click(function () {
    $.post(
        "/permission/permissionUpdateSave",
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
    $.post(
        "/permission/permissionAddSave",
        $("#formadd").serialize(),
        function (data) {
            if (data.result == "success") {
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
            "/permission/deleteManyPermission",
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
    layer.confirm('确认要执行批量修改收支科目状态吗？',function(index){
        $.post(
            "/permission/deleteManyPermission",
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