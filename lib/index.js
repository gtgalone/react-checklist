"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var router_1 = require("next/router");
exports.useChecklist = function (data) {
    var checkAllRef = react_1.useRef();
    var _a = react_1.useState(new Set()), checkedItem = _a[0], setCheckedItem = _a[1];
    react_1.useEffect(function () {
        if (!checkAllRef.current) {
            return;
        }
        checkAllRef.current.onchange = function () {
            if (checkedItem.size === data.length || checkAllRef.current.checked === false) {
                setCheckedItem(new Set());
            }
            else {
                setCheckedItem(new Set(data.map(function (v) { return v.index; })));
            }
        };
        var resetCheckBox = function () {
            checkAllRef.current.checked = false;
            setCheckedItem(new Set());
        };
        router_1.Router.events.on('routeChangeComplete', resetCheckBox);
        return function () {
            router_1.Router.events.off('routeChangeComplete', resetCheckBox);
        };
    });
    return {
        checkAllRef: checkAllRef,
        checkedItem: checkedItem,
        setCheckedItem: setCheckedItem,
        handleChange: function (e) {
            var id = e.currentTarget.dataset.id;
            if (checkedItem.has(id)) {
                checkedItem.delete(id);
            }
            else {
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
