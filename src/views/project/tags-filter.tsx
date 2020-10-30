import { Tag } from 'antd'
import React, { useState } from 'react'

const TagsFilter = ({
  tags,
  change,
}: {
  tags: string[],
  change(tags: string[]): void,
}) => {
  const [checkList, setChecked] = useState<string[]>([])

  const toggle = (tag: string, checked: boolean) => {
    let tmp = checkList.slice()
    if (checked) {
      tmp.push(tag)
    } else {
      const i = checkList.indexOf(tag)
      i > -1 && (tmp.splice(i, 1))
    }
    setChecked(tmp)
    change(tmp)
  }

  return (
    <div className="tags-filter">
      <div className="label">标签:</div>
      <div className="tags-list">
        {
          tags.map((t, i) => (
            <Tag.CheckableTag
              key={ t + i }
              checked={ checkList.indexOf(t) > -1 }
              onChange={ checked => toggle(t, checked) }
              >
              { t }
            </Tag.CheckableTag>
          ))
        }
      </div>
    </div>
  )
}

export default TagsFilter
