import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { Subject } from 'rxjs';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private pubClient!: RedisClientType;
  private subClient!: RedisClientType;
  public events$ = new Subject<{ channel: string; message: string }>();

  async onModuleInit() {
    this.pubClient = createClient();
    this.subClient = createClient();
    await this.pubClient.connect();
    await this.subClient.connect();
    this.subClient.pSubscribe('*', (message: string, channel: string) => {
      this.events$.next({ channel, message });
    });
  }

  async onModuleDestroy() {
    await this.pubClient.quit();
    await this.subClient.quit();
  }

  async publish(channel: string, message: string) {
    await this.pubClient.publish(channel, message);
  }
} 