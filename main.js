$(function () {
  console.log('JQurey ready')
})

// 設置動畫啟動的事件監聽器
setEventListener()
function setEventListener() {
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
}

// 設置動畫結束的事件監聽器
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
  event.preventDefault()

  // 使用 attr('class') 找出 className，組合成<span>再 append 到 timeline
  const eventName = $(this).attr('class').replace('control-btn', '').replace('add-timeline', '').trim()
  $('.timeline-container').append(`<span class="timeline-item ${eventName}">${$(this).attr('class').split(' ')[1].replace('control-btn-', '')}</span>`)

  // 重新啟動動畫啟動的事件監聽器
  setEventListener()

  // 重新安置刪除事件的監聽器到上行新增的元素上。如果沒有重新call一次函數，則點擊 timeline-item 元素時無法觸發刪除
  removeTimelineItem()
  return
})

// remove from timeline
function removeTimelineItem() {
  $('.timeline-item').on('contextmenu', function (event) {
    event.preventDefault()
    $(this).remove()
  })
}
removeTimelineItem()

// show timeline items
let items = []
let i = 0
$('.run-timeline').on('click', function () {
  // 把 <span> 夾帶的 className 找出來
  items = $('.timeline-container').html().trim().replace(/<span class="timeline-item /g, '').split('</span>')
  items = items.map(item => {
    return item.split('"')[0]
  })

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
  let className = items[i]
  document.querySelector(`.${className}`).dispatchEvent(event)
  return i = i + 1
}
