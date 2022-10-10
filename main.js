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

// timeline
// add to timeline
$('.add-timeline').on('contextmenu', function (event) {
  // 使用 attr('class') 找出 className，組合成<span>再 append 到 timeline
  event.preventDefault()

  $('.timeline-container').append(`<span>${$(this).attr('class').split(' ')[1].replace('control-btn-', '')}</span>`)
  return
})

// show timeline items
let items = []
let i = 0
$('.run-timeline').on('click', function () {
  // 把 <span> 夾帶的 className 找出來
  items = $('.timeline-container').html().trim().replace(/<span>/g, '').split('</span>')

  // trigger 其中第一個動畫
  i = triggerAnimation(i, items)
})
// 動畫結束時，如果 items 有東西，則 trigger 下一個動畫
$('body').on('animationend', function () {
  if (i < items.length - 1) {
    // 避免連續兩個相同的動畫，不會跑
    setTimeout(() => {
      i = triggerAnimation(i, items)
    }, 1)
  } else {
    i = 0
    items = []
  }
})
function triggerAnimation(i, items) {
  let event = new CustomEvent('click')
  let className = `.control-btn-${items[i]}`
  document.querySelector(`${className}`).dispatchEvent(event)
  return i = i + 1
}