/**
 * some JavaScript code for this blog theme
 */

/////////////////////////header////////////////////////////
/**
 * clickMenu
 */
(function() {
    if (window.innerWidth <= 770) {
        var menuBtn = document.querySelector('#headerMenu')
        var nav = document.querySelector('#headerNav')
        menuBtn.onclick = function(e) {
            e.stopPropagation()
            if (menuBtn.classList.contains('active')) {
                menuBtn.classList.remove('active')
                nav.classList.remove('nav-show')
            } else {
                nav.classList.add('nav-show')
                menuBtn.classList.add('active')
            }
        }
        document.querySelector('body').addEventListener('click', function() {
            nav.classList.remove('nav-show')
            menuBtn.classList.remove('active')
        })
    }
}());


//////////////////////////back to top////////////////////////////
(function() {
    var backToTop = document.querySelector('.back-to-top');
    var backToTopA = document.querySelector('.back-to-top a');
        // console.log(backToTop);
    window.addEventListener('scroll',function () {
        // 页面顶部滚进去的距离
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

        if (scrollTop > 200) {
            backToTop.classList.add('back-to-top-show');
        } else {
            backToTop.classList.remove('back-to-top-show');
        }
    })

}());

///////////////////////////makisu///////////////////////////////
(function() {
    if ( $.fn.makisu.enabled ) {
        $( '.recent-ul' ).makisu({
            selector: 'dd',
            speed: 0.5,
            overlap: 0.6
        }).makisu('open');
        $( '.category-ul' ).makisu({
            selector: 'dd',
            speed: 0.5,
            overlap: 0.6
        }).makisu('open');
        $( '.recent-ul dt, .category-ul dt' ).on( 'click', function() {
            var $parent = $(this).parent();
            var time = 0.5 * (1 - 0.6) * 1000 * $parent.find('dd').length ;
            if($parent.hasClass('open')){
                $parent.makisu('close');
                setTimeout(function(){
                    $parent.addClass('pull-over');
                }, time);
            }else {
                $parent.removeClass('pull-over');
                setTimeout(function(){
                    $parent.makisu('open');
                }, 400);
            }
        });
    }
}());

///////////////////////////header fixed///////////////////////////////
(function(){
    $(window).scroll(function(){
        if($(window).scrollTop() > 286){
            $('.header-wrapper').addClass('fixed-header');
        }else {
            $('.header-wrapper').removeClass('fixed-header');
        }
   });
}());

//////////////////////////将Content内容转移///////////////////////////
(function moveTOC() {
    if (document.querySelector('#markdown-toc') !== null) {
        var TOCString = document.querySelector('#markdown-toc').innerHTML
        var contentUl = document.querySelector('#content-side')
        contentUl.insertAdjacentHTML('afterbegin', TOCString) //插入字符串
    }
}());

