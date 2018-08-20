<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body  style="margin: 0">
<table width="100%" height="700" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td width="100%" valign="top" id="ifream">
        </td>
    </tr>
</table>
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
<script type="text/javascript">
    var _config = <%= com.dingding.sso.AuthHelper.getConfig(request) %>;
</script>
<script type="text/javascript" src="/js/zepto.min.js"></script>
<script type="text/javascript" src="https://g.alicdn.com/dingding/dingtalk-pc-api/2.7.0/index.js"></script>
<script type="text/javascript" src="/js/demoPC.js"></script>
</body>
</html>