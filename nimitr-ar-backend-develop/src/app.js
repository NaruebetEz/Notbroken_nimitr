"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("config"));
const uuid_1 = require("uuid");
const http_1 = require("http");
const apollo_server_express_1 = require("apollo-server-express");
const qrcode_1 = __importDefault(require("qrcode"));
const models_1 = require("./models");
const mongoose_1 = __importDefault(require("mongoose"));
const htmlForm_1 = require("./htmlForm");
require("./Dbconfig/mongoDB");
const graphql_1 = __importDefault(require("./graphql"));
const apollo_server_core_1 = require("apollo-server-core");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const router_1 = __importDefault(require("./router/v1/router"));
const graphqlUploadExpress_js_1 = __importDefault(require("graphql-upload/graphqlUploadExpress.js"));
(async function () {
    const app = (0, express_1.default)();
    const port = config_1.default.get('app.port');
    const host = config_1.default.get('app.host');
    //
    app.use((0, cors_1.default)());
    app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
    app.use(express_1.default.json({ limit: '50mb' }));
    app.use((0, graphqlUploadExpress_js_1.default)());
    app.use('/marker', express_1.default.static(path_1.default.join(__dirname, '../marker')));
    app.use('/media', express_1.default.static(path_1.default.join(__dirname, '../media')));
    app.use('/qr', express_1.default.static(path_1.default.join(__dirname, '../qr')));
    app.use('/pattern', express_1.default.static(path_1.default.join(__dirname, '../pattern')));
    app.use('/assets', express_1.default.static(path_1.default.join(__dirname, '../assets')));
    /**
     * Router API V.1.
     * @remarks
     *  API Version 1
     */
    app.use('/api/v1/', router_1.default);
    app.get('/', (req, res) => {
        res.send('Express + TypeScript Server');
    });
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
    app.post('/project', async (req, res, next) => {
        try {
            const directoryProject = req.body.id;
            const markerPath = `${__dirname}/../marker/`;
            const mediePath = `${__dirname}/../medie/`;
            const patternPath = `${__dirname}/../medie/`;
            if (directoryProject) {
                fs_1.default.mkdir(path_1.default.join(mediePath, directoryProject), (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('Directory created successfully!');
                });
                fs_1.default.mkdir(path_1.default.join(markerPath, directoryProject), (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('Directory created successfully!');
                });
                fs_1.default.mkdir(path_1.default.join(patternPath, directoryProject), (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('Directory created successfully!');
                });
            }
            else {
                res.send({ message: 'Directory created fail!' });
            }
        }
        catch (err) {
            next(err);
        }
    });
    app.post('/uploadmarker', async (req, res, next) => {
        try {
            const { marker, type } = req.body;
            const uuidPath = `${(0, uuid_1.v1)()}.${type}`;
            const markerPath = `${__dirname}/../marker/${uuidPath}`;
            if (marker) {
                const base64Data = marker.replace(/^data:([A-Za-z-+/]+);base64,/, '');
                fs_1.default.writeFileSync(markerPath, base64Data, { encoding: 'base64' });
                res.send({
                    url: `https://db.nimitr.art/marker/${uuidPath}`,
                });
            }
            else {
                res.send({ message: 'upload marker false' });
            }
        }
        catch (err) {
            next(err);
        }
    });
    app.post('/uploadmedia', async (req, res, next) => {
        try {
            const { media, type } = req.body;
            const uuidPath = `${(0, uuid_1.v1)()}.${type}`;
            const mediaPath = `${__dirname}/../media/${uuidPath}`;
            if (media) {
                const base64Data = media.replace(/^data:([A-Za-z-+/]+);base64,/, '');
                // console.log('STEP1::', base64Data)
                fs_1.default.writeFileSync(mediaPath, base64Data, { encoding: 'base64' });
                // res.send({
                // 	name: `marker1`,
                // 	url: `https://db.nimitr.art/media/${uuidPath}`,
                // })
                res.send({
                    url: `https://db.nimitr.art/media?id=${uuidPath}`,
                });
            }
            else {
                res.send({ message: 'upload media false' });
            }
        }
        catch (err) {
            next(err);
        }
    });
    app.get('/media', (req, res, next) => {
        // console.log(req.query)
        var path = require('path');
        res.sendFile(path.resolve(`${__dirname}/../media/${req.query.id}`));
        // res.sendFile(`${__dirname}/../media/${req.query.id}`)
    });
    app.post('/uploadpattern', async (req, res, next) => {
        try {
            const { pattern, type } = req.body;
            const uuidPath = `${(0, uuid_1.v1)()}.${type}`;
            const patternPath = `${__dirname}/../pattern/${uuidPath}`;
            if (pattern) {
                const base64Data = pattern.replace(/^data:([A-Za-z-+/]+);base64,/, '');
                // console.log('STEP1::', base64Data)
                fs_1.default.writeFileSync(patternPath, base64Data, { encoding: 'base64' });
                // res.send({
                // 	name: `marker1`,
                // 	url: `https://db.nimitr.art/media/${uuidPath}`,
                // })
                res.send({ url: `https://db.nimitr.art/pattern?id=${uuidPath}` });
            }
            else {
                res.send({ message: 'upload pattern false' });
            }
        }
        catch (err) {
            next(err);
        }
    });
    app.get('/pattern', (req, res, next) => {
        // console.log(req.query)
        var path = require('path');
        res.sendFile(path.resolve(`${__dirname}/../pattern/${req.query.id}`));
        // res.sendFile(`${__dirname}/../media/${req.query.id}`)
    });
    app.post('/generateqr', async (req, res, next) => {
        try {
            const { url } = req.body;
            const uuidPath = `${(0, uuid_1.v1)()}.png`;
            const qrParth = `${__dirname}/../qr/${uuidPath}`;
            qrcode_1.default.toDataURL(url, (err, code) => {
                if (err)
                    return console.log('error occurred');
                const base64Data = code.replace(/^data:([A-Za-z-+/]+);base64,/, '');
                fs_1.default.writeFileSync(qrParth, base64Data, { encoding: 'base64' });
                res.send({ url: `https://db.nimitr.art/qr/${uuidPath}` });
            });
        }
        catch (err) {
            next(err);
        }
    });
    app.get('/api/v1/markers', async (req, res, next) => {
        try {
            const data = await models_1.MarkerModel.find({
                markerStatus: 'MARKER_ALIVE',
            });
            res.status(200).json(data);
        }
        catch (error) {
            console.log(error);
            res.status(400).send(JSON.stringify(error));
        }
    });
    app.get('/api/v1/render/:projectId', async (req, res, next) => {
        try {
            const { projectId } = req.params;
            console.log(projectId);
            const ProjectConvert = new mongoose_1.default.Types.ObjectId(`${projectId}`);
            const dataContent = await models_1.ContentModel.aggregate([
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
            ]);
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
            const html = (0, htmlForm_1.buildHtml)(dataContent);
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': html.length,
                'Expires': new Date().toUTCString()
            });
            res.end(html);
        }
        catch (error) {
            console.log(error);
            res.status(400).send(JSON.stringify(error));
        }
    });
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
    const httpServer = (0, http_1.createServer)(app);
    // Creating the WebSocket server
    const wsServer = new ws_1.WebSocketServer({
        // This is the `httpServer` we created in a previous step.
        server: httpServer,
        // Pass a different path here if your ApolloServer serves at
        // a different path.
        path: '/graphql',
    });
    // Hand in the schema we just created and have the
    // WebSocketServer start listening.
    const serverCleanup = (0, ws_2.useServer)({ schema: graphql_1.default }, wsServer);
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
    const server = new apollo_server_express_1.ApolloServer({
        schema: graphql_1.default,
        csrfPrevention: false,
        cache: 'bounded',
        plugins: [
            // Proper shutdown for the HTTP server.
            (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });
    // const wsServer = new WebSocketServer({
    //     // This is the `httpServer` we created in a previous step.
    //     server: httpServer,
    //     // Pass a different path here if your ApolloServer serves at
    //     // a different path.
    //     path: '/graphql',
    // });
    await server.start();
    server.applyMiddleware({ app });
    httpServer.listen(port, () => {
        console.log(`Server is now running on http://localhost:${port}${server.graphqlPath}`);
    });
})();
