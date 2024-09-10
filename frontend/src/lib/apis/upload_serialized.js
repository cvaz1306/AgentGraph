export function uploadSerializedGraph(object) {
    console.log("THinghy")
    // Update the URL to point to the correct API endpoint
    return fetch('http://localhost:9394/serialized', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: JSON.stringify(object) }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    });
}
