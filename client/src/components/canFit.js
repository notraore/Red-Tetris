export const canFit = (map, tetri) => {
	let res = true

	tetri.form.map((line, y)=>{
		line.map((col, x)=>{
			if (col > 0 && ((!map[tetri.y + y] || (map[tetri.y + y][tetri.x + x] > 0) ||
				tetri.x + x > 9 + tetri.rightSpace ||
				tetri.x + x < 0 - tetri.leftSpace ||
				typeof map[tetri.y + y][tetri.x + x] === 'undefined'))){
					res = false
			}
		})
	})
	return res
}
