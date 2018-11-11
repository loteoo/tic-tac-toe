import {init} from './init'


// ==================
// Global actions 
// ==================


export const ResetGrid = (state) => ({
  ...state,
  grid: init.grid
})

export const Play = (state, {x, y}) => {

  let nextGrid = state.grid

  nextGrid[y][x] = 'X'

  return {
    ...state,
    botThinking: true,
    grid: nextGrid
  }
}




const countInRow = (value, row, grid) => 
  grid[row].reduce((count, item) => (item === value ? count + 1 : count), 0)

const fillRow = (value, row, grid) => {
  let newGrid = grid
  newGrid[row] = newGrid[row].map(col => col === null ? value : col)
  return newGrid
}



const countInCol = (value, col, grid) => 
  grid.reduce((count, row) => (row[col] === value ? count + 1 : count), 0)

const fillCol = (value, col, grid) => {
  let newGrid = grid
  for (let y = 0; y < grid.length; y++) {
    if (grid[y][col] === null) {
      newGrid[y][col] = value
    }
  }
  return newGrid
}




const countInDiag = (value, dir, grid) => {
  let count = 0
  for (let y = 0; y < grid.length; y++) {

    let col = dir === 'toBottomRight' ? y : grid.length - y - 1

    if (grid[y][col] === value) {
      count++
    }
  }
  return count
}

const fillDiag = (value, dir, grid) => {
  let newGrid = grid
  
  for (let y = 0; y < grid.length; y++) {

    let col = dir === 'toBottomRight' ? y : grid.length - y - 1
    
    if (newGrid[y][col] === null) {
      newGrid[y][col] = value
    }
  }

  return newGrid
}



export const BotPlay = (state) => {

  let nextState = {
    ...state,
    botThinking: false
  }




  // ====================
  // Play winning moves
  // ====================

  // Check for rows win
  for (let y = 0; y < state.grid.length; y++) {

    if (
      countInRow('O', y, state.grid) >= state.grid.length - 1 
      && countInRow(null, y, state.grid) > 0
    ) {
      console.log('Row win')
      nextState.grid = fillRow('O', y, state.grid)
      return nextState
    }

  }




  // Check for cols win
  for (let x = 0; x < state.grid[0].length; x++) {

    if (
      countInCol('O', x, state.grid) >= state.grid.length - 1 
      && countInCol(null, x, state.grid) > 0
    ) {
      console.log('Col win')
      nextState.grid = fillCol('O', x, state.grid)
      return nextState
    }
    
  }




  // Diag 1 win
  if (countInDiag('O', 'toBottomRight', state.grid) >= state.grid.length - 1 && countInDiag(null, 'toBottomRight', state.grid) > 0) {

    console.log('Diag 1 win')

    // Fill diagonal
    nextState.grid = fillDiag('O', 'toBottomRight', state.grid)

    return nextState

  }

  // Diag 2 win
  if (countInDiag('O', 'toTopRight', state.grid) >= state.grid.length - 1 && countInDiag(null, 'toTopRight', state.grid) > 0) {

    console.log('Diag 2 win')

    // Fill diagonal
    nextState.grid = fillDiag('O', 'toTopRight', state.grid)

    return nextState

  }






  // ====================
  // Block opponent
  // ====================

  // Check for rows win
  for (let y = 0; y < state.grid.length; y++) {

    if (
      countInRow('X', y, state.grid) >= state.grid.length - 1 
      && countInRow(null, y, state.grid) > 0
    ) {
      console.log('Row block')
      nextState.grid = fillRow('O', y, state.grid)
      return nextState
    }

  }




  // Check for cols win
  for (let x = 0; x < state.grid[0].length; x++) {

    if (
      countInCol('X', x, state.grid) >= state.grid.length - 1 
      && countInCol(null, x, state.grid) > 0
    ) {
      console.log('Col block')
      nextState.grid = fillCol('O', x, state.grid)
      return nextState
    }
    
  }




  // Diag 1 win
  if (countInDiag('X', 'toBottomRight', state.grid) >= state.grid.length - 1 && countInDiag(null, 'toBottomRight', state.grid) > 0) {

    console.log('Diag 1 block')

    // Fill diagonal
    nextState.grid = fillDiag('O', 'toBottomRight', state.grid)

    return nextState

  }

  // Diag 2 win
  if (countInDiag('X', 'toTopRight', state.grid) >= state.grid.length - 1 && countInDiag(null, 'toTopRight', state.grid) > 0) {

    console.log('Diag 2 block')

    // Fill diagonal
    nextState.grid = fillDiag('O', 'toTopRight', state.grid)

    return nextState

  }










  // Fork


  // Block player's fork


  // Center

  
  // Opposite corner


  // Empty corner

  
  // Empty side




  

  // Return state

  return nextState
}

