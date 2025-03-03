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

/**
 * Copy code button for code blocks
 */

function attachClickHandler (highlightDiv) {
  const button = highlightDiv.querySelector('.copy-code-button')
  if (!button) return
  button.addEventListener('click', () => copyCodeToClipboard(button, highlightDiv))
}

document.querySelectorAll('.highlight').forEach((highlightDiv) => attachClickHandler(highlightDiv))

async function copyCodeToClipboard (button, highlightDiv) {
  const codeToCopy = highlightDiv.querySelector(':last-child > code').innerText

  try {
    const result = await navigator.permissions.query({
      name: 'clipboard-write'
    })
    if (result.state === 'granted' || result.state === 'prompt') {
      await navigator.clipboard.writeText(codeToCopy)
    } else {
      await copyCodeBlockExecCommand(codeToCopy)
    }
  } catch (_) {
    await copyCodeBlockExecCommand(codeToCopy)
  } finally {
    button.blur()
    button.innerText = ''
    button.classList.add('copy-code-button--copied')
    setTimeout(function () {
      button.innerText = ''
      button.classList.remove('copy-code-button--copied')
    }, 2000)
  }
}

async function copyCodeBlockExecCommand (codeToCopy) {
  try {
    await navigator.clipboard.writeText(codeToCopy)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
