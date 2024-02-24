const express = require('express');
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/shopBatmintan.sqlite'
});

const orders = sequelize.define('orders', {
    orders_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    products_id:{
        type: Sequelize.STRING,
        foreignKey: false
    },
    user_id:{
        type: Sequelize.STRING,
        foreignKey: false
    }
});

const categories = sequelize.define('categories', { 
    category_id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync();

app.post('/orders', async (req, res) => {
    try {
        const newOrder = await orders.create(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/orders', async (req, res) => {
    try {
        const allOrders = await orders.findAll();
        res.json(allOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/orders/:id', async (req, res) => {
    try {
        const order = await orders.findByPk(req.params.id);
        if (!order) {
            res.status(404).json({ error: 'ไม่พบคำสั่งซื้อ' });
        } else {
            res.json(order);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/orders/:id', async (req, res) => {
    try {
        const order = await orders.findByPk(req.params.id);
        if (!order) {
            res.status(404).json({ error: 'ไม่พบคำสั่งซื้อ' });
        } else {
            await order.update(req.body);
            res.json(order);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/orders/:id', async (req, res) => {
    try {
        const order = await orders.findByPk(req.params.id);
        if (!order) {
            res.status(404).json({ error: 'ไม่พบคำสั่งซื้อ' });
        } else {
            await order.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/categories', async (req, res) => {
    try {
        const newCategory = await categories.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/categories', async (req, res) => {
    try {
        const allCategories = await categories.findAll();
        res.json(allCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/categories/:id', async (req, res) => {
    try {
        const category = await categories.findByPk(req.params.id);
        if (!category) {
            res.status(404).json({ error: 'ไม่พบหมวดหมู่' });
        } else {
            res.json(category);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/categories/:id', async (req, res) => {
    try {
        const category = await categories.findByPk(req.params.id);
        if (!category) {
            res.status(404).json({ error: 'ไม่พบหมวดหมู่' });
        } else {
            await category.update(req.body);
            res.json(category);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/categories/:id', async (req, res) => {
    try {
        const category = await categories.findByPk(req.params.id);
        if (!category) {
            res.status(404).json({ error: 'ไม่พบหมวดหมู่' });
        } else {
            await category.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
