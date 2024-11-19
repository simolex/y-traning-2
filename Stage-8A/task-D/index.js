/**
 * Бюрократия
 */

function bureaucracy(n, bosses) {
    const result = Array(n + 1).fill(0);
    const count = Array(n + 1).fill(1);
    const vizited = new Int8Array(n + 1);
    const bossMap = new Map();
    const stack = [];

    bosses.forEach((boss, employee) => {
        if (!bossMap.has(boss)) {
            bossMap.set(boss, []);
        }
        bossMap.get(boss).push(employee + 2);
    });

    stack.push(1);
    while (stack.length > 0) {
        const current = stack.pop();
        if (vizited[current] > 0) {
            vizited[current] = 2;
            // result[current] += 1;
            if (current - 2 >= 0 && bosses[current - 2]) {
                result[bosses[current - 2]] += result[current] + count[current] + 1;
                // count[bosses[current - 2]] += count[current];
                // result[current] += 1;
            } else {
                // result[current] += 1;
            }
        } else {
            vizited[current] = 1;
            stack.push(current);

            if (bossMap.has(current)) {
                bossMap.get(current).sort((a, b) => b - a);
                stack.push(...bossMap.get(current));
            } else {
                result[current] = 1;
                // count[bosses[current - 2]] += 1;
                result[bosses[current - 2]] += 1;
                //leaf
            }
        }
    }
    return result.slice(1);
}

const _readline = require("readline");

const _reader = _readline.createInterface({
    input: process.stdin,
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
