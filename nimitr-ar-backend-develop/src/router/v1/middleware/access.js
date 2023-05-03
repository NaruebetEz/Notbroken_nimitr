import functionResponseError from '../components/responseError'

export const admin = async (req, res, next) => {
  try {
    const { user: { type } } = req
    if (type === 1) {
      next()
    } else {
      res.status(403).json({
        status: 403,
        code: 'ERROR_ACCESS',
        message: 'Access denied',
      })
    }
  } catch (error) {
    functionResponseError(error, res)
  }
}

export const teacher = async (req, res, next) => {
  try {
    const { user: { type } } = req
    if (type === 2) {
      res.status(403).json({
        status: 403,
        code: 'ERROR_ACCESS',
        message: 'Access denied',
      })
    } else {
      next()
    }
  } catch (error) {
    functionResponseError(error, res)
  }
}

