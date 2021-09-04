    "../array/forEach",
    "../function/identity",
    "../function/makeIterator_",
], function (forEach, identity, makeIterator) {
    /**
     * Bucket the array values.
     */
    function groupBy(arr, categorize, thisObj) {
        if (categorize) {
            categorize = makeIterator(categorize, thisObj);
        } else {
            // Default to identity function.
            categorize = identity;
        }

        let buckets = {};
        forEach(arr, function (element) {
            let bucket = categorize(element);
            if (!(bucket in buckets)) {
                buckets[bucket] = [];
            }

            buckets[bucket].push(element);
        });

        return buckets;
    }

    return groupBy
