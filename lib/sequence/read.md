call like:

const pipeline = sequence(multiplyBy2, add5, subtract6....);

const value = pipeline.run(5);

// value equals 9
