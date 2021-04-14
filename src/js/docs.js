
/**
 * Docs Menu
 */

$(document).ready(() => {
  const docs_menu_title_class = '.docs-menu-title'
  var doc_menu_header = $(docs_menu_title_class);

  doc_menu_header.click(function() {
    var id = $(this).attr('id');
    var doc_menu_id = '#docs-menu-' + id
    if ($(this).attr('class') === 'docs-menu-title') {
      $(this).addClass('active')
      $(doc_menu_id).addClass('menu-display')
    } else {
      $(this).removeClass('active')
      $(doc_menu_id).removeClass('menu-display')
    }
  })
})

/**
 * Docs TOC Sidebar
 */

$(document).ready(() => {
  if($('#TableOfContents ul').length >= 1){
    $('#tocMenu').css({
      display: 'block',
    })
  } else {
    $('#tocMenu').css({
      display: 'none',
    })
  }
})


/**
 * Docs Mobile Menu
 */

$(document).ready(() => {
  var flag = true;
  $('.mobile-toc-button').click(function() {
    $(".docs-menu").css({
      left: '0',
    })
    $('.docs-menu-mobile-right-space').css({
      display: 'block',
    })
    $("#sideMenu").removeClass('left-transform')
    $("#sideMenu").addClass('right-transform')
    flag = false;
  })
  $('.docs-menu-mobile-right-space').click(function() {
    $(".docs-menu").css({
      left: '-100%'
    })
    $('.docs-menu-mobile-right-space').css({
      display: 'none',
    })
    $("#sideMenu").removeClass('right-transform')
    $("#sideMenu").addClass('left-transform')
    flag = true;
  })
})

/**
 * '/' press for the search
 */

$(document).on('keydown', function(e) {
  if ( e.keyCode === 191 ) { //'/' key code
    e.preventDefault()
    $("#search").focus();
  }
});

/**
 * Sidemenu fixed position after some scroll-up
 */

var sideMenuDistance = $("#sideMenu").offset().top - 10;

$(window).on('scroll', function() {
  if ($(window).scrollTop() >= sideMenuDistance) {
    $("#sideMenu").css({
      position: 'fixed',
      top: '0px'
    })
    $("#tocMenu").css({
      position: 'fixed',
      top: '30px'
    })
  } else {
    $("#sideMenu").css({
      position: 'relative'
    })
    $("#tocMenu").css({
      position: 'relative',
      top: '0'
    })
  }
})
