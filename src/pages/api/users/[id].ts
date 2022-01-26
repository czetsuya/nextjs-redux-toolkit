import {PrismaClient} from '@prisma/client';
import moment from 'moment';
import {NextApiRequest, NextApiResponse} from "next";
import {UserPayload} from "../../../services/types/UserPayload";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Partial<UserPayload>>
) {
  console.log('start request: req params', req.query, req.body);

  const prisma = new PrismaClient();

  if (req.method === 'GET') {
    const {id}: { id: string } = req.query;
    const result = await prisma.user.findUnique({
      where: {id: parseInt(id, 10)},
    });
    res.status(200).json(result);

  } else if (req.method === 'DELETE') {
    const {id}: { id: string } = req.query;
    const result = await prisma.user.delete({
      where: {id: parseInt(id, 10)},
    });
    res.status(200).json(result);

  } else if (req.method === 'PUT') {
    const {id}: { id: string } = req.query;
    const user: UserPayload = req.body;
    if (!!user.birthDate) {
      user.birthDate = moment.utc(user.birthDate).toDate();
    }
    const result = await prisma.user.update({
      data: {
        ...user,
      },
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(result);

  } else {
    res.status(405).json({error: 'Invalid method.'});
  }

  console.log("end request");
}
