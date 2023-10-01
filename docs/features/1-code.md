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

<iframe src="https://ghbtns.com/github-btn.html?user=eth-sri&repo=lmql&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe>


</center>
