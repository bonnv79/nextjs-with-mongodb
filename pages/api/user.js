import { connectToDatabase } from 'lib/mongodb'
// const ObjectId = require('mongodb').ObjectId;

async function getPosts(req, res) {
  try {
    let { db } = await connectToDatabase();
    let data = await db
      .collection('users')
      .find({})
      .sort({ published: -1 })
      .toArray();

    return res.json({
      data: JSON.parse(JSON.stringify(data)),
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

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getPosts(req, res);
    }

    // case 'POST': {
    //   return addPost(req, res);
    // }

    // case 'PUT': {
    //   return updatePost(req, res);
    // }

    // case 'DELETE': {
    //   return deletePost(req, res);
    // }
  }
}