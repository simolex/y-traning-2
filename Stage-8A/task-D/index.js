/**
 * Бюрократия
 */

function bureaucracy(n, bosses) {
    const result = new Int32Array(n + 1).fill(1);
    const count = new Int32Array(n + 1).fill(1);
    const vizited = new Int8Array(n + 1);
    const bossMap = new Map();
    const stack = new Int32Array(n + 1);
    let pntStack = 0;

    bosses.forEach((boss, employee) => {
        if (!bossMap.has(boss)) {
            bossMap.set(boss, []);
        }
        bossMap.get(boss).push(employee + 2);
    });

    // stack.push(1);
    stack[pntStack++] = 1;
    while (pntStack > 0) {
        const current = stack[--pntStack];
        if (vizited[current] > 0) {
            vizited[current] = 2;
            if (current - 2 >= 0 && bosses[current - 2]) {
                count[bosses[current - 2]] += count[current];
                result[bosses[current - 2]] += result[current] + count[current];
            }
        } else {
            vizited[current] = 1;

            if (bossMap.has(current)) {
                stack[pntStack++] = current;
                // stack.push(current);
                // bossMap.get(current).sort((a, b) => b - a);
                bossMap.get(current).forEach((v) => (stack[pntStack++] = v));
                // stack.push(...bossMap.get(current));
            } else {
                count[bosses[current - 2]] += 1;
                result[bosses[current - 2]] += 2;
            }
        }
    }
    return result.slice(1);
}

const _readline = require("readline");

const _reader = _readline.createInterface({
    input: process.stdin
});

const _inputLines = [];
let _curLine = 0;

_reader.on("line", (line) => {
    _inputLines.push(line);
});

process.stdin.on("end", solve);

function solve() {
    const n = readInt();
    const bosses = readArray();

    const result = bureaucracy(n, bosses);
    console.log(result.join(" "));
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readString() {
    const s = _inputLines[_curLine].trim();
    _curLine++;
    return s;
}

function readArray() {
    var arr = _inputLines[_curLine]
        .trim(" ")
        .split(" ")
        .map((num) => Number(num));
    _curLine++;
    return arr;
}

module.exports = bureaucracy;
