# Backend development examples

Selected, standalone backend examples adapted from coursework. Each example has been reviewed and rewritten for clarity and safer configuration.

## Tools and local setup

These exercises were created using **Visual Studio Code**. To recreate and run them, you will generally need:

- Visual Studio Code;
- Node.js and npm;
- a terminal integrated into VS Code or another command-line terminal;
- MongoDB or MongoDB Atlas for the examples that connect to a database (Examples 4 and 5 use an in-memory test database);
- Postman or another API client to send requests to the REST API and authentication routes (recommended for Examples 2 and 3).

Create a separate local project folder for each exercise and add the source files shown below to the matching folders. You must also create your own `package.json` with the dependencies and scripts required by that exercise, install them with npm, and create any required local configuration files yourself. For database-backed examples, configure your own `MONGODB_URI`; the session-authentication example also requires your own strong `SESSION_SECRET`. Add a local `.gitignore` so that `.env`, `node_modules` and other private or generated files are not committed.

**Configuration files are intentionally not included in this portfolio.** The examples show the relevant application and test source code only. Do not copy credentials from public examples or place real secrets in source files. Use your own local values and keep them out of version control.

### Suggested workflow

1. Open the exercise folder in Visual Studio Code.
2. Create the project metadata file (`package.json`) and install the packages listed for that example.
3. Create any required local environment/configuration files using your own settings; do not publish them.
4. Add the source files shown in the example, preserving the folder structure.
5. Start the application or run the tests using the scripts you defined in your own project.

---

## Example 1 — MongoDB and Mongoose album model

**Concepts:** Mongoose schemas, required fields, validation, environment-based configuration and asynchronous database operations.

**To run it:** Create your own `package.json` and install `mongoose` and `dotenv`. Create a local `.env` containing your own `MONGODB_URI`, and make sure a MongoDB database is available. The `.env` file and package metadata are not included here.

### `models/Album.js`

```javascript
const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  artist: { type: String, required: true, trim: true },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear(),
  },
  tracks: { type: Number, min: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);
```



### `index.js`

```javascript
require('dotenv').config();
const mongoose = require('mongoose');
const Album = require('./models/Album');

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured.');
  }

  await mongoose.connect(process.env.MONGODB_URI);

  try {
    const album = await Album.create({
      title: 'Example Album',
      artist: 'Example Artist',
      year: 2022,
      tracks: 10,
    });

    console.log('Created album:', album.title);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((error) => {
  console.error('Application error:', error.message);
  process.exitCode = 1;
});
```

Install dependencies with `npm install mongoose dotenv`, then run `node index.js` after creating your own local `.env` file.

---

## Example 2 — REST API CRUD for albums

**Concepts:** Express routers, REST endpoints, input validation, filtering, sorting, pagination and Mongoose operations. This example uses the Album model from Example 1.

**To run it:** Create your own `package.json`, install `express`, `mongoose` and the packages needed for your database connection, and create a local environment file with your own `MONGODB_URI`. Add a server entry point that connects to MongoDB and starts the Express app. Use Postman or a similar API client to test the endpoints. Keep the local configuration and server setup out of the public portfolio.

### `controllers/albumsController.js`

```javascript
const Album = require('../models/Album');

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

exports.getAlbums = async (req, res, next) => {
  try {
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 10, 1), 100);
    const filter = {};

    if (req.query.year) {
      const year = Number(req.query.year);
      if (!Number.isInteger(year)) {
        return res.status(400).json({ message: 'Year must be a number.' });
      }
      filter.year = year;
    }

    if (req.query.search) {
      const pattern = new RegExp(escapeRegex(String(req.query.search)), 'i');
      filter.$or = [{ title: pattern }, { artist: pattern }];
    }

    const allowedSortFields = ['title', 'artist', 'year', 'createdAt'];
    const sortField = allowedSortFields.includes(req.query.sort)
      ? req.query.sort
      : 'title';
    const sortOrder = req.query.order === 'desc' ? -1 : 1;

    const [albums, total] = await Promise.all([
      Album.find(filter)
        .sort({ [sortField]: sortOrder })
        .select('title artist year tracks')
        .skip((page - 1) * limit)
        .limit(limit),
      Album.countDocuments(filter),
    ]);

    res.status(200).json({
      data: albums,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAlbum = async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: 'Album not found.' });
    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};

exports.createAlbum = async (req, res, next) => {
  try {
    const { title, artist, year, tracks } = req.body;
    if (!title || !artist || year === undefined) {
      return res.status(400).json({ message: 'Title, artist and year are required.' });
    }
    const album = await Album.create({ title, artist, year, tracks });
    res.status(201).json(album);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid album data.' });
    }
    next(error);
  }
};

exports.updateAlbum = async (req, res, next) => {
  try {
    const allowedFields = ['title', 'artist', 'year', 'tracks'];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    );

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided.' });
    }

    const album = await Album.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!album) return res.status(404).json({ message: 'Album not found.' });
    res.status(200).json(album);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid album data.' });
    }
    next(error);
  }
};

exports.deleteAlbum = async (req, res, next) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) return res.status(404).json({ message: 'Album not found.' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
```

### `routes/albums.js`

```javascript
const express = require('express');
const controller = require('../controllers/albumsController');

const router = express.Router();

router.route('/')
  .get(controller.getAlbums)
  .post(controller.createAlbum);

router.route('/:id')
  .get(controller.getAlbum)
  .patch(controller.updateAlbum)
  .delete(controller.deleteAlbum);

module.exports = router;
```

### `app.js`

```javascript
const express = require('express');
const albumRoutes = require('./routes/albums');

const app = express();
app.use(express.json({ limit: '20kb' }));
app.use('/api/albums', albumRoutes);

app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(500).json({ message: 'Internal server error.' });
});

module.exports = app;
```

This API is an educational example. A production deployment also needs authentication and authorization where appropriate, rate limiting, monitoring and deployment-specific security configuration.

---

## Example 3 — User registration and session-based authentication

**Concepts:** password hashing, Passport Local Strategy, session storage, protected routes and environment variables.

**To run it:** Create your own `package.json` and install `express`, `mongoose`, `dotenv`, `express-session`, `connect-mongo`, `passport`, `passport-local`, `bcrypt` and `helmet`. Create a local `.env` with your own `MONGODB_URI`, a randomly generated `SESSION_SECRET`, and any optional port/environment settings. Add your own server start command and test registration, login, the protected `/auth/me` route and logout with Postman or another API client. The local environment file and package metadata are deliberately not published.

### `models/User.js`

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
    match: /^[a-z0-9_]+$/,
  },
  passwordHash: { type: String, required: true, select: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

### `config/passport.js`

```javascript
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

passport.use(new LocalStrategy(
  { usernameField: 'username' },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username.toLowerCase() })
        .select('+passwordHash');

      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return done(null, false, { message: 'Invalid username or password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user || false);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
```

### `controllers/authController.js`

```javascript
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const { username, password, passwordConfirmation } = req.body;

    if (typeof username !== 'string' ||
        typeof password !== 'string' ||
        typeof passwordConfirmation !== 'string') {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const normalizedUsername = username.trim().toLowerCase();

    if (!/^[a-z0-9_]{3,30}$/.test(normalizedUsername)) {
      return res.status(400).json({ message: 'Invalid username.' });
    }

    if (password !== passwordConfirmation) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    if (password.length < 12 || Buffer.byteLength(password, 'utf8') > 72) {
      return res.status(400).json({ message: 'Password does not meet the length requirements.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      username: normalizedUsername,
      passwordHash,
    });

    res.status(201).json({
      id: user.id,
      username: user.username,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Username is already taken.' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid registration data.' });
    }
    next(error);
  }
};

exports.login = (req, res, next) => {
  const passport = require('../config/passport');

  passport.authenticate('local', (error, user) => {
    if (error) return next(error);
    if (!user) return res.status(401).json({ message: 'Invalid username or password.' });

    req.logIn(user, (loginError) => {
      if (loginError) return next(loginError);
      res.status(200).json({ id: user.id, username: user.username });
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);

    req.session.destroy((sessionError) => {
      if (sessionError) return next(sessionError);
      res.clearCookie('connect.sid', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
      res.status(204).send();
    });
  });
};
```

### `middleware/authMiddleware.js`

```javascript
module.exports = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Authentication required.' });
};
```

### `routes/auth.js`

```javascript
const express = require('express');
const passport = require('../config/passport');
const controller = require('../controllers/authController');
const requireAuthentication = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/logout', requireAuthentication, controller.logout);
router.get('/me', requireAuthentication, (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
});

module.exports = router;
```


The Express application must connect to MongoDB, configure a persistent session store, set secure cookie options, initialize Passport and mount the authentication router. Use a strong, randomly generated session secret in your local environment. Do not use the placeholder as a real secret. Browser-based deployments also need appropriate CSRF protection and login rate limiting.


### `app.js`

```javascript
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const helmet = require('helmet');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(helmet());
app.use(express.json({ limit: '10kb' }));

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not configured.');
}

app.use(session({
  name: 'connect.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60,
  },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(500).json({ message: 'Internal server error.' });
});

async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured.');
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Authentication example listening on port ${port}.`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Could not start the application:', error.message);
    process.exit(1);
  });
}

module.exports = app;
```



Install the dependencies with `npm install`. Create a local `.env` file from `.env.example`, enter your own MongoDB connection string and generate a strong random session secret. Passport's login operation regenerates the session before establishing the authenticated session. For a browser-facing production application, also add CSRF protection and login/register rate limiting.

---

## Example 4 — Automated test for GET /api/albums

**Concepts:** Jest, Supertest, Mongoose and isolated in-memory database testing.

**To run it:** Create your own `package.json`; install `express` and `mongoose` as application dependencies, and `jest`, `supertest` and `mongodb-memory-server` as development dependencies. Add a test script that runs Jest. No MongoDB account or `.env` file is required for this isolated test because MongoDB Memory Server creates a temporary database for the test run.

### `models/Album.js`

```javascript
const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  artist: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
});

module.exports = mongoose.model('Album', albumSchema);
```

### `app.js`

```javascript
const express = require('express');
const Album = require('./models/Album');

const app = express();
app.use(express.json());

app.get('/api/albums', async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    console.error('Error retrieving albums:', error.message);
    res.status(500).json({ message: 'Could not retrieve albums.' });
  }
});

module.exports = app;
```

### `tests/albums.test.js`

```javascript
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Album = require('../models/Album');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

beforeEach(async () => {
  await Album.deleteMany({});
  await Album.insertMany([
    { title: 'Example Album One', artist: 'Example Artist One', year: 2020 },
    { title: 'Example Album Two', artist: 'Example Artist Two', year: 2022 },
  ]);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('GET /api/albums', () => {
  it('returns the exact number of albums in the test database', async () => {
    const response = await request(app).get('/api/albums');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
```


Run `npm install` and then `npm test`. The test creates its own temporary database and does not connect to a production database.

---

---

## Example 5 — Automated test for POST /api/albums

**Concepts:** Express POST routes, request validation, Mongoose model validation, HTTP status codes and automated API testing.

**To run it:** Create your own `package.json`; install `express` and `mongoose` as application dependencies, and `jest`, `supertest` and `mongodb-memory-server` as development dependencies. Add a Jest test script. This test uses an in-memory MongoDB instance, so it does not require a separate MongoDB account or a `.env` file.

### `models/Album.js`

```javascript
const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  artist: { type: String, required: true, trim: true },
  year: { type: Number, required: true, min: 1900, max: new Date().getFullYear() },
}, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);
```

### `app.js`

```javascript
const express = require('express');
const Album = require('./models/Album');

const app = express();
app.use(express.json({ limit: '20kb' }));

app.post('/api/albums', async (req, res) => {
  try {
    const { title, artist, year } = req.body || {};
    if (
      typeof title !== 'string' || !title.trim() ||
      typeof artist !== 'string' || !artist.trim() ||
      year === undefined
    ) {
      return res.status(400).json({ message: 'Title, artist and year are required.' });
    }
    const album = await Album.create({ title: title.trim(), artist: artist.trim(), year });
    return res.status(201).json(album);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid album data.' });
    }
    console.error('Error creating album:', error.message);
    return res.status(500).json({ message: 'Could not create album.' });
  }
});

module.exports = app;
```

### `tests/albums.test.js`

```javascript
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Album = require('../models/Album');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

beforeEach(async () => {
  await Album.deleteMany({});
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe('POST /api/albums', () => {
  it('creates an album and returns status 201', async () => {
    const response = await request(app)
      .post('/api/albums')
      .send({ title: 'Example Album', artist: 'Example Artist', year: 2022 });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Example Album');
    expect(await Album.countDocuments()).toBe(1);
  });

  it('rejects a request with missing fields', async () => {
    const response = await request(app)
      .post('/api/albums')
      .send({ title: 'Example Album' });
    expect(response.status).toBe(400);
    expect(await Album.countDocuments()).toBe(0);
  });

  it('rejects an invalid year value', async () => {
    const response = await request(app)
      .post('/api/albums')
      .send({
        title: 'Example Album',
        artist: 'Example Artist',
        year: 'not-a-year',
      });
    expect(response.status).toBe(400);
    expect(await Album.countDocuments()).toBe(0);
  });
});
```
## Notes

These examples are intended for learning and portfolio review. They demonstrate selected backend development practices, not complete production-ready systems. The portfolio contains selected source files only; create your own project configuration and dependency files locally. Review authentication, authorization, CSRF protection, rate limiting, logging, input validation and deployment security before using similar code in a real service.
