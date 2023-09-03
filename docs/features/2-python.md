---
title: Python Native
template: side-by-side
---

LMQL blends seamlessly with your existing Python code base.<br/><br/>

An LLM call becomes a simple function call, and the output is a native Python object. No need for a separate library, chaining or callbacks.

<button class="btn">
Learn more
</button>

%SPLIT%
```lmql
@dataclass
class Person:
    name: str
    age: int
    job: str

"""
Alice is [AGE: int] years old and has a GPA of [GPA: float].
She works at [COMPANY: str] as a [JOB: str] in [CITY: str].
To summarize, Alice is a [p: Person].
"""
p.name # Alice
```