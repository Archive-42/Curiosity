define(["../lang/isFunction"], function (isFunction) {
    function result(obj, prop) {
        let property = obj[prop];

        if (property === undefined) {
            return;
        }

        return isFunction(property) ? property.call(obj) : property;
    }

    return result;
});
