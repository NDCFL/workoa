//生成用户数据
$('#mytab').bootstrapTable({
    method: 'post',
    contentType: "application/x-www-form-urlencoded",//必须要有！！！！
    url: "/income/incomeList",//要请求数据的文件路径
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
            field: 'hotelVo.title',
            title: '所属酒店',
            align: 'center',
            sortable: true
        },
        {
            field: 'cashSubjectVo.title',
            title: '所属科目',
            align: 'center',
            sortable: true
        },
        {
            field: 'incommeName',
            title: '收入名称',
            align: 'center',
            sortable: true
        },
        {
            field: 'remark',
            title: '收入备注',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return '<a   data-toggle="modal" title="点击查看备注" alt="点击查看备注" data-id="\'' + row.id + '\'" data-target="#remark_modal" onclick="return remarks(\'' + value + '\')" style="color: #0d8ddb">点击查看备注</a>';
            }
        },
        {
            field: 'startTime',
            title: '收入时间',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return formattimes(row.startTime)+"~"+formattimes(row.endTime);
            }
        },
        {
            field: 'money',
            title: '收入总金额',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return '<span style="color: #0d8ddb" >￥'+value+'</span>';
            }
        },
        {
            field: 'dayMoney',
            title: '日收入金额',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return '<span style="color: #0d8ddb" >￥'+value+'</span>';
            }
        },
        {
            field: 'incomeStatus',
            title: '收入结算状态',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                if (value == 0) {
                    //表示启用状态
                    return '<span style="color: #0d8ddb" >已支付</span>';
                } else {
                    //表示启用状态
                    return '<span style="color: red">未支付</span>';
                }
            }
        },
        {
            field: 'isActive',
            title: '状态',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                if (value == 0) {
                    //表示启用状态
                    return '<span style="color: #0d8ddb" >启用</span>';
                } else {
                    //表示启用状态
                    return '<span style="color: red">停用</span>';
                }
            }
        },
        {
            field: 'orderStatus',
            title: '明细状态',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                if (value == 0) {
                    //表示启用状态
                    return '<span style="color: #0d8ddb" >未生成</span>';
                } else {
                    //表示启用状态
                    return '<span style="color: red">已生成</span>';
                }
            }
        },
        {
            field: 'createTime',
            title: '创建时间',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return formattime(value);
            }
        },
        {
            title: '操作',
            align: 'center',
            field: '',
            formatter: function (value, row, index) {
                var e = '<a title="编辑" href="javascript:void(0);" id="income"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#myModal" onclick="return edit(\'' + row.id + '\')"><i class="glyphicon glyphicon-pencil" alt="修改" style="color:green">修改</i></a> ';
                var d = '<a title="删除" href="javascript:void(0);" onclick="del(' + row.id + ',' + row.isActive + ')"><i class="glyphicon glyphicon-trash" alt="删除" style="color:red">删除</i></a> ';
                var f = '';
                if (row.isActive == 1) {
                    f = '<a title="启用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 0 + ')"><i class="glyphicon glyphicon-ok-sign" style="color:green">启用</i></a> ';
                } else if (row.isActive == 0) {
                    f = '<a title="停用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 1 + ')"><i class="glyphicon glyphicon-remove-sign"  style="color:red">停用</i></a> ';
                }
                var p = '<a title="生成明细" href="javascript:void(0);" onclick="generateOrder(' + row.id +')"><i class="glyphicon glyphicon-th-list"  style="color:#9aff9c">生成明细</i></a>';
                var t = '<a title="查看明细" data-toggle="modal" data-id="' + row.id + '" data-target="#order_item_list" onclick="return orderItem(' + row.id +')"><i class="glyphicon glyphicon-th-large"  style="color:#56caff">查看明细</i></a>';
                if(row.orderStatus==0 && row.incomeStatus==0){
                    return e + d + f+p;
                }else if(row.orderStatus==1 && row.incomeStatus==0){
                    return e + d + f+t;
                }else{
                    return e + d + f
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
function  remarks(val) {
    $("#remarks").html(val);
}
function  formattime(value) {
    var date = new Date(value);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var ss = date.getSeconds();
    return y + '-' + (m<10?"0"+m:m) + '-' + (d<10?"0"+d:d) + ' ' + (h<10?"0"+h:h) + ':' + (mi<10?"0"+mi:mi) + ':' + (ss<10?"0"+ss:ss);

}
function  formattimes(value) {
    var date = new Date(value);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var ss = date.getSeconds();
    return y + '-' + (m<10?"0"+m:m) + '-' + (d<10?"0"+d:d) ;

}
function del(id, status) {
    if (status == 0) {
        layer.msg("删除失败，已经启用的不允许删除!", {icon: 2, time: 1000});
        return;
    }
    layer.confirm('确认要删除吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: '/income/deleteIncome/' + id,
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
function generateOrder(id) {
    $.post("/inComeItem/generateOrder/" + id,
        function (data) {
            if (data.result == 'success') {
                layer.alert(data.message, {icon: 1});
                refush();
            } else {
                refush();
                layer.alert(data.message, {icon: 2});
            }
        },
        "json"
    );
}
function edit(name) {
    $.post("/income/findIncome/" + name,
        function (data) {
            $("#updateform").autofill(data);
            $("#test_2_").val(formattimes(data.startTime)+" - "+formattimes(data.endTime));
        },
        "json"
    );
}

function updatestatus(id, status) {
    $.post("/income/updateStatus/" + id + "/" + status,
        function (data) {
            if (status == 0) {
                if (data.message == "ok") {
                    layer.alert("已启用", {icon: 6});
                } else {
                    layer.alert("操作失败", {icon: 6});
                }
            } else {
                if (data.message == "ok") {
                    layer.alert("已停用", {icon: 5});
                } else {
                    layer.alert("操作失败", {icon: 5});
                }
            }
            refush();
        },
        "json"
    );
}

//查询按钮事件
$('#search_btn').click(function () {
    var times = $("#test__2").val();
    var start,end;
    if(!times){
        start = null;
        end = null;
    }else {
        start = times.substring(0,11)+"00:00:00";
        end = times.substring(13,times.length)+" 23:59:59";
    }
    $('#mytab').bootstrapTable('refresh', {
        url: '/income/findIncomeList',
        query:{
            isActive:$("#isActive__").val(),
            createTime:start,
            endTime:end,
            money:$("#money__").val(),
            subjectId:$("#subjectId").val(),
            remark:$("#remark__").val(),
            incomeStatus:$("#incomeStatus__").val(),
            hotelId:$("#hotel_id").val()
        }
    });
})

function refush() {
    $('#mytab').bootstrapTable('refresh', {url: '/income/incomeList'});
}

$("#update").click(function () {
    $.post(
        "/income/incomeUpdateSave",
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
    var times = $("#test_2").val();
    var timeArray = times.split(" - ");
    $.post(
        "/income/incomeAddSave",
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
            "/income/deleteManyIncome",
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

function deleteMany() {
    var isactivity = "";
    var row = $.map($("#mytab").bootstrapTable('getSelections'), function (row) {
        if (row.isActive == 0) {
            isactivity += row.isActive;
        }
        return row.id;
    });
    if (row == "") {
        layer.msg('修改失败，请勾选数据!', {
            icon: 2,
            time: 3000
        });
        return;
    }
    $("#statusId").val(row);
    $("#updateStatus").modal('show');

}

$("#updateSta").click(function () {
    layer.confirm('确认要执行批量修改收支科目状态吗？', function (index) {
        $.post(
            "/income/deleteManyIncome",
            {
                "manyId": $("#statusId").val(),
                "status": $("#status").val()
            },
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
});

function orderItem(id) {
    orders(id);

}
function orders(id) {
    //生成用户数据
    $('#mytab2').bootstrapTable({
        method: 'post',
        contentType: "application/x-www-form-urlencoded",//必须要有！！！！
        url: "/inComeItem/inComeItemLists/"+id,//要请求数据的文件路径
        toolbar: '#toolbar1',//指定工具栏
        striped: true, //是否显示行间隔色
        dataField: "res",
        sortable: true, //是否启用排序 sortOrder: "ID asc",
        sortOrder: "ID asc",
        pagination: true,//是否分页
        queryParamsType: 'limit',//查询参数组织方式
        queryParams: queryParams,//请求服务器时所传的参数
        sidePagination: 'client',//指定服务器端分页
        pageNumber: 1, //初始化加载第一页，默认第一页
        pageSize: 10,//单页记录数
        pageList: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],//分页步进值
        showRefresh: true,//刷新按钮
        showColumns: true,
        clickToSelect: true,//是否启用点击选中行
        toolbarAlign: 'right',//工具栏对齐方式
        buttonsAlign: 'right',//按钮对齐方式
        toolbar: '#toolbar1', search: true,
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
                field: 'subjectName',
                title: '科目名称',
                align: 'center',
                sortable: true
            },
            {
                field: 'time',
                title: '时间',
                align: 'center',
                sortable: true,
                formatter: function (value, row, index) {
                    return formattimes(value);
                }
            },
            {
                field: 'money',
                title: '金额',
                align: 'center',
                sortable: true
            }
        ],
        locale: 'zh-CN',

    })
}