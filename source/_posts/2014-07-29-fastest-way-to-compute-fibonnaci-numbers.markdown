---
layout: post
title: "Fastest Way to Compute Fibonnaci Numbers"
date: 2014-07-29 21:26:00 -0400
comments: true
categories:
---
In mathematics, the Fibonnaci numbers are integers given by below equals:
```
Equation
```

This number sequence has many beautiful properties, and numerous algorithms and applications are inspired by or turned out to follow its properties, for example, [Fibonnaci Heap]("https://en.wikipedia.org/wiki/Fibonacci_heap"). Topics on this sequence of numbers have been well developed over the years, nonetheless it's still one of the most popular questions you can expect in an interview.

It's not hard for a software developer to come up with an brute-force solution in 5 minutes, shown as below code snippet:

``` python
def fibonnaci(n):
    '''Computes nth fibonnaci number.
    '''
    if n == 0:
        return 0
    if n <= 2:
        return 1
    return fibonnaci(n - 1) + fibonnaci(n - 2)
```

This is a work solution. The problem is that, however, the computation is too expensive because basically it recomputes lots of results in the two recursive call. In fact, the complexity is approximately O(2^n). The issue has been well discussed on [StackOverflow](http://stackoverflow.com/questions/360748/computational-complexity-of-fibonacci-sequence).

Of course, we can gain a huge performance improvement by simply momerize previously computed results. Just as blow python code,

``` python
memo = {}

def fibonnaci(n):
    '''Computes nth fibonnaci number.
    '''
    if n in memo:
        return memo[n]

    if n == 0:
        return 0
    if n <= 2:
        return 1

    memo[n] = fibonnaci(n - 1) + fibonnaci(n - 2)
    return memo[n]
```

Observe that we compute each Fibonacci number from 0 to $n$ only once. Therefore, the complexity of computing $n$th Fibonacci number reduces to O(n) immediately!

But can we do better? I read from this [post](http://vinayakgarg.wordpress.com/2012/11/07/fastest-way-to-compute-fibonacci-number/), the author gave out a decent solution based on the fact that
'''

'''

I just copied over his code for you to read, as below.

``` python
def fib(n):
    if n <= 2:
        return 1
    k = n / 2
    a, b = fib(k + 1), fib(k)
    if n % 2 == 1:
        return a * a + b * b
    else:
        return b * (2 * a - b)
```

Very nice solution! This algorithm computes Fibonacci number efficiently in $O(log(n))$ time.

To complete this blog, I really want to show you a that I read from the book "The Art of Computer Programming (volume 1)". I was totally amazed by its elegance when I first saw this solution. The idea is based on below equation:
'''
golden ratio equation
'''
where
'''

'''
$phi$ is the golden ratio, approximately equals value $$.

Notice here that $phi_hat$ has magnitude less that 1, therefore, $phi_hat$ gets very small as n gets large. As long as $phi_hat_eq$ is small enough, we have
"""
Fn
"""
Given by below python code:

```python
from math import sqrt


def fibonacci(n):
    sqrt_of_5 = sqrt(5)
    golden_ratio = (1 + sqrt_of_5) / 2
    return round(golden_ratio ** n / sqrt_of_5)
```

Surprisely, it works well even when n is small. Nevertheless, this solution is by no means better than previous one. Because of the exponentiation operation, it still runs $O(log(n))$ time on the machine code level.

If you're interested in computing Fibonacci numbers, there's a [post](http://www.chaos.org.uk/~eddy/craft/Fibonacci.html) that I highly recommend you to take a look.
