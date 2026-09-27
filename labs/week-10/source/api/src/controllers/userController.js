import { DatabaseSync } from 'node:sqlite';
import { config } from '../config.js';

const db = new DatabaseSync(config.dbFile);

export function listUsers(req, res) {
  const users = db.prepare('SELECT id, name, department, email FROM users ORDER BY id').all();
  res.json(users);
}

export function getUserRequests(req, res) {
  const SELECT_SHAPE = `
    SELECT r.id,
           u.name          AS requesterName,
           r.request_type  AS requestType,
           r.location,
           r.details,
           r.priority,
           r.status
    FROM requests r
    JOIN users u ON u.id = r.requester_id
    WHERE r.requester_id = ?
    ORDER BY r.id`;

  const requests = db.prepare(SELECT_SHAPE).all(req.params.id);
  res.json(requests);
}
