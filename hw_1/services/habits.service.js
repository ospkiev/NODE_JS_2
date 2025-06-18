import * as model from '../models/habits.model.js';

export function addHabit(name) {
  const habits = model.readHabits();
  const newHabit = {
    id: Date.now().toString(),
    name,
    done: false
  };
  habits.push(newHabit);
  model.writeHabits(habits);
  console.log('Звичку додано!');
}

export function listHabits() {
  return model.readHabits();
}

export function markHabitDone(id) {
  const habits = model.readHabits();
  const habit = habits.find(h => h.id === id);
  if (habit) {
    habit.done = true;
    model.writeHabits(habits);
    console.log('Позначено як виконану');
  } else {
    console.log('Не знайдено');
  }
}

export function deleteHabit(id) {
  let habits = model.readHabits();
  const initialLength = habits.length;
  habits = habits.filter(h => h.id !== id);
  model.writeHabits(habits);
  if (habits.length < initialLength) {
    console.log('Видалено');
  } else {
    console.log('Не знайдено');
  }
}

export function updateHabit(id, newName) {
  const habits = model.readHabits();
  const habit = habits.find(h => h.id === id);
  if (habit) {
    habit.name = newName;
    model.writeHabits(habits);
    console.log('Оновлено');
  } else {
    console.log('Не знайдено');
  }
}

export function statsHabits() {
  const habits = model.readHabits();
  const total = habits.length;
  const doneCount = habits.filter(h => h.done).length;
  if (total === 0) {
    console.log('Немає звичок у списку.');
  } else {
    const percent = ((doneCount / total) * 100).toFixed(2);
    console.log(`✅ Виконано ${doneCount} з ${total} (${percent}%)`);
  }
}
