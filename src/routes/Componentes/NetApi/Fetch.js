var Fetch = (fetchPromise, timeout = 5000) => {
  var abortFn = null

  var abortPromise = new Promise(function (resolve, reject) {
    abortFn = function () {
      reject('abort promise')
    }
  })
      // 这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
  var abortablePromise = Promise.race([
    fetchPromise,
    abortPromise
  ])

  setTimeout(function () {
    abortFn()
  }, timeout)

  return abortablePromise
}

export default Fetch
