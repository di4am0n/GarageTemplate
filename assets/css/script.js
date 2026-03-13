(function($) {
    "use strict";

    function handlePreloader() {
        if ($('.preloader').length) {
            $('.preloader').delay(200).fadeOut(500);
        }
    }

    function headerStyle() {
        var $siteHeader = $('.main-header');
        var $scrollLink = $('.scroll-top');
        var windowPos = $(window).scrollTop() || $(document).scrollTop();

        if (!$siteHeader.length) {
            return;
        }

        if (windowPos >= 110) {
            $siteHeader.addClass('fixed-header');
            $scrollLink.addClass('open');
        } else {
            $siteHeader.removeClass('fixed-header');
            $scrollLink.removeClass('open');
        }
    }

    function initDropdownButtons() {
        $('.main-header .navigation li.dropdown').each(function() {
            if (!$(this).children('.dropdown-btn').length && $(this).children('ul, .megamenu').length) {
                $(this).append('<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>');
            }
        });
    }

    function initMobileMenu() {
        if (!$('.mobile-menu').length) {
            return;
        }

        if ($.fn.mCustomScrollbar) {
            $('.mobile-menu .menu-box').mCustomScrollbar();
        }

        var mobileMenuContent = $('.main-header .menu-area .main-menu').html();

        if (mobileMenuContent) {
            $('.mobile-menu .menu-box .menu-outer').html(mobileMenuContent);
            $('.sticky-header .main-menu').html(mobileMenuContent);
        }

        $('.mobile-menu').off('click.mobileDropdown').on('click.mobileDropdown', 'li.dropdown > .dropdown-btn', function() {
            $(this).toggleClass('open');
            $(this).siblings('ul, .megamenu').first().slideToggle(500);
        });

        $('.mobile-nav-toggler').off('click.mobileMenu').on('click.mobileMenu', function() {
            $('body').addClass('mobile-menu-visible');
        });

        $('.mobile-menu .menu-backdrop, .mobile-menu .close-btn').off('click.mobileMenu').on('click.mobileMenu', function() {
            $('body').removeClass('mobile-menu-visible');
        });
    }

    function initScrollToTarget() {
        $(document).off('click.scrollTarget').on('click.scrollTarget', '.scroll-to-target', function(e) {
            var target = $(this).attr('data-target');

            if (!target || !$(target).length) {
                return;
            }

            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);
        });
    }

    function initWow() {
        if ($('.wow').length && typeof WOW === 'function') {
            new WOW({ mobile: false }).init();
        }
    }

    function initValidation() {
        if ($('#contact-form').length && $.fn.validate) {
            $('#contact-form').validate({
                rules: {
                    username: { required: true },
                    email: { required: true, email: true },
                    phone: { required: true },
                    subject: { required: true },
                    message: { required: true }
                }
            });
        }
    }

    function initCounters() {
        if ($('.count-box').length && $.fn.appear) {
            $('.count-box').appear(function() {
                var $t = $(this);
                var n = $t.find('.count-text').attr('data-stop');
                var r = parseInt($t.find('.count-text').attr('data-speed'), 10);

                if (!$t.hasClass('counted')) {
                    $t.addClass('counted');
                    $({ countNum: $t.find('.count-text').text() }).animate({ countNum: n }, {
                        duration: r,
                        easing: 'linear',
                        step: function() {
                            $t.find('.count-text').text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $t.find('.count-text').text(this.countNum);
                        }
                    });
                }
            }, { accY: 0 });
        }
    }

    function initLightbox() {
        if ($('.lightbox-image').length && $.fn.fancybox) {
            $('.lightbox-image').fancybox({
                openEffect: 'fade',
                closeEffect: 'fade',
                helpers: { media: {} }
            });
        }
    }

    function initTabs() {
        if ($('.tabs-box').length) {
            $('.tabs-box .tab-buttons .tab-btn').off('click.tabs').on('click.tabs', function(e) {
                e.preventDefault();
                var target = $($(this).attr('data-tab'));

                if (target.is(':visible')) {
                    return false;
                }

                target.parents('.tabs-box').find('.tab-buttons .tab-btn').removeClass('active-btn');
                $(this).addClass('active-btn');
                target.parents('.tabs-box').find('.tabs-content .tab').fadeOut(0).removeClass('active-tab');
                target.fadeIn(300).addClass('active-tab');
            });
        }
    }

    function initAccordion() {
        if ($('.accordion-box').length) {
            $('.accordion-box').off('click.accordion').on('click.accordion', '.acc-btn', function() {
                var outerBox = $(this).parents('.accordion-box');
                var target = $(this).parents('.accordion');

                if (!$(this).hasClass('active')) {
                    outerBox.find('.accordion .acc-btn').removeClass('active');
                }

                if ($(this).next('.acc-content').is(':visible')) {
                    return false;
                }

                $(this).addClass('active');
                outerBox.children('.accordion').removeClass('active-block');
                outerBox.find('.accordion .acc-content').slideUp(300);
                target.addClass('active-block');
                $(this).next('.acc-content').slideDown(300);
            });
        }
    }

    function initCarousel(selector, options) {
        if ($(selector).length && $.fn.owlCarousel) {
            $(selector).owlCarousel(options);
        }
    }

    function initCarousels() {
        initCarousel('.two-column-carousel', {
            loop: true,
            margin: 90,
            nav: true,
            smartSpeed: 1000,
            autoplay: 500,
            navText: ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>'],
            responsive: {
                0: { items: 1 },
                480: { items: 1 },
                600: { items: 1 },
                800: { items: 2 },
                1024: { items: 2 }
            }
        });

        initCarousel('.three-item-carousel', {
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 1000,
            autoplay: 500,
            navText: ['<span class="far fa-long-arrow-alt-left"></span>', '<span class="far fa-long-arrow-alt-right"></span>'],
            responsive: {
                0: { items: 1 },
                480: { items: 1 },
                600: { items: 2 },
                800: { items: 2 },
                1024: { items: 3 }
            }
        });

        initCarousel('.four-item-carousel', {
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 500,
            autoplay: 5000,
            navText: ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>'],
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                800: { items: 2 },
                1024: { items: 3 },
                1200: { items: 4 }
            }
        });

        initCarousel('.project-carousel', {
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 500,
            autoplay: 5000,
            navText: ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>'],
            responsive: {
                0: { items: 1 },
                600: { items: 1 },
                800: { items: 1 },
                1024: { items: 1 },
                1200: { items: 1 }
            }
        });

        initCarousel('.single-item-carousel', {
            loop: true,
            margin: 30,
            nav: false,
            smartSpeed: 3000,
            autoplay: true,
            navText: ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>'],
            responsive: {
                0: { items: 1 },
                480: { items: 1 },
                600: { items: 1 },
                800: { items: 1 },
                1200: { items: 1 }
            }
        });

        initCarousel('.clients-carousel', {
            loop: true,
            margin: 30,
            nav: false,
            smartSpeed: 3000,
            autoplay: true,
            navText: ['<span class="fas fa-angle-left"></span>', '<span class="fas fa-angle-right"></span>'],
            responsive: {
                0: { items: 1 },
                480: { items: 2 },
                600: { items: 3 },
                800: { items: 4 },
                1200: { items: 5 }
            }
        });
    }

    function initOnePageNav() {
        if ($('.scroll-nav').length && $.fn.onePageNav) {
            $('.scroll-nav').onePageNav();
        }
    }

    function initNiceSelect() {
        if ($.fn.niceSelect) {
            $('select:not(.ignore)').niceSelect();
        }
    }

    function enableMasonry() {
        if (!$('.sortable-masonry').length || !$.fn.isotope) {
            return;
        }

        var $window = $(window);
        var $container = $('.sortable-masonry .items-container');
        var $filter = $('.filter-btns');
        var $filterItems = $('.filter-btns li');

        $container.isotope({
            filter: '*',
            masonry: { columnWidth: '.masonry-item.small-column' },
            animationOptions: { duration: 500, easing: 'linear' }
        });

        $filter.find('li').off('click.masonry').on('click.masonry', function() {
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: { duration: 500, easing: 'linear', queue: false }
            });
            return false;
        });

        $window.off('resize.masonry').on('resize.masonry', function() {
            var selector = $filter.find('li.active').attr('data-filter') || '*';
            $container.isotope({
                filter: selector,
                animationOptions: { duration: 500, easing: 'linear', queue: false }
            });
        });

        $filterItems.off('click.masonryActive').on('click.masonryActive', function() {
            if (!$(this).hasClass('active')) {
                $filterItems.removeClass('active');
                $(this).addClass('active');
            }
        });
    }

    function initProgressBar() {
        if ($('.count-bar').length && $.fn.appear) {
            $('.count-bar').appear(function() {
                var $el = $(this);
                var percent = $el.data('percent');
                $el.css('width', percent).addClass('counted');
            }, { accY: -50 });
        }
    }

    function directionSwitch() {
        if ($('.page_direction').length) {
            $('.direction_switch button').off('click.directionSwitch').on('click.directionSwitch', function() {
                $('body').toggleClass(function() {
                    return $(this).is('.rtl, .ltr') ? 'rtl ltr' : 'rtl';
                });
            });
        }
    }

    function ensureQuoteModalFallback() {
        if (typeof window.showQuoteModal !== 'function') {
            window.showQuoteModal = function() {
                var modal = document.getElementById('quoteModal') || document.querySelector('.quote-modal');
                if (modal) {
                    modal.classList.add('open');
                    modal.style.display = 'block';
                }
            };
        }
    }

    $(function() {
        initDropdownButtons();
        initMobileMenu();
        initScrollToTarget();
        initWow();
        initValidation();
        initCounters();
        initLightbox();
        initTabs();
        initAccordion();
        initCarousels();
        initOnePageNav();
        initNiceSelect();
        enableMasonry();
        initProgressBar();
        directionSwitch();
        ensureQuoteModalFallback();
        headerStyle();
    });

    $(window).on('scroll resize load', function() {
        headerStyle();
    });

    $(window).on('load', function() {
        handlePreloader();
        enableMasonry();
        headerStyle();
    });
})(window.jQuery);
