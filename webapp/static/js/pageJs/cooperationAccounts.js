//生成用户数据
$('#mytab').bootstrapTable({
    method: 'post',
    contentType: "application/x-www-form-urlencoded",//必须要有！！！！
    url: "/cooperationAccounts/cooperationAccountsList",//要请求数据的文件路径
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
            title: '账单类型',
            field: 'accountType',
            align: 'center',
            sortable: true,
            formatter: function (value) {
                if(value==0){
                    return '<span style="color:green">收入</span>';
                }else if(value==1){
                    return '<span style="color:red">支出</span>';
                }
            }

        }
        ,
        {
            title: '账单日期',
            field: 'accountTime',
            align: 'center',
            sortable: true,
            formatter: function (value) {
                if(value==""){
                    return '<span style="color:red">暂未更新</span>';
                }else{
                    var date = new Date(value);
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    var d = date.getDate();
                    var h = date.getHours();
                    var mi = date.getMinutes();
                    var ss = date.getSeconds();
                    return y + '-' + m + '-' + d;
                }
            }
        }
        ,

        {
            title: '金额',
            field: 'totalPay',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return '<span style="color:red" >￥'+value+'</span>';
            }
        }
        ,
        {
            title: '结算状态',
            field: 'isCash',
            align: 'center',
            formatter: function (value, row, index) {
                if (value == 0) {
                    //表示启用状态
                    return '<span style="color:red" >未结算</span>';
                } else if(value==1){
                    //表示启用状态
                    return '<span style="color:green">已结算</span>';
                }else if(value==2){
                    //表示启用状态
                    return '<span style="color:orange">有异议</span>';
                }
            }
        }
        ,
        {
            title: '商家名称',
            field: 'cooperationCompanyVo.name',
            align: 'center',
            sortable: true
        },
        {
            title: '来往科目',
            field: 'cooperationSubjectVo.title',
            align: 'center',
            sortable: true
        }
        ,
        {
            title: '账单说明',
            field: 'description',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return '<a   data-toggle="modal"  title="点击查看详情" alt="点击查看详情" data-id="\'' + row.id + '\'" data-target="#remark_modal" onclick="return remarks(\'' + value + '\')">'+value.substr(0,10)+"..."+'</a>';
            }
        }
        ,
        {
            title: '批注',
            field: 'remark',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return '<a   data-toggle="modal"  title="点击查看详情" alt="点击查看详情" data-id="\'' + row.id + '\'" data-target="#remarks_modal" onclick="return remarkss(\'' + value + '\')">'+value.substr(0,10)+"..."+'</a>';
            }
        }
        ,
        {
            title: '审核状态',
            field: 'cashStatus',
            align: 'center',
            formatter: function (value, row, index) {
                if (value == 0) {
                    return '<a   data-toggle="modal"  title="点击查看详情" alt="点击查看详情" style="color:blue" data-id="\'' + row.id + '\'" data-target="#check_modal" onclick="return checks(\'' + row.reason + '\')">'+"未审核"+'</a>';
                } else if(value==1){
                    return '<a   data-toggle="modal"  title="点击查看详情" alt="点击查看详情" style="color:green" data-id="\'' + row.id + '\'" data-target="#check_modal" onclick="return checks(\'' + row.reason + '\')">'+"审核通过"+'</a>';
                }else if(value==2){
                    //表示启用状态
                    return '<a   data-toggle="modal"  title="点击查看详情" alt="点击查看详情" style="color:red" data-id="\'' + row.id + '\'" data-target="#check_modal" onclick="return checks(\'' + row.reason + '\')">'+"审核不通过"+'</a>';
                }
            }
        }
        ,
        {
            title: '最后操作人',
            field: 'hand',
            align: 'center',
            sortable: true
        }
        ,
        {
            title: '操作',
            align: 'center',
            field: '',
            formatter: function (value, row, index) {
                var g='<a title="审核" id="checker" id="cooperationAccounts"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#shenheModal" onclick="return shenhe(\'' + row.id + '\')"><i class="glyphicon glyphicon-import" alt="审核" style="color:green">审核</i></a>';
                var p= '<a title="批注" id="checker" id="cooperationAccounts"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#remarkModal" onclick="return remark(\'' + row.id + '\')"><i class="glyphicon glyphicon-pushpin" alt="批注" style="color:green">批注</i></a>';
                var e = '<a title="编辑" href="javascript:void(0);" id="cooperationAccounts"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#myModal" onclick="return edit(\'' + row.id + '\')"><i class="glyphicon glyphicon-pencil" alt="修改" style="color:green">修改</i></a> ';
                var d = '<a title="删除" href="javascript:void(0);" onclick="del(' + row.id + ',' + row.isActive + ')"><i class="glyphicon glyphicon-trash" alt="删除" style="color:red">删除</i></a> ';
                var f = '';
                if (row.isActive == 1) {
                    f = '<a title="启用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 0 + ')"><i class="glyphicon glyphicon-ok-sign" style="color:green">启用</i></a> ';
                } else if (row.isActive == 0) {
                    f = '<a title="停用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 1 + ')"><i class="glyphicon glyphicon-remove-sign"  style="color:red">停用</i></a> ';
                }
                if(row.cashStatus==1){
                    return g+p;
                }else{
                    return g+p+e+d;
                }
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
        pageIndex: this.pageNumber,
        searchVal: title
    }
}
function getdate(value) {
    var date = new Date(value);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var ss = date.getSeconds();
    return y + '-' + m + '-' + d;
}
function  remarks(val) {
    $("#remarks").html(val);
}
function  remarkss(val) {
    $("#remarkss").html(val);
}
function  checks(val) {
    $("#checks").html(val);
}
function del(cooperationAccountsid, status) {
    layer.confirm('确认要删除吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: '/cooperationAccounts/deleteCooperationAccounts/' + cooperationAccountsid,
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
    $.post("/cooperationAccounts/findCooperationAccounts/" + name,
        function (data) {
            $("#updateform").autofill(data);
            var colum = $("#subjectId").select2();
            //选中某一行
            colum.val(data.subjectId).trigger("change");
            colum.change();
            var colum1 = $("#cooperationCompanyId").select2();
            //选中某一行
            colum1.val(data.cooperationCompanyId).trigger("change");
            colum1.change();
            $("#accountTime").val(data.accountTime);
            $("#select2-subjectId-container").remove();
            $("#select2-cooperationCompanyId-container").remove();
            $("#test21").val(getdate(data.accountTime));
        },
        "json"
    );
}
function shenhe(name) {
    $("#accountid").val(name);
}
function remark(name) {
    $("#remarkid").val(name);
}
function updatestatus(id, status) {
    $.post("/cooperationAccounts/updateStatus/" + id + "/" + status,
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
    var times = $("#test_2").val();
    var start,end;
    if(!times){
        start = null;
        end = null;
    }else {
        times.replace("起","-").replace("止","");
        start = times.substring(0,11)+"00:00:00";
        end = times.substring(13,times.length)+" 23:59:59";
    }
    $('#mytab').bootstrapTable('refresh', {
        url: '/cooperationAccounts/findCooperationAccountsList',
        query:{
            accountType:$("#accountType_").val(),
            createTime:start,
            endTime:end,
            totalPay:$("#totalPay_").val(),
            subjectId:$("#subjectId_").val(),
            description:$("#description_").val(),
            cashStatus:$("#cashStatus_").val(),
            hander:$("#handId").val(),
            title:$("#cooperation_company_id_").val(),
            hotelId:-1,
            isCash:$("#iscash").val()
        }
    });
    $.post(
        "/cooperationAccounts/cashSum",
        {
            accountType:$("#accountType_").val(),
            createTime:start,
            endTime:end,
            totalPay:$("#totalPay_").val(),
            subjectId:$("#subjectId_").val(),
            description:$("#description_").val(),
            cashStatus:$("#cashStatus_").val(),
            hander:$("#handId").val(),
            title:$("#cooperation_company_id_").val(),
            hotelId:-1,
            isCash:$("#iscash").val()
        },
        function (data) {
            $("#findin").html("￥"+data.sumMoneyIn);
            $("#findout").html("￥"+data.sumMoneyOut);
            $("#findjieyu").html("￥"+data.sumMoneyJieyu);
        },
        "json"
    );

})
function refush() {
    var times = $("#test_2").val();
    var start,end;
    if(!times){
        start = null;
        end = null;
    }else {
        times.replace("起","-").replace("止","");
        start = times.substring(0,11)+"00:00:00";
        end = times.substring(13,times.length)+" 23:59:59";
    }
    $('#mytab').bootstrapTable('refresh', {
        url: '/cooperationAccounts/findCooperationAccountsList',
        query:{
            accountType:$("#accountType_").val(),
            createTime:start,
            endTime:end,
            totalPay:$("#totalPay_").val(),
            subjectId:$("#subjectId_").val(),
            description:$("#description_").val(),
            cashStatus:$("#cashStatus_").val(),
            hander:$("#handId").val(),
            title:$("#cooperation_company_id_").val(),
            hotelId:-1,
            isCash:$("#iscash").val()
        }
    });
    getVal();
}
$("#remarkAdd").click(function () {
    $.post(
        "/cooperationAccounts/cooperationAccountsUpdateRemark",
        $("#remarkform").serialize(),
        function (data) {
            if (data.message == "批注成功!") {
                layer.alert(data.message, {icon: 6});
                refush();
            } else {
                layer.alert(data.message, {icon: 6});
                refush();
            }
        }, "json"
    );
});
$("#update").click(function () {

    var time = $("#test21").val();
    if(!time){
        layer.alert("请选择收支周期", {icon: 6});
        return;
    }else{
        $("#test_21").val(time+" 08:30:00");
    }
    $.post(
        "/cooperationAccounts/cooperationAccountsUpdateSave",
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
$("#shenhe").click(function () {
    $.post(
        "/cooperationAccounts/cooperationAccountsShenHe",
        $("#shenheform").serialize(),
        function (data) {
            if (data.message == "审核成功!") {
                layer.alert(data.message, {icon: 6});
                refush();
            } else {
                layer.alert(data.message, {icon: 6});
                refush();
            }
        }, "json"
    );
});

$('#add').click(function () {
    if(!$("#money_").val()){
        layer.alert("金额不能为空", {icon: 5});
        return;
    }
    if(isNaN($("#money_").val())){
        layer.alert("金额不能含有字符", {icon: 5});
        return;
    }
    if(!$("#test1").val()) {
        layer.alert("收支时间不能为空", {icon: 5});
        return;
    }
    $("#accountTime").val($("#test1").val()+" 08:00:00");
    $.post(
        "/cooperationAccounts/cooperationAccountsAddSave",
        $("#formadd").serialize(),
        function (data) {
            if (data.message == "新增成功!") {
                layer.alert(data.message, {icon: 6});
            } else {
                layer.alert(data.message, {icon: 6});

            }
            refush();
            $("#webAdd").modal('hide');
            $("#totalPay").val("");
            $("#accountTime").val("");
            $("#description").val("");
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
    layer.confirm('确认要执行批量删除现金流水账目数据吗？', function (index) {
        $.post(
            "/cooperationAccounts/deleteManyCooperationAccounts",
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
    layer.confirm('确认要执行批量修改结算状态吗？',function(index){
        $.post(
            "/cooperationAccounts/deleteManyCooperationAccounts",
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

function getAccounts(){
    $("#accountsshenhe").click(function () {
        var cashStatus = "";
        var row = $.map($("#mytab").bootstrapTable('getSelections'), function (row) {
            if (row.isCooperation == 1) {
                cooperationStatus += row.isCooperation;
            }
            return row.id;
        });
        if (row == "") {
            layer.msg('审核失败，请勾选数据!', {
                icon: 2,
                time: 2000
            });
            return;
        }
        if (cashStatus != "") {
            layer.msg('审核失败，已经审核通过的的不允许再次审核!', {
                icon: 2,
                time: 2000
            });
            return;

        }
        $("#manyId").val(row);
        layer.confirm('确认要执行批量审核现金流水账目吗？', function (index) {
            $.post(
                "/cooperationAccounts/checkerCooperationAccounts",
                $("#manyshenheform").serialize(),
                function (data) {
                    if (data.message == "批量审核成功!") {
                        layer.alert(data.message, {icon: 6});
                    } else {
                        layer.alert(data.message, {icon: 6});
                    }
                    refush();
                    $("#manyId").val("");
                    $("#accountsReason").val("");
                }, "json"
            );
        });
    });

}
