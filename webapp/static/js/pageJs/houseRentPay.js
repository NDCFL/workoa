//生成用户数据
$('#mytab').bootstrapTable({
    method: 'post',
    contentType: "application/x-www-form-urlencoded",//必须要有！！！！
    url: "/houseRentPay/houseRentPayList",//要请求数据的文件路径
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
            title: '房号',
            field: 'houseName',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return '<a title="点击查看详情" href="javascript:void(0);" id="houseRentPay"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#myModal" onclick="return edit(\'' + row.id + '\')">'+value+'</a>';
            }
        },
        {
            title: '业主姓名',
            field: 'contractMasterVo.bankAccountName',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return  '<a title="点击查看详情" href="javascript:void(0);" id="contractMaster"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#fd" onclick="return fd(\'' + row.contractMasterVo.id + '\')">'+value+'</a> ';

            }
        }
        ,
        {
            title: '房源归属',
            field: 'hotelVo.title',
            align: 'center',
            sortable: true
        },
        {
            title: '签约年限',
            field: 'payTime',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return '<span style="color:green">'+value+'年</span>';
            }
        }
        ,
        {
            title: '合同周期',
            field: 'loopTime',
            align: 'center',
            sortable: true
        }
        ,
        {
            title: '租金总额',
            field: 'totalPay',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return '<span style="color:green">￥'+value+'</span>';
            }

        }
        ,
        {
            title: '剩余未付',
            field: 'spareMoney',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                return '<span style="color:red">￥'+value+'</span>';
            }
        }
        ,
        {
            title: '付款方式',
            field: 'payType',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
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
            title: '每期应付',
            field: 'firstPay',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                if((value+"").indexOf(".")>0){
                    return '<span >￥'+(value+"").substring(0,parseInt((value+"").indexOf(".")+3))+'</span>';
                }else if((value+"").indexOf(".")<=0){
                    return '<span >￥'+(value+"")+'</span>';
                }

            }
        }
        ,
        {
            title: '本期应付',
            field: 'thisMoney',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                if((value+"").indexOf(".")>0){
                    return '<span style="color:green">￥'+(value+"").substring(0,parseInt((value+"").indexOf(".")+3))+'</span>';
                }else if((value+"").indexOf(".")<=0){
                    return '<span style="color:green">￥'+(value+"")+'</span>';
                }

            }
        }
        ,
        {
            title: '备注',
            field: 'description',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
                if(value.length<10){
                    return '<a   data-toggle="modal" title="点击查看详情" alt="点击查看详情" data-id="\'' + row.id + '\'" data-target="#remark_modal" onclick="return remarks(\'' + value + '\')">'+value.substr(0,10)+'</a>';
                }else{
                    return '<a   data-toggle="modal" title="点击查看详情" alt="点击查看详情" data-id="\'' + row.id + '\'" data-target="#remark_modal" onclick="return remarks(\'' + value + '\')">'+value.substr(0,10)+"..."+'</a>';
                }
            }
        }
        ,
        {
            title: '本期支付状态',
            field: 'isCash',
            align: 'center',
            formatter: function (value, row, index) {
                if (value == 0) {
                    //表示启用状态
                    return '<i style="color: red">未支付</i>';
                } else {
                    //表示启用状态
                    return '<i style="color: green">已支付</i>';
                }
            }
        }
        ,
        {
            title: '房态状态',
            field: 'isActive',
            align: 'center',
            formatter: function (value, row, index) {
                if (value == 0) {
                    //表示启用状态
                    return '<i style="color: green">启用</i>';
                } else {
                    //表示启用状态
                    return '<i style="color: red">停用</i>';
                }
            }
        }
        ,
        {
            title: '操作',
            align: 'center',
            field: '',
            formatter: function (value, row, index) {
                var e = '<a title="编辑" href="javascript:void(0);" id="houseRentPay"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#myModals" onclick="return edit(\'' + row.id + '\')"><i class="glyphicon glyphicon-pencil" alt="修改" style="color:blue">修改</i></a> ';
                var d = '<a title="删除" href="javascript:void(0);" onclick="del(' + row.id + ',' + row.isActive + ')"><i class="glyphicon glyphicon-trash" alt="删除" style="color:red">删除</i></a> ';
                var p = '<a title="付款" href="javascript:void(0);"  data-toggle="modal" data-id="\\\'\' + row.id + \'\\\'" data-target="#fukuan" onclick="fukuan(' + row.id + ',' +row.firstPay + ',' +row.payCount + ',' +12/parseInt(row.payType) + ',' +row.firstPayTime + ',' +row.payType + ')"><i class="glyphicon glyphicon-euro" alt="付款" style="color:orange">付款</i></a> ';
                var f = '';
                if (row.isActive == 1) {
                    f = '<a title="启用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 0 + ')"><i class="glyphicon glyphicon-ok-sign" style="color:green">启用</i></a> ';
                    return d + f;
                } else if (row.isActive == 0) {
                    f = '<a title="停用" href="javascript:void(0);" onclick="updatestatus(' + row.id + ',' + 1 + ')"><i class="glyphicon glyphicon-remove-sign"  style="color:red">停用</i></a> ';
                    return p+e + d + f;
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
function del(houseRentPayid, status) {
    layer.confirm('确认要删除吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: '/houseRentPay/deleteHouseRentPay/' + houseRentPayid,
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
function  getDate(value) {
    var date = new Date(value);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var ss = date.getSeconds();
    return y + '-' + m + '-' + d;
}
function fd(name) {
    $.post("/contractMaster/findContractMaster/" + name,
        function (data) {
            $("#fdinfo").autofill(data);
        },
        "json"
    );
}
function edit(name) {
    $.post("/houseRentPay/findHouseRentPay/" + name,
        function (data) {
            $("#updateform").autofill(data);
            $("#test_3").val(getdate(data.firstPayTime));
            $("#test_4").val(getdate(data.payPeriodStart));
            $("#updateforms").autofill(data);
        },
        "json"
    );
}
function fukuan(id,money,shengyuqishu,sumqishu,thisTime,payType){
    $("#summoney").html(0);
    var yijingfukuan = parseInt(sumqishu)-parseInt(shengyuqishu);
    var htmls='<div class="form-group">';
    var d = new Date(thisTime);
    var temp = new Date(thisTime);
    var  nowTime = "";
    nowTime = new Date().getTime();
    var times = new Array();
    for(var j=1;j<=parseInt(sumqishu);j++){
        times.push(getdate(d));
        d.setMonth(d.getMonth()+payType);
    }
    var cnt = parseInt(times.length);
    for(var i=1;i<=cnt;i++){
        if(yijingfukuan-i>=0){
            if(getYear(times[i-1])==getYear(nowTime) && getMonth(times[i-1])==getMonth(nowTime)){
                htmls = htmls+'<div class="col-sm-2"><button type="button" id="qishu'+i+'" class="btn btn-danger disabled" style="background-color: dimgray;letter-spacing:4px">本期房租</button></div>';
            }else{
                htmls = htmls+'<div class="col-sm-2"><button type="button" id="qishu'+i+'" class="btn btn-danger disabled" style="background-color: dimgray">'+getdate(times[i-1])+'</button></div>';
            }
        }else {
            if(getYear(times[i-1])==getYear(nowTime) && getMonth(times[i-1])==getMonth(nowTime)){
                htmls = htmls+'<div class="col-sm-2"><button type="button" id="qishu'+i+'" class="btn btn-success button" style="letter-spacing:4px">本期房租</button></div>';
            }else{
                htmls = htmls+'<div class="col-sm-2"><button type="button" id="qishu'+i+'" class="btn btn-success button">'+getdate(times[i-1])+'</button></div>';
            }
        }
        if(i%6==0){
            if(i!=sumqishu){
                htmls = htmls+'</div><div class="form-group">';
            }
        }
    }
    $("#infohtml").html(htmls);
    $(".button").click(function () {
        if ($(this).hasClass("btn-success")) {
            $(this).removeClass("btn-success");
            $(this).addClass("btn-primary");
        } else {
            $(this).removeClass("btn-primary");
            $(this).addClass("btn-success");
        }
        var j = new Array();
        $(".button").each(function(index,element){
            if ($(this).hasClass("btn-primary")) {
                j.push(index+parseInt($("#huankuanqishu").val()));
            }
        });
        $("#ids").val(j);
        $("#summoney").html(parseFloat(money)*j.length);
    });
    $("#firstPay").val(money);
    $("#id").val(id);
    $("#huankuanqishu").val(sumqishu-shengyuqishu);
}
function updatestatus(id, status) {
    $.post("/houseRentPay/updateStatus/" + id + "/" + status,
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
            url: '/houseRentPay/findHouseRentPayList',
            query:{
                createTime:start,
                endTime:end,
                name:$("#bankAccountName").val(),
                phone:$("#phone").val(),
                houseName:$("#houseName").val(),
                payTime:$("#payTime").val(),
                payType:$("#payType").val(),
                description:$("#descriptions").val(),
                isActive:$("#status").val(),
                hotelId:$("#hotel_Ids").val()
            }
        }
    );
    getInfos();
})
function getInfos(){
    var times = $("#test11").val();
    var start,end;
    if(!times){
        start = null;
        end = null;
    }else {
        start = times.substring(0,11)+"00:00:00";
        end = times.substring(13,times.length)+" 23:59:59";
    }
    var hotelId = $("#hotelId_").val();
    $.post(
        "/houseRentPay/findHotelInfo",
        {
            createTime:start,
            endTime:end,
            name:$("#bankAccountName").val(),
            phone:$("#phone").val(),
            houseName:$("#houseName").val(),
            payTime:$("#payTime").val(),
            payType:$("#payType").val(),
            descriptions:$("#descriptions").val(),
            isActive:$("#status").val(),
            hotelId:$("#hotel_Ids").val()
        },
        function (data) {
            $("#houseTotal").html(data.houseTotal==null?0:data.houseTotal);//房源总数
            $("#dfPayMoney").html("￥"+data.dfPayMoney==null?0:data.dfPayMoney);//代付资金
            $("#monthPayMoney").html("￥"+data.monthPayMoney==null?0:data.monthPayMoney);//代付资金
            $("#houseMonthPayMoney").html("￥"+data.houseMonthPayMoney==null?0:data.houseMonthPayMoney);//每间每月
            $("#houseDayPayMoney").html("￥"+data.houseDayPayMoney==null?0:data.houseDayPayMoney);//每间，每天
            $("#chaoqiPayMoney").html("￥"+data.chaoqiPayMoney==null?0:data.chaoqiPayMoney);//超期未付
            $("#fiveDayPayMoney").html("￥"+data.fiveDayPayMoney==null?0:data.fiveDayPayMoney);//近5日待付
            $("#thisMonthPayMoney").html("￥"+data.thisMonthPayMoney==null?0:data.thisMonthPayMoney);//本月应付
            $("#thisMonthPayAll").html("￥"+data.thisMonthPayAll==null?0:data.thisMonthPayAll);//本月已付租金总额
            $("#thisMonthNotPay").html("￥"+data.thisMonthNotPay==null?0:data.thisMonthNotPay);//本月待付
            $("#nextMonthPay").html("￥"+data.nextMonthPay==null?0:data.nextMonthPay);//次月应付
        },
        "json"
    );
}
function refush() {
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
            url: '/houseRentPay/houseRentPayList',
            query: {
                createTime: start,
                endTime: end,
                name: $("#bankAccountName").val(),
                phone: $("#phone").val(),
                houseName: $("#houseName").val(),
                payTime: $("#payTime").val(),
                payType: $("#payType").val(),
                descriptions: $("#descriptions").val(),
                isActive: $("#status").val(),
                hotelId: $("#hotel_Ids").val()
            }
        });
    getInfos();
    getHotelInfo();
}
function chaoqi(temp) {
    $('#mytab').bootstrapTable('refresh',
        {
            url: '/houseRentPay/chaoqiPayList/'+temp
        });
}

$("#update").click(function () {
    $.post(
        "/houseRentPay/houseRentPayUpdateSave",
        $("#updateforms").serialize(),
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
    var ids = new Array();
    ids = $("#ids").val().split(',');
    var first = parseInt(ids[0]);
    var end = parseInt(ids[ids.length-1]);
    var len = ids.length;
    var huankuanqishu = parseInt($("#huankuanqishu").val());
    if(huankuanqishu!=ids[0]){
        layer.alert("请按顺序还款", {icon: 5});
        return;
    }
    if((first+(len-1))!=end){
        layer.alert("不允许跨期还款", {icon: 5});
        return;
    }
    $("#thisPayMoney").val($("#summoney").html())
    $.post(
        "/houseRentPay/huankuan",
        $("#fu_kuan").serialize(),
        function (data) {
            if (data.message.indexOf("成功")>0) {
                layer.alert(data.message, {icon: 6});
                refush();
            } else {
                layer.alert(data.message, {icon:2});
                refush();
            }
            $("#fukuan").modal('hide');
        }, "json"
    );
});
$("#add").click(function () {
    var house_name = $("#house_name").val();
    var total_pay  = $("#total_pay").val();
    if(!house_name){
        layer.alert("房间名称不能为空", {icon:2});
        return;
    }
    if(!total_pay){
        layer.alert("支付总金额不能为空", {icon:2});
        return;
    }
    if(isNaN(total_pay)){
        layer.alert("支付总金额只能为数字", {icon:2});
        return;
    }
    var pay_time  = $("#pay_time").val();
    if(!pay_time){
        layer.alert("签约年限不能为空", {icon:2});
        return;
    }
    var firstPayTime_  = $("#test2").val();
    if(!firstPayTime_){
        layer.alert("首次付款日期不能为空", {icon:2});
        return;
    }
    var payPeriodStart_  = $("#test1").val();
    if(!payPeriodStart_){
        layer.alert("合同开始时间不能为空", {icon:2});
        return;
    }
    for(var j=0;j<parseInt(pay_time);j++){
        if(!($("#count"+(j+1)).val())){
            layer.alert("第"+(j+1)+"年房租不能为空", {icon:2});
            return false;
        }
    }
    $.post(
        "/houseRentPay/houseRentPayAddSave",
        $("#formadd").serialize(),
        function (data) {
            if (data.message == "新增成功!") {
                layer.alert(data.message, {icon: 6});
                refush();
                $("#webAdd").modal('hide');
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
            "/houseRentPay/deleteManyCashSubject",
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
    layer.confirm('确认要执行批量修改房租状态吗？',function(index){
        $.post(
            "/houseRentPay/deleteManyHouseRentPay",
            {
                "manyId":$("#statusId").val(),
                "status":$("#statuss").val()
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

function getdate(value) {
    var date = new Date(value);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    var ss = date.getSeconds();
    return y + '-' + (parseInt(m)<10?"0"+m:m) + '-' + (parseInt(d)<10?"0"+d:d) ;
}
function getMonth(value) {
    var date = new Date(value);
    var m = date.getMonth() + 1;
    return m;
}
function getYear(value) {
    var date = new Date(value);
    var y = date.getFullYear();
    return y;
}