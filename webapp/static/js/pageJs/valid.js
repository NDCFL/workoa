$.post("/user/bossInfo/",
    function (data) {
        $("#updateInfo").autofill(data);
    },
    "json"
);
$('#updatePassWord').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        password: {
            message: '旧密码验证失败',
            validators: {
                notEmpty: {
                    message: '旧密码不能为空'
                },
                stringLength: {
                    min: 6,
                    max: 18,
                    message: '密码长度必须在6到18位之间'
                },
                regexp: {
                    regexp: /^[a-zA-Z0-9_]+$/,
                    message: '密码只能包含大写、小写、数字和下划线'
                },
                threshold: 6,
                remote: {
                    url: '/user/checkPwd',
                    message: '旧密码输入错误!',
                    delay: 2000,
                    type: 'POST'
                }

            }
        },
        newpassword: {
            message: '新密码验证失败',
            validators: {
                notEmpty: {
                    message: '新密码不能为空'
                },
                stringLength: {
                    min: 6,
                    max: 18,
                    message: '新密码长度必须在6到18位之间'
                },
                regexp: {
                    regexp: /^[a-zA-Z0-9_]+$/,
                    message: '密码只能包含大写、小写、数字和下划线'
                }

            }
        },
        qnewpassword: {
            message: '确认密码验证失败',
            validators: {
                notEmpty: {
                    message: '确认密码不能为空'
                },
                stringLength: {
                    min: 6,
                    max: 18,
                    message: '确认密码长度必须在6到18位之间'
                },
                regexp: {
                    regexp: /^[a-zA-Z0-9_]+$/,
                    message: '密码只能包含大写、小写、数字和下划线'
                },
                identical: {
                    field: 'newpassword',
                    message: '新密码和确认密码不一致'
                }

            }
        }
    }
}).on('success.form.bv', function(e) {//点击提交之后
    e.preventDefault();
    $.post(
        "/user/updatePassword",
        $("#updatePassWord").serialize(),
        function(data){
            if(data.message.indexOf("成功")>-1){
                alert(data.message+"身份已失效，请重新登录");
                window.location.href="/user/exit";
            }else{
                layer.alert(data.message, {icon: 6});
            }

        },
        "json"
    );
});
$('#updatePhone').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        phone: {
            message: '手机账号验证失败',
            validators: {
                notEmpty: {
                    message: '手机账号不能为空'
                },
                stringLength: {
                    min: 11,
                    max: 11,
                    message: '手机账号长度必须为11位'
                },
                regexp: {
                    regexp: /^1[3|5|8|7]{1}[0-9]{9}$/,
                    message: '请输入正确的手机号码'
                },
                threshold: 10,
                remote: {
                    url: '/user/checkReg',
                    message: '该手机号已被注册',
                    delay: 2000,
                    type: 'POST'
                }
            }
        },
        phonecode: {
            validators: {
                notEmpty: {
                    message: '验证码不能为空!'
                },
                stringLength: {
                    min: 6,
                    max: 6,
                    message: '请输入6位数的验证码'
                }
                // ,
                // threshold: 6,
                // remote: {
                //     url: '${pageContext.request.contextPath}/manager/checkcode',
                //     message: '验证码错误!',
                //     delay: 2000,
                //     type: 'POST'
                // }
            }
        }
    }
}).on('success.form.bv', function(e) {//点击提交之后
    e.preventDefault();
    $.post(
        "/user/changePhone",
        $("#updatePhone").serialize(),
        function(data){
           layer.alert(data.message, {icon: 6});
        },
        "json"
    );
});
$('#updateInfo').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        realname: {
            message: '真实姓名验证失败',
            validators: {
                notEmpty: {
                    message: '真实姓名不能为空'
                },
                stringLength: {
                    min: 2,
                    max: 20,
                    message: '真实姓名长度必须为2-20位'
                }
            }
        },
        identity: {
            message: '身份证号验证失败',
            validators: {
                notEmpty: {
                    message: '身份证号不能为空'
                },
                stringLength: {
                    min: 18,
                    max: 18,
                    message: '身份证号长度必须为18位'
                }
            }
        }
    }
}).on('success.form.bv', function(e) {//点击提交之后
    e.preventDefault();
    var load=layer.load(0, {shade: false});
    $.post(
        "/user/updateBossInfo",
        $("#updateInfo").serialize(),
        function(data){
            layer.close(load);
            layer.alert(data.message, {icon: 6});
        },
        "json"
    );
});
var wait=60;
function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.value="免费获取验证码";
        wait = 60;
    } else {

        o.setAttribute("disabled", true);
        o.value="重新发送(" + wait + ")";
        wait--;
        setTimeout(function() {
                time(o)
            },
            1000)
    }
}
