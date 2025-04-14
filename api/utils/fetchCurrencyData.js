import fetch from 'node-fetch';

async function fetchCurrencyData(from = 'USD', to = 'INR') {
	// Allow 'to' to be a string or an array
	if (!from || !to) {
		throw new Error('Both "from" and "to" currencies are required.');
	}

	const toSymbols = Array.isArray(to) ? to.join(',') : to;

	// Simple regex for comma-separated 3-letter codes
	if (!/^[A-Z]{3}(,[A-Z]{3})*$/.test(toSymbols)) {
		throw new Error('The "to" currency/currencies must be 3-letter ISO codes.');
	}

	if (toSymbols.split(',').includes(from)) {
		throw new Error('"from" and "to" currencies must be different.');
	}

	try {
		const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${toSymbols}`);

		if (!response.ok) {
			const text = await response.text();
			throw new Error(`HTTP ${response.status} - ${text}`);
		}

		const data = await response.json();

		return {
			success: true,
			base: data.base,
			rates: data.rates,
		};
	} catch (error) {
		console.error(`Error fetching currency data for ${from}:`, error.message);
		return {
			success: false,
			error: error.message,
		};
	}
}

export default fetchCurrencyData;