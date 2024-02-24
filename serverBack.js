const e = require('express');
const express = require('express');
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/shopBatmintan.sqlite'
});
const shopBatmintan = sequelize.define('products', { 
    products_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    products_code: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    products_name: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    catagory_id:{
        type: Sequelize.INTEGER,
        foreignKey: false
    },
    unit:{
        type: Sequelize.INTEGER,
        allowNull: false
    
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
}
    
}, {
    timestamps: false
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
app.post('/products', async (req, res) => {
    try {
        const newProduct = await shopBatmintan.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/products', async (req, res) => {
    try {
        const allProducts = await shopBatmintan.findAll();
        res.json(allProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/products/:id', async (req, res) => {
    try {
        const product = await shopBatmintan.findByPk(req.params.id);
        if (!product) {
            res.status(404).json({ error: 'ไม่พบสินค้า' });
        } else {
            res.json(product);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const product = await shopBatmintan.findByPk(req.params.id);
        if (!product) {
            res.status(404).json({ error: 'ไม่พบสินค้า' });
        } else {
            await product.update(req.body);
            res.json(product);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const product = await shopBatmintan.findByPk(req.params.id);
        if (!product) {
            res.status(404).json({ error: 'ไม่พบสินค้า' });
        } else {
            await product.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
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

app.post('/catagories', async (req, res) => {
    try {

        const newcatagories = await catagories.create(req.body);
        res.status(201).json(newcatagories);
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

app.get('/catagories/:id', async (req, res) => {
    try {
        const catagories = await catagories.findByPk(req.params.id);
        if (!catagories) {
            res.status(404).json({ error: 'ไม่พบหมวดหมู่' });
        } else {
            res.json(catagories);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/catagories/:id', async (req, res) => {
    try {
        const catagories = await catagories.findByPk(req.params.id);
        if (!catagories) {
            res.status(404).json({ error: 'ไม่พบหมวดหมู่' });
        } else {
            await catagories.update(req.body);
            res.json(catagories);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/catagories/:id', async (req, res) => {
    try {
        const catagories = await catagories.findByPk(req.params.id);
        if (!catagories) {
            res.status(404).json({ error: 'ไม่พบหมวดหมู่' });
        } else {
            await catagories.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));