import COLOR from './color'

const shape1 = {
  w: 160,
  h: 40,
  shape: 'default-shape-001',
  name: '无输入输出的矩形',
  color: COLOR.blue,
  anchors: [],
  category: '矩形',
}

const shape2 = {
  w: 160,
  h: 40,
  shape: 'default-shape-002',
  name: '一个输入两个输出的矩形',
  color: COLOR.green,
  anchors: [
    [.5, 0, 'input'],
    [.3, 1, 'output'],
    [.7, 1, 'output'],
  ],
}

const list = [shape1, shape2]
export default list
