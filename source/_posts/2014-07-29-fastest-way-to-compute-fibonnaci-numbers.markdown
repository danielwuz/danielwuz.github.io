---
layout: post
title: "Fastest Way to Compute Fibonnaci Numbers"
date: 2014-07-29 21:26:00 -0400
comments: true
categories:
---
In mathematics, the Fibonnaci numbers are integers given by below equals:
$$
\begin{equation}
  F\_n =
  \begin{cases}
  1 & \text{if } n <= 2, \cr
  F\_{n-1} + F\_{n-2} & \text{if } n > 2.
  \end{cases}
\end{equation}
$$
This number sequence has many beautiful properties, and numerous algorithms and applications are inspired by or turned out to follow its properties, for example, [Fibonnaci Heap](<https://en.wikipedia.org/wiki/Fibonacci_heap>). Topics on this sequence of numbers have been well developed over the years, nonetheless it's still one of the most popular questions you can expect in an interview.

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

This is a work solution. The problem is that, however, the computation is too expensive because basically it recomputes lots of results in the two recursive call. In fact, the complexity is approximately $O(2\^n)$. The issue has been well discussed on [StackOverflow](http://stackoverflow.com/questions/360748/computational-complexity-of-fibonacci-sequence).

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

Observe that we compute each Fibonacci number from 0 to $n$ only once. Therefore, the complexity of computing $n$th Fibonacci number reduces to $O(n)$ immediately!

But can we do better? I read from this [post](http://vinayakgarg.wordpress.com/2012/11/07/fastest-way-to-compute-fibonacci-number/), the author gave out a decent solution based on the fact that
$$
\begin{equation}
  F\_{2k} = F\_k*(F\_{k+1} - F\_k) \\
  F\_{2k+1} = F\_{k+1}\^2 + F\_k\^2
\end{equation}
$$

I just copied over the code for you to read, as below.

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

To complete this blog, I would really like to show you a smart way that I read from the book "The Art of Computer Programming (volume 1)". I was totally amazed by its elegance when I first saw this solution. The idea is based on below equation:
$$
\begin{equation}
 F\_n = \frac{1}{\sqrt{5}}(\phi\^n - \hat{\phi}\^n)
\end{equation}
$$
where
$$
\begin{equation}
\hat{\phi} = 1 - \phi = \frac{1}{2}(1 - \sqrt{5})
\end{equation}
$$
$\phi$ is the golden ratio, approximately equals value $1.6180339887$.

Notice here that $\hat{\phi}$ has magnitude less that 1, therefore, $\hat{\phi}$ gets very small as $n$ gets large. As long as $\hat{\phi}$ is small enough, we have
$$
\begin{equation}
 F\_n = \frac{1}{\sqrt{5}}\phi\^n
\end{equation}
$$
Given by below python code:

```python
from math import sqrt


def fibonacci(n):
    sqrt_of_5 = sqrt(5)
    golden_ratio = (1 + sqrt_of_5) / 2
    return round(golden_ratio ** n / sqrt_of_5)
```

Although this function only computes approximate value, surprisely, it works well even when $n$ is small. Nevertheless, this solution is by no means better than previous one. Because of the exponentiation operation, it still runs $O(log(n))$ time on the machine code level.

If you're interested in computing Fibonacci numbers, I highly suggest you take a look at this [article](http://www.chaos.org.uk/~eddy/craft/Fibonacci.html).
