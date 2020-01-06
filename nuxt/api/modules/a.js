export function a1(params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("a1 has been called")
      resolve()
    }, 3000)
  })
}

export function a2(params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("a2 has been called")
      resolve()
    }, 5000)
  })
}
