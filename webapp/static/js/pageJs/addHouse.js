
$.post(
    "/house/getTypeList",
    function(data){
        $("#type").select2({
            data: data,
            placeholder:'请选择房间类型',
            allowClear:false
        })
        $.post(
            "/houseType/findHouseType/"+data[0].id,
            function(data){
                $("#description").text(data.description);
            },
            "json"
        );
    },
    "json"
);
$.post(
    "/house/getHotelList",
    function(data){
        $("#hotelId").select2({
            data: data,
            placeholder:'请选择所属酒店',
            allowClear:false
        })
        var text = data[0].text;
        $.post(
            "/house/getHouseCardTitle/"+data[0].id,
            function(data) {
                if (data.cardTitle == null || data.cardTitle == "") {
                    $("#card_title").html(text + "酒店还没有添加房号");
                    $("#card_title").css("color", "red");
                } else {
                    $("#card_title").html(text + "酒店现已有如下房号，请不要重复房号:" + data.cardTitle);
                    $("#card_title").css("color", "red");
                }
            },
            "json"
        );
    },
    "json"
);
$.post(
    "/house/getUserList",
    function(data){
        $("#shopManagerId").select2({
            data: data,
            placeholder:'请选择酒店店长',
            allowClear:false
        })
        $("#shopAgentId").select2({
            data: data,
            placeholder:'请选择酒店代理店长',
            allowClear:false
        })
    },
    "json"
);
function getInfo(id){
    $.post(
        "/houseType/findHouseType/"+id,
        function(data){
            $("#description").text(data.description);
        },
        "json"
    );
}
function getShopManager(id){
    var shopAgent = $("#shopAgentId").select2();
    //选中某一行
    shopAgent.val(id).trigger("change");
    //刷新列表
    shopAgent.change();
}
function getCardTitle(val) {
    $.post(
        "/house/getHouseCardTitle/"+val,
        function(data){
            if(data.cardTitle==null || data.cardTitle==""){
                $("#card_title").html($("#hotelId").find("option:selected").text()+"酒店还没有添加房号");
                $("#card_title").css("color","red");
            }else{
                $("#card_title").html($("#hotelId").find("option:selected").text()+"酒店现已有如下房号，请不要重复房号:"+data.cardTitle);
                $("#card_title").css("color","red");
            }

        },
        "json"
    );
}
$('#form').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        cardTitle: {
            message: '房号验证失败',
            validators: {
                notEmpty: {
                    message: '房号不能为空'
                }
            }
        },
        area: {
            message: '房间面积验证失败',
            validators: {
                notEmpty: {
                    message: '房间面积不能为空'
                }
            }
        },
        unitPrice: {
            message: '房间单价验证失败',
            validators: {
                notEmpty: {
                    message: '房间单价不能为空'
                }
            }
        },
        salePrice: {
            message: '房间促销价验证失败',
            validators: {
                notEmpty: {
                    message: '房间促销价不能为空'
                }
            }
        }
    }
}).on('success.form.bv', function(e) {//点击提交之后
    e.preventDefault();
    var oldcard = new Array();
    var newcard = new Array();
    var title = $("#card_title").text();
    var title1=title.substring((title.indexOf(":")+1),title.length);
    oldcard = title1.split(",");
    newcard = $("#cardTitle").val().split(",");
    for(var i=0;i<oldcard.length;i++){
        for(var j=0;j<newcard.length;j++){
            if(oldcard[i]==newcard[j]){
                layer.msg($("#hotelId").find("option:selected").text()+"的"+newcard[j]+"房号已存在", {icon:2,time:1000});
                return;
            }
        }
    }
    $.post(
        "/house/houseAddSave",
        $("#form").serialize(),
        function(data){
            if(data.message=="新增成功!"){
                layer.alert(data.message, {icon:6});
                location.href="/house/housePage";
            }else {
                layer.alert(data.message, {icon:6});
            }

        },
        "json"
    );
});
$('#form').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        cardTitle: {
            message: '房号验证失败',
            validators: {
                notEmpty: {
                    message: '房号不能为空'
                }
            }
        },
        area: {
            message: '房间面积验证失败',
            validators: {
                notEmpty: {
                    message: '房间面积不能为空'
                }
            }
        },
        unitPrice: {
            message: '房间单价验证失败',
            validators: {
                notEmpty: {
                    message: '房间单价不能为空'
                }
            }
        },
        salePrice: {
            message: '房间促销价验证失败',
            validators: {
                notEmpty: {
                    message: '房间促销价不能为空'
                }
            }
        }
    }
}).on('success.form.bv', function(e) {//点击提交之后
    e.preventDefault();
    var oldcard = new Array();
    var newcard = new Array();
    var title = $("#card_title").text();
    var title1=title.substring((title.indexOf(":")+1),title.length);
    oldcard = title1.split(",");
    newcard = $("#cardTitle").val().split(",");
    for(var i=0;i<oldcard.length;i++){
        for(var j=0;j<newcard.length;j++){
            if(oldcard[i]==newcard[j]){
                if(newcard==$("#ca").val()){
                    continue;
                }else{
                    layer.msg($("#hotelId").find("option:selected").text()+"的"+newcard[j]+"房号已存在", {icon:2,time:1000});
                    return;
                }


            }
        }
    }
    $.post(
        "/house/houseUpdateSave",
        $("#form").serialize(),
        function(data){
            if(data.message=="修改成功!"){
                layer.alert(data.message, {icon:6});
                location.href="/house/housePage";
            }else {
                layer.alert(data.message, {icon:6});
            }

        },
        "json"
    );
});