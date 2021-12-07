import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/style.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './app/context/StoreContext';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<StoreProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</StoreProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
