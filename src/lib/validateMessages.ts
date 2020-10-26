const typeTemplate = "${label} 不是一个 ${type}";

export const defaultValidateMessages = {
  default: "${label} 字段输入不合规",
  required: "${label} 为必填项",
  enum: "${label} must be one of [${enum}]",
  whitespace: "${label} 不能为空",
  date: {
    format: "${label} 为无效的时间格式",
    parse: "${label} 为无效的时间格式",
    invalid: "${label} 不在时间范围内",
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: "${label} must be exactly ${len} characters",
    min: "${label} must be at least ${min} characters",
    max: "${label} cannot be longer than ${max} characters",
    range: "${label} must be between ${min} and ${max} characters",
  },
  number: {
    len: "${label} must equal ${len}",
    min: "${label} cannot be less than ${min}",
    max: "${label} cannot be greater than ${max}",
    range: "${label} must be between ${min} and ${max}",
  },
  array: {
    len: "${label} must be exactly ${len} in length",
    min: "${label} cannot be less than ${min} in length",
    max: "${label} cannot be greater than ${max} in length",
    range: "${label} must be between ${min} and ${max} in length",
  },
  pattern: {
    mismatch: "${label} does not match pattern ${pattern}",
  },
}
