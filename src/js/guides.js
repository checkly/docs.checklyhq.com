/**
 * Docs TOC Sidebar
 */

$(document).ready(function () {
  const tocMenu = $('#tocMenu')
  if (!tocMenu.length) return
  const sideMenuDistance = tocMenu.offset().top - 10

  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= sideMenuDistance) {
      tocMenu.css({
        position: 'fixed',
        top: '30px'
      })
    } else {
      tocMenu.css({
        position: 'relative',
        top: '0'
      })
    }
  })
})

/**
 * Docs Mobile Menu
 */

$(document).ready(() => {
  $('#navbar-hamburger').click(function () {
    $('.generice-side-menu').css({
      left: '0'
    })
    $('.docs-menu-mobile-right-space').css({
      display: 'block'
    })
    $('#sideMenu').removeClass('left-transform')
    $('#sideMenu').addClass('right-transform')
    // flag = false
  })

  $('.docs-menu-mobile-right-space').click(function () {
    $('.docs-menu').css({
      left: '-100%'
    })
    $('.docs-menu-mobile-right-space').css({
      display: 'none'
    })
    $('#sideMenu').removeClass('right-transform')
    $('#sideMenu').addClass('left-transform')
    // flag = true
  })
})
