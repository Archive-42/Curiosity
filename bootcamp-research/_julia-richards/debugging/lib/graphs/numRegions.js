function numRegions(graph) {
    const set = new Set();
    let regions = 0;
    for (key in graph) {
        graph[key].forEach(neighbor => set.add(neighbor));
        if(!set.has(key)){ 
        regions += 1;
        }
    };
    return regions;
}

// example
module.exports = {numRegions}
let graph1 = {
    'a': ['b'],
    'b': ['a'],
    'c': ['d'],
    'd': ['e', 'c'],
    'e': ['d'],
};
console.log(numRegions(graph1)); // should equal 2