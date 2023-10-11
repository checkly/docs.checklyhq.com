/**
 * Docs TOC Sidebar
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
