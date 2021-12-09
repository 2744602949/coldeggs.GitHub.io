/********************************

 * 电脑壁纸网站

 * 孟坤网页实验室（http://lab.mkblog.cn）出品

 * ver 1.2

 * !!盗版必究!!

 ********************************/

var seting = {

    apiUrl: "api/",      // api地址

    ratio: 0.618,        // 图片宽高比

    types: '360new',     // 加载壁纸的种类

    downApi: 'https://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=' // 用于下载图片的api地址

};

var jigsaw = {

    count: 0,            // 已加载的总数

    halfHtml: '',        // 最后一个加载的html

    loadBig: false,      // 是否已加载最大的那个

    ajaxing: false        //是否正在ajax加载

};

// 大小改变

window.onresize = function () {

    resizeHeight();

};

// 初始化

window.onload = function () {

    ajax360Tags();

    loadData(seting.types, true);   // 初始加载壁纸

    resizeHeight();

};

// // ajax加载时模糊化

// $(document).ajaxStart(function () {

//     $('html').addClass("blur"); 

// });

// $(document).ajaxStop(function () {

//     $("html").removeClass("blur");

// });

$(function () {

    

    // 监听滚动消息

    $(window).scroll(function () {

        if ($(this).scrollTop() + $(window).height() + 20 >= $(document).height() && $(this).scrollTop() > 20) {

            loadData(seting.types, false);

        }

        if(seting.types != 'bing' && seting.types != 'ciba'){

            if($(window).scrollTop() >= 300){ 

                $('#toolBall').fadeIn(400); 

            }else{ 

                $('#toolBall').fadeOut(200);

            } 

        }

    });

    $("#toolBall").click(function() {

        if(seting.types == 'bing' || seting.types == 'ciba') {

            return true;

        }

        $("html, body").animate({scrollTop:0}, "normal"); 

        return false;

    });

    

    // 点击关闭弹出层

    $("body").on("click","#full-img", function() {

        $("#full-img").remove();

    });

    

    // 点击小图显示大图

    $("#walBox").on("click","img", function() {

        // var imgWidth = parseInt(screen.width / 2),

        // imgHeight = parseInt(imgWidth * seting.ratio);

        // showImg(decode360Url($(this).data('realurl'), imgWidth, imgHeight, 100));

        showImg($(this).data('realurl'));

    });

});

// 加载壁纸容器中的壁纸

function loadData(types, newload) {

    if(types != seting.types || newload === true)

    {

        seting.types = types;

        jigsaw = {

            count: 0,            // 已加载的总数

            halfHtml: '',        // 最后一个加载的html

            loadBig: false,      // 是否已加载最大的那个

            ajaxing: false        //是否正在ajax加载

        };

        $("#walBox").html('');

        $(document).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');    // 解除全屏滚动的绑定

        $(".onepage-pagination").remove();

        $("body").removeClass();

        $(".jigsaw").removeAttr("style"); 

        $("#toolBall").attr('href', 'javascript:void(0);');

        $("#toolBall").attr('class', 'uptoTop');

        $("#toolBall").attr('title', '返回顶部');

        $("#toolBall").hide();

    }

    

    switch (seting.types)

    {

        case 'bing':    //加载必应壁纸

            ajaxBingWal(-1, 8);

            ajaxBingWal(7, 8);

            $("#toolBall").show();

            $("#toolBall").attr('class', 'downBing');

            $("#toolBall").attr('title', '下载这张图片');

        break;

        

        case 'ciba':    // 加载金山词霸每日一句壁纸

            if(newload === false) return;

            ajaxCiba(1);

            $("#toolBall").show();

            $("#toolBall").attr('class', 'downBing');

            $("#toolBall").attr('title', '下载这张图片');

        break;

        

        default:    // 加载来自360的壁纸

            ajax360Wal(seting.types, jigsaw.count, 30);

    } 

}

resizeHeight();

// 重新调整高度 TODO: 完全可以纯 css 实现……

function resizeHeight() {

    switch (seting.types)

    {

        default:

            var newHeight = $("#walBox").width() * (seting.ratio / 2);    // parseInt($(".jigsaw .half").css('width'))

            $(".jigsaw .item").css('height', newHeight);

            $(".jigsaw .Hhalf").css('height', newHeight/2);

    }

    return true;

}

// 显示一张拼图壁纸

function addJigsaw(img, alt) {

    var newHtml;    // 新增的内容

    var imgWidth,imgHeight;

    jigsaw.count++;    // 已加载壁纸数自加

    

    if(jigsaw.halfHtml !== '')    //  1/4 的壁纸，已加载完上面一半，接着加载下面那半

    {

        imgWidth = parseInt(screen.width / 4);

        imgHeight = parseInt(imgWidth * seting.ratio);

            

        newHtml = '    <div class="Hhalf oneImg" onmouseover="hoverJigsaw(this)">'

                + '        <img data-original="' + decode360Url(img, imgWidth, imgHeight, 0) + '" alt="' + alt + '" title="关键字：' + alt + '" data-realurl="' + img + '">'

                + '    </div>'

                + '</div>';

        contAdd(jigsaw.halfHtml + newHtml);    //往容器中加入内容

        jigsaw.halfHtml = '';    // 另外半边加载完成

        return true;    // 函数功能已完成

    }

    

    if(((jigsaw.count-1) % 5) === 0){jigsaw.loadBig = false;}    // 新的一行，状态重置

    

    if((jigsaw.loadBig === false) && ( (Math.floor(Math.random()*3) === 0) || ((jigsaw.count % 5) === 0) ))    // 随机加载大张壁纸

    {

        imgWidth = parseInt(screen.width / 2);

        imgHeight = parseInt(imgWidth * seti
