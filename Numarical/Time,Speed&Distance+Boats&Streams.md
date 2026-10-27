# Time, Speed & Distance + Boats & Streams

> **Aptitude revision notes** for placement preparation, including TCS NQT, Cognizant, and other aptitude rounds. Formulas are written in GitHub-compatible Markdown/LaTeX.

## Table of Contents

1. [Fundamentals and Unit Conversion](#1-fundamentals-and-unit-conversion)
2. [Trains Crossing Stationary Objects](#2-trains-crossing-stationary-objects)
3. [Relative Speed Framework](#3-relative-speed-framework)
4. [Chasing Problems](#4-chasing-problems)
5. [Meeting Point Problems](#5-meeting-point-problems)
6. [Trains Crossing Moving Objects](#6-trains-crossing-moving-objects)
7. [Logical Differential Method](#7-logical-differential-method-two-crossings)
8. [Ratio and Proportionality](#8-ratio-and-proportionality)
9. [Average Speed](#9-average-speed)
10. [Boats and Streams](#10-boats-and-streams)
11. [Placement Strategy and Common Mistakes](#11-placement-strategy-and-common-mistakes)
12. [Practice Problem: Two Bridges](#12-practice-problem-two-bridges)

---

## 1. Fundamentals and Unit Conversion

### Core formulas

Let:

- $S$ = speed
- $D$ = distance
- $T$ = time

The three equivalent formulas are:

$$
\Large
S = \frac{D}{T}
\qquad
D = S \times T
\qquad
T = \frac{D}{S}
$$

### Unit conversion

- **km/h to m/s:** multiply by $\frac{5}{18}$.
- **m/s to km/h:** multiply by $\frac{18}{5}$.

$$
\Large
\text{Speed in m/s} = \text{Speed in km/h} \times \frac{5}{18}
$$

$$
\Large
\text{Speed in km/h} = \text{Speed in m/s} \times \frac{18}{5}
$$

Why does this work?

$$
\Large
1\text{ km/h} = \frac{1000\text{ m}}{3600\text{ s}} = \frac{5}{18}\text{ m/s}
$$

### Warm-up examples

**Example 1: Convert $180\text{ km/h}$ to m/s.**

$$
\Large
180 \times \frac{5}{18} = 50\text{ m/s}
$$

**Example 2: A car covers $7.5\text{ m}$ in $1\text{ s}$. Find its speed in km/h.**

$$
\Large
S = \frac{7.5}{1} = 7.5\text{ m/s}
$$

$$
\Large
7.5 \times \frac{18}{5} = 1.5 \times 18 = 27\text{ km/h}
$$

---

## 2. Trains Crossing Stationary Objects

### Type 1A: A point object (person, pole, or tree)

A point object has negligible length. The train must travel only its own length for its rear to completely pass the object.

Let $L$ be the train's length.

$$
\Large
\boxed{D = L}
\qquad
\boxed{T = \frac{L}{S_{\text{train}}}}
$$

**Key idea:** Do not add another length for a person, pole, or tree.

### Type 1B: An extended object (platform, bridge, or tunnel)

The entire train must clear the object, so the train travels the sum of both lengths.

$$
\Large
\boxed{D = L_{\text{train}} + L_{\text{object}}}
$$

$$
\Large
\boxed{T = \frac{L_{\text{train}} + L_{\text{object}}}{S_{\text{train}}}}
$$

Ensure that the speed is in m/s when distance is in metres and time is required in seconds.

### Example 1: Train crossing a platform

A platform is $248\text{ m}$ long. A train of length $127\text{ m}$ travels at $150\text{ km/h}$. How many seconds does it take to clear the platform?

**Step 1: Total distance**

$$
\Large
D = 248 + 127 = 375\text{ m}
$$

**Step 2: Convert speed**

$$
\Large
S = 150 \times \frac{5}{18} = \frac{125}{3}\text{ m/s}
$$

**Step 3: Calculate time**

$$
\Large
T = \frac{375}{125/3} = 375 \times \frac{3}{125} = \boxed{9\text{ seconds}}
$$

### Example 2: Train and platform have equal lengths

A train travels at $72\text{ km/h}$ and crosses a platform of equal length in $40\text{ s}$. Find the train's length.

Let the train and platform each have length $L$.

$$
\Large
S = 72 \times \frac{5}{18} = 20\text{ m/s}
$$

$$
\Large
D = S \times T = 20 \times 40 = 800\text{ m}
$$

Since $D = 2L$,

$$
\Large
2L = 800 \implies \boxed{L = 400\text{ m}}
$$

---

## 3. Relative Speed Framework

When two bodies move at the same time, use their **relative speed** to calculate how quickly the gap between them changes.

$$
\Large
\boxed{T = \frac{\text{Gap}}{S_{\text{relative}}}}
$$

| Direction of movement | Relative speed | Reason |
|---|---:|---|
| Same direction | $\Large \lvert S_1 - S_2\rvert$ | The faster body closes the gap at the difference between their speeds. |
| Opposite directions, moving towards each other | $\Large S_1 + S_2$ | Both bodies close the gap simultaneously. |

**Unit reminder:** Convert speeds to the same unit before adding or subtracting them.

---

## 4. Chasing Problems

Examples include a policeman chasing a thief, one vehicle catching another, or a faster runner catching a slower runner.

For two bodies moving in the same direction, where the chaser is faster:

$$
\Large
\boxed{T_{\text{catch}} = \frac{\text{Initial gap}}{S_{\text{chaser}} - S_{\text{runner}}}}
$$

Distance travelled by the chaser:

$$
\Large
\boxed{D_{\text{chaser}} = S_{\text{chaser}} \times T_{\text{catch}}}
$$

### Example 1: Policeman and thief

A policeman spots a thief $100\text{ m}$ ahead. The policeman runs at $4\text{ m/s}$, while the thief runs at $2\text{ m/s}$. Find the distance the policeman runs before catching the thief.

**Relative speed**

$$
\Large
S_r = 4 - 2 = 2\text{ m/s}
$$

**Time to catch**

$$
\Large
T = \frac{100}{2} = 50\text{ s}
$$

**Distance run by the policeman**

$$
\Large
D = 4 \times 50 = \boxed{200\text{ m}}
$$

### Example 2: Carriage overtaking a man

A man walks at $3\text{ km/h}$. A carriage overtakes him and remains visible up to a distance of $100\text{ m}$ for $2\text{ minutes}$. Find the carriage's speed.

Convert time:

$$
\Large
2\text{ minutes} = 120\text{ s}
$$

The relative speed is the speed at which the gap grows:

$$
\Large
S_r = \frac{100}{120} = \frac{5}{6}\text{ m/s}
$$

Convert to km/h:

$$
\Large
S_r = \frac{5}{6} \times \frac{18}{5} = 3\text{ km/h}
$$

Since they move in the same direction:

$$
\Large
S_{\text{carriage}} - S_{\text{man}} = S_r
$$

$$
\Large
S_{\text{carriage}} - 3 = 3 \implies \boxed{S_{\text{carriage}} = 6\text{ km/h}}
$$

### Example 3: Bus and truck

A bus travels at $45\text{ km/h}$ and catches a truck $150\text{ m}$ ahead in $30\text{ s}$. Find the truck's speed.

$$
\Large
S_r = \frac{150}{30} = 5\text{ m/s}
$$

Convert relative speed:

$$
\Large
5 \times \frac{18}{5} = 18\text{ km/h}
$$

$$
\Large
S_{\text{bus}} - S_{\text{truck}} = 18
$$

$$
\Large
45 - S_{\text{truck}} = 18 \implies \boxed{S_{\text{truck}} = 27\text{ km/h}}
$$

---

## 5. Meeting Point Problems

When two people or vehicles move towards each other, their speeds add.

$$
\Large
\boxed{T_{\text{meet}} = \frac{\text{Initial distance between them}}{S_1 + S_2}}
$$

### Example: Two people moving towards each other

Two people are $19\text{ km}$ apart and move towards each other at $21\text{ km/h}$ and $17\text{ km/h}$. When will they meet?

$$
\Large
S_r = 21 + 17 = 38\text{ km/h}
$$

$$
\Large
T = \frac{19}{38} = \frac{1}{2}\text{ hour}
$$

$$
\Large
\boxed{T = 30\text{ minutes}}
$$

---

## 6. Trains Crossing Moving Objects

### Crossing a moving person

The train needs to cover its own length relative to the person.

$$
\Large
\boxed{T = \frac{L_{\text{train}}}{S_{\text{relative}}}}
$$

### Crossing another train

The trains must completely pass one another, so the total distance is the sum of their lengths.

$$
\Large
\boxed{D = L_1 + L_2}
$$

$$
\Large
\boxed{T = \frac{L_1 + L_2}{S_{\text{relative}}}}
$$

Use:
- **Same direction:** $S_{\text{relative}} = \lvert S_1 - S_2\rvert$
- **Opposite directions:** $S_{\text{relative}} = S_1 + S_2$

### Example: Two trains moving in opposite directions

Two trains of lengths $121\text{ m}$ and $99\text{ m}$ travel in opposite directions at $40\text{ km/h}$ and $32\text{ km/h}$. Find the time they take to cross each other completely.

**Total distance**

$$
\Large
D = 121 + 99 = 220\text{ m}
$$

**Relative speed**

$$
\Large
S_r = 40 + 32 = 72\text{ km/h}
$$

$$
\Large
72 \times \frac{5}{18} = 20\text{ m/s}
$$

**Crossing time**

$$
\Large
T = \frac{220}{20} = \boxed{11\text{ seconds}}
$$

---

## 7. Logical Differential Method (Two Crossings)

This shortcut is useful when the same train crosses a person and then a platform or another extended object.

### Example

A train crosses a standing person in $20\text{ s}$ and a platform $135\text{ m}$ long in $29\text{ s}$. Find the train's speed.

- Crossing a person takes $20\text{ s}$ to cover the train's own length.
- Crossing the platform takes $29\text{ s}$ to cover the train's length plus $135\text{ m}$.
- The extra time is $29 - 20 = 9\text{ s}$, and that time accounts for the platform's $135\text{ m}$.

Therefore:

$$
\Large
S = \frac{\text{Extra distance}}{\text{Extra time}} = \frac{135}{29 - 20} = \frac{135}{9} = 15\text{ m/s}
$$

Convert to km/h:

$$
\Large
15 \times \frac{18}{5} = \boxed{54\text{ km/h}}
$$

**Shortcut:**

$$
\Large
\boxed{S = \frac{\text{Difference in object lengths}}{\text{Difference in crossing times}}}
$$

This applies when the same train travels at constant speed and the difference in distance is known.

---

## 8. Ratio and Proportionality

### Case A: Constant time

When two journeys take the same amount of time, distance is directly proportional to speed.

$$
\Large
\boxed{\frac{D_1}{D_2} = \frac{S_1}{S_2}}
$$

### Example: Out-and-back meeting point

P and Q are $42\text{ km}$ apart. Rohit and Mohit start at P and travel towards Q at $6\text{ km/h}$ and $8\text{ km/h}$, respectively. Mohit reaches Q, immediately turns back, and meets Rohit at R. Find $PR$.

Let $QR = x\text{ km}$.

- Mohit's distance: $42 + x$
- Rohit's distance: $42 - x$

They travel for the same elapsed time, so:

$$
\Large
\frac{42 + x}{42 - x} = \frac{8}{6} = \frac{4}{3}
$$

Cross-multiply:

$$
\Large
3(42 + x) = 4(42 - x)
$$

$$
\Large
126 + 3x = 168 - 4x
$$

$$
\Large
7x = 42 \implies x = 6\text{ km}
$$

Therefore:

$$
\Large
PR = 42 - x = 42 - 6 = \boxed{36\text{ km}}
$$

### Case B: Constant distance

For a fixed distance, speed and time are inversely proportional.

$$
\Large
\boxed{S \propto \frac{1}{T}}
$$

$$
\Large
\boxed{\frac{T_1}{T_2} = \frac{S_2}{S_1}}
$$

### Example: Reduced speed and lateness

A student walks at $\frac{3}{4}$ of their usual speed and arrives $12\text{ minutes}$ late. Find the usual travel time.

Speed ratio (usual : new):

$$
\Large
4:3
$$

Since distance is fixed, the time ratio is inverted:

$$
\Large
T_{\text{usual}} : T_{\text{new}} = 3:4
$$

The difference is $1\text{ ratio unit}$, equal to $12\text{ minutes}$.

$$
\Large
T_{\text{usual}} = 3 \times 12 = \boxed{36\text{ minutes}}
$$

---

## 9. Average Speed

### Universal formula

Always use total distance divided by total time:

$$
\Large
\boxed{\text{Average speed} = \frac{\text{Total distance}}{\text{Total time}}}
$$

### Special case 1: Equal distances

If a person travels one distance at speed $x$ and returns over the same distance at speed $y$, then:

$$
\Large
\boxed{S_{\text{avg}} = \frac{2xy}{x + y}}
$$

**Do not use $\frac{x + y}{2}$ for equal-distance trips.**

**Example:** Travel to a destination at $20\text{ km/h}$ and return over the same distance at $30\text{ km/h}$.

$$
\Large
S_{\text{avg}} = \frac{2 \times 20 \times 30}{20 + 30} = \frac{1200}{50} = \boxed{24\text{ km/h}}
$$

The average is not $25\text{ km/h}$, because the slower leg takes more time.

### Special case 2: Equal time durations

If a person travels at speed $x$ for time $t$, then at speed $y$ for the same time $t$:

$$
\Large
\boxed{S_{\text{avg}} = \frac{x + y}{2}}
$$

### Combined exam examples

**Car: Delhi to Chandigarh and back**

The car travels at $120\text{ km/h}$ on the onward journey and $80\text{ km/h}$ on the return journey. The distances are equal.

$$
\Large
S_{\text{avg}} = \frac{2 \times 120 \times 80}{120 + 80} = \boxed{96\text{ km/h}}
$$

**Train: Two journeys of equal duration**

A train travels at $60\text{ km/h}$ for time $t$, then at $40\text{ km/h}$ for the same time $t$.

$$
\Large
S_{\text{avg}} = \frac{60 + 40}{2} = \boxed{50\text{ km/h}}
$$

---

## 10. Boats and Streams

Let:
- $B$ = speed of the boat in still water
- $W$ = speed of the stream/current
- $D$ = downstream speed
- $U$ = upstream speed

### Downstream and upstream formulas

**Downstream:** The current helps the boat.

$$
\Large
\boxed{D = B + W}
$$

**Upstream:** The current opposes the boat.

$$
\Large
\boxed{U = B - W}
$$

### Standard shortcuts

Add the downstream and upstream speeds to find the still-water boat speed:

$$
\Large
\boxed{B = \frac{D + U}{2}}
$$

Subtract upstream speed from downstream speed and divide by two to find the stream speed:

$$
\Large
\boxed{W = \frac{D - U}{2}}
$$

### Example 1: Find the speed of the current

A boat covers $100\text{ km}$ downstream in $10\text{ h}$ and $75\text{ km}$ upstream in $15\text{ h}$. Find the current speed.

**Downstream speed**

$$
\Large
D = \frac{100}{10} = 10\text{ km/h}
$$

**Upstream speed**

$$
\Large
U = \frac{75}{15} = 5\text{ km/h}
$$

**Current speed**

$$
\Large
W = \frac{D - U}{2} = \frac{10 - 5}{2} = \boxed{2.5\text{ km/h}}
$$

**Boat speed in still water**

$$
\Large
B = \frac{D + U}{2} = \frac{10 + 5}{2} = \boxed{7.5\text{ km/h}}
$$

### Example 2: Find the speed of the person/boat in still water

A man travels $10\text{ km}$ upstream in $8\text{ h}$ and $36\text{ km}$ downstream in $6\text{ h}$. Find his speed in still water.

**Upstream speed**

$$
\Large
U = \frac{10}{8} = 1.25\text{ km/h}
$$

**Downstream speed**

$$
\Large
D = \frac{36}{6} = 6\text{ km/h}
$$

**Still-water speed**

$$
\Large
B = \frac{D + U}{2} = \frac{6 + 1.25}{2} = \frac{7.25}{2} = \boxed{3.625\text{ km/h}}
$$

---

## 11. Placement Strategy and Common Mistakes

### Why these shortcuts matter

In timed aptitude rounds, a direct formula or ratio method can save valuable time compared with building a long equation from scratch. Practise recognizing the question type before calculating.

### What to practise

1. Memorize the conversion factors:
   $$
\Large
\boxed{\text{km/h} \times \frac{5}{18} = \text{m/s}}
   \qquad
   \boxed{\text{m/s} \times \frac{18}{5} = \text{km/h}}
$$
2. For train questions, check whether the object is a point object or has a length.
3. For relative motion, identify the direction first, then subtract or add speeds.
4. For boats and streams, calculate $D$ and $U$ first, then use:
   $$
\Large
B = \frac{D + U}{2}, \qquad W = \frac{D - U}{2}
$$
5. For average speed, check whether the journey has equal distances or equal time durations.

### Common mistakes to avoid

- Mixing m/s and km/h while adding or subtracting speeds.
- Forgetting to add train and platform lengths when crossing an extended object.
- Using the sum of speeds for two bodies moving in the same direction.
- Using $\frac{x + y}{2}$ for an equal-distance round trip.
- Confusing downstream and upstream: downstream is faster when the current is flowing in the direction of travel.

---

## 12. Practice Problem: Two Bridges

**Question:** A train crosses two bridges of lengths $800\text{ m}$ and $400\text{ m}$ in $100\text{ s}$ and $60\text{ s}$, respectively. Find the length and speed of the train.

### Step-by-step solution

Let:
- $L$ = train length in metres
- $S$ = train speed in m/s

For the $800\text{ m}$ bridge:

$$
\Large
\frac{L + 800}{S} = 100
$$

$$
\Large
L + 800 = 100S \tag{1}
$$

For the $400\text{ m}$ bridge:

$$
\Large
\frac{L + 400}{S} = 60
$$

$$
\Large
L + 400 = 60S \tag{2}
$$

Subtract equation (2) from equation (1):

$$
\Large
400 = 40S
$$

$$
\Large
\boxed{S = 10\text{ m/s}}
$$

Convert to km/h:

$$
\Large
10 \times \frac{18}{5} = \boxed{36\text{ km/h}}
$$

Substitute $S = 10$ into equation (2):

$$
\Large
L + 400 = 60 \times 10 = 600
$$

$$
\Large
\boxed{L = 200\text{ m}}
$$

### Final answer

- **Train length:** $\Large \boxed{200\text{ m}}$
- **Train speed:** $\Large \boxed{10\text{ m/s} = 36\text{ km/h}}$

### Faster shortcut

The difference between bridge lengths is $800 - 400 = 400\text{ m}$, and the difference between crossing times is $100 - 60 = 40\text{ s}$.

$$
\Large
S = \frac{400}{40} = 10\text{ m/s}
$$

Then:

$$
\Large
L = (S \times 60) - 400 = (10 \times 60) - 400 = 200\text{ m}
$$

---

## Quick Formula Sheet

| Concept | Formula |
|---|---|
| Speed | $\Large \displaystyle S = \frac{D}{T}$ |
| Distance | $\Large D = S \times T$ |
| Time | $\Large \displaystyle T = \frac{D}{S}$ |
| km/h to m/s | Multiply by $\Large \displaystyle \frac{5}{18}$ |
| m/s to km/h | Multiply by $\Large \displaystyle \frac{18}{5}$ |
| Train crosses a point object | $\Large \displaystyle T = \frac{L_{\text{train}}}{S}$ |
| Train crosses a platform | $\Large \displaystyle T = \frac{L_{\text{train}} + L_{\text{platform}}}{S}$ |
| Relative speed, same direction | $\Large \lvert S_1 - S_2\rvert$ |
| Relative speed, opposite directions | $\Large S_1 + S_2$ |
| Chasing time | $\Large \displaystyle \frac{\text{Initial gap}}{S_{\text{chaser}} - S_{\text{runner}}}$ |
| Meeting time | $\Large \displaystyle \frac{\text{Initial distance}}{S_1 + S_2}$ |
| Average speed, any journey | $\Large \displaystyle \frac{\text{Total distance}}{\text{Total time}}$ |
| Average speed, equal distances | $\Large \displaystyle \frac{2xy}{x + y}$ |
| Average speed, equal times | $\Large \displaystyle \frac{x + y}{2}$ |
| Downstream speed | $\Large D = B + W$ |
| Upstream speed | $\Large U = B - W$ |
| Boat speed in still water | $\Large \displaystyle B = \frac{D + U}{2}$ |
| Stream speed | $\Large \displaystyle W = \frac{D - U}{2}$ |

---

*Revision tip: First identify the question type, write the matching formula, convert units, and then substitute values. That sequence prevents most avoidable mistakes.*
