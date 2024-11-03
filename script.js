// حفظ العادات في localStorage
function saveHabits() {
    const habits = [];
    document.querySelectorAll("#habit-list li").forEach(habit => {
        const habitData = {
            text: habit.firstChild.textContent,
            completed: habit.classList.contains("completed")
        };
        habits.push(habitData);
    });
    localStorage.setItem("habits", JSON.stringify(habits));
}

// تحميل العادات من localStorage
function loadHabits() {
    const savedHabits = JSON.parse(localStorage.getItem("habits"));
    if (savedHabits) {
        savedHabits.forEach(habit => addHabit(habit.text, habit.completed));
    }
}

// إضافة عادة جديدة إلى القائمة
function addHabit(habitText, completed = false) {
    const habitInput = document.getElementById("habit-input");
    const habitList = document.getElementById("habit-list");
    const habitItem = document.createElement("li");

    habitItem.textContent = habitText || habitInput.value;
    if (completed) habitItem.classList.add("completed");

    // زر "تم" لتحديد إنجاز العادة
    const completeButton = document.createElement("button");
    completeButton.textContent = "✔";
    completeButton.className = "complete-button";
    completeButton.onclick = () => {
        habitItem.classList.toggle("completed");
        saveHabits();
    };

    // زر حذف العادة
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "حذف";
    deleteButton.className = "delete-button";
    deleteButton.onclick = () => {
        habitList.removeChild(habitItem);
        saveHabits();
    };

    habitItem.appendChild(completeButton);
    habitItem.appendChild(deleteButton);
    habitList.appendChild(habitItem);
    habitInput.value = "";
    saveHabits();
}

// إضافة النصائح المتنوعة
function loadTips() {
    const tips = [
        "حدد أولوياتك اليومية وضع المهام الأهم في الصدارة.",
        "قم بتقسيم المهام الكبيرة إلى مهام صغيرة قابلة للإنجاز.",
        "خذ فترات راحة بين المهام الطويلة لتحسين التركيز.",
        "استخدم تقنية الطماطم: اعمل لمدة 25 دقيقة وخذ راحة قصيرة.",
        "تأكد من الاستفادة القصوى من الوقت باستخدام التطبيقات التنظيمية."
    ];

    const tipsList = document.getElementById("tips-list");
    tips.forEach(tip => {
        const tipItem = document.createElement("li");
        tipItem.textContent = tip;
        tipsList.appendChild(tipItem);
    });
}

loadHabits();
loadTips();