

const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");

const uri = "mongodb+srv://anulala:karanlala@twiller.y8jqn.mongodb.net/?retryWrites=true&w=majority&appName=twiller";

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const postcollection = client.db("database").collection("posts");
    const usercollection = client.db("database").collection("users");

    app.post("/register", async (req, res) => {
      try {
        const user = req.body;
        const result = await usercollection.insertOne(user);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get("/loggedinuser", async (req, res) => {
      try {
        const email = req.query.email;
        const user = await usercollection.find({ email: email }).toArray();
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Updated /post route with restrictions based on follow and friend count
    app.post("/post", async (req, res) => {
      try {
        const post = req.body;
        const email = post.email;
        const user = await usercollection.findOne({ email });

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const now = new Date();
        const hour = now.getHours();
        const minutes = now.getMinutes();

        const isTimeRestricted = hour === 10 && minutes >= 0 && minutes <= 30;

        const followCount = user.followCount || 0;
        const friendCount = user.friendCount || 0;

        // Logic for posting restrictions
        if (followCount < 2 && friendCount <= 10) {
          if (followCount === 0 && !isTimeRestricted) {
            return res.status(403).json({ error: "Posting allowed only between 10:00 AM to 10:30 AM IST" });
          }

          // Check if user has already posted within the allowed limits
          const postsToday = await postcollection.countDocuments({
            email,
            createdAt: {
              $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate())
            }
          });

          if (followCount < 2 && postsToday >= 2) {
            return res.status(403).json({ error: "You can only post twice a day." });
          }
        }

        // If all checks pass, allow posting
        post.createdAt = new Date();
        const result = await postcollection.insertOne(post);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get("/post", async (req, res) => {
      try {
        const posts = (await postcollection.find().toArray()).reverse();
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get("/userpost", async (req, res) => {
      try {
        const email = req.query.email;
        const posts = (
          await postcollection.find({ email: email }).toArray()
        ).reverse();
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get("/user", async (req, res) => {
      try {
        const users = await usercollection.find().toArray();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.patch("/userupdate/:email", async (req, res) => {
      try {
        const { email } = req.params;
        const profile = req.body;
        const options = { upsert: true };
        const updateDoc = { $set: profile };
        const result = await usercollection.updateOne({ email }, updateDoc, options);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Twiller is working");
});

app.listen(port, () => {
  console.log(`Twiller clone is working on port ${port}`);
});


