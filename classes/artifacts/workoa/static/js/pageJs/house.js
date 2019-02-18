
//生成用户数据
$('#mytab').bootstrapTable({
    method: 'post',
    contentType: "application/x-www-form-urlencoded",//必须要有！！！！
    url:"/house/houseList",//要请求数据的文件路径
    toolbar: '#toolbar',//指定工具栏
    striped: true, //是否显示行间隔色
    dataField: "res",
    sortable: true, //是否启用排序 sortOrder: "ID asc",
    sortOrder: "ID asc",
    pagination:true,//是否分页
    queryParamsType:'limit',//查询参数组织方式
    queryParams:queryParams,//请求服务器时所传的参数
    sidePagination:'server',//指定服务器端分页
    pageNumber: 1, //初始化加载第一页，默认第一页
    pageSize:10,//单页记录数
    pageList:[10,20,30,40,50,60,70,80,90,100],//分页步进值
    showRefresh:true,//刷新按钮
    showColumns:true,
    clickToSelect: true,//是否启用点击选中行
    toolbarAlign:'right',//工具栏对齐方式
    buttonsAlign:'right',//按钮对齐方式
    toolbar:'#toolbar',search:true,
    uniqueId: "id",                     //每一行的唯一标识，一般为主键列
    showExport: true,
    exportDataType: 'all',
    columns:[
        {
            title:'全选',
            field:'select',
            //复选框
            checkbox:true,
            width:25,
            align:'center',
            valign:'middle'
        },
        {
            title:'房号',
            field:'cardTitle',
            align:'center',
            sortable:true
        },

        {
            title:'房间类型',
            field:'houseTypeVo.title',
            align:'center',
            sortable:true
        }
        ,
        {
            title:'所属酒店',
            field:'hotelVo.title',
            align:'center',
            sortable:true
        }
        ,

        {
            title:'入住状态',
            field:'houseStatus',
            align:'center',
            formatter: function (value, row, index) {
                if(value==1){
                    //表示启用状态
                    return '<span style="color: red">已入住</span>';
                }else{
                    //表示启用状态
                    return '<span style="color: green">未入住</span>';
                }
            }
        }
        ,
        {
            title:'房间类型',
            field:'houseType',
            align:'center',
            formatter: function (value, row, index) {
                if(value==1){
                    //表示启用状态
                    return '<span style="color: red">虚拟房间</span>';
                }else{
                    //表示启用状态
                    return '<span style="color: green">真实房间</span>';
                }
            }
        }
        ,
        {
            title:'所属模式',
            field:'houseTypes',
            align:'center',
            formatter: function (value, row, index) {
                if(value==0){
                    //表示启用状态
                    return '<span style="color: red">分成模式</span>';
                }else if(value==1){
                    //表示启用状态
                    return '<span style="color: green">房租模式</span>';
                }
            }
        },
        {
            title:'房间面积',
            field:'area',
            align:'center',
            formatter: function (value, row, index) {
                //表示启用状态
                return '<span>'+value+'/平米</span>';
            }
        }
        ,
        {
            title:'创建时间',
            field:'createTime',
            align:'center',
            sortable:true,
            formatter : function(value){
                var date = new Date(value);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var h = date.getHours();
                var mi = date.getMinutes();
                var ss = date.getSeconds();
                return y + '-' +m + '-' + d+' '+h+':'+mi+':'+ss ;
            }
        }
        ,
        {
            title:'房间状态',
            field:'isActive',
            align:'center',
            formatter: function (value, row, index) {
                if(value==0){
                    //表示启用状态
                    return '<span style="color: green" >启用</span>';
                }else{
                    //表示启用状态
                    return '<span style="color: red">停用</span>';
                }
            }
        }
        ,
        {
            title:'操作',
            align:'center',
            field:'',
            formatter: function (value, row, index) {
                var e = '<a title="编辑" href="javascript:void(0);" data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#myModal" id="house"   onclick="return edit(\'' + row.id + '\')"><i class="glyphicon glyphicon-pencil" alt="修改" style="color:green">修改</i></a> ';
                var d = '<a title="删除" href="javascript:void(0);" onclick="del('+row.id+','+row.isActive+')"><i class="glyphicon glyphicon-trash" alt="删除" style="color:red">删除</i></a> ';
                var f='';
                if(row.isActive==1){
                    f = '<a title="启用" href="javascript:void(0);" onclick="updatestatus('+row.id+','+0+')"><i class="glyphicon glyphicon-ok-sign" style="color:green">启用</i></a> ';
                }else if(row.isActive==0){
                    f = '<a title="停用" href="javascript:void(0);" onclick="updatestatus('+row.id+','+1+')"><i class="glyphicon glyphicon-remove-sign"  style="color:red">停用</i></a> ';
                }

                return e + d+f;
            }
        }
    ],
    locale:'zh-CN',//中文支持,
    responseHandler:function(res){
        if (res) {
            return {
                "res" : res.rows,
                "total" : res.total
            };
        } else {
            return {
                "rows" : [],
                "total" : 0
            };
        }
    }
})

//请求服务数据时所传参数
function queryParams(params){var title = "";    $(".search input").each(function () {        title=$(this).val();    });
    return{
        //每页多少条数据
        pageSize: this.pageSize,
        //请求第几页
        pageIndex:this.pageNumber,        searchVal:title
    }
}
function del(houseid,status){
    if(status==0){
        layer.msg("删除失败，已经启用的不允许删除!",{icon:2,time:1000});
        return;
    }
    layer.confirm('确认要删除吗？',function(index){
        $.ajax({
            type: 'POST',
            url: '/house/deleteHouse/'+houseid,
            dataType: 'json',
            success: function(data){
                if(data.message=='删除成功!'){
                    layer.alert(data.message, {icon: 6});
                }else{
                    layer.alert(data.message, {icon: 6});
                }
                refush();
            },
            error:function(data) {
                console.log(data.msg);
            },
        });
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
function edit(name){
    $.post("/house/findHouse/"+name,
        function (data) {
            $("#updateform").autofill(data);
            $("#cardTitle_").val(data.cardTitle);
            $("#description").text(data.description);
            var hotel = $("#hotelId").select2();
            hotel.val(data.hotelId).trigger("change");
            hotel.change();
            $("#houseStatus").val(data.houseStatus);
            $("#id").val(data.id);
            $("#ca").val(data.cardTitle);
        },
        "json"
    );
}
function updatestatus(id,status){
    $.post("/house/updateStatus/"+id+"/"+status,
        function(data){
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
$('#search_btn').click(function(){
    $('#mytab').bootstrapTable('refresh', {
        url: '/house/findHouseList',
        query:{
            hotelId:$("#hotelId_").val(),
            type:$("#houseType_").val(),
            isActive:$("#isActive").val(),
            houseType:$("#house__Type").val(),
            cardTitle:$("#title").val()
        }
    });
})
function refush(){
    $('#mytab').bootstrapTable('refresh', {url: '/house/houseList'});
}
$("#update").click(function(){
    $.post(
        "/house/houseUpdateSave",
        $("#updateform").serialize(),
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
$('#add').click(function () {
    var newcard = $("#cardTitle").val();
    if(!newcard){
        layer.alert("房号不能为空", {icon:6});
        return;
    }
    var title = $("#card").text();
    if(title.indexOf(newcard+",")>-1 ){
        layer.msg($("#hotelId").find("option:selected").text()+"的"+newcard+"房号已存在", {icon:2,time:1000});
        return;
    }
    $.post(
        "/house/houseAddSave",
        $("#form").serialize(),
        function(data){
            if(data.message=="新增成功!"){
                layer.alert(data.message, {icon:6});
                $("#webAdd").modal('hide');
                refush();
            }else {
                layer.alert(data.message, {icon:6});
                refush();
            }

        },
        "json"
    );
});
function deleteMany1(){
    var isactivity="";
    var row=$.map($("#mytab").bootstrapTable('getSelections'),function(row){
        if(row.isActive==0){
            isactivity+=row.isActive;
        }
        return row.id ;
    });
    if(row==""){
        layer.msg('删除失败，请勾选数据!', {
            icon : 2,
            time : 2000
        });
        return ;
    }
    if(isactivity!=""){
        layer.msg('删除失败，已经启用的不允许删除!', {
            icon : 2,
            time : 2000
        });
        return;

    }
    $("#deleteId").val(row);
    layer.confirm('确认要执行批量删除网站信息数据吗？',function(index){
        $.post(
            "/house/deleteManyHouse",
            {
                "manyId":$("#deleteId").val()
            },
            function(data){
                if(data.message=="删除成功!"){
                    layer.alert(data.message, {icon:6});
                    refush();
                }else{
                    layer.alert(data.message, {icon:6});
                    refush();
                }
            },"json"
        );
    });
}
$("#update").click(function () {
    var newcard = $("#cardTitle_").val();
    var title = $("#card").text().replace($("#ca").val(),'');
    if(title.indexOf(newcard+",")>-1 ){
        layer.msg($("#hotel_Id").find("option:selected").text()+"的"+newcard+"房号已存在", {icon:2,time:1000});
        return;
    }
    $.post(
        "/house/houseUpdateSave",
        $("#form1").serialize(),
        function(data){
            if(data.message=="修改成功!"){
                layer.alert(data.message, {icon:6});
                $("#myModal").modal('hide');
                refush();
            }else {
                layer.alert(data.message, {icon:6});
                refush();
            }

        },
        "json"
    );
});
$("#updateSta").click(function () {
    var status = $("#status").val();
    var houseTypes = $("#house_typess").val();
    if(!status && !houseTypes){
        layer.alert("条件为空，将不执行", {icon:5});
        return;
    }
    layer.confirm('确认要执行批量修改分店经营状态吗？',function(index){
        $.post(
            "/house/deleteManyHouse",
            {
                "manyId":$("#statusId").val(),
                "status":status,
                "houseTypes":houseTypes
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