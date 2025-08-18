export function dayKeyLocal(d = new Date(), offset = 0) {
  const copy = new Date(d)                // clone so you don’t mutate
  copy.setDate(copy.getDate() + offset)   // properly handles month/year rollovers

  const y = copy.getFullYear()
  const m = String(copy.getMonth() + 1).padStart(2, '0')
  const dd = String(copy.getDate()).padStart(2, '0')

  return `${y}-${m}-${dd}`
}