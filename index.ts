import { useState } from 'react';

export const useChecklist = (data: any[] = [], options: { key: string, keyType: 'string' | 'number' } = { key: 'id', keyType: 'string' }) => {
  const [checkedItems, setCheckedItems]:
    [Set<number | string>, (set: Set<number | string>) => void] = useState(new Set());
  return {
    isCheckedAll: (data.length === 0) ? false : (checkedItems.size === data.length),
    checkedItems,
    setCheckedItems,
    handleCheck: (e) => {
      let key = e.currentTarget.dataset.key;
      if (key) {
        if (options.keyType === 'number') {
          key = parseInt(key, 10);
        }
        if (checkedItems.has(key)) {
          checkedItems.delete(key);
        } else {
          checkedItems.add(key);
        }
        return setCheckedItems(new Set(checkedItems));
      }
      if (checkedItems.size === data.length) {
        return setCheckedItems(new Set());
      }
      setCheckedItems(new Set(data.map((v) => v[options.key])));
    },
  };
};
