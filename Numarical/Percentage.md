# Percentage Formula Cheat Sheet

For placement aptitude exams such as TCS NQT, Infosys, and Wipro, these formulas, shortcuts, and tricks cover many common percentage problems.

## Notation

Unless a formula says otherwise, use percentage values as numbers: for example, use $P=20$ for $20\%$. The fraction $P/100$ is the corresponding multiplier.

## 1. Basic percentage formulas

### Formula 1: Find the percentage

$$
\boxed{\text{Percentage}=\frac{\text{Part}}{\text{Total}}\times 100\%}
$$

**Example:** 72 marks out of 90.

$$
\frac{72}{90}\times 100\%=80\%
$$

### Formula 2: Find a percentage of a number

$$
\boxed{\text{Value}=\frac{P}{100}\times N}
$$

**Example:** Find $20\%$ of 750.

$$
\frac{20}{100}\times 750=150
$$

### Formula 3: Find the total number

$$
\boxed{\text{Total}=\frac{\text{Part}\times 100}{P}}
$$

**Example:** $40\%$ of a number is 200.

$$
\frac{200\times 100}{40}=500
$$

### Formula 4: Find the percentage increase or decrease

$$
\boxed{\text{Percentage change}=\frac{\text{Change}}{\text{Original}}\times 100\%}
$$

For an increase, $\text{Change}=\text{New value}-\text{Original value}$. For a decrease, $\text{Change}=\text{Original value}-\text{New value}$.

**Example:** A price rises from ₹200 to ₹250.

$$
\frac{250-200}{200}\times 100\%=25\%
$$

## 2. Percentage increase and decrease

### Formula 5: Increase a number by $P\%$

$$
\boxed{\text{New value}=\text{Original}\times\frac{100+P}{100}}
$$

**Example:** Increase 500 by $20\%$.

$$
500\times\frac{120}{100}=600
$$

### Formula 6: Decrease a number by $P\%$

$$
\boxed{\text{New value}=\text{Original}\times\frac{100-P}{100}}
$$

**Example:** Decrease 500 by $20\%$.

$$
500\times\frac{80}{100}=400
$$

### Formula 7: Find the original value after an increase

$$
\boxed{\text{Original}=\text{Final}\times\frac{100}{100+P}}
$$

**Example:** After a $20\%$ increase, the value is 600.

$$
600\times\frac{100}{120}=500
$$

### Formula 8: Find the original value after a decrease

$$
\boxed{\text{Original}=\text{Final}\times\frac{100}{100-P}}
$$

**Example:** After a $20\%$ decrease, the value is 400.

$$
400\times\frac{100}{80}=500
$$

## 3. Successive percentage changes

These formulas are especially useful in placement exams. Here, $a$ and $b$ are the numerical percentage values (for example, $a=20$ means $20\%$).

### Formula 9: Two successive increases

$$
\boxed{\text{Net increase}=\left(a+b+\frac{ab}{100}\right)\%}
$$

**Example:** Increase by $20\%$, then by $10\%$.

$$
\left(20+10+\frac{20\times 10}{100}\right)\%=32\%
$$

### Formula 10: Two successive decreases

$$
\boxed{\text{Net decrease}=\left(a+b-\frac{ab}{100}\right)\%}
$$

**Example:** Decrease by $20\%$, then by $10\%$.

$$
\left(20+10-\frac{20\times 10}{100}\right)\%=28\%
$$

### Formula 11: Increase by $a\%$ and decrease by $b\%$

$$
\boxed{\text{Net percentage change}=\left(a-b-\frac{ab}{100}\right)\%}
$$

This gives the net change when the first change is an increase and the second is a decrease. A positive result means an increase; a negative result means a decrease.

**Example:** Increase by $20\%$, then decrease by $10\%$.

$$
\left(20-10-\frac{20\times 10}{100}\right)\%=8\%
$$

### Formula 12: Equal increase and decrease

If a value increases by $x\%$ and then decreases by $x\%$:

$$
\boxed{\text{Net decrease}=\frac{x^2}{100}\%}
$$

**Example:** Increase by $20\%$, then decrease by $20\%$.

$$
\frac{20^2}{100}\%=4\%\text{ decrease}
$$

## 4. Ratio and comparison formulas

### Formula 13: If $A$ is $P\%$ of $B$

$$
\boxed{A:B=P:100}
$$

**Example:** $A$ is $120\%$ of $B$.

$$
A:B=120:100=6:5
$$

### Formula 14: If $A$ is $P\%$ more than $B$

$$
\boxed{A:B=(100+P):100}
$$

**Example:** $A$ is $20\%$ more than $B$.

$$
A:B=120:100=6:5
$$

### Formula 15: If $A$ is $P\%$ less than $B$

$$
\boxed{A:B=(100-P):100}
$$

**Example:** $A$ is $20\%$ less than $B$.

$$
A:B=80:100=4:5
$$

### Formula 16: If $A$ is $P\%$ more than $B$, how much percent is $B$ less than $A$?

$$
\boxed{\frac{P}{100+P}\times 100\%}
$$

**Example:** $A$ is $25\%$ more than $B$.

$$
\frac{25}{125}\times 100\%=20\%
$$

### Formula 17: If $A$ is $P\%$ less than $B$, how much percent is $B$ more than $A$?

$$
\boxed{\frac{P}{100-P}\times 100\%}
$$

**Example:** $A$ is $20\%$ less than $B$.

$$
\frac{20}{80}\times 100\%=25\%
$$

## 5. Population, salary, votes, and marks

### Formula 18: Population growth

$$
\boxed{P_n=P_0\left(1+\frac{r}{100}\right)^n}
$$

Here, $P_0$ is the initial population, $r$ is the annual growth rate in percent, and $n$ is the number of years.

### Formula 19: Population decline

$$
\boxed{P_n=P_0\left(1-\frac{r}{100}\right)^n}
$$

### Formula 20: Percentage of valid votes

Let $I$ be the percentage of invalid votes.

$$
\boxed{\text{Valid votes}=\text{Total votes}\times\frac{100-I}{100}}
$$

Then use a candidate's percentage of the valid votes to calculate that candidate's votes.

**Example:** $20\%$ of 7,500 votes are invalid.

$$
7500\times\frac{80}{100}=6000
$$

### Formula 21: Exam percentage

$$
\boxed{\text{Exam percentage}=\frac{\text{Marks obtained}}{\text{Maximum marks}}\times 100\%}
$$

### Formula 22: Percentage error

$$
\boxed{\text{Percentage error}=\frac{|\text{Actual}-\text{Correct}|}{|\text{Correct}|}\times 100\%}
$$

Use the correct value as the denominator when measuring the error relative to the correct answer.

## 6. Profit, loss, and discount percentages

### Formula 23: Profit percentage

$$
\boxed{\text{Profit percentage}=\frac{\text{Selling price}-\text{Cost price}}{\text{Cost price}}\times 100\%}
$$

### Formula 24: Loss percentage

$$
\boxed{\text{Loss percentage}=\frac{\text{Cost price}-\text{Selling price}}{\text{Cost price}}\times 100\%}
$$

### Formula 25: Discount percentage

$$
\boxed{\text{Discount percentage}=\frac{\text{Marked price}-\text{Selling price}}{\text{Marked price}}\times 100\%}
$$

### Formula 26: Selling price after discount

$$
\boxed{SP=MP\times\frac{100-D}{100}}
$$

Here, $MP$ is the marked price and $D$ is the discount percentage.

### Formula 27: Final price after discount and tax

$$
\boxed{\text{Final price}=MP\times\frac{100-D}{100}\times\frac{100+T}{100}}
$$

Here, $D$ is the discount percentage and $T$ is the tax percentage. This assumes tax is applied after the discount.

## 7. Fraction-to-percentage shortcuts

Memorize these common conversions. They save time when answer options are close.

| Fraction | Percentage |
|:--:|--:|
| $\frac{1}{2}$ | $50\%$ |
| $\frac{1}{3}$ | $\approx 33.33\%$ |
| $\frac{1}{4}$ | $25\%$ |
| $\frac{1}{5}$ | $20\%$ |
| $\frac{1}{6}$ | $\approx 16.67\%$ |
| $\frac{1}{8}$ | $12.5\%$ |
| $\frac{1}{9}$ | $\approx 11.11\%$ |
| $\frac{1}{10}$ | $10\%$ |
| $\frac{1}{11}$ | $\approx 9.09\%$ |
| $\frac{1}{12}$ | $\approx 8.33\%$ |
| $\frac{1}{16}$ | $6.25\%$ |
| $\frac{1}{20}$ | $5\%$ |
| $\frac{1}{25}$ | $4\%$ |
| $\frac{1}{40}$ | $2.5\%$ |
| $\frac{1}{50}$ | $2\%$ |

### Fast mental calculation tricks

- $10\%$: Divide by 10.
- $5\%$: Divide by 20.
- $1\%$: Divide by 100.
- $20\%$: Divide by 5.
- $25\%$: Divide by 4.
- $50\%$: Divide by 2.
- $75\%$: Multiply by $\frac{3}{4}$.
- $12.5\%$: Divide by 8.
- $33\frac{1}{3}\%$: Divide by 3.
- $x\%$ of $y$ = $y\%$ of $x$. For example, $16\%$ of 25 = $25\%$ of 16 = 4.

