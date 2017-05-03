$(function() {

	$("#my-menu").mmenu({
		extensions: ['widescreen','theme-black', 'effect-menu-slide', 'pagedim-black'],
		navbar: {
			title: '<img src="img/logo-1.svg" alt="Салон">'
		},
		offCanvas: {
			position: 'right'
		}
	});

	var api = $('#my-menu').data('mmenu');
	api.bind('opend', function(){
		$('.hamburger').addClass('is-active');
	}).bind('closed', function(){
		$('.hamburger').removeClass('is-active')
	});

	//карусель
	$('.carousel-services').on("initialized.owl.carousel", function(){
		setTimeout(function(){
		carouselService();
		}, 100);
	});
	$('.carousel-services').owlCarousel({
		loop: true, //включение повторения
		nav: true, //включение кнопок навигации
		dots: false, //Отключение точек
		smartSpeed: 700, //скорость листания
		navText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'], //стрелки для навигации
		responsiveClass: true, // добавляем адаптивность
		//настройка адаптивности для различных разрешений
		responsive: {
			0: {
				items: 1
			},
			800: {
				items: 2
			},
			1100: {
				items: 3
			}
		}
	});

	//вычисление высоты картинки
	function carouselService(){
		$(".carousel-services-item").each(function(){
			var ths = $(this);
			var thsh = ths.find(".carousel-services-content").outerHeight();
			ths.find(".carousel-services-image").css("min-height", thsh);
		});
	}carouselService();

//помещение последнего слова в заголовке h3 в span
$(".carousel-services-composition .h3").each(function(){
	var ths = $(this);
	ths.html(ths.html().replace(/(\S+)\s*$/, "<span>$1</span>"));
});

//помещение первого слова в заголовке h2 в span
$("section .h2").each(function(){
	var ths = $(this);
	ths.html(ths.html().replace( /^(\S+)/, "<span>$1</span>"));
});

//для одинкаковой высоты item
function onResize(){
	$(".carousel-services-content").equalHeights();
};
onResize();
window.onresize = function(){
	onResize()
};

//селектор
$("select").selectize();

//секция отзывов
$(".reviews").owlCarousel({
	loop: true,
	items: 1,
	smartSpeed: 700,
	nav: false,
	autoHeight: true,
});

//секция партнеры
$(".partners").owlCarousel({
	loop: true,
	smartSpeed: 700,
	nav: true,
	dots: false,
	navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
	responsiveClass: true,
	responsive:{
		0: {
			items: 1
		},
		768: {
			items: 2
		},
		992: {
			items: 3
		},
		1200: {
			items: 4
		},
	}
});

	//E-mail Ajax Send
	$("form.callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(th).find(".success").addClass("active").css("display", "flex").hide().fadeIn();
			setTimeout(function() {
				// Done Functions
				$(th).find(".success").removeClass("active").fadeOut();
				th.trigger("reset");
			}, 3000);
		});
		return false;
	});

//кнопка вверх
$(window).scroll(function(){
	if($(this).scrollTop() > $(this).height()){
		$(".top").addClass("active");
	}
	else{
		$(".top").removeClass("active");
	}

});
$(".top").click(function(){
	$("html body").stop().animate({scrollTop:0}, "slow", "swing");
})



});

//работа с прелоадером
$(window).on('load', function(){
	$(".preloader").delay(1000).fadeOut("slow");
});