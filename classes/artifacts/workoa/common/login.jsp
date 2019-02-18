<%@page contentType="text/html;charset=UTF-8" %>
<%@include file="/common/taglibs.jsp" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <%@include file="/common/meta.jsp" %>
    <title><spring:message code="core.login.title" text="登录"/></title>
    <link href="/static/css/bootstrap.min.css" rel="stylesheet">
    <link href="/static/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="/static/css/animate.min.css" rel="stylesheet">
    <link href="/static/css/style.min.css" rel="stylesheet">
    <link href="/static/css/login.min.css" rel="stylesheet">
    <%@include file="/common/s3.jsp"%>
    <!--[if lt IE 8]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->
    <script>
        if(window.top!==window.self){window.top.location=window.location};
    </script>
    <script type="text/javascript">
        $(function () {
            focusTenant();
        });

        function focusTenant() {
            if (document.f.tenant.value == '') {
                document.f.tenant.focus();
            } else {
                focusUsername();
            }
        }

        function focusUsername() {
            if (document.f.j_username.value == '') {
                document.f.j_username.focus();
            } else {
                document.f.j_password.focus();
            }
        }
    </script>
</head>

<body class="signin">
    <div class="signinpanel">
        <div class="row">
            <div class="col-sm-7">
                <div class="signin-info">
                    <div class="logopanel m-b">
                        <h1>OA</h1>
                    </div>
                    <div class="m-b"></div>
                    <h4>欢迎使用 <strong>OA后端管理框架</strong></h4>
                    <ul class="m-b">
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 业务支撑: IT, PIM, HR, 行政, Project</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 平台运营: CMS, BPM, Report, IM</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 中间件: Session, RPC, Cache, MQ</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 通用工具: IOC, AOP, MVC, ORM</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 基础设施: Linux, VM, Apache, JDK</li>
                    </ul>
                    <strong>还没有账号？ <a href="#">立即注册&raquo;</a></strong>
                </div>
            </div>
            <div class="col-sm-5">
                <form id="userForm" name="f" method="post" action="${tenantPrefix}/j_spring_security_check">
                    <p class="m-t-md">OA后端管理系统登录</p>
                <input type="hidden"  value="${tenantPrefix}">
                <input type='hidden' id="tenant" name='tenant' class="form-control"
                       value="${empty sessionScope['SECURITY_LAST_TENANT'] ? cookie['SECURITY_LAST_TENANT'].value : sessionScope['SECURITY_LAST_TENANT']}">
                <input type='text' id="username" name='j_username' class="form-control uname"
                       value="${empty sessionScope['SECURITY_LAST_USERNAME'] ? cookie['SECURITY_LAST_USERNAME'].value : sessionScope['SECURITY_LAST_USERNAME']}"
                       aria-describedby="inputSuccess3Status">
                <input type='password' id="password" name='j_password' class="form-control pword m-b" value=''>
                    <a href="">忘记密码了？</a>
                    <<input type="submit" class="btn btn-success btn-block">登录</inp>
                </form>
            </div>
        </div>
        <div class="signup-footer">
            <div class="pull-left">
                &copy; 2019 cflworkoa
            </div>
        </div>
    </div>
</body>

</html>