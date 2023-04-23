import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AppService {
  async verifyToken(token) {
    try {
      const resp = await admin.auth().verifyIdToken(token);
      if (!resp) return { authenticated: false };
      return { authenticated: true };
    } catch (error) {
      return { authenticated: false };
    }
  }
}
