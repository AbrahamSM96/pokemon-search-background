form.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
  event.preventDefault()
  const data = new FormData(form)
  const id = data.get('id')
  const pokemon = await getPokemon(id)
  renderPokemon(pokemon)
  console.log(pokemon)
}

async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const pokemon = await response.json()
  return pokemon
}

const ctx = canvas.getContext('2d')
const image = new Image()
image.setAttribute('crossOrigin', 'anonymous')

function renderPokemon(pokemon) {
  image.setAttribute('src', pokemon.sprites.front_default)
  image.addEventListener('load', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    const colors = getColorPalette(ctx)
    updateProperties(colors)
  })
}

function getColorPalette(ctx) {
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
  const quality = 90
  const colors = []
  for (let i = 0; i < canvas.width * canvas.height; i = i + quality) {
    const offset = i * 4
    const alpha = imgData[offset + 3]
    if (alpha > 0) {
      const red = imgData[offset]
      const green = imgData[offset + 1]
      const blue = imgData[offset + 2]
      colors.push({ red, green, blue })
      console.log(
        '%c color',
        `background: rgba(${red}, ${green}, ${blue})`,
        colors
      )
    }
  }
  return colors
}

function updateProperties(colors) {
  document.body.style.setProperty(
    '--primary',
    `rgb(${colors[0].red}, ${colors[0].green}, ${colors[0].blue})`
  )
  document.body.style.setProperty(
    '--secondary',
    `rgb(${colors[2].red}, ${colors[2].green}, ${colors[2].blue})`
  )
  document.body.style.setProperty(
    '--tertiary',
    `rgb(${colors[3].red}, ${colors[3].green}, ${colors[3].blue})`
  )
}
