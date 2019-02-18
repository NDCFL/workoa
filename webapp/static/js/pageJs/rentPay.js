//生成用户数据
$('#mytab').bootstrapTable({
    method: 'post',
    contentType: "application/x-www-form-urlencoded",//必须要有！！！！
    url: "/rentPay/rentPayList",//要请求数据的文件路径
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
            title: '房间名称',
            field: 'houseVo.cardTitle',
            align: 'center',
            sortable: true
        },
        {
            title: '房源归属',
            field: 'hotelVo.title',
            align: 'center',
            sortable: true
        },
        {
            title: '业主名称',
            field: 'contractMasterVo.bankName',
            align: 'center',
            sortable: true
        }
        ,
        {
            title: '业主电话',
            field: 'contractMasterVo.phone',
            align: 'center',
            sortable: true
        }
        ,
        {
            title: '支付周期',
            field: 'payType',
            align: 'center',
            sortable: true,
            formatter: function (value) {
                if(value==1){
                    return '<span>1/月付</span>';
                }else if(value==2){
                    return '<span>2/月付</span>';
                }else if(value==3){
                    return '<span>3/月付</span>';
                }else if(value==4){
                    return '<span>4/月付</span>';
                }else if(value==6){
                    return '<span>6/月付</span>';
                }else if(value==12){
                    return '<span>12/月付</span>';
                }
            }
        }
        ,
        {
            title: '分成方式',
            field: 'payMoneyType',
            align: 'center',
            sortable: true,
            formatter: function (value) {
                if(value==0){
                    return '<span>有成本</span>';
                }else if(value==1){
                    return '<span>无成本</span>';
                }
            }
        }
        ,
        {
            title: '分成比例',
            field: 'payProportion',
            align: 'center',
            sortable: true,
            formatter: function (value) {
                return '<span style="color:green">'+value*100+'%</span>';
            }
        }
        ,
        {
            title: '房间面积',
            field: 'area',
            align: 'center',
            sortable: true,
            formatter: function (value) {
                return '<span style="color:green">'+value+'平米</span>';
            }
        }
        ,
        {
            title: '当前支付时间',
            field: 'payPeriodEnd',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return formattime(value);
            }
        },
        {
            title: '未支付总额',
            field: 'sumPay',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return '<span style="color:green">￥'+value+'</span>';
            }
        },
        {
            title: '合同到期时间',
            field: 'factPayTimeEnd',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return formattimes(value);
            }
        }
        ,
        {
            title: '创建时间',
            field: 'createTime',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return formattime(value);
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
                    return '<span style="color: #0d8ddb" >启用</span>';
                } else {
                    //表示启用状态
                    return '<span style="color: red">停用</i>';
                }
            }
        }
        ,
        {
            title: '操作',
            align: 'center',
            field: '',
            formatter: function (value, row, index) {
                var e = '<a title="编辑" href="javascript:void(0);" id="rentPay"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#myModal" onclick="return edit(\'' + row.id + '\')"><i class="glyphicon glyphicon-pencil" alt="修改" style="color:green">修改</i></a> ';
                var d = '<a title="删除" href="javascript:void(0);" onclick="del(' + row.id + ',' + row.isActive + ')"><i class="glyphicon glyphicon-trash" alt="删除" style="color:red">删除</i></a> ';
                var f = '';
                if (row.isActive == 1) {
                    f = '<a title="启用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 0 + ')"><i class="glyphicon glyphicon-ok-sign" style="color:green">启用</i></a> ';
                } else if (row.isActive == 0) {
                    f = '<a title="停用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 1 + ')"><i class="glyphicon glyphicon-remove-sign"  style="color:red">停用</i></a> ';
                }
                var s = '<a title="付款" href="javascript:void(0);"  data-toggle="modal" data-id="\\\'\' + row.id + \'\\\'" data-target="#fukuan" onclick="fukuan(' + row.id + ',' +row.firstPay + ')"><i class="glyphicon glyphicon-euro" alt="付款" style="color:red">付款</i></a> ';
                var p = '<a title="生成明细" href="javascript:void(0);" onclick="generateOrder(' + row.id +')"><i class="glyphicon glyphicon-th-list"  style="color:#9aff9c">生成明细</i></a>';
                var t = '<a title="查看明细" data-toggle="modal" data-id="' + row.id + '" data-target="#order_item_list" onclick="return orderItem(' + row.id +')"><i class="glyphicon glyphicon-th-large"  style="color:#56caff">查看明细</i></a>';
                if(row.orderStatus==0){
                    return e + d + f+p+s;
                }else if(row.orderStatus==1){
                    return e + d + f+t+s;
                }else{
                    return e + d + f+s
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
function del(rentPayid, status) {
    if (status == 0) {
        layer.msg("删除失败，已经启用的不允许删除!", {icon: 2, time: 1000});
        return;
    }
    layer.confirm('确认要删除吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: '/rentPay/deleteRentPay/' + rentPayid,
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
    alert("999999999999");
    $.post("/rentPay/findRentPay/" + name,
        function (data) {
            $("#updateform").autofill(data);
            $("#test3").val(formattimes(data.payPeriodStart));
            $("#test4").val(formattimes(data.factPayTimeStart));
        },
        "json"
    );
}
function fukuan(id,money){
    $("#first_pay").val(money);
    $("#id").val(id);
}
function updatestatus(id, status) {
    $.post("/rentPay/updateStatus/" + id + "/" + status,
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
    var times = $("#test11").val();
    var start,end;
    if(!times){
        start = null;
        end = null;
    }else {
        start = times.substring(0,11)+"00:00:00";
        end = times.substring(13,times.length)+" 23:59:59";
    }
    $('#mytab').bootstrapTable('refresh',
        {
            url: '/rentPay/findRentPayList',
            query:{
                createTime:start,
                endTime:end,
                name:$("#bankAccountName").val(),
                phone:$("#phone").val(),
                houseName:$("#houseName").val(),
                payMoneyType:$("#payMoneyType").val(),
                payType:$("#payType").val(),
                description:$("#descriptions").val(),
                isActive:$("#status").val(),
                hotelId:$("#hotel_Ids").val()
            }
        }
    );
})
function refush() {
    $('#mytab').bootstrapTable('refresh', {url: '/rentPay/rentPayList'});
}
$("#update").click(function () {
    $.post(
        "/rentPay/rentPayUpdateSave",
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
$("#huankuan").click(function () {
    $.post(
        "/rentPay/huankuan",
        $("#fu_kuan").serialize(),
        function (data) {
            if (data.message.indexOf("成功")>0) {
                layer.alert(data.message, {icon: 6});
                refush();
            } else {
                layer.msg(data.message, {icon:2, time: 1000});
                refush();
            }
            $("#fukuan").modal('hide');
        }, "json"
    );
});
$("#add").click(function () {
    $.post(
        "/rentPay/rentPayAddSave",
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
            "/rentPay/deleteManyCashSubject",
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
function generateOrder(id) {
    $.post("/rentPayItem/generateOrder/" + id,
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
function orderItem(id) {
    orders(id);

}
function pay(id) {
    $.post(
        "/rentPayItem/pay/"+id,
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


}
function orders(id) {
    //生成用户数据
    $('#mytab2').bootstrapTable({
        method: 'post',
        contentType: "application/x-www-form-urlencoded",//必须要有！！！！
        url: "/rentPayItem/rentPayItemLists/"+id,//要请求数据的文件路径
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
                field: 'payTime',
                title: '约定付款时间',
                align: 'center',
                sortable: true,
                formatter: function (value, row, index) {
                    return formattimes(value);
                }
            },
            {
                field: 'realityPayTime',
                title: '实际付款时间',
                align: 'center',
                sortable: true,
                formatter: function (value, row, index) {
                    if(!value){
                        return '未付款';
                    }else{
                        return formattime(value);
                    }
                }
            },
            {
                field: 'isActive',
                title: '付款状态',
                align: 'center',
                sortable: true,
                formatter: function (value, row, index) {
                    if (value == 0) {
                        //表示启用状态
                        return '<span style="color: #0d8ddb" >待付款</span>';
                    } else {
                        //表示启用状态
                        return '<span style="color: red">已付款</i>';
                    }
                }
            },
            {
                field: 'outMoney',
                title: '本期成本支出',
                align: 'center',
                sortable: true,
                formatter: function (value, row, index) {
                    if(!value){
                        return '未出账';
                    }else{
                        return value;
                    }
                }
            },
            {
                field: 'inMoney',
                title: '本期营业收入',
                align: 'center',
                sortable: true,
                formatter: function (value, row, index) {
                    if(!value){
                        return '未出账';
                    }else{
                        return value;
                    }
                }
            },
            {
                field: 'payMoney',
                title: '支付金额',
                align: 'center',
                sortable: true,
                formatter: function (value, row, index) {
                    if(!value){
                        return '未出账';
                    }else{
                        return value;
                    }
                }
            },
            {
                field: 'outTime',
                title: '本期成本支出时间范围',
                align: 'center',
                sortable: true,
                formatter: function (value, row, index) {
                    if(!value){
                        return '未统计';
                    }else{
                        return value;
                    }
                }
            },
            {
                field: 'inTime',
                title: '本期营业收入时间范围',
                align: 'center',
                sortable: true,
                formatter: function (value, row, index) {
                    if(!value){
                        return '未统计';
                    }else{
                        return value;
                    }
                }
            },
            {
                field: 'payProportion',
                title: '分成比例',
                align: 'center',
                sortable: true,
                formatter: function (value, row, index) {
                    return parseFloat(value)*100+"%";
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
                    var e = '<a title="付款" href="javascript:void(0);" id="rentPayItem" onclick="pay(\'' + row.id + '\')">付款</a> ';
                    return e;
                }
            }
        ],
        locale: 'zh-CN',//中文支持,

    })
}