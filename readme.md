# react-checklist

React Hook Checkbox List. This module targets Node.js 6 or later.

## Install

```
$ npm install react-checklist
```

## Usage

```jsx
const { useChecklist } = require('react-checklist');

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
					ref={checkAllRef}
				/>
				<label>label</label>
			</li>
			{data.map((v, i) => (
				<li key={i}>
					<input
						type="checkbox"
						data-id={v.id}
						onChange={handleChange}
						checked={checkedItem.has(v.id)}
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

Type: `RefObject`

### checkedItem

Type: `Set`
