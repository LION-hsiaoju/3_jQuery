export function priceToLocaleSting(price) {
  price.forEach((price) => {
    const value = Number(price.textContent)
    const formattedPrice = value.toLocaleString('zh-tw', {
      style: 'currency',
      currency: 'TWD',
      maximumFractionDigits: 0
    })
    price.innerHTML = formattedPrice + `<span class="price-span"> 起</span>`
  })
}

export function debounce(func, wait, immediate) {
  let timeout
  return () => {
    const context = this
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, arguments)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, arguments)
  }
}
