// Simulate AJAX request using sessionStorage for data
export function fetchTimers(amount = 1) {
  return new Promise((resolve) => {
    setTimeout(() => {      
      const timers = sessionStorage.timers || "[]"
      console.log(JSON.parse(timers))
      resolve({ data: JSON.parse(timers) })
    }, 500)
  })
}
