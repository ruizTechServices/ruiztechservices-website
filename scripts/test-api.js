// Native fetch is available in Node 18+

async function testAPIs() {
    const BASE_URL = 'http://localhost:3000';

    console.log('--- Testing /api/inference (OpenAI) ---');
    try {
        const res = await fetch(`${BASE_URL}/api/inference`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: 'Explain quantum computing in one sentence.' })
        });

        if (!res.ok) {
            const err = await res.text();
            console.error('Error:', res.status, err);
        } else {
            const data = await res.json();
            console.log('Success:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('Failed to connect:', error.message);
    }

    console.log('\n--- Testing /api/mistral ---');
    try {
        const res = await fetch(`${BASE_URL}/api/mistral`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: 'What is the capital of France?' })
        });

        if (!res.ok) {
            const err = await res.text();
            console.error('Error:', res.status, err);
        } else {
            const data = await res.json();
            console.log('Success:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('Failed to connect:', error.message);
    }
}

// Check for node version > 18 for native fetch, otherwise warn
const nodeVersion = parseInt(process.versions.node.split('.')[0]);
if (nodeVersion < 18) {
    console.warn('Warning: This script uses native fetch. Ensure you are running Node.js 18+');
}

testAPIs();
