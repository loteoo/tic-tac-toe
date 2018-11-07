import {init} from './init'

// ==================
// Global actions 
// ==================

export const PickSymbol = (state, symbol) => ({
  ...state,
  symbol
})

export const ResetGrid = (state) => ({
  ...state,
  grid: init.grid
})

export const Play = (state, {x, y, symbol}) => ({
  ...state,
  botThinking: true,
  grid: state.grid.map(
    (row, yPos) => 
      yPos === y 
        ? row.map(
            (col, xPos) => 
              xPos === x
                ? symbol
                : col
          )
        : row
  )
})

export const BotPlay = (state) => {

  let nextState = {
    ...state,
    botThinking: false
  }

  // Check for wins


  // Check for blocks


  // Fork


  // Block player's fork


  // Center

  
  // Opposite corner


  // Empty corner

  
  // Empty side




  // Apply the bot's play to the state
  nextState = Play(nextState, botNextPlay)

  // Return state
  return nextState
}

