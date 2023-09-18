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
