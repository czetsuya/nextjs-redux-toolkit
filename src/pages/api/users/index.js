import {PrismaClient} from '@prisma/client';
import moment from 'moment';

export default async function handle(req, res) {

  console.log('req params', req.query);

  const prisma = new PrismaClient();

  try {
    if (req.method === 'GET') { // list
      const {offset = "0", limit = "10"} = req.query;
      const users = await prisma.user.findMany({
        skip: parseInt(offset, 10),
        take: parseInt(limit, 10),
      });
      const count = await prisma.user.count();
      res.status(200).json({users, count});

    } else if (req.method === 'POST') { // create
      const user = req.body;
      console.log("received data", user);
      if (!!user.birthDate) {
        user.birthDate = moment.utc(user.birthDate).toDate();
      }
      console.log("posted data", user);
      const result = await prisma.user.create({
        data: {
          ...user,
        },
      });
      res.status(200).json(result);

    } else {
      res.status(405).json({error: 'Invalid method.'});
    }

  } catch (error) {
    res.status(500).json(error);
  }
}
