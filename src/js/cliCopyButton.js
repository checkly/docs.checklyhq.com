/**
 * copy CLI installation command
 */

const copyTextCli = 'npm create @checkly/cli'

$(document).ready(() => {
  $('#copy-cli-installation-code').click(function () {
    copyToClipboard(copyTextCli)

    $('#cli-installation-pre')
      .css({ backgroundColor: '#10CE66' })

    $('#cli-installation-code')
      .text('Copied!')

    const resetButtonTimer = setTimeout(resetButton, 3000)
    $(window).on('unload', function (e) {
      clearTimeout(resetButtonTimer)
    })
  })
})

function resetButton () {
  $('#cli-installation-pre')
    .css({ backgroundColor: '#1f1f1f' })

  $('#cli-installation-code')
    .text('npm create @checkly/cli')
}

const copyToClipboard = text => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
  }
}
