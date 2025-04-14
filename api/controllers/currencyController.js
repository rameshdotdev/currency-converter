

import fetchCurrencyData from '../utils/fetchCurrencyData.js';

export const getCurrentCurrency = async (req, res) => {
	try {
		const { from = 'USD', to = 'INR', amount = 1 } = req.query;

		const fromCurrency = from.toUpperCase();
		const toCurrency = to.toUpperCase();
		const parsedAmount = parseFloat(amount);

		if (isNaN(parsedAmount) || parsedAmount <= 0) {
			return res.status(400).json({ error: `'amount' must be a positive number.` });
		}

		const result = await fetchCurrencyData(fromCurrency, toCurrency);

		if (!result.success || !result.rates) {
			return res.status(500).json({ error: result.error || 'Failed to fetch rates.' });
		}

		const rateStr = result.rates[toCurrency];
		if (!rateStr) {
			return res.status(400).json({ error: `Currency '${toCurrency}' not supported.` });
		}

		const rate = parseFloat(rateStr);
		const converted = +(rate * parsedAmount).toFixed(4); // Rounded to 4 decimal places

		return res.json({
			from: fromCurrency,
			to: toCurrency,
			rate,
			amount: parsedAmount,
			converted,
		});
	} catch (err) {
		console.error('Currency conversion error:', err.message);
		res.status(500).json({ message: err.message });
	}
};
