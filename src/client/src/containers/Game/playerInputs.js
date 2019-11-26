export const checkPlayerInputs = (canFit, board, setCanMove, refInterval, tab, moveTetri, setGameLoop, event) => {
	if (event.keyCode === 39) {//DROITE
		moveTetri((tetri)=>{
				if (canFit(board, {...tetri, x: tetri.x + 1})) return {...tetri, x: tetri.x + 1}
				else return tetri
		})
	}
	if (event.keyCode === 37) {//GAUCHE
		moveTetri((tetri)=>{
				if (canFit(board, {...tetri, x: tetri.x - 1})) return {...tetri, x: tetri.x - 1}
				else return tetri
		})
	}
	if (event.keyCode === 40) {//BAS
		clearInterval(refInterval.current)
		refInterval.current = setGameLoop(30)
	}
	if (event.keyCode === 32) {//ESPACE
		setCanMove(false)
		clearInterval(refInterval.current)
		refInterval.current = setGameLoop(15)
	}
	if (event.keyCode === 38) {//HAUT (rotation)
		moveTetri(tetri => {
			const rot = tetri.rot > 2 ? 0 : tetri.rot + 1
			const tetriRot = {//tetri potentiel apres rotation demandée
					...tetri,
					form: tab[tetri.name].position[rot].form,
					rot: rot,
					h: tab[tetri.name].position[rot].height,
					leftSpace: tab[tetri.name].position[rot].leftSpace,
					rightSpace: tab[tetri.name].position[rot].rightSpace,
					downSpace: tab[tetri.name].position[rot].downSpace,
					maxHeight: tab[tetri.name].position[rot].maxHeight,
					maxWidth: tab[tetri.name].position[rot].maxWidth,
					width: tab[tetri.name].position[rot].width,
					height: tab[tetri.name].position[rot].height,
			}
			if (canFit(board, tetriRot)){//si ya la place de faire une rotation
					return tetriRot
			} else return tetri
		})
	}
}