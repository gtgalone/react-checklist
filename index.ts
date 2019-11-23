import { useState } from 'react';

export interface ChecklistOptions {
  key?: string | undefined
  keyType?: 'string' | 'number' | undefined
}

export const useChecklist = (data: any[], options: ChecklistOptions = { key: 'id', keyType: 'string' }) => {
  const [checkedItems, setCheckedItems]:
    [Set<number | string>, (set: Set<number | string>) => void] = useState(new Set());

  if (!(data instanceof Array)) { data = []; }
  if (options === null) { options = {}; }
  if (!options.key) { options.key = 'id'; }
  if (!options.keyType) { options.keyType = 'string'; }

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
      setCheckedItems(new Set(data.map((v) => v[options.key!])));
    },
  };
};
