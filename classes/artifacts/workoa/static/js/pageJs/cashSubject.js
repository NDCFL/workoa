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
        url: "/cashSubject/cashSubjectList",//要请求数据的文件路径
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
                title: '科目名称',
                field: 'title',
                align: 'center',
                valign: 'center',
                sortable: true
            },
            {
                title: '科目描述',
                field: 'description',
                align: 'center',
                valign: 'center',
                sortable: true
            }
            ,
            {
                title: '创建时间',
                field: 'createTime',
                align: 'center',
                valign: 'center',
                sortable: true,
                formatter: function (item) {
                    var date = new Date(item.createTime);
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
                valign: 'center',
                formatter: function (value,index) {
                    if (value.isActive == 0) {
                        //表示启用状态
                        return '<span style="color: green" >启用</span>';
                    } else {
                        //表示启用状态
                        return '<span style="color: red">停用</span>';
                    }
                }
            }
            ,
            {
                title: '操作',
                align: 'center',
                valign: 'center',
                field: '',
                formatter: function (item, index) {
                    var e = '<a title="编辑" href="javascript:void(0);" id="cashSubject"  data-toggle="modal" data-id="\'' + item.id + '\'" data-target="#myModal" onclick="return edit(\'' + item.id + '\')"><i class="glyphicon glyphicon-pencil" alt="修改" style="color:green">修改</i></a> ';
                    var d = '<a title="删除" href="javascript:void(0);" onclick="del(' + item.id + ',' + item.isActive + ')"><i class="glyphicon glyphicon-trash" alt="删除" style="color:red">删除</i></a> ';
                    var f = '';
                    if (item.isActive == 1) {
                        f = '<a title="启用" href="javascript:void(0);" onclick="updatestatus(' + item.id + ',' + 0 + ')"><i class="glyphicon glyphicon-ok-sign" style="color:green">启用</i></a> ';
                    } else if (item.isActive == 0) {
                        f = '<a title="停用" href="javascript:void(0);" onclick="updatestatus(' + item.id + ',' + 1 + ')"><i class="glyphicon glyphicon-remove-sign"  style="color:red">停用</i></a> ';
                    }
                    var g = '<a title="添加子科目" href="javascript:void(0);" data-toggle="modal" data-toggle="modal" data-target="#webAdd"><i class="glyphicon glyphicon-pencil" alt="添加子科目" onclick="return addSubject(\''+item.title+'\',\''+item.id+'\')" style="color:green">添加子科目</i></a>';

                    return e + d + f + g;
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
function addSubject(name,id) {
    $("#parentName").val(name);
    $("#parent_id").val(id);
}
function del(cashSubjectid, status) {
    if (status == 0) {
        layer.msg("删除失败，已经启用的不允许删除!", {icon: 2, time: 1000});
        return;
    }
    layer.confirm('确认要删除吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: '/cashSubject/deleteCashSubject/' + cashSubjectid,
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
    $.post("/cashSubject/findCashSubject/" + name,
        function (data) {
            $("#updateform").autofill(data);
        },
        "json"
    );
}
function updatestatus(id, status) {
    $.post("/cashSubject/updateStatus/" + id + "/" + status,
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
    $('#mytab').bootstrapTable('refresh', {url: '/cashSubject/cashSubjectList'});
})
function refush() {
    load();
}
$("#update").click(function () {
    $.post(
        "/cashSubject/cashSubjectUpdateSave",
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
        "/cashSubject/cashSubjectAddSave",
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
            "/cashSubject/deleteManyCashSubject",
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
            "/cashSubject/deleteManyCashSubject",
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