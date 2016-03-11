/**
 * 페이지 준비 방법
 */
$(document).ready(function() {

    categoryDisplay();
    generateContent();
    backToTop();
});

/**
 * load로딩 완료 트리거 페이지 이후에있어서,
 * {fixFooterInit();} 고정 바닥 글 바
 */
/*$(window).load(function() {
    fixFooterInit();
});*/


/**
 * 초기화 방법은 고정 하단 바
 * 처음에는 페이지가로드, 사용할 때 fixFooter () 메소드는 아래 줄을 고정.
 * 브라우저 창의 크기를 변경 여전히 고정되어 하단 바
 * @return {[type]} [description]
 */
function fixFooterInit() {
    var footerHeight = $('footer').outerHeight();
    var footerMarginTop = getFooterMarginTop() - 0; //형식 변환
    // var footerMarginTop = 80;

    fixFooter(footerHeight, footerMarginTop); //fix footer at the beginning

    $(window).resize(function() { //when resize window, footer can auto get the postion
        fixFooter(footerHeight, footerMarginTop);
    });

    /*    $('body').click(function() {
        fixFooter(footerHeight, footerMarginTop);
    });*/


}

/**
 * 고정 하단 바
 * @param  {number} footerHeight    하단 바의 높이
 * @param  {number} footerMarginTop 하단 바 MarginTop
 * @return {[type]}                 [description]
 */
function fixFooter(footerHeight, footerMarginTop) {
    var windowHeight = $(window).height();
    var contentHeight = $('body>.container').outerHeight() + $('body>.container').offset().top + footerHeight + footerMarginTop;
    // console.log("window---"+windowHeight);
    // console.log("$('body>.container').outerHeight()---"+$('body>.container').outerHeight() );
    // console.log("$('body>.container').height()---"+$('body>.container').height() );
    // console.log("$('#main').height()--------"+$('#main').height());
    // console.log("$('body').height()--------"+$('body').height());
    //console.log("$('#main').html()--------"+$('#main').html());
    // console.log("$('body>.container').offset().top----"+$('body>.container').offset().top);
    // console.log("footerHeight---"+footerHeight);
    // console.log("footerMarginTop---"+footerMarginTop);
    console.log(contentHeight);
    if (contentHeight < windowHeight) {
        $('footer').addClass('navbar-fixed-bottom');
    } else {
        $('footer').removeClass('navbar-fixed-bottom');
    }

    $('footer').show(400);
}

/**
 * 마지막 줄에서 얻은 정규 표현식을 사용하여 MarginTop
 * @return {string} 하단 바 MarginTop
 */
function getFooterMarginTop() {
    var margintop = $('footer').css('marginTop');
    var patt = new RegExp("[0-9]*");
    var re = patt.exec(margintop);
    // console.log(re[0]);
    return re[0];
}

/**
 * 분류 된 전시
 * 분류 화면의 오른쪽을 클릭
 * 확장 또는 관련 분열 축소의 왼쪽
 * @return {[type]} [description]
 */
function categoryDisplay() {
    /*only show All*/
    $('.panel-body>div[post-cate!=All]').hide();
    /*show category when click categories list*/
    $('.categories-list-item2').click(function() {
        var cate = $(this).attr('cate'); //get category's name

        $('.panel-body>div[post-cate!=' + cate + ']').hide(250);
        $('.panel-body>div[post-cate=' + cate + ']').show(400);
    });
}

/**
 * 위로 가기
 */
function backToTop() {
    //톱 페이지 만 표시로 롤백
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $("#top").fadeIn(500);
        } else {
            $("#top").fadeOut(500);
        }
    });
    //위로 가기 클릭
    $("#top").click(function() {
        $("body").animate({
            scrollTop: "0"
        }, 500);
    });

    //초기화 팁
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });
}


/**
 * 사이드 디렉토리
 */
function generateContent() {

    // console.log($('#markdown-toc').html());
    if (typeof $('#markdown-toc').html() === 'undefined') {
        // $('#content .content-text').html('<ul><li>텍스트 짧은, 어떤 디렉토리 없다</li></ul>');
        $('#content').hide();
        $('#myArticle').removeClass('col-sm-9').addClass('col-sm-12');
    } else {
        $('#content .content-text').html('<ul>' + $('#markdown-toc').html() + '</ul>');
        /*   //데이터로드 플러스 사이드 고정되면
        $('#myAffix').attr({
            'data-spy': 'affix',
            'data-offset': '50'
        });*/
    }
    console.log("myAffix!!!");
}