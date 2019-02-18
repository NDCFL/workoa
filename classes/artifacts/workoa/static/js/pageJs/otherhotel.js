
//生成用户数据
$('#mytab').bootstrapTable({
    method : 'get', // 服务器数据的请求方式 get or post
    url : "/rentPay/getOtherHotel", // 服务器数据的加载地址
    showRefresh : true,
    showToggle : true,
    showColumns : true,
    iconSize : 'outline',
    toolbar : '#exampleToolbar',
    striped : true, // 设置为true会有隔行变色效果
    dataType : "json", // 服务器返回的数据类型
    pagination : true, // 设置为true会在底部显示分页条
    singleSelect : false, // 设置为true将禁止多选
    pageSize : 10, // 如果设置了分页，每页数据条数
    pageNumber : 1, // 如果设置了分布，首页页码
    search : false, // 是否显示搜索框
    showColumns : false, // 是否显示内容下拉框（选择显示的列）
    sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者
    columns:[
        {
            title:'分店名称',
            field:'title',
            align:'center',
            sortable:true
        }
        ,
        {
            title:'未录入天数',
            field:'title',
            align:'center',
            sortable:true
        }
        ,
        {
            title:'最新录入',
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
            title:'操作',
            align:'center',
            field:'',
            formatter: function (value, row, index) {
                var e = '<a title="录入" href="javascript:void(0);" id="hotel"  data-toggle="modal" data-id="\'' + row.id + '\'" data-target="#myModal" onclick="return edit(\'' + row.id + '\')"><i class="glyphicon glyphicon-pencil" alt="修改" style="color:green">修改</i></a> ';
                return e;
            }
        }
    ],
    locale:'zh-CN'
})

function del(hotelid,status){
    if(status==0){
        layer.msg("删除失败，已经启用的不允许删除!",{icon:2,time:1000});
        return;
    }
    layer.confirm('确认要删除吗？',function(index){
        $.ajax({
            type: 'POST',
            url: '/hotel/deleteHotel/'+hotelid,
            dataType: 'json',
            success: function(data){
                if(data.message=='删除成功!'){
                    layer.alert(data.message, {icon: 6});
                }else{
                    layer.alert("抱歉，当前分店有关联数据无法删除，请先情况改分店下所有数据后在删除",{icon:5});
                }
                refush();
            },
            error:function(data) {
                console.log(data.msg);
            },
        });
    });
}
function edit(name){
    $.post("/hotel/findHotel/"+name,
        function(data){
            $("#updateform").autofill(data);
            $("#province2").val(data.provice);
            $("#province2").trigger("change");
            $("#city2").val(data.city);
            $("#city2").trigger("change");
            $("#district2").val(data.town);
            var colum1 = $("#landlordId").select2();
            //选中某一行
            colum1.val(data.userVo.id).trigger("change");
            colum1.change();
            $("#select2-landlordId-container").remove();
        },
        "json"
    );
}
function updatestatus(id,status){
    $.post("/hotel/updateStatus/"+id+"/"+status,
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
    var times = $("#test1").val();
    $('#mytab').bootstrapTable(
        'refresh',
        {
            url: '/hotel/findList',
            query:{
                tel:$("#hotelTel").val(),
                createTime:times.substring(0,19),
                endTime:times.substring(21,times.length),
                title:$("#hotelTitle").val(),
                hotelManagerId:$("#landlordid_").val(),
                isActive:$("#hotelStatus").val()
            }
        }
    );
})
function refush(){
    $('#mytab').bootstrapTable('refresh', {url: '/hotel/hotelList'});
}
$("#update").click(function(){
    $.post(
        "/hotel/hotelUpdateSave",
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
$("#add").click(function(){
    $.post(
        "/hotel/hotelAddSave",
        $("#formadd").serialize(),
        function(data){
            if(data.message=="新增成功!"){
                alert("新增成功!");
                refush();
            }else{
                alert("新增失败，名称不能重复!");
                refush();
            }
        },"json"
    );
});
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
    layer.confirm('确认要执行批量修改分店经营状态吗？',function(index){
        $.post(
            "/hotel/deleteManyHotel",
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



