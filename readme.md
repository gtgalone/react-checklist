# react-checklist [![Build Status](https://travis-ci.org/gtgalone/react-checklist.svg?branch=master)](https://travis-ci.org/gtgalone/react-checklist)

React Hook Checkbox List. This module targets Node.js 6 or later.


## Install

```
$ npm install react-checklist
```


## Usage

### Basic
```jsx
import { useChecklist } from 'react-checklist';
// or const { useChecklist } = require('react-checklist');

const data = [
  { _id: 1, label: 'item 1' },
  { _id: 2, label: 'item 2' },
  { _id: 3, label: 'item 3' },
]

export default () => {
  const { handleCheck, isCheckedAll, checkedItems } = useChecklist(data, { key: '_id' });

  return (
    <ul>

      <li>
        <input
          type="checkbox"
          onChange={handleCheck}              // 1
          checked={isCheckedAll}              // 2
        />
        <label>label</label>
      </li>

      {data.map((v, i) => (
        <li key={i}>
          <input
            type="checkbox"
            data-key={v._id}                  // 3
            onChange={handleCheck}            // 4
            checked={checkedItems.has(v._id)} // 5
          />
          <label>{v.label}</label>
        </li>
      ))}

    <ul>
  );
};
```
---
### Without Checkbox
```jsx
<ul>

  <li>
    <button onClick={handleCheck}>
      {isCheckedAll ? 'Cancel' : 'Check All'}
    </button>
  </li>

  {data.map((v, i) => (
    <li key={i}>
      <span
        data-key={v._id}
        onClick={handleCheck}
        style={{ backgroundColor: checkedItems.has(v._id) ? 'hotpink' : 'white' }}
      >
        {v.label}
      </span>
    </li>
  ))}

<ul>
```
---
### With Reset Button
```jsx

export default () => {
  const { setCheckedItems } = useChecklist(data);

  const handleReset = () => setCheckedItems(new Set());

  return (
    <ul>

      <li>
        <button onClick={handleReset}>
          Reset
        </button>
      </li>

    <ul>
  );
};
```

## Parameters
### useChecklist(data, options)
### data
Item list for check.\
Type: `Array`

### options
Type: `Object`

- `key`\
  Unique key of item list for check.\
  Type: `String`\
  Default: `'id'`


## Return

### isCheckedAll
Check all item reference.\
Type: `Boolean`

### checkedItems
Set of checked items.\
Type: `Set`

### setCheckedItems
Function for setting checkedItems state.\
You can handling checked items for `onRouteChanged` Event with this function.\
Type: `(Set) => void`

### handleCheck
Trigger onChange event for item list.\
Type: `(Event) => void`

## Maintainer

- [Jehun Seem](https://github.com/gtgalone)


## License

MIT
