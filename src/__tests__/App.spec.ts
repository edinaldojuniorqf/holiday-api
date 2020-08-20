import request, { Response } from 'supertest';
import { Connection, getConnection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';
import app from '@shared/infra/http/server';

let connection: Connection;

describe('App', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.runMigrations();
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  test('Register holiday and update if exists', async () => {
    let response: Response;

    response = await request(app).put('/feriados/2611606/05-06').send({
      name: 'Niver'
    });

    expect([200, 201]).toContain(response.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Niver'
      })
    );

    response = await request(app).put('/feriados/2611606/05-06').send({
      name: 'Niver de Bruna'
    });

    expect([200, 201]).toContain(response.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Niver de Bruna'
      })
    );
  });

  test('Not register holiday with invalid code', async () => {
    let response: Response;

    response = await request(app).put('/feriados/00000/02-02').send({
      name: 'Niver'
    });

    expect([400]).toContain(response.status);
  });

  test('Register holiday movable', async () => {
    let response: Response;

    response = await request(app).put('/feriados/2611606/carnaval').send();

    expect([200, 201]).toContain(response.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Carnaval'
      })
    );

    response = await request(app).put('/feriados/2611606/corpus-christi').send();

    expect([200, 201]).toContain(response.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Corpus Christi'
      })
    );
  });
  
  test('Return holiday national', async () => {
    let response;

    response = await request(app).get('/feriados/1100015/2020-01-01');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Ano Novo',
      })
    );

    response = await request(app).get('/feriados/1100379/2020-01-01');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Ano Novo',
      })
    );
  });

  test("Get holiday that doesn't exist", async () => {
    const response = await request(app).get('/feriados/1100379/2020-05-30');

    expect([404]).toContain(response.status);
  });

  test('Ruturn holiday movable Easter', async () => {
    const response = await request(app).get('/feriados/1100015/2020-04-12');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Páscoa',
      })
    );
  });

  test('Ruturn holiday movable Good Friday', async () => {
    const response = await request(app).get('/feriados/1100015/2020-04-10');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Sexta-Feira Santa',
      })
    );
  });

  test('Return holiday municipal', async () => {
    let response: Response;

    response = await request(app).put('/feriados/2611606/12-01').send({
      name: 'Primeiro dia de dezembro'
    });
    
    response = await request(app).get('/feriados/2611606/2020-12-01');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Primeiro dia de dezembro',
      })
    );
  });

  test('Return holiday state', async () => {
    let response: Response;

    response = await request(app).put('/feriados/11/03-01').send({
      name: 'Mais um feriado'
    });
    
    response = await request(app).get('/feriados/11/2020-03-01');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Mais um feriado',
      })
    );
  });

  test('Delete holiday', async () => {
    let response: Response;

    response = await request(app).put('/feriados/2611606/03-03').send({
      name: 'Mais um feriado'
    });

    response = await request(app).del('/feriados/2611606/03-03');

    expect([204]).toContain(response.status);
  });

  test('Delete holiday when not exists', async () => {
    const response = await request(app).del('/feriados/2611606/12-30');

    expect([404]).toContain(response.status);
  });

  test('Not delete holiday with valida code', async () => {
    let response: Response;

    response = await request(app).del('/feriados/00000/12-01');

    expect([400]).toContain(response.status);
  });

  test('Delete holiday movable', async () => {
    let response: Response;

    await request(app).put('/feriados/2611606/carnaval').send();

    response = await request(app).del('/feriados/2611606/carnaval');

    expect([204]).toContain(response.status);
  });

  test('Not delete holiday state from code municipal', async () => {
    let response: Response;

    response = await request(app).put('/feriados/26/08-04').send({
      name: 'Mais outro feriado'
    });

    response = await request(app).del('/feriados/2611606/08-04');

    expect([403]).toContain(response.status);
  });

  test('Not delete holiday national from code municipal', async () => {
    let response: Response;

    response = await request(app).del('/feriados/2611606/01-01');

    expect([403]).toContain(response.status);
  });

  test('Not delete holiday nataional from code state', async () => {
    let response: Response;

    response = await request(app).del('/feriados/11/01-01');

    expect([403]).toContain(response.status);
  });
});
