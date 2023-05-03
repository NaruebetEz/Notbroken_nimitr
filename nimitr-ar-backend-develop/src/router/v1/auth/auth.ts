import expressjwt from 'express-jwt'
import config from 'config'
import jwtDecode, { JwtPayload } from 'jwt-decode'

import functionResponseError from '../components/responseError'

interface Auth0JwtPayload extends JwtPayload {
	azp: string
	scope: string
	permissions: string[]
}
export const check = async (
	req: { headers: { authorization: any } },
	res: { status: any },
	next: () => void
) => {
	try {
		const authHeader = req?.headers?.authorization || ''
		const token = authHeader.split(' ')[1]
		// console.log('token', token);

		if (token) {
			const decoded = jwtDecode<Auth0JwtPayload>(token)
			if (decoded?.sub) {
				next()
			}
		} else {
			res.status(403).json({
				status: 403,
				code: 'INVALID_TOKEN',
				message: 'Invalid token',
			})
		}
	} catch (error) {
		functionResponseError(error, res)
	}
}
