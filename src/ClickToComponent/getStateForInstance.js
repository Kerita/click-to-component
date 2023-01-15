export default function getStateForInstance(instance) {
  /**
   * @type {Fiber['memoizedState']}
   */
  const state = {};
  const { tag } = instance;
  // Function component
  if (tag === 0) {
    let count = 0;
    let queue = instance.memoizedState;

    while (queue) {
      state[`Hook State${count}`] = queue.baseState;
      queue = queue.next;
      count++;
    }
  }

  // Class Component
  if (tag === 1) {
    return instance.memoizedState;
  }

  return state;
}
