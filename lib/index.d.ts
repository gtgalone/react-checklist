import { RefObject } from 'react';
export declare const useChecklist: (data: any[]) => {
    checkAllRef: RefObject<any>;
    checkedItem: Set<any>;
    setCheckedItem: import("react").Dispatch<import("react").SetStateAction<Set<any>>>;
    handleChange: (e: any) => void;
};
