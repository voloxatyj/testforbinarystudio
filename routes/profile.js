const express = require('express');
const router = express.Router();
const admin = require('firebase-admin')
const serviceAccount = require('../ServiceAccountKey.json')
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()

/* Get Data from FireBase */
router.get('/', (req,res)=>{
const recipes = []
	try {
		db.collection('CookBook')
			.orderBy('recipe_id')
			.get()
			.then(QuerySnapshot => {
				QuerySnapshot.forEach(doc => {
					const recipe = {
						id: doc.id,
						recipe_id: doc.data().recipe_id,
						name: doc.data().recipe_name,
						date: doc.data().recipe_date.toDate().toLocaleDateString(),
						ingredients: doc.data().recipe_ingredients,
						method: doc.data().recipe_method
					}
					recipes.push(recipe)
				})
					res.send(recipes)
			})
	} catch (error) {
		res.status(400).send({
			message: `We have this error ${error}`
		})
	}
})  

/* Add new_recipe to DataBase */
router.post('/new', (req,res)=>{
	try {
		req.body.recipe_date = admin.firestore.Timestamp.now()
		db.collection('CookBook').add(req.body)
	} catch (error) {
		res.status(400).send({
			message:`No way ${error}`
		})
	}
}) 

/* Delete recipe from DataBase */
router.delete('/:recipe_id', (req,res) => {
	try {
		req.body.recipe_date = admin.firestore.Timestamp.now()
		db.collection('CookBook')
			.get()
			.then(QuerySnapshot => {
				QuerySnapshot.forEach(doc => {
					doc.data().recipe_id == req.params.recipe_id ? doc.ref.delete():-1
				})
			})
	} catch (error) {
		res.status(400).send({
			message: `Whata fuck ${error}?`
		})
	}
}) 

/* Update recipe to my DataBase */
router.put('/edit/:recipe_id', (req,res)=>{
	try {
		req.body.recipe_date = admin.firestore.Timestamp.now()
		db.collection('CookBook')
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					doc.data().recipe_id == req.params.recipe_id ? doc.ref.update(req.body): -1
				})
			})
	} catch (error) {
		res.status(400).send({
			message: `Whata fuck ${error}?`
		})
	}
})
 
module.exports = router;