
import $ from 'jquery';
import jQuery from 'jquery';
// export for others scripts to use
//window.$ = $;
//window.jQuery = jQuery;

(($, document, window) => {

	$(document).ready(() => {



		$(window).scroll(function() {

			let window_scroll = $(this).scrollTop();

			if (window_scroll > 200) {
				$('.navbar').fadeIn(500);
			} else {
				$('.navbar').fadeOut(500);
			}

			$('.intro-foreground').css({
				 'transform': 'translate(0px, +'+window_scroll/30+'%)'
			});

		});

		$('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  //form error handling

	$('.contact-form').submit((e) => {
		e.preventDefault();

    $('.submit-message').html('');

		let error = '';

		if($('.contact-form').find('#name').val() == '') {
			error += 'Please enter your name!<br>';
		}
		if($('.contact-form').find('#email').val() == '') {
			error += 'Please enter your email!<br>';
		}
		if($('.contact-form').find('#message').val() == '') {
			error += 'Please enter a message!';
		}

		if(error != '') {
			$('.submit-message').html('<p>'+error+'</p>')
		}else{
			$('.contact-form')[0].reset();
			$('.submit-message').html('<p>I\'ll get back to you soon!</p>')
		}

	});

	});

})(jQuery, document, window);
