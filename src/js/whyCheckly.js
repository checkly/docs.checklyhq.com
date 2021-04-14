/**
 * Why-Checkly Video
 */

$(document).ready(function(){
  var screenwidth = $(window).width();

  function showPlayButton() {
    $('.video-play').css({
      display: "block"
    });
    $('.video-pause').css({
      display: "none"
    });
  }

  function showPauseButton() {
    $('.video-play').css({
      display: "none"
    });
    $('.video-pause').css({
      display: "block"
    });
  }

  function videoPlay(width) {
    var why_checkly_video = $('#why-checkly-video').get(0);

    if (width > 920) {
      var videoDistance = $("#why-checkly-video").offset().top - 200;
      
      $(window).on('scroll', function() {
        if ($(window).scrollTop() >= videoDistance && $(window).scrollTop() < videoDistance + 200) {
          why_checkly_video.play();
          $('.action-button').css({
            display: "none"
          });
        } else {
          why_checkly_video.pause();
          showPlayButton();
        }
      })

      $('.video-wrapper').mouseenter(function(){
        if (why_checkly_video.paused) {
          showPlayButton();
          
        } else {
          showPauseButton();
        }
      })
      $('#why-checkly-video').click(function () {
        if (why_checkly_video.paused) {
          why_checkly_video.play();
          showPauseButton();
        } else {
          why_checkly_video.pause();
          showPlayButton();
        }
      })
      $('.video-wrapper').mouseleave(function() {
        if (why_checkly_video.paused) {
          showPlayButton();
        } else {
          $('.action-button').css({
            display: "none"
          });
        }
      })
      $('.video-pause').click(function () {
        why_checkly_video.pause();
        showPlayButton();
      })
      $('.video-play').click(function () {
        why_checkly_video.play();
        showPauseButton();
      })
    } else {
      why_checkly_video.pause()
      
      $('.video-play').click(function () {
        why_checkly_video.play();
        
        $('.video-play').css({
          display: "none"
        });
      })
      $('#why-checkly-video').click(function () {
        why_checkly_video.pause();
        
        $('.video-play').css({
          display: "block"
        });
      })
    }
  } 

  
  videoPlay(screenwidth)

  $(window).resize(function() {
    screenwidth = $(window).width();
    videoPlay(screenwidth)
  })

})


/**
 * Why-Checkly Code Block
 */

$(document).ready(() => {
  var currentSelection = $('#why-checkly-select').val();
  $('#why-checkly-select').change(function() {
    currentSelection = $('#why-checkly-select').val();
    var codeblock = $(".code-block").map(function() {
      if ($(this).attr('id') === currentSelection) {
        $(this).css({
          display: 'block',
        })
      } else {
        $(this).css({
          display: 'none',
        })
      }
    })
  })
})