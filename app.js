const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  birthDate: { type: String, required: true },
  image: { type: String }
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

// GET /users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /users/:nameSurname
app.get('/users/:nameSurname', async (req, res) => {
  const nameSurname = req.params.nameSurname.toLowerCase();

  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: nameSurname, $options: 'i' } },
        { lastName: { $regex: nameSurname, $options: 'i' } }
      ]
    });

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /users
app.post('/users', async (req, res) => {
  const { firstName, lastName, gender, birthDate, image } = req.body;
  if (!firstName || !lastName || !gender || !birthDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const user = new User({ firstName, lastName, gender, birthDate, image });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /users/:id
app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, gender, birthDate, image } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.gender = gender || user.gender;
    user.birthDate = birthDate || user.birthDate;
    user.image = image || user.image;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});