import { createStore } from 'redux';
import { Provider } from 'react-redux'

const store = createStore()

const myAuthStore = () => {
    <Provider store={store}>
    </Provider>
}
