import tab from './pieces.1.json'
import pieces from './pieces.json'

export const initialTetriState = (count) => {
	const name = pieces.pieces[count]
	const tetri = {
		maxWidth: tab[name].position[0].maxWidth,
		maxHeight: tab[name].position[0].maxHeight,
		h: tab[name].position[0].height,
		type: tab[name].type,
		name: name,
		width: tab[name].position[0].width,
		x: 3,
		y: 0,
		leftSpace: tab[name].position[0].leftSpace,
		rightSpace: tab[name].position[0].rightSpace,
		downSpace: tab[name].position[0].downSpace,
		rot: 0,
		form: tab[name].position[0].form,
		color: tab[name].color,
	}
	return(tetri)
}

export const initialBoardState = () => ({
	tab: [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	],
	tetriList: []
})