async function navigateTo(route) {
    console.log('navigating to ${route}');
    let url = route;
    if (route === '/') {
        url = '/index.html';
    }
    try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch ${url}: ${response.status}');
    }
    const html = await response.text();
    document.body.innerHTML = html;
    } catch (error) {
        console.error('Error:', error);
        document.body.innerHTML = 'An error occurred';
    }  
}
export { navigateTo };