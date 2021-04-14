
/**
 * Learn Menu
 */

$(document).ready(() => {
  const learn_menu_title_class = '.learn-menu-title'
  var learn_menu_header = $(learn_menu_title_class);

  learn_menu_header.click(function() {
    var id = $(this).attr('id');
    var learn_menu_id = '#learn-menu-' + id
    if ($(this).attr('class') === 'learn-menu-title') {
      $(this).addClass('active')
      $(learn_menu_id).addClass('menu-display')
    } else {
      $(this).removeClass('active')
      $(learn_menu_id).removeClass('menu-display')
    }
  })
})

/**
 * Learn TOC Sidebar
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
 * Learn Mobile Menu
 */

$(document).ready(() => {
  var flag = true;
  $('.mobile-toc-button').click(function() {
    $(".learn-menu").css({
      left: '0',
    })
    $('.learn-menu-mobile-right-space').css({
      display: 'block',
    })
    $("#sideMenu").removeClass('left-transform')
    $("#sideMenu").addClass('right-transform')
    flag = false;
  })
  $('.learn-menu-mobile-right-space').click(function() {
    $(".learn-menu").css({
      left: '-100%'
    })
    $('.learn-menu-mobile-right-space').css({
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
 * Hover Dropdown
 */

$(document).ready(function() {
  $('#dropdown-li').mouseenter(function(){
    $('#dropdown-li').addClass('show');
  })
  $('#dropdown-menu, #dropdown-li').mouseleave(function() {
    $('#dropdown-li').removeClass('show');
  })
})


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

/**
 * Handle run in checkly button
 */

const isDev = window.location.host.includes('localhost')

$('.run-in-checkly').on('click', function () {
  const data = $(this).data()
  fetch(data.script)
    .then(response => response.text())
    .then(body => {
      const script = encodeURIComponent(btoa(body))
      window.location.href = `${isDev ? 'http://localhost:8081' : 'https://app.checklyhq.com'}/checks/new/browser?framework=${data.framework}&script=${script}`
    })
})

