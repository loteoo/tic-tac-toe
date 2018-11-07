// Bundle css for this view
import 'sanitize.css'
import './style.css'

import {h} from 'hyperapp'

// Import actions
import {Play, PickSymbol} from './actions'

// Root view
export const view = state => (
  <div class="app">
    <header>
      <div class="container">
        <h1>test</h1>
      </div>
    </header>
    <main>
      <div class="container">

        <button onclick={[PickSymbol, 'X']}>X</button>
        <button onclick={[PickSymbol, 'O']}>O</button>

        <div class="grid">
          {state.grid.map((row, y) => (
            <div class="row">
              {row.map((col, x) => (
                <div class="col" onclick={!col ? [Play, {x, y, symbol: state.playerSymbol}] : null}>
                  {col}
                </div>
              ))}
            </div>
          ))}
        </div>

        <h4>State: </h4>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </main>
  </div>
)
