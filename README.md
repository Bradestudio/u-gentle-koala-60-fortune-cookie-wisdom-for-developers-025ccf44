# Fortune Cookie Wisdom for Developers

[![make.fun](https://img.shields.io/badge/make.fun-bounty-blue)](https://make.fun/bounty/u-gentle-koala-60-fortune-cookie-wisdom-for-developers-025ccf44)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node](https://img.shields.io/badge/Node-22-green.svg)](https://nodejs.org/)

A one-line fortune-cookie wisdom for developers, entered in the
[make.fun bounty](https://make.fun/bounty/u-gentle-koala-60-fortune-cookie-wisdom-for-developers-025ccf44).

## Entry

> Legacy code is just a love letter from someone who already quit.

64 characters, one line — inside the 1–120 character gate.

## How it works

`main.ts` (Node 22, no dependencies, no network) validates the line
(1–120 Unicode code points, single line, no stray whitespace) and writes
it atomically to `/output/entry.txt`, then reads it back byte-for-byte
to prove the output matches exactly.

```sh
node main.ts
cat /output/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).

---

Built for the make.fun bounty — https://make.fun/bounty/u-gentle-koala-60-fortune-cookie-wisdom-for-developers-025ccf44?ref=qjs4e9sj
