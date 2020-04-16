import { MiddlewareFn } from 'type-graphql';
import { MyContext } from './MyContext';
import { verify } from 'jsonwebtoken';

// bearer 12742317378233

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization'];
  if (!authorization) {
    throw new Error('not auth');
  }
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch(err) {
    console.error(err);
    throw new Error('not auth');
  }
  return next();
}