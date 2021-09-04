This app works best with JavaScript enabled.

# Algorithm Design Manual:

## Chapter Nine

### Intractable Problems and Approximation Algorithms

#### 2019-01-27

**Reductions** are operations that convert one problem into another

An algorithmic _problem_ is a general question with parameters for input and conditions on what makes for a satisfactory solution. An _instance_ is a problem with the input parameters specified.

**Example**: _Problem_: The Traveling Salesman Problem (TSP)  
_Input_: A weighted graph _G_  
_Output_: Which tour {v<sub>1</sub>, v<sub>2</sub>,...v<sub>n</sub>} minimizes <a href="../static/dbcf00b1e0ab194a3914748b96fd3aa9/c6ec9/TSP.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 206px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 12.62135922330097%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAAAsSAAALEgHS3X78AAAA6UlEQVQI12MIDAy07e/vN+vt7ZWqrKzUq6urUygoKDCcMGECOwMQzJkzh722tpYFxPbz82ONjo7me/fuHSuIn5OTowhUr/b//38Ql6GtrQ2sh6Gvr8+mu7tbJT8/X6+lpSUwLy8vu6urK3rz5s3q7e3tJkDDYzds2GBcWFjoaGhoKAGUc5g5c6ZsSUlJDlAsfMqUKWEzZszQA6ozYMjKygro6enRKSoqMquurta9f/8+B9Bg2ZqaGhGg6xSBLueaNGmS7Lx58yyBPtBydXUVABrODTSQdfLkyWJJSUniQEdIAA3VmT9/Ph8AKfJgBKcXdvgAAAAASUVORK5CYII=&#39;); background-size: cover; display: block;"> <img src="../static/dbcf00b1e0ab194a3914748b96fd3aa9/c6ec9/TSP.png" alt="TSP.png" class="gatsby-resp-image-image" sizes="(max-width: 206px) 100vw, 206px" srcset="/static/dbcf00b1e0ab194a3914748b96fd3aa9/f723e/TSP.png 188w,
/static/dbcf00b1e0ab194a3914748b96fd3aa9/c6ec9/TSP.png 206w" /> </span> </span></a> ?

Any weighted graph defines an instance of TSP. Each _instance_ has at least one minimum cost tour. The general traveling salesman _problem_ asks for an algorithm to find the optimal tour for all possible instances.

    Bandersnatch(G)
        Translate the input G to an instance Y of Bo-Billy Problem
        Call the subroutine Bo-Billy on Y to solve Bandersnatch(G)
        Bandersnatch(G) = Bo-Billy(Y)

### Take Home:

Reductions are a way to show that two problems are essentially identical. A fast algorithm (or lack of one) for one of the problems implies a fast algorithm (or lack of one) for the other.

A translation of instances from one type of problem to instances of another such that the answers are preserved is what is meant by a reduction.

#### Decision Problems

Class of problems whose answers are restricted to true and false are known as decision problems.

**Portion of reduction tree for NP Complete Problems - solid lines are reductions covered in chapter**

<a href="../static/22294816af7f40cd704da22d255399b6/44085/NP.png" class="gatsby-resp-image-link"><span class="gatsby-resp-image-wrapper" style="position: relative; display: block;  max-width: 750px; margin-left: auto; margin-right: auto;"> <span class="gatsby-resp-image-background-image" style="padding-bottom: 66.24040920716112%; position: relative; bottom: 0; left: 0; background-image: url(&#39;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsSAAALEgHS3X78AAABMklEQVQ4y31T2YqAMAzs//+d+CQiHqAiHnjfmmWypHRL3UCwNulkMmkVGfa+r/6Kw57noaqqqG3bP3GXqf+AvszMsXPVV0X83/fNPo4j5XlORVEwW7u4eV7Z1Y7joLquGeS6LjrPk0Hx3baN9n3ntasL7Cn5QRKSAQhf1/WzZRQCOPLAGK4Zoo0oirTgYkhCkS/t0EFZltQ0DXcEMgwIbTzPo2maNBAMDLIsozRNdcxs81PDeZ65mskGa7QjGop2MiS4a4haQ7DCYbgAISiaim5mUQE29WOGSIzjmMIwZKbmxJMk4bZlbxgGvjrQDIXkagEjCALq+/6XoTCzX4y0LoZ113Vc2L4FKIa4cgktMoA5hmLGZZqIg5Gtv3JNTPYwMDCRPbSHNy0AkMP3fVqWRZ/5ASV//EnP0nRZAAAAAElFTkSuQmCC&#39;); background-size: cover; display: block;"> <img src="../static/22294816af7f40cd704da22d255399b6/26fb4/NP.png" alt="NP.ng" class="gatsby-resp-image-image" sizes="(max-width: 750px) 100vw, 750px" srcset="/static/22294816af7f40cd704da22d255399b6/f723e/NP.png 188w,
/static/22294816af7f40cd704da22d255399b6/d744b/NP.png 375w,
/static/22294816af7f40cd704da22d255399b6/26fb4/NP.png 750w,
/static/22294816af7f40cd704da22d255399b6/44085/NP.png 782w" /> </span> </span></a>

### Art of Proving Hardness

- Make source problem as simple (i.e., restricted) as possible
- Make your target as hard as possible
- Select the right problem for the right reason
- Amplify penalties for making undesired selections
- Think strategically at a high level, then build gadgets to enforce tactics
- When you get stuck, alternate between looking for an algorithm or a reduction

### Take Home:

Approximation algorithms guarantee answers that are always close to the optimal solution. They can provide a practical approach to dealing with NP-complete problems.

#### Note from Note-Taker:

This chapter was very math-based and I skipped over the majority of it.

[Algorithms](../tags/algorithms/index.html)[NP-complete](../tags/np-complete/index.html)[Algorithm Design Manual](../tags/algorithm%20design%20manual/index.html)

### &lt;&lt; Previous: Algorithm Design Manual: Combinatorial Search and Heuristic Methods

### &gt;&gt; Next: Algorithm Design Manual: Dynamic Programming
