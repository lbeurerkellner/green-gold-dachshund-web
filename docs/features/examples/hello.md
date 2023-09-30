---
title: 👋 Hello
---

LMQL is a versatile language and simplifies many common LLM tasks.

%SPLIT%
```lmql
"Say 'this is a test'[RESPONSE]" where \
    len(TOKENS(RESPONSE)) < 25

if "test" not in RESPONSE:
    "Try again:[A]" where len(TOKENS(A)) < 25
else:
    "Good job"
```
%SPLIT%
```promptdown
Say 'this is a test' [RESPONSE| This is an attempt.]




Try again:  [A| This is another attempt to say this is a test.]
```