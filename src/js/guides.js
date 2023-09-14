/**
 * Docs TOC Sidebar
 */

$(document).ready(() => {
  if ($('#TableOfContents ul').length >= 1) {
    $('#tocMenu').css({
      display: 'block'
    })
  } else {
    $('#tocMenu').css({
      display: 'none'
    })
  }
})

/**
 * Sidemenu fixed position after some scroll-up
 */

const sideMenuDistance = $('#tocMenu').offset().top - 10

$(window).on('scroll', function () {
  if ($(window).scrollTop() >= sideMenuDistance) {
    $('#tocMenu').css({
      position: 'fixed',
      top: '30px'
    })
  } else {
    $('#tocMenu').css({
      position: 'relative',
      top: '0'
    })
  }
})
