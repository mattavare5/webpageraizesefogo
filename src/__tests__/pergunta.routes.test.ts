import { jest } from '@jest/globals';
import request from 'supertest';

// Use ESM-style mocking before importing the app
const mockPergunta: any = {};
mockPergunta.findAll = (jest.fn() as any).mockResolvedValue([
  { id: 1, titulo: 'A', descricao: 'desc A' },
  { id: 2, titulo: 'B', descricao: 'desc B' },
]);
mockPergunta.findByPk = (jest.fn() as any).mockImplementation(async (id: any) => ({ 
  id, 
  titulo: 'X', 
  descricao: 'Y',
  createdAt: new Date()
}));
mockPergunta.create = (jest.fn() as any).mockResolvedValue({});
mockPergunta.update = (jest.fn() as any).mockResolvedValue([1]);
mockPergunta.destroy = (jest.fn() as any).mockResolvedValue(1);

// jest.unstable_mockModule is required for ESM module mocks
await jest.unstable_mockModule('../models/Pergunta', async () => ({
  default: mockPergunta,
}));

const { default: app } = await import('../server');

describe('Perguntas routes (mocked model)', () => {
  test('GET /perguntas returns list', async () => {
    const res = await request(app).get('/perguntas');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Perguntas');
    expect(mockPergunta.findAll).toHaveBeenCalled();
  });

  test('GET /perguntas/ver/:id returns question page', async () => {
    const res = await request(app).get('/perguntas/ver/1');
    expect(res.status).toBe(200);
    expect(res.text).toContain('X');
    expect(mockPergunta.findByPk).toHaveBeenCalledWith('1');
  });

  test('GET /perguntas/ver/:id redirects when not found', async () => {
    mockPergunta.findByPk.mockResolvedValueOnce(null);
    const res = await request(app).get('/perguntas/ver/999');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/perguntas');
  });

  test('GET /perguntas/nova renders form', async () => {
    const res = await request(app).get('/perguntas/nova');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Criar Pergunta');
  });

  test('POST /perguntas/nova creates and redirects', async () => {
    const res = await request(app).post('/perguntas/nova').type('form').send({ titulo: 'New', descricao: 'NewDesc' });
    expect(res.status).toBe(302);
    expect(mockPergunta.create).toHaveBeenCalledWith({ titulo: 'New', descricao: 'NewDesc' });
  });

  test('GET /perguntas/editar/:id renders edit form', async () => {
    const res = await request(app).get('/perguntas/editar/1');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Editar Pergunta');
    expect(mockPergunta.findByPk).toHaveBeenCalledWith('1');
  });

  test('GET /perguntas/editar/:id redirects when not found', async () => {
    mockPergunta.findByPk.mockResolvedValueOnce(null);
    const res = await request(app).get('/perguntas/editar/999');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/perguntas');
  });

  test('POST /perguntas/editar/:id updates and redirects', async () => {
    const res = await request(app).post('/perguntas/editar/1').type('form').send({ titulo: 'Up', descricao: 'UpDesc' });
    expect(res.status).toBe(302);
    expect(mockPergunta.update).toHaveBeenCalled();
  });

  test('POST /perguntas/deletar/:id deletes and redirects', async () => {
    const res = await request(app).post('/perguntas/deletar/1');
    expect(res.status).toBe(302);
    expect(mockPergunta.destroy).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  test('GET /perguntas/:id renders individual question page', async () => {
    const res = await request(app).get('/perguntas/1');
    expect(res.status).toBe(200);
    expect(res.text).toContain('X');
  });

  test('GET /perguntas/:id redirects to home when not found', async () => {
    mockPergunta.findByPk.mockResolvedValueOnce(null);
    const res = await request(app).get('/perguntas/999');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/');
  });
});

describe('Other routes', () => {
  test('GET / renders home page', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Raízes e Fogo');
  });

  test('GET /contato renders contact page', async () => {
    const res = await request(app).get('/contato');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Contato');
  });

  test('GET /login renders login page', async () => {
    const res = await request(app).get('/login');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Login');
  });
});
