import { connectToDatabase } from 'lib/mongodb';
import { ObjectId } from 'mongodb';

const table = 'posts';

async function getPosts(req, res) {
  try {
    let { db } = await connectToDatabase();
    let data = await db
      .collection(table)
      .find({})
      .sort({ published: -1 })
      .toArray();

    return res.json({
      data,
      message: 'Get data successfully',
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function addPost(req, res) {
  try {
    let { db } = await connectToDatabase();
    await db.collection(table).insertOne(JSON.parse(req.body));
    return res.json({
      message: 'Post added successfully',
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function updatePost(req, res) {
  try {
    let { db } = await connectToDatabase();

    await db.collection(table).updateOne(
      {
        _id: new ObjectId(req.body),
      },
      { $set: { published: true } }
    );

    return res.json({
      message: 'Post updated successfully',
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function deletePost(req, res) {
  try {
    let { db } = await connectToDatabase();
    let reqBody = req.body;
    reqBody = JSON.parse(reqBody);

    if (Array.isArray(reqBody)) {
      const idList = reqBody.map(id => ObjectId(id));
      await db.collection(table).deleteMany({
        _id: {
          $in: idList
        }
      });
    } else {
      await db.collection(table).deleteOne({
        _id: ObjectId(reqBody.id),
      });
    }

    return res.json({
      message: 'Post deleted successfully',
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      return getPosts(req, res);
    }

    case 'POST': {
      return addPost(req, res);
    }

    case 'PUT': {
      return updatePost(req, res);
    }

    case 'DELETE': {
      return deletePost(req, res);
    }
  }
}