/**
 * Product Video
 */

$(document).ready(function () {
  var screenwidth = $(window).width()

  function showPlayButton () {
    $('.video-play').css({
      display: 'block'
    })
    $('.video-pause').css({
      display: 'none'
    })
  }

  function showPauseButton () {
    $('.video-play').css({
      display: 'none'
    })
    $('.video-pause').css({
      display: 'block'
    })
  }

  function videoPlay (width) {
    var whyChecklyVideo = $('#synthetic-monitoring-video').get(0)

    if (width > 920) {
      var videoDistance = $('#synthetic-monitoring-video').offset().top - 200

      $(window).on('scroll', function () {
        if ($(window).scrollTop() >= videoDistance && $(window).scrollTop() < videoDistance + 200) {
          whyChecklyVideo.play()
          $('.action-button').css({
            display: 'none'
          })
        } else {
          whyChecklyVideo.pause()
          showPlayButton()
        }
      })

      $('.video-wrapper').mouseenter(function () {
        if (whyChecklyVideo.paused) {
          showPlayButton()
        } else {
          showPauseButton()
        }
      })
      $('#synthetic-monitoring-video').click(function () {
        if (whyChecklyVideo.paused) {
          whyChecklyVideo.play()
          showPauseButton()
        } else {
          whyChecklyVideo.pause()
          showPlayButton()
        }
      })
      $('.video-wrapper').mouseleave(function () {
        if (whyChecklyVideo.paused) {
          showPlayButton()
        } else {
          $('.action-button').css({
            display: 'none'
          })
        }
      })
      $('.video-pause').click(function () {
        whyChecklyVideo.pause()
        showPlayButton()
      })
      $('.video-play').click(function () {
        whyChecklyVideo.play()
        showPauseButton()
      })
    } else {
      whyChecklyVideo.pause()

      $('.video-play').click(function () {
        whyChecklyVideo.play()

        $('.video-play').css({
          display: 'none'
        })
      })
      $('#synthetic-monitoring-video').click(function () {
        whyChecklyVideo.pause()

        $('.video-play').css({
          display: 'block'
        })
      })
    }
  }

  videoPlay(screenwidth)

  $(window).resize(function () {
    screenwidth = $(window).width()
    videoPlay(screenwidth)
  })
})
