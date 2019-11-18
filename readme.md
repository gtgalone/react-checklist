# react-checklist [![Build Status](https://travis-ci.org/gtgalone/react-checklist.svg?branch=master)](https://travis-ci.org/gtgalone/react-checklist)

React Hook Checkbox List. This module targets Node.js 6 or later.


## Install

```
$ npm install react-checklist
```


## Usage

```jsx
import { useChecklist } from 'react-checklist';
// or const { useChecklist } = require('react-checklist');

const data = [
  { id: 1, label: 'item 1' },
  { id: 2, label: 'item 2' },
  { id: 3, label: 'item 3' },
]

export default () => {
  const { handleChange, checkAllRef, checkedItem } = useChecklist(data);

  return (
    <ul>

      <li>
        <input
          type="checkbox"
          ref={checkAllRef}                 // 1
        />
        <label>label</label>
      </li>

      {data.map((v, i) => (
        <li key={i}>
          <input
            type="checkbox"
            data-id={v.id}                  // 2
            onChange={handleChange}         // 3
            checked={checkedItem.has(v.id)} // 4
          />
          <label>{v.label}<label>
        </li>
      ))}

    <ul>
  );
};
```


## API

### checkAllRef

Type: `RefObject`\
Check all item reference.

### checkedItem

Type: `Set`\
Set of checked item.

### setCheckedItem

Type: `(Set) => void`\
'setState' function for checkedItem.

### handleChange

Type: `(Event) => void`\
Trigger onChange event for item list.

## Maintainer

- [Jehun Seem](https://github.com/gtgalone)


## License

MIT
