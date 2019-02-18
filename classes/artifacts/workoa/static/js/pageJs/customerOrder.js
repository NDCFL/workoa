//生成用户数据
$('#mytab').bootstrapTable({
    method: 'post',
    contentType: "application/x-www-form-urlencoded",//必须要有！！！！
    url: "/customerOrder/customerOrderList",//要请求数据的文件路径
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
            title: '所属酒店',
            field: 'hotelVo.title',
            align: 'center',
            sortable: true
        },

        {
            title: '客户名称',
            field: 'customerName',
            align: 'center',
            sortable: true
        }
        ,
        {
            title: '客户类型',
            field: 'type',
            align: 'center',
            sortable: true,
            formatter: function (value) {
                if(value=="0"){
                    return '<span style="color:green">在线预付</span>';
                }else{
                    return '<span style="color:red">担保现付</span>';
                }
            }
        }
        ,
        {
            title: '房号',
            field: 'houseVo.cardTitle',
            align: 'center',
            sortable: true
        }
        ,
        {
            title: '押金',
            field: 'deposit',
            align: 'center',
            sortable: true
        }
        ,
        {
            title: '入住天数',
            field: 'totalDays',
            align: 'center',
            sortable: true
        }
        ,
        {
            title: '入住时间',
            field: 'checkinTime',
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
            title: '审核状态',
            field: 'isCheck',
            align: 'center',
            formatter: function (value, row, index) {
                if (value == 0) {
                    //表示启用状态
                    return '<span style="color:blue" >未审核</span>';
                } else if(value==1){
                    //表示启用状态
                    return '<span style="color:green">审核通过</span>';
                }else if(value==2){
                    //表示启用状态
                    return '<span style="color:red">审核不通过</span>';
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
            title: '账目状态',
            field: 'isActive',
            align: 'center',
            formatter: function (value, row, index) {
                if (value == 0) {
                    //表示启用状态
                    return '<span style="color:green" >启用</span>';
                } else {
                    //表示启用状态
                    return '<span style="color:red">停用</span>';
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
                return y + '-' + m + '-' + d ;
            }
        }
        ,

        {
            title: '操作',
            align: 'center',
            field: '',
            formatter: function (value, row, index) {
                var g='';
                if(row.isCheck==0){
                    g = '<a title="审核" id="checker" id="customerOrder"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#shenheModal" onclick="return shenhe(\'' + row.id + '\')"><i class="glyphicon glyphicon-import" alt="审核" style="color:green"></i></a>';
                }else{
                    g = '<a title="批注" id="checker" id="customerOrder"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#remarkModal" onclick="return remark(\'' + row.id + '\')"><i class="glyphicon glyphicon-pushpin" alt="批注" style="color:green"></i></a>';
                }
                var e=  '<a title="修改" href="javascript:void(0);" id="customerOrder"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#updateHouseHander" onclick="return updateHouse(\'' + row.id + '\')"><i class="glyphicon glyphicon-pencil" alt="修改" style="color:green">修改</i></a> ';
                var p= '<a title="详情" href="javascript:void(0);" id="customerOrder"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#myModal" onclick="return edit(\'' + row.id + '\')"><i class="glyphicon glyphicon-align-justify" alt="详情" style="color:green"></i></a> ';
                var d = '<a title="删除" href="javascript:void(0);" onclick="del(' + row.id + ',' + row.isActive + ')"><i class="glyphicon glyphicon-trash" alt="删除" style="color:red">删除</i></a> ';
                var f = '';
                if (row.isActive == 1) {
                    f = '<a title="启用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 0 + ')"><i class="glyphicon glyphicon-ok-sign" style="color:green">启用</i></a> ';
                } else if (row.isActive == 0) {
                    f = '<a title="停用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 1 + ')"><i class="glyphicon glyphicon-remove-sign"  style="color:red">停用</i></a> ';
                }
                var t = '<a title="新增款项" id="checker" id="customerOrder" onclick="orderAdd(' + row.id + ')"  data-toggle="modal" data-target="#orderAdd" data-id="\'' + row.id + '\'" ><i class="glyphicon glyphicon-usd" alt="新增款项" style="color:green"></i></a>';
                return g+e +p+ f+t;
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
function orderAdd(id) {
    $.post("/customerOrder/findCustomerOrder/" + id,
        function (data) {
            $("#house_id").val(data.houseId);
        },"json"
    );
}
function del(customerOrderid, status) {
    if (status == 0) {
        layer.msg("删除失败，已经启用的不允许删除!", {icon: 2, time: 1000});
        return;
    }
    layer.confirm('确认要删除吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: '/customerOrder/deleteCashAccounts/' + customerOrderid,
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
    $.post("/customerOrder/findCustomerOrder/" + name,
        function (data) {
            $("#updateform").autofill(data);
            $("#sumMoney1").html(data.housePay + "元");
            var colum = $("#website_Id").select2();
            //选中某一行
            colum.val(data.websiteId).trigger("change");
            colum.change();
            $.post("/house/findHouse/"+data.houseId,
                function (obj) {
                    var colum2 = $("#houseTypeId").select2();
                    //选中某一行
                    colum2.val(obj.type).trigger("change");
                    colum2.change();
                    var colum1 = $("#house_Id").select2();
                    colum1.val(data.houseId).trigger("change");
                    colum1.change();
                    //已经审核过的订单不允许修改
                    if(data.isCheck==1){
                        $("#updateitem").attr("disabled","disabled");
                    }
                },
                "json"
            );
            if (data.typeId == 1) {
                if (data.otherHotel == '' || data.otherHotel == null) {
                    data.otherHotel = -1;
                }
                var colum3 = $("#otherHotel").select2();
                //选中某一行
                colum3.val(data.otherHotel).trigger("change");
                colum3.change();
                if (data.paymentTypeId == '' || data.paymentTypeId == null) {
                    data.paymentTypeId = -1;
                }
                var colum4 = $("#payment_Type_Id").select2();
                //选中某一行
                colum4.val(data.paymentTypeId).trigger("change");
                colum4.change();
                document.getElementById("isCash1").options[data.isCash].selected = true;
            } else if (data.typeId == 2) {
                if (data.otherHotel == '' || data.otherHotel == null) {
                    data.otherHotel = -1;
                }
                var colum3 = $("#other_hotel").select2();
                colum3.val(data.otherHotel).trigger("change");
                colum3.change();
                document.getElementById("isCash2").options[data.isCash].selected = true;
            }
            var colum5 = $("#otherType").select2();
            colum5.val(data.paymentTypeId).trigger("change");
            colum5.change();
            $.post("/item/orderList/" + data.houseId,
                function (data) {
                    var info ="";
                    var cnt = parseInt(data.length);
                    for(var i=0;i<cnt;i++){
                        if(data[i].hander==null || data[i].hander==''){
                            data[i].hander="暂无";
                        }
                        if(data[i].isCash==0){
                            data[i].isCash='<span style="color:green">未结算</span>';
                        }else{
                            data[i].isCash='<span style="color:red">已结算</span>';
                        }
                        info+='<tr>';
                        info+='<td>'+data[i].serviceSubjectVo.title+'</td>';
                        info+='<td>'+data[i].houseVo.cardTitle+'</td>';
                        info+='<td style="color:red">$'+data[i].payMoney+'</td>';
                        info+='<td>'+data[i].isCash+'</td>';
                        info+='<td>'+getDate(data[i].payTime)+'</td>';
                        info+='<td>'+data[i].hander+'</td>';
                        info+='<td><a href="javascript:void(0);" onclick="deleteItem('+data[i].id +')">删除</a></td>';
                        info+='</tr>';
                    }
                    $("#infodata").html(info);
                },
                "json"
            );

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
    $.post("/customerOrder/updateStatus/" + id + "/" + status,
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
    $('#mytab').bootstrapTable('refresh', {url: '/customerOrder/customerOrderList'});
})
function refush() {
    $('#mytab').bootstrapTable('refresh', {url: '/customerOrder/customerOrderList'});
}
$("#remarkAdd").click(function () {
    $.post(
        "/customerOrder/customerOrderUpdateRemark",
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
    $.post(
        "/customerOrder/customerOrderUpdateSave",
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
function updateHouse(id) {
    $.post(
        "/customerOrder/findCustomerOrder/"+id,
        function (data) {
            $("#tuifang").autofill(data);
            $("#huanfang").autofill(data);
            $("#lv").val(getDate(data.checkoutTime));
        }, "json"
    );
}
$("#shenhe").click(function () {
    $.post(
        "/customerOrder/customerOrderShenHe",
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

$('#formadd').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        totalPay: {
            message: '现金流水账目金额验证失败',
            validators: {
                notEmpty: {
                    message: '现金流水账目金额不能为空'
                },
                regexp: {
                    regexp: /^[0-9]+$/,
                    message: '现金流水账目金额只能是数字'
                }

            }
        },
        accountTime: {
            message: '收支时间验证失败',
            validators: {
                notEmpty: {
                    message: '收支时间不能为空'
                }

            }
        },
        description: {
            message: '账目说明验证失败',
            validators: {
                notEmpty: {
                    message: '账目说明不能为空'
                }
            }
        }
    }
}).on('success.form.bv', function(e) {//点击提交之后
    e.preventDefault();
    var $form = $(e.target);
    var bv = $form.data('bootstrapValidator');
    $.post(
        "/customerOrder/customerOrderAddSave",
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
    layer.confirm('确认要执行批量删除现金流水账目数据吗？', function (index) {
        $.post(
            "/customerOrder/deleteManyCustomerOrder",
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
function getAccounts(){
    $("#accountsshenhe").click(function () {
        var cashStatus = "";
        var row = $.map($("#mytab").bootstrapTable('getSelections'), function (row) {
            if (row.isCash == 1) {
                cashStatus += row.isCash;
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
                "/customerOrder/checkerCashAccounts",
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
function getDate(value) {
    var date = new Date(parseInt(value));
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var ss = date.getSeconds();
    return y + '-' + m + '-' + d +' '+h+':'+mi+':'+ss;
}
function deleteItem(id) {
    alert(id);
}