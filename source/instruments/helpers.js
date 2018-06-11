export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getIdTask (alphabet) {
  let randomInt;
  let randomId = '';
  for(var i=0; i < 3; i++) {
    randomInt = getRandomInt(alphabet.length);
    randomId += alphabet[randomInt].toLowerCase();
  }
  return randomId;
}

export function getTaskIndex (tasks, id) {
  let index = tasks.findIndex(task => task.id === id)
  if(index === -1) return;
    return index;
}
