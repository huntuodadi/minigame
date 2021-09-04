
// setTimeout(() => {
//   process.nextTick(() => {
//     console.log('next tick')
//   })
//   console.log('timeout')
//   setTimeout(() => {
//     console.log('inner timeout')
//   }, 0)
//   setImmediate(() => {
//     console.log('inner immediate')
//   })

// }, 0)
// Promise.resolve().then(() => {
//   console.log('promise')
// })

// process.nextTick(() => {
//   console.log('tick')
// })

Promise.resolve().then(() => {
  console.log('promise')
})

setImmediate(() => {
  console.log('immediate')
})
