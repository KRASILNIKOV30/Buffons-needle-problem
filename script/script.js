window.addEventListener('load', () => {
    const canvasWidth = window.screen.width
    const canvasHeight = 400

    const canvas = document.getElementById('canvas')
    const canvasContext = canvas.getContext('2d')
    const buttons = document.querySelectorAll('.control-block__buttons-panel__button')
    const controlBlockInfoMain = document.getElementById('controlBlockInfoMain')
    const controlBlockInfoSub = document.getElementById('controlBlockInfoSub')
    const controlBlockInfoResult = document.getElementById('controlBlockInfoResult')

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    const GAME = {
        width: canvasWidth,
        height: canvasHeight,
        background: '#ffeedd',
        matchesOnLineNumber: 0,
        matchesNumber: 0
    }

    const LINE = {
        number: 4,
        color: '#1a1a1a',
        height: 1
    }

    const MATCH = {
        length: GAME.height / (LINE.number + 1) / 2,
        mainColor: '#7c5735',
        accentColor: '#a90a0a',
        width: 1,
        radius: 3
    }

    const drawBackground = () => {
        canvasContext.fillStyle = GAME.background
        canvasContext.fillRect(0, 0, GAME.width, GAME.height)
    }

    const drawLines = () => {
        canvasContext.fillStyle = LINE.color
        for (let i = 1; i <= LINE.number; i++) {
            canvasContext.fillRect(0, GAME.height / (LINE.number + 1) * i, GAME.width, LINE.height)
        }
    }

    const throwMatches = (number) => {
        for(let i = 0; i < number; i++) {
            GAME.matchesNumber++
            const startPoint = getRandomPoint()
            const endPoint = getEndPoint(startPoint)
            drawMatch(startPoint, endPoint)
            if (isMatchOnLine(startPoint.y, endPoint.y)) {
                GAME.matchesOnLineNumber++
            }
        }
    }

    const getEndPoint = (startPoint) => {
        const angle = getRandomAngle()
        const x = startPoint.x + MATCH.length * Math.cos(angle)
        const y = startPoint.y + MATCH.length * Math.sin(angle)
        return { x, y }
    }

    const getRandomPoint = () => {
        return {
            x: GAME.width * Math.random(),
            y: GAME.height * Math.random()
        }
    }

    const getRandomAngle = () => {
        return 2 * Math.PI * Math.random()
    }

    const drawMatch = (start, end) => {
        canvasContext.strokeStyle = MATCH.mainColor
        canvasContext.fillStyle = MATCH.accentColor
        canvasContext.strokeWidth = MATCH.width
        canvasContext.beginPath()
        canvasContext.arc(end.x, end.y, MATCH.radius, 0, 2 * Math.PI)
        canvasContext.moveTo(start.x, start.y)
        canvasContext.lineTo(end.x, end.y)
        canvasContext.closePath()
        canvasContext.stroke()
        canvasContext.fill()
    }

    const isMatchOnLine = (startY, endY) => {
        return getSectionNumber(startY) !== getSectionNumber(endY)
    }

    const getSectionNumber = (y) => {
        return Math.floor(y / (GAME.height / (LINE.number + 1)))
    }

    const initButtons = () => {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                throwMatches(button.value)
                updatePageInfo()
            })
        })
    }

    const updatePageInfo = () => {
        controlBlockInfoMain.textContent = GAME.matchesNumber
        controlBlockInfoSub.textContent = GAME.matchesOnLineNumber
        controlBlockInfoResult.textContent = (GAME.matchesNumber / GAME.matchesOnLineNumber).toString()
    }

    const drawFrame = () => {
        drawBackground()
        drawLines()
        initButtons()
    }

    drawFrame()
}, { once: true })

