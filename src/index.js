import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';

// AUTH0 DOMAIN: dev-curv38mdp3p3yehx.eu.auth0.com
// AUTH0 CLIENT_ID: JTxoVgasHbWUZU8XjZja3lVSsxfOx6Qj

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Auth0Provider
		domain={process.env.REACT_APP_AUTH_DOMAIN}
		clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
		authorizationParams={{
			redirect_uri: window.location.origin,
		}}>
		<UserProvider>
			<ProductsProvider>
				<FilterProvider>
					<CartProvider>
						<App />
					</CartProvider>
				</FilterProvider>
			</ProductsProvider>
		</UserProvider>
	</Auth0Provider>
);
