function saveHabits() {
    const habits = [];
    document.querySelectorAll("#habit-list li").forEach(habit => {
        habits.push(habit.firstChild.textContent);
    });
    localStorage.setItem("habits", JSON.stringify(habits));
}

function loadHabits() {
    const savedHabits = JSON.parse(localStorage.getItem("habits"));
    if (savedHabits) {
        savedHabits.forEach(habit => addHabit(habit));
    }
}

function addHabit(habitText) {
    const habitInput = document.getElementById("habit-input");
    const habitList = document.getElementById("habit-list");
    const habitItem = document.createElement("li");

    habitItem.textContent = habitText || habitInput.value;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "حذف";
    deleteButton.onclick = () => {
        habitList.removeChild(habitItem);
        saveHabits();
    };

    habitItem.appendChild(deleteButton);
    habitList.appendChild(habitItem);
    habitInput.value = "";
    saveHabits();
}

loadHabits();