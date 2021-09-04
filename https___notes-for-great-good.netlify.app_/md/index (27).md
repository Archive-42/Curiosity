This app works best with JavaScript enabled.

# Computer Science Distilled

## Chapter Two

### Complexity

#### 2019-01-30

Time complexity is written _T(n)_ and gives the number of operations performed when processing input of size _n_ - we also refer to it as "running cost". If a function is quadratic (n<sup>2</sup>), we can predict how much longer it takes to run with double the input using <a href="../static/029a73cdce06fa03dac0626416315d67/d6245/doubleT.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 67px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 55.223880597014926%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAPoAAAD6AG1e1JrAAACDElEQVQoz5VSyYpaURC9775WaVwFQXARCGQR6Jj064lkkQl6ISIxtApq49DSTuCAOEYRY1CI0yIYtV0I7bwJ0gt3iuYP/A+/wKVddXugMxCw4FL1zq06deq+It/BbDbbWKVSzRKJxFWtVmtlMplfFovlhDywZDLJoR+Px+S/tlqtdpxO5ye9Xm9er9eybDb7xmg0HkOTH6PR6HO5XE7GYrEPmJtOp+mf9f1+n/l2u00KhQJrSkwm0wUQ7GMMpNsgugxKDuPxeNvhcPgikcgXvIOYHwwG92TL5ZL5breLdTdgKpV6ptVqfzabzdf47XK5YkA+gWKT1+v9CKoMjUbj6x0J4JzBYKA6nY5arVaay+XuGxSLxcdkE1Or1X9hMA17BhB05vf7LzHeoZQqwT+Ho5RIJEqpVKrkeR4xPC8wRyaTiTAZftZTUHgMCt/b7fZ3iC0Wi5edTqcJ6tkkApw99BzH7YnF4gORSHSA8YO7XblcLr4lPATCcyC0wMiniM3n86NAIJACfEI2NVBFoXALCLfA86VSiUc8Go0+gSfRYcwJgsDeYTgcPur1ekfValUIBoPbiCkUCrxj6wDF/2xSqVT434DpdMoIZ7PZST6fn8C6fPN4PG8R8/l89Ha1WC6MSUAZAYU4PnG73QyHGk6j0dwQwzIzBeFw+JXZbD4LhULper3OGFqtFt3kSa4BeOayGQYeB10AAAAASUVORK5CYII=&#39;); background-size: cover; display: block;"> <img src="../static/029a73cdce06fa03dac0626416315d67/d6245/doubleT.png" alt="doubleT" class="gatsby-resp-image-image" sizes="(max-width: 67px) 100vw, 67px" srcset="/static/029a73cdce06fa03dac0626416315d67/d6245/doubleT.png 67w" /> </span> </span></a>

When an algorithm can have different values of _T(n)_ for the same value of _n_, we use cases:

- _Best Case_ - When input requires minimum number of operations for any input of that size. For sorting, this is usually the case for already sorted input.
- _Average Case_ - Average number of operations for input of a given _n_. For sorting, an input in random order is usually considered.
- _Worst Case_ - When input requires maximum number of operations for input of a given size. In many sorting algorithms, that's when the input is given in reverse order.

In general, we care about the worst case. This gives a guaranteed baseline that we can count on.

## 2.1 Counting Time

Let's use Selection Sort as an example for how to calculate time complexity. In Selection Sort, an outer loop updates the current position being sorted and an inner loop selects the items that goes in the current position

    function selection_sort(list)
        for current <- 1 ... list.length - 1
            smallest <- current
            for i <- current + 1 ... list.length
                if list[i] < list[smallest]
                    smallest <- i
                list.swap_items(current, smallest)

The outer loop runs _n - 1_ times and does two operations per run (one assignment and one swap), totalling _2n - 2_ operations. The inner loop first runs _n - 1_ times, then _n - 2_ times, then _n - 3_ times, etc. <a href="../static/d1f55836a97fd1bc86aabce7c85bebc4/cae85/selectionsort.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 567px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 22.39858906525573%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAa0lEQVQY05XOywqAIBCFYReVXRBr02URFEb1/k/YbxyhRS0SPmYcZ1RjvleNEQMmLNixIeDUPqhvRh8HM+TyzAt4HGos0cBh1SVWD0ed4t3QitNBpeFONa9olad6ZX6sSUPpp70eSb/J3oYu79wD6lAAwOIAAAAASUVORK5CYII=&#39;); background-size: cover; display: block;"> <img src="../static/d1f55836a97fd1bc86aabce7c85bebc4/cae85/selectionsort.png" alt="selectionsort" class="gatsby-resp-image-image" sizes="(max-width: 567px) 100vw, 567px" srcset="/static/d1f55836a97fd1bc86aabce7c85bebc4/f723e/selectionsort.png 188w,
/static/d1f55836a97fd1bc86aabce7c85bebc4/d744b/selectionsort.png 375w,
/static/d1f55836a97fd1bc86aabce7c85bebc4/cae85/selectionsort.png 567w" /> </span> </span></a>

In the worst case, the _if_ condition is always met, so the inner loop does one comparison and one assignment _(n2 - n)/2_ times, hence _n<sup>2</sup> - n_ operations. The algorithm costs _2n - 2_ operations for the outer loop and _n<sup>2</sup> - n_ for the inner loop. Because constants are ignored, the time complexity is _T(n) = n<sup>2</sup> + n - 2_. In terms of Big O, we can round to _n<sup>2</sup>_ because _n<sup>2</sup>_ is the dominant term.

### Understanding Growth

To predict how execution time will grow, you don't need to know all the terms of _T(n)_. You can approximate by taking the fastest-growing or dominant term.

#### Index Cards:

_Problem_: Yesterday, you spilled a box of index cards and it took you two hours of sorting to put the items in the correct order. Today, you knocked over 10 boxes. How much time do you need to fix your greivous error?

_Solution_: <a href="../static/fc73f515b0cbfa2f25aace53738297ad/3f4c8/spilledboxes.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 186px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 24.193548387096772%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAk0lEQVQY033Q6wqCQBCG4SGlqLUDpCgdrSAs/CFBBF5C939BvQNfJUEOPLDujDuza2ZWYIkD5phiZN+YIcceARku1hMbHNHipuKkk1/hqvxdtaGTH2gA3xv6xhalOr8n8QNrpLLTLTx30nqCNRZ44InGD6z0QyFjdQ4/V881fazvSLWRaj/1pTqetU7+PE2l9+2NFwUzBuUhSZM7AAAAAElFTkSuQmCC&#39;); background-size: cover; display: block;"> <img src="../static/fc73f515b0cbfa2f25aace53738297ad/3f4c8/spilledboxes.png" alt="Spilled Boxes" class="gatsby-resp-image-image" sizes="(max-width: 186px) 100vw, 186px" srcset="/static/fc73f515b0cbfa2f25aace53738297ad/3f4c8/spilledboxes.png 186w" /> </span> </span></a>

## 2.2 Big O Notation:

Big O Notation is a special notation referring to the classes of growth and is used for expressing the dominant term of an algorithm cost function in the worst case.

When designing, it's important to anticipate the most frequent operations necessary to your algorithm and to figure out the best data structure to use that may minimize the cost of such operations.

**Graph I made to represent some Big O notations** <a href="../static/7b10aace45d55816e29e1540f9d9f6b9/ff71e/bigOchart.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 416px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 75.96153846153847%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsSAAALEgHS3X78AAABe0lEQVQ4y52TW2/CMAyF+f+/by/THqZRBPSSlqRtmptz5gToYIMCs3SUpKq/HsfuqqoqpBBtC806x6AtLiMmRQKF6XiOEbdiJYRArxSquobpe0Q9whsDpT16HaBNANExmVyPYLploGJYz6C0umkCHToYbTBaQi0dRO8QiAFkEKyCt8MyUEqZNwlqhwGcC+PpulyyIK9PIHrsMIU8HLgcA8ewkCzxraUcIs+lDtcfuAPLwOQsEKFnp2QtjAvAKSE3gWFxPser/SJwYKDlu3Php6TUhN8lLrmbgcRAKRoY68/mjs4ovASbgc57HBoB544A8iPD3MuwGThyd1Uns7vIg0vB/AuWgUOCSZ5FlTrpL8Yj/lmfUZ7DtungjEZMpcb7yU85FG2HpiyBoB++nDvPXc/jlNcI7fnKnEKIPj9fFV9ryGYLHxyss/zvjk9rshrd2EBOLeq2RKcEVh/vbyiKT2y2G1aB3X53U3tWyZWUZXWhElVZo6kFinWR9Q1Ue5mbepLfbAAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/7b10aace45d55816e29e1540f9d9f6b9/ff71e/bigOchart.png" alt="Big O Chart" class="gatsby-resp-image-image" sizes="(max-width: 416px) 100vw, 416px" srcset="/static/7b10aace45d55816e29e1540f9d9f6b9/f723e/bigOchart.png 188w,
/static/7b10aace45d55816e29e1540f9d9f6b9/d744b/bigOchart.png 375w,
/static/7b10aace45d55816e29e1540f9d9f6b9/ff71e/bigOchart.png 416w" /> </span> </span></a>

**Another graph** <a href="../static/1a0e5a094f9299b4148fcec007817708/e1a53/bigO.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 698px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 76.50429799426934%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsSAAALEgHS3X78AAAC7ElEQVQ4y32TO0xUURCGb2MsbKhtDBYWNsZQa2JMjBUaSTSC7oN7z91dWDSxILGyIbFSCxMTjY9Y8FJgH4CohRqNFoZE0cQHLiAvWdhlcd/LY+d35txll8piMnNOcr77/zNzjUS7jWnlwYztxRTn5TaFFb5bClj6LLXE9n3tLJnvggrLfq47FIp3FYxk0IefpgtfPRcw4W7BrK8VcjfvNzFpuvHLciNegS1XcwXGddy2sdqpsNmjgDEbhqPQizkGicpERcFvrgUqkCqofbtWGhq3FdJdChRm2DMbFPkPUJTttOmA7apFOedvC4hjhGFRzsOqBhRFs7Zjd9Fv6b4mqiANppWgTWIxeUVh/bFYVBq0MzRQlE2yIhmEAAUsvUzU+kZOvxTWrikqDzrKxKKo2xk1IA9giR/LOVYbBKtStBxgsF9R7oYijIhFRRRxFBUGWlEcbMV6yES63wNjKaCqKyOQP5V1STgwxH38kcuKSvcZNmZTxRppRcNsv9uF2YfNOq8PmTAWeZLSP+mjAKV3CwGTEkHHYuqqoq1+gYlFPQASUIkfr/W5kXniwWbYqlneViRQHgbFlJsSshI+RZnr2hphVKsREBXYXqrXjb9sbyNkaZUSWrlMWQYhi81DoGnbQwvKBKujwh3HosC2wty/p14NEkVbEQaN6l4yxNIgRBkaDjhAnjDJlKe9/KjTpq1uBj23tYJ0v5tSfS7kBz0oRyvWoj7QUBtoMMi5HRTiesQE3pxlYJslvxz9cLso22VTOWxRMaJtUarXS8UBHxDqAMKXWAEDIgHghQt4fxr4fAyYOgQk9wL5PdjIGzCmTA+NXzyPzC3+uXm/0t0W5XtYSUgW1wu8auLHx4GJBmCmHlitA2V3oZA1UFjnKBnIck7mduP7XB2Mj63nELvZXM5GW0rJaGM59fokVj8dpXjsMM3FDyC2uh/fMvvwJV+P8dxBfMg24F3uCN6WTuBloRGRbBMezTfi3twpPEicwT8vClhU45Ea4QAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/1a0e5a094f9299b4148fcec007817708/e1a53/bigO.png" alt="Big O Graph" class="gatsby-resp-image-image" sizes="(max-width: 698px) 100vw, 698px" srcset="/static/1a0e5a094f9299b4148fcec007817708/f723e/bigO.png 188w,
/static/1a0e5a094f9299b4148fcec007817708/d744b/bigO.png 375w,
/static/1a0e5a094f9299b4148fcec007817708/e1a53/bigO.png 698w" /> </span> </span></a>

## 2.3 Exponentials:

O(2<sup>n</sup>) is known as _exponential time_. Functions written in exponential time grow so quickly, they're considered not runnable as they work for few input types and require a lot of computing power if inputs aren't tiny.

Some algorithms are worse even than exponential, such as _factorial time_ algorithms _(n!)_.

## 2.4 Counting Memory

The measurement of the amount of working storage an algorithm needs is called _space complexity_. We measure space complexity in much the same way we measure time complexity, but count memory rather than computing operations. Usually have to make a trade off between have a good space complexity or having a good time complexity.

[Computer science](../tags/computer%20science/index.html)[Computer Science Distilled](../tags/computer%20science%20distilled/index.html)[Big O Notation](../tags/big%20o%20notation/index.html)[Time complexity](../tags/time%20complexity/index.html)[Space complexity](../tags/space%20complexity/index.html)

### &lt;&lt; Previous: Computer Science Distilled 1.2 Logic, 1.3 Counting && 1.4 Probability

### &gt;&gt; Next: A Tour Of Go Basics I & II
