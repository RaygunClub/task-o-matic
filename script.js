
const taskList = document.getElementById('taskList');
const dayTitle = document.getElementById('dayTitle');
const resetBtn = document.getElementById('resetBtn');
const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

let tasksPerDay = {
  "Everyday": {
    "Morning Checklist": [
      "Make Bed",
      "Brush teeth",
      "Go outside",
      "Meditate for 5 minutes",
      "Habit tracker"
    ]
  },
  "Sunday": {
    "Chore": [
      "Wipe down kitchen counters",
      "Vacuum kitchen",
      "Mop kitchen",
      "Wash bedding"
    ],
    "Personal Growth": [
      "Read for 15 minutes",
      "Train Hopper for 5-10 minutes",
      "Study for 30-60 minutes"
    ],
    "Exercise: Booty & Arms Bonus Day": [
      "Glute Bridges with Plate: 3 sets of 12 reps, 3-second hold at top - Plate",
      "Donkey Kicks: 2 sets of 12 per leg - Bodyweight",
      "Fire Hydrants: 2 sets of 12 per leg - Bodyweight",
      "Step-Ups with Plate (hug plate): 2 sets of 10 per leg - Plate",
      "Plate Curls (hold plate with both hands): 3 sets of 12 reps - Plate",
      "Overhead Plate Tricep Extensions: 2 sets of 10 reps - Plate",
      "Close-Grip Push-ups: 2 sets of 10 reps - Bodyweight",
      "Walk: 60 minutes"
    ]
  },
  "Monday": {
    "Chore": [
      "Clean appliances",
      "Clean out fridge",
      "Wash clothing",
      "Put away laundry"
    ],
    "Personal Growth": [
      "Read for 15 minutes",
      "Train Hopper for 5-10 minutes",
      "Study for 30-60 minutes"
    ],
    "Exercise: Yoga/Stretch": [
      "Beginner Yoga Routine: 20 minutes",
      "Optional: Intro to Pilates: 15 minutes",
      "Walk: 60 minutes"
    ]
  },
  "Tuesday": {
    "Chore": [
      "Clean pink bathroom",
      "Wash towels"
    ],
    "Personal Growth": [
      "Read for 15 minutes",
      "Train Hopper for 5-10 minutes",
      "Study for 30-60 minutes"
    ],
    "Exercise: Strength Upper": [
      "Plate Rows: 2 sets of 10 reps per arm - Plate",
      "Plate Curls (hold plate with both hands): 2 sets of 12 reps - Plate",
      "Overhead Plate Press: 2 sets of 10 reps - Plate",
      "Wall Push-ups or Incline Push-ups: 2 sets of 8-10 reps - Bodyweight",
      "Plank: 2 sets, 20-second hold - Bodyweight",
      "Walk: 60 minutes"
    ]
  },
  "Wednesday": {
    "Chore": [
      "Vacuum First + Second Floors",
      "Wash couch bedding"
    ],
    "Personal Growth": [
      "Read for 15 minutes",
      "Train Hopper for 5-10 minutes",
      "Study for 30-60 minutes"
    ],
    "Exercise: Yoga/Stretch": [
      "Beginner Yoga Routine: 20 minutes",
      "Optional: Intro to Pilates: 15 minutes",
      "Walk: 60 minutes"
    ]
  },
  "Thursday": {
    "Chore": [
      "Dust First Floors"
    ],
    "Personal Growth": [
      "Read for 15 minutes",
      "Train Hopper for 5-10 minutes",
      "Study for 30-60 minutes"
    ],
    "Exercise: Cardio + Core": [
      "Rowing Machine: 20 minutes",
      "Bird Dogs: 2 sets of 10 (each side) - Bodyweight",
      "Dead Bugs: 2 sets of 10 (each side) - Bodyweight",
      "Side Plank: 1 set per side, 15 seconds - Bodyweight",
      "Marching High Knees - 2 sets of 10 holding weight",
      "Walk: 60 minutes"
    ]
  },
  "Friday": {
    "Chore": [
      "Clean Guest Bathroom"
    ],
    "Personal Growth": [
      "Read for 15 minutes",
      "Train Hopper for 5-10 minutes",
      "Study for 30-60 minutes"
    ],
    "Exercise: Yoga/Stretch": [
      "Beginner Yoga Routine: 20 minutes",
      "Optional: Intro to Pilates: 15 minutes",
      "Walk: 60 minutes"
    ]
  },
  "Saturday": {
    "Chore": [
      "Vacuum First + Second Floors",
      "Tidy Office",
      "Water Plants"
    ],
    "Personal Growth": [
      "Read for 15 minutes",
      "Take Hopper to a park",
      "Study for 30-60 minutes"
    ],
    "Exercise: Strength Lower": [
      "Glute Bridges with Plate: 2 sets of 12 reps - Plate",
      "Wall Sits: 2 sets, 20-30 seconds - Bodyweight",
      "Goblet Squats (hug plate): 2 sets of 10 reps - Plate",
      "RDLs with Plate: 2 sets of 10 reps - Plate",
      "Calf Raises: 2 sets of 15 reps - Bodyweight",
      "Walk: 60 minutes"
    ]
  }
};

dayTitle.textContent = `${today}'s Tasks`;
loadTasks(today);

function loadTasks(day) {
  taskList.innerHTML = "";
  const dayTasks = tasksPerDay[day] || {};
  const everydayTasks = tasksPerDay['Everyday'] || {};
  const savedState = JSON.parse(localStorage.getItem(day)) || {};

  const allTasks = { ...everydayTasks, ...dayTasks };

  for (const [section, tasks] of Object.entries(allTasks)) {
    const header = document.createElement('h3');
    header.textContent = section;
    taskList.appendChild(header);

    tasks.forEach(task => {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = savedState[task] || false;

      checkbox.addEventListener('change', () => {
        savedState[task] = checkbox.checked;
        localStorage.setItem(day, JSON.stringify(savedState));
      });

      const label = document.createElement('label');
      label.textContent = task;

      li.appendChild(checkbox);
      li.appendChild(label);
      taskList.appendChild(li);
    });
  }
}

resetBtn.addEventListener('click', () => {
  localStorage.removeItem(today);
  loadTasks(today);
});
