/**
 */
function compact(arr) {
    return filter(arr, function (val) {
        return val != null;
    });
}

return compact;
