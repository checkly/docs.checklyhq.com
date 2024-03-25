/* eslint-env jquery */

$(document).ready(() => {
// Show the dashboard button is cookie is present
  if (document.cookie.split(';').filter((item) => item.trim().startsWith('checkly_has_account=')).length) {
    $('#login-button').hide()
    $('#dashboard-button').show()
  }
})

/**
*get headlessdev posts
*/

$(document).ready(() => {
  if ($('div').hasClass('opensource')) {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      const x2js = new X2JS()
      const data = x2js.xml2json(xhr.responseXML.documentElement)
      let titleId = ''
      let descId = ''
      let linkId = ''
      data.channel.item.forEach(function (node, i) {
        if (i < 6) {
          titleId = '#card-' + (i + 1) + '-title'
          descId = '#card-' + (i + 1) + '-description'
          linkId = '#card-' + (i + 1) + '-link'
          $(titleId).text(node.title)
          $(descId).text(node.description)
          $(linkId).attr('href', node.link)
        }
      })
    }

    xhr.open('GET', 'https://theheadless.dev/rss.xml')
    xhr.responseType = 'document'
    xhr.send()

    fetch('https://api.github.com/repos/checkly/pulumi-checkly')
      .then(function (response) {
        return response.json()
      })
      .then(function (res) {
        let stars = ''
        if (res.stargazers_count > 1000) {
          stars = (res.stargazers_count / 1000).toFixed(1) + 'k'
        } else {
          stars = res.stargazers_count
        }
        $('#pulumi-provider').text(stars)
      })
    fetch('https://api.github.com/repos/checkly/terraform-provider-checkly')
      .then(function (response) {
        return response.json()
      })
      .then(function (res) {
        let stars = ''
        if (res.stargazers_count > 1000) {
          stars = (res.stargazers_count / 1000).toFixed(1) + 'k'
        } else {
          stars = res.stargazers_count
        }
        $('#terraform-provider').text(stars)
      })
    fetch('https://api.github.com/repos/checkly/jamstack-deploy')
      .then(function (response) {
        return response.json()
      })
      .then(function (res) {
        let stars = ''
        if (res.stargazers_count > 1000) {
          stars = (res.stargazers_count / 1000).toFixed(1) + 'k'
        } else {
          stars = res.stargazers_count
        }
        $('#jamstack-deploy').text(stars)
      })
  }
})

/**
 * Hover Dropdown
 */

$(document).ready(function () {
  $('.dropdown-li').mouseenter(function () {
    $(this).addClass('show')
  })
  $('#dropdown-menu, .dropdown-li').mouseleave(function () {
    $(this).removeClass('show')
  })
})

/**
 * Pricing Toggle Card
 */
$(document).ready(() => {
  const toggle = $('.pricing__plans--toggle')
  const toggleCard = $('#pricing__plans--toggle-card')
  const toggleArrow = $('.pricing__plans--toggle-arrow')
  let toggleFlag = 0
  toggle.click(() => {
    if (toggleFlag === 0) {
      toggleCard.css({
        display: 'block'
      })
      toggleArrow.css({
        transform: 'rotate(180deg)'
      })
      toggleFlag = 1
    } else {
      toggleCard.css({
        display: 'none'
      })
      toggleArrow.css({
        transform: 'rotate(0)'
      })
      toggleFlag = 0
    }
  })
})

/**
 * START Pricing
 */

const plans = [
  {
    name: 'developer',
    year: 77,
    month: 7,
    monthByYear: '6.41'
  },
  {
    name: 'starter',
    year: 319,
    month: 29,
    monthByYear: '26.58'
  },
  {
    name: 'growth',
    year: 825,
    month: 75,
    monthByYear: 68.75
  },
  {
    name: 'business',
    year: 5489,
    month: 499,
    monthByYear: '457.42'
  }
]

$(document).ready(() => {
  const button = $('.billing-cycle-toggler')
  let current = 'MONTH'

  button.click(() => {
    $('.toggle').toggleClass('toggle-selected')
    if (current === 'YEAR') {
      for (const plan of plans) {
        $(`[data-${plan.name}-price]`).text(plan.month)
        $(`[data-${plan.name}-strikeout-price]`).hide()
      }
      current = 'MONTH'
    } else {
      for (const plan of plans) {
        $(`[data-${plan.name}-price]`).text(plan.monthByYear)
        $(`[data-${plan.name}-strikeout-price]`).text(` $ ${plan.month} / month `).show()
      }
      current = 'YEAR'
    }
  })
})
/**
 * END Pricing
 */

/**
 * Integration tabs
 */

$(document).ready(() => {
  $('#integration-tab-0').addClass('active')
  $('#integration-tab-0-content').addClass('active')
  const integrationTab = $('.integration-tab')
  const tabContent = $('.integration-tab-content')

  integrationTab.click(function () {
    const id = $(this).attr('id')
    const conentId = '#' + id + '-content'
    $(integrationTab).removeClass('active')
    $(tabContent).removeClass('active')
    $(this).addClass('active')
    $(conentId).addClass('active')
  })
})

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
 * Fetch status from statuspage.com and update link in footer
 */
$(document).ready(() => {
  fetch('https://nq8lf8mrmvw6.statuspage.io/api/v2/status.json')
    .then(function (response) {
      return response.json()
    })
    .then(function (res) {
      if (res.status.indicator === 'none') {
        $('#footer-status-indicator').addClass('dot--green')
      }
      if (res.status.indicator === 'minor') {
        $('#footer-status-indicator').addClass('dot--yellow')
      }
      if (res.status.indicator === 'major' || res.status.indicator === 'critical') {
        $('#footer-status-indicator').addClass('dot--red')
      }
    })
})
