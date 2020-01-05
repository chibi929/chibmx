import { Router } from 'express';

const router = Router();
router.get('/test', (req, res, next) => {
  const param = { test: 'success' };
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(param);
});

export default router;
