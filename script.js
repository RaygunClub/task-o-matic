const tasksPerDay = {
  Sunday: ["Read something relaxing", "Call mom", "Make pancakes"],
  Monday: ["Workout: Yoga", "Chore: Clean microwave", "Personal: Set weekly goals"],
  Tuesday: ["Tidy up desk", "30 min walk", "Water the plants"],
  Wednesday: ["Laundry day", "Midweek stretch", "Fix that squeaky drawer"],
  Thursday: ["Declutter 3 items", "Clean fridge", "Inbox zero attempt"],
  Friday: ["Fun creative task", "Clear out browser tabs", "Dance break"],
  Saturday: ["Chores blitz", "Take out trash", "Plan next week"]
};

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
document.getElementById('dayTitle').textContent = `${today}'s Tasks`;

const taskList = document.getElementById('taskList');
const savedState = JSON.parse(localStorage.getItem(today)) || {};

tasksPerDay[today].forEach(task => {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = savedState[task] || false;

  checkbox.addEventListener('change', () => {
    savedState[task] = checkbox.checked;
    localStorage.setItem(today, JSON.stringify(savedState));
  });

  const label = document.createElement('label');
  label.textContent = task;

  li.appendChild(checkbox);
  li.appendChild(label);
  taskList.appendChild(li);
});
