export function Hello(app) {
    app.get('/api', (req, res) => {
        res.send('Hello World!')
    });
}