<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div id="fb-root"></div>
<script async defer crossorigin="anonymous"
        src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v15.0&appId=1318249918678037&autoLogAppEvents=1"
        nonce="rnf2yyCd"></script>
<div class="fb-login-button" data-width="" data-size="large" data-button-type="login_with" data-layout="rounded"
     data-auto-logout-link="false" data-use-continue-as="true"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js"></script>
<script>

    window.fbAsyncInit = function () {
        FB.init({
            appId: 1318249918678037,
            autoLogAppEvents: false,
            xfbml: true,
            version: 'v15.0'
        });
    };

    FB.login(res => {
        if (res.authResponse) {
            FB.api('/me', {fields: 'name,email'}, response => {
                let name = response.name;
                let email = response.email;
                console.log("login" + name + " " + email);
                //check xem name email đã có chưa. chưa có thì tạo, bắt nhập pass mới or đ mặc định là email cũng được
            });
        }
    }, {scope: 'email,public_profile'});
</script>
</body>
</html>
