export function b1(params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("b1 has been called")
      reject()
    }, 4000)
  })
}
