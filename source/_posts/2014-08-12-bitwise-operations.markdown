---
layout: post
title: "Bitwise Operations"
date: 2014-08-12 07:01:23 -0400
comments: true
categories:
---
I recently took an online course [Hardware/Software Interface](https://class.coursera.org/hwswinterface-002) on Coursera, offered by University of Washington. It's a great course, and brought my memory to those good old days back in school many years ago. In the first lecture, the professor talked about how computer handles numbers through bitwise operation. Although nowadays, the majority of programmers are programming in high-level languages, I believe as a programmer, it's important for us to understand what these basics are and how to use them effectively.

If you haven't studied this topic thoroughly, or need to refresh your memory, take a look at the "Resources" section, as I've listed couple resources there for you to reference. In this blog post, I'll be showing you some of the moset common bitwise operation.

## Application

### Check if two variables have the same signs
Two variables `x` and `y` are both positive or both negative if `(x > 0) ^ (y > 0) == 0`

### Extract the 2nd most significant byte of an integer
First shift, then mask: `(x >> 17) & 0xFF`

### Extract the sign of an integer:
Use `& 1` to clear out all other bits except LSB: `(x >> 31) & 1`

### Conditionals as Boolean expressions
Assuming x is 0 or 1, an `if-else` statement
``` java
if (x) {
  a = y;
} else {
  a = z;
}
```
which is the same as `a = x ? y : z;`

can be rewritten as: ` a = ((x << 31) >> 31) & y + ((!x) << 31` on a 32-bit machine.

### Determining if an integer is a power of 2
We can determine if an integer is power of 2 by `(v & (v - 1)) == 0;`, assuming 0 is not considered as power of 2.

### Compute exponentiation
Supporse we'd like to compute the exponentiation operation of $x\^y$ in real numbers, the brute-force way is to multiply $x$ by itself $y$ times, as in below code:
```python
def power(x, y):
    ''' compute x**y '''
    result = 1
    for i in range(y):
        result *= x
    return result
```
The complexity of this approach is in the order of the length of $y$, which is exponential in binary.

Observe that $x\^y$ can be computed in below equation:

$$
\begin{equation}
  x\^y =
  \begin{cases}
  (x\^\frac{y}{2})\^2 & \text{if } y \text{ mod } 2 = 0, \cr
  (x\^\frac{y}{2})\^2 * x & \text{if } y \text{ mod } 2 = 1.
  \end{cases}
\end{equation}
$$

We can use a recursive function to implement above logic:
```python
def power(x, y):
    ''' compute x**y '''
    if y == 0: return 1
    if y == 0: return x
    tmp = power(x, y//2)
    if y % 2 == 0:
        return tmp * tmp
    else:
        return tmp * tmp * x
```
Running time of this computation is logarithmic to the value of $y$, therefore linear to the length of $y$ in binary.

A third way is to utilize bit shifting operation. Think this way, suppose we can represent $y$ in binary $k\_1k\_2..k\_i..k\_n$, where $k\_i$ has value either 0 or 1, we can compute $x\^y$ like below:
$$
x\^y = x\^{k\_1k\_2..k\_i} = \prod{x\^{k\_i}} \text{ where } ith \text{ bit } = 1
$$
For example, $2\^{10}$ can be written as
$$
2^{10\_{10}} = 2\^{1010\_2} = 2\^{1000\_2} * 2\^{0010\_2}
$$

Therefore, we can continuously shift $y$ to the right and check its $i$th bit until all bits are checked, as shown in below python code:
```python
def power(x, y):
    '''computes x**y '''
    result = 1
    while y != 0:
        if y & 1 == 1:
            result *= x
        x = x * x
        y = y >> 1
    return result
```

Comparing the the second approach, bit shifting way is faster because bitwise operation is faster as it avoids the overhead of function calls and call stack management, as opposed to recursive function call.

If you still don't understand how this algorithm works, I encourage you take a piece of paper and a pen, and work out a concrete example.

# Resources

There are more to say about bitwise operation. I've listed here some good articles and videos below that talk about it in a decent depth.

- [Understanding Binary Numbers](https://www.youtube.com/playlist?list=PL726AB973C6E39758): A series of videos on Youtube designed to improve your understanding of binary numbers, including how to add, subtract, multiply and divide binary numbers.
- [Bitwise Operators in C and C++: A Tutorial](http://www.cprogramming.com/tutorial/bitwise_operators.html):
- [Discussion on StackOverflow](http://stackoverflow.com/questions/141525/absolute-beginners-guide-to-bit-shifting): some suggestions for absolute beginners to bit shifting.
- [Bit Twiddling Hacks](https://graphics.stanford.edu/~seander/bithacks.html):
