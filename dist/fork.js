const longComputation = () => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum = sum + i;
    }
    return sum;
};
process.on('message', (message) => {
    if (message === 'start') {
        const sum = longComputation();
        process.send(sum);
    }
});
//# sourceMappingURL=fork.js.map