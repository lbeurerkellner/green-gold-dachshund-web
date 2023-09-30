---
title: Hello Two
---

LMQL is a versatile language and simplifies many common LLM tasks.

%SPLIT%
```lmql
sample(temperature=1.2)
    "Say 'this is a test'[RESPONSE]" where len(TOKENS(RESPONSE)) < 25
    if "test" not in RESPONSE:
        "Try again:[RESPONSE]" where \
            len(TOKENS(RESPONSE)) < 25
    else:
        "Good job"
from
    "openai/text-ada-001"
```
%SPLIT%
```promptdown
![bubble:user|Hi there]
![bubble:assistant|How are you doing?]
![bubble:user|I am doing well, how about you?]
![bubble:assistant|I am doing well too, thanks for asking]
![bubble:user|That is good to hear]
```