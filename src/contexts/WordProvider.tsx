import { createContext, useReducer } from 'react'

// #region Types
interface IWordProviderProps {
  children: JSX.Element | JSX.Element[]
}

interface IWordContextState {
  word?: string
  meaning?: string
}

type IWordContextAction =
  | {
      type: 'set-word'
      word: string
    }
  | {
      type: 'set-meaning'
      meaning: string
    }
  | {
      type: 'clear'
    }
// #endregion

// #region Context definitions
export const WordContext = createContext({} as IWordContextState)
export const WordContextDispatch = createContext(
  {} as React.Dispatch<IWordContextAction>,
)
// #endregion

// #region Provider definitions
export function WordProvider({ children }: Readonly<IWordProviderProps>) {
  const initialState: IWordContextState = {}
  const [state, dispatch] = useReducer(wordReducer, initialState)

  return (
    <WordContext.Provider value={state}>
      <WordContextDispatch.Provider value={dispatch}>
        {children}
      </WordContextDispatch.Provider>
    </WordContext.Provider>
  )
}
// #endregion

// #region Reducer definitions
function wordReducer(
  state: IWordContextState,
  action: IWordContextAction,
): IWordContextState {
  switch (action.type) {
    case 'set-word': {
      return {
        ...state,
        word: action.word,
      }
    }
    case 'set-meaning': {
      return {
        ...state,
        meaning: action.meaning,
      }
    }
    case 'clear': {
      return {
        ...state,
        word: undefined,
        meaning: undefined,
      }
    }
    default: {
      return state
    }
  }
}
// #endregion
