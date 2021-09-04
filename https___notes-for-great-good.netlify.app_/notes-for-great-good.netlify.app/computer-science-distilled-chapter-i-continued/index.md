This app works best with JavaScript enabled.

# Computer Science Distilled

## Chapter One

### 1.2 Logic, 1.3 Counting && 1.4 Probability

#### 2019-01-29

### Logic in Computing

Logic gates perform logic operations on electric current. Logic gates include NOT, AND, OR, NAND, NOR, XOR, etc.

**Logic gates calculating 2 + 3 = 5 (10 + 11 = 101)**: <a href="../static/35de99570c6644b12cdf5698a7405e7a/6941e/LogicGates.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 750px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 51.18306351183064%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsSAAALEgHS3X78AAABrUlEQVQoz12SW2/bMAyF8///2oC9FHvYEHTpsjSxHce2JN9ki9+OnLQLSprWhcLh4WVX7X8Q3g8QPOY63PVC+/rC2pRcizNVWRFmjyc8rH9Y0L/XP3z6/rRv7G59TbVe5RplA7+XI8GV9Mlxm1qGYWTBWBatUdY7ltETlwmnfT/1LOu8+cfBs0OSWAkWGG1AHIl9w9w2FGI3ew8+QH2DWwM/f8HhjVRVlJeCrutICprfjPu9AA2iRXEbthQGy7uRaZ3EbsBSQuHzMyyfVRbLZ90vebXsYfPrcAdcbaWRHu1Im9Ua/nLCTaqMIsclKo2E1bUAHTQN3fVKnc/L+gATTlrZGf/VmRPDnosVHDjThI6yVD2DUs7szmdMKSLQUaUYZJZLIulVskPzKkC7g+Wvt9yaQf0amJ9TeazPtklOOQeTdNYRU7w35eNF2KAGtUWpqq4fsgX9avk+xk+GebCSdOcmpx6vJEt488xMYppHKGocInOc1QDjK91tuyZcVW6j1a7thrP7fvrGRXo2DbFV2/5k79TcOPkTVVHhR38fYAV8tnxXNAU3jdQUpy3WP6ujCgaah81RAAAAAElFTkSuQmCC&#39;); background-size: cover; display: block;"> <img src="../static/35de99570c6644b12cdf5698a7405e7a/26fb4/LogicGates.png" alt="LogicGates" class="gatsby-resp-image-image" sizes="(max-width: 750px) 100vw, 750px" srcset="/static/35de99570c6644b12cdf5698a7405e7a/f723e/LogicGates.png 188w,
/static/35de99570c6644b12cdf5698a7405e7a/d744b/LogicGates.png 375w,
/static/35de99570c6644b12cdf5698a7405e7a/26fb4/LogicGates.png 750w,
/static/35de99570c6644b12cdf5698a7405e7a/6941e/LogicGates.png 803w" /> </span> </span></a>

## 1.3 Counting

Both counting and logic belong in the field of _discrete mathematics_.

### Multiplying:

If one event happens _n_ ways and another _m_ ways, the way to calculate the number of ways both can happen is to multiply them.

#### Creating a PIN:

_Problem_: A PIN is comprised of two numbers and a letter. It takes one second to try a PIN. Worst case, how much time is needed to crack a PIN?

_Solution_: Two digits can be chosen 100 ways (00-99) and a possible letter in 26 ways (A-Z), making 100 \* 26 = 2600 possible PINs. Worst case would mean having to try every single combination and arriving at the right PIN on the last attempt. Since each attempt is a second and worst case is 2600 attempts, the worst case would be 2600 seconds or around 43 minutes.

#### Hiring a Team:

_Problem_: There are 23 candidates wanting to join your team. For every candidate, you flip a coin and hire if the coin lands on heads. How many team configurations are possible?

_Solution_: When you start, the only configuration is you alone working at the company. Every coin toss then doubles the number of possible configurations. Since there are 23 candidates, that would mean 2<sup>23</sup> or 8388608 configurations.

### Permutations:

If you have _n_ items, you can order them _n_ factorial (_n!_) different ways. _n! = n x (n-1) x (n-2) x...2 x 1_.

#### Traveling Salesman:

_Problem_: Truck company delivers to 15 different cities and you want to know the best order to serve the cities such that you use the least amount of gas. If it takes one microsecond to calculate the length of one route, how long does it take to compute the length of all possible routes?

_Solution_: Each permutation of the 15 cities is a different route - _15 x 14 x 13 x 12 x 11 x 10 x 9 x 8 x 7 x 6 x 5 x 4 x 3 x 2 x 1_ = ~1.3 trillion routes. In microseconds, roughly 15 days.

#### Precious Tune:

_Problem_: A musician is studying a scale of 13 notes. She wants to render all possible melodies that use six notes only. Each note should play once per melody and each six-node melody should play for a second. What would be the audio run-time for this song?

_Solution_: To count permutations of 6 out of the 13 notes, we need to ignore permutations of unused notes and stop developing the factorial after the sixth factor. _n!/(n-m)!_ is the number of possible permutations of _m_ out of _n_ possible items. <a href="../static/7c6f13042c33b35a76b08bdd967d64c2/9238b/melodies.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 565px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 7.433628318584071%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAABCAYAAADeko4lAAAACXBIWXMAAAsSAAALEgHS3X78AAAAUklEQVQI12Pw9/eXSklJ0fTz8+NMSkqSDQsLUwkPD1cCYnUgXwMop5aQkKAWExMjlZeXJ1RSUiJfVFQkWVpaKlNdXa1YV1cnn56ezldVVaUNwgD0qhqBmNnFEwAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/7c6f13042c33b35a76b08bdd967d64c2/9238b/melodies.png" alt="melodies" class="gatsby-resp-image-image" sizes="(max-width: 565px) 100vw, 565px" srcset="/static/7c6f13042c33b35a76b08bdd967d64c2/f723e/melodies.png 188w,
/static/7c6f13042c33b35a76b08bdd967d64c2/d744b/melodies.png 375w,
/static/7c6f13042c33b35a76b08bdd967d64c2/9238b/melodies.png 565w" /> </span> </span></a> melodies, which would take 343 hours or so.

### Permutations with Identical Items:

In a sequence of _n_ items of which _n_ are identical, there are _r!_ ways to reorder the items. So to count distinct permutations, need to divide _n!_ by the overcount factor.

Example: "COD**E** **E**N**E**RGY" would be _10!/3!_

#### Playing with DNA:

_Problem_: A biologist is studying a DNA segment relating to a specific disease. The segment is made of 23 base pairs where 9 must be A-T and 14 must be G-C. She wants to run a simulation on every possible DNA segment having this number of base pairs. How many simulations would that take?

_Solution_: First, calculate all possible permutations of the 23 base pairs then divide the result to account for the 9 repeated A-T and 14 repeated G-C base pairs:

_23!/(9! \* 14!) = 817190_ base pair mutations. But the question isn't looking for base pairs, it's looking for segments. Because there are 23 base pairs, we multiply the number of base pair mutations by 2<sup>23</sup> to get ~ 7 trillion sequences.

### Combinations:

Picture a deck of 13 cards of the same suit. How many ways can you deal six cards? The binomial <a href="../static/98ad5ad9e065a2bfca9e61008f176f1c/6deb8/binomial.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 36px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 125%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAYAAAAxFw7TAAAACXBIWXMAAAsSAAALEgHS3X78AAAEj0lEQVQ4y6VVWUxkRRSt7teoX6jEL4OgJBBDQDICfgBREkBAApGdNDCsCWFrQNZmX8MODdIEgrJDYHAQGvhgCxlcoAUkTgjqD5CoBAZitHUGJ5P081RNvRcc4wexku66davqvnvPPfcWIRhXV1cKOoui+ML09PRvKysrjXS9vr6uIs+M5eVlgc6bm5vJjY2Nu5J+Y2NDIR+Ki4uzoHNVVdVqT0/PAQwz/fn5udDX16eqrKwUYEhRUlIi2NjYEBhiRhMTEzXFxcVbkh12LyEhgW02NzffTk9PfyBtGo1GJfmP4erqSsLCwti93Nzc44GBgbtUrqmpsZAsK7Kzs8WJiQktXet0uufpfHBwEAmPd8fGxtaGh4d18HQVZ+zo3uDgILs8Pj7ul5WVJZ6entrKX6yrq9OmpaU9poalD8TGxiqPjo70HR0dD/38/D7j3oh2dnbuVIaORsC8TE1NvQ8bM5J3SoT6Owzk0TVwYonIzMxkHiC0L4BjIpWTk5N/hSe3qGwwGJQhISHMIGCLwv0/ZQ8DAgIe5eTkOFE5IiJCuba2xg7u7OwEYf2Qygi3DcnbxV4RXS8uLir29/cZziaTyTYyMvLJ0tJSHKmtrc2Ojo7+C56+ynFTaLVadhCzF4C+Q+WpqamU1tbWe6BLKV1PTk6yM3l5eSwSb2/vb8LDwzUEf/329vZ3uacWktcwJPOqvb1duJ7l7u5uNsMj4uzszPaSkpKMbm5urcTa2loHnBapMigoSAVsSEtLC7uAhNDsswvQKcFTYX5+nnk2MjLCzsTExLD9rq6ur8rKykRqUI9LBp4IFbnh8PDwEDg8+Wq1WiRgughDQ1RZVFR0Y4MYUgG87u/vL5L6+noR/PqEauDyjQ1aWVlJBt8GN0Wi0WiegF8MEIT+fzx8IzQ0VCSWlpYdMLhENVFRUaqLiwu2i/okTU1NZGtri4AuNNPk8PCQYkVQhrI1X19fgVdbXUZGhkg8PT0/9vLyYlxDxTDabG9vE7PZrOzt7aXUUXBKyTRycXGRSlQ2CAZ8jZ9IhW6U0JHUsmBI8WxMIO1zkuzg4CDIreppOTKYgoODv3RycqqkJaQGjuLl5aUj7zQq7mVNW1vbL6Ojo8b+/v4uEP0HNNxVVNY4OMlohoQqpX4QGBj4ID8/X0M4do/i4+M/kLxYWFh4+eTkpLmiouIPd3f3Yg6H6Ojo+BYMv4PuYqK62dlZC16WfkiIGUXxIuF0+Rw/I5VLS0vl8NAYftzb26Pt6hU0hkuqKywsHMSHvuNHBH5/EqF/K2OErL0JDH5C03xJ0s3MzGjx1Z+p3NnZec/Hx2eEk99UXV19B0/Cbekszl0i+x8S3suY2wjZAI900iF48j7ejloql5eXf4S6VlN5aGioGpiOgULvccw/TUlJuS9zcm5ujgF7dnb2GgpcRDP1v55h9EGZ7A0NDf94Z9D+bcG9x8DSjXP36X5BQQHDQq/X+6NavgeJbTm3pNdQQJhKboTpjo+PXeCdGVB5XKcPDY3N6NgqHkIAPHmXygj5Xy8faMZ0iMwXmGdyNeMu3iXyN9NZF1hIp/rBAAAAAElFTkSuQmCC&#39;); background-size: cover; display: block;"> <img src="../static/98ad5ad9e065a2bfca9e61008f176f1c/6deb8/binomial.png" alt="Binomial" class="gatsby-resp-image-image" sizes="(max-width: 36px) 100vw, 36px" srcset="/static/98ad5ad9e065a2bfca9e61008f176f1c/6deb8/binomial.png 36w" /> </span> </span></a> is the number of ways to select _m_ items of a set of _n_ items regardless of order:  
<a href="../static/03d109b805f58194a04dc760f846fb2e/ab19c/binomial2.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 155px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 29.032258064516125%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsSAAALEgHS3X78AAABZklEQVQY02NYuHCh/bRp07ibm5t1WltbDRiAIDs7mykuLo6Bh4eHAQb8/f0ZQfTWrVu5m5qaZMrKyqycnZ0ZMMDMmTPFqoGgr69PKjc31yMtLY2VAQ+YMWOGYktLS2l3d7clTkVA13CD6IiICHcgWzAgIIAjOjqaFygEchU/FHMCMcjJAhoaGmKhoaFySHICQAwygwts4KpVq9hAdGxsrBfQQH6gYi2g4YaRkZFMgoKCUuLi4lKurq7Wfn5+xkBlIkAsCsSCzMzMEsLCwlIiIiJSUVFRdkBgwtDf329QV1dX39bW5pCenu4aExPDAXP5smXL+IHiOVOmTEksKiqKnThxogcwnJM2btzI6+bmJgGkhTo7O3O6uroiCwoKXHt6euwZKioqjIDhJgXkOBUWFmqBDMrIyGAC0UAL2IFYoaOjQwMYcUpAw/WLi4vVZs2axSkqKsoaHx/PBdQrDzRUB6jfCBjBvAD+p3DK0aA4cwAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/03d109b805f58194a04dc760f846fb2e/ab19c/binomial2.png" alt="Binomial2" class="gatsby-resp-image-image" sizes="(max-width: 155px) 100vw, 155px" srcset="/static/03d109b805f58194a04dc760f846fb2e/ab19c/binomial2.png 155w" /> </span> </span></a> The binomial is read "_n_ choose _m_".

#### Chess Queens:

_Problem_: You have an empty chessboard and 8 queens which can be placed anywhere on the board - how many different ways can the queens be placed? Board has 64 squares (8x8)  
_Solution_: <a href="../static/7ec1231e9924b06149587a70fd926cd1/dbcef/chess.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 150px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 30%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAPoAAAD6AG1e1JrAAABeklEQVQY03VRTUsCURR9lpJlUH5tIkoUw6QccCMTSNm0EEKxAVMUR41xYFCMEcHxI79ScdQBXbjxz9p5s6pFFy7n8N6997zzLtlut35d14X5fP60XC5fhsMht9/vTQRRq9VIpVKhlHg8HgNtNpsZNYndbhfpdDo8x3Gn9JxhGKOHiKIYbzQaj4PB4Lter4uKojxUq9Vb8k90u10rBikQ/2w2mwLED/4U5PP5D4rpdNq4KBQK/lwux1KeyWScqqrScwvSSh9I0el02oEOvO4K4QA/Rp4YCEsybYain1rFMK8gCBGe5+3ZbPY5FAodFovFcCqV4pLJJEszFovdu93ua7SdIV3xeDwsyzKXSCSiBOQdgwgsa+Px+EaSpCBEmN8uJpOJOp1O1Xa7/fqFmM1mOqzflctlO5wdLRYLaTQalfr9/htptVpB/IlP0zT3ZrM5B49ihomKBAIBA7GECzi4XK/X4V6v54MDb6lUopbNLMtaIOharVYMluv9AQsghihP5aEDAAAAAElFTkSuQmCC&#39;); background-size: cover; display: block;"> <img src="../static/7ec1231e9924b06149587a70fd926cd1/dbcef/chess.png" alt="Chess" class="gatsby-resp-image-image" sizes="(max-width: 150px) 100vw, 150px" srcset="/static/7ec1231e9924b06149587a70fd926cd1/dbcef/chess.png 150w" /> </span> </span></a> which equals 4426165368.

### Sums:

Sequential sums are expressed using the capital-sigma Σ notation which indicates how an expression will be summed for each value of _i_:  
<a href="../static/3cfaa2b3b5611c469f86b75a955e5419/5a94a/sum.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 153px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 36.60130718954248%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAnUlEQVQoz6XRywrCMBCF4alVQai3hVAtar0g3qDVqrjShU/h+7+If+AEFCyIDXyLTJJhMmNmdscYa+zRQ9sqrB2WyJCji1bJ3eDXpE/E2CL6s7Aman7jKru9HSYocMQBF2xwxknxQrGG3rv4yCeYYKGv1tXHRD3N1eMhZkgx1/1UCV18gI5PeNV3H1UH4tZUQ1mp5D7CkmEEX3wM6wWTZgiGwiQtPwAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/3cfaa2b3b5611c469f86b75a955e5419/5a94a/sum.png" alt="sum" class="gatsby-resp-image-image" sizes="(max-width: 153px) 100vw, 153px" srcset="/static/3cfaa2b3b5611c469f86b75a955e5419/5a94a/sum.png 153w" /> </span> </span></a>

Summing the first five odd numbers is written:  
<a href="../static/0c8ffcf3103647523e4617a5b6ddd54d/cee2d/sumfirstfive.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 242px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 21.90082644628099%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAYElEQVQY063PuwqAMAyF4QjVwabewNskODg4+Ai+/2P5F87groEPmqZJqJlZg9l+jBsrerQIKJUHqVEhIqmeVIvqKzDmgSc6Dd11zo83uH4wvCwaMGmp697VYwcubf0cD+UxAx71trl4AAAAAElFTkSuQmCC&#39;); background-size: cover; display: block;"> <img src="../static/0c8ffcf3103647523e4617a5b6ddd54d/cee2d/sumfirstfive.png" alt="sumfirstfive" class="gatsby-resp-image-image" sizes="(max-width: 242px) 100vw, 242px" srcset="/static/0c8ffcf3103647523e4617a5b6ddd54d/f723e/sumfirstfive.png 188w,
/static/0c8ffcf3103647523e4617a5b6ddd54d/cee2d/sumfirstfive.png 242w" /> </span> </span></a> because the i is replaced by the numbers 0 - 4 in the equation.  
_(2(0) + 1) = 1_  
_(2(1) + 1) = 3_  
_(2(2) + 1) = 5_  
_(2(3) + 1) = 7_  
_(2(4) + 1) = 9_

Summing the first _n_ natural numbers is thus:  
<a href="../static/a70d077d1a9c64fcc479b94835fc5568/51a56/sumnatural.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 247px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 20.647773279352226%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAW0lEQVQY063P7Q2AIAxF0ZooBlHALyYwMa7h/kP5SK4bQHL+tI9CzcyKbNbwvHLILEEinJySZSA7ysInHPXCXS97DV0MnBAIVKsk6j29RN4j80j8Bz5yS9di3Q/F1gLBPrc9kQAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/a70d077d1a9c64fcc479b94835fc5568/51a56/sumnatural.png" alt="Sum Natural" class="gatsby-resp-image-image" sizes="(max-width: 247px) 100vw, 247px" srcset="/static/a70d077d1a9c64fcc479b94835fc5568/f723e/sumnatural.png 188w,
/static/a70d077d1a9c64fcc479b94835fc5568/51a56/sumnatural.png 247w" /> </span> </span></a>

#### Gauss's Trick:

Legend has it that a teacher once punished Gauss by making him sum all numbers 1 to 100 and that's what lead him to come up with this solution:

<a href="../static/2829cf1d00ce3015c3e2e948179ccc30/72413/gauss100.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 466px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 20.815450643776824%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAb0lEQVQY03WPCQqAMAwEq+J93yii/v+VbnUUEQwMSZfstjXmqkC4IhOlqESEPqPvohC5qJl9ziOe1SBsmBIRY2jRLA17tkICckKtZxIpu+ew8DIr9ISOdI/bO4Jrgp1Xd+m39nw5JXDgJfeC9+G3DopDA1Sea5PIAAAAAElFTkSuQmCC&#39;); background-size: cover; display: block;"> <img src="../static/2829cf1d00ce3015c3e2e948179ccc30/72413/gauss100.png" alt="Gauss 100" class="gatsby-resp-image-image" sizes="(max-width: 466px) 100vw, 466px" srcset="/static/2829cf1d00ce3015c3e2e948179ccc30/f723e/gauss100.png 188w,
/static/2829cf1d00ce3015c3e2e948179ccc30/d744b/gauss100.png 375w,
/static/2829cf1d00ce3015c3e2e948179ccc30/72413/gauss100.png 466w" /> </span> </span></a>  
Dividing by 2 then gives the answer of 5,050.

We can formally write this as:  
<a href="../static/ac757b132db4d48903d8d0a849e6cf65/dec9c/gauss2.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 253px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 66.798418972332%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA3ElEQVQ4y62TWw+CMAyFueMFRRFRMd5CfFCMPpn4/3+ZXfI9NGSiGE5ystG1p+1WHKcdG2GqvsfCUug5HTEUZsIX6wSRi/AmzLGH7AdCn2RWxDidhIVwRJKlsk2xpfiamEVblR7VHJXNCN0R+wqPjAYua0J27eOr849CBmfhgQAHIVPNStlscV7z3AjNaS/jTlLaenB/O3wKVsO1MGJfatGYLJWwpjKXtSZhjC1QLQfqeiJb67nl2QtGpjfM+hQ0f8WT2UoY4ujXkWliisiVKreq2v2/FYY8SNUl6A1ZjAgLSieUsQAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/ac757b132db4d48903d8d0a849e6cf65/dec9c/gauss2.png" alt="Gauss2" class="gatsby-resp-image-image" sizes="(max-width: 253px) 100vw, 253px" srcset="/static/ac757b132db4d48903d8d0a849e6cf65/f723e/gauss2.png 188w,
/static/ac757b132db4d48903d8d0a849e6cf65/dec9c/gauss2.png 253w" /> </span> </span></a>

As there is no _i_ in the last line, _(n+1)_ is summed over and over again _n_ times. Therefore:  
<a href="../static/3155352998c4ce52c49166dbe6c3ef63/71afe/gausstrick.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 128px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 39.84375%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAwUlEQVQoz42SWQ6CYAyES6JGXCKiEMA1og+KS9xO4LOX8Cbe3KkOSYNimOQjP23/plMQ+egE5jw7Uq46KaoGOqCpLxFogRAMC4V58x44ghWYgh1zM+CyR8acPMEFTMDVTGLVpQutGYE940sO0wYLDvV+PMzlBATAAwdaaQAfxMz3iUdXIXNjYfHGNNSCAacMuB+XxREvKluQMpYwpme5cydq+ybVdab9L6VcZsYdlX1px5A39H/l1MqaC44r/Dp/9QLpkAoa01TvPAAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/3155352998c4ce52c49166dbe6c3ef63/71afe/gausstrick.png" alt="Gauss Trick" class="gatsby-resp-image-image" sizes="(max-width: 128px) 100vw, 128px" srcset="/static/3155352998c4ce52c49166dbe6c3ef63/71afe/gausstrick.png 128w" /> </span> </span></a>

#### Flying Cheap:

_Problem_: You need to fly to New York City any time in the next 30 days. Ticket prices change unpredictably according to departure and return dates. How many pairs of days must be checked to find the cheapest tickets to fly to NYC within the next 30 days?

_Solution_: Any pair between Day 1 (today) and Day 30 is valid as long as the return flight is after the departure. So 30 pairs begin with Day 1, 29 begin with Day 2, 28 with Day 3, etc. We can use Gauss's Trick!  
<a href="../static/41a25fddf6d334b3c5d7f63fbf8cfc1a/a6b4f/flights.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 229px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 23.580786026200876%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAgklEQVQY042QPQuDQBBE9y5IjGJhJGI+EDuxSIoUKfz/P8wxvIWzSRx4zLI3MMuZmc22VSauohatOLPLRSWC/dGdoKsQHzGKF17DICK5SIkreFnFQwsFvl7Z4Rd2Hfl1vom3eIhJPPHvFU3SmvrRQ+xCcs2BrzhRUjJb/+Nfoof2agFABQSuSo/wcQAAAABJRU5ErkJggg==&#39;); background-size: cover; display: block;"> <img src="../static/41a25fddf6d334b3c5d7f63fbf8cfc1a/a6b4f/flights.png" alt="Flights" class="gatsby-resp-image-image" sizes="(max-width: 229px) 100vw, 229px" srcset="/static/41a25fddf6d334b3c5d7f63fbf8cfc1a/f723e/flights.png 188w,
/static/41a25fddf6d334b3c5d7f63fbf8cfc1a/a6b4f/flights.png 229w" /> </span> </span></a>  
We could also solve this using combinations:  
<a href="../static/20727c1039e65c71466e7708af9bbecd/eb403/binomialflight.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 84px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 53.57142857142857%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA3klEQVQoz52SSwvCMBCEt0Xx/UAPvluptqKI9aDe1IPagwhePAt69P//ACcwhVAoNQ58JN0kk81uRUQC4AIfeGAAhmAFWvKHThzX4AW2jHXBxcDHiicqG5sZfcARXLlhD8bJA1kqc3PA5/aAw7UlOGQYNkCHL8vUBESc50CNFBmrghv3haAgKbfbHEc8IDTagJ1WhgV40lC95p008dmMWFOtaer2PsvSZCzPxjk0VGtS52KJnb5rhiGbZNQUT5vPwUz7Pse30tD6xTjSMnzw91Fq09BYLmuTlMq2Ymr2BUeJDiAauGT/AAAAAElFTkSuQmCC&#39;); background-size: cover; display: block;"> <img src="../static/20727c1039e65c71466e7708af9bbecd/eb403/binomialflight.png" alt="Binomial Flight" class="gatsby-resp-image-image" sizes="(max-width: 84px) 100vw, 84px" srcset="/static/20727c1039e65c71466e7708af9bbecd/eb403/binomialflight.png 84w" /> </span> </span></a>

## 1.4 Probability:

### Counting Outcomes:

A die roll has six possible outcomes:

<span class="dice">⚀ ⚁ ⚂ ⚃ ⚄ ⚅ </span>, so the chance of getting one particular number (say 4), is 1/6. The chance of rolling an odd is 3/6 or 1/2 because there are three odd dice - <span class="dice">⚀ ⚂ ⚄</span>.

Probability can be calculated using this formula:  
<a href="../static/5813e1fe28172c54a3126284a2be7046/5892a/probability.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 315px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 13.333333333333334%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAaUlEQVQI1zXO2wqDQAxF0VPF1z5IvbXa8VJLoZX+/995gtvAgiQkk5GkHIWOKG2x0Z72pW6ofzbZYG/yv31sE4uz9XZFSV2z+CBPzDeImYpD0W/5lDK74IwYvtmd4cQvVg7GkZd19OJR7cMiBb6ddd4HAAAAAElFTkSuQmCC&#39;); background-size: cover; display: block;"> <img src="../static/5813e1fe28172c54a3126284a2be7046/5892a/probability.png" alt="Probability" class="gatsby-resp-image-image" sizes="(max-width: 315px) 100vw, 315px" srcset="/static/5813e1fe28172c54a3126284a2be7046/f723e/probability.png 188w,
/static/5813e1fe28172c54a3126284a2be7046/5892a/probability.png 315w" /> </span> </span></a>

#### Team Odds

_Problem_: Given 23 candidates, throw coin and hire if heads. What are the chances of hiring nobody?

_Solution_: There is only one way to hire nobody - to throw tails 23 consecutive times. We've already established that there are 8,388,608 combinations of hiring, so the chances of hiring nobody is 1/8388608

### Independent Events:

If the outcome of an event doesn't influence the outcome of another event, they are _independent_. The probability of two independent events occurring is the product of the individual probabilities. A coin toss ending in heds is 1/2 and a die being rolled a 2 is 1/6, so the probability of both is 1/2 \* 1/6 = 1/12.

#### Backing Up:

_Problem_: You need to store data for a year. One disk has a probability of failing of one in a billion. The other disk costs 20% less and has a probability of failing of one in 2000. What should you buy?

_Solution_: If you use three cheap disks, you only lose the data if all three disks fail. The probability of that happening is (1/2000)<sup>3</sup> -&gt; 1/8,000,000,000. That redundancy achieves a lower risk of data loss than the expensive disk while costing 60% the price.

### Mutually Exclusive Events:

When two events cannot happen simultaneously, they are _mutually exclusive_. Probability is calculated by summing the indidivual probabilities. Rolling a 4 and rolling an odd are mutually exclusive, so can be calculated by 1/6 + 1/2 = 2/3

#### Subscription Choice:

_Problem_: Your site offers a free, basic, and pro plan. Random new users have a 70% probability of choosing the free tier, 10% pro, and 20% basic. What are the chances a new user will sign up for a paying plan?

_Solution_: Customer cannot have multiple plans at the same time, so you sum the probability of both paid plans - 0.2 + 0.1 = 0.3

### Complementary Events:

When two mutually exclusive events cover all possible outcomes, they are _complementary_. The sum of individual probabilities of complementary events is 100%.

#### Tower Defense:

_Problem_: Your castle is defended by 5 towers. Each tower has a 20% chance of disabling an invader before they reach the gate. What are the chances of stopping an attacker?

_Solution_: **DO NOT SUM THE PROBABILITIES OF INDEPENDENT EVENTS**. This is an example of complementary events.

- 20% chance of a hit means 80% miss rate.
- Probability of all 5 towers missing is 0.8<sup>5</sup> which is around 0.33.
- The count of "all towers miss" is complementary to "at least one tower hits". The probability of stopping the enemy, then, is 1 - 0.33 = 0.67.

### Gambler's Fallacy:

If you flip a normal coin 10 times and get 10 heads, the 11th flip is more likely to be tails. **NEVER** assume that past events affect the outcome of an independent event.

#### Advanced Probabilities:

_Problem_: 23 candidates and the coin toss. AGAIN. What are the chances of hiring seven people or less?

_Solution_: Binomial distribution. Type _B(23, 1/2) &lt;= 7_ into Wolfram Alpha to visualize this.

References:  
_Discrete Mathematics and Its Applications_ : code.energy/rosen  
_Prof Jeanette Wing's slides on computational thinking_ : code.energy/wing

[Computer science](../tags/computer%20science/index.html)[Computer Science Distilled](../tags/computer%20science%20distilled/index.html)[Logic](../tags/logic/index.html)[Probability](../tags/probability/index.html)[Counting](../tags/counting/index.html)

### &lt;&lt; Previous: Algorithm Design Manual: How to Design Algorithms

### &gt;&gt; Next: Computer Science Distilled Complexity
