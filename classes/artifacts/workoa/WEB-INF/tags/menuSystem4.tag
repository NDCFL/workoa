<%@tag pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@tag import="java.util.List"%>
<%@tag import="org.springframework.context.ApplicationContext"%>
<%@tag import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@tag import="com.mossle.api.menu.MenuConnector"%>
<%@tag import="com.mossle.api.menu.MenuDTO"%>
<%@tag import="com.mossle.api.auth.CurrentUserHolder"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%

  ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(application);
  MenuConnector menuConnector = ctx.getBean(MenuConnector.class);
  CurrentUserHolder currentUserHolder = ctx.getBean(CurrentUserHolder.class);
  String icons[] = {"glyphicon glyphicon-user","glyphicon glyphicon-star","glyphicon glyphicon-envelope","glyphicon glyphicon-cloud","glyphicon glyphicon-th-large","glyphicon glyphicon-road","glyphicon glyphicon-play-circle","glyphicon glyphicon-book"};
  jspContext.setAttribute("icons",icons);
  try {
    String userId = currentUserHolder.getUserId();
    // System.out.println("userId : " + userId);
    List<MenuDTO> menuDtos = menuConnector.findSystemMenus(userId);
    for (int i=0;i<menuDtos.size();i++) {
      jspContext.setAttribute("menu", menuDtos.get(i));
%>
<c:forEach items="${menu.children}" var="child" varStatus="idxStatus">
<li class="dropdown ${currentHeader == menu.code ? 'active' : ''}">
    <a class="J_menuItem" href="${tenantPrefix}/${child.url}"><i class="${icons[idxStatus.index]}"></i> <span class="nav-label">${child.title}${child.icon}</span><span
            class="fa arrow"></span></a>
</li>
    </c:forEach>

<%
    }
  } catch(Exception ex) {
    System.out.println(ex);
  }
%>

