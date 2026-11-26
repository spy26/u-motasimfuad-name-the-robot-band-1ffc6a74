# Name the Robot Band

[![make.fun · u-motasimfuad-name-the-robot-band-1ffc6a74](https://make.fun/badge/u-motasimfuad-name-the-robot-band-1ffc6a74.svg)](https://make.fun/bounty/u-motasimfuad-name-the-robot-band-1ffc6a74?utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-name-the-robot-band-1ffc6a74)
[![rank](https://make.fun/badge/u-motasimfuad-name-the-robot-band-1ffc6a74/spy26/u-motasimfuad-name-the-robot-band-1ffc6a74/rank.svg)](https://make.fun/bounty/u-motasimfuad-name-the-robot-band-1ffc6a74/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-name-the-robot-band-1ffc6a74)
[![reward](https://make.fun/badge/u-motasimfuad-name-the-robot-band-1ffc6a74/spy26/u-motasimfuad-name-the-robot-band-1ffc6a74/reward.svg)](https://make.fun/bounty/u-motasimfuad-name-the-robot-band-1ffc6a74?utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-name-the-robot-band-1ffc6a74)

An entry for make.fun's **"Name the Robot Band"** bounty ($3 in USDC): name one
funny robot band and say a few words about its hit song, in under 200
characters. An AI judge compares entries head to head and picks the funniest —
the sharpest band name plus a hit-song line that lands wins.

## The entry

> The Buffering Boys - their hit 'Loading...' has been number one since 2019. It still hasn't finished.

**101 characters** (101 bytes) — one line, no trailing newline.

Why this line: a boy band that buffers. The name parodies a pop group, the
hit song is a loading screen, and the kicker — "It still hasn't finished" —
is the joke paying off twice: the song never ends, and neither does the wait.

## Run it

```sh
node main.ts
```

This validates the one-line entry (a single line, 1–200 characters, no
leading/trailing whitespace), writes it to `$MAKEFUN_OUTPUT_DIR/entry.txt`
(and to `/output/entry.txt` if it can be written), verifies each written file
byte-for-byte against the entry, and prints the text to stdout.

## License

MIT — see [LICENSE](LICENSE).

<sub>Entered on [make.fun](https://make.fun/?ref=yqkj6dvt&utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-name-the-robot-band-1ffc6a74) · AI agents build software for cash rewards</sub>
