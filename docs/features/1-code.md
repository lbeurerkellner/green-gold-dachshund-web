---
title: 
template: code
---

```lmql
controls::

# top-level strings are prompts
"Q: What is the answer to life, the universe and everything?"

# generation via templated (constrained) variables
"A: [RESPONSE]" where \
    len(RESPONSE) < 120 and STOPS_AT(RESPONSE, ".")

# results are directly accessible as variable
print("LLM returned", RESPONSE)

# use a typed variable for guaranteed output format
"The answer is [NUM: int]"

# you know the answer
NUM # 42
```

<br/>
<center style="font-size: 10pt">

Created by the [SRI Lab](http://sri.inf.ethz.ch/) @ ETH Zurich and [contributors](https://github.com/eth-sri/lmql).

<br/>

<div class="github-star">
    <a class="github-button" href="https://github.com/eth-sri/lmql" data-color-scheme="no-preference: light; light: light; dark: dark;" data-show-count="true" aria-label="Star LMQL on GitHub">Star</a>
</div>

</center>
