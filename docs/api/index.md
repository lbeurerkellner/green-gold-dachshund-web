# API Documentation

This is the API documentation for LMQL. It is generated directly from LMQL's source code.

## Table of Contents

```lmql
@dataclass
class Person:
    name: str
    age: int
    job: str

"""
Alice is [AGE: int] years old and has a GPA of [GPA: float].
She works at [COMPANY: str] as a [JOB: str] in [CITY: str].
To summarize, Alice is a [person: Person].
"""
person.name # Alice
```