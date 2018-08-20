<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
    <script type="text/javascript">
        var _config = <%= com.dingding.sso.AuthHelper.getConfig(request) %>;
    </script>
    <script>
        var ua = navigator.userAgent;
        var US = {
            Android:function () {   //安卓
                return ua.match(/Android/i)?true:false;
            },
            BlackBerry:function() {  //黑莓
                return ua.match(/BlackBerry/i)?true:false;
            },
            IOS:function(){  //IOS
                return ua.match(/iPhone|iPad|iPod/i)?true:false;
            },
            //这个其实没啥必要了,可以不用判断这个,毕竟IE是一种古老的东西
            Windows:function() {
                return ua.match(/IEMobile/i)?true:false;
            },
            isMobile:function() {  //移动设备
                return US.Android()||US.BlackBerry()||US.IOS()||US.Windows();
            }
        }
        if(US.isMobile()==false){
            window.location = "/indexPC.jsp";     //如果是电脑访问 ,则跳入指定网址。在此以百度为例
        }
    </script>
</head>
<body style="margin: 0">
<table width="100%" height="2000" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td width="100%" valign="top" id="ifream">
        </td>
    </tr>
</table>
<script type="text/javascript" src="js/zepto.min.js"></script>
<script type="text/javascript" src="http://g.alicdn.com/dingding/open-develop/1.6.9/dingtalk.js"></script>
<script type="text/javascript" src="js/demo.js"></script>
</body>
</html>