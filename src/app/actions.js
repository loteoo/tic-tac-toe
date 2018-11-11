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

  nextGrid[y][x] = 'O'

  return {
    ...state,
    botThinking: true,
    grid: nextGrid
  }
}




const countInArray = (value, array) =>
  array.reduce((count, item) => (item === value ? count + 1 : count), 0)


const countInDiag = (value, grid, dir) => {
  let count = 0
  for (let y = 0; y < grid.length; y++) {

    let col = dir === 'toBottomRight' ? y : grid.length - y - 1

    if (grid[y][col] === value) {
      count++
    }
  }
  return count
}


const fillDiag = (value, grid, dir) => {
  let newGrid = grid
  
  for (let y = 0; y < grid.length; y++) {

    let col = dir === 'toBottomRight' ? y : grid.length - y - 1
    
    newGrid[y][col] = value
  }

  return newGrid
}



export const BotPlay = (state) => {

  let nextState = {
    ...state,
    botThinking: false
  }

  // ====================
  // Play winning plays
  // ====================

  // Check for rows win
  for (let y = 0; y < state.grid.length; y++) {
    let row = state.grid[y]
    if (countInArray('O', row) >= state.grid.length - 1 && row.includes(null)) {

      console.log('Row win')
      nextState.grid[y].fill('O')
      return nextState
    }
  }




  // Check for cols win
  for (let x = 0; x < 3; x++) {

    let col = state.grid.reduce((col, row) => (col.concat(row[x])), [])

    if (countInArray('O', col) >= state.grid.length - 1 && col.includes(null)) {

      console.log('Col win')
      nextState.grid.map(row => {
        row[x] = 'O'
        return row
      })

      return nextState
    }

  }


  

  // Diag 1 win
  if (countInDiag('O', state.grid, 'toBottomRight') >= state.grid.length - 1 && countInDiag(null, state.grid, 'toBottomRight') > 0) {

    console.log('Diag 1 win')

    // Fill diagonal
    nextState.grid = fillDiag('O', state.grid, 'toBottomRight')

    return nextState

  }

  // Diag 2 win
  if (countInDiag('O', state.grid, 'toTopRight') >= state.grid.length - 1 && countInDiag(null, state.grid, 'toTopRight') > 0) {

    console.log('Diag 2 win')

    // Fill diagonal
    nextState.grid = fillDiag('O', state.grid, 'toTopRight')

    return nextState

  }


  // ====================
  // Block opponent
  // ====================
  
  

  // Fork


  // Block player's fork


  // Center

  
  // Opposite corner


  // Empty corner

  
  // Empty side




  

  // Return state

  return nextState
}

