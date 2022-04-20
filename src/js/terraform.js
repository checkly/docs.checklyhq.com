const copyText = `variable "checkly_api_key" {}
variable "checkly_account_id" {}

terraform {
  required_providers {
    checkly = {
      source = "checkly/checkly"
      version = "~> 1.0"
    }
  }
}

provider "checkly" {
  api_key = var.checkly_api_key
  account_id = var.checkly_account_id
}`

$(document).ready(() => {
  $('#copy-installation-code').click(function () {
    copyToClipboard(copyText)
    $('#copy-installation-code')
      .removeClass('btn-primary')
      .addClass('btn-success')
      .text('Copied!')

    const resetButtonTimer = setTimeout(resetButton, 3000)
    $(window).on('unload', function (e) {
      clearTimeout(resetButtonTimer)
    })
  })
})

function resetButton () {
  $('#copy-installation-code')
    .removeClass('btn-success')
    .addClass('btn-primary')
    .text('Copy the installation code!')
}

const copyToClipboard = text => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
  }
  return copyToClipboardFallback(copyText)
}

function copyToClipboardFallback (text) {
  const textArea = document.createElement('textarea')

  // Place in the top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed'
  textArea.style.top = 0
  textArea.style.left = 0

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em'
  textArea.style.height = '2em'

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0

  // Clean up any borders.
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'

  // Avoid flash of the white box if rendered for any reason.
  textArea.style.background = 'transparent'

  textArea.value = text

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    document.execCommand('copy')
  } catch (err) {
    console.error('Unable to copy')
  }
  document.body.removeChild(textArea)
}
