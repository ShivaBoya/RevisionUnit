// ==============================================
// JavaScript Event Loop Practice - index.js
// Each section includes predicted output comments
// ==============================================

console.log("===== Question 1 =====");
// Nested async/await with timers
/*
Predicted Output:
Start
A1
B1
End
A2
B3
C1
B2
A3
Explanation:
- Start runs first (sync)
- one() prints A1, pauses at await null (microtask)
- two() prints B1, schedules B2 (macrotask), pauses at await Promise.resolve()
- Promise.resolve().then('C1') → microtask
- End → sync
- Microtasks: A2 (schedules A3), B3, C1
- Macrotasks: B2, A3
*/

async function one() {
  console.log("A1");
  await null;
  console.log("A2");
  setTimeout(() => console.log("A3"), 0);
}

async function two() {
  console.log("B1");
  setTimeout(() => console.log("B2"), 0);
  await Promise.resolve();
  console.log("B3");
}

console.log("Start");
one();
two();
Promise.resolve().then(() => console.log("C1"));
console.log("End");

// ==============================================
console.log("\n===== Question 2 =====");
// Microtasks inside macrotasks
/*
Predicted Output:
1
7
5
6
2
3
4
Explanation:
- 1 and 7 → sync
- Microtasks: 5 (Promise.then), 6 (queueMicrotask)
- Timer: 2 → schedules microtask 3 and timer 4
- Microtask 3 runs immediately
- Timer 4 executes last
*/
console.log("1");

setTimeout(() => {
  console.log("2");
  Promise.resolve().then(() => {
    console.log("3");
    setTimeout(() => console.log("4"), 0);
  });
}, 0);

Promise.resolve().then(() => console.log("5"));
queueMicrotask(() => console.log("6"));
console.log("7");

// ==============================================
console.log("\n===== Question 3 =====");
// Async function re-entry
/*
Predicted Output:
start
foo start
end
foo middle
P1
foo end
T1
Micro in T1
Explanation:
- foo() pauses at await
- Microtasks: foo middle, P1, foo end
- Timer executes last
*/
async function foo() {
  console.log("foo start");
  await Promise.resolve();
  console.log("foo middle");
  await null;
  console.log("foo end");
}

console.log("start");
foo();
Promise.resolve().then(() => console.log("P1"));
setTimeout(() => {
  console.log("T1");
  Promise.resolve().then(() => console.log("Micro in T1"));
}, 0);
console.log("end");

// ==============================================
console.log("\n===== Question 4 =====");
// Mixed promise chains
/*
Predicted Output:
W
Done
X
Y
Last
Timer1
Micro after Timer1
Z
*/
console.log("W");

Promise.resolve()
  .then(() => {
    console.log("X");
    return Promise.resolve();
  })
  .then(() => {
    console.log("Y");
    setTimeout(() => console.log("Z"), 0);
  })
  .then(() => {
    console.log("Last");
  });

setTimeout(() => {
  console.log("Timer1");
  Promise.resolve().then(() => console.log("Micro after Timer1"));
}, 0);

console.log("Done");

// ==============================================
console.log("\n===== Question 5 =====");
// Async functions inside timers
/*
Predicted Output:
start
test start
end
test after await
micro
T1 start
T1 after await
*/
setTimeout(async () => {
  console.log("T1 start");
  await null;
  console.log("T1 after await");
}, 0);

async function test() {
  console.log("test start");
  await Promise.resolve();
  console.log("test after await");
}

console.log("start");
test();
Promise.resolve().then(() => console.log("micro"));
console.log("end");

// ==============================================
console.log("\n===== Question 6 =====");
// Deep nesting
/*
Predicted Output:
Init
Finish
P1
P2
T1
Micro in T1
T3
Micro in T3
T2
*/
console.log("Init");

setTimeout(() => {
  console.log("T1");
  Promise.resolve().then(() => {
    console.log("Micro in T1");
    setTimeout(() => console.log("T2"), 0);
  });
}, 0);

Promise.resolve()
  .then(() => {
    console.log("P1");
    setTimeout(() => {
      console.log("T3");
      Promise.resolve().then(() => console.log("Micro in T3"));
    }, 0);
  })
  .then(() => console.log("P2"));

console.log("Finish");
