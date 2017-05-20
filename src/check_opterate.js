function initOperationCheck() {
    var moving = true;
    var count = 0;
    var timer = window.setInterval(function() {
        if (moving) {
            count = 0;
            moving = false;
        } else {
            console.log(count);
            if(++count > 20) {
                window.clearInterval(timer);
                logout();
            }
        }
    },500);
    window.addEventListener('mousemove', function() {
        moving = true;
    }, true);
    function logout() {
        sessionStorage.clear();
        message.error('logout');
        location.href = '/login.html';
    }
};
initOperationCheck();