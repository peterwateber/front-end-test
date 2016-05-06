var http = require('http');
var uuid = require('node-uuid');
var serveStatic = require('node-static');
var fileServer = new serveStatic.Server('./public');
var express = require('express')
var bodyParser = require('body-parser')


var customers = [
    {
        name: 'William Shakespeare',
        product: {
            name: 'Grammatical advice'
        },
        id: uuid.v4(),
        joinedTime: new Date().toString()
    },
    {
        name: 'Sherlock Holmes',
        product: {
            name: 'Magnifying glass repair'
        },
        id: uuid.v4(),
        joinedTime: new Date().toString()
    },
    {
        name: 'Allan Turing',
        product: {
            name: 'Cryptography advice'
        },
        id: uuid.v4(),
        joinedTime: new Date().toString()
    },
]

var servedCustomers = [
];

function serveCustomer(id) {
	customers.forEach(function(customer, index) {
		if (customer.id == id) {
			customer.status = 'served';
            customer.joinedTime = new Date().toString();
            customers.splice(index, 1);
            servedCustomers.push(customer);
		}
	})
}

function addCustomer(customer) {
	customer.id = uuid.v4();
    customer.joinedTime = new Date().toString();
    var product_name = customer.product;
    customer.product = {
        name: product_name
    };
	customers.push(customer);
}

function removeCustomer(targetCustomerId) {
	customers = customers.filter(function(customer) {
		return customer.id !== targetCustomerId;
	});
}


var app = express();
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())

app.get('/api/customers', function(req, res) {
	res.send(customers);
})
app.get('/api/customers/served', function(req, res) {
	res.send(servedCustomers);
})
app.post('/api/customer/add', function(req, res) {
	addCustomer(req.body);
    res.type("json");
	res.send(customers);
});
app.post('/api/customer/serve', function(req, res) {
	serveCustomer(req.body.id);
	res.type('json');
    res.send({
        customers: customers,
        servedCustomers: servedCustomers
    });
});
app.delete('/api/customer/remove', function(req, res) {
	removeCustomer(req.query.id);
	res.type('json');
    res.send(customers);
});

app.use(function(req, res) {

	req.addListener('end', function() {
		fileServer.serve(req, res);
	}).resume();
})

app.listen(1337)
console.log('Server is running @ 127.0.0.1:1337...');
console.log('Good luck!');
