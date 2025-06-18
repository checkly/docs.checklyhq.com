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
 * Copy to Clipboard helpers
 */

async function copyCodeBlockExecCommand (codeToCopy) {
  try {
    await navigator.clipboard.writeText(codeToCopy)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

async function copyToClipboardWrapper (copyPayload, classToAdd, element, originalText) {
  try {
    const result = await navigator.permissions.query({
      name: 'clipboard-write'
    })
    if (result.state === 'granted' || result.state === 'prompt') {
      await navigator.clipboard.writeText(copyPayload)
    } else {
      await copyCodeBlockExecCommand(copyPayload)
    }
  } catch (_) {
    await copyCodeBlockExecCommand(copyPayload)
  } finally {
    element.blur()
    element.innerText = 'Copied!'
    element.classList.add(classToAdd)
    setTimeout(function () {
      element.innerText = originalText
      element.classList.remove(classToAdd)
    }, 2000)
  }
}

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

  await copyToClipboardWrapper(codeToCopy, 'copy-code-button--copied', button, '')
}

/**
 * Copy page as markdown button
 */

document.querySelectorAll('.docs-md-helper-dropdown-copy').forEach((link) => {
  link.addEventListener('click', async (evt) => {
    evt.preventDefault()
    const markdownUrl = window.location.origin + window.location.pathname + 'index.md'
    const response = await window.fetch(markdownUrl)
    const data = await response.text()
    await copyToClipboardWrapper(data, 'docs-md-helper-dropdown-copy--copied', link, 'Copy as Markdown')
  })
})
