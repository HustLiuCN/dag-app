import { Editor } from 'simple-dag-editor'
import { Shapes } from 'src/store/shape'
import { ShapeEditor } from 'src/views/dialog/shape-editor'

export function serialiseFormToShape(form: ShapeEditor.IForm): Shapes.IShape {
	const { input, output } = form
	const inputs = countToAnchors(input || 0, 'input')
	const outputs = countToAnchors(output || 0, 'output')
	return {
		...form,
		anchors: [
			...inputs,
			...outputs,
		],
	}
}

function countToAnchors(count: number, type: 'input' | 'output'): Editor.IAnchor[] {
	const anchors = []
	const d = 1 / (count + 1)
	for (let i = 0; i < count; i ++) {
		let anchor: Editor.IAnchor = [
			d * (i + 1),
			type === 'output' ? 1 : 0,
			type,
		]
		anchors.push(anchor)
	}
	return anchors
}
