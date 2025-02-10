const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const usersRouter = require('./server/src/routes/users.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

app.use(bodyParser.json());
app.use(express.static('./'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

app.use('/api/users', usersRouter);

app.get('/api/books', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q,
        key: GOOGLE_BOOKS_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});