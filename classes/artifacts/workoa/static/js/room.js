//日期对应的房间剩余数
function week_day(starDate) {
    $(".date-list-wrap").find('.date-list').html("");
    $(".date-list-wrap").find('.roomcount-list').html();
    for (var i = -3; i <= 29; i++) {
        date3 = new Date(starDate);
        var newDate = new Date();
        date2 = Date.parse(date3) + (i * 24 * 60 * 60 * 1000);
        // 将时间戳转为时间
        newDate.setTime(date2);
        /*backDate1 = newDate.getFullYear();*/
        backDate1 = "";
        if (newDate.getMonth() + 1 < 10) {
            backDate1 = backDate1 + "0" + (newDate.getMonth() + 1);
        } else {
            backDate1 = backDate1 + (newDate.getMonth() + 1);
        }
        if (newDate.getDate() < 10) {
            backDate1 = backDate1 + "-" + ("0" + newDate.getDate())
        } else {
            backDate1 = backDate1 + "-" + (newDate.getDate())
        }
        backDate = backDate1;
        var day = newDate.getDay(); //获取当前星期X(0-6,0代表星期天)
        var today = new Array('日', '一', '二', '三', '四', '五', '六');
        var newday = new Date();
        var today_date = newday.getFullYear()+ "-" +(newday.getMonth() + 1) + "-" + newday.getDate();
        var litoday_date = newDate.getFullYear()+ "-" +(newDate.getMonth() + 1) + "-" + newDate.getDate();
        var week = today[day];
        var _html = '<li data-date="'+newDate.getFullYear()+'-'+(newDate.getMonth() + 1) + "-" + newDate.getDate()+'" data-dateindex="0">';
            _html = _html + '<span class="date">';
            if(today_date == litoday_date){
                _html = _html + '<em class="today">今天</em>'
            }else{
                _html = _html + '<em>' + backDate + '</em>';
            }
            _html = _html + '<em class="ml5">' + week + '</em>';
            _html = _html + '</span>';
            _html = _html + '</li>';
        var _2html = '<li class="room-count">';
            _2html = _2html + '<span>剩' + (i + 1) + '间</span>';
            _2html = _2html + '</li>';
        $(".date-list-wrap").find('.date-list').append(_html);
        $(".date-list-wrap").find('.roomcount-list').append(_2html);
    }
        //alert($(".date-list-wrap").find('.li[data-date='+today_date+']').length)
        //console.log(newday.getFullYear()+ "-" +(newday.getMonth() + 1) + "-" + newday.getDate())
//    alert($(".date-list-wrap").find('.date-list li').length)
}
//时间和时间戳转换
function stringTime_date(date1, lang, date_d) {
    date3 = new Date(date1);
    // 将时间转为时间戳
    var newDate = new Date();
    console.log("newDate:" + newDate)
    date2 = Date.parse(date3) + (lang * 24 * 60 * 60 * 1000);
    // 将时间戳转为时间
    newDate.setTime(date2);
    backDate1 = newDate.getFullYear();
    if (newDate.getMonth() + 1 < 10) {
        backDate1 = backDate1 + "-" + "0" + (newDate.getMonth() + 1);
    } else {
        backDate1 = backDate1 + "-" + (newDate.getMonth() + 1);
    }
    if (newDate.getDate() < 10) {
        backDate1 = backDate1 + "-" + ("0" + newDate.getDate())
    } else {
        backDate1 = backDate1 + "-" + (newDate.getDate())
    }
    backDate = backDate1;
}
//设置初始时间
function nowDate() {
    var nowDate = new Date();
    date1 = nowDate;
    nowDate1 = nowDate.getFullYear();
    if (nowDate.getMonth() + 1 < 10) {
        nowDate1 = nowDate1 + "-" + "0" + (nowDate.getMonth() + 1);
    } else {
        nowDate1 = nowDate1 + "-" + (nowDate.getMonth() + 1);
    }
    if (nowDate.getDate() < 10) {
        nowDate1 = nowDate1 + "-" + ("0" + nowDate.getDate())
    } else {
        nowDate1 = nowDate1 + "-" + (nowDate.getDate());
    }
    nowDate = nowDate1
    console.log(nowDate)
    $("#star_date_input").val(nowDate).attr("data-val", nowDate);
    var _str = nowDate.split("-")
    $("#star_date").text(_str[1] + '-' + _str[2]).attr("data-date", nowDate);
    stringTime_date(date1, 29, "")
    var _str2 = backDate.split("-")
    $("#end_date").text(_str2[1] + '-' + _str2[2]).attr("data-date", backDate);
    $("#star_date_input").val(nowDate);
    //日期对应的房间剩余数量
    week_day(nowDate);
}
//选取时间段
function pickedFunc(dp) {
    $('#star_date').text($dp.cal.getP('M') + "-" + $dp.cal.getP('d')).attr('data-date', dp.cal.getDateStr());
    var date_d = $dp.cal.getP('M') + "-" + $dp.cal.getP('d');
    var date1 = $dp.cal.getP('y') + "-" + $dp.cal.getP('M') + "-" + $dp.cal.getP('d');
    stringTime_date(date1, 29, date_d);
    $("#star_date_input").val(date1).attr("data-val", date1);
    //console.log(date1+"----"+date2+'---'+(newDate.getMonth()+1)+"-"+newDate.getDate());
    var _str = backDate.split("-")
    $("#end_date").text(_str[1] + '-' + _str[2]).attr('data-date', backDate1);
    //日期对应的房间剩余数量
    week_day(date1);
    //console.log($("#star_date_input").val());
    //alert('star_date你选择的日期是:'+dp.cal.getDateStr())
}
//获取鼠标位置
function roomHover(e, t) {
    var endx = e.originalEvent.x || e.originalEvent.layerX || 0;
    var endy = e.originalEvent.y || e.originalEvent.layerY || 0;
    $(".room-hover").css("left", endx + 10 + "px").css("top", endy + 10 + "px");
    timer = setTimeout(function() { $(".room-hover").show(); }, t);
}

$(function() {
    var body_width = $(".q-main").width();
    $(".q-room-detail").width(body_width - 190);
    var body_height = $(document.body).height();
    $(".room-type-wrap").height(body_height - 60)
    $(".room-order-wrap").height(body_height-2)
    //运行初始化日期函数
    nowDate();
    //调用日期控件
    $("#spacing-date").on('click', '#date', function(event) {
        WdatePicker({
            firstDayOfWeek: 1,
            el: 'star_date_input',
            dateFmt: 'yyyy-MM-dd',
            onpicked: pickedFunc //绑定处理日期格式函数
        });
        event.preventDefault();
        /* Act on the event */
    });
    $(".next").on('click', function(event) {
        $(".space-date").each(function(index, el) {
            var date1 = $(this).attr('data-date');
            stringTime_date(date1, 30, "")
            var _str = backDate.split("-")
            //console.log(_str[1]+'-'+_str[2]+'====='+backDate)
            $(this).text(_str[1] + '-' + _str[2]).attr('data-date', backDate);
        });
        //console.log($(".space-date").eq(0).attr("data-date")+"....................")
        $("#star_date_input").val($(".space-date").eq(0).attr("data-date"))
        $("#star_date_input").val($("#star_date").attr("data-date")).attr("data-val", date3.getFullYear() + "-" + (date3.getMonth() + 1) + "-" + date3.getDate());
        //日期对应的房间剩余数量
        week_day($("#star_date").attr("data-date"));
        event.preventDefault();
        /* Act on the event */
    });
    $(".prev").on('click', function(event) {
        $(".space-date").each(function(index, el) {
            var date1 = $(this).attr('data-date');
            stringTime_date(date1, -30, "")
            var _str = backDate1.split("-")
            console.log(_str, _str[1] + '-' + _str[2] + '=====' + "fanhui" + backDate)
            $(this).text(_str[1] + '-' + _str[2]).attr('data-date', backDate);
        });
        //console.log(date3+"....................")
        $("#star_date_input").val($("#star_date").attr("data-date")).attr("data-val", date3.getFullYear() + "-" + (date3.getMonth() + 1) + "-" + date3.getDate());
        //日期对应的房间剩余数量
        week_day($("#star_date").attr("data-date"));
        event.preventDefault();
        /* Act on the event */
    });
    /* 筛选与排序展开，收起 */
    $("#filterSort").on('click', ".filter-sort-head", function(event) {
        $(this).closest("#filterSort").toggleClass('unfold').find('.filter-sort-main').toggleClass('fn-hide fn-show');
        $(this).closest("#filterSort").find('.ranklist-wrap').show();
        event.preventDefault();
    }).on('click', '.search-wrap', function(event) {
        $(this).siblings('.ranklist-wrap').hide();
        event.preventDefault();
        /* Act on the event */
    }).on('click', '.rs-panel-btns .btn-default', function(event) {
        /* 筛选与排序取消操作 */
        $(this).closest("#filterSort").toggleClass('unfold').find('.filter-sort-main').toggleClass('fn-hide fn-show');
        event.preventDefault();
        /* Act on the event */
    }).on('click', '.rs-panel-btns .btn-success', function(event) {
        /* 筛选与排序确认操作 */
        $(this).closest("#filterSort").toggleClass('unfold').find('.filter-sort-main').toggleClass('fn-hide fn-show');
        event.preventDefault();
        /* Act on the event */
    }).on('click', function(event) {
        //阻止事件冒泡
        event.stopPropagation();
        /* Act on the event */
    });;
    $(document).on("click", function() {
        $("#filterSort").closest("#filterSort").removeClass('unfold').find('.filter-sort-main').removeClass('fn-show').addClass('fn-hide');
    });
    //房间详情操作
    $(".j-empty-cell").hover(function() {
        var _height = $(this).closest('#emptyRoomBox').height();
        var li_index = $(this).index();
        var li_width = $(this).width();
        var ul_index = $(this).parent("ul").index();
        var ul_height = $(this).parent("ul").height();
        console.log(ul_index, ul_height)
        $(this).find(".room-info").show();
        $("#fadeLayar").find(".fade-vertical").show().css({
            height: _height,
            left: li_index * li_width
        });
        $("#fadeLayar").find(".fade-horizontal").show().css({
            height: ul_height,
            top: (ul_index - 1) * ul_height
        });
        /* Stuff to do when the mouse enters the element */
    }, function() {
        $("#fadeLayar").find(".fade-vertical").hide();
        $("#fadeLayar").find(".fade-horizontal").hide();
        $(this).find(".room-info").hide();
        /* Stuff to do when the mouse leaves the element */
    });
    //房间详情悬浮窗跟随鼠标操作
    var id_num = 3317259202252814;
    $('.order-cell-' + id_num).mousemove(function(e) {
        var _html = '<div class="smui-tip room-hover js-date-room bottom theme-default" style=" display: none">',
            _html = _html + '<div class="smui-tip-inner date-room">',
            _html = _html + '<div class="hover-row">',
            _html = _html + '<div class="hover-left"><div class="i-icon hover-icon"></div></div>',
            _html = _html + '<div class="hover-right">',
            _html = _html + '<div class="item">',
            _html = _html + '<span class="hover-right悬浮窗跟随鼠标-tel"></span></div></div>',
            _html = _html + '<span class="hover-right-name fn-text-overflow" ms-attr-title="el.customerName">李四</span> &nbsp;',
            _html = _html + '<div class="hover-state hover-state-not">未入住</div>',
            _html = _html + '</div><div class="hover-row">',
            _html = _html + '<div class="hover-left channel-icons"><i class="sanke"></i></div>',
            _html = _html + '<div class="hover-right"><div class="item">',
            _html = _html + '<span>线下客人</span> &nbsp;&nbsp;<span class="label label-danger">到店现付</span>',
            _html = _html + '</div></div></div><div class="hover-row">',
            _html = _html + '<div class="hover-left"><div class="i-icon hover-icon"></div></div>',
            _html = _html + '<div class="hover-right"><div class="item"><span><i>01-18</i>入住，共住<i class="light"><i>1</i>晚</i></span></div></div>',
            _html = _html + '</div><div class="hover-row">',
            _html = _html + '<div class="hover-left"><div class="i-icon hover-icon"></div></div>',
            _html = _html + '<div class="hover-right"><div class="item">',
            _html = _html + '订单总额：<i class="i-icon fn-vab"></i>100.00',
            _html = _html + '<span><span>（</span><span>房费<i class="i-icon fn-vab"></i>100.00<span>）</span></span></span>',
            _html = _html + '</div><div class="item">已收款<i class="i-icon fn-vab"></i>0.00</div>',
            _html = _html + '<div class="item">需补交<span class="color-danger"><i class="i-icon fn-vab"></i>100.00</span></div>',
            _html = _html + '</div></div><div class="hover-row">',
            _html = _html + '<div class="hover-left"><div class="i-icon hover-icon"></div></div>',
            _html = _html + '<div class="hover-right" style="width: 200px">',
            _html = _html + '<div class="item last-item fn-text-overflow"><span>备注：无</span></div>',
            _html = _html + '</div></div></div></div>';
        if ($(".room-hover").length == 0) {
            $("body").append(_html)
        }
        var t = 600;
        roomHover(e, t);
        $('.order-cell-' + id_num).addClass('shadow');
        /* Stuff to do when the mouse enters the element */
    }).mouseleave(function(e) {
        $('.order-cell-' + id_num).removeClass('shadow');
        $(".room-hover").remove()
    });
    //标注为干净房间
    $(".dirty-clean").on('click', function(event) {
        $(this).siblings('.room-state').find('.room-state50').toggleClass('fn-hide');
        event.preventDefault();
        /* Act on the event */
    });
})