$(document).ready(function() {
	
	// smooth wheel
	$(function(){

		if ($('html').hasClass('firefox') || $('html').hasClass('mobile')) return;

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
			// swipeThreshold: 1,
			touchEnabled: false,
			pager: false
		});	
	}

	$(function(){

		if ($('html').hasClass('mobile')) return;

		var s = skrollr.init({
			smoothScrolling: false,
			forceHeight: false,
			render: function(data) {
				// console.log(1);
			}
		});

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
		$('.product--gallery ul').bxSlider({
			touchEnabled: false
		});
	}
	if ( $('.products').length ) {
		$('.products--promo--slider').bxSlider({
			touchEnabled: false
		});
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
		$('.game--gallery--slider').bxSlider({
			touchEnabled: false
		});
	}

	// validate email
	function validate_email(email) { 
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	// feedback form

	// send message
	if ( $('.feedback').length ) {
		var validate_form = function () {
			if (!validate_email($('.feedback--form [name="email"]').val()))
				$('.feedback--form [name="email"]').parent().addClass('m-error');
			else
				$('.feedback--form [name="email"]').parent().removeClass('m-error');
			if ($('.feedback--form [name="message"]').val() == "")
				$('.feedback--form [name="message"]').parent().addClass('m-error');
			else
				$('.feedback--form [name="message"]').parent().removeClass('m-error');
			if (
				!validate_email($('.feedback--form [name="email"]').val()) ||
				$('.feedback--form [name="message"]').val() == ""
			)
				return false;
			else
				return true;
		};
		var handle_form = function (e) {
			e.preventDefault();

			if (!validate_form())
				return false;

			$.ajax({
				url: '/',
				type: 'POST',
				dataType: 'JSON',
				data: {
					email_form: 1,
					email: $('.feedback--form [name="email"]').val(),
					message: $('.feedback--form [name="message"]').val()
				},
				success: function(data) {
					if (data && data.success) {
						$('.feedback fieldset').fadeOut(function() {
							$('.feedback--form--success').fadeIn();
						});
					} else {
						alert('Error please try again!');
					}
				},
				error: function() {
					alert('Error please try again!');
				}
			});
		};
		$('.feedback--form--success--write_new').on('click', function() {
			$('.feedback--form--success').fadeOut(function() {
				$('.feedback fieldset').fadeIn();
			});
			$('.feedback--form [name="email"]').val('').parent().removeClass('m-erro');
			$('.feedback--form [name="message"]').val('').parent().removeClass('m-erro');
		});
		$('.feedback--form').on('submit', function(e){
			handle_form(e);
			return false;
		})
		$('.feedback--form--submit').on('click', function(e) {
			$(this).parents('form:first').submit();
			return false;
		});
	}

	// send_message form
	if ( $('.send_message').length ) {
		var validate_form = function () {
			if (!validate_email($('.send_message--form [name="email"]').val()))
				$('.send_message--form [name="email"]').parent().addClass('m-error');
			else
				$('.send_message--form [name="email"]').parent().removeClass('m-error');
			if ($('.send_message--form [name="name"]').val() == "")
				$('.send_message--form [name="name"]').parent().addClass('m-error');
			else
				$('.send_message--form [name="name"]').parent().removeClass('m-error');
			if ($('.send_message--form [name="message"]').val() == "")
				$('.send_message--form [name="message"]').parent().addClass('m-error');
			else
				$('.send_message--form [name="message"]').parent().removeClass('m-error');
			if (
				!validate_email($('.send_message--form [name="email"]').val()) ||
				$('.send_message--form [name="name"]').val() == "" ||
				$('.send_message--form [name="message"]').val() == ""
			)
				return false;
			else
				return true;
		};
		var handle_form = function (e) {
			e.preventDefault();

			if (!validate_form())
				return false;

			$.ajax({
				url: '/',
				type: 'POST',
				dataType: 'JSON',
				data: {
					email_form: 1,
					name: $('.send_message--form [name="name"]').val(),
					email: $('.send_message--form [name="email"]').val(),
					message: $('.send_message--form [name="message"]').val()
				},
				success: function(data) {
					if (data && data.success) {
						$('.send_message--form fieldset').fadeOut(function() {
							$('.send_message--form--success').fadeIn();
						});
						$('.send_message--form--submit').fadeOut(function() {
							$('.send_message--form--send_again').fadeIn();
						});
					} else {
						alert('Error please try again!');
					}
				},
				error: function() {
					alert('Error please try again!');
				}
			});
		};
		$('.send_message--form--send_again').on('click', function() {
			$('.send_message--form--success').fadeOut(function() {
				$('.send_message--form fieldset').fadeIn();
			});
			$('.send_message--form--send_again').fadeOut(function() {
				$('.send_message--form--submit').fadeIn();
			});
			$('.send_message--form [name="email"]').val('').parent().removeClass('m-erro');
			$('.send_message--form [name="name"]').val('').parent().removeClass('m-erro');
			$('.send_message--form [name="message"]').val('').parent().removeClass('m-erro');
		});
		$('.send_message--form').on('submit', function(e){
			handle_form(e);
			return false;
		})
		$('.send_message--form--submit').on('click', function(e) {
			$(this).parents('form:first').submit();
			return false;
		});
	}

});
 
