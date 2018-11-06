// ==================
// Global actions 
// ==================

export const PickSymbol = (state, symbol) => ({
  ...state,
  symbol
})

export const Play = (state, {x, y}) => ({
  ...state,
  grid: state.grid.map(
    (row, yPos) => 
      yPos === y 
        ? row.map(
          (col, xPos) => 
            xPos === x
              ? state.symbol
              : col
          )
        : row
  )
})

export const BotPlay = (state) => ({
  ...state,
  grid: state.grid.map(row => row)
})

