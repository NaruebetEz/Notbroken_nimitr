import express, { Application, Request, Response, NextFunction } from 'express'
import fs from 'fs'
import cors from 'cors'
import path from 'path'
import config from 'config'
import { v1 as uuid } from 'uuid'
import { createServer, Server } from 'http'
import { ApolloServer } from 'apollo-server-express'
import QRCode from 'qrcode'
import { MarkerModel, ContentModel } from './models'
import mongoose from 'mongoose'
import { buildHtml } from './htmlForm'

import './Dbconfig/mongoDB'
import schema from './graphql'
import {
	ApolloServerPluginLandingPageDisabled,
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'
import {
	ConnectionContext,
	SubscriptionServer,
} from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import routerv1 from './router/v1/router'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'
	; (async function () {
		const app: Application = express()
		const port = config.get('app.port')
		const host = config.get('app.host')

		//
		app.use(cors())
		app.use(express.urlencoded({ limit: '50mb', extended: true }))
		app.use(express.json({ limit: '50mb' }))
		app.use(graphqlUploadExpress())
		app.use('/marker', express.static(path.join(__dirname, '../marker')))
		app.use('/media', express.static(path.join(__dirname, '../media')))
		app.use('/qr', express.static(path.join(__dirname, '../qr')))
		app.use('/pattern', express.static(path.join(__dirname, '../pattern')))
		app.use('/assets', express.static(path.join(__dirname, '../assets')))

		/**
		 * Router API V.1.
		 * @remarks
		 *  API Version 1
		 */
		app.use('/api/v1/', routerv1)

		app.get('/', (req: Request, res: Response) => {
			res.send('Express + TypeScript Server')
		})

		// app.get('/id24/:id', (req: Request, res: Response) => {
		// 	res.send({
		// 		id: 'bbda259a-d1c2-4ebc-a194-9faba46c4f58',
		// 		type: 'local',
		// 		username: 'manager.pps',
		// 		email: 'phairat@streamsouth.tech',
		// 		passwordUpdatedAt: '2022-08-01T19:52:50.871Z',
		// 		temporaryPassword: true,
		// 		active: true,
		// 		createdAt: '2022-08-01T19:46:16.396Z',
		// 		updatedAt: '2022-08-01T19:46:16.396Z',
		// 	})
		// })

		app.post('/project', async (req: Request, res: Response, next: NextFunction) => {
			try {
				const directoryProject = req.body.id
				const markerPath = `${__dirname}/../marker/`
				const mediePath = `${__dirname}/../medie/`
				const patternPath = `${__dirname}/../medie/`

				if (directoryProject) {
					fs.mkdir(path.join(mediePath, directoryProject), (err) => {
						if (err) {
							return console.error(err)
						}
						console.log('Directory created successfully!')
					})
					fs.mkdir(path.join(markerPath, directoryProject), (err) => {
						if (err) {
							return console.error(err)
						}
						console.log('Directory created successfully!')
					})
					fs.mkdir(path.join(patternPath, directoryProject), (err) => {
						if (err) {
							return console.error(err)
						}
						console.log('Directory created successfully!')
					})
				} else {
					res.send({ message: 'Directory created fail!' })
				}
			} catch (err) {
				next(err)
			}
		})

		app.post(
			'/uploadmarker',
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const { marker, type } = req.body
					const uuidPath = `${uuid()}.${type}`
					const markerPath = `${__dirname}/../marker/${uuidPath}`

					if (marker) {
						const base64Data = marker.replace(/^data:([A-Za-z-+/]+);base64,/, '')
						fs.writeFileSync(markerPath, base64Data, { encoding: 'base64' })
						res.send({
							url: `https://db.nimitr.art/marker/${uuidPath}`,
						})
					} else {
						res.send({ message: 'upload marker false' })
					}
				} catch (err) {
					next(err)
				}
			}
		)

		app.post(
			'/uploadmedia',
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const { media, type } = req.body
					const uuidPath = `${uuid()}.${type}`
					const mediaPath = `${__dirname}/../media/${uuidPath}`
					if (media) {
						const base64Data = media.replace(/^data:([A-Za-z-+/]+);base64,/, '')
						// console.log('STEP1::', base64Data)

						fs.writeFileSync(mediaPath, base64Data, { encoding: 'base64' })
						// res.send({
						// 	name: `marker1`,
						// 	url: `https://db.nimitr.art/media/${uuidPath}`,
						// })
						res.send({
							url: `https://db.nimitr.art/media?id=${uuidPath}`,
						})
					} else {
						res.send({ message: 'upload media false' })
					}
				} catch (err) {
					next(err)
				}
			}
		)

		app.get('/media', (req: Request, res: Response, next: NextFunction) => {
			// console.log(req.query)
			var path = require('path')
			res.sendFile(path.resolve(`${__dirname}/../media/${req.query.id}`))
			// res.sendFile(`${__dirname}/../media/${req.query.id}`)
		})

		app.post(
			'/uploadpattern',
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const { pattern, type } = req.body
					const uuidPath = `${uuid()}.${type}`
					const patternPath = `${__dirname}/../pattern/${uuidPath}`
					if (pattern) {
						const base64Data = pattern.replace(/^data:([A-Za-z-+/]+);base64,/, '')
						// console.log('STEP1::', base64Data)
						fs.writeFileSync(patternPath, base64Data, { encoding: 'base64' })
						// res.send({
						// 	name: `marker1`,
						// 	url: `https://db.nimitr.art/media/${uuidPath}`,
						// })
						res.send({ url: `https://db.nimitr.art/pattern?id=${uuidPath}` })
					} else {
						res.send({ message: 'upload pattern false' })
					}
				} catch (err) {
					next(err)
				}
			}
		)

		app.get('/pattern', (req: Request, res: Response, next: NextFunction) => {
			// console.log(req.query)
			var path = require('path')
			res.sendFile(path.resolve(`${__dirname}/../pattern/${req.query.id}`))
			// res.sendFile(`${__dirname}/../media/${req.query.id}`)
		})

		app.post(
			'/generateqr',
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const { url } = req.body
					const uuidPath = `${uuid()}.png`
					const qrParth = `${__dirname}/../qr/${uuidPath}`
					QRCode.toDataURL(url, (err: any, code: any) => {
						if (err) return console.log('error occurred')
						const base64Data = code.replace(/^data:([A-Za-z-+/]+);base64,/, '')
						fs.writeFileSync(qrParth, base64Data, { encoding: 'base64' })
						res.send({ url: `https://db.nimitr.art/qr/${uuidPath}` })
					})
				} catch (err) {
					next(err)
				}
			}
		)

		app.get(
			'/api/v1/markers',
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const data = await MarkerModel.find({
						markerStatus: 'MARKER_ALIVE',
					})
					res.status(200).json(data)
				} catch (error) {
					console.log(error)
					res.status(400).send(JSON.stringify(error))
				}
			}
		)
		app.get(
			'/api/v1/render/:projectId',
			async (req: Request, res: Response, next: NextFunction) => {
				try {
					const { projectId } = req.params
					console.log(projectId);
					const ProjectConvert = new mongoose.Types.ObjectId(`${projectId}`)
					const dataContent = await ContentModel.aggregate([
						{
							$match: { project: ProjectConvert },
						},
						{
							$match: {
								contentStatus: "CONTENT_ALIVE",
							},
						},
						{
							$addFields: {
								markerId: {
									$toString: "$marker",
								},
							},
						},
						{
							$lookup:
							/**
							 * from: The target collection.
							 * localField: The local join field.
							 * foreignField: The target join field.
							 * as: The name for the results.
							 * pipeline: Optional pipeline to run on the foreign collection.
							 * let: Optional variables to use in the pipeline field stages.
							 */
							{
								from: "markers",
								localField: "marker",
								foreignField: "_id",
								as: "markerdata",
							},
						},
						{
							$unwind:
								/**
								 * path: Path to the array field.
								 * includeArrayIndex: Optional name for index.
								 * preserveNullAndEmptyArrays: Optional
								 *   toggle to unwind null and empty values.
								 */
								"$markerdata",
						},
						{
							$lookup:
							/**
							 * from: The target collection.
							 * localField: The local join field.
							 * foreignField: The target join field.
							 * as: The name for the results.
							 * pipeline: Optional pipeline to run on the foreign collection.
							 * let: Optional variables to use in the pipeline field stages.
							 */
							{
								from: "media",
								localField: "_id",
								foreignField: "content",
								as: "mediadata",
							},
						},
						{
							$unwind:
								/**
								 * path: Path to the array field.
								 * includeArrayIndex: Optional name for index.
								 * preserveNullAndEmptyArrays: Optional
								 *   toggle to unwind null and empty values.
								 */
								"$mediadata",
						},
					]
					)

					// 		{	
					// 		project: projectId,
					// status: "CONTENT_ALIVE"
					// 	})


					// const dataGen= await new Promise(async(resolve,reject)=>{
					// 	try{

					// 	const data=await	dataContent.map(async(row:any)=>{

					// 			const dataMaker=await MarkerModel.findById({
					// 				_id:row?.marker,
					// 			})
					// 			return {
					// 				...row,
					// 				marker:dataMaker
					// 			}
					// 		})
					// 		resolve(data)
					// 	}catch(e){
					// 		reject(e)
					// 	}
					// })

					console.log('ffff', dataContent);
					const html = buildHtml(dataContent)
					res.writeHead(200, {
						'Content-Type': 'text/html',
						'Content-Length': html.length,
						'Expires': new Date().toUTCString()
					});
					res.end(html)
				} catch (error) {
					console.log(error)
					res.status(400).send(JSON.stringify(error))
				}
			}
		)

		// const findMedia = (data: any, contentArray: object[]) =>
		// 	new Promise(async (resolve, reject) => {
		// 		try {
		// 			let arr = []

		// 			await data?.forEach(async (content: any, index: any) => {
		// 				console.log('CCCC', content?.media)
		// 				const media = await MediaModel.findById({ _id: content?.media })
		// 				contentArray.push({
		// 					_id: content?._id,
		// 					name: content?.name,
		// 					scale: content?.scale,
		// 					rotationX: content?.rotationX,
		// 					rotationY: content?.rotationY,
		// 					rotationZ: content?.rotationZ,
		// 					media: media,
		// 					contentStatus: content?.contentStatus,
		// 				})
		// 			})
		// 			const arr1 = contentArray
		// 			setTimeout(() => {
		// 				resolve(arr1)
		// 			}, 1000)
		// 		} catch (e) {
		// 			reject([{}])
		// 		}
		// 	})

		// app.post('/uploadpattern', async (req, res, next) => {
		// 	try {
		// 		const uuidPath = `${uuid()}`
		// 		const pattPath = `${__dirname}/../marker/${uuidPath}`
		// 		const { patt } = req.body
		// 		if (patt) {
		// 			const base64Data = patt.replace(/^data:([A-Za-z-+/]+);base64,/, '')
		// 			fs.writeFileSync(pattPath, base64Data, { encoding: 'base64' })
		// 			res.send({
		// 				url: `https://db.nimitr.art/pattern/${uuidPath}/${patt}`,
		// 			})
		// 		} else {
		// 			res.send({ message: 'upload marker false' })
		// 		}
		// 	} catch (err) {
		// 		next(err)
		// 	}
		// })

		// app.post('/sendhomework', async (req, res, next) => {
		// 	try {
		// 		const file = req.body
		// 		const filename = `${file.filename}`
		// 		const namestudent = file.firstnamestudent + file.lastnamestudent
		// 		const pathProject = `${__dirname}/../project/${file.namehomework}`
		// 		const pathUser = `${__dirname}/../project/${file.namehomework}/${namestudent}/${filename}`
		// 		console.log('PATH', pathHomework)
		// 		console.log('PATH2', pathUser)
		// 		if (file) {
		// 			fs.mkdir(path.join(pathHomework, namestudent), (err) => {
		// 				const base64Data = file.photo.replace(/^data:([A-Za-z-+/.]+);base64,/, '')
		// 				fs.writeFileSync(pathUser, base64Data, { encoding: 'base64' })
		// 				res.send({ url: `${filename}` })

		// 				if (err) {
		// 					return console.error(err)
		// 				}
		// 				console.log('Directory created successfully!')
		// 			})
		// 		} else {
		// 			res.send({ message: 'No photo provided' })
		// 		}
		// 	} catch (err) {
		// 		next(err)
		// 	}
		// })

		// app.post('/edithomework', async (req, res, next) => {
		// 	try {
		// 		const file = req.body
		// 		const filenamenew = `${file.filenamenew}`
		// 		const filenameold = `${file.filenameold}`
		// 		const namestudent = file.firstnamestudent + file.lastnamestudent
		// 		const pathHomework = `${__dirname}/../homework/${file.namehomework}`
		// 		const pathUsernew = `${__dirname}/../homework/${file.namehomework}/${namestudent}/${filenamenew}`
		// 		const pathUserold = `${__dirname}/../homework/${file.namehomework}/${namestudent}/${filenameold}`

		// 		if (file) {
		// 			fs.mkdir(path.join(pathHomework, namestudent), (err) => {
		// 				const base64Data = file.photo.replace(/^data:([A-Za-z-+/]+);base64,/, '')
		// 				fs.unlinkSync(pathUserold)
		// 				fs.writeFileSync(pathUsernew, base64Data, { encoding: 'base64' })
		// 				res.send({ url: `${filenamenew}` })

		// 				if (err) {
		// 					return console.error(err)
		// 				}
		// 				console.log('Directory created successfully!')
		// 			})
		// 		} else {
		// 			res.send({ message: 'No photo provided' })
		// 		}
		// 	} catch (err) {
		// 		next(err)
		// 	}
		// })

		// app.post('/deletehomework', async (req, res, next) => {
		// 	try {
		// 		const file = req.body
		// 		const filename = `${file.filename}`
		// 		const namestudent = file.firstnamestudent + file.lastnamestudent
		// 		const pathHomework = `${__dirname}/../homework/${file.namehomework}`
		// 		const pathUser = `${__dirname}/../homework/${file.namehomework}/${namestudent}/${filename}`

		// 		if (filename) {
		// 			fs.unlinkSync(pathUser)
		// 			return res.send('')
		// 		} else {
		// 			console.log('No file received')
		// 			return res.json('error in delete')
		// 		}
		// 	} catch (err) {
		// 		next(err)
		// 	}
		// })

		const httpServer: Server = createServer(app)
		// Creating the WebSocket server
		const wsServer = new WebSocketServer({
			// This is the `httpServer` we created in a previous step.
			server: httpServer,
			// Pass a different path here if your ApolloServer serves at
			// a different path.
			path: '/graphql',
		})

		// Hand in the schema we just created and have the
		// WebSocketServer start listening.
		const serverCleanup = useServer({ schema }, wsServer)
		/**
		 * ApolloServer Config.
		 * @remarks
		 *  Apollo Server 3 
		 * @constructor
		 * @param {any.schemaComposer} schema - Schema GraphQL import schema from './graphql' .
		 * @param {PluginDefinition[]} plugins - config Dashboaimport router from './router/v1/router';
	rd Apollo or Playgroud import { ContentModel } from './models/content';
	
		 *  Open  PlayGround use ApolloServerPluginLandingPageGraphQLPlayground.
		 *  Close PlayGround use ApolloServerPluginLandingPageDisabled
		 * @see https://www.apollographql.com/docs/apollo-server/migration/
		 * 
		 */

		const server = new ApolloServer({
			schema,
			csrfPrevention: false,
			cache: 'bounded',
			plugins: [
				// Proper shutdown for the HTTP server.
				ApolloServerPluginLandingPageLocalDefault({ embed: true }),
				ApolloServerPluginDrainHttpServer({ httpServer }),
				// Proper shutdown for the WebSocket server.
				{
					async serverWillStart() {
						return {
							async drainServer() {
								await serverCleanup.dispose()
							},
						}
					},
				},
			],
		})
		// const wsServer = new WebSocketServer({
		//     // This is the `httpServer` we created in a previous step.
		//     server: httpServer,
		//     // Pass a different path here if your ApolloServer serves at
		//     // a different path.
		//     path: '/graphql',
		// });

		await server.start()
		server.applyMiddleware({ app })

		httpServer.listen(port, () => {
			console.log(
				`Server is now running on http://localhost:${port}${server.graphqlPath}`
			)
		})
	})()
