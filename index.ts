import { useRef, useState, useEffect, RefObject } from 'react';
import { Router } from 'next/router';

export const useChecklist = (data: any[]) => {
  const checkAllRef: RefObject<any> = useRef();
  const [checkedItem, setCheckedItem] = useState(new Set());

  useEffect(() => {
    if (!checkAllRef.current) {
      return;
    }

    checkAllRef.current.onchange = () => {
      if (checkedItem.size === data.length || checkAllRef.current.checked === false) {
        setCheckedItem(new Set());
      } else {
        setCheckedItem(new Set(data.map(v => v.index)));
      }
    };

    const resetCheckBox = () => {
      checkAllRef.current.checked = false;
      setCheckedItem(new Set());
    };

    Router.events.on('routeChangeComplete', resetCheckBox);
    return () => {
      Router.events.off('routeChangeComplete', resetCheckBox);
    };
  });

  return {
    checkAllRef,
    checkedItem,
    setCheckedItem,
    handleChange: e => {
      const { id } = e.currentTarget.dataset;
      if (checkedItem.has(id)) {
        checkedItem.delete(id);
      } else {
        checkedItem.add(id);
      }
      setCheckedItem(new Set(checkedItem));
      if (!checkAllRef.current) {
        return;
      }
      if (checkAllRef.current.checked) {
        checkAllRef.current.checked = false;
      }
      if (checkedItem.size === data.length) {
        checkAllRef.current.checked = true;
      }
    },
  };
};
