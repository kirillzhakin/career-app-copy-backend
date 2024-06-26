const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
app.use(
	cors({
		origin: '*'
	})
)

const PORT = 4500

const createPath = db => path.resolve(__dirname, 'db', `${db}.json`)
const createPathArray = db => path.resolve(__dirname, 'db', `${db}.js`)

try {
	app.listen(PORT, () => console.log(`Порт ${PORT}`))
} catch (error) {
	console.log(error)
}

app.get('/', (_req, res) => {
	res.send('Hello!')
})

app.get('/jobs', (_req, res, next) => {
	try {
		const jobsPath = createPath('jobs')
		const { jobs } = require(jobsPath)
		res.json(jobs)
	} catch (error) {
		next(error)
	}
})

app.get('/degrees', (_req, res, next) => {
	try {
		const degreesPath = createPath('degrees')
		const { degrees } = require(degreesPath)
		res.json(degrees)
	} catch (error) {
		next(error)
	}
})

app.get('/spotlights', (_req, res, next) => {
	try {
		const spotlightsPath = createPath('spotlights')
		const { spotlights } = require(spotlightsPath)
		res.json(spotlights)
	} catch (error) {
		next(error)
	}
})
app.get('/products', (_req, res, next) => {
	try {
		const productsPath = createPath('products')
		const { products } = require(productsPath)
		res.json(products)
	} catch (error) {
		next(error)
	}
})
app.get('/products/:id', (req, res, next) => {
	const productId = Number(req.params.id)
	try {
		const productsPath = createPath('products')
		const { products } = require(productsPath)
		const product = products.find(item => item.id === productId)
		if (product) {
			res.json(product)
		} else {
			res.status(404).json({ message: "Product don't find!" })
		}
	} catch (error) {
		next(error)
	}
})
app.get('/data', (_req, res, next) => {
	try {
		const dataPath = createPath('storeData')
		const { data } = require(dataPath)
		res.json(data)
	} catch (error) {
		next(error)
	}
})
app.get('/diginetica', (req, res, next) => {
	const { string } = req.query
	try {
		const dataPath = createPath('diginetica')
		const { data } = require(dataPath)
		data[0].string = string;
		console.log(data)
		res.json(data)
	} catch (error) {
		next(error)
	}
})
app.get('/brands', (_req, res, next) => {
	try {
		const dataPath = createPathArray('brands')
		const brands = require(dataPath)
		return res.json(brands)
	} catch (error) {
		next(error)
	}
})

app.use((error, _req, res, _next) => {
	console.error(error)
	res.status(500).json({ error: 'Внутренняя ошибка сервера' })
})

app.use((_req, res) => {
	res.status(404).send('Error 404')
})

