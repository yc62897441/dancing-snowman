$(function () {
  console.log('JQurey ready')
})

$('.control-btn-bounce').on('click', function () {
  $('.wrapper').addClass('animate__animated animate__bounce')
})

$('.control-btn-swing').on('click', function () {
  $('.wrapper').addClass('animate__animated animate__swing')
})

$('.control-btn-hinge').on('click', function () {
  $('.wrapper').addClass('animate__animated animate__hinge')
})

$('.control-btn-arm-wave').on('click', function () {
  $('.arm').addClass('arm-wave')
})


$('.wrapper').on('animationend', function () {
  $(this).removeClass('animate__animated animate__bounce')
  $(this).removeClass('animate__animated animate__swing')
  $(this).removeClass('animate__animated animate__hinge')
})

$('.arm').on('animationend', function () {
  $(this).removeClass('arm-wave')
})
