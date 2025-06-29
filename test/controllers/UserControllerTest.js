require('igo').dev.test();

const assert = require('assert');

const agent = require('igo').dev.agent;

const User = require('../../app/models/UserModel');

describe('controllers/UserController', function () {
  //
  describe('GET /users', function () {
    it('should list users', async () => {
      await User.create({
        first_name: 'mehdi',
        last_name: 'gha',
        email: 'm@gmail.com',
      });

      const res = await agent.get('/users');
      assert.strictEqual(res.statusCode, 200);
      assert(res.body.match(/List of Users/));
      assert(res.body.match(/mehdi/));
      assert(res.body.match(/gha/));
      assert(res.body.match(/m@gmail.com/));
    });
  });

  describe('GET /users/:id', function () {
    it('should show 404 page  if ID don\'t exist', async () => {
      const res = await agent.get('/users/1/edit');
      assert.strictEqual(res.statusCode, 404);
      assert(res.body.match(/404/));
    });

    it('should show user info page', async () => {
      const user = await User.create({
        first_name: 'mehdi',
        last_name: 'gha',
        email: 'm@gmail.com',
      });

      const res = await agent.get(`/users/${user.id}`);
      assert.strictEqual(res.statusCode, 200);
      assert(res.body.match(/User Info/));
      assert(res.body.match(/mehdi/));
      assert(res.body.match(/gha/));
      assert(res.body.match(/m@gmail.com/));
    });
  });

  describe('POST /users/new', function () {
    it('should show  create user page', async () => {
      const res = await agent.get('/users/new');
      assert.strictEqual(res.statusCode, 200);
      assert(res.body.match(/Create New User/));
    });

    it('should  not create new user if we don\'t send valid data', async () => {
      const req = {
        body: {
          first_name: '',
          last_name: '',
          email: '',
        },
      };

      let res = await agent.post('/users/new', req);
      assert.strictEqual(res.statusCode, 400);
      assert(res.body.match(/First name should not be empty/));
      assert(res.body.match(/Last name should not be empty/));
      assert(res.body.match(/Email should be valid/));
    });

    it('should create new user if we send valid data', async () => {
      const req = {
        body: {
          first_name: 'mehdi',
          last_name: 'gha',
          email: 'm@gmail.com',
        },
      };

      let res = await agent.post('/users/new', req);
      assert.strictEqual(res.statusCode, 302);
      assert.strictEqual(res.redirectUrl, '/users');

      res = await agent.get('/users');
      assert.strictEqual(res.statusCode, 200);
      assert(res.body.match(/mehdi/));
      assert(res.body.match(/gha/));
      assert(res.body.match(/m@gmail.com/));
    });
  });

  describe('PUT /users/:id/edit', async function () {
    it('should show 404 page  if ID don\'t exist', async () => {
      const res = await agent.get('/users/1/edit');
      assert.strictEqual(res.statusCode, 404);
      assert(res.body.match(/404/));
    });

    it('should show update user page with valid data', async () => {
      const user = await User.create({
        first_name: 'mehdi',
        last_name: 'gha',
        email: 'm@gmail.com',
      });

      const res = await agent.get(`/users/${user.id}/edit`);
      assert.strictEqual(res.statusCode, 200);
      assert(res.body.match(/Update User/));
      assert(res.body.match(/mehdi/));
      assert(res.body.match(/gha/));
      assert(res.body.match(/m@gmail.com/));
    });

    it('should  not update user if we don\'t send valid data', async () => {
      const user = await User.create({
        first_name: 'mehdi',
        last_name: 'gha',
        email: 'm@gmail.com',
      });

      const req = {
        body: {
          first_name: '',
          last_name: '',
          email: '',
        },
      };

      const res = await agent.put(`/users/${user.id}/edit`, req);
      assert.strictEqual(res.statusCode, 400);
      assert(res.body.match(/First name should not be empty/));
      assert(res.body.match(/Last name should not be empty/));
      assert(res.body.match(/Email should be valid/));
    });

    it('should update user if we send valid data', async () => {
      const user = await User.create({
        first_name: 'mehdi',
        last_name: 'gha',
        email: 'm@gmail.com',
      });
      const req = {
        body: {
          first_name: 'mehdi_2',
          last_name: 'gha_2',
          email: 'm2@gmail.com',
        },
      };

      let res = await agent.put(`/users/${user.id}/edit`, req);
      assert.strictEqual(res.statusCode, 302);
      assert.strictEqual(res.redirectUrl, '/users');

      res = await agent.get('/users');
      assert.strictEqual(res.statusCode, 200);
      assert(res.body.match(/mehdi_2/));
      assert(res.body.match(/gha_2/));
      assert(res.body.match(/m2@gmail.com/));
    });
  });

  describe('DELETE /users/:id', function () {
    it('should redirect after deleting a user', async () => {
      const user = await User.create({
        first_name: 'mehdi',
        last_name: 'gha',
        email: 'm@gmail.com',
      });

      const res = await agent.delete(`/users/${user.id}`);
      assert.strictEqual(res.statusCode, 302);
      assert.strictEqual(res.redirectUrl, '/users');
      assert(!res.body.match(/mehdi/));
      assert(!res.body.match(/gha/));
      assert(!res.body.match(/m@gmail.com/));
    });
  });
});
