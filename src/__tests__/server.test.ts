import { jest } from '@jest/globals';
import request from 'supertest';

// Mock the Pergunta model before importing app
const mockPergunta = {
  findAll: (jest.fn() as any).mockResolvedValue([]),
  findByPk: (jest.fn() as any).mockResolvedValue(null),
  create: (jest.fn() as any).mockResolvedValue({}),
  update: (jest.fn() as any).mockResolvedValue([1]),
  destroy: (jest.fn() as any).mockResolvedValue(1),
};

await jest.unstable_mockModule('../models/Pergunta', async () => ({
  default: mockPergunta,
}));

const { default: app } = await import('../server');

describe('Server initialization', () => {
  test('exports app object', () => {
    expect(app).toBeDefined();
    expect(app.get).toBeDefined();
    expect(typeof app.get).toBe('function');
  });

  test('app responds to requests', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  test('NODE_ENV is set to test during tests', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  test('app has middleware configured', async () => {
    const res = await request(app).get('/perguntas');
    expect([200, 302, 304]).toContain(res.status);
  });
});
