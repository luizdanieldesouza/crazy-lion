$(document).ready(function() {
	
	// smooth wheel
	$(function(){	

		var $window = $(window);
		var scrollTime = 0.5;
		var scrollDistance = 170;

		$window.on("mousewheel DOMMouseScroll", function(event){

			event.preventDefault();	

			var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
			var scrollTop = $window.scrollTop();
			var finalScroll = scrollTop - parseInt(delta*scrollDistance);

			TweenMax.to($window, scrollTime, {
				scrollTo : { y: finalScroll, autoKill:true },
					ease: Power1.easeOut,
					overwrite: 5							
				});

		});
	});

	if ( $('.promo_banner').length ) {
		$('.promo_banner--slider').bxSlider({
			// mode: 'fade',
			pager: false
		});	
	}

	var s = skrollr.init({
		smoothScrolling: false,
		forceHeight: false,
		render: function(data) {
			// console.log(1);
		}
	});

	if ( $('.cart--list--item--amount').length ) {
		$('.cart--list--item--amount--dec').each(function() {
			$(this).on('click', function() {
				var input = $(this).parent().find('.cart--list--item--amount--input');
				if (!parseInt(input.val())<=0 ) {
					input.val(parseInt(input.val()) - 1 );
					if ( parseInt(input.val()) === 0 ) {
						input.parents('.cart--list--item').addClass('m-removed');
						$('.cart--list--item--amount--dec').attr('disabled', 'disabled');
					}
				}
			});
		});
		$('.cart--list--item--amount--inc').each(function() {
			$(this).on('click', function() {
				var input = $(this).parent().find('.cart--list--item--amount--input');
				input.val(parseInt(input.val()) + 1 );
				if ( parseInt(input.val()) > 0 ) {
					input.parents('.cart--list--item').removeClass('m-removed');
					$('.cart--list--item--amount--dec').removeAttr('disabled');
				}
			});
		});
	}

	if ( $('.product').length ) {
		$('.product--gallery ul').bxSlider();
	}
	if ( $('.products').length ) {
		$('.products--promo--slider').bxSlider();
	}

	// tabs function
	$('.tabs').each(function() {
		var self = $(this),
			navigation = self.find('.tabs--nav'),
			navigationLink = navigation.find('a'),
			panes = self.find('.tabs--panes'),
			pane = self.find('.tabs--pane');

		// hide all panes, show first
		pane.hide();
		pane.eq(0).show();
		

		// change pane
		navigationLink.on('click', function() {
			var paneNum = $(this).attr('data-pane');
			pane.hide();
			pane.eq(paneNum-1).show();
			navigationLink.parent().removeClass('m-active');
			$(this).parent().addClass('m-active');

			return false;

		});
	});

	// banner-parallax
	if ( $('.wide_banner').length ) {

	}

	if ( $('.mouse_parallax').length ) {

		$('.mouse_parallax').parallax({
			limitY: 0
		});

	}

	if ( $('.game--gallery--slider').length ) {
		$('.game--gallery--slider').bxSlider();
	}

	// feedback form

	// send message
	if ( $('.feedback').length ) {
		$('.feedback--form--submit').on('click', function(event) {
			event.preventDefault();

			$.ajax({
				type: 'POST',
				success: function() {
					$('.feedback fieldset').fadeOut(function() {
						$('.feedback--form--success').fadeIn();
					});
				},
				error: function() {
					
				}
			});
		});

		$('.feedback--form--success--write_new').on('click', function() {
			$('.feedback--form--success').fadeOut(function() {
				$('.feedback fieldset').fadeIn();
			});
		});

		$('.feedback--form--email').on('blur', function() {
			console.log(1);
			var value = $(this).val();
			if ( value !== '' ) {
				if ( !validateEmail( value ) ) {
					$(this).parent().addClass('m-error');
				} else {
					$(this).parent().removeClass('m-error');
				}
			}

		});

	}

	// validate email
	function validateEmail(email) { 
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}


	// send_message form
	if ( $('.send_message').length ) {
		$('.send_message--form--submit').on('click', function(e) {
			e.preventDefault();

			$.ajax({
				type: 'POST',
				success: function() {
					$('.send_message--form fieldset').fadeOut(function() {
						$('.send_message--form--success').fadeIn();
					});
					$('.send_message--form--submit').fadeOut(function() {
						$('.send_message--form--send_again').fadeIn();
					});
				},
				error: function() {
					
				}
			});
		});
		$('.send_message--form--send_again').on('click', function() {
					$('.send_message--form--success').fadeOut(function() {
						$('.send_message--form fieldset').fadeIn();
					});
					$('.send_message--form--send_again').fadeOut(function() {
						$('.send_message--form--submit').fadeIn();
					});
		});
		$('.send_message--form--email').on('blur', function() {
			var value = $(this).val();
			if ( value !== '' ) {
				if ( !validateEmail( value ) ) {
					$(this).parent().addClass('m-error');
				} else {
					$(this).parent().removeClass('m-error');
				}
			}

		});
	}

});
 
