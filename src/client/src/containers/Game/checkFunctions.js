export const removeLine = (num, updateBoard, board) => {
	updateBoard((old)=>{
		num.map((n)=>{
			board.splice(n, 1) 
			board.splice(0, 0, [0,0,0,0,0,0,0,0,0,0])
			return num 
		})
		return old
	})
}

export const checkLine = (board, displayUpdate, rows, updateBoard, emitLinesToOpponents) => {
	let lines = []
	board.map((line, y)=>{
		if (line.every((num) => {return num > 0 && num < 8})){
			lines.push(y)
		}
		return true
	})
	if (lines.length){
		removeLine(lines, updateBoard, board)
		displayUpdate(rows, lines.length)
		emitLinesToOpponents(lines.length)
	}
}

export const gameLoop = (moveTetri, canFit, setCanMove, keyDown,
	 clearInterval, updateBoard, initialTetriState, increment,
	  setNext, setGameOver, board, refInterval, counter, data, tab, setLineAdd) => {
	moveTetri((tetri)=>{
		if (!canFit(board, {...tetri, y: tetri.y + 3})) setLineAdd(false)
		if (!canFit(board, {...tetri, y: tetri.y + 1})){
			setCanMove(true)
			keyDown.current = null
			clearInterval(refInterval.current)
			updateBoard((old)=>{
				tetri.form.forEach((line, y)=>{
					line.forEach((col, x)=>{
						if (tetri.form[y][x] > 0){
							old[tetri.y + y][tetri.x + x] = tetri.form[y][x]
						}
					})
				})
				return old
			})
			setLineAdd(true)
			const t = initialTetriState(counter + 1, data);
			increment((i)=>{
				if (data && data[i+2]) setNext(tab[data[i+2]])
				return i+1
			})
			if (t === false || !canFit(board, t)){
				setGameOver()
				return tetri
			} else return t
		}
		else return {...tetri, y: tetri.y + 1}
	})
}

export const reset = (increment, updateScore, setLevel, setRows, setDropTime,
	 moveTetri, initialTetriState, data, tab, overGame, setNext) => {
	increment(0)
	updateScore(0)
	setLevel(0)
	setRows(0)
	setDropTime(1000);
	moveTetri(initialTetriState(0), data);
	if (data && data[1]) setNext(tab[data[1]])
		else setNext(null)
	overGame(false)
}