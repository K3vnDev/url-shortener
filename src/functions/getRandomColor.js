const colors = [
  '#3f2f83', '#2f8b52', '#9f2b4b',
  '#27388c', '#a3b52b', '#b5772b'
]

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
