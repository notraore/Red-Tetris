export const removeLine = (num, tab, updateBoard, board) => {
	let newTab = tab
	num.map((n)=>{
		newTab.splice(n, 1) 
		newTab.splice(0, 0, [0,0,0,0,0,0,0,0,0,0])
		return num
	})
	updateBoard({tetriList: board.tetriList, tab:newTab})
}

export const checkLine = (board, displayUpdate, rows, updateBoard) => {
	let tab = board.tab
	let lines = []
	tab.map((line, y)=>{
			if (line.every((num) => {return num > 0})){
					lines.push(y)
			}
			return tab
	})
	if (lines.length){
			removeLine(lines, tab, updateBoard, board)
			displayUpdate(rows, lines.length);
	}
}

export const gameLoop = (moveTetri, canFit, setCanMove, keyDown,
	 clearInterval, updateBoard, initialTetriState, increment,
	  setNext, overGame, board, refInterval, counter, data, tab) => {
	moveTetri((tetri)=>{
		if (!canFit(board.tab, {...tetri, y: tetri.y + 1})){
			setCanMove(true)
			keyDown.current = null
			clearInterval(refInterval.current)
			updateBoard((old)=>{
				tetri.form.forEach((line, y)=>{
					line.forEach((col, x)=>{
						if (tetri.form[y][x] > 0){
							old.tab[tetri.y + y][tetri.x + x] = tetri.form[y][x]
						}
					})
				})
				return old
			})
			const t = initialTetriState(counter + 1, data);
			increment((i)=>{
				setNext(tab[data[i+2]])
				return i+1
			})
			if (t === false || !canFit(board.tab, t)){
				overGame(true)
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
	setNext(tab[data[1]]);
	overGame(false)
}