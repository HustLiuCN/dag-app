import COLOR from './color'

const shape1 = {
  w: 160,
  h: 40,
  shape: 'default-shape-001',
  name: '无输入输出的矩形',
  color: COLOR.blue,
  anchors: {},
  category: '矩形',
}

const shape2 = {
  w: 160,
  h: 40,
  shape: 'default-shape-002',
  name: '一个输入两个输出的矩形',
  color: COLOR.green,
  anchors: {
    input: 1,
    output: 2,
  },
}

const shape3 = {
  w: 160,
  h: 40,
  shape: 'default-shape-003',
  name: '两个输入一个输出的矩形',
  color: COLOR.red,
  anchors: {
    input: 2,
    output: 1,
  },
}

const list = [shape1, shape2, shape3]
export default list
