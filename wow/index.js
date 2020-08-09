let express = require('express');
app = express();
const config = require('./Service/configure');
app = config(app);
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});

