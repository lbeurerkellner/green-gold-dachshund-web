---
sidebar: false
aside: true
prev: false
---

# Language Reference

<div class="subtitle">Systematic guidance for writing and understanding LMQL's syntax and semantics.</div>

::: tip
This document is a **work-in-progress effort** to provide a more formal description of the LMQL, mainly discussing the syntactic form and corresponding semantics. Please feel free to reach out to the core team if you have any questions or suggestions for improvement.
:::

## Origins and Motivation

LMQL is a programming language for *LLM programming*. More specifically, the general goal of LMQL is to provide a simple, yet powerful interface to implement (multi-part) reasoning flows that interact with LLMs in complex and algorithmically controlled ways. 

At the core of LMQL, the following components are of particular importance to achieve this goal:

* Robust and type-safe generation via a **constrained decoding engine**.

* A lightweight **programming model for prompting**, including ways to abstract and modularize query code.

* A **vendor-agnostic** abstraction over optimized and parallelized **LLM inference**.

The overall goal is to provide a fast and reliable toolchain that facilitates LLM-powered reasoning and applications across domains. This includes simple, already existing use-cases, such as simple chat applications and data parsing, but also extends to more complex applications such as autonomous agents, large-scale data processing, and programmatic reasoning and planning.

## Using LMQL

LMQL's [current reference implementation](#reference-implementation) is written in Python and can be used in a variety of ways:

* The `lmql playground` offers an interactive interface for running, debugging and experimenting with LMQL programs. It is the recommended way to get started with LMQL. An online version of the playground is available at [lmql.ai/playground](https://lmql.ai/playground).

* LMQL is available as a Python library, with the `lmql.query` function offering a simple way to use LMQL directly from within Python. For more information, please refer to the [Python API](#python-api) section.

* The `lmql run` CLI tool can used to run LMQL programs directly from the command line.

## Syntax

The LMQL language comprises two syntax variants:

* The modern, more minimalistic [standard syntax](#modern-syntax) that relies on a very small set of language constructs in an otherwise standard Python environment. This syntax is the main focus for the continued development of LMQL.

* A *legacy* [standalone syntax](#legacy-syntax) that is more static in nature but relevant for standalone LMQL use-cases.

Both syntax variants are compatible and can be used interchangeably. 

::: details Grammar Notation

We rely on a slightly modified variant of [EBNF](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form) to describe the LMQL syntax. 

We denote non-terminals like `<SENTENCE>` and terminals like `"dog"`. The `[...]?` operator denotes an optional element, while the `*` operator denotes a repetition of zero or more elements. The `|` operator denotes a choice between two or more elements and non-quoted terminals are regular expressions to match against. 

To avoid notational overhead, we assume that Python fragments like `<python.Expr>`, refer to standard Python, with the adaptations that arising sub-derivations can also refer back to LMQL expressions (namely [<QUERY_STRING>](#query-strings) and [<CONSTRAINT_EXPR>](#constraints)), when appropriate.

```grammar
<SENTENCE> := "The quick" ["brown"]? <SUBJECT> <VERB> "over the lazy dog."
<SUBJECT> := "fox" | "dog"
<VERB> := "jumps" | "hops" | [.*]{4}
```

**Examples of valid `<SENTENCE>` derivations:**    
```lmql
"The quick fox jumps over the lazy dog."
"The quick brown fox jumps over the lazy dog."
"The quick dog jumps over the lazy dog."
"The quick brown dog hops over the lazy dog."
"The quick dog A9_D over the lazy dog."
```

:::

### Standard Syntax

LMQL's modern syntax can be read as standard Python code, with the addition of one new construct: [query strings](#query-strings). Query strings are just top-level string expressions, that are interpreted as prompts to the underlying LLM. The following grammar describes this syntax in detail.

```grammar
<LMQL_PROGRAM> := [<PROMPT_STMT>](prompt-clause)*

[<PROMPT_STMT>](prompt-clause) := # regular python statements
                 [<python.Stmt>](python-fragments) |
                 # query strings
                 [<QUERY_STRING>](query-strings) |
                 # query strings with inline constraints
                 [<QUERY_STRING>](query-strings) 'where' [<CONSTRAINT_EXPR>](constraints) |
                 # query strings with distribution clauses
                 [<QUERY_STRING>](query-strings) 'distribution' [<DISTRIBUTION_EXPR>](distribution-expr) |

[<QUERY_STRING>](query-strings) := [<...>](query-strings)

[<CONSTRAINT_EXPR>](constraints) := [<...>](constraints)

[<DISTRIBUTION_EXPR>](distribution-clauses) := <VARIABLE> 'in' [<python.Expr>](python-fragments)
```

::: info Examples of Valid Programs

Simple program with two [query strings](#query-strings)

```lmql
"Hello [WHO]"
"Goodbye [WHO]"
```

Python programs without LMQL constructs are also valid LMQL programs

```python
a = 12
print("Hello, world!")
print("Goodbye, world!", a)
```

Program with [query strings](#query-strings), [constraints](#constraints) and string interpolation

```lmql
a = "Alice"
"Hello {a} [WHO]" where len(TOKENS(WHO)) < 10
print(WHO)
```

Program with [query strings](#query-strings) and [distribution clauses](#distribution-clauses)

```lmql
"Greet Alice\n:"
"Hello [WHO]" distribution WHO in ["Alice", "Bob"]
```

:::

### Standalone Syntax

The standalone query syntax is less flexible than the modern syntax variant and generally considered legacy. It is still supported for standalone use-cases, but users are advised to rely on the modern syntax going forward. Nonetheless, it shares many syntactic constructs with the modern syntax, and is thus described in this document as well.

```grammar
<STANDALONE_QUERY> := [ [<DECODER>](decoder-clause) [ '(' [<python.KeywordArguments>](python-fragments) ')' ]? ]? 
                        [<PROMPT>](prompt-clause)*
                     [ 'from' [<MODEL_EXPR>](model-expr) ]?
                     [ 'where' [<CONSTRAINT_EXPR>](constraints) ]?
                     [ 'distribution' [<DISTRIBUTION_EXPR>](distribution-expr) ]?

[<DECODER>](decoder-clause) := 'argmax' | 'sample' | 'beam' | 'beam_var' | 
             'var' | 'best_k' | [<python.Identifier>](python-fragments)

[<PROMPT>](prompt-clause) := [<QUERY_STRING>](query-strings) | [<python.Stmt>](python-fragments)

[<QUERY_STRING>](query-strings) := [<...>](query-strings)

[<MODEL_EXPR>](model-expr) := "lmql.model" "(" [<python.Arguments>](python-fragments) ")" |
                [<python.StringLiteral>](python-fragments)

[<CONSTRAINT_EXPR>](constraints) := [<...>](constraints)

[<DISTRIBUTION_EXPR>](distribution-clauses) := <VARIABLE> 'in' [<python.Expr>](python-fragments)

VARIABLE := [<python.Identifier>](python-fragments)
```

::: info Examples

decoder clause + from
```lmql
argmax "What is the capital of France? [ANSWER]" from "gpt2"
```

decoder clause + where
```
argmax "What is the capital of France? [ANSWER]" \
    where len(TOKENS(ANSWER)) < 10
```

decoder clause + distribution
```
argmax "What is the capital of France? [ANSWER]" \
    distribution ANSWER in ["A", "B"]
```

decoder clause + from + where + distribution
```
argmax 
    "What is the capital of France? [ANSWER]" 
from
    "gpt2"
distribution 
    ANSWER in ["A", "B"]
```

:::

### Prompt Clause

### Query Strings

Query strings represent the core construct for prompt construction and LLM calling in LMQL. 

```grammar
QUERY_STRING := <CONSTRAINED_QSTRING> | <PURE_QSTRING>

# qstring with constraints
<CONSTRAINED_QSTRING> := <PURE_QSTRING> 'where' [<CONSTRAINT_EXPR>](constraints)

# qstring without constraints
<PURE_QSTRING> := <python.StringDelimiter>
                ( 
                    '.*' | # any string content 
                    <PLACEHOLDER_VARIABLE> |
                    <STRING_INTERPOLATION> 
                )* '"'
                <python.StringDelimiter>

<PLACEHOLDER_VARIABLE> := "[" [<python.Identifier>](python-fragments) "]" |
                          # with type/tactic annotation
                          "[" [<python.Identifier>](python-fragments) ":" [<python.Expr>](python-fragments) "]" |
                          # with decorator
                          "[" <DECORATOR>?  [<python.Identifier>](python-fragments) "]" |
                          # with decorator and type/tactic
                          "[" <DECORATOR>?  [<python.Identifier>](python-fragments) ":" [<python.Expr>](python-fragments) "]"

<DECORATOR> := "@" [<python.Call>](python-fragments) | "@" [<python.Identifier>]

# standard Python f-string interpolation
<STRING_INTERPOLATION> := "{" <python.Expr> "}"
```

::: info Examples

```lmql
# without variables
"Hello, world!" 

# with two variable
"Hello, [NAME] and [NAME2]!"

# with constraints
"Hello, [NAME]!" where len(TOKENS(NAME)) < 10

# with decorator
"Hello, [@fct(a=12) NAME]!"

# with type annotation
"Your Age: [AGE:int]!"

# with nested call (tactic annotation)
"Q: What is 2x2? A: [ANSWER: chain_of_thought(shots=2)]`

# with string interpolation
NAME = "Alice"
"Hello, {NAME}, how old are you: [AGE:int]?"
```

:::

**String Interpolation** Query strings are compiled to Python `f-strings` and thus implement regular Python string interpolation semantics using the `"Hello {...}"` syntax, e.g. `"Hello {NAME}"` evaluates to `"Hello Alice"`, given the current program state assigns `NAME = "Alice"`.

**Placeholder Variable** Placeholder variables define the templated placeholders an LLM is invoked for, and are denoted by `[...]` square brackets. With respect to the program state, placeholder variables assign fresh or existing variables to the LLM's input, i.e. the following code

```lmql
NAME = "Alice"
"Hello [NAME] and [NAME2]"
```

can be understood as the following pseudo-code:

```python
NAME = "Alice"
NAME, NAME1 = model.fill_placeholders("Hello [NAME] and [NAME2]")
```

**Constrainted Query Strings** Query Strings can also be directly constrained using `"..." where ...` syntax. This defines [decoding constraints](#constraints), that only apply locally during generation of the respective query string. For example, consider the following program:

```lmql
"Hello, [NAME]!" where len(TOKENS(NAME)) < 10
"Another [NAME]"
```

The token length constraint on `NAME` only applies to generations that are invoked for the first query string, i.e. `"Hello, [NAME]!"`. The next query string `"Another [NAME]"` is not affected by the constraint.

### Decoder Clause

::: danger
TODO
:::

### Where Clauses

::: danger
TODO
:::

### Constraints

```grammar
[<CONSTRAINT_EXPR>](constraints) := [<CONSTRAINT>](constraints) 'and' CONSTRAINT_EXPR |
                     [<CONSTRAINT>](constraints) 'or' CONSTRAINT_EXPR |
                     'not' [<CONSTRAINT>](constraints) |
                     [<CONSTRAINT>](constraints)
```

::: danger
TODO
:::

### Distribution Clauses

::: danger
TODO
:::

### Python Fragments

LMQL relies on the following Python grammar fragments, to express parts of the LMQL language.

For reference, the [Python grammar is available here](https://docs.python.org/3/reference/grammar.html).

| Fragment | Description |
| -------- | ----------- |
| `<python.Identifier>` | A Python identifier, as defined as `NAME` in the Python grammar. Examples: `a`, `b`, `my_var1`, `MY_VAR2` |
| `<python.StringLiteral>` | A Python string literal, as defined as `STRING` in the Python grammar. This includes supports for string delimiters, such as single quotes (`'`), double quotes (`"`), and triple quotes (`'''` or `"""`). Examples: `'hello'`, `"world"`, `'''hello'''`, `"""world"""` |
| `<python.StringDelimiter>` | A Python string delimiter, e.g. `'`, `"`, `'''`, or `"""`. |
| `<python.Expr>` | A regular Python expression, as defined as `expression` in the Python grammar. Examples: `a`, `a+b`, `a(b=12)`, `a if b else c`, `a > 2`, `a == b` |
| `<python.Stmt>` | A regular Python statement, as defined as `simple_stmt` or `compound_stmt` in the Python grammar. This includes control flow statements, such as `if`, `for`, `while`, `try`, `with`, etc. |
| `<python.Call>` | A Python function call, as defined as `call` in the Python grammar. This includes expressions like `a()`, `a(b=12)`, `a(b=12, c=13)`, `a(b=12, c=13, **some_dict)`. |
| `<python.KeywordArguments>` | Function call keyword arguments, as defined as `kwargs` in the Python grammar. This includes expressions like  `()`, `(a=1, b=2)`, `(a=1, b=2, **some_dict)`. |
| `<python.Arguments>` | Function call arguments, as defined as `args` in the Python grammar. This includes expressions like  `()`, `(a, b)`, `(a, 1, 2, c=2)`, `(a, b, *some_iterable, **some_dict)`.

## Reference Implementation

LMQL's current reference implementation is written in Python and also available as a Python library. The reference implementation of the syntax and semantics described in this document is available via Git at [github.com/eth-sri/lmql](https://github.com/eth-sri/lmql).

### Compiler and Runtime

The LMQL Python compiler translates LMQL programs into asynchroneous, brancheable Python code according to the semantics described in this document. The resulting program is then executed using the LMQL runtime, which implements (constrained) decoding algorithms, optimizations and model support via several backends.

### Hybrid Parser

For parsing, the implementation leverages a hybrid approach, largely relying on the existing Python parser (`ast.parse`) and grammar, adding additional parsing logic only for LMQL-specific constructs. This approach allows us to be compliant with the Python grammar, while also allowing us to extend the language with additional constructs, that are not part of the original Python grammar. To parse the standalone syntax, we segment the input on a token level and then call the parser several times to obtain the final AST for e.g. the prompt clause, the where clause or the distribution clause.