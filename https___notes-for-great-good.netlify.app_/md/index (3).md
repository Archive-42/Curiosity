This app works best with JavaScript enabled.

# Algorithm Design Manual:

## Chapter One

### Introduction to Algorithm Design

#### 2018-12-18

Designing good algorithms for real-world problems requires the use of techniques (data structures, dynamic programming, backtracking, heuristics, modeling) and resources (other implementations that already exist and can be referenced to as a basis).

Collected implementations of algorithms can be found at <http://www.cs.sunysb.ed/~algorith> (though that redirects you to [this website](http://www.algorist.com/algorist.html)

Links to example problems can be found at <s>programming - challenges . com</s> - nope, that doesn't exist anymore. He also mentions online-judge.vva.es. Finally found uva.onlinejudge.org which has the problems he mentions in Chapter 1 under the right numbers, but the website is kind of horrendously slow. Still, [this](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=1) should get you to any of the questions you're looking for.

**Algorithms** are procedures for solving geernal, well-specified, problems. These problems are specified by describing the list of instances it is designed to work on and what the resulting output of each instance should be. It is a procedure to take any of the possible input instances and transform it into the desired output.

An **instance** is a specific use case for a problem with a specific input in order to determine its output from the problem

**Insertion sort** is a method for sorting a list/array of values by starting with a single element and iterating through the elements, swapping elements that are out of place

#### Three qualities of a good algorithm:

- Correct
- Efficient
- Easy to implement

### Problem: Robot Tour Optimization

**Input**: A set _S_ of _n_ points in the plane **Output** What is the shortest cycle tour that visits each point in the set _S_?

#### Nearest Neighbor Psuedocode

NearestNeighbor(_P_)

Pick and visit an initial point _p₀_ from _P_

_p = p₀_

_i_ = 0

While there are still unvisited points

_i_ = _i_ + 1

select _pᵢ_ to be the closest unvisited point to _pᵢ₋₁_

Visit _pᵢ_

Return to _p₀_ from _p<sub>n</sub>₋₁_

**This does not work in situations where all points are along a line - might lead to jumping from left to right**

#### ClosestPair Pseudocode

ClosestPair(_P_)

Let _n_ be the number of points in set _P_

For _i_ = 1 to _n_ - 1 do

_d_ = ∞

For each pair of endpoints _(s, t)_ from distinct vertex chains

if _dist(s, t)_ ≤ d and then _s<sub>m</sub>_ = _s, t<sub>m</sub>_ = _t_, and _d = dist(s, t)_

Connect (_s<sub>m</sub>_, _t<sub>m</sub>_) by an edge

Connect the two endpoints by an edge

**This doesn't work if the data points are two rows of equally spaced points where the two rows are slightly closer than the dots in each row to each other**

<a href="../static/89a99e89b6cb22fc6d1085d5e4eaa752/10244/ClosestPairCounterExample.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 401px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 38.65336658354115%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAAAsSAAALEgHS3X78AAABKklEQVQoz3WSzW7CMBCE8/7PADeeAE5IHCpUOAOHSsANRA6EkDg/zn+GWTc2qdqutMJ2dj7PrvHU7Qa0LWz0fe9SIr/foeMYDWuapkGSJPB9H1VVmTPF7xnTar2PyQSX4xEtN13XvcHDejef47TdoqI4JSxNU8S8QNZFXWO3WuFruTS1ovd0UUBrjTzPze0iKHjWDq6zLDP5X9SE2lrjMHw8ZOUOpC0LF1AURb+A/agbqRUTmr8GGCnl5vVXKIKDIPh2SpE4GtcXZQnbpQFezmeU3MiNYt0lnXYsSJ9PaDqQKCkWsB1NS03IBwn4SK7l9XSK8HpFRqgUysDt0BXFn7MZ/P3e9uqEFeE1gafNBofF4v0oPZ38aJEjkLQRccbJsB//nVwQYhny7QXNYWsj3L+DBQAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/89a99e89b6cb22fc6d1085d5e4eaa752/10244/ClosestPairCounterExample.png" alt="ClosestPairCounterExample" class="gatsby-resp-image-image" sizes="(max-width: 401px) 100vw, 401px" srcset="/static/89a99e89b6cb22fc6d1085d5e4eaa752/f723e/ClosestPairCounterExample.png 188w,
/static/89a99e89b6cb22fc6d1085d5e4eaa752/d744b/ClosestPairCounterExample.png 375w,
/static/89a99e89b6cb22fc6d1085d5e4eaa752/10244/ClosestPairCounterExample.png 401w" /> </span> </span></a>

#### OptimalTSP(P) PsuedoCode

OptimalTSP(_P_)

_d_ = ∞

For each of the _n!_ permutations, _Pᵢ_ of point set _P_

If (cost(_Pᵢ_) ≤ _d_) then _d_ = cost(_Pᵢ_) and _P<sub>min</sub> = Pᵢ_

Return _P<sub>min</sub>_

**This is accurate but very slow**

#### Difference between algorithms and heuristics

Algorithms always produce a correct result. Heuristics may usually do a good job, but do not provide a guarantee

### Problem: Moving Scheduling Problem

**Input**: A set _I_ of _n_ intervals on the line **Output**: What is the largest subset of mutually non-overlapping intervals which can be selected from _I_?

#### Earliest Job First Pseudocode

EarliestJobFirst(_I_)

Accept the earliest starting job _j_ from _I_ which does not overlap any previously accepted job and repeat until no such jobs remain

Taking one job may exclude 2, etc., so no guarantee that it will yield the largest subset

#### Shortest Job First Pseudocode

ShortestFirst(_I_)

While(_I_ ≠ ∅) do

Accept the shortest job _j_ from _I_.

Delete _j_, and any interval which intersects _j_ from _I_

**Accepting the shortest job may block us from taking two other jobs**

#### Exhaustive Scheduling Pseudocode

ExhaustiveScheduling(_I_)

_j_ = 0

_Smax = ∅_

For each of the 2<sup>_n_</sup> subsets, _Sᵢ_ of intervals _I_

If (_Sᵢ_ is mutually non-overlapping) and _(size (Sᵢ) &gt; j_)

then _j = size(Sᵢ)_ and _S<sub>max</sub>_ = _Sᵢ_

Return _S<sub>max</sub>_

**Gets all the possibilities, but isn't efficient when size of input gets larger**

#### Optimal Scheduling Psuedocode

OptimalScheduling(_I_)

While (_I_ ≠ ∅) do

Accept the job _j_ from _I_ with the earliest completion date

Delete _j_ and any interval which intersects _j_ from _I_

**NOTE**: ∅ is a symbol for "empty set"

**Lesson**: Reasonable-looking algorithms can easily be incorrect. Algorithm correctness is a property that must be carefully demonstrated

### Mathematical Proof Characteristics

- Clear, precise statements of what you are trying to prove
- Set of assumptions of things which are taken to be true and hence used as part of the proof
- Chain of reasoning which takes you from these assumptions to the statement you are trying to prove
- ∎ QED to indicate finished "this is demonstrated"

Proofs are only useful when honest - brief and to the point arguments explaining why an algorithm satistifes a nontrivial correctness property

**Take Home**: The heart of any algorithm is an idea. If your idea is not clearly revealed when you express an algorithm, then you are using too low-level a notation to describe it

#### Problem specifications have two parts:

- Set of allowed input instances
- Required properties of the algorithm's output

**Take Home**: An important and honorable technique in algorithm design is to narrow the set of allowable instances until there is a correct and efficient algorithm. For example, we can restrict a graph problem from general graphs down to trees, or a geometric problem from two dimensions to one.

#### Common traps in specifying output requirements:

- Asking an ill-defined question
- Creating compound goals

### Counter-Examples - Instances which disprove an algorithm

Good counter-examples have two important properties:

- Verifiability

  - Calculate what answer the algorithm gives
  - Display/provide a better answer so as to prove the algorithm didn't find it

- Simplicity

### Techniques for coming up with counter-examples:

- Think small - when algorithms fail, there is usually a very simple example on which they fail
- Seek extremes
- Think exhaustively
- Hunt for the weakness
- Go for the tie (good way to break a greedy heuristic)

### Recursion

**Recursion** is mathematical induction - in both, have general and boundary conditions, with general condition breaking the problem into smaller pieces and the boundary condition terminating the recursion

One should be suspicious of inductive proofs because subtle reaoning errors can creep in: First kind of error are boundary errors Second are cavalier extension claims - adding an element could cause entire optimal solution to change

**Take Home**: Mathematical induction is usually the right way to verify the correctness of a recursive or incremental insertion algorithm

### Stop and Think: Incremental Correctness

**Problem**: Prove the correctness of the following recursive algorithm for incrementing natural numbers (i.e., y -&gt; y + 1):

    Increment(y)
        if (y = 0 then return (1) else
            if (y mod 2) = 1 then
                return (2 * Increment(⌊y/2⌋)
            else return (y + 1)

⌊⌋ are floor symbols. This threw me at first because I mistook them for absolute value symbols.

    Increment(3)
        if (3 = 0 then return (1) else
            if (3 mod 2) = 1 then - nope
                return (2 * Increment([3/2]))

    Increment(1)
        if (1 = 0 then return (1) else
            if (1 mod 2) = 1 then
                return (2 * Increment([1/2]))

    Increment(0)
        if (0 = 0 then return (1)

    // 2 * (2 * (1)) = 4

### Summations

Summation formulae are concise expressions describing the addition of an arbitrarily large set of numbers, in particular the formula

<a href="../static/8997d86bec56810416508c616441c672/35a5c/Summations.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 266px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 19.172932330827066%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAACXBIWXMAAAsSAAALEgHS3X78AAAAsklEQVQY02Ooq6tTZaAS+P//PwODrq6uaElJiWpvb685yHAXFxf+oqIi8draWuPS0lIjoJjonDlzhCorK3XLyspsgHKas2bNEpswYQIrUJxvxowZQsXFxWptbW3WkyZNUmNITU1VASpU6evrU2tqapKzsLDgKC8vlwIaBBJXqq6uFgYqlq2qqlICGqpRUVEh29raKgk0lBdkUWNjozhQnTJQvRZQTJkhOTnZGuhURmp5GwDo30hZC1UFrwAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/8997d86bec56810416508c616441c672/35a5c/Summations.png" alt="Summations" class="gatsby-resp-image-image" sizes="(max-width: 266px) 100vw, 266px" srcset="/static/8997d86bec56810416508c616441c672/f723e/Summations.png 188w,
/static/8997d86bec56810416508c616441c672/35a5c/Summations.png 266w" /> </span> </span></a>

There are simple closed forms for summations of many algebraic functions. For example, since the sum of _n_ ones is _n_,

<a href="../static/d5efb5114b36ed8cbf6f458873a136e9/76e43/Summation2.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 73px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 69.86301369863014%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAAAsSAAALEgHS3X78AAACZUlEQVQ4y2Po6elhZgCCZcuWlXV0dLxeunSpL4g/Z84csDjJwM3NjQ1EJycnG7S2tnZOmTIlCMRPTExkBdEiIiIMp0+fZqAKMDAwYATRU6dOZYSJ7dq1C78mZWXlRkFBwUCgS+w4OTmdpKWlXY2MjFrs7Oz8kNUtWbIERd/bt28ZJk+eDGbPnz+fYdGiRYzd3d0MDAEBAd36+vp3/v//D5LjDg8P50lJSXEsLS3tBYqxrVixgmvhwoWKIEmQmri4OMbg4GDGkJAQxpiYGIbjx49juhLomo3W1tazoFxGZLm5c+dq5OfnrwAahjOSdu7cybNu3Tp5YEQKMEBtZgJ681Z0dHQSiA90BautrS0jUBxseFhYWA2QzQliA9XoAV3oCnShG9AnmiCxxYsXNwDBvMLCwhIGU1NTcGwCFZUHBgbGgNhRUVFsMNurqqqEgQYuOnHihDiID/SmFVBtGNDAcGDKMAGJ5ebmJgDFoxobGyG+BKa/5La2tlJkbwBdJHL37l2uBQsWiHp7e1sAvSSIy8vNzc3iM2fOFFq+fLkeQ1JSkkd6evoCoDgbMLZFZ82aZebl5RUJFJ8FNJQFWSMw8TNAfcMAdCGYXV9fj2p6VlbWfAsLi3ZgmDU6Ojp2xsfHL3JyctocERGRCJIHWsbi4eHBtGHDBrD6efPmwQ2sq6sDi9XU1DB2dXUxAH3DBEtTssiW9Pf324DohIQEsIJjx44RnxuA/pcAJsia4uJia6ALHVeuXGlZXl4+BRqOjNBkQbyBwIQtPGPGjBUVFRXBwHwdAQwnJyC7D5iv+UHy27dvJym7AgCuRuguwKC/EwAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/d5efb5114b36ed8cbf6f458873a136e9/76e43/Summation2.png" alt="Summation2" class="gatsby-resp-image-image" sizes="(max-width: 73px) 100vw, 73px" srcset="/static/d5efb5114b36ed8cbf6f458873a136e9/76e43/Summation2.png 73w" /> </span> </span></a>

The sum of the first _n_ even integers can be seen by pairing up the *i*th and (_n-i_+1)th integers:

<a href="../static/52673cedbcb1abb93f19b34da2bae858/4947e/Summation3.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 320px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 18.125%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAACXBIWXMAAAsSAAALEgHS3X78AAAAwElEQVQY02OoqakRYICCCRMm6Le2tjoyUAIyMzOlu7u7BVxcXNhMTEwsIiMj1SZNmiQDNJwHaLg0EAvFxsay9Pf3C3d2dvJXVVVpNDc3C7u5ubG1t7dLt7W1yff29vI2NDSI1tXVKTCUlZXJ19fXS3t7e/PFxMToFxQUaPf09KgDLREDalQH+kAeaCAnULMM0HAJoHptkPqgoCChpqYmrcbGRt2WlhYpoDpJINZhSElJ0YO5NicnxzEtLc2WEh8DABmvRW+7ZhqvAAAAAElFTkSuQmCC&#39;); background-size: cover; display: block;"> <img src="../static/52673cedbcb1abb93f19b34da2bae858/4947e/Summation3.png" alt="Summation3" class="gatsby-resp-image-image" sizes="(max-width: 320px) 100vw, 320px" srcset="/static/52673cedbcb1abb93f19b34da2bae858/f723e/Summation3.png 188w,
/static/52673cedbcb1abb93f19b34da2bae858/4947e/Summation3.png 320w" /> </span> </span></a>

### Two basic classes of summation formaulae in algorithm analysis:

**Arithmetic progressions** The arithmetic progression for selection sort is:

<a href="../static/260e5bde8128c2cdfe879bff93b8c354/fa414/Summation4.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 205px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 24.39024390243903%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAAsSAAALEgHS3X78AAABD0lEQVQY02NgwAKSkpI4W1pa3B0dHblA/P///zMQDXp7e5X6+/v5Jk6cKAzTbGho6CcrK6ubmJioeuDAAU6gMOPkyZOZm5qaOPv6+kTmzJnDDrSUY/r06ezNzc1SnZ2dEkB5idzcXB0GoCL7xsbGuLKyMp3w8HC5+Ph4wejoaE1fX19toOHMXV1d5i4uLtKZmZnSQM0x7e3tHg0NDc51dXW6c+fOVYiLizOvrKx07OjosE1OTs5gANrGMWnSJJ7ly5fzglyooqLCCHSZbWhoqCuQNgGJOTg4MKuqqjLm5eWxANXzVlRUsAItYwLJAQ1mnTVrllRhYSFbVFQUM9ZgCAsLE6iurrY0NjZmYyARAAC2TWDu3Ff29gAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/260e5bde8128c2cdfe879bff93b8c354/fa414/Summation4.png" alt="Summation4" class="gatsby-resp-image-image" sizes="(max-width: 205px) 100vw, 205px" srcset="/static/260e5bde8128c2cdfe879bff93b8c354/f723e/Summation4.png 188w,
/static/260e5bde8128c2cdfe879bff93b8c354/fa414/Summation4.png 205w" /> </span> </span></a>

It's important that the sum is quadratic, not that the constant is 1/2. In general,

<a href="../static/1f9f5be8299025885465f7d1adc9f3e0/c6ec9/Summations5.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 206px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 24.271844660194176%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAAsSAAALEgHS3X78AAABEUlEQVQY02NggILy8nIYk+H///9gurKyUqO5udmcAQnA5HCC3t5eZSBmB7HnzJkjXFdXxwdiu7m5CWtqagbp6uoqlZWVyQPVmBcVFXGC5IqLi0Vramq0uru7Rdra2uRnzJjh2NTUZATk6zM0NjY6AQWDp06dagw0LDY5OVklODhYHaiINSgoyL2qqopt9uzZykA1HjExMQJAMfm0tDQzoOHptbW1cUAfBC9evFilpaVFNj09PYBh5syZnPPmzeMCSkpPmTJFfNasWSwgVxQWFvJFRUV5hIWFOWVkZKiAxNTU1BiBYsxQrzNOmDCBD9m3q1evlsYbHECXSALDERyGQMsYsYVfdnY2w+TJkxmBLgXzAX2yZ/meI0sqAAAAAElFTkSuQmCC&#39;); background-size: cover; display: block;"> <img src="../static/1f9f5be8299025885465f7d1adc9f3e0/c6ec9/Summations5.png" alt="Summation5" class="gatsby-resp-image-image" sizes="(max-width: 206px) 100vw, 206px" srcset="/static/1f9f5be8299025885465f7d1adc9f3e0/f723e/Summations5.png 188w,
/static/1f9f5be8299025885465f7d1adc9f3e0/c6ec9/Summations5.png 206w" /> </span> </span></a>

for *p*≥1. Thus, sum of squares is cubic and the sum of cubes is quartic.

Big theta (ϴ(_x_)) notation will be explained later in book. For _p_ &lt; -1 the sum converges to a constant, even as _n_ -&gt; ∞

**Geometric progression** In geometric progressions, the index of the loop affects the exponent, ie:

<a href="../static/bb5e84f87a5fd3f3e13bc74ffe3c9a4d/348ae/Summation6.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 291px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 17.18213058419244%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAAAsSAAALEgHS3X78AAAA0ElEQVQI12NYs2YNMwMa0NbW5ktMTLQH0iz///9nhIkvWrSItbOzkw/EBooz7N69mwkmB+IDzWJkSElJsW1pabGoq6vTaGhoMIyLi+Nzc3PTNDMzU+7t7ZVrbGzU8PT0FADKG7S3t5tPnTpV293dnTM8PFyqp6dHByhvU1JSomhsbMxSU1NjwJCVlcXT19cnPGnSJNH+/n4RkG1paWmyQIt8ysvLZffs2cNsbW3NPHHiRGGgZlaQvI+PD2NCQgI70EBhIBbp7u7mBYnX19fzAQAFr0t47S+yrQAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/bb5e84f87a5fd3f3e13bc74ffe3c9a4d/348ae/Summation6.png" alt="Summations6" class="gatsby-resp-image-image" sizes="(max-width: 291px) 100vw, 291px" srcset="/static/bb5e84f87a5fd3f3e13bc74ffe3c9a4d/f723e/Summation6.png 188w,
/static/bb5e84f87a5fd3f3e13bc74ffe3c9a4d/348ae/Summation6.png 291w" /> </span> </span></a>

How we interpret the sum depends on the _base_ of the progression, i.e., _a_. When _a_ &lt; 1 this converges to a constant even as n -&gt; ∞

This series convergence proves to be the great "free lunch" of algorithm analysis. It means that the sum of a linear number of things can be constant, not linear. For example, 1 + 1/2 + 1/4 + 1/8+...≤ 2 no matter how many terms we add up.

When _a_ &gt; 1, the sum grows rapidly with each new term, as in 1 + 2 + 4 + 8 + 16 + 32 = 63. Indeed, <a href="../static/e26115c4dfec3248c066a432cf90c239/45687/Summation7.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 142px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 14.084507042253522%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAAAsSAAALEgHS3X78AAAAzUlEQVQI12Po7+/X6+7u1r1x4wY3AxJYunSpcm9vrwCy2IQJExTmz5+vAhRXhfJ1gDhqzpw5HrW1tSlAWoshOzvbMzMzM6irqyu2vLw8EKSwrKwsMi0tLaSpqUkqNDRULjw83CYiIoI7Jiamori4eGpWVpZ/ampqANCQ6IkTJ1qvX79eF6hfLTY2VpWhsLAQ5EJboKQp0LWOc+fONeno6LADssOB4sIeHh78QMOUbGxsmCsrK7Wam5uNpk2bZtPS0hIxdepULWQfANUrAwBD9lRReUAAPwAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/e26115c4dfec3248c066a432cf90c239/45687/Summation7.png" alt="Summations7" class="gatsby-resp-image-image" sizes="(max-width: 142px) 100vw, 142px" srcset="/static/e26115c4dfec3248c066a432cf90c239/45687/Summation7.png 142w" /> </span> </span></a> for _a_ &gt; 1

### Stop And Think: Factorial Formulae

**Problem**: Prove that     <a href="../static/d0b3e92428558d9b6e0ccee8412615db/14f29/Factorial.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 183px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 27.86885245901639%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsSAAALEgHS3X78AAABSUlEQVQY02OYNGlSJAMSaGxsZARiOD82NpYRxq6qqmK0tbVlKC0tZUAHycnJEIagoKBEcHCw3f///1EUTJ48mXPlypVgw0ByZ86cYUeWX758OcvGjRv5gOp4YGLz5s1jYbCzs3MCcYAuNWppaVGur683mzVrlmxDQ0N4amqqVFBQkEpCQoJ4c3OzK1DOqaSkhANoiElNTY1QTk6OO9C1Qfn5+TyhoaHsurq6EgxAQa329naBtrY21enTp4uWlZWp1dXVSU6bNk0TqJDbx8dHpLq6WghomQnQElOgWv6enh6T8PBwrqKiItOOjg4toBmc/v7+QlpaWnwMXl5eLtHR0WEMBAB6kEDFGDEEga7wANquDmIDnc+UlZXFGBUVxdDd3c1QUFDAEBgYCKZBABgEjGlpaQwZGRmMvb29YDFg+DPU1tYyAF0I5gMAfpl3bkXdnUIAAAAASUVORK5CYII=&#39;); background-size: cover; display: block;"> <img src="../static/d0b3e92428558d9b6e0ccee8412615db/14f29/Factorial.png" alt="Factorial" class="gatsby-resp-image-image" sizes="(max-width: 183px) 100vw, 183px" srcset="/static/d0b3e92428558d9b6e0ccee8412615db/14f29/Factorial.png 183w" /> </span> </span></a> Note: Formula in book actually had n at the top to the right of the sum and i = 1 on the bottom to the right of the sum, but further examples had it oriented this way

**Solution**: First verify the base case (here we do _n_ = 1, though _n_ = 0 could have been done:

<a href="../static/f9ea28333a94bc07a1bef384862f43c5/4c6d5/Factorial2.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 312px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 17.307692307692307%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAAAsSAAALEgHS3X78AAAAr0lEQVQI12OwsrJyy8vLk+nt7ZVqa2tTrKqqko+KihLJycmRDA8P5yktLdVsaGiQAfLl6urq9DMyMjizs7OlwsLChIqKihRDQ0MF8vPzxSMjI4VLSkpEGZKSkpyBijSmTZvG1d7eLgA0lCcgIIAzNTWVGyjHXlFRITx58mTuwsJCnpaWFuH///8zpKSkcAEN5MzKyuKPj49nzszM5AwODuYEquFiANpqBnSFJAOVAAB1GDsvH2e4ZAAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/f9ea28333a94bc07a1bef384862f43c5/4c6d5/Factorial2.png" alt="Factorial2" class="gatsby-resp-image-image" sizes="(max-width: 312px) 100vw, 312px" srcset="/static/f9ea28333a94bc07a1bef384862f43c5/f723e/Factorial2.png 188w,
/static/f9ea28333a94bc07a1bef384862f43c5/4c6d5/Factorial2.png 312w" /> </span> </span></a>

Assume the statement is true up to _n_. To prove the general case of _n_ + 1, observer that rolling out the largest term

<a href="../static/37647361c7a2409786e04cf66857c0c3/4947e/Factorial3.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 320px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 16.875%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAAAsSAAALEgHS3X78AAAAuElEQVQI12NwdHS0r6mpkero6JDt6upSKykpUcjOzpZpa2vT7O3tFQfKqRUXFyu3trYqt7e3a9fX10sXFhbq9/f3y+bl5SnZ2tpaAtXJA+WkgWqMGFJTU23S0tKUNm3axAxUzJmUlMQKNICzu7ubF6iJHWgRJ9ACDqAGbqAYH5Bmz83N5Zw9ezZrQ0MDX0ZGhnVycrLM/PnzWWprazkZmpubbUpLS8UYyAA9PT2snZ2d9n5+ftwwMQC8BUX81MWgxQAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/37647361c7a2409786e04cf66857c0c3/4947e/Factorial3.png" alt="Factorial3" class="gatsby-resp-image-image" sizes="(max-width: 320px) 100vw, 320px" srcset="/static/37647361c7a2409786e04cf66857c0c3/f723e/Factorial3.png 188w,
/static/37647361c7a2409786e04cf66857c0c3/4947e/Factorial3.png 320w" /> </span> </span></a>

reveals the left side of our inductive assumption. Substituting the right side gives us

<a href="../static/314c88d4c6bba8748da33a1ffd8d7286/c18f7/Factorial4.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 343px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 15.74344023323615%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAAAsSAAALEgHS3X78AAAA0UlEQVQI12MoKCjwLyoqkmQAggkTJjAyIIEPHz4w7Nu3D0VszZo1zDNmzGBCFpszZw7LqVOnGP7//8/A4OTk5FBTUyPT0dEh29nZqZ6cnCxZW1ur2tbWJt/d3S1TWFio3tjYKA/k6wCxbH5+vhZIrqmpSamlpUVz0qRJolVVVSY5OTmi6enpogxAhlVGRoYMyHSgQSzu7u5Mra2tHEDD2GbPns1SVlbGCrSQtaenh7O/v58V6CNWIM08ZcoUdqDBHLNmzWIBqmeLjIxkCggIYAQAOj9TgL7hl+QAAAAASUVORK5CYII=&#39;); background-size: cover; display: block;"> <img src="../static/314c88d4c6bba8748da33a1ffd8d7286/c18f7/Factorial4.png" alt="Factorial4" class="gatsby-resp-image-image" sizes="(max-width: 343px) 100vw, 343px" srcset="/static/314c88d4c6bba8748da33a1ffd8d7286/f723e/Factorial4.png 188w,
/static/314c88d4c6bba8748da33a1ffd8d7286/c18f7/Factorial4.png 343w" /> </span> </span></a>

<a href="../static/e8b7e017f8a22855c273707b6c3a66a1/d8176/Factorial5.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 233px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 7.725321888412016%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAACCAYAAABYBvyLAAAACXBIWXMAAAsSAAALEgHS3X78AAAAo0lEQVQI12Nob283yczM5J07d66sr6+vRE9Pj21xcbFdU1OTdG9vr0xBQYF8ZWWl/aRJkwzLy8u5J0+erFhRUSEMFHPLzc0VmTlzpmxwcLBgY2OjA1CPIkNNTY0XEMsCFZoqKysLNjQ0WLW2tho0NzfLV1dXawEN1QCyfYDiLt3d3eJ9fX3WXl5evHl5eQ4tLS1S/f39ZkCHCBcVFZl1dXWpAQBZMD/OguQ2YgAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/e8b7e017f8a22855c273707b6c3a66a1/d8176/Factorial5.png" alt="Factorial5" class="gatsby-resp-image-image" sizes="(max-width: 233px) 100vw, 233px" srcset="/static/e8b7e017f8a22855c273707b6c3a66a1/f723e/Factorial5.png 188w,
/static/e8b7e017f8a22855c273707b6c3a66a1/d8176/Factorial5.png 233w" /> </span> </span></a>

<a href="../static/a2ec89b5a42156e322cf54065410169c/db935/Factorial6.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 110px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 16.363636363636363%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAAAsSAAALEgHS3X78AAAAyUlEQVQI12NgQALt7e08M2bMcEIW+///PyuI3rt3L2tlZaVrX19fUFdXl21bW5s5srqrV69yNTU1uTBERUXpBAcHu6SlpYkEBgaqNTY22gA1NFVXV/uCFNbV1WUCxdxB7PLy8sTY2Fg7oJ6IoqIixz179rC5urrqBwQEyIHkExMTc0EGqoSEhFgADRNobm5WnDBhgldqaqon0CXBIEXTp0/3mTVrljaInZ6enlNRUWENcunq1auVgXxGb29vAQcHB06gT1hiYmIiALGYS5zyZNYxAAAAAElFTkSuQmCC&#39;); background-size: cover; display: block;"> <img src="../static/a2ec89b5a42156e322cf54065410169c/db935/Factorial6.png" alt="Factorial6" class="gatsby-resp-image-image" sizes="(max-width: 110px) 100vw, 110px" srcset="/static/a2ec89b5a42156e322cf54065410169c/db935/Factorial6.png 110w" /> </span> </span></a>

This general trick of separating out the largest term lies at the heart of all proofs.

### Modeling the Problem

**Modeling** is the the skill of taking your application and describing it in such a way that you can connect what problems you need to solve with the abstract algorithms you can use to solve them

### Combinatorial Objects (Common Structures):

**Here is a list of common objects and the keywords to know to use them**

**Permutation**: Arrangements of items. Keywords: arrangement, tour, ordering, sequence

**Subsets**: Selections from a larger group of items. As order does not matter in subsets as they matter in permutations, permutations of subsets are considered identical. Keywords: cluster, collection, committee, group, packaging, selection

**Trees**: A structure used to represent hierarchical relationships between items. Keywords: dominance relationship, ancestor/descendant relationship, taxonomy, hierarchy

**Graphs**: Structures used to represent relationships between arbitrary pairs of objects. Keywords: network, circuit, web, relationship

**Points**: Represent locations in geometric space. Keywords: positions, sites, data records, locations

**Polygons**: Represent regions in geometric space, eg borders of a country can be described by a polygon on a map/plane. Keywords: regions, shapes, configurations, boundaries

**Strings**: Sequence of characters or patterns. Keywords: text, characters, patterns, labels

Recursive decompositions of combinatorial objects:

**Permutations**

{4, 1, 5, 2, 3} -&gt; 4+{1, 4, 2, 3}

**Subsets**

{1, 2, 7, 9} -&gt; 9+{1, 2, 7}

**Trees**

<a href="../static/e7cdc69664e1e68fddc655439a13040c/fad5d/Trees.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 308px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 29.87012987012987%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA1UlEQVQY031RWw6CMBDs/W/EIeCDAH8SBSQiWB8QEMoybjdAGmOcpN1Hp7s7rQJjWRZZFnkYYux7uPnvtWEhEvuqazSHg/jKJYzjCOJ4MmYv+AtuYbsb5pv1jrIbcaCLAvPasW9bPC8X8WmehUx81nLeNt3Q3W4YOLfBTioF3yzxejzuB0PX4V6W4ldVhSAIkCQJPM9DlmU7r8lzdFrv8Z2HUiJxmkCORMNT/ZO8cawicnIz89XJ9yXQ3PnBUxFLKuP456fQ+iSWq1cF5ygSW6cp2qbBB/oD08fLCQF2AAAAAElFTkSuQmCC&#39;); background-size: cover; display: block;"> <img src="../static/e7cdc69664e1e68fddc655439a13040c/fad5d/Trees.png" alt="Trees" class="gatsby-resp-image-image" sizes="(max-width: 308px) 100vw, 308px" srcset="/static/e7cdc69664e1e68fddc655439a13040c/f723e/Trees.png 188w,
/static/e7cdc69664e1e68fddc655439a13040c/fad5d/Trees.png 308w" /> </span> </span></a>

**Graphs**

<a href="../static/aa62d0b2dea87cb3d65c7430fa8f3836/caea0/Graphs.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 306px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 16.666666666666664%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAl0lEQVQI102OyQ6DMAxE+f+f4hNYbuXUKuxSoEHQ7J6aiKL6Mtb4je3MHAdEXeNXRARRVdi3Dc+iAHmP/zrnr7JEMOb2zvyH+ZY1Izb0NfQcttam3jmXdFlXCCGQ5zkeTZM8w3wkujN0qY8RmWxbWK0huw7u+mbpexz7DjVNcHwghIC3UlBSQs1zWrCOIzQziR+GxG/MfwFbC+aTvsXbOQAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/aa62d0b2dea87cb3d65c7430fa8f3836/caea0/Graphs.png" alt="Graphs" class="gatsby-resp-image-image" sizes="(max-width: 306px) 100vw, 306px" srcset="/static/aa62d0b2dea87cb3d65c7430fa8f3836/f723e/Graphs.png 188w,
/static/aa62d0b2dea87cb3d65c7430fa8f3836/caea0/Graphs.png 306w" /> </span> </span></a>

**Point Sets**

<a href="../static/e9cd13128e642d91c8f7358cbba75b43/ff71e/PointSet.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 416px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 34.61538461538461%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6UlEQVQoz11SWxKDIAzk/rf0t9W2PkBAIN3NJJ22O4PEmMdmYxhjiMPtep6St+3H7wcP6deld61VemtyzLM0+oDAx5WzOh2tFPUR8fGQf2gBFGP73rvaRNl3Cc268HwjPp/KqMQoBcXXdZWckjRrpETQuJPpcchpE4WExIokFq5IcKb0OcsNwdM0yYZYskivl8bHZZFqMRdkYoNA5wBtBhHdtKAm++2m3xwnCtJPSdzfbOQEaTKYBlYms4KXZGOqTvf7x+bN0SiLM6O2zCFYiNJ8lsKOvgjd5t92v/+AYYW5DLVxF1sKWb8BDlgl2ohTPX0AAAAASUVORK5CYII=&#39;); background-size: cover; display: block;"> <img src="../static/e9cd13128e642d91c8f7358cbba75b43/ff71e/PointSet.png" alt="Point set" class="gatsby-resp-image-image" sizes="(max-width: 416px) 100vw, 416px" srcset="/static/e9cd13128e642d91c8f7358cbba75b43/f723e/PointSet.png 188w,
/static/e9cd13128e642d91c8f7358cbba75b43/d744b/PointSet.png 375w,
/static/e9cd13128e642d91c8f7358cbba75b43/ff71e/PointSet.png 416w" /> </span> </span></a>

**Polygons**

<a href="../static/c83e1cd4acc47be61e8eec3194bf88bc/67234/Polygons.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 316px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 46.202531645569614%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAzUlEQVQoz12SSw6AMAhEe/9beQyX7t0Z/5+aR/IMlqQpZYYplJaabN/3uixL+Od5fj72PM9vYeDkYNu2xSrrugYBAdZ93wEQO44jYgpmA4MLjih4CM7zHI7Ckq1EMslwOSNCDkYcvl0VApYt0Vvxr+v6VcbFCLCDw+OMz16syETbtc1xHOswDLXrutr3fcTh5qeRGxUayGD2rRrhaZo+XGHblV9sxYGw007bajsQcd9U0eJ08nvkNtqvkn9E+84hqBjVZWtFnajD8Nu0/BcoGcUwMTqi3wAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/c83e1cd4acc47be61e8eec3194bf88bc/67234/Polygons.png" alt="Polygons" class="gatsby-resp-image-image" sizes="(max-width: 316px) 100vw, 316px" srcset="/static/c83e1cd4acc47be61e8eec3194bf88bc/f723e/Polygons.png 188w,
/static/c83e1cd4acc47be61e8eec3194bf88bc/67234/Polygons.png 316w" /> </span> </span></a>

**Strings**

A L G O R I T H M -&gt; A | L G O R I T H M

**Take Home**: Modeling your application in terms of well-defined structures and algorithms is the most important single step towards a solution

### Recursive Objects

The key to recursive thinking is looking for things that are comprised of smaller things of the same type. All of the items in the combinatorial objects list could be thought about recursively.

**Permutations**: If you delete the first element of a permutation, you'll get a permutation of the remaining elements. Permutations are recursive objects.

**Subset**: Subsets contain subsets of even smaller subsets. Subsets are also recursive objects

**Trees**: If you delete the root of a tree, you'll get a collection of smaller trees. If you delete a leaf, you're left with a slightly smaller tree. Trees are recursive objects.

**Graphs** If you remove any edge or vertex from a graph, the resulting structure is still a graph. Graphs are recursive objects

**Points**: If you remove or separate points, you're still left with points. Points are recursive objects.

**Polygons**: Polygons are recursive because you can split them apart by adding chords between nonagent vertices and still end up with a polygon. The smallest simple polygon is a triangle

**Strings** If you add or remove characters of a string, you're still left with a string

### Psychic Lottery

**Problem**: Given four lotto numbers (out of 15), find smallest number of tickets needed to guarantee at least one winning ticket.

- Need a way to generate subsets
- Need a way to cover
- Need to keep track of combinations covered
- Need search algorithm to decide what to pick next

#### PseudoCode

LottoTicketSet(_n, k, l_)

Initialize the <a href="../static/de7ce253a913f85bcaa4233067310294/5dcab/lotto.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 31px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 145.16129032258064%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAdCAYAAACqhkzFAAAACXBIWXMAAAsSAAALEgHS3X78AAAFd0lEQVRIx5VWfUiWVxS/74dvCrEVMmY6RojkNAVdfkXYSJvzI6cklgimZmVavpotp6nlR0k6P8NEpdQKLavV5hcVUfRBLNSarpiplTbKieVWqQxJ737nvvd59o4Ro/vPOefe+5x7z++c87sPa2lpYTRqamp0JO/fvx9y5coVfu/eva/JvnXrlpin0d/fryX54MGDyJKSkj/27t37KdkXLlywIDk+Pm7a2NnZKT6amZmxh2Pe0dHRKH1ojx07pr948aKuq6tLt3nzZl1dXd0CWtixY0d0cnLy75xzG7LfvHmjHsw8PT2FER0d3YWNbex/RnV1tRXJlJSUH4uLi9/C6QdkQ2oZTjeQ0dDQkJWTk4M5vlz5MC0tbWFeXl7okydP/Nrb26O2b98ecfPmzc+Vdexdsnv3bo4oMshes2aNVlmw2rhx46sjR478QLaXl5cecwZg1X/69GlOB92+ffvbAwcO9OJWI7THAoNkRkZGA6Kii/wTAnAxpqam8hcvXixV5i5fvrz04cOHMYWFhT/5+Pg001xubm5JVFTUIOknTpwQWM7Pz38WHh7Okcgi1SFOmVq1alWTNDXPnj3TKGsBAQFDgOM70p2dnU/W19f3K/tKS0uF05iYmF+Cg4O/Vx2uXLlyIjEx8RvSgZnFtWvX9KTfvXs3LSgoaJ50YO0WGxvL9+3bl3ru3DkjzZWXlwuHBw8ezNqyZQuF7cZaW1tj1q9fz4eHh2Npsa+vT5+VlSUcZmZmxu7fv3+A9Bs3bjhVVFQ8BTx3BgcHo2kONWwh72RYt24dx14vtmvXrmqE8hvNwrFaS2fOnFEjWL16tapTPSp6VVWVgGZqasomLCyMsrKcLVu2rNTX11dkzsPDQyuzzszluwZg0Mh9H8fHx3MkcEhAAOOpdKhD6JQk8QFqjJWVlQl9dnaW1dbWsqNHj6oHjY2NKQ6XoAJ4eno6Z66urq1JSUnDtODt7a1j7zGmp6dJiG+sra3zt23bxhkVLQrzjsTqvRzSsLOzUxKTjBrljAraaDR2v8thQUGBkGg5/aFDhwTGkGLu5cuXJERFWFpapm/YsIFTljkw7JH1+C+He/bsERJlpFXmUKca8z0ODg7KDRMAHWdWVlaVmzZtEll2c3P7zw1DQkKEg5GRkXDwnyvpkBozDMXw8/M7SZdjtra2JRERESLLjo6O2t7eXnUTbq6VTj2ys7P58ePHK8gGu1hIolWy/Ami4OgcztAyJS4uLsOyp/WKs6GhITYxMSEcgjS8AwMDx0BjX5A9Ojoq5hsbG9WyocLOz88/xcDOxdSHc3Nz4bQIJzpy5u/vzy5dumQhu6Mc+DwnvaenRz3U3d1dwdOwdu1aKk57Bkee1Mvo0TRaQW8rIFONCt3e3j4bXDmpsAxoTbwfwF7c9PDhw4mRkZH80aNHPmLH1q1bX+GEauUdef36NcMjpYRjs3Pnzr+AbwDZTk5OasabmpoMsgr6kNBOFXzwWh6YguhnIdltbW0anKiEswjYcHCiqywTzcDAgOn9MB3ojL1v0aIVzOxtWIyw/8Qz8KXkN+2KFSvEB+DJeGR5aHJy8lfgF0pzoC8d+lzAkZCQEB0XF0eXEdxInGeQC1XgtGEFp/Pnz+skjaUgaf3Nzc2CkfFYaSU5aCB1oaGhPwOyUgUuc6oyULaRnDK5qDt79iyT5LoEjhYrESF8S5J4DloIDgxrsru7u0344j0WyvXr143gNA5+XCQfJSohrXnngL70snw80bvPUU4uZKPodeYYmq5rcmJEgY+haD+SeGqKioqonNRfkcePH/vhXaHOiJev5gIJh6kjFKf4tRCnVFZW+sORnWQWjdm/jdCvXr3qhsr4Ct98qHyLfx2x52/7Gbfd5SzOjgAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/de7ce253a913f85bcaa4233067310294/5dcab/lotto.png" alt="lotto" class="gatsby-resp-image-image" sizes="(max-width: 31px) 100vw, 31px" srcset="/static/de7ce253a913f85bcaa4233067310294/5dcab/lotto.png 31w" /> </span> </span></a> -element bit-vector _V_ to all false

While there exists a false entry in _V_

Select a _k_-subset _T_ of {1, ..._n_} as the next ticket to buy

For each of the _l_-subsets of _Tᵢ_ of _T_, _V\[rank(Tᵢ)\]_ = true

Report the set of tickets bought

Client provided counter-example - 5 tickets would cover when the algorithm had said it would take 28.

Problem in modeling -&gt; didn't need to cover every combination (which they would have realized if they'd attempted to solve a small example by hand before jumping into code)

Recommended books for war stories: _Mythical Man Month_ and _Programming Pearls_

[Algorithms](../tags/algorithms/index.html)[Algorithm Design Manual](../tags/algorithm%20design%20manual/index.html)

### &lt;&lt; Previous: Computer Science Distilled 1.1 Basics & 1.2 Logic

### &gt;&gt; Next: Algorithm Design Manual: Algorithm Analysis
