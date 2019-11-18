import { useState } from 'react';

export const useChecklist = (data: any[] = [], options: { key: string } = { key: 'id' }) => {
  const [checkedItems, setCheckedItems]:
    [Set<number | string>, (set: Set<number | string>) => void] = useState(new Set());
  return {
    isCheckedAll: checkedItems.size === data.length,
    checkedItems,
    setCheckedItems,
    handleCheck: (e) => {
      const { key } = e.currentTarget.dataset;
      if (key) {
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
