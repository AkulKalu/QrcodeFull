require('./axios');

if(document.getElementById('ControlPanel')) {
    require('./components/Layout/ControlPanel');
}else {
    require('./bootstrap');
    require('./components/MainPage/Cards');
    require('./components/Visual/logo');
}


