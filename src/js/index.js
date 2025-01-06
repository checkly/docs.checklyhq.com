/* eslint-env jquery */
/**
 *Footer DropDown in Tablet&Mobile
 */
$(document).ready(() => {
  const menuHeader = $('.menu_header')
  menuHeader.click(function () {
    const id = $(this).attr('id')
    const menuHeaderId = '#' + id
    const menuId = '#' + id + '_drop'
    if ($(menuId).attr('class') === 'desktop-show') {
      $(menuId).addClass('show')
      $(menuHeaderId).addClass('rotate')
    } else {
      $(menuId).removeClass('show')
      $(menuHeaderId).removeClass('rotate')
    }
  })
})
