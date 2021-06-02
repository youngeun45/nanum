//btn_scroll
var $cont,$contPt;

$(document).ready(function(){
	$cont = $('#container');
	if($cont.length > 0){
		$contPt = parseInt($cont.css('padding-top'));
		$(window).resize(function(){
			$contPt = parseInt($cont.css('padding-top'));
		})
	}else{
		$contPt = 0;
	}
	commonUi();
	scrollItem();
	popupUI();
	
	pageScroll();
})


function commonUi(){
	var	$window = $(window),		
		$header = $('#header');
	
	//섬네일 갤러리 마우스 오버
	var $blue_screen_item = $('#question li');
	
	$('#question li > div').hover(function(){
		$blue_screen_item.removeClass('on');
		$(this).parent('li').addClass('on');
	},function(){
		$blue_screen_item.removeClass('on');
	})

	

//gnb click -> section 이동
	$('.btn_scroll').click(function(e){
		e.preventDefault();
		var $speed = 500,
			$href = $(this).attr('href'),
			$id = $($href);
		if($id.length > 0 && $id.is(':visible')){
			var $top = $id.offset().top;
			$(window).scrollTo($top-$contPt,$speed);
		}
	})
$('.wishDeli_plus').on('click',function(e){
		e.preventDefault();
		var $new = '<li class="wishDeli">';
			$new += ' <label>';
			$new += ' <input type="text" name="" id="" class="input full" placeholder="희망배송지역">';
			$new += ' <a href="#" class=""wishDeli_minus><i class="fa fa-minus" aria-hidden="true"></i></a>';
			$new += ' </label>';
			$new += ' </li>';
	
		$(this).closest('ul').append($new)
	})

}
//스크롤시 애니메이션
function scrollItem(){ 
	var $elements = $( '*[data-animation]' );
	var h = $(window).height()
	$elements.each( function( i, el ) {
		var $el = $( el ),
		    animationClass = $el.data('animation'),
		    $delay = $el.data('delay'),
		    $duration = $el.data('duration');
		
		if($delay>0){
			$el.css({
				'-webkit-animation-delay':$delay+'s',
				'animation-delay':$delay+'s'
			})
		}
		if($duration>0){
			$el.css({
				'-webkit-animation-duration':$duration+'s',
				'animation-duration':$duration+'s'
			})
		}
		$el.addClass( animationClass );
		$el.addClass('animated');
		var t = $el.offset().top;
		if(t > h){
			$el.addClass('wait-animation');
		}
		$el.one('inview', function(){
			if($el.hasClass('wait-animation')){
				$el.removeClass('wait-animation');
			}
		});
	});
}

//팝업 띄우기
function popOpen(tar){
	var $speed = 300,
		$ease = 'easeOutQuart',
		$pop = $(tar).find('.popup');
	var $wrapH,$popH,$mT

	$('body').addClass('hidden');
	$(tar).fadeIn($speed);
	popPositin(tar)
	$(window).resize(function(){
		popPositin(tar)
	})
}

function popPositin(tar,speed){
	//console.log($(tar).attr('id'))
	var $wrapH = $(tar).height(),
		$pop = $(tar).find('.popup'),
		$popH = $pop.outerHeight(),
		$mT = Math.max(0,($wrapH-$popH)/2);
	
	$pop.css({'margin-top':$mT});
}

function popupUI(){
	$('.pop_open').click(function(e) {
		e.preventDefault();
		var pop = $(this).attr('href');
		popOpen(pop);
	});
	$('.pop_close').click(function(e) {
		e.preventDefault();
		var pop = $(this).closest('.pop_wrap');
		pop_close(pop);
	});
}
function pop_close(tar) {	
	$('body').removeClass('hidden');
	$(tar).fadeOut(300,function(){
		$(tar).find('.popup').removeAttr('style')
	})
}

//사이즈감지
$(window).on("load resize",function(){
  var body = $("body") 
  var winw = $(window).width();
  if(winw >= 1024){
    body.attr("class","");
    body.addClass("pc");
    }else if(winw>=640 && winw < 1024){
    body.attr("class","");
    body.addClass("tablet");
  }else{
    body.attr("class","");
    body.addClass("mobile");
 }
});

function pageScroll(){
	$(window).bind('load resize scroll',function(){
		var winw = $(window).width();
		var gnb = $('.gnb_wrap');
		
		//GNB 기본값 설정
		gnb.css('top',0);
		gnb.removeClass('fixed');	
		//PC버젼 GNB 클릭시 스크롤 이동 및 GNB HOVER 효과
    	var $scrollTopPc = $(this).scrollTop() + gnb.height() + 132;
    	var $scrollTopM = $(this).scrollTop() + gnb.height() ;
    	$(".section").each(function() {
			var el = $(this),
			idName = el.attr("id");
			if (el.offset().top < $scrollTopPc ) {
				$('#gnb li a').removeClass('on')
				$('#gnb li a[href=\'#'+ idName + '\']').addClass('on')
			}
		});
		// PC 아닐시 GNB 이동, 스크롤이동, HOVER 효과
		if(winw <= 1016){
			var myHeight = $('#intro').height() + gnb.height() ;
			gnb.css('top',myHeight);
			if($(this).scrollTop() > myHeight){
				gnb.addClass("fixed")
			}else{
				gnb.removeClass("fixed")
			};
			$(".section").each(function() {
				var el = $(this),
				idName = el.attr("id");
				if (el.offset().top < $scrollTopM ) {
					$('#gnb li a').removeClass('on')
					$('#gnb li a[href=\'#'+ idName + '\']').addClass('on')
				}
			});
		}		
	});
	
}
$(function(){
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		slidesPerView: 5,
		slidesPerColumn: 2,
		paginationClickable: true
	});

	$(window).on('load resize',function(){
		var $winW = $(this).width();
		
		if($winW > 740){
			swiper.disableTouchControl();
		}else{
			swiper.enableTouchControl();
		}
	})
});




