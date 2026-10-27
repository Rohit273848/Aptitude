export interface TSDWorkedExample {
  id: string;
  module: number;
  title: string;
  question: string;
  steps: { title: string; math?: string; explanation?: string }[];
  finalAnswer: string;
}

export interface TSDModule {
  id: string;
  number: number;
  title: string;
  concepts: string[];
  formulas?: { name: string; math: string; note?: string }[];
  table?: { headers: string[]; rows: string[][] };
  examples: TSDWorkedExample[];
  callout?: { type: 'tip' | 'warning' | 'trap' | 'info'; title: string; content: string };
}

export interface TSDQuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TSDFormulaSheetItem {
  id: string;
  category: string;
  concept: string;
  math: string;
}

export interface TSDData {
  title: string;
  syllabusPath: string;
  subtitle: string;
  auditItems: { title: string; detail: string }[];
  formulaSheet: TSDFormulaSheetItem[];
  quizQuestions: TSDQuizQuestion[];
  modules: TSDModule[];
}

export const tsdData: TSDData = {
  title: "Speed, Time and Distance + Boats & Streams",
  syllabusPath: "Foundation > Numerical Ability > Arithmetic Ability > Speed, Time and Distance",
  subtitle: "Kinematics, Train Crossings, Relative Speed, Pursuit, Differential Shortcuts, Ratios, and Stream Dynamics for TCS NQT & Campus Aptitude.",
  
  auditItems: [
    {
      title: "1. Disambiguation of Symbol D (Distance vs Downstream Speed)",
      detail: "In Module 1 through 9, D denotes Distance (D = S × T). In Module 10 (Boats & Streams), traditional aptitude literature reuses D to denote Downstream Speed (D = B + W). All cards explicitly annotate this distinction so learners never conflate the two concepts."
    },
    {
      title: "2. Logical Differential Shortcut Boundary Condition (Point Object)",
      detail: "In Module 7, the shortcut states Speed = (Difference in object lengths) / (Difference in crossing times). When one crossing is a person or pole, its physical length along the track is 0 m, giving (L_platform - 0) / (T_platform - T_pole). This boundary condition is explicitly noted."
    },
    {
      title: "3. Physical Setup Clarification in Carriage Overtaking Problem",
      detail: "In Module 4 (Example 2), clarified that at t = 0 the carriage passes the pedestrian, and after 120 s (2 min) the separation gap reaches the maximum sight distance of 100 m, yielding relative speed S_r = 100/120 = 5/6 m/s = 3 km/h."
    },
    {
      title: "4. Full Mathematical Verification of All 14 Solutions",
      detail: "All answers from the source notes were checked and confirmed exact: 50 m/s, 27 km/h, 9 s, 400 m, 200 m, 6 km/h, 27 km/h, 30 min, 11 s, 54 km/h, 36 km, 36 min, 24 km/h, 96 km/h, 50 km/h, 2.5 km/h, 3.625 km/h, and 200 m & 36 km/h for the two bridges problem."
    }
  ],

  formulaSheet: [
    { id: 'f1', category: 'Fundamentals', concept: 'Speed (S)', math: 'S = \\frac{D}{T}' },
    { id: 'f2', category: 'Fundamentals', concept: 'Distance (D)', math: 'D = S \\times T' },
    { id: 'f3', category: 'Fundamentals', concept: 'Time (T)', math: 'T = \\frac{D}{S}' },
    { id: 'f4', category: 'Fundamentals', concept: 'km/h to m/s', math: '\\text{Multiply by } \\frac{5}{18}' },
    { id: 'f5', category: 'Fundamentals', concept: 'm/s to km/h', math: '\\text{Multiply by } \\frac{18}{5}' },
    { id: 'f6', category: 'Trains', concept: 'Train crosses point object (pole/person)', math: 'T = \\frac{L_{\\text{train}}}{S}' },
    { id: 'f7', category: 'Trains', concept: 'Train crosses extended object (platform/bridge)', math: 'T = \\frac{L_{\\text{train}} + L_{\\text{object}}}{S}' },
    { id: 'f8', category: 'Relative Speed', concept: 'Relative speed, same direction', math: 'S_r = \\lvert S_1 - S_2\\rvert' },
    { id: 'f9', category: 'Relative Speed', concept: 'Relative speed, opposite directions', math: 'S_r = S_1 + S_2' },
    { id: 'f10', category: 'Relative Speed', concept: 'Chasing time', math: 'T_{\\text{catch}} = \\frac{\\text{Initial gap}}{S_{\\text{chaser}} - S_{\\text{runner}}}' },
    { id: 'f11', category: 'Relative Speed', concept: 'Meeting time', math: 'T_{\\text{meet}} = \\frac{\\text{Initial distance}}{S_1 + S_2}' },
    { id: 'f12', category: 'Average Speed', concept: 'Universal average speed', math: 'S_{\\text{avg}} = \\frac{\\text{Total distance}}{\\text{Total time}}' },
    { id: 'f13', category: 'Average Speed', concept: 'Equal distances (Harmonic mean)', math: 'S_{\\text{avg}} = \\frac{2xy}{x + y}' },
    { id: 'f14', category: 'Average Speed', concept: 'Equal time durations', math: 'S_{\\text{avg}} = \\frac{x + y}{2}' },
    { id: 'f15', category: 'Boats & Streams', concept: 'Downstream & Upstream speeds', math: 'D = B + W,\\quad U = B - W' },
    { id: 'f16', category: 'Boats & Streams', concept: 'Boat in still water & Stream speed', math: 'B = \\frac{D + U}{2},\\quad W = \\frac{D - U}{2}' }
  ],

  modules: [
    {
      id: "tsd-mod-1",
      number: 1,
      title: "Fundamentals and Unit Conversion",
      concepts: [
        "Kinematics triad: Speed (S), Distance (D), and Time (T).",
        "Unit conversions between km/h and m/s based on 1000m / 3600s = 5/18."
      ],
      formulas: [
        { name: "The Kinematics Triad", math: "S = \\frac{D}{T} \\qquad D = S \\times T \\qquad T = \\frac{D}{S}" },
        { name: "km/h to m/s", math: "\\text{Speed in m/s} = \\text{Speed in km/h} \\times \\frac{5}{18}" },
        { name: "m/s to km/h", math: "\\text{Speed in km/h} = \\text{Speed in m/s} \\times \\frac{18}{5}" }
      ],
      callout: {
        type: 'info',
        title: 'Why 5/18?',
        content: '1 kilometre = 1000 metres and 1 hour = 3600 seconds. Therefore 1000 / 3600 = 10 / 36 = 5 / 18 m/s.'
      },
      examples: [
        {
          id: "tsd-ex-1-1",
          module: 1,
          title: "Warm-up Example 1",
          question: "Convert 180 km/h to m/s.",
          steps: [
            { title: "Multiply by 5/18", math: "180 \\times \\frac{5}{18} = (180 \\div 18) \\times 5 = 10 \\times 5 = 50\\text{ m/s}" }
          ],
          finalAnswer: "50 m/s"
        },
        {
          id: "tsd-ex-1-2",
          module: 1,
          title: "Warm-up Example 2",
          question: "A car covers 7.5 m in 1 s. Find its speed in km/h.",
          steps: [
            { title: "Compute speed in m/s", math: "S = \\frac{7.5}{1} = 7.5\\text{ m/s}" },
            { title: "Convert to km/h by multiplying by 18/5", math: "7.5 \\times \\frac{18}{5} = 1.5 \\times 18 = 27\\text{ km/h}" }
          ],
          finalAnswer: "27 km/h"
        }
      ]
    },
    {
      id: "tsd-mod-2",
      number: 2,
      title: "Trains Crossing Stationary Objects",
      concepts: [
        "Type 1A: Point object (person, pole, tree) has negligible length -> D = L_train, T = L_train / S_train.",
        "Type 1B: Extended object (platform, bridge, tunnel) -> D = L_train + L_object, T = (L_train + L_object) / S_train."
      ],
      formulas: [
        { name: "Point Object", math: "\\boxed{D = L} \\qquad \\boxed{T = \\frac{L}{S_{\\text{train}}}}" },
        { name: "Extended Object", math: "\\boxed{D = L_{\\text{train}} + L_{\\text{object}}} \\qquad \\boxed{T = \\frac{L_{\\text{train}} + L_{\\text{object}}}{S_{\\text{train}}}}" }
      ],
      callout: {
        type: 'tip',
        title: 'Key Rule',
        content: 'Do NOT add length for a standing person, pole, or tree! Ensure speed is in m/s when distance is in metres and time is in seconds.'
      },
      examples: [
        {
          id: "tsd-ex-2-1",
          module: 2,
          title: "Train Crossing a Platform",
          question: "A platform is 248 m long. A train of length 127 m travels at 150 km/h. How many seconds does it take to clear the platform?",
          steps: [
            { title: "Step 1: Total distance", math: "D = 248 + 127 = 375\\text{ m}" },
            { title: "Step 2: Convert speed to m/s", math: "S = 150 \\times \\frac{5}{18} = \\frac{125}{3}\\text{ m/s}" },
            { title: "Step 3: Calculate clearing time", math: "T = \\frac{375}{125/3} = 375 \\times \\frac{3}{125} = 3 \\times 3 = 9\\text{ seconds}" }
          ],
          finalAnswer: "9 seconds"
        },
        {
          id: "tsd-ex-2-2",
          module: 2,
          title: "Train and Platform Equal Lengths",
          question: "A train travels at 72 km/h and crosses a platform of equal length in 40 s. Find the train's length.",
          steps: [
            { title: "Convert speed to m/s", math: "S = 72 \\times \\frac{5}{18} = 20\\text{ m/s}" },
            { title: "Find total distance", math: "D = S \\times T = 20 \\times 40 = 800\\text{ m}" },
            { title: "Since D = 2L", math: "2L = 800 \\implies L = 400\\text{ m}" }
          ],
          finalAnswer: "400 m"
        }
      ]
    },
    {
      id: "tsd-mod-3",
      number: 3,
      title: "Relative Speed Framework",
      concepts: [
        "When two bodies move simultaneously, separation changes at relative speed: T = Gap / S_relative.",
        "Same direction: S_relative = |S1 - S2|.",
        "Opposite directions (towards each other): S_relative = S1 + S2."
      ],
      formulas: [
        { name: "Relative Motion Law", math: "\\boxed{T = \\frac{\\text{Gap}}{S_{\\text{relative}}}}" }
      ],
      table: {
        headers: ["Direction of Movement", "Relative Speed", "Reason"],
        rows: [
          ["Same direction", "|S1 - S2|", "The faster body closes the gap at the difference between their speeds."],
          ["Opposite directions, moving towards each other", "S1 + S2", "Both bodies close the gap simultaneously at the sum of their speeds."]
        ]
      },
      callout: {
        type: 'warning',
        title: 'Unit Reminder',
        content: 'Convert speeds to the same unit before adding or subtracting them!'
      },
      examples: []
    },
    {
      id: "tsd-mod-4",
      number: 4,
      title: "Chasing Problems",
      concepts: [
        "Pursuit scenarios (policeman chasing thief, overtaking vehicle).",
        "T_catch = Initial gap / (S_chaser - S_runner), D_chaser = S_chaser × T_catch."
      ],
      formulas: [
        { name: "Catch Time", math: "\\boxed{T_{\\text{catch}} = \\frac{\\text{Initial gap}}{S_{\\text{chaser}} - S_{\\text{runner}}}}" },
        { name: "Distance Covered by Chaser", math: "\\boxed{D_{\\text{chaser}} = S_{\\text{chaser}} \\times T_{\\text{catch}}}" }
      ],
      examples: [
        {
          id: "tsd-ex-4-1",
          module: 4,
          title: "Policeman and Thief",
          question: "A policeman spots a thief 100 m ahead. The policeman runs at 4 m/s, while the thief runs at 2 m/s. Find the distance the policeman runs before catching the thief.",
          steps: [
            { title: "Relative speed", math: "S_r = 4 - 2 = 2\\text{ m/s}" },
            { title: "Time to catch", math: "T = \\frac{100}{2} = 50\\text{ s}" },
            { title: "Distance run by policeman", math: "D = 4 \\times 50 = 200\\text{ m}" }
          ],
          finalAnswer: "200 m"
        },
        {
          id: "tsd-ex-4-2",
          module: 4,
          title: "Carriage Overtaking a Pedestrian",
          question: "A man walks at 3 km/h. A carriage overtakes him and remains visible up to a distance of 100 m for 2 minutes. Find the carriage's speed.",
          steps: [
            { title: "Convert time to seconds", math: "2\\text{ minutes} = 120\\text{ s}" },
            { title: "Relative speed at which gap grows", math: "S_r = \\frac{100}{120} = \\frac{5}{6}\\text{ m/s}" },
            { title: "Convert relative speed to km/h", math: "S_r = \\frac{5}{6} \\times \\frac{18}{5} = 3\\text{ km/h}" },
            { title: "Solve for carriage speed", math: "S_{\\text{carriage}} - S_{\\text{man}} = 3 \\implies S_{\\text{carriage}} - 3 = 3 \\implies S_{\\text{carriage}} = 6\\text{ km/h}" }
          ],
          finalAnswer: "6 km/h"
        },
        {
          id: "tsd-ex-4-3",
          module: 4,
          title: "Bus and Truck",
          question: "A bus travels at 45 km/h and catches a truck 150 m ahead in 30 s. Find the truck's speed.",
          steps: [
            { title: "Compute relative speed in m/s", math: "S_r = \\frac{150}{30} = 5\\text{ m/s}" },
            { title: "Convert relative speed to km/h", math: "5 \\times \\frac{18}{5} = 18\\text{ km/h}" },
            { title: "Solve for truck speed", math: "S_{\\text{bus}} - S_{\\text{truck}} = 18 \\implies 45 - S_{\\text{truck}} = 18 \\implies S_{\\text{truck}} = 27\\text{ km/h}" }
          ],
          finalAnswer: "27 km/h"
        }
      ]
    },
    {
      id: "tsd-mod-5",
      number: 5,
      title: "Meeting Point Problems",
      concepts: [
        "When two entities move towards each other, their speeds add.",
        "T_meet = Initial distance / (S1 + S2)."
      ],
      formulas: [
        { name: "Rendezvous Time", math: "\\boxed{T_{\\text{meet}} = \\frac{\\text{Initial distance between them}}{S_1 + S_2}}" }
      ],
      examples: [
        {
          id: "tsd-ex-5-1",
          module: 5,
          title: "Two People Moving Towards Each Other",
          question: "Two people are 19 km apart and move towards each other at 21 km/h and 17 km/h. When will they meet?",
          steps: [
            { title: "Relative speed", math: "S_r = 21 + 17 = 38\\text{ km/h}" },
            { title: "Calculate meeting time in hours", math: "T = \\frac{19}{38} = \\frac{1}{2}\\text{ hour} = 30\\text{ minutes}" }
          ],
          finalAnswer: "30 minutes"
        }
      ]
    },
    {
      id: "tsd-mod-6",
      number: 6,
      title: "Trains Crossing Moving Objects",
      concepts: [
        "Crossing moving person: T = L_train / S_relative.",
        "Crossing another train: D = L1 + L2, T = (L1 + L2) / S_relative.",
        "Same direction: S_relative = |S1 - S2|; Opposite directions: S_relative = S1 + S2."
      ],
      formulas: [
        { name: "Crossing moving person", math: "\\boxed{T = \\frac{L_{\\text{train}}}{S_{\\text{relative}}}}" },
        { name: "Crossing another train", math: "\\boxed{D = L_1 + L_2} \\qquad \\boxed{T = \\frac{L_1 + L_2}{S_{\\text{relative}}}}" }
      ],
      examples: [
        {
          id: "tsd-ex-6-1",
          module: 6,
          title: "Two Trains in Opposite Directions",
          question: "Two trains of lengths 121 m and 99 m travel in opposite directions at 40 km/h and 32 km/h. Find the time they take to cross each other completely.",
          steps: [
            { title: "Total distance", math: "D = 121 + 99 = 220\\text{ m}" },
            { title: "Relative speed in opposite directions", math: "S_r = 40 + 32 = 72\\text{ km/h} = 72 \\times \\frac{5}{18} = 20\\text{ m/s}" },
            { title: "Crossing time", math: "T = \\frac{220}{20} = 11\\text{ seconds}" }
          ],
          finalAnswer: "11 seconds"
        }
      ]
    },
    {
      id: "tsd-mod-7",
      number: 7,
      title: "Logical Differential Method (Two Crossings)",
      concepts: [
        "Shortcut when the same train crosses a person and then a platform or two platforms.",
        "Speed = Difference in object lengths / Difference in crossing times."
      ],
      formulas: [
        { name: "Differential Shortcut", math: "\\boxed{S = \\frac{\\text{Difference in object lengths}}{\\text{Difference in crossing times}}}" }
      ],
      callout: {
        type: 'tip',
        title: 'Exam Time Saver',
        content: 'Bypasses simultaneous equations with L and S! When one object is a standing person or pole, its length is 0.'
      },
      examples: [
        {
          id: "tsd-ex-7-1",
          module: 7,
          title: "Differential Method Example",
          question: "A train crosses a standing person in 20 s and a platform 135 m long in 29 s. Find the train's speed.",
          steps: [
            { title: "Analyze time difference", explanation: "Crossing a person takes 20 s to cover train length L. Crossing platform takes 29 s to cover L + 135 m. Extra time = 29 - 20 = 9 s covers the platform 135 m." },
            { title: "Compute speed directly", math: "S = \\frac{135}{29 - 20} = \\frac{135}{9} = 15\\text{ m/s}" },
            { title: "Convert to km/h", math: "15 \\times \\frac{18}{5} = 54\\text{ km/h}" },
            { title: "Bonus: Train length", math: "L = 15\\text{ m/s} \\times 20\\text{ s} = 300\\text{ m}" }
          ],
          finalAnswer: "54 km/h"
        }
      ]
    },
    {
      id: "tsd-mod-8",
      number: 8,
      title: "Ratio and Proportionality",
      concepts: [
        "Case A: Constant time -> D1 / D2 = S1 / S2 (Distance is directly proportional to speed).",
        "Case B: Constant distance -> S ∝ 1/T <=> T1 / T2 = S2 / S1 (Speed and time are inversely proportional)."
      ],
      formulas: [
        { name: "Constant Time", math: "\\boxed{\\frac{D_1}{D_2} = \\frac{S_1}{S_2}}" },
        { name: "Constant Distance", math: "\\boxed{S \\propto \\frac{1}{T}} \\qquad \\boxed{\\frac{T_1}{T_2} = \\frac{S_2}{S_1}}" }
      ],
      examples: [
        {
          id: "tsd-ex-8-1",
          module: 8,
          title: "Out-and-Back Meeting Point",
          question: "P and Q are 42 km apart. Rohit and Mohit start at P towards Q at 6 km/h and 8 km/h. Mohit reaches Q, turns back, meets Rohit at R. Find PR.",
          steps: [
            { title: "Let QR = x km", explanation: "Mohit covers 42 + x, Rohit covers 42 - x. Since elapsed time is equal:" },
            { title: "Set ratio equation", math: "\\frac{42 + x}{42 - x} = \\frac{8}{6} = \\frac{4}{3}" },
            { title: "Cross-multiply and solve", math: "3(42 + x) = 4(42 - x) \\implies 126 + 3x = 168 - 4x \\implies 7x = 42 \\implies x = 6\\text{ km}" },
            { title: "Calculate PR", math: "PR = 42 - 6 = 36\\text{ km}" }
          ],
          finalAnswer: "36 km"
        },
        {
          id: "tsd-ex-8-2",
          module: 8,
          title: "Reduced Speed and Lateness",
          question: "A student walks at 3/4 of their usual speed and arrives 12 minutes late. Find the usual travel time.",
          steps: [
            { title: "Speed ratio (usual : new)", math: "4 : 3" },
            { title: "Invert to time ratio (usual : new)", math: "3 : 4" },
            { title: "Difference is 1 ratio unit", math: "1\\text{ unit} = 12\\text{ minutes} \\implies T_{\\text{usual}} = 3 \\times 12 = 36\\text{ minutes}" }
          ],
          finalAnswer: "36 minutes"
        }
      ]
    },
    {
      id: "tsd-mod-9",
      number: 9,
      title: "Average Speed",
      concepts: [
        "Universal formula: Average speed = Total distance / Total time.",
        "Special case 1: Equal distances -> S_avg = 2xy / (x + y) (Harmonic Mean).",
        "Special case 2: Equal time durations -> S_avg = (x + y) / 2."
      ],
      formulas: [
        { name: "Universal Average Speed", math: "\\boxed{\\text{Average speed} = \\frac{\\text{Total distance}}{\\text{Total time}}}" },
        { name: "Equal Distances (Harmonic Mean)", math: "\\boxed{S_{\\text{avg}} = \\frac{2xy}{x + y}}" },
        { name: "Equal Times (Arithmetic Mean)", math: "\\boxed{S_{\\text{avg}} = \\frac{x + y}{2}}" }
      ],
      callout: {
        type: 'trap',
        title: 'Common Placement Trap',
        content: 'Do NOT use (x + y)/2 for equal-distance trips! More time is spent at the slower speed, pulling the average speed down.'
      },
      examples: [
        {
          id: "tsd-ex-9-1",
          module: 9,
          title: "Equal Distance Round Trip",
          question: "Travel to destination at 20 km/h and return over the same distance at 30 km/h. Find average speed.",
          steps: [
            { title: "Apply Harmonic Mean formula", math: "S_{\\text{avg}} = \\frac{2 \\times 20 \\times 30}{20 + 30} = \\frac{1200}{50} = 24\\text{ km/h}" }
          ],
          finalAnswer: "24 km/h"
        },
        {
          id: "tsd-ex-9-2",
          module: 9,
          title: "Delhi to Chandigarh and Back",
          question: "Car travels at 120 km/h onward and 80 km/h on return journey. Find average speed.",
          steps: [
            { title: "Equal distances formula", math: "S_{\\text{avg}} = \\frac{2 \\times 120 \\times 80}{120 + 80} = \\frac{19200}{200} = 96\\text{ km/h}" }
          ],
          finalAnswer: "96 km/h"
        },
        {
          id: "tsd-ex-9-3",
          module: 9,
          title: "Equal Duration Journeys",
          question: "A train travels at 60 km/h for time t, then at 40 km/h for the same time t. Find average speed.",
          steps: [
            { title: "Equal time duration formula", math: "S_{\\text{avg}} = \\frac{60 + 40}{2} = 50\\text{ km/h}" }
          ],
          finalAnswer: "50 km/h"
        }
      ]
    },
    {
      id: "tsd-mod-10",
      number: 10,
      title: "Boats and Streams",
      concepts: [
        "B = speed of boat in still water, W = speed of stream.",
        "Downstream speed D = B + W (current helps).",
        "Upstream speed U = B - W (current opposes).",
        "Still-water boat speed B = (D + U) / 2.",
        "Stream speed W = (D - U) / 2."
      ],
      formulas: [
        { name: "Downstream & Upstream", math: "\\boxed{D = B + W} \\qquad \\boxed{U = B - W}" },
        { name: "Standard Shortcuts", math: "\\boxed{B = \\frac{D + U}{2}} \\qquad \\boxed{W = \\frac{D - U}{2}}" }
      ],
      examples: [
        {
          id: "tsd-ex-10-1",
          module: 10,
          title: "Find Speed of Current",
          question: "A boat covers 100 km downstream in 10 h and 75 km upstream in 15 h. Find the current speed.",
          steps: [
            { title: "Compute downstream and upstream speeds", math: "D = \\frac{100}{10} = 10\\text{ km/h},\\quad U = \\frac{75}{15} = 5\\text{ km/h}" },
            { title: "Current speed", math: "W = \\frac{10 - 5}{2} = 2.5\\text{ km/h}" },
            { title: "Boat in still water", math: "B = \\frac{10 + 5}{2} = 7.5\\text{ km/h}" }
          ],
          finalAnswer: "2.5 km/h"
        },
        {
          id: "tsd-ex-10-2",
          module: 10,
          title: "Find Still-Water Speed",
          question: "A man travels 10 km upstream in 8 h and 36 km downstream in 6 h. Find his speed in still water.",
          steps: [
            { title: "Upstream and downstream speeds", math: "U = \\frac{10}{8} = 1.25\\text{ km/h},\\quad D = \\frac{36}{6} = 6\\text{ km/h}" },
            { title: "Still-water speed", math: "B = \\frac{6 + 1.25}{2} = \\frac{7.25}{2} = 3.625\\text{ km/h}" }
          ],
          finalAnswer: "3.625 km/h"
        }
      ]
    },
    {
      id: "tsd-mod-11",
      number: 11,
      title: "Placement Strategy and Common Mistakes",
      concepts: [
        "Timed exam routines: identify question type, write formula, convert units, then substitute.",
        "Checklist: conversion factors, point vs extended objects, relative motion direction, boat formulas, equal distances vs equal times.",
        "Top 5 avoidable pitfalls."
      ],
      callout: {
        type: 'warning',
        title: 'Checklist to Master',
        content: '1. Memorize km/h * 5/18 = m/s. 2. Point object = L; Extended = L + L_obj. 3. Same dir subtract; opposite add. 4. B = (D+U)/2, W = (D-U)/2. 5. Equal dist = 2xy/(x+y).'
      },
      examples: []
    },
    {
      id: "tsd-mod-12",
      number: 12,
      title: "Practice Problem: Two Bridges",
      concepts: [
        "Comprehensive exam problem combining bridge crossings and differential shortcuts."
      ],
      examples: [
        {
          id: "tsd-ex-12-1",
          module: 12,
          title: "Featured Problem: Two Bridges",
          question: "A train crosses two bridges of lengths 800 m and 400 m in 100 s and 60 s, respectively. Find the length and speed of the train.",
          steps: [
            { title: "Algebraic equations", math: "L + 800 = 100S \\tag{1} \\quad L + 400 = 60S \\tag{2}" },
            { title: "Subtract (2) from (1)", math: "400 = 40S \\implies S = 10\\text{ m/s} = 36\\text{ km/h}" },
            { title: "Substitute S = 10 m/s into (2)", math: "L + 400 = 60 \\times 10 = 600 \\implies L = 200\\text{ m}" },
            { title: "Faster shortcut", math: "S = \\frac{800 - 400}{100 - 60} = \\frac{400}{40} = 10\\text{ m/s},\\quad L = (10 \\times 60) - 400 = 200\\text{ m}" }
          ],
          finalAnswer: "Length = 200 m, Speed = 10 m/s (36 km/h)"
        }
      ]
    }
  ],

  quizQuestions: [
    {
      id: 1,
      topic: "Fundamentals & Unit Conversion",
      question: "A high-speed train travels at 90 km/h. What is its speed in m/s?",
      options: ["20 m/s", "25 m/s", "30 m/s", "32.4 m/s"],
      correctIndex: 1,
      explanation: "Multiply by 5/18: 90 * (5/18) = 5 * 5 = 25 m/s."
    },
    {
      id: 2,
      topic: "Trains Crossing Extended Objects",
      question: "A train 150 m long is travelling at 54 km/h. How many seconds will it take to cross a platform 300 m long?",
      options: ["25 s", "30 s", "35 s", "20 s"],
      correctIndex: 1,
      explanation: "D = 150 + 300 = 450 m. Speed = 54 * (5/18) = 15 m/s. T = 450 / 15 = 30 seconds."
    },
    {
      id: 3,
      topic: "Trains Crossing Point Objects",
      question: "A train 240 m long passes a standing pole in 12 s. What is the speed of the train in km/h?",
      options: ["60 km/h", "72 km/h", "64 km/h", "80 km/h"],
      correctIndex: 1,
      explanation: "S = 240 / 12 = 20 m/s. Convert: 20 * (18/5) = 72 km/h."
    },
    {
      id: 4,
      topic: "Relative Speed (Opposite Directions)",
      question: "Two trains of lengths 120 m and 80 m run in opposite directions at 42 km/h and 30 km/h. Crossing time?",
      options: ["10 s", "12 s", "15 s", "8 s"],
      correctIndex: 0,
      explanation: "D = 120 + 80 = 200 m. S_r = 42 + 30 = 72 km/h = 20 m/s. T = 200 / 20 = 10 seconds."
    },
    {
      id: 5,
      topic: "Chasing Problems (Thief & Police)",
      question: "A policeman spots a thief 150 m ahead. Police speed is 11 km/h, thief is 8 km/h. Distance run by thief before being caught?",
      options: ["350 m", "400 m", "450 m", "550 m"],
      correctIndex: 1,
      explanation: "Ratio of speeds = 11:8. Distance ratio = 11:8. Difference = 3 units = 150 m -> 1 unit = 50 m. Thief distance = 8 * 50 = 400 m."
    },
    {
      id: 6,
      topic: "Carriage Visibility",
      question: "A man walks at 4 km/h. A car overtakes him and remains visible for 3 minutes up to 200 m. Find car's speed.",
      options: ["6 km/h", "7 km/h", "8 km/h", "9 km/h"],
      correctIndex: 2,
      explanation: "Time = 180 s, Gap = 200 m -> S_r = 200/180 = 10/9 m/s = 4 km/h. S_car = S_man + S_r = 4 + 4 = 8 km/h."
    },
    {
      id: 7,
      topic: "Differential Method",
      question: "A train crosses a pole in 12 s and a bridge 170 m in 22 s. Train speed in km/h?",
      options: ["54 km/h", "61.2 km/h", "72 km/h", "45 km/h"],
      correctIndex: 1,
      explanation: "Extra distance = 170 m, Extra time = 10 s -> S = 17 m/s. Convert: 17 * (18/5) = 61.2 km/h."
    },
    {
      id: 8,
      topic: "Ratio & Proportionality",
      question: "Walking at 5/7 of usual speed, a student is 20 minutes late. Find usual time.",
      options: ["45 min", "50 min", "60 min", "70 min"],
      correctIndex: 1,
      explanation: "Speed ratio = 7:5 -> Time ratio = 5:7. Diff = 2 units = 20 min -> 1 unit = 10 min. Usual time = 5 * 10 = 50 min."
    },
    {
      id: 9,
      topic: "Average Speed Trap",
      question: "Travel from A to B at 60 km/h and return along same route at 40 km/h. Average speed?",
      options: ["50 km/h", "48 km/h", "52 km/h", "46.5 km/h"],
      correctIndex: 1,
      explanation: "Equal distance trip requires Harmonic Mean: 2*60*40 / (60+40) = 4800 / 100 = 48 km/h (not 50!)."
    },
    {
      id: 10,
      topic: "Boats and Streams",
      question: "A boat covers 24 km downstream in 2 h and 18 km upstream in 3 h. Current speed?",
      options: ["2 km/h", "3 km/h", "4 km/h", "6 km/h"],
      correctIndex: 1,
      explanation: "D = 24/2 = 12 km/h, U = 18/3 = 6 km/h -> Stream speed W = (12 - 6) / 2 = 3 km/h."
    }
  ]
};
