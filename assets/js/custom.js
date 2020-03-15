$(window).on("load", function() {
    $(".js-mega-menu").HSMegaMenu({
        event: "hover",
        pageContainer: $(".container"),
        breakpoint: 1025,
        hideTimeOut: 0
    })
}),
// $(document).on("ready", function() {

$(document).ready(function(){
    $.HSCore.components.HSHeader.init($("#header"));
    
    
    // Header Height
    var headHeight = $('header').height();

    // Fix Header
    $(window).on('scroll', function(e){
		var win = $(window);
		var winHgt = win.height();
		var winScrollTop = win.scrollTop();
		var winScrollBtm = winScrollTop + winHgt;

		// For Sticky Header
		if (win.width() >= 992) {
			var $header = $('header');
			var $headerHgt = $header.height();
			if (winScrollTop > $headerHgt) {
				$header.addClass('fixed-header');
				$header.parents('.main-wrapper').css('padding-top', $headerHgt+'px');
			}
			else {
				$header.removeClass('fixed-header');
				$header.parents('.main-wrapper').removeAttr('style');
			}
		}

    });
    
    // Hamburger Icon
    $('.hamburger').on('click', function(){
        $(this).toggleClass('is-active');
    })

    // Back To Top Button
    var backButton = $('.back-to-top');
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
          backButton.addClass('shown');
        } else {
          backButton.removeClass('shown');
        }
    });
    
    backButton.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, 1000);
    });
    

    // Banner-slider
    $('#banner-slider').owlCarousel({
        loop:true,
        nav:true,
        dots:false,
        items: 1,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        // autoplay:true,
        autoplayTimeout:9000,
        smartSpeed:500,
        responsive:{
            0:{
                items: 1,
                nav: true
            },
            992:{
                nav: true
            },
        }
    })


    // About us Inner section
    $(document).ready(function(){
        if ((window.location.hash == "#history") && (window.location.hash == "#objective") && (window.location.hash == "#vision")){
            $('html, body').animate({
                scrollTop: $("#moreInfo").offset().top + 120
            }, 1000);
        }
    });

    // JS INIT for Masnory
    var $grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        columnWidth: '.grid-sizer'
    });
    
    // layout Masonry after each image loads
    $grid.imagesLoaded().progress( function() {
        $grid.masonry();
    }); 

    // Visitor Count
    // var n = localStorage.getItem('on_load_counter');

    // if (n === null) {
    //     n = 1000;
    // }
    // n++;

    // // localStorage.setItem("on_load_counter", n);

    // // document.getElementById('CounterVisitor').innerHTML = n;


    // $('#send').on('click', function(){
    //     $('.success-msg').show();
    // });

    // submit contact form
    var ajaxGoing = false;

    function Modal(modal) {
        this.modal = modal;
    }

    Modal.prototype.show = function(html) {
        this.modal.find(".modal-body")
            .html(html);
        this.modal.modal("show");
    };

    $("#contact-form").submit(function(e) {
        e.preventDefault();

        if( ajaxGoing ) {
            return;
        }

        var success_msg = "Successfully Submitted. Thank You.";
        var self = this;
        var modal = new Modal( $("#responseModalBox") );
        var form = new FormData(this);
        form.append('is_ajax', 1);

        $.ajax({
            url: $(self).attr("action").trim(),
            type: "POST",
            data: form,
            processData: false,
            contentType: false,
            beforeSend: function() {
                ajaxGoing = true;

                $(self).css({'pointer-events': 'none', 'opacity': 0.6});
                $(self).find("button[type=submit]").text("Sending...");
                $('.success-msg').hide();
                $('.fail-msg').hide();
                $(".fail-errors").hide();
            }
        })
        .done(function(response) {
            var message = "";

            if( response ) {
                if( response.status ) {
                    $('.success-msg').show();
                    modal.show(
                        "<div class='text-success'><h3><i class=\"fa fa-check tick success\" aria-hidden=\"true\"></i>"+success_msg+"</h3></div>"
                    );
                    $(self).trigger("reset");
                } else if( response.data && !$.isEmptyObject(response.data) ) {
                    message += "<ul>";
                    var key = Object.keys(response.data)[0];
                    message += key.toUpperCase() + ": " + response.data[key];
                    message += "</ul>";

                    $(".fail-errors").html(message).show();
                    $("input[name='"+ key +"']").focus();
                } else {
                    // something went wrong
                    // a session may have expired
                    modal.show(
                        "<div class='text-danger'><h3><i class=\"fa fa-times tick danger\" aria-hidden=\"true\"></i>Something Went Wrong!!</h3></div>"
                    );
                    $('.fail-msg').show();
                }
            }
        })
        .fail(function() {
            // something went wrong
            modal.show(
                "<div class='text-danger'><h3><i class=\"fa fa-times tick danger\" aria-hidden=\"true\"></i>Something Went Wrong!!</h3></div>"
            );
            // a session may have expired
            window.reload();
            $('.fail-msg').show();
        })
        .always(function() {
            ajaxGoing = false;

            $(self).css({'pointer-events': 'auto', 'opacity': 1});
            $(self).find("button[type=submit]").text("Send Message");
        });
    });
});