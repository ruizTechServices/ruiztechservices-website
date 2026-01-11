const Stripe = require('stripe');

try {
    console.log("Attempting to initialize Stripe with empty string...");
    const stripe = new Stripe('', { typescript: true });
    console.log("Success (unexpected)");
} catch (error) {
    console.log("Caught error:", error.message);
}
