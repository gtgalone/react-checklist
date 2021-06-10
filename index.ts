import { useState } from 'react';

export interface ChecklistOptions {
  key?: string | undefined
  keyType?: 'string' | 'number' | undefined
}

/**
 * 
 * @param data item list for check. https://github.com/gtgalone/react-checklist#data
 * @param options option for check. https://github.com/gtgalone/react-checklist#options
 * @returns return properties. https://github.com/gtgalone/react-checklist#return
 */
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
      e.stopPropagation();
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
