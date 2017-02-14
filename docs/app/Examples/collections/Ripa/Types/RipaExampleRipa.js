import React from 'react'
import Ripa from 'src/collections/Ripa'

const onChange = () => { window.console.warn('Tab changed; external callback triggered.') }

const labels = [
  { k: 'foo', v: 'The Foo' },
  { k: 'bar', v: 'A Bar' },
  { k: 'baz', v: 'Some Baz' },
]

const RipaExample = () => {
  return (
    <div>
      <Ripa
        title="Test Title"
        onChange={onChange}
        labels={labels}
      />
    </div>
  )
}

export default RipaExample
