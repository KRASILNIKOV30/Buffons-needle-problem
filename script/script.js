const canvas = document.getElementById('canvas')
const canvasContext = canvas.getContext('2d')

const GAME = {
    width: canvas.width,
    height: canvas.height,
    background: '#ffeedd'
}

const drawBackground = () => {
    canvasContext.fillStyle = GAME.background
    canvasContext.fillRect(0, 0, GAME.width, GAME.height)
}

drawBackground()