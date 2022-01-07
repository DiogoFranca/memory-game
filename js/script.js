const container = document.querySelector('.container')
const card = document.querySelector('.card')
const btn = document.querySelector('.btn')

const images = [
  { id: 'cafe', image: 'assets/cafe.jpg' },
  { id: 'death', image: 'assets/death.jpg' },
  { id: 'kakashi', image: 'assets/kakashi.jpg' },
  { id: 'luffy', image: 'assets/luffy.jpg' },
  { id: 'luffy2', image: 'assets/luffy2.jpg' },
  { id: 'red', image: 'assets/red.jpg' }
]

Array.prototype.shuffle = function () {
  let index = images.length

  while (index) {
    const indexAleatorio = Math.floor(Math.random() * index--)
    ;[images[index], images[indexAleatorio]] = [
      images[indexAleatorio],
      images[index]
    ]
  }
}

images.shuffle()

images.forEach(obj => {
  const { id } = obj

  if (id === 'red') {
    card.setAttribute('id', id)
    return
  }

  const newCard = card.cloneNode(false)

  newCard.setAttribute('id', id)
  container.appendChild(newCard)
})

let clicks = 0
let score = 0
let failed = 0

const [scoreDados, failedDados] = pegaDadosSalvo()
console.log(failedDados);

score = scoreDados
failed = failedDados
atualizaDados()

document.addEventListener('click', e => {
  const el = e.target

  if (el.classList.contains('card')) {
    clicks++

    const idCard = el.getAttribute('id')
    const getCard = document.querySelector(`#${idCard}`)
    const img = createImg()

    for (let { id, image } of images) {
      if (id === idCard) {
        img.src = image

        if (id === 'luffy' || id === 'luffy2') {
          img.setAttribute('class', 'luffy')
        }

        img.setAttribute('id', id)
        break
      }
    }

    getCard.appendChild(img)
  }

  if (clicks === 2) {
    const imgs = document.querySelectorAll('img')
    const img1 = imgs[0].getAttribute('class')
    const img2 = imgs[1].getAttribute('class')

    if (img1 && img2) {
      score = Number(score) + 10;
      salvaDados()
      setTimeout(() => {
        alert('Matching pieces!!!')
        location.reload()
      }, 1000)
    } else {
      failed++;
      clicks = 0;
      salvaDados()
      setTimeout(() => {
        imgs[0].remove();
        imgs[1].remove();
        atualizaDados();
      }, 1000)
    }
  }

  if (el.classList.contains('btn')) {
    limpaLocalStorage()
  }
})

function createImg() {
  const img = document.createElement('img')
  return img
}

function salvaDados() {
  localStorage.setItem('score', score)
  localStorage.setItem('failed', failed)
}

function pegaDadosSalvo() {
  const scoreDados = localStorage.getItem('score')
  const failedDados = localStorage.getItem('failed')
  console.log(failedDados);

  if (!scoreDados && !failedDados) return [0, 0]

  return [scoreDados, failedDados]
}

function atualizaDados() {
  const p = document.querySelector('.score')
  const secondP = document.querySelector('.failed')

  p.innerText = `Score: ${score}`
  secondP.innerText = `Failed: ${failed}`
  return
}

function limpaLocalStorage() {
  localStorage.removeItem('score')
  localStorage.removeItem('failed')
  score = 0
  failed = 0
  atualizaDados()
}
