/* eslint-env jquery */

/**
 * START Navbar
 */
$(document).ready(() => {
  $(document).on('scroll', () => {
    if ($(document).scrollTop() > 100) {
      $('nav.navbar').addClass('navbar-fixed-drop-shadow')
    } else {
      $('nav.navbar').removeClass('navbar-fixed-drop-shadow')
    }
  })
})

$(document).ready(() => {
// Show the dashboard button is cookie is present
  if (document.cookie.split(';').filter((item) => item.trim().startsWith('checkly_has_account=')).length) {
    $('#login-button').hide()
    $('#dashboard-button').show()
  }
})

/**
 * END Navbar
 */

$(document).ready(() => {
  if($('body').hasClass('landing')){
    fetch('https://api.checklyhq.com/public-stats')
      .then(function (response) {
        return response.json()
      })
      .then(function (res) {
        const countApi = res.apiCheckResults.toLocaleString()
        const countBrowser = res.browserCheckResults.toLocaleString()
        $('#api-check-results').text(countApi)
        $('#browser-check-results').text(countBrowser)
      })
  }

})

/**
*get headlessdev posts
*/

$(document).ready(() => {
  if($('div').hasClass('opensource')){
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      var x2js = new X2JS();
      const  data = x2js.xml2json(xhr.responseXML.documentElement);
      var titleId = '';
      var descId = '';
      var linkId = '';
      data.channel.item.forEach(function(node, i) {
        if (i < 6) {
          titleId ='#card-'+(i+1)+'-title';
          descId = '#card-'+(i+1)+'-description';
          linkId = '#card-'+(i+1)+'-link';
          $(titleId).text(node.title);
          $(descId).text(node.description);
          $(linkId).attr('href', node.link);
        }
      })
    }

    xhr.open("GET", "https://theheadless.dev/rss.xml");
    xhr.responseType = "document";
    xhr.send();

    fetch("https://api.github.com/repos/checkly/headless-recorder")
      .then(function (response) {
        return response.json()
      })
      .then(function (res) {
        let stars = ''
        if (res.stargazers_count > 1000) {
          stars = (res.stargazers_count/1000).toFixed(1) + "k"
        } else {
          stars = res.stargazers_count
        }
        $('#headless-recorder').text(stars);
      })
    fetch("https://api.github.com/repos/checkly/theheadless.dev")
      .then(function (response) {
        return response.json()
      })
      .then(function (res) {
        let stars = ''
        if (res.stargazers_count > 1000) {
          stars = (res.stargazers_count/1000).toFixed(1) + "k"
        } else {
          stars = res.stargazers_count
        }
        $('#theheadless-dev').text(stars);
      })
    fetch("https://api.github.com/repos/checkly/terraform-provider-checkly")
      .then(function (response) {
        return response.json()
      })
      .then(function (res) {
        let stars = ''
        if (res.stargazers_count > 1000) {
          stars = (res.stargazers_count/1000).toFixed(1) + "k"
        } else {
          stars = res.stargazers_count
        }
        $('#terraform-provider').text(stars);
      })
    fetch("https://api.github.com/repos/checkly/jamstack-deploy")
      .then(function (response) {
        return response.json()
      })
      .then(function (res) {
        let stars = ''
        if (res.stargazers_count > 1000) {
          stars = (res.stargazers_count/1000).toFixed(1) + "k"
        } else {
          stars = res.stargazers_count
        }
        $('#jamstack-deploy').text(stars);
      })

  }
})

/**
 * Pricing Toggle Card
 */
$(document).ready(() => {
  const toggle = $('.pricing__plans--toggle')
  const toggleCard = $('#pricing__plans--toggle-card')
  const toggleArrow = $('.pricing__plans--toggle-arrow')
  var toggleFlag = 0
  toggle.click(() => {
    if (toggleFlag === 0) {
      toggleCard.css({
        display: 'block',
      })
      toggleArrow.css({
        transform: 'rotate(180deg)',
      })
      toggleFlag = 1
    } else {
      toggleCard.css({
        display: 'none',
      })
      toggleArrow.css({
        transform: 'rotate(0)',
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
      for (let plan of plans) {
        $(`[data-${plan.name}-price]`).text(plan.month)
        $(`[data-${plan.name}-strikeout-price]`).hide()
      }
      current = 'MONTH'
    } else {
      for (let plan of plans) {
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
  $('#integration-tab-0').addClass('active');
  $('#integration-tab-0-content').addClass('active');
  var integrationTab = $('.integration-tab');
  var tabContent = $('.integration-tab-content');

  integrationTab.click(function() {
    var id = $(this).attr('id');
    var content_id = '#' + id + '-content'
    $(integrationTab).removeClass('active')
    $(tabContent).removeClass('active')
    $(this).addClass('active')
    $(content_id).addClass('active')
  })
})



 /**
 *Footer DropDown in Tablet&Mobile
 */
 $(document).ready(() => {
  var menuHeader = $('.menu_header');
  menuHeader.click(function() {
    var id = $(this).attr('id');
    const menu_header_id = '#' + id
    const menu_id = '#' + id + '_drop'
    if ($(menu_id).attr('class') === 'desktop-show') {
      $(menu_id).addClass('show')
      $(menu_header_id).addClass('rotate')
    } else {
      $(menu_id).removeClass('show')
      $(menu_header_id).removeClass('rotate')
    }
  })
})
