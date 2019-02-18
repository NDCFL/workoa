var cnt = 0;
function addDiv(){
    cnt++;
    var divHtml = '<div class="form-group" id="fid'+cnt+'">\n' +
        '\t<div class="col-sm-2">\n' +
        ' <input  name="first" minlength="2" id="checkinTime'+cnt+'"  maxlength="20" type="datetime" value="" class="form-control  date form_datetime" placeholder="入住时间" data-date-format="yyyy-mm-dd hh:ii:ss" required="" aria-required="true">\n' +
        '     </div>\n' +
        '     <div class="col-sm-2">\n' +
        '         <input  name="first" minlength="2" style="margin-left:-10px"  id="checkoutTime'+cnt+'"  maxlength="20" type="datetime" value="" class="form-control  date form_datetime" onchange="getDays(this.value,cnt)" placeholder="离店时间" data-date-format="yyyy-mm-dd hh:ii:ss" required="" aria-required="true">\n' +
        '     </div>\n' +
        '     <div class="col-sm-2">\n' +
        '         <input  name="first" minlength="2" style="margin-left:-20px" id="totalDays'+cnt+'" readonly maxlength="20" type="text" value="" class="form-control" required="" aria-required="true">\n' +
        '     </div>\n' +
        '     <div class="col-sm-2">\n' +
        '         <select class="form-control" style="margin-left:-30px" onchange="getHouse(this.value,cnt);" id="houseTypeId'+cnt+'" required name="first">\n' +
        '         </select>\n' +
        '     </div>\n' +
        '     <div class="col-sm-2">\n' +
        '         <select class="form-control" style="margin-left:-40px" onchange="getHousePrice(this.value,cnt);" id="houseId'+cnt+'" required name="first">\n' +
        '         </select>\n' +
        '     </div>\n' +
        '     <div class="col-sm-2">\n' +
        '         <div style="float:left;width:120px">\n'+
        '              <input type="text" class="form-control price"  placeholder="请输入入住房费"  value="0"  style="margin-left:-50px" name="first" id="housePrice" />\n'+
        '         </div>\n'+
        '         <div style="float:right;margin-top: -25px">\n'+
        '              <a onclick="removeDiv(this);" id="remove0"><span style="margin-left: 5px"><i class="glyphicon glyphicon-minus-sign" style="color:red"></i></span></a>\n'+
        '         </div>\n'+
        '     </div>\n' +
        ' </div>';
    $("#ffid").append(divHtml);
    addDivHouse(cnt);
    $(".form_datetime").datetimepicker({
        format: "yyyy-mm-dd hh:ii:ss",
        language: 'zh-CN',
        autoclose: true,
        todayHighlight: true
    });
}
$.post(
    "/customerOrder/getTypeList",
    function(data){
        $("#houseTypeId0").select2({
            data: data
        });
        $("#houseTypeId").select2({
            data: data
        });
        $.post(
            "/customerOrder/getHouse/"+data[0].id,
            function(data1){
                $("#houseId0").select2({
                    data: data1
                });
                $("#house_Id").select2({
                    data: data1
                });
                $("#newHouse").select2({
                    data: data1
                });
                $.post(
                    "/house/findHouse/"+data[0].id,
                    function(data2){
                        $("#houseP0").html(data2.unitPrice);
                        $("#sumMoney").html(parseInt($("#houseP0").html()));
                    },
                    "json"
                );
            },
            "json"
        );
    },
    "json"

);
//支付类型列表
$.post(
    "/customerOrder/getSubject",
    function(data){
        $("#paymentTypeId").select2({
            data: data
        });
        $("#paymentType_Id").select2({
            data: data
        });
        $("#payment_Type_Id").select2({
            data: data
        });
        $("#otherHotelMoneyType").select2({
            data: data
        });
        $("#otherHotelMoneyType1").select2({
            data: data
        });
        $("#otherType").select2({
            data: data
        });

    },
    "json"

);
//支付类型列表
$.post(
    "/item/getSubject",
    function(data){
        $("#serviceSubject").select2({
            data: data
        });
        $("#itemId").select2({
            data: data
        });

    },
    "json"

);
//往来商家列表
$.post(
    "/customerOrder/getOthersHotel",
    function(data){
        $("#othersHotel_id").select2({
            data: data
        });
        $("#othersHotelId").select2({
            data: data
        })
        $("#otherHotel").select2({
            data: data
        })
        $("#other_hotel").select2({
            data: data
        })

    },
    "json"

);
//网站列表
$.post(
    "/customerOrder/getWeb",
    function(data){
        $("#websiteId").select2({
            data: data
        })
        $("#website_Id").select2({
            data: data
        })
    },
    "json"

);
$(".form_datetime").datetimepicker({
    format: "yyyy-mm-dd hh:ii:ss",
    language: 'zh-CN',
    autoclose: true,
    todayHighlight: true
});
function getHouse(id,cnt){
    $.post(
        "/customerOrder/getHouse/"+id,
        function(data){
            if(data==null || data==""){
                $("#houseId"+cnt).html("<option value='-1'>无数据</option>");
                $("#houseP"+cnt).html(0.0);
            }else{
                $("#houseId"+cnt).html("");
                $("#houseId"+cnt).select2({
                    data: data
                });
                $("#house_Id").html("");
                $("#house_Id").select2({
                    data: data
                });

            }
        },
        "json"
    );
}
function getHousePrice(id,cnt){
    if(id==-1){
        layer.msg('房间不存在', {icon:2,time:1000});
    }else{
        $.post(
            "/house/findHouse/"+id,
            function(data){
                var days = $("#totalDays"+cnt).val();
                if(days==""){
                    $("#houseP"+cnt).html(data.unitPrice);
                    var number = "0";
                    for(var i=0;i<=cnt;i++){
                        number+=parseInt($("#houseP"+i).html());
                    }
                    $("#sumMoney").html(parseInt(number));
                }else{
                    $("#houseP"+cnt).html(parseInt(days.substring(0,days.length-1))*parseInt(data.unitPrice));
                    var number = "0";
                    for(var i=0;i<=cnt;i++){
                        number=parseInt(number)+parseInt($("#houseP"+i).html());
                    }
                    $("#sumMoney").html(parseInt(number));
                }

            },
            "json"
        );
    }
}
function getDays(val,cnt) {
    var src = $("#checkinTime"+cnt).val();
    if(src==""){
        layer.msg('入住时间不能为空', {icon:2,time:1000});
        return;
    }else{
        var numberVal = dateDiff(src.substring(0,10),val.substring(0,10));
        if(numberVal<0){
            layer.msg('请正确选择时间', {icon:2,time:1000});
            return;
        }else if(parseInt(numberVal)==0){
            numberVal=1;
        }
        var num = dateDiff(src.substring(0,10),val.substring(0,10))+"天";
        if(num=='0天'){
            num = "1天";
        }
        $("#totalDays"+cnt).val(num);
        $("#houseP"+cnt).html(parseInt($("#houseP"+cnt).html())*numberVal);
        var number = "0";
        for(var i=0;i<=cnt;i++){
            number=parseInt(number)+parseInt($("#houseP"+i).html());
        }
        $("#sumMoney").html(parseInt(number));
    }
}
function getSum(num){
    alert(num);
}
function dateDiff(startDateString, endDateString){
    var separator = "-"; //日期分隔符
    var startDates = startDateString.split(separator);
    var endDates = endDateString.split(separator);
    var startDate = new Date(startDates[0], startDates[1]-1, startDates[2]);
    var endDate = new Date(endDates[0], endDates[1]-1, endDates[2]);
    return parseInt((endDate - startDate ) / 1000 / 60 / 60 /24);//把相差的毫秒数转换为天数
};
function addDivHouse(id){
    $.post(
        "/customerOrder/getTypeList",
        function(data){
            $("#houseTypeId"+id).select2({
                data: data
            });
            $.post(
                "/customerOrder/getHouse/"+data[0].id,
                function(data){
                    $("#houseId"+id).select2({
                        data: data
                    });
                    $.post(
                        "/house/findHouse/"+data[0].id,
                        function(data){
                            $("#houseP"+id).html(data.unitPrice);
                            $("#sumMoney").html(parseInt($("#sumMoney").html())+parseInt($("#houseP"+id).html()));
                        },
                        "json"
                    );
                },
                "json"
            );
        },
        "json"

    );
}
function removeDiv(e){
    $(e).parent().parent().parent().remove();
    var num="0";
    var obj = document.getElementsByName("houseP");
    for(i=0;i<obj.length;i++){
        num = parseInt(num)+parseInt($("#"+obj[i].id).html());
    }
    $("#sumMoney").html(parseInt(num));
}
